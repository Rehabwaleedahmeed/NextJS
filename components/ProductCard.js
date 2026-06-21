import Link from 'next/link';

export default function ProductCard({ product, actions, compact = false }) {
  return (
    <article className={`product-card ${compact ? 'compact' : ''}`}>
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
        <div className="card-actions">
          <Link className="details-link" href={`/products/${product.id}`}>
            Details
          </Link>
          <Link className="details-link ghost" href={`/app-products/${product.id}`}>
            App detail
          </Link>
          {actions}
        </div>
      </div>
    </article>
  );
}