import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="container-edge mx-auto max-w-edge border-t border-line/10 py-10">
      <div className="flex flex-col gap-6 text-sm text-bone-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full border border-line/20 font-serif text-xs text-bone-200">
            MT
          </span>
          <span>
            {site.name} — {site.role}
          </span>
        </div>
        <p>© {year} {site.name}. Designed &amp; art-directed in-house.</p>
        <a href="#top" className="link-underline text-bone-200">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
