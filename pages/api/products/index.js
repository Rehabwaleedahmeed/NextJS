import { getServerSession } from 'next-auth/next';
import authOptions from '../../../lib/auth';
import { createProduct, listProducts } from '../../../lib/store';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions);
    const products = await listProducts();
    const visibleProducts = session ? products : products.slice(0, 3);
    return res.status(200).json({ products: visibleProducts });
  }

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Sign in required' });
    }

    const product = await createProduct(req.body);
    return res.status(201).json({ product });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}