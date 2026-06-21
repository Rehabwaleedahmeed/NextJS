import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const HIDDEN_NAVBAR_ROUTES = ['/404', '/500'];

function Shell({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  const hideNavbar = HIDDEN_NAVBAR_ROUTES.includes(router.pathname) || router.pathname.startsWith('/error');

  return (
    <>
      {!hideNavbar ? <Navbar session={session} onSignOut={() => signOut({ callbackUrl: '/' })} /> : null}
      {children}
    </>
  );
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Shell>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </Shell>
    </SessionProvider>
  );
}