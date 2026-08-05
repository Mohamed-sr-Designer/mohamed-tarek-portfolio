"use client";

// Shared segmented control used by the AI Work Flow, Storyboards and Motion
// sections so only one item is on screen at a time.
export function Toggle<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex flex-wrap gap-1 rounded-full border border-line/20 bg-ink-800/70 p-1 backdrop-blur-sm"
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
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
              on
                ? "bg-bone-50 font-medium text-ink-900"
                : "text-bone-200 hover:bg-ink-900/60 hover:text-bone-50"
            }`}
          >
            {o.label}
            {o.hint ? (
              <span
                className={`text-xs ${on ? "text-ink-900/55" : "text-bone-400"}`}
              >
                {o.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
