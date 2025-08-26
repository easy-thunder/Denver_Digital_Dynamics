import styles from "./SkillsBanner.module.css";

export default function SkillsBanner({ items = [], height, speed }) {
  const doubled = [...items, ...items];
  const style = {
    ...(height ? { "--banner-height": height } : {}),
    ...(speed ? { "--banner-speed": speed } : {}),
  };

  return (
    <div className={styles.banner} style={style} role="marquee" aria-label="Scrolling skills">
      <div className={styles.track}>
        {doubled.map((txt, i) => (
          <span key={i} className={styles.item}>{txt}</span>
        ))}
      </div>
    </div>
  );
}
