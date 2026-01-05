      {/* --- Cycle diagram + edge cases --- */}
      import BallotThreads from "@/components/demo/BallotThreads";
      export default function CycleDiagram() {
        return (
            <>
       <section className={styles.cycleSection}>
        <div className={styles.container}>
          <h2 className={styles.h2}>How the decision cycle works(Final Vision)</h2>
          <p className={styles.sub}>
            Focus one issue at a time: <strong>Issue selection → Solution development → Final vote</strong>.
            Transparent inputs, auditable outcomes, optional delegation by topic.
          </p>
        </div>

        <div className={styles.cycleGrid}>
          <div className={styles.cycleImageWrap}>
            <img
              className={styles.cycleImg}
              src="/images/cycle.png"
              alt="Voxcorda decision cycle: Issue → Solution → Final vote"
              loading="lazy"
            />
          </div>

          <aside className={styles.edgePanel} aria-label="Edge cases & guardrails">
            <h3 className={styles.edgeTitle}>Edge cases & guardrails</h3>
            <ul className={styles.edgeList}>
              <li className={styles.edgeItem}>
                <div className={styles.edgeHead}>Emergency decisions</div>
                <p className={styles.edgeText}>
                  For time-critical events, each state elects a standing pool of ~50 on-duty voters
                  (modest stipend) empowered to act within a narrow emergency scope. Their votes and
                  rationale are published immediately, followed by a full member ratification window.
                </p>
              </li>

              <li className={styles.edgeItem}>
                <div className={styles.edgeHead}>Privacy vs transparency</div>
                <p className={styles.edgeText}>
                  Individual ballots stay private by default. Full vote histories are public only for
                  <strong> representatives with ≥10 delegated voters</strong>. Below that threshold,
                  your ballot privacy is preserved.
                </p>
              </li>

              <li className={styles.edgeItem}>
                <div className={styles.edgeHead}>Voter fatigue</div>
                <p className={styles.edgeText}>
                  You can <strong>delegate your whole vote</strong> or <strong>delegate by topic</strong>
                  to someone you trust (revocable anytime). You keep your voice and can override your
                  delegate on any specific ballot.
                </p>
              </li>

              <li className={styles.edgeItem}>
                <div className={styles.edgeHead}>Buying votes</div>
                <p className={styles.edgeText}>
                  Today’s lobbying buys influence through opaque channels (and sometimes insider trading).
                  Voxcorda makes it <em>harder</em>: representatives with public vote histories face
                  continuous scrutiny, and delegations are revocable instantly—misrepresentation costs you
                  your delegates.
                </p>
              </li>

              <li className={styles.edgeItem}>
                <div className={styles.edgeHead}>tamper and corruption risk</div>
                <p className={styles.edgeText}>
                Blockchain helps because it creates a tamper-evident, append-only record of events: once a vote (or its cryptographic proof) is recorded, nobody can silently change past entries without producing a visible mismatch that anyone can check. Combined with digital signatures and public audit tools, that makes covert alteration of tallies far harder.
                This can help ensure that no entity can silently change results ensuring fairness in everyones vote.
                </p>
              </li>
            </ul>
          </aside>
        </div>
      </section> 
        <br />
      <br />
      <br /> 
      <h2>Ballot issues example for pilot(How we start with social media):</h2>
      <BallotThreads />
      </>
        );
      }
