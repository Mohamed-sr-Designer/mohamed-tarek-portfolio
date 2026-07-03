import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import CourseView from "@/components/CourseView";
import { dict } from "@/lib/dict";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: dict.en.course.metaTitle,
  description: dict.en.course.metaDesc,
  alternates: { canonical: "/course" },
  openGraph: {
    title: dict.en.course.metaTitle,
    description: dict.en.course.metaDesc,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
};

// Course structured data — helps search & AI assistants surface the course.
const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "AI Photoshoot, Prompt Engineering & AI Video",
  description: dict.en.course.metaDesc,
  provider: {
    "@type": "Person",
    name: site.name,
    url: site.url,
  },
  inLanguage: ["en", "ar"],
  teaches: [
    "AI Photoshoot",
    "Prompt Engineering",
    "Photo Retouching",
    "Color Grading",
    "AI Video Generation",
    "Premiere Pro editing",
  ],
  hasCourseInstance: dict.en.course.tracks.map((tr) => ({
    "@type": "CourseInstance",
    name: tr.title,
    courseMode: "online",
    courseWorkload: tr.runtime,
  })),
};

export default function CoursePage() {
  return (
    <SiteShell pad>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CourseView />
    </SiteShell>
  );
}
