import styles from "./BenefitsSection.module.css";
import { 
  Home, 
  MousePointerClick, 
  Share2, 
  Cloud, 
  TrendingUp, 
  Palette 
} from "lucide-react";

const items = [
  {
    title: "Your central hub",
    text: "Introduce clients to what you do in one trusted place.",
    icon: Home,
    variant: "teal",
  },
  {
    title: "Take action directly",
    text: "Sell or let clients contact / book with you instantly.",
    icon: MousePointerClick,
    variant: "gold",
  },
  {
    title: "Connect all your media",
    text: "Link your socials, YouTube, podcasts, and more.",
    icon: Share2,
    variant: "cyan",
  },
  {
    title: "Own your cloud",
    text: "Own your data. No developer hosting fees or subscriptions.",
    icon: Cloud,
    variant: "teal",
  },
  {
    title: "SEO boost",
    text: "We help your site climb the Google ladder.",
    icon: TrendingUp,
    variant: "gold",
  },
  {
    title: "Total creative control",
    text: "With a designer add-on, style it exactly your way.",
    icon: Palette,
    variant: "cyan",
  },
];

export default function BenefitsSection() {
  return (
    <section className={styles.section} aria-labelledby="benefits-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="benefits-title" className={styles.h2}>
            Why your business needs its own website
          </h2>
          <p className={styles.lead}>The hub of your brand!</p>
          <div className={styles.rule} />
        </header>

        <ul className={styles.grid}>
          {items.map(({ title, text, icon: Icon, variant }, i) => (
            <li key={i} className={`${styles.card} ${styles[`v_${variant}`]}`}>
              <div className={styles.iconWrap}>
                <Icon className={styles.icon} aria-hidden="true" />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
