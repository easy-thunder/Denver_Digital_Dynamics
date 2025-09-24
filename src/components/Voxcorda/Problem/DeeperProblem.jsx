"use client";

import styles from "./DeeperProblem.module.css";

export default function DeeperProblem() {
  return (
    <section className={styles.wrap} aria-labelledby="trust-title">
      <div className="container">
        <p className={styles.kicker}>The Deeper Problem</p>
        <h2 id="trust-title" className={styles.title}>Trust</h2>

        <p className={styles.lead}>
          We can argue about prices, housing, and policy all day—but beneath every headline is the same fracture:
          <strong> we don’t trust the system</strong> to act in the public’s interest.
        </p>

        {/* Timeline: cause → effect */}
        <h3 className={styles.subhead}>How trust has eroded in our system</h3>
        <ol className={styles.timeline} aria-label="How trust erodes">
          <li className={styles.item}>
            <div className={styles.pin}>1</div>
            <div className={styles.text}>
              <strong>Opaque influence.</strong> Lobbyist dollars and backchannel access tilt the field before debate starts →
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.pin}>2</div>
            <div className={styles.text}>
              <strong>Self-interest in office.</strong> Our representatives face incentives to prioritize donors, party, and power over people →
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.pin}>3</div>
            <div className={styles.text}>
              <strong>Performative politics.</strong> Soundbites win attention; Re-hashing the same narrative for the last ten years →
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.pin}>4</div>
            <div className={styles.text}>
              <strong>Outrage engines.</strong> Our social media then plays off this rhetoric and outrage gets more attention than genuine solutions and distracts us from other issues →
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.pin}>5</div>
            <div className={styles.text}>
              <strong>Withdrawing consent.</strong> People disengage or radicalize; legitimacy breaks—and so do shared outcomes.
            </div>
          </li>
        </ol>

        <div className={styles.callout}>
          <p>
            <strong>The cost of broken trust:</strong> good ideas stall, bad actors thrive, and everyday people assume the game is rigged.
            <br />
            <em>No matter who we elect, billion-dollar pressure taints the process. We don't need just new representation or changed policy. We need a system that is harder to polute.</em>
          </p>
        </div>


      </div>
    </section>
  );
}
