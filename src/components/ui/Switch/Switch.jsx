
import styles from "./Switch.module.css";

export default function Switch({ checked, onChange }) {
    return (
      <span className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className={styles.slider} />
      </span>
    );
  }