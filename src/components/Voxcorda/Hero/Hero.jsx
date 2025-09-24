import Link from "next/link";
import styles from "./Hero.module.css";

export default function  Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="vc-hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="vc-hero-title" className={styles.title}>
            VoxCorda
          </h1>
          <p className={styles.tagline}>
            A people-first movement for a <strong>direct, delegable democracy</strong>.
            Vote directly or delegate by topic to someone you trust and revoke anytime.
          </p>
          <p className={styles.sub}>
            Learn more about why there is so much division in America and how Voxcorda plans to fix the corruption in our political system with a Direct Liquid Democracy(DLD).
          </p>

          <nav className={styles.ctaRow} aria-label="Primary actions">
            <Link href="/projects/voxcorda/pilot" className={`${styles.btn} ${styles.primary}`}>
              Join the Pilot
            </Link>
            <Link href="/projects/voxcorda/manifesto" className={`${styles.btn} ${styles.secondary}`}>
              Read the Manifesto
            </Link>

          </nav>
        </div>

        {/* Optional: logo/illustration slot (keeps layout stable if you add art later) */}
        <div className={styles.art} aria-hidden="true" />
      </div>
    </section>
  );
}
