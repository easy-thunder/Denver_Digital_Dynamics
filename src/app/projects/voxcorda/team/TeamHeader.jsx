'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import styles from './TeamHeader.module.css';

export default function TeamHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const navItems = [
    { href: '/projects/voxcorda/team/dashboard', label: 'Dashboard' },
    { href: '/projects/voxcorda/team/new-article', label: 'New Article' },
    { href: '/projects/voxcorda/team/view-drafts', label: 'View Drafts' },
    { href: '/projects/voxcorda/wiki', label: 'View Wiki' },

  ];

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>VoxCorda · Team</div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${
                  isActive ? styles.active : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={handleSignOut} className={styles.signout}>
          Sign out
        </button>
      </div>
    </header>
  );
}
