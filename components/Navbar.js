import Link from 'next/link';

export default function Navbar({ session, onSignOut }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="brand" href="/">
          Lab2 Dual Router
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/products">Pages Products</Link>
          <Link href="/app-products">App Products</Link>
          <Link href="/signin">Sign in</Link>
          {session ? (
            <button className="nav-button" type="button" onClick={onSignOut}>
              Sign out
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}