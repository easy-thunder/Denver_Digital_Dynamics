"use client";

import { useEffect, useState } from "react";
import styles from "./ThemePlayground.module.css";
import Button from "@/components/ui/Button/Button";
import { applyTheme, resetTheme, readComputedTheme } from "@/lib/theme";
import {
  RefreshCcw,
  BadgeDollarSign,
  CalendarClock,
  Wrench,
  Accessibility,
  Palette,
} from "lucide-react";

const PRESETS = [
  {
    key: "default",
    label: "Default (Teal + Gold)",
    theme: {
      "color-bg": "#0f141b",
      "color-dark": "#262a38",
      "color-surface": "#1c2230",
      "color-surface-2": "#162029",
      "color-surface-3": "#0e1821",
      "color-offwhite": "#e0d8d1",
      "color-accent": "#A77B3A",
      "color-ai": "#28b483",
      "color-cyan": "#31c3d9",
      "color-border": "rgba(255,255,255,0.16)"
    }
  },
  {
    key: "ocean",
    label: "Ocean (Deep Teal + Cyan)",
    theme: {
      "color-bg": "#0b1418",
      "color-dark": "#0e1c22",
      "color-surface": "#10242b",
      "color-surface-2": "#0e2026",
      "color-surface-3": "#0a171c",
      "color-offwhite": "#e2edf0",
      "color-accent": "#1fa3c6",
      "color-ai": "#1fbf8b",
      "color-cyan": "#35d9ed",
      "color-border": "rgba(255,255,255,0.14)"
    }
  },
  {
    key: "sandstone",
    label: "Sandstone (Warm Gold)",
    theme: {
      "color-bg": "#15120e",
      "color-dark": "#1f1a14",
      "color-surface": "#241e17",
      "color-surface-2": "#1b1712",
      "color-surface-3": "#17130f",
      "color-offwhite": "#efe6da",
      "color-accent": "#caa66b",
      "color-ai": "#8fbf5a",
      "color-cyan": "#9ecad1",
      "color-border": "rgba(255,255,255,0.12)"
    }
  }
];

export default function ThemePlayground() {
  const [theme, setTheme] = useState(null);

  
  useEffect(() => {
    setTheme(readComputedTheme());
  }, []);

  useEffect(() => {
    if (theme) applyTheme(theme); 
  }, [theme]);

  const pickPreset = (preset) => setTheme(preset.theme);

  const onChangeColor = (key, value) => {
    const next = { ...(theme || {}), [key]: value };
    setTheme(next);
  };

  const onReset = () => {
    resetTheme();
    setTheme(readComputedTheme());
  };

  if (!theme) return null;

  const control = (key, label) => (
    <div className={styles.control} key={key}>
      <label htmlFor={key}>{label}</label>
      <input
        id={key}
        type="color"
        value={toHex(theme[key])}
        onChange={(e) => onChangeColor(key, e.target.value)}
        aria-label={label}
      />
      <code className={styles.code}>--{key}: {theme[key]}</code>
    </div>
  );

  return (
    <section className={styles.section} aria-labelledby="theme-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="theme-title" className={styles.h2}>Built for change</h2>
          <p className={styles.lead}>
            As your brand evolves—new palette, seasonal campaigns, or a full rebrand—this site adapts in minutes.
            Everything is driven by design tokens (CSS variables), so changing colors is a controlled, low-risk update.
            Try a preset or tweak a token to see the system shift live. <strong>Refresh</strong> to return to defaults.
          </p>
        </header>

        {/* Why this matters */}
        <ul className={styles.reasons} aria-label="Why design tokens matter">
          <Reason
            icon={<RefreshCcw />}
            title="Future-proof"
            text="Palettes and brand accents change over time. Tokens let you update once and propagate everywhere."
            variant="teal"
          />
          <Reason
            icon={<CalendarClock />}
            title="Campaign-ready"
            text="Run seasonal or promo themes without rewriting components."
            variant="cyan"
          />
          <Reason
            icon={<Accessibility />}
            title="Accessible by design"
            text="Adjust contrast/tones to meet WCAG targets while keeping the layout intact."
            variant="gold"
          />
          <Reason
            icon={<Wrench />}
            title="Lower maintenance"
            text="Fewer code changes, fewer regressions—edit variables, not components."
            variant="teal"
          />
          <Reason
            icon={<BadgeDollarSign />}
            title="Cost & time savings"
            text="Small changes stay small. Faster iterations, less billable time for minor updates."
            variant="gold"
          />
          <Reason
            icon={<Palette />}
            title="Creative control"
            text="If you hire a designer later, we plug in their palette and typography without a rebuild."
            variant="cyan"
          />
        </ul>

        {/* Presets */}
        <div className={styles.presets}>
          {PRESETS.map(p => (
            <button key={p.key} className={styles.preset} onClick={() => pickPreset(p)}>
              <div className={styles.swatches}>
                <span style={{ background: p.theme["color-accent"] }} />
                <span style={{ background: p.theme["color-ai"] }} />
                <span style={{ background: p.theme["color-cyan"] }} />
                <span style={{ background: p.theme["color-bg"] }} />
                <span style={{ background: p.theme["color-surface"] }} />
              </div>
              <div className={styles.presetLabel}>{p.label}</div>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {control("color-accent", "Accent (Gold)")}
          {control("color-ai", "Accent 2 (Teal)")}
          {control("color-cyan", "Accent 3 (Cyan)")}
          {control("color-bg", "Page Background")}
          {control("color-surface", "Surface 1")}
          {control("color-surface-2", "Surface 2")}
          {control("color-surface-3", "Surface 3")}
          {control("color-offwhite", "Text (Offwhite)")}
          {control("color-border", "Border (rgba)")}
        </div>

        <div className={styles.actions}>
          <Button label="Reset to defaults" color="var(--color-surface-3)" onClick={onReset} />
        </div>
      </div>
    </section>
  );
}

/** small item component for the reasons grid */
function Reason({ icon, title, text, variant = "teal" }) {
  return (
    <li className={`${styles.reason} ${styles[`v_${variant}`]}`}>
      <div className={styles.reasonIcon}>{icon}</div>
      <div>
        <div className={styles.reasonTitle}>{title}</div>
        <div className={styles.reasonText}>{text}</div>
      </div>
    </li>
  );
}

/* normalize any rgba/rgb/var value to a hex for <input type="color"> */
function toHex(value) {
  if (!value) return "#000000";
  const v = value.trim();
  if (v.startsWith("#")) return normalizeHex(v);

  
  const probe = document.createElement("span");
  probe.style.color = v;
  document.body.appendChild(probe);
  const rgb = getComputedStyle(probe).color; 
  probe.remove();

  const m = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return "#000000";

  const [r, g, b] = m.slice(1, 4).map(n => Math.max(0, Math.min(255, parseInt(n, 10))));
  return "#" + [r, g, b].map(n => n.toString(16).padStart(2, "0")).join("");
}

function normalizeHex(h) {
  const x = h.replace(/[^#a-fA-F0-9]/g, "");
  if (x.length === 4) { 
    return "#" + [...x.slice(1)].map(ch => ch + ch).join("");
  }
  if (x.length === 7) return x.slice(0, 7);  
  if (x.length === 9) return x.slice(0, 7);  
  return "#000000";
}
