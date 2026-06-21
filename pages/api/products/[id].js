import { getServerSession } from 'next-auth/next';
import authOptions from '../../../lib/auth';
import { deleteProduct, getProductById, updateProduct } from '../../../lib/store';

export default async function handler(req, res) {
  const {
    query: { id }
  } = req;

  if (req.method === 'GET') {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ product });
  }

  if (req.method === 'PUT') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Sign in required' });
    }

    const product = await updateProduct(id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ product });
  }

  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Sign in required' });
    }

    const deleted = await deleteProduct(id);
    return res.status(deleted ? 204 : 404).end();
  }

  return res.status(405).json({ message: 'Method not allowed' });
}