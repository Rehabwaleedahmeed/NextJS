import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('demo@lab2.dev');
  const [password, setPassword] = useState('password123');

  return (
    <main className="page-shell simple-page auth-page">
      <p className="eyebrow">Sign in</p>
      <h1>Choose a provider</h1>
      <p>GitHub, Google, and a demo credentials provider are available.</p>

      <div className="auth-actions">
        <button className="primary-button" type="button" onClick={() => signIn('github', { callbackUrl: '/products' })}>
          Sign in with GitHub
        </button>
        <button className="secondary-button" type="button" onClick={() => signIn('google', { callbackUrl: '/products' })}>
          Sign in with Google
        </button>
      </div>

      <form
        className="control-card"
        onSubmit={(event) => {
          event.preventDefault();
          signIn('credentials', { email, password, callbackUrl: '/products' });
        }}
      >
        <span>Demo credentials</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
        <button className="primary-button" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
}