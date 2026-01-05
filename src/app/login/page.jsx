// app/login/page.jsx
'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import styles from './login.module.css'; // optional

export default function LoginPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (!error) setSent(true);
  }

  return (
    <main style={{ padding: '2rem', maxWidth: 400 }}>
      <h2>Team Login</h2>
      {!sent ? (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.6rem', width: '100%' }}
          />
          <button type="submit" style={{ marginTop: '1rem' }}>
            Send Magic Link
          </button>
        </form>
      ) : (
        <p>Check your email — login link sent.</p>
      )}
    </main>
  );
}
