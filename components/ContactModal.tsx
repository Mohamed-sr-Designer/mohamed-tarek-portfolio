"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, contacts } from "@/lib/site";
import { useLang } from "@/lib/i18n";

// Glassy contact card opened from the header "Let's talk" — same details as
// the contact page, without leaving the current page.
export function openContact() {
  window.dispatchEvent(new CustomEvent("open-contact"));
}

export default function ContactModal() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("open-contact", on);
    return () => window.removeEventListener("open-contact", on);
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-xl sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.contact.label}
            dir={lang === "ar" ? "rtl" : "ltr"}
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/15 bg-ink-900/70 p-7 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:rounded-3xl md:p-9"
          >
            {/* soft glow behind the glass */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-mint/20 blur-[90px]"
            />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-mint">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                  </span>
                  {t.hero.avail}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-bone-50 md:text-4xl">
                  {t.contact.h2a}{" "}
                  <span className="font-serif font-normal italic text-mint">
                    {t.contact.h2i}
                  </span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.master.close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-bone-200 transition-colors hover:border-mint/60 hover:text-mint"
              >
                ✕
              </button>
            </div>

            <p className="relative mt-4 text-sm leading-relaxed text-bone-300">
              {t.contact.body}
            </p>

            {/* channels */}
            <div className="relative mt-7 grid gap-2">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-colors duration-300 hover:border-mint/40 hover:bg-white/[0.07]"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-ultra text-bone-500">
                      {t.contact.labels[c.label] ?? c.label}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-bone-50" dir="ltr">
                      {c.value}
                    </span>
                  </span>
                  <span className="shrink-0 text-bone-400 transition-colors group-hover:text-mint">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            {/* primary action */}
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-5 block rounded-full bg-bone-50 px-6 py-3.5 text-center text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-[1.02]"
            >
              {t.hire.wa}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
