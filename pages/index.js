import Link from 'next/link';

export default function HomePage() {
	return (
		<main className="page-shell simple-page">
			<p className="eyebrow">Pages Router Demo</p>
			<h1>Next.js routing, SSG, filtering, search, and sorting</h1>
			<p>
				Visit the catalog to browse DummyJSON products, open a product details page, and use the brand filter,
				deferred search, and price/rating sorting controls.
			</p>
			<Link className="hero-link" href="/products">
				Open products
			</Link>
		</main>
	);
}
