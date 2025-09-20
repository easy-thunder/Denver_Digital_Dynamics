import Link from 'next/link'
import styles from './Terms.module.css'

export const metadata = {
  title: 'Terms of Service • Voxcorda',
}

export default function TermsPage() {
  const updated = 'September 2025' // update when needed

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.h1}>Voxcorda Terms of Service</h1>
        <p className={styles.subtitle}>
          Effective: {updated}. These Terms explain your rights and responsibilities when using
          Voxcorda products and pre-registration pages. By creating an account or submitting your
          email, you agree to these Terms.
        </p>
      </section>

      <nav className={styles.toc} aria-label="On this page">
        <ul>
          <li><a href="#summary">1. Quick Summary</a></li>
          <li><a href="#eligibility">2. Eligibility & Accounts</a></li>
          <li><a href="#privacy">3. Privacy & Data Use</a></li>
          <li><a href="#content">4. Your Content & Conduct</a></li>
          <li><a href="#ip">5. Intellectual Property</a></li>
          <li><a href="#emails">6. Emails & Notifications</a></li>
          <li><a href="#third-parties">7. Third-Party Services</a></li>
          <li><a href="#changes">8. Changes to the Service</a></li>
          <li><a href="#termination">9. Suspension & Termination</a></li>
          <li><a href="#warranty">10. Disclaimers</a></li>
          <li><a href="#liability">11. Limitation of Liability</a></li>
          <li><a href="#disputes">12. Governing Law & Disputes</a></li>
          <li><a href="#contact">13. Contact</a></li>
        </ul>
      </nav>

      <article className={styles.card}>
        <h2 id="summary">1) Quick Summary</h2>
        <ul className={styles.list}>
          <li>Voxcorda is building a people-first social platform that elevates posts with bipartisan support.</li>
          <li>During the pilot, we collect limited information (name, email, optional org, intents, and political lean) to tune the feed and contact you about releases.</li>
          <li>We don’t sell your data. You can request deletion at any time.</li>
          <li>Age: 16+ to join. Ages 13–15 require verifiable parental/guardian consent. Under 13 may not register.</li>
          <li>Be respectful. No illegal content, targeted harassment, or attempts to manipulate votes or delegations.</li>
        </ul>
      </article>

      <article className={styles.card}>
        <h2 id="eligibility">2) Eligibility & Accounts</h2>
        <p>
          You may use Voxcorda if you can form a binding contract with us and are not barred from
          using services under applicable law. The pilot program is intended for users <strong>16+</strong>.
          Users <strong>13–15</strong> may participate only with verifiable parental/guardian consent. Users
          under 13 are not permitted to register.
        </p>
        <p>
          You are responsible for the accuracy of information you provide and for any activity under
          your account. Keep your login secure and notify us promptly of any unauthorized use.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="privacy">3) Privacy & Data Use</h2>
        <p>
          Our <Link href="/projects/voxcorda/privacy" className={styles.link}>Privacy Policy</Link> explains how we handle personal data. Key points for the pilot:
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Data we collect at signup:</strong> name, email, optional organization, your
            interest (creator/advertiser/consumer), and <em>political lean (Democrat or Republican)</em>.
          </li>
          <li>
            <strong>Why political lean?</strong> Solely to compute cross-party engagement signals.
            Posts that receive support from both sides are elevated; one-sided heat is downranked.
            We do not sell this information.
          </li>
          <li>
            <strong>Storage:</strong> We store data with Supabase (managed Postgres + auth). We use an email service
            to send release notifications and, if you opt in, product updates.
          </li>
          <li>
            <strong>Retention & deletion:</strong> You can request deletion of your data.
            We will remove personal identifiers unless retention is required by law or to resolve disputes.
          </li>
          <li>
            <strong>Security:</strong> We use reasonable technical and organizational measures (e.g., access controls,
            role-based policies, encrypted transport). No system is 100% secure, but we work to protect your data.
          </li>
        </ul>
      </article>

      <article className={styles.card}>
        <h2 id="content">4) Your Content & Conduct</h2>
        <p>You’re responsible for what you post. You agree not to:</p>
        <ul className={styles.list}>
          <li>Break the law, infringe IP rights, doxx, or incite violence.</li>
          <li>Harass, threaten, or target individuals or protected classes.</li>
          <li>Post deceptive, manipulated, or undisclosed paid content.</li>
          <li>Attempt to game rankings, votes, or delegations (e.g., bots, fake accounts).</li>
          <li>Probe or disrupt the platform or others’ use of it.</li>
        </ul>
        <p>
          We may remove content or restrict accounts that violate these rules or applicable law. During
          the pilot, moderation processes will evolve; we’ll aim to document changes.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="ip">5) Intellectual Property</h2>
        <p>
          You retain rights to your content. By posting, you grant Voxcorda a worldwide, non-exclusive,
          royalty-free license to host, store, reproduce, and display your content for operating and
          improving the service. This license ends when your content is deleted from our systems, subject
          to normal backup/archival practices.
        </p>
        <p>
          Voxcorda’s trademarks, branding, and software are protected. Don’t use our marks without written permission.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="emails">6) Emails & Notifications</h2>
        <ul className={styles.list}>
          <li>
            <strong>Release Notification:</strong> if you sign up, we’ll email you when Version 1 is released.
          </li>
          <li>
            <strong>Project Updates (optional):</strong> only if you check the updates box. You can unsubscribe anytime.
          </li>
          <li>
            <strong>Advertiser Outreach:</strong> if you mark “advertiser” and leave a message, we may contact you to discuss fit.
          </li>
        </ul>
      </article>

      <article className={styles.card}>
        <h2 id="third-parties">7) Third-Party Services</h2>
        <p>
          We rely on third parties to provide parts of the service, such as Supabase for database/auth
          and Google Civics API for civic information. Use of those services is subject to their terms and
          privacy notices. We are not responsible for third-party websites or services outside Voxcorda’s control.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="changes">8) Changes to the Service</h2>
        <p>
          We may modify or discontinue features at any time, including during the pilot, and may update
          these Terms. If changes are material, we’ll take reasonable steps to notify you (for example,
          by email or in-product notice). Continued use after changes means you accept the updated Terms.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="termination">9) Suspension & Termination</h2>
        <p>
          We may suspend or terminate accounts that violate these Terms or create risk for the
          community. You can stop using the service at any time. Some sections (e.g., IP, liability,
          disputes) survive termination.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="warranty">10) Disclaimers</h2>
        <p>
          THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” WE DISCLAIM ALL WARRANTIES,
          EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          AND NON-INFRINGEMENT. We don’t guarantee uninterrupted or error-free operation.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="liability">11) Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Voxcorda and its affiliates will not be liable for
          indirect, incidental, special, consequential, or punitive damages, or any loss of profits or
          revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses, resulting from your access to or use of (or inability to access or use) the
          service. Our total liability for any claim is limited to the greater of $50 or the amount you
          paid us in the 12 months preceding the claim.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="disputes">12) Governing Law & Disputes</h2>
        <p>
          These Terms are governed by the laws of your U.S. state of residence (or, if outside the U.S., by
          the laws of the State of Colorado, excluding conflict of law principles). Disputes will be
          resolved in state or federal courts located in Colorado, and you consent to jurisdiction there.
          Where required by law, you may have additional rights in your jurisdiction.
        </p>
      </article>

      <article className={styles.card}>
        <h2 id="contact">13) Contact</h2>
        <p>
          Questions about these Terms or data practices? Reach us at&nbsp;
          <a className={styles.link} href="mailto:hello@voxcorda.org">hello@voxcorda.org</a>.
        </p>
        <p className={styles.note}>
          This page is for general information and isn’t legal advice. If you have specific concerns,
          consult an attorney licensed in your jurisdiction.
        </p>
      </article>

      <div className={styles.footerNav}>
        <Link href="projects/voxcorda/privacy" className={styles.link}>Privacy Policy</Link>
        <span className={styles.dot} />
        <Link href="/projects/voxcorda" className={styles.link}>Back to Pilot</Link>
      </div>
    </main>
  )
}
