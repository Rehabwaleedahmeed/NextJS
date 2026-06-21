'use client';

import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';

function AppShell({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const hideNavbar = pathname?.startsWith('/error-demo') || pathname?.startsWith('/app-products/error');

  return (
    <>
      {!hideNavbar ? <Navbar session={session} onSignOut={() => signOut({ callbackUrl: '/' })} /> : null}
      {children}
      <Toaster position="top-right" />
    </>
  );
}

export default function Providers({ session, children }) {
  return (
    <SessionProvider session={session}>
      <AppShell>{children}</AppShell>
    </SessionProvider>
  );
}