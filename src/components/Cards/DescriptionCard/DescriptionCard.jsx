import Image from "next/image";
import styles from "./DescriptionCard.module.css";

export default function DescriptionCard({
  title,
  content,
  imageSrc,          
  imageAlt = "",
  step,              
}) {
  return (
    <section className={`${styles.card} ${imageSrc ? styles.withImage : ""}`}>
      {imageSrc && (
        <div className={styles.media}>
          <Image src={imageSrc} alt={imageAlt} fill className={styles.mediaImg} />
          <div className={styles.mediaShade} />
        </div>
      )}

      <div className={styles.body}>
        {step !== undefined && (
          <div className={styles.stepBadge}>Step {step}</div>
        )}
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.content}>{content}</div>
      </div>
    </section>
  );
}
