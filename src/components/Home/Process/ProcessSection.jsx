import styles from "./ProcessSection.module.css";
import DescriptionCard from "@/components/Cards/DescriptionCard/DescriptionCard";
import Button from "@/components/ui/Button/Button";

export default function ProcessSection() {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="process-title" className={styles.h2}>How the Freelance Process Works</h2>
          <p className={styles.lead}>
            Clear steps from first contact to launch — fast when you pick the AI Special, or fully bespoke with a designer.
          </p>
        </header>

        <div className={styles.grid}>
          <DescriptionCard
            step={1}
            title="Contact & Instant Quote"
            
            content={
              <ul className={styles.list}>
                <li>Optional form → instant quote.</li>
                <li>Quote factors: <em>designer add-on</em>, <em>user auth / database</em>, <em>self-service articles (SEO)</em>, and more.</li>
                <li>You can still change options later.</li>
              </ul>
            }
          />

          <DescriptionCard
            step={2}
            title="Kickoff Call & Setup"
            
            content={
              <ul className={styles.list}>
                <li>We align on goals, audience, and the connections you want (Google, socials, media).</li>
                <li>50% deposit is paid.</li>
                <li>We set up GitHub, Vercel, and any database you’ll need.</li>
              </ul>
            }
          />

          <DescriptionCard
            step={3}
            title="Build & Design"
            
            content={
              <ul className={styles.list}>
                <li><strong>AI Special:</strong> we build quickly — if the features are there, that’s the design.</li>
                <li><strong>Designer add-on:</strong> mockups → feedback → polish.</li>
                <li>We iterate fast with your feedback.</li>
              </ul>
            }
          />

          <DescriptionCard
            step={4}
            title="Review, Revisions & Launch"
            
            content={
              <ul className={styles.list}>
                <li>Final review + optional revisions.</li>
                <li>Remainder payment is rendered.</li>
                <li>We deploy your site and hand over access.</li>
              </ul>
            }
          />
        </div>

        <div className={styles.ctaRow}>
          <Button label="Get AI Site ($400+)" color="var(--color-ai)" href="/services/ai-site" size="lg" />
          <Button label="Hire a Designer"   color="var(--color-accent)" href="/contact" size="lg" />
        </div>
      </div>
    </section>
  );
}
