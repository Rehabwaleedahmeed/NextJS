import Image from 'next/image';
import Link from 'next/link';

export async function getStaticPaths() {
  const response = await fetch('https://dummyjson.com/products?limit=30');
  const data = await response.json();

  return {
    paths: data.products.map((product) => ({ params: { id: String(product.id) } })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`https://dummyjson.com/products/${params.id}`);

  if (!response.ok) {
    return {
      notFound: true
    };
  }

  const product = await response.json();

  return {
    props: {
      product
    },
    revalidate: 60
  };
}

export default function ProductDetailsPage({ product }) {
  return (
    <main className="page-shell detail-shell">
      <Link className="back-link" href="/products">
        Back to products
      </Link>

      <section className="detail-card">
        <div className="detail-media">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="detail-image"
            priority
          />
        </div>

        <div className="detail-content">
          <p className="detail-brand">{product.brand}</p>
          <h1>{product.title}</h1>
          <p className="detail-description">{product.description}</p>

          <div className="detail-meta">
            <span>Price: ${product.price}</span>
            <span>Rating: {product.rating}</span>
            <span>Stock: {product.stock}</span>
            <span>Category: {product.category}</span>
          </div>

          <div className="detail-gallery">
            {product.images.map((image) => (
              <div className="gallery-item" key={image}>
                <Image src={image} alt={product.title} fill sizes="120px" className="gallery-image" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
