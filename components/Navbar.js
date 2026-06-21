import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="brand" href="/products">Lab1 Store</Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
