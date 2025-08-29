"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import styles from "./FaqModal.module.css";

const faqs = [
  {
    q: "Why is the AI estimate so much cheaper?",
    a: "Choosing the AI design option trades some creative control for speed. We reuse proven layouts and let AI assist with structure, so more time goes into key features instead of pixel-perfect custom styling."
  },
  {
    q: "What if I don't like parts of the AI design?",
    a: "No problem—two rounds of revisions are expected. We can refactor specific elements (colors, spacing, sections) without redoing the whole build."
  },
  {
    q: "How are quotes calculated? What could make them higher?",
    a: "Quotes reflect estimated hours at $50/hr based on number of sections, content density, and add-ons (auth, database, e-commerce, animations). Costs rise if the scope grows after approval—e.g., major design changes after choosing the AI option."
  },
  {
    q: "How does payment work?",
    a: "50% upfront at kickoff, 50% on launch. You also get a 30-day post-launch bug-fix window for true defects (not new features)."
  },
  {
    q: "Do you build e-commerce?",
    a: "Yes. We can integrate Stripe for payments. Stripe charges its own processing fees, separate from the project price."
  }
];

export default function FaqModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  // open via custom event or URL param/hash
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("open-faq", openHandler);

    const params = new URLSearchParams(window.location.search);
    if (params.get("faq") === "open" || window.location.hash === "#faq") {
      setOpen(true);
    }
    return () => window.removeEventListener("open-faq", openHandler);
  }, []);

  // sync <dialog> state
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const close = () => {
    setOpen(false);
    // tidy URL if you opened with ?faq=open or #faq
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("faq");
      if (url.hash === "#faq") url.hash = "";
      window.history.replaceState({}, "", url);
    } catch {}
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={close}>
      <div className={styles.sheet} role="document" aria-labelledby="faq-title">
        <header className={styles.header}>
          <h3 id="faq-title" className={styles.title}>Frequently Asked Questions</h3>
          <button className={styles.close} onClick={close} aria-label="Close FAQ">
            <X />
          </button>
        </header>

        <div className={styles.content}>
          {faqs.map((item, i) => (
            <details key={i} className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.q}>{item.q}</span>
                <ChevronDown className={styles.chev} aria-hidden="true" />
              </summary>
              <div className={styles.a}>{item.a}</div>
            </details>
          ))}
        </div>

        <footer className={styles.footer}>
          Still have questions?{" "}
          <a href="/Pricing">Get a quick estimate</a> or{" "}
          <a href="mailto:jddiehl17@gmail.com">email me</a>.
        </footer>
      </div>
    </dialog>
  );
}
