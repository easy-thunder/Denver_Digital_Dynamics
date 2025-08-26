import Hero from "@/components/Home/Hero/Hero";
import styles from "@/app/page.module.css";
import ProcessSection from "@/components/Home/Process/ProcessSection";
import BenefitsSection from "@/components/Home/Benefits/BenefitsSection";
import ThemePlayground from "@/components/Home/ThemePlayground/ThemePlayground";
import Estimator from "@/components/Pricing/Estimator";
export default function Home() {
  return (
    <main className={styles.page_content}>
      <Hero />
      <BenefitsSection />
      <ProcessSection />
      <ThemePlayground />
      <Estimator />
    </main>
  );
}