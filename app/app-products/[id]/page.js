import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '../../../lib/store';

export default async function AppProductDetailPage({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="page-shell detail-shell">
      <section className="detail-card">
        <div className="detail-media">
          <img className="detail-image" src={product.image} alt={product.name} />
        </div>
        <div className="detail-content">
          <p className="detail-brand">App router / mongoose</p>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <div className="detail-meta">
            <span>Price: ${product.price}</span>
            <span>Stock: {product.stock}</span>
            <span>Category: {product.category}</span>
          </div>
          <Link className="hero-link" href="/app-products">
            Back to app list
          </Link>
        </div>
      </section>
    </main>
  );
}