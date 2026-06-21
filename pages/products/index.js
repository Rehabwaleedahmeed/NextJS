import { useMemo, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import ProductCard from '../../components/ProductCard';
import ProductEditor from '../../components/ProductEditor';
import AuthPanel from '../../components/AuthPanel';
import ToastFeed from '../../components/ToastFeed';
import { listProducts } from '../../lib/store';
import { newsItems, quoteItems } from '../../lib/seed';
import toast from 'react-hot-toast';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await listProducts();

  return {
    props: {
      session,
      initialProducts: session ? products : products.slice(0, 3),
      news: newsItems,
      quotes: quoteItems
    }
  };
}

export default function ProductsPage({ initialProducts, news, quotes }) {
  const { data: session } = useSession();
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);

  const canEdit = Boolean(session);

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))], [products]);

  async function refreshList() {
    const response = await fetch('/api/products');
    const payload = await response.json();
    setProducts(session ? payload.products : payload.products.slice(0, 3));
  }

  async function handleCreate(product) {
    if (!canEdit) {
      return;
    }

    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    toast.success('Product created');
    await refreshList();
  }

  async function handleUpdate(product) {
    if (!canEdit || !editingProduct) {
      return;
    }

    await fetch(`/api/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    toast.success('Product updated');
    setEditingProduct(null);
    await refreshList();
  }

  async function handleDelete(id) {
    if (!canEdit) {
      return;
    }

    await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    });
    toast.success('Product deleted');
    await refreshList();
  }

  return (
    <main className="page-shell">
      <ToastFeed news={news} quotes={quotes} />
      <section className="hero">
        <p className="eyebrow">Pages router CRUD</p>
        <h1>Session-gated products with one shared editor</h1>
        <p>
          Without a session you only see the first 3 products. After sign in you can create, update, and delete the full list.
        </p>
      </section>

      <section className="controls-grid single-column">
        <AuthPanel />
        {canEdit ? (
          <ProductEditor
            initialValue={editingProduct}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            onCancel={editingProduct ? () => setEditingProduct(null) : null}
            submitLabel={editingProduct ? 'Update product' : 'Create product'}
          />
        ) : null}
      </section>

      <section className="results-header">
        <p>{products.length} products visible</p>
        <p>{categories.length} categories</p>
      </section>

      <section className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            actions={
              canEdit ? (
                <>
                  <button className="secondary-button" type="button" onClick={() => setEditingProduct(product)}>
                    Edit
                  </button>
                  <button className="danger-button" type="button" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </>
              ) : null
            }
          />
        ))}
      </section>
    </main>
  );
}