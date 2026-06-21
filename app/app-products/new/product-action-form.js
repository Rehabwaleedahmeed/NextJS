'use client';

import { useFormState } from 'react-dom';
import { useSession } from 'next-auth/react';

const initialState = {
  message: '',
  error: ''
};

async function submitProduct(_previousState, formData) {
  const payload = Object.fromEntries(formData.entries());
  const response = await fetch('/api/app-products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...payload,
      price: Number(payload.price),
      stock: Number(payload.stock)
    })
  });

  if (!response.ok) {
    const data = await response.json();
    return { message: '', error: data.message || 'Unable to create product' };
  }

  return { message: 'Product created', error: '' };
}

export default function ProductActionForm({ session }) {
  const { data: liveSession } = useSession();
  const [state, formAction] = useFormState(submitProduct, initialState);
  const activeSession = session || liveSession;

  if (!activeSession) {
    return (
      <section className="control-card">
        <span>Sign in required</span>
        <p>The create demo only works once you have an authenticated session.</p>
      </section>
    );
  }

  return (
    <form className="control-card" action={formAction}>
      <span>Create a product</span>
      <input name="name" placeholder="Name" required />
      <textarea name="description" rows={3} placeholder="Description" required />
      <div className="form-row">
        <input name="price" type="number" placeholder="Price" required />
        <input name="stock" type="number" placeholder="Stock" required />
      </div>
      <input name="category" placeholder="Category" required />
      <input name="image" placeholder="Image URL" required />
      <button className="primary-button" type="submit">
        Create via action
      </button>
      {state.error ? <p className="muted-note">{state.error}</p> : null}
      {state.message ? <p className="muted-note">{state.message}</p> : null}
    </form>
  );
}