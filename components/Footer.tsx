"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { label: t.nav.work, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.course, href: "/course" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const social = [
    { label: "LinkedIn", value: site.linkedinHandle, href: site.linkedin },
    {
      label: t.contact.labels.WhatsApp,
      value: site.whatsappDisplay,
      href: `https://wa.me/${site.whatsapp}`,
    },
    {
      label: t.contact.labels.Email,
      value: site.email,
      href: `mailto:${site.email}`,
    },
  ];

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
              {t.footer.blurb}
            </p>
          </div>

          {/* site nav */}
          <nav className="md:col-span-3" aria-label="Footer">
            <p className="text-xs uppercase tracking-ultra text-bone-500">
              {t.footer.siteCol}
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {links.map((n) => (
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
              {t.footer.connectCol}
            </p>
            <ul className="mt-4 grid gap-3 text-sm">
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
                    className="group block"
                  >
                    <span className="block text-xs uppercase tracking-ultra text-bone-500">
                      {s.label}
                    </span>
                    <span className="mt-0.5 block break-words text-bone-300 transition-colors group-hover:text-bone-50">
                      {s.value} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line/10 pt-6 text-sm text-bone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <a href="#top" className="link-underline text-bone-300">
            {t.footer.backTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
