import Estimator from "@/components/Pricing/Estimator";
import styles from "@/app/page.module.css";

export const metadata = {
  title: "Pricing & Instant Quote",
  description: "Rough estimate calculator for sites built with AI Special or a full designer.",
};

export default function PricingPage() {
  return (
    <main className={styles.page_content}>
      <Estimator />
    </main>
  );
}