/**
 * Cloudflare Worker — secure access-code → signed video URL.
 * -----------------------------------------------------------------------------
 * WHY: the portfolio is a static site, so a code checked in the browser can be
 * bypassed. This tiny Worker validates the code SERVER-SIDE and returns a
 * short-lived SIGNED video URL, so:
 *   • invalid code  → no URL → no video
 *   • valid code    → a URL that EXPIRES (can't be shared or hot-linked)
 *
 * Free to run on Cloudflare's free tier. No user accounts.
 *
 * SETUP (about 10 minutes):
 *   1. Put the paid video on Cloudflare Stream (dashboard → Stream → upload).
 *      Turn ON "Require signed URLs" for that video.
 *   2. Create a Stream signing key (Stream → Settings → Signing keys) →
 *      note the Key ID and the PEM/JWK.
 *   3. Create a Worker (dash → Workers → Create) and paste this file.
 *   4. Bind a KV namespace called CODES (Worker → Settings → Variables → KV).
 *      Add each sold code as a key with value "1" (or an expiry timestamp).
 *      To revoke a buyer, delete their key.
 *   5. Add secrets: STREAM_VIDEO_UID, STREAM_KEY_ID, STREAM_JWK, ALLOW_ORIGIN
 *      (ALLOW_ORIGIN = https://mohamed-sr-designer.github.io).
 *   6. Copy the Worker URL into lib/site.ts → payments.unlockEndpoint, and
 *      delete payments.demoCode. Deploy the site.
 *
 * You generate codes yourself (any random strings) and hand them out on
 * WhatsApp after you confirm each payment.
 */

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST")
      return json({ error: "method" }, 405, cors);

    const { code } = await request.json().catch(() => ({}));
    if (!code || typeof code !== "string")
      return json({ error: "no code" }, 400, cors);

    // 1) validate the code (KV lookup — delete a key to revoke it)
    const ok = await env.CODES.get(code.trim());
    if (!ok) return json({ error: "invalid" }, 403, cors);

    // 2) mint a short-lived signed Stream token (valid ~2 hours)
    const url = await signStreamUrl(env, 60 * 60 * 2);
    return json({ url }, 200, cors);
  },
};

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

// Builds a signed Cloudflare Stream HLS URL using the Stream signing JWK.
async function signStreamUrl(env, ttlSeconds) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", kid: env.STREAM_KEY_ID };
  const payload = {
    sub: env.STREAM_VIDEO_UID,
    kid: env.STREAM_KEY_ID,
    exp: now + ttlSeconds,
    nbf: now - 60,
    accessRules: [{ type: "any", action: "allow" }],
  };
  const token = await jwtSign(header, payload, env.STREAM_JWK);
  return `https://customer-stream.cloudflarestream.com/${env.STREAM_VIDEO_UID}/manifest/video.m3u8?token=${token}`;
}

// Minimal RS256 JWT signer using WebCrypto (Stream signing key is a JWK).
async function jwtSign(header, payload, jwkString) {
  const enc = (obj) =>
    btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const data = `${enc(header)}.${enc(payload)}`;
  const jwk = JSON.parse(atob(jwkString)); // STREAM_JWK stored base64-encoded
  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(data)
  );
  const b64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `${data}.${b64}`;
}
