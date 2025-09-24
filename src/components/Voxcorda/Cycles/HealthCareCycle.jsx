"use client";

import styles from "./HealthcareCycle.module.css";

export default function HealthcareCycle() {
  return (
    <section className={styles.wrap} aria-labelledby="hc-title">
      <h3 id="hc-title" className={styles.title}>Healthcare Cost Cycle</h3>

      {/* Simple inline diagram (cause → effect → result → repeat) */}
      <ol className={styles.flow} aria-label="Cause and effect loop">
        <li>
          <strong>Reimbursements lag</strong>
          <span>Hospitals aren’t fully paid for care delivered.</span>
        </li>
        <li>
          <strong>Hospitals raise prices</strong>
          <span>List prices go up to cover shortfalls.</span>
        </li>
        <li>
          <strong>Insurers push back</strong>
          <span>Denials, narrower networks, higher deductibles.</span>
        </li>
        <li>
          <strong>Patients delay care</strong>
          <span>Higher bills → skipped visits → worse outcomes.</span>
        </li>
        <li>
          <strong>More uncompensated care</strong>
          <span>Bad debt grows, restarting the cycle.</span>
        </li>
      </ol>

      <div className={styles.columns}>
        <div className={styles.card}>
          <h4>Side Effects</h4>
          <ul>
            <li>Rural hospital closures; longer travel for basic care.</li>
            <li>Clinician burnout and attrition.</li>
            <li>Preventive care drops; ER spikes (costlier).</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h4>Objections & Answers</h4>
          <dl className={styles.faq}>
            <dt>“It’s just the market.”</dt>
            <dd>
              Healthcare isn’t a typical market—nobody “shops” during a heart attack. Transparency and accountability are prerequisites.
            </dd>
            <dt>“Insurers are the problem.”</dt>
            <dd>
              Insurers contribute, but the structure makes each actor blame another. The loop itself produces spiraling costs.
            </dd>
            <dt>“Government coverage solves it.”</dt>
            <dd>
              Coverage ≠ sustainability. Costs reappear in taxes, premiums, and hospital solvency without structural fixes.
            </dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
