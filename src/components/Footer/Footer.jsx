import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.section} aria-labelledby="site-footer">
      <div className={styles.inner}>
        {/* brand (logo + name + tag) */}
        <div className={styles.brandRow}>
          <Image
            src="/logos/diamond-weave-logo-1024.png"
            alt="Denver Digital Dynamics logo"
            width={28}
            height={28}
            className={styles.logo}
            priority={false}
          />
          <div className={styles.titleBox}>
            <div className={styles.title}>Denver Digital Dynamics</div>
            <div className={styles.tag}>Design • Develop • Deploy</div>
          </div>
        </div>

        {/* links */}
        <nav className={styles.links} aria-label="Site links">
          <div className={styles.colTitle}>Explore</div>
          <ul className={styles.linkList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/Pricing">Pricing & Quote</Link></li>
            <li><Link href="/Skills">Skills</Link></li>
            <li><a href="/downloads/JD_SWENG_RES.pdf" download>Resume (PDF)</a></li>
            {/* <li><Link href="/#projects">Projects</Link></li> */}
            {/* <li><Link href="/#faq">FAQ</Link></li> */}
          </ul>
        </nav>

        {/* contact */}
        <div className={styles.contact}>
          <div className={styles.colTitle}>Contact</div>
          <ul className={styles.contactList}>
            <li>
              <MapPin className={styles.icon} aria-hidden="true" />
              <span>Denver, CO</span>
            </li>
            <li>
              <Phone className={styles.icon} aria-hidden="true" />
              <a href="tel:17205803532">720&nbsp;580&nbsp;3532</a>
            </li>
            <li>
              <Mail className={styles.icon} aria-hidden="true" />
              <a href="mailto:jddiehl17@gmail.com">jddiehl17@gmail.com</a>
            </li>
          </ul>

          <div className={styles.socialRow} aria-label="Social profiles">
            <a className={styles.social} href="https://github.com/easy-thunder" aria-label="GitHub">
              <Github />
            </a>
            <a className={styles.social} href="https://www.linkedin.com/in/jake-diehl" aria-label="LinkedIn">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      {/* tiny bottom line */}
      <div className={styles.bottom}>
        <span>© {year} Denver Digital Dynamics</span>
        <span className={styles.dot} aria-hidden="true">•</span>
        <span>Ideas don’t grow in the dark. Let’s illuminate yours on the web.</span>
      </div>
    </footer>
  );
}
