"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, payments } from "@/lib/site";
import { useLang } from "@/lib/i18n";

// Premium-course payment dialog (separate from the consultation modal).
// Manual methods (InstaPay / Vodafone Cash) are live: the buyer transfers,
// screenshots, and sends it on WhatsApp for manual activation. The gateway
// buttons are UI-ready and disabled until their API is wired (see payWith).
export function openPayment() {
  window.dispatchEvent(new CustomEvent("open-payment"));
}

export default function PaymentModal() {
  const { t, lang } = useLang();
  const p = t.pay;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-payment", onOpen);
    return () => window.removeEventListener("open-payment", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
    };
  }, [open]);

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  };

  const sendWhatsApp = () => {
    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      p.waMsg
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // TODO(payment-gateways): wire real checkout here once you have the keys.
  // e.g. Paymob: create an order + payment key, then redirect to iframe URL;
  // Fawry: create a reference code; valU/Aman: their hosted checkout.
  const payWith = (gatewayId: string) => {
    // Intentionally a no-op until an API is connected.
    // Replace with: window.location.href = await createCheckout(gatewayId);
    console.warn(`Payment gateway "${gatewayId}" is not wired yet.`);
  };

  const method = (
    label: string,
    value: string,
    key: string
  ) => (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line/15 bg-ink-900 px-4 py-3">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-ultra text-bone-500">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-bone-50" dir="ltr">
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={() => copy(value, key)}
        className="shrink-0 rounded-full border border-line/20 px-3 py-1.5 text-xs text-bone-200 transition-colors hover:border-mint/50 hover:text-mint"
      >
        {copied === key ? p.copied : p.copy}
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={p.title}
            dir={lang === "ar" ? "rtl" : "ltr"}
            initial={{ y: 48, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-line/15 bg-ink-800 p-6 sm:rounded-2xl md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="flex w-fit items-center gap-2 rounded-full border border-electric/40 bg-electric/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-electric">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                  {t.course.premiumTag}
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-bone-50 md:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-bone-400">
                  {p.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={p.close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line/20 text-bone-300 transition-colors hover:border-mint/50 hover:text-mint"
              >
                ✕
              </button>
            </div>

            {/* price */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-line/15 bg-ink-900 px-5 py-4">
              <span className="text-xs uppercase tracking-ultra text-bone-400">
                {p.priceLabel}
              </span>
              <span className="font-display text-2xl font-semibold text-bone-50">
                {payments.price}
              </span>
            </div>

            {/* manual methods */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-ultra text-mint">
                {p.manualLabel}
              </p>
              <ol className="mt-3 grid gap-1.5">
                {p.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-bone-300">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-mint/15 text-[9px] text-mint">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-4 grid gap-2.5">
                {method("InstaPay", payments.manual.instapay, "insta")}
                {method("Vodafone Cash", payments.manual.vodafoneCash, "vodafone")}
              </div>
              <button
                type="button"
                onClick={sendWhatsApp}
                className="mt-4 w-full rounded-full bg-bone-50 px-6 py-3.5 text-center text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-[1.02]"
              >
                {p.sendWa}
              </button>
            </div>

            {/* gateways — UI-ready, waiting for API */}
            <div className="mt-6 border-t border-line/10 pt-5">
              <p className="text-xs uppercase tracking-ultra text-bone-500">
                {p.gatewaysLabel}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {payments.gateways.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    disabled={!g.enabled}
                    onClick={() => g.enabled && payWith(g.id)}
                    className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-line/20 bg-ink-900 px-3 py-3 text-sm text-bone-200 transition-colors enabled:hover:border-mint/40 disabled:opacity-60"
                  >
                    {g.label}
                    {!g.enabled && (
                      <span className="rounded-full bg-line/10 px-2 py-0.5 text-[10px] text-bone-500">
                        {p.soon}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] leading-relaxed text-bone-500">
              {p.secureNote}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
