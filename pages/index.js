import Link from 'next/link';
import ToastFeed from '../components/ToastFeed';
import { newsItems, quoteItems } from '../lib/seed';

export async function getServerSideProps() {
  return {
    props: {
      news: newsItems,
      quotes: quoteItems
    }
  };
}

export default function HomePage({ news, quotes }) {
  return (
    <main className="page-shell simple-page hero-page">
      <ToastFeed news={news} quotes={quotes} />
      <p className="eyebrow">Lab2</p>
      <h1>Pages router and app router in one Next.js workspace</h1>
      <p>
        Use the pages router for session-gated CRUD and the app router for mongoose-backed product reads.
        News and quotes are fetched on the server and surfaced as toasts after hydration.
      </p>
      <div className="hero-links">
        <Link className="hero-link" href="/products">
          Pages products
        </Link>
        <Link className="hero-link secondary" href="/app-products">
          App products
        </Link>
        <Link className="hero-link secondary" href="/signin">
          Sign in
        </Link>
      </div>
    </main>
  );
}