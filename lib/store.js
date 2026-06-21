import { connectToDatabase } from './db';
import Product from './models/Product';
import { seededProducts } from './seed';

function normalizeId(id) {
  return String(id);
}

function toPlainProduct(product) {
  return {
    id: normalizeId(product._id ?? product.id),
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
    image: product.image
  };
}

async function ensureSeeded() {
  await connectToDatabase();

  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(seededProducts);
  }
}

export async function listProducts() {
  if (process.env.MONGODB_URI) {
    await ensureSeeded();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return products.map(toPlainProduct);
  }

  return seededProducts.map((product, index) => ({
    id: String(index + 1),
    ...product
  }));
}

export async function getProductById(id) {
  if (process.env.MONGODB_URI) {
    await ensureSeeded();
    const product = await Product.findById(id).lean();
    return product ? toPlainProduct(product) : null;
  }

  const products = await listProducts();
  return products.find((product) => product.id === normalizeId(id)) ?? null;
}

export async function createProduct(input) {
  if (process.env.MONGODB_URI) {
    await connectToDatabase();
    const created = await Product.create(input);
    return toPlainProduct(created.toObject());
  }

  const product = {
    id: String(Date.now()),
    ...input
  };
  seededProducts.unshift(product);
  return product;
}

export async function updateProduct(id, input) {
  if (process.env.MONGODB_URI) {
    await connectToDatabase();
    const updated = await Product.findByIdAndUpdate(id, input, { new: true }).lean();
    return updated ? toPlainProduct(updated) : null;
  }

  const products = await listProducts();
  const index = products.findIndex((product) => product.id === normalizeId(id));
  if (index === -1) {
    return null;
  }

  const updated = { ...products[index], ...input };
  seededProducts[index] = updated;
  return updated;
}

export async function deleteProduct(id) {
  if (process.env.MONGODB_URI) {
    await connectToDatabase();
    const deleted = await Product.findByIdAndDelete(id).lean();
    return Boolean(deleted);
  }

  const products = await listProducts();
  const index = products.findIndex((product) => product.id === normalizeId(id));
  if (index === -1) {
    return false;
  }

  seededProducts.splice(index, 1);
  return true;
}