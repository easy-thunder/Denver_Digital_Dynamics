"use client";

import { useState } from "react";
import styles from "./HousingCycle.module.css";

const STEPS = [
  {
    id: "acquire",
    title: "Investors acquire housing",
    blurb:
      "Institutional buyers and asset managers purchase large batches of homes and build-to-rent stock as yield vehicles.",
    sideEffects: [
      "Listings vanish from first-time buyers",
      "Bid wars + cash offers outpace wages",
      "Neighborhood ownership rates fall",
    ],
    objections: [
      {
        q: "Isn’t investment adding needed capital?",
        a: "Capital helps build—but bulk acquisition of existing stock reduces for-sale supply and concentrates pricing power.",
      },
    ],
  },
  {
    id: "scarcity",
    title: "For-sale supply shrinks",
    blurb:
      "Fewer homes reach the market; remaining inventory skews pricier. Starter homes become rare in many metros.",
    sideEffects: [
      "Longer commutes to reach affordable areas",
      "‘Missing middle’ housing disappears",
      "Price-to-income ratios detach from reality",
    ],
    objections: [
      {
        q: "Can’t buyers just look farther out?",
        a: "‘Drive till you qualify’ pushes sprawl, transport costs, and time poverty—costs not shown in the listing price.",
      },
    ],
  },
  {
    id: "rent-shift",
    title: "Demand shifts to rentals",
    blurb:
      "Locked-out buyers become renters. Concentrated ownership sets amenities and terms, nudging average rents upward.",
    sideEffects: [
      "Lease fees, dynamic pricing, junk add-ons",
      "Lower mobility as moving costs spike",
    ],
    objections: [
      {
        q: "Aren’t rentals flexible for workers?",
        a: "Yes, but when renting isn’t a choice, the bargaining power shifts heavily to owners with scale and data advantages.",
      },
    ],
  },
  {
    id: "rents-rise",
    title: "Rents and valuations climb",
    blurb:
      "Higher average rents justify higher valuations; owners hold units off market or time sales for peak yields.",
    sideEffects: [
      "Local wages chase housing inflation",
      "Household formation is delayed",
    ],
    objections: [
      {
        q: "Isn’t this just supply and demand?",
        a: "True—but supply is actively constrained by zoning, bulk ownership, and off-market holds, engineering scarcity beyond organic demand.",
      },
    ],
  },
  {
    id: "hold-tight",
    title: "Holding reinforces scarcity",
    blurb:
      "As yields improve, owners hold tighter. Scarcity feeds profits; communities lose stability and buy-paths.",
    sideEffects: [
      "School churn; weaker civic ties",
      "Wealth gap widens via lost equity",
    ],
    objections: [
      {
        q: "Won’t new construction solve it?",
        a: "Not if entitlements throttle diverse housing types and timelines; missing-middle reforms + anti-hoarding policies matter.",
      },
    ],
  },
];

export default function HousingCycle() {
  const [active, setActive] = useState(STEPS[0].id);
  const current = STEPS.find((s) => s.id === active) || STEPS[0];

  const onKey = (e, idx) => {
    const last = STEPS.length - 1;
    if (e.key === "ArrowRight") { setActive(STEPS[(idx + 1) % STEPS.length].id); e.preventDefault(); }
    if (e.key === "ArrowLeft")  { setActive(STEPS[(idx - 1 + STEPS.length) % STEPS.length].id); e.preventDefault(); }
    if (e.key === "Home")       { setActive(STEPS[0].id); e.preventDefault(); }
    if (e.key === "End")        { setActive(STEPS[last].id); e.preventDefault(); }
  };

  return (
    <section className={styles.shell} aria-labelledby="housing-title">
      <h3 id="housing-title" className={styles.title}>Housing Crisis Cycle</h3>

      {/* Diagram */}
      <div className={styles.diagram}>
        <svg className={styles.ring} viewBox="0 0 200 200" role="img" aria-label="Housing cycle diagram">
          <circle cx="100" cy="100" r="78" className={styles.ringCircle} />
          <path d="M160 100 l12 -6 l-4 6 l4 6 z" className={styles.arrow} />
          {STEPS.map((step, i) => {
            const angle = (i / STEPS.length) * 2 * Math.PI - Math.PI / 2;
            const x = 100 + 78 * Math.cos(angle);
            const y = 100 + 78 * Math.sin(angle);
            const isActive = active === step.id;
            return (
              <g key={step.id} transform={`translate(${x}, ${y})`}>
                <circle r={isActive ? 8 : 6} className={isActive ? styles.nodeActive : styles.node} />
              </g>
            );
          })}
        </svg>

        {/* tablist for steps */}
        <div className={styles.nodeList} role="tablist" aria-label="Cycle steps">
          {STEPS.map((step, idx) => {
            const isActive = active === step.id;
            return (
              <button
                key={step.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${step.id}`}
                id={`tab-${step.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`${styles.nodeItem} ${isActive ? styles.nodeItemActive : ""}`}
                onClick={() => setActive(step.id)}
                onKeyDown={(e) => onKey(e, idx)}
              >
                <span className={styles.nodeIndex}>{idx + 1}</span>
                <span className={styles.nodeLabel}>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* details */}
      <div
        className={styles.panel}
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
      >
        <p className={styles.blurb}>{current.blurb}</p>

        <div className={styles.cols}>
          <div className={styles.card}>
            <h4>Side effects</h4>
            <ul className={styles.ul}>
              {current.sideEffects.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div className={styles.card}>
            <h4>Objections & answers</h4>
            <dl className={styles.faq}>
              {current.objections.map((o, i) => (
                <div key={i} className={styles.qa}>
                  <dt>{o.q}</dt>
                  <dd>{o.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
