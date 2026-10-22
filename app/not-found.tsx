import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section" style={{ paddingTop: 'var(--hero-top)' }} aria-labelledby="not-found-title">
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: 40 }}>
          Page not found
        </p>
        <h1 id="not-found-title" className="h2-cta" style={{ marginBottom: 32 }}>
          This page doesn&rsquo;t exist.
        </h1>
        <Link href="/" className="btn btn--dark">
          Return Home
        </Link>
      </div>
    </section>
  );
}
