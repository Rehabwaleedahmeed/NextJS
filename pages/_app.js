import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const HIDDEN_NAVBAR_ROUTES = ['/404', '/500'];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideNavbar = HIDDEN_NAVBAR_ROUTES.includes(router.pathname) || router.pathname === '/_error';

  return (
    <>
      {!hideNavbar ? <Navbar /> : null}
      <Component {...pageProps} />
    </>
  );
}
