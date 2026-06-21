import Link from 'next/link';
import { useDeferredValue, useMemo, useState, useTransition } from 'react';
import ProductCard from '../../components/ProductCard';
import FiltersPanel from '../../components/FiltersPanel';
import SortControls from '../../components/SortControls';
import SearchBar from '../../components/SearchBar';

export async function getStaticProps() {
  const response = await fetch('https://dummyjson.com/products?limit=100');
  const data = await response.json();

  return {
    props: {
      products: data.products
    },
    revalidate: 60
  };
}

export default function ProductsPage({ products }) {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const brands = useMemo(() => {
    return ['all', ...new Set(products.map((product) => product.brand))].sort((a, b) => {
      if (a === 'all') return -1;
      if (b === 'all') return 1;
      return a.localeCompare(b);
    });
  }, [products]);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = deferredSearchTerm.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
        const matchesSearch =
          normalizedSearch.length === 0 ||
          product.title.toLowerCase().includes(normalizedSearch) ||
          product.brand.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch);

        return matchesBrand && matchesSearch;
      })
      .sort((left, right) => {
        if (sortBy === 'price-asc') return left.price - right.price;
        if (sortBy === 'price-desc') return right.price - left.price;
        if (sortBy === 'rating-asc') return left.rating - right.rating;
        if (sortBy === 'rating-desc') return right.rating - left.rating;
        return left.id - right.id;
      });
  }, [deferredSearchTerm, products, selectedBrand, sortBy]);

  const handleSearchChange = (value) => {
    startTransition(() => {
      setSearchTerm(value);
    });
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Next.js Pages Router</p>
        <h1>Products catalog with SSG, filters, search, and sort</h1>
        <p className="hero-copy">
          Data comes from DummyJSON and every product page is rendered with static generation.
        </p>
        <div className="hero-links">
          <Link className="hero-link" href="/about">About</Link>
          <Link className="hero-link" href="/contact">Contact</Link>
        </div>
      </section>

      <section className="controls-grid">
        <FiltersPanel brands={brands} selectedBrand={selectedBrand} onChange={setSelectedBrand} />
        <SearchBar value={searchTerm} onChange={handleSearchChange} isPending={isPending} />
        <SortControls value={sortBy} onChange={setSortBy} />
      </section>

      <section className="results-header">
        <p>{visibleProducts.length} products shown</p>
        <p>Source: dummyjson.com/products</p>
      </section>

      <section className="products-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
