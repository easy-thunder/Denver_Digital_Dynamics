import Link from 'next/link'
import styles from './Privacy.module.css'

export const metadata = {
  title: 'Privacy Policy • Voxcorda',
}

export default function PrivacyPage() {
  const updated = 'September 2025'

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.h1}>Voxcorda Privacy Policy</h1>
        <p className={styles.subtitle}>
          Effective: {updated}. This Privacy Policy explains how Voxcorda collects, uses, and
          protects your information. By signing up or using our services, you agree to this Policy.
        </p>
      </section>

      <nav className={styles.toc} aria-label="On this page">
        <ul>
          <li><a href="#summary">1. Quick Summary</a></li>
          <li><a href="#info">2. Information We Collect</a></li>
          <li><a href="#use">3. How We Use Information</a></li>
          <li><a href="#share">4. Sharing & Disclosure</a></li>
          <li><a href="#storage">5. Data Storage & Security</a></li>
          <li><a href="#choices">6. Your Choices & Rights</a></li>
          <li><a href="#children">7. Children & Parental Consent</a></li>
          <li><a href="#updates">8. Changes to This Policy</a></li>
          <li><a href="#contact">9. Contact Us</a></li>
        </ul>
      </nav>

      <article className={styles.card}>
        <h2 id="summary">1) Quick Summary</h2>
        <ul className={styles.list}>
          <li>We collect minimal information at sign-up (name, email, political lean, and your interest in Voxcorda).</li>
          <li>We use this information to personalize the bipartisan feed, send release notifications, and improve the platform.</li>
          <li>We store data with Supabase (managed Postgres + auth) and email service providers.</li>
          <li>We do not sell your data. You can request deletion at any time.</li>
        </ul>
      </article>

      <article className={styles.card}>
        <h2 id="info">2) Information We Collect</h2>
        <p>When you sign up or interact with Voxcorda, we may collect:</p>
        <ul className={styles.list}>
          <li><strong>Identity:</strong> Name, email, optional organization.</li>
          <li><strong>Intent:</strong> Whether you are a creator, advertiser, or consumer.</li>
          <li><strong>Political lean:</strong> Democrat or Republican. This is used only for the ranking algorithm to detect bipartisan support.</li>
          <li><strong>Usage data:</strong> Log information, device/browser type, interactions with our pages.</li>
          <li><strong>Advertiser info:</strong> If you select advertiser, we collect any message you provide about campaigns, audience, or goals.</li>
        </ul>
      </article>

      <article className={styles.card}>
        <h2 id="use">3) How We Use Information</h2>
        <p>We use your information to:</p>
        <ul className={styles.list}>
          <li>Send you a one time release notification and updates (if opted-in).</li>
          <li>Improve our ranking algorithm by identifying bipartisan vs one-sided engagement.</li>
          <li>Link posts to real-world issues via the Google Civics API.</li>
        </ul>
      </article>

      <article className={styles.card}>
        <h2 id="share">4) Sharing & Disclosure</h2>
        <p>We do not sell or rent your personal data. We may share information with:</p>
        <ul className={styles.list}>
          <li><strong>Service providers:</strong> Supabase (database + auth) and email providers to deliver services.</li>
          <li><strong>Legal authorities:</strong> If required by law, subpoena, or to protect rights/safety.</li>
          <li><strong>Advertiser outreach:</strong> If you select advertiser, we may reach out directly using your provided contact details.</li>
        </ul>
      </article>

      <article className={styles.card}>
        <h2 id="storage">5) Data Storage & Security</h2>
        <p>
          We store your data in Supabase, which uses secure managed Postgres with authentication and
          access controls. Data is encrypted in transit (TLS) and access is role-limited. No system is
          perfectly secure, but we take reasonable steps to protect your information. We don't use passwords.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="choices">6) Your Choices & Rights</h2>
        <ul className={styles.list}>
          <li><strong>Unsubscribe:</strong> You can opt out of updates anytime by following the unsubscribe link in our emails.</li>
          <li><strong>Data deletion:</strong> Email us to request deletion of your information from our systems.</li>
          <li><strong>Corrections:</strong> Contact us to update inaccurate or incomplete data.</li>
          <li><strong>Privacy rights:</strong> Depending on your location, you may have additional rights (e.g., GDPR or CCPA).</li>
        </ul>
      </article>

      <article className={styles.card}>
        <h2 id="children">7) Children & Parental Consent</h2>
        <p>
          Voxcorda is not intended for children under 13. Users aged 13–15 may join only with
          verifiable parental/guardian consent. Users under 13 are not permitted to register.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="updates">8) Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy as the service evolves. If changes are material, we will
          notify you via email or an in-product notice. The latest version will always be available on
          this page.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="contact">9) Contact Us</h2>
        <p>
          Questions about this Privacy Policy? Reach us at&nbsp;
          <a className={styles.link} href="mailto:hello@voxcorda.org">hello@voxcorda.org</a>.
        </p>
      </article>

      <div className={styles.footerNav}>
        <Link href="/terms" className={styles.link}>Terms of Service</Link>
        <span className={styles.dot} />
        <Link href="/projects/voxcorda" className={styles.link}>Back to Pilot</Link>
      </div>
    </main>
  )
}
