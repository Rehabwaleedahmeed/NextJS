import { getServerSession } from 'next-auth/next';
import authOptions from '../../../lib/auth';
import { createProduct, listProducts } from '../../../lib/store';

export async function GET() {
  const session = await getServerSession(authOptions);
  const products = await listProducts();

  return Response.json({ products: session ? products : products.slice(0, 3) });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Sign in required' }, { status: 401 });
  }

  const body = await request.json();
  const product = await createProduct(body);
  return Response.json({ product }, { status: 201 });
}