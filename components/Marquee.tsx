const items = [
  "Creative Direction",
  "Brand Identity",
  "Campaign Design",
  "Visual Systems",
  "Social Systems",
  "Packaging",
  "Motion",
  "AI Production",
  "Art Direction",
  "Marketing Communication",
];

export default function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-line/10 py-6">
      <div className="flex shrink-0 animate-marquee items-center whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-serif text-2xl italic text-bone-400 md:text-3xl">
              {item}
            </span>
            <span className="text-mint">✦</span>
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
    </div>
  );
}
