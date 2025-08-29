"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import styles from "./HomeButton.module.css";

/**
 * HomeButton
 * Props:
 * - href: string (default "/")
 * - showLabel: boolean (default false)
 * - label: string (default "Home")
 * - size: "sm" | "md" | "lg" (default "md")
 * - floating: boolean (default false)
 * - position: "bottom-right" | "bottom-left" | "top-right" | "top-left" (default "bottom-right")
 * - className: string (optional)
 */
export default function HomeButton({
  href = "/",
  showLabel = false,
  label = "Home",
  size = "md",
  floating = false,
  position = "bottom-right",
  className = "",
  ...rest
}) {
  const cls = [
    styles.homeBtn,
    styles[size] || "",
    showLabel ? "" : styles.iconOnly,
    floating ? styles.floating : "",
    floating && styles[position] ? styles[position] : "",
    className,
  ].join(" ");

  return (
    <Link
      href={href}
      aria-label="Go to homepage"
      title={label}
      className={cls}
      {...rest}
    >
      <Home className={styles.homeIcon} aria-hidden="true" />
      {showLabel && <span className={styles.label}>{label}</span>}
    </Link>
  );
}
