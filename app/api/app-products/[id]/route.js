import { getServerSession } from 'next-auth/next';
import authOptions from '../../../../lib/auth';
import { deleteProduct, getProductById, updateProduct } from '../../../../lib/store';

export async function GET(_request, { params }) {
  const product = await getProductById(params.id);

  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 });
  }

  return Response.json({ product });
}

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Sign in required' }, { status: 401 });
  }

  const body = await request.json();
  const product = await updateProduct(params.id, body);

  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 });
  }

  return Response.json({ product });
}

export async function DELETE(_request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ message: 'Sign in required' }, { status: 401 });
  }

  const deleted = await deleteProduct(params.id);
  if (!deleted) {
    return Response.json({ message: 'Product not found' }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}