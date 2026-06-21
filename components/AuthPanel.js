import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AuthPanel() {
  const { data: session } = useSession();

  if (session) {
    return (
      <section className="control-card auth-card">
        <span>Signed in as {session.user?.name || session.user?.email}</span>
        <p>Provider: {session.provider || 'session'}</p>
        <button className="primary-button" type="button" onClick={() => signOut({ callbackUrl: '/' })}>
          Sign out
        </button>
      </section>
    );
  }

  return (
    <section className="control-card auth-card">
      <span>Session required for full CRUD</span>
      <p>Sign in to unlock create, update, and delete actions.</p>
      <div className="auth-actions">
        <button className="primary-button" type="button" onClick={() => signIn('github', { callbackUrl: '/products' })}>
          GitHub
        </button>
        <button className="secondary-button" type="button" onClick={() => signIn('google', { callbackUrl: '/products' })}>
          Google
        </button>
        <Link className="secondary-button" href="/signin">
          Demo credentials
        </Link>
      </div>
    </section>
  );
}