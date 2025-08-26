import styles from "./Button.module.css";
import Link from "next/link";

export default function Button({
  label,
  color = "var(--color-accent)",
  href,
  onClick,
  size = "md",
  className = "",
  ...rest
}) {
  const style = { "--btn-bg": color };
  const cls = `${styles.button} ${styles[size] ?? ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} style={style} {...rest}>
        {label}
      </Link>
    );
  }
  return (
    <button className={cls} style={style} onClick={onClick} {...rest}>
      {label}
    </button>
  );
}
