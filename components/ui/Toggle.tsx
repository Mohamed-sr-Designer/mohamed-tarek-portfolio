"use client";

// Shared segmented control used by the AI Work Flow, Storyboards, Motion and
// case-gallery sections so only one item is on screen at a time.
//
// Every option carries its own border and fill, not just the selected one:
// inside a single flat pill the inactive choices read as static text and people
// don't realise they can be clicked.
export function Toggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  hint,
}: {
  options: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
  /** short instruction shown above the control, e.g. "Pick a production" */
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {hint ? (
        <span className="text-[10px] uppercase tracking-ultra text-bone-500">
          {hint}
        </span>
      ) : null}

      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-wrap gap-2"
      >
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onChange(o.value)}
              className={`group flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                on
                  ? "border-mint bg-mint text-ink-900 shadow-[0_0_0_4px_rgb(var(--mint)/0.15)]"
                  : "border-line/30 bg-ink-800/60 text-bone-100 hover:-translate-y-0.5 hover:border-mint/60 hover:bg-ink-800 hover:text-mint"
              }`}
            >
              <span
                aria-hidden
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  on ? "bg-ink-900" : "bg-bone-500 group-hover:bg-mint"
                }`}
              />
              <span className={on ? "font-medium" : ""}>{o.label}</span>
              {o.hint ? (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] tabular-nums ${
                    on ? "bg-ink-900/15 text-ink-900" : "bg-line/10 text-bone-400"
                  }`}
                >
                  {o.hint}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
