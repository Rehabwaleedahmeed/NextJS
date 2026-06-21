import { useEffect, useState } from 'react';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  image: ''
};

export default function ProductEditor({ initialValue, onSubmit, onCancel, submitLabel }) {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setForm(initialValue ? { ...emptyForm, ...initialValue } : emptyForm);
  }, [initialValue]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });
      setForm(emptyForm);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="control-card editor-card" onSubmit={handleSubmit}>
      <span>{initialValue ? 'Edit product' : 'Create product'}</span>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} />
      <div className="form-row">
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" />
      </div>
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
      <div className="auth-actions">
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
        {onCancel ? (
          <button className="secondary-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}