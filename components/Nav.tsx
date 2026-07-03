"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { openConsult } from "@/components/ConsultModal";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const pathname = usePathname();
  const { t, toggle } = useLang();

  const links = [
    { label: t.nav.work, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.course, href: "/course" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/work")
      : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close the course dropdown on outside click
  useEffect(() => {
    if (!courseOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-course-menu]"))
        setCourseOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [courseOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinema ${
          scrolled
            ? "border-b border-line/10 bg-ink-900/70 py-3 backdrop-blur-xl"
            : "py-5"
        }`}
      >
        <div className="container-edge mx-auto flex max-w-edge items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Mohamed Tarek — home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line/20 font-serif text-sm transition-colors duration-300 group-hover:border-mint/60 group-hover:text-mint">
              MT
            </span>
            <span className="hidden text-sm tracking-tight text-bone-200 sm:block">
              {site.name}
              <span className="text-bone-400"> {t.nav.roleTag}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((item) =>
              item.href === "/course" ? (
                <div
                  key={item.href}
                  className="relative"
                  data-course-menu
                  onMouseEnter={() => setCourseOpen(true)}
                  onMouseLeave={() => setCourseOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setCourseOpen((v) => !v)}
                    className={`link-underline flex items-center gap-1 text-sm transition-colors ${
                      isActive(item.href)
                        ? "text-mint"
                        : "text-bone-200 hover:text-bone-50"
                    }`}
                    aria-haspopup="menu"
                    aria-expanded={courseOpen}
                  >
                    {item.label}
                    <span className="text-[0.6rem]">▾</span>
                  </button>
                  <AnimatePresence>
                    {courseOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        role="menu"
                        className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2"
                      >
                        <div className="overflow-hidden rounded-xl border border-line/15 bg-ink-800/95 p-2 shadow-2xl backdrop-blur-xl">
                          {t.course.tracks.map((tr, i) => (
                            <Link
                              key={tr.n}
                              href={`/course?track=${i}`}
                              onClick={() => setCourseOpen(false)}
                              role="menuitem"
                              className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-ink-900"
                            >
                              <span className="min-w-0">
                                <span className="block text-xs text-bone-500">
                                  {tr.n}
                                </span>
                                <span className="block truncate text-sm text-bone-50">
                                  {tr.title}
                                </span>
                              </span>
                              <span
                                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${
                                  tr.free
                                    ? "bg-mint/15 text-mint"
                                    : "bg-electric/15 text-electric"
                                }`}
                              >
                                {tr.free ? t.course.free : t.course.premiumTag}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-underline text-sm transition-colors ${
                    isActive(item.href)
                      ? "text-mint"
                      : "text-bone-200 hover:text-bone-50"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="rounded-full border border-line/20 px-3 py-2 text-xs font-medium text-bone-200 transition-colors hover:border-mint/50 hover:text-mint"
              aria-label="Switch language"
            >
              {t.nav.langBtn}
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={openConsult}
              className="hidden rounded-full border border-line/20 px-5 py-2 text-sm text-bone-50 transition-all duration-300 hover:border-mint/50 hover:bg-mint/5 md:inline-block"
            >
              {t.nav.letsTalk}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span
                className={`h-px w-6 bg-bone-50 transition-all duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-bone-50 transition-all duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-900 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {links.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-4xl text-bone-50"
                  >
                    <span className="mr-3 align-top text-sm text-bone-400">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openConsult();
              }}
              className="mt-10 w-fit rounded-full bg-bone-50 px-6 py-3 text-sm font-medium text-ink-900"
            >
              {t.nav.letsTalk}
            </button>
            <a href={`mailto:${site.email}`} className="mt-6 text-sm text-mint">
              {site.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
