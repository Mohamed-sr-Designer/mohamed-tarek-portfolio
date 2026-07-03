"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { useLang } from "@/lib/i18n";

// Global "Free consultation" dialog. Any button can open it by dispatching
// the `open-consult` event (see openConsult below). Submission builds a
// prefilled WhatsApp message (or mailto) — no backend, nothing stored.
export function openConsult() {
  window.dispatchEvent(new CustomEvent("open-consult"));
}

const field =
  "w-full rounded-lg border border-line/15 bg-ink-900 px-4 py-3 text-sm text-bone-50 outline-none transition-colors placeholder:text-bone-500 focus:border-mint/60";

export default function ConsultModal() {
  const { t, lang } = useLang();
  const m = t.modal;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    country: "",
    industry: "",
    need: "",
    message: "",
  });

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-consult", onOpen);
    return () => window.removeEventListener("open-consult", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // restore the native cursor inside the modal (see globals.css)
    document.documentElement.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
    };
  }, [open]);

  // Teaching/training is on-site only in Egypt; elsewhere it's online.
  const isTraining =
    form.need === m.needs[2] || form.need === m.needs[3];
  const showOnlineNote =
    isTraining && form.country !== "" && form.country !== m.countries[0];

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const compose = useCallback(() => {
    const lines = [
      m.waIntro,
      `• ${m.name}: ${form.name || "—"}`,
      form.company ? `• ${m.company}: ${form.company}` : "",
      `• ${m.country}: ${form.country || "—"}`,
      `• ${m.industry}: ${form.industry || "—"}`,
      `• ${m.need}: ${form.need || "—"}`,
      showOnlineNote ? `• (${m.onlineNote})` : "",
      form.message ? `• ${form.message}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  }, [form, m, showOnlineNote]);

  const sendWhatsApp = () => {
    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(compose())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const sendMail = () => {
    const url = `mailto:${site.email}?subject=${encodeURIComponent(
      m.title
    )}&body=${encodeURIComponent(compose())}`;
    window.location.href = url;
    setOpen(false);
  };

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
            aria-label={m.title}
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
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-mint">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                  {t.hero.avail}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-bone-50 md:text-3xl">
                  {m.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-bone-400">
                  {m.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={m.close}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line/20 text-bone-300 transition-colors hover:border-mint/50 hover:text-mint"
              >
                ✕
              </button>
            </div>

            <form
              className="mt-6 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                sendWhatsApp();
              }}
            >
              <input
                required
                value={form.name}
                onChange={set("name")}
                placeholder={m.name}
                autoComplete="name"
                className={field}
              />
              <input
                value={form.company}
                onChange={set("company")}
                placeholder={m.company}
                autoComplete="organization"
                className={field}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  required
                  value={form.country}
                  onChange={set("country")}
                  className={field}
                  aria-label={m.country}
                >
                  <option value="" disabled>
                    {m.country} — {m.select}
                  </option>
                  {m.countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  required
                  value={form.industry}
                  onChange={set("industry")}
                  className={field}
                  aria-label={m.industry}
                >
                  <option value="" disabled>
                    {m.industry} — {m.select}
                  </option>
                  {m.industries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <select
                required
                value={form.need}
                onChange={set("need")}
                className={field}
                aria-label={m.need}
              >
                <option value="" disabled>
                  {m.need} — {m.select}
                </option>
                {m.needs.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <textarea
                rows={3}
                value={form.message}
                onChange={set("message")}
                placeholder={m.message}
                className={`${field} resize-none`}
              />

              {showOnlineNote ? (
                <p className="flex items-start gap-2 rounded-lg border border-electric/30 bg-electric/5 px-3 py-2.5 text-xs leading-relaxed text-bone-200">
                  <span className="mt-0.5 text-electric">◆</span>
                  {m.onlineNote}
                </p>
              ) : null}

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-bone-50 px-6 py-3 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-[1.03]"
                >
                  {m.sendWa}
                </button>
                <button
                  type="button"
                  onClick={sendMail}
                  className="rounded-full border border-line/25 px-6 py-3 text-sm text-bone-50 transition-colors hover:border-mint/60 hover:text-mint"
                >
                  {m.sendMail}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
