"use client";

import { useEffect, useRef, useState } from "react";

// Copy-to-clipboard control for contact details. Falls back to a hidden
// textarea + execCommand when the async Clipboard API is unavailable
// (older Safari, or any non-secure origin).
async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function CopyButton({
  value,
  label,
  copyLabel,
  copiedLabel,
  className = "",
}: {
  value: string;
  /** what is being copied, for screen readers — e.g. "Email" */
  label: string;
  copyLabel: string;
  copiedLabel: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  return (
    <button
      type="button"
      title={done ? copiedLabel : `${copyLabel} — ${label}`}
      aria-label={`${copyLabel} ${label}`}
      onClick={async (e) => {
        // the row around this button is a link; don't follow it
        e.preventDefault();
        e.stopPropagation();
        if (await copyText(value)) {
          setDone(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setDone(false), 1800);
        }
      }}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-[11px] font-medium transition-colors duration-300 ${
        done
          ? "border-mint/60 bg-mint/10 text-mint"
          : "border-line/25 text-bone-300 hover:border-mint/50 hover:text-mint"
      } ${className}`}
    >
      {done ? (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="9" y="9" width="12" height="12" rx="2.5" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      )}
      <span>{done ? copiedLabel : copyLabel}</span>
    </button>
  );
}
