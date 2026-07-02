import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Fraunces } from "next/font/google";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#100F0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Graphic Designer",
    "Art Director",
    "Freelance Graphic Designer",
    "Graphic Designer Egypt",
    "Graphic Designer Saudi Arabia",
    "Graphic Designer Kuwait",
    "Art Director Egypt",
    "Brand Identity Designer",
    "Social Media Designer",
    "Campaign Design",
    "Key Visuals",
    "Creative Direction",
    "AI Production",
    "Motion Design",
    "Hire Graphic Designer",
    "Team Lead",
    "Mohamed Tarek",
    "Portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} — Portfolio`,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Structured data — how search engines & AI assistants understand who this is.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: "Graphic Designer & Art Director (Team Lead)",
      description: site.description,
      url: site.url,
      image: `${site.url}/me/portrait.webp`,
      email: `mailto:${site.email}`,
      telephone: site.phone,
      address: { "@type": "PostalAddress", addressCountry: "EG" },
      workLocation: [
        { "@type": "Place", name: "Egypt" },
        { "@type": "Place", name: "Saudi Arabia" },
        { "@type": "Place", name: "Kuwait" },
      ],
      knowsAbout: [
        "Graphic Design",
        "Art Direction",
        "Brand Identity",
        "Advertising Campaigns",
        "Social Media Design",
        "Key Visuals",
        "Motion Design",
        "AI-Assisted Creative Production",
        "Creative Direction",
      ],
      knowsLanguage: ["ar", "en"],
      sameAs: [site.linkedin, site.github],
      seeks: {
        "@type": "Demand",
        name: "Freelance, part-time and hybrid full-time graphic design & art direction roles",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — Portfolio`,
      description: site.description,
      publisher: { "@id": `${site.url}/#person` },
      inLanguage: "en",
    },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${display.variable} ${sans.variable} ${serif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink-900 font-sans text-bone-50 antialiased">
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <WhatsAppButton />
        {children}
      </body>
    </html>
  );
}
