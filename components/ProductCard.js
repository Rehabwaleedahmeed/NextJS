import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Image src={product.thumbnail} alt={product.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="product-image" />
      </div>
      <div className="product-body">
        <p className="product-brand">{product.brand}</p>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <div className="product-meta">
          <span>${product.price}</span>
          <span>Rating {product.rating}</span>
        </div>
        <Link className="details-link" href={`/products/${product.id}`}>View details</Link>
      </div>
    </article>
  );
}
