export const THEME_KEYS = [
    "color-bg", "color-dark", "color-surface", "color-surface-2", "color-surface-3",
    "color-offwhite", "color-accent", "color-ai", "color-cyan", "color-border"
  ];
  
  export function applyTheme(theme) {
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme).forEach(([k, v]) => {
      if (THEME_KEYS.includes(k) && typeof v === "string") {
        root.style.setProperty(`--${k}`, v);
      }
    });
  }
  
  /** Remove inline overrides so defaults from globals.css take over */
  export function resetTheme() {
    const root = document.documentElement;
    THEME_KEYS.forEach(k => root.style.removeProperty(`--${k}`));
  }
  
  /** Read current computed values from CSS (useful for initializing controls) */
  export function readComputedTheme() {
    const cs = getComputedStyle(document.documentElement);
    const out = {};
    THEME_KEYS.forEach(k => (out[k] = cs.getPropertyValue(`--${k}`).trim()));
    return out;
  }
  
  