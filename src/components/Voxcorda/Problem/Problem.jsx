import styles from "./Problem.module.css";

export default function Problem() {
  return (
    <section className={styles.problem} aria-labelledby="vc-problem-title">
      <div className="container">
        <h2 id="vc-problem-title" className={styles.title}>
          The Problem We All Live In
        </h2>

        {/* We All Play a Role */}
        <article className={styles.block} aria-labelledby="vc-problem-role">
          <h3 id="vc-problem-role" className={styles.head}>
            How We All Contribute to Moving the Goal Post for Success Further Away
          </h3>
          <p>
            Every dollar we spend and every click we give is a signal. For decades, those signals
            pushed our economy toward hollowed-out opportunity. We chased lower prices and, without
            intending to, rewarded outsourcing, shrinkflation, consolidation, and worker
            misclassification. Asset managers buy up housing to extract rent while young workers
            watch the future recede like a mirage.
          </p>
          <p>
            We don’t intend to feed this system, but we have been blindly voting for the collapse of the American dream with the weight of our wallets.
          </p>
        </article>

        {/* Advocacy Alone Isn’t Enough */}
        <article className={styles.block} aria-labelledby="vc-problem-advocacy">
          <h3 id="vc-problem-advocacy" className={styles.head}>
            Why Advocacy Alone Hasn’t Been Enough
          </h3>
          <p>
            Advocacy groups have urged us for years to buy fair, invest responsibly, pressure
            politicians. Yet the goal posts keep moving. Shareholder returns, consolidated market
            power, and political self-interest don’t shift with polite asks. Awareness matters, but
            without new structures, the cycle repeats.
          </p>
        </article>

        {/* Algorithms Reward Outrage */}
        <article className={styles.block} aria-labelledby="vc-problem-algos">
          <h3 id="vc-problem-algos" className={styles.head}>
            The Algorithmic Divide
          </h3>
          <p>
            Social platforms aren’t neutral. Ranking systems amplify heat, not solutions. Outrage
            spreads faster than compromise, so our social algorithm intensifies our American division. The mirror warps: it feels
            like the other side is only angry, when most people want the same basics—fairness,
            dignity, security.
          </p>
          <p>
            I’ve been caught in it too—my feed convinced me the “other side” was cruel. Stepping
            back, I saw something simpler: people protecting the value of their work and ideas. That isn’t
            evil—it’s human. But platforms rarely reward nuance or empathy.
          </p>
        </article>



      </div>
    </section>
  );
}
