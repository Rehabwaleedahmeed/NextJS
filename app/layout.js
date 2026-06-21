import '../styles/globals.css';
import { getServerSession } from 'next-auth/next';
import authOptions from '../lib/auth';
import Providers from './providers';

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}