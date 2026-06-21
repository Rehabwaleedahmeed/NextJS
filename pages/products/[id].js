import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { getProductById } from '../../lib/store';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const product = await getProductById(context.params.id);

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      session,
      product
    }
  };
}

export default function ProductDetailsPage({ product, session }) {
  const router = useRouter();

  return (
    <main className="page-shell detail-shell">
      <button className="back-link" type="button" onClick={() => router.back()}>
        Back
      </button>
      <section className="detail-card">
        <div className="detail-media">
          <img className="detail-image" src={product.image} alt={product.name} />
        </div>
        <div className="detail-content">
          <p className="detail-brand">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <div className="detail-meta">
            <span>Price: ${product.price}</span>
            <span>Stock: {product.stock}</span>
          </div>
          <Link className="hero-link" href="/products">
            Back to list
          </Link>
          {session ? <p className="muted-note">Signed-in users can edit products from the list page.</p> : null}
        </div>
      </section>
    </main>
  );
}