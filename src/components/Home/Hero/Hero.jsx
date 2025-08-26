import Image from "next/image";
import styles from "./Hero.module.css";
import Button from "@/components/ui/button/Button";
import SkillsBanner from "@/components/SkillsBanner/SkillsBanner";
import OfferCard from "@/components/Cards/OfferCard/OfferCard";
import { skills } from "@/lib/skills";

export default function Hero() {
    return (
      <header >
        <div className={styles.inner}>
          
          <figure className={styles.mediaCorner}>
            <Image
              src="/photos_with_people/jake_and_john.png"               
              alt="Jake smiling with a colleague — friendly connection"
              fill
              priority
              className={styles.mediaImage}
            />
            <div className={styles.mediaShade} />
          </figure>
  
          
          <div className={styles.intro}>
            <h1 className={styles.title}>Meet Jake</h1>
            <p className={styles.subtitle}>I’m Jake, and this is Denver Digital Dynamics. Here you’ll find my résumé and portfolio, showcasing my skills for prospective employers, as well as the work I lead with a small team providing web development and business solutions.</p>

            <div className={styles.buttonsRow}>
              <Button label="Skills"  color="var(--color-accent)"   href="/skills" />
              <Button label="Résumé"  color="var(--color-surface-3)" href="/JD_SWENG_RES.pdf" />
            </div>
          </div>
  
          
          <div className={styles.rowFull}>
            <SkillsBanner items={skills} />
          </div>
  
          
          <div className={`${styles.cards} ${styles.rowFull}`}>

  
            <OfferCard
              title="Freelance"
              underline
              content={
                <p>
                  <strong>AI Special from $400</strong> — we plan together, I develop and deploy fast.
                  Limited customization (theme colors & goals). Or bring one of my designer friends for a bespoke look
                  (pricing discussed).
                </p>
              }
              buttons={
                <>
                  <Button label="Get AI Site ($400+)" color="var(--color-ai)"        href="/services/ai-site" />
                  <Button label="Hire a Designer"     color="var(--color-surface-3)" href="/contact" />
                </>
              }
            />

            <OfferCard
              title="For Employers"
              underline
              content={<p>Having worked to enhance AI performance combined with my start-up experience I have developed a wide set of skills. I would make me a great fit for many different roles. Dive deeper into my technical skills or view my résumé.</p>}
              buttons={
                <>
                  <Button label="Explore Technical Skills" color="var(--color-accent)"   href="/skills" />
                  <Button label="View Résumé"              color="var(--color-surface-3)" href="/JD_SWENG_RES.pdf" />
                </>
              }
            />
          </div>
        </div>
      </header>
    );
  }
  