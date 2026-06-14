import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-edge mx-auto flex min-h-[80vh] max-w-edge flex-col items-start justify-center">
      <p className="text-xs uppercase tracking-ultra text-mint">404</p>
      <h1 className="mt-6 max-w-2xl font-sans text-5xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-7xl">
        This page took a different creative direction.
      </h1>
      <Link
        href="/"
        className="link-underline mt-10 text-lg text-bone-200"
      >
        ← Back to home
      </Link>
    </main>
  );
}
