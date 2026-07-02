import Link from "next/link";
import { site, nav } from "@/lib/site";

const social = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "GitHub", href: site.github },
  { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}` },
  { label: "Email", href: `mailto:${site.email}` },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/10">
      <div className="container-edge mx-auto max-w-edge py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* identity */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line/20 font-serif text-xs text-bone-200">
                MT
              </span>
              <span className="text-bone-50">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone-400">
              Graphic Designer &amp; Art Director (Team Lead) based in{" "}
              {site.location}, working across {site.markets}. Available for
              freelance, part-time and hybrid full-time roles.
            </p>
          </div>

          {/* site nav */}
          <nav className="md:col-span-3" aria-label="Footer">
            <p className="text-xs uppercase tracking-ultra text-bone-500">
              Site
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-bone-300 transition-colors hover:text-bone-50"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* social / contact */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-ultra text-bone-500">
              Connect
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      s.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-bone-300 transition-colors hover:text-bone-50"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line/10 pt-6 text-sm text-bone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Designed, art-directed &amp; vibe-coded
            in-house.
          </p>
          <a href="#top" className="link-underline text-bone-300">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
