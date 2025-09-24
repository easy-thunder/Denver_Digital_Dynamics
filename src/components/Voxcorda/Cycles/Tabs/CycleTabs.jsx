"use client";

import { useId, useState, KeyboardEvent, ReactNode } from "react";
import styles from "./CycleTabs.module.css";

export default function CyclesTabs({ items, defaultId }) {
  const tablistId = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id);

  const onKeyDown = (e) => {
    const idx = items.findIndex(i => i.id === active);
    if (idx < 0) return;
    if (e.key === "ArrowRight") {
      setActive(items[(idx + 1) % items.length].id);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      setActive(items[(idx - 1 + items.length) % items.length].id);
      e.preventDefault();
    } else if (e.key === "Home") {
      setActive(items[0].id);
      e.preventDefault();
    } else if (e.key === "End") {
      setActive(items[items.length - 1].id);
      e.preventDefault();
    }
  };

  return (
    <section className={styles.shell}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Problem cycles"
        id={tablistId}
      >
        {items.map(i => (
          <button
            key={i.id}
            role="tab"
            aria-selected={active === i.id}
            aria-controls={`${i.id}-panel`}
            id={`${i.id}-tab`}
            tabIndex={active === i.id ? 0 : -1}
            className={`${styles.tab} ${active === i.id ? styles.tabActive : ""}`}
            onClick={() => setActive(i.id)}
            onKeyDown={onKeyDown}
          >
            <span className={styles.tabLabel}>{i.label}</span>
            {i.badge && <span className={styles.badge}>{i.badge}</span>}
          </button>
        ))}
      </div>

      {items.map(i => (
        <div
          key={i.id}
          role="tabpanel"
          id={`${i.id}-panel`}
          aria-labelledby={`${i.id}-tab`}
          hidden={active !== i.id}
          className={styles.panel}
        >
          {i.content}
        </div>
      ))}
    </section>
  );
}
