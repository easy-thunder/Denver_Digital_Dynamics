import styles from "./OfferCard.module.css";

export default function OfferCard({ title, content, buttons, underline = false }) {
  return (
    <section className={styles.card}>
      <h3 className={`${styles.title} ${underline ? styles.titleUnderline : ""}`}>{title}</h3>
      <div className={styles.content}>{content}</div>
      <div className={styles.buttons}>{buttons}</div>
    </section>
  );
}
