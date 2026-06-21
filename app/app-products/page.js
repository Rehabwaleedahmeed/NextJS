import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import authOptions from '../../lib/auth';
import { listProducts } from '../../lib/store';

export default async function AppProductsPage() {
  const session = await getServerSession(authOptions);
  const products = await listProducts();
  const visibleProducts = session ? products : products.slice(0, 3);

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">App router reads</p>
        <h1>Mongoose-backed product list</h1>
        <p>
          This route tree uses the app router, reads data from the shared mongoose store, and exposes a detail view for each product.
        </p>
      </section>

      <section className="results-header">
        <p>{visibleProducts.length} products visible</p>
        <Link className="hero-link" href="/app-products/new">
          New route placeholder
        </Link>
      </section>

      <section className="products-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img className="product-image" src={product.image} alt={product.name} />
            </div>
            <div className="product-body">
              <p className="product-brand">{product.category}</p>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-meta">
                <span>${product.price}</span>
                <span>Stock {product.stock}</span>
              </div>
              <Link className="details-link" href={`/app-products/${product.id}`}>
                Open detail
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}