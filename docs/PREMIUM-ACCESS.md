# Premium course access — how it works

The paid **AI Video** track (EGP 750) is gated. There are **no user accounts**.
A buyer pays, sends you the screenshot on WhatsApp, and you give them an
**access code**. They type the code on the course page to unlock the video.

## The honest security picture

The site is static (GitHub Pages), so a code checked only in the browser can be
bypassed, and any video file hosted as a plain `.mp4` can be downloaded. To make
the paid course **actually** un-downloadable and the code **actually** enforced,
two things must live off the static site:

1. **The video** → on **Cloudflare Stream** (or Vimeo private), not in this repo.
   Stream serves via expiring signed URLs, so it can't be downloaded or shared.
2. **The code check** → a tiny **Cloudflare Worker** (free) that validates the
   code and returns a short-lived signed URL. See [`access-worker.js`](./access-worker.js).

Once both are set up, set `payments.unlockEndpoint` in `lib/site.ts` to the
Worker URL and **delete `payments.demoCode`**.

## Right now (before you set that up)

- The UI is fully built: "Get access" opens the payment modal (InstaPay /
  Vodafone Cash → WhatsApp), and "Have an access code?" reveals a code box.
- Until the Worker is connected, the demo code **`MT-750-DEMO`** unlocks the
  sample video **for testing only** (it just shows the free clip — no real
  content is exposed).

## Your day-to-day flow (once live)

1. Buyer pays → sends screenshot on WhatsApp.
2. You confirm, then add a random code as a key in the Worker's `CODES` KV and
   send that code to the buyer.
3. Buyer enters it → the video unlocks for them.
4. To revoke someone, delete their key in KV.

## Alternative (zero setup)

If you'd rather not run the Worker: sell the course on **Gumroad / Teachable /
Podia**. They handle payment, hosting, protection and delivery, and the
portfolio just links to the checkout. Tell me and I'll wire that instead.
