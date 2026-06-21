import { getServerSession } from 'next-auth/next';
import authOptions from '../../../lib/auth';
import ProductActionForm from './product-action-form';

export default async function NewProductPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="page-shell auth-page">
      <section className="hero">
        <p className="eyebrow">App router create</p>
        <h1>useActionState demo</h1>
        <p>
          This form posts through the app-router API route and shows the result state inline.
        </p>
      </section>
      <ProductActionForm session={session} />
    </main>
  );
}