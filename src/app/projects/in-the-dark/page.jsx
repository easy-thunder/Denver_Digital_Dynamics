import Image from "next/image";
import Link from "next/link";
import styles from "./inthedark.module.css";

export const metadata = {
  title: "In The Dark — Project Details",
};

export default function InTheDarkProjectPage() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Game project</p>
          <h1 className={styles.title}>
            In The Dark
            <span className={styles.titleTagline}>
              Pixel-horror survival with dynamic light
            </span>
          </h1>

          <p className={styles.subtitle}>
            In The Dark is a top-down pixel survival game built in Python and
            Pygame. You move through a hostile world where light is limited,
            danger hides in the shadows, and every flashlight cone matters.
          </p>

          <div className={styles.heroMeta}>
            <div className={styles.pillList}>
              <span className={styles.pill}>Pixel art</span>
              <span className={styles.pill}>Dynamic lighting</span>
              <span className={styles.pill}>Pygame</span>
            </div>

            <div className={styles.heroActions}>
              {/* TODO: replace href with itch.io / demo link when ready */}
              <a
                href="https://github.com/easy-thunder/inTheDark"
                target="_blank"
                rel="noreferrer"
                className={styles.primaryCta}
              >
                Github Repo
              </a>
              <Link href="/projects" className={styles.secondaryCta}>
                Back to projects
              </Link>
            </div>
          </div>
        </div>

        {/* Gameplay GIF */}
        <div className={styles.heroMedia}>
          <div className={styles.crtFrame}>
            <div className={styles.crtInner}>
              <Image
                src='/In_The_Dark_Gameplay.gif'
                alt="Gameplay footage of In The Dark, showing pixel survival action."
                width={520}
                height={340}
                unoptimized
              />
            </div>
            <div className={styles.crtFooter}>
              <span className={styles.scanLabel}>NOW PLAYING · IN THE DARK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className={styles.summary}>
        <div className={styles.summaryCard}>
          <h2>Project at a glance</h2>
          <div className={styles.summaryGrid}>
            <div>
              <h3>Role</h3>
              <p>Game design, programming, pixel art direction, systems design</p>
            </div>
            <div>
              <h3>Stack</h3>
              <p>Python · Pygame · Tiled-style level design · Sprite sheets</p>
            </div>
            <div>
              <h3>Core idea</h3>
              <p>
                A relentless, atmosphere-heavy survival game where light is a
                resource, vision is limited, and the environment can turn on
                you at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <h2>Key features</h2>
        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <h3>Dynamic day / night cycle & lighting</h3>
            <p>
              Light isn&#39;t just visual flair — it&#39;s a mechanic. The game
              simulates a full day/night loop:
            </p>
            <ul>
              <li>Dawn, day, dusk, and night lighting states</li>
              <li>
                Flashlight cones that cut through darkness and reveal enemies
              </li>
              <li>
                Visibility and mood that change as the world transitions from
                safe to hostile
              </li>
            </ul>
            <p>
              The lighting system drives tension: you can&#39;t see everything,
              and that&#39;s the point.
            </p>
          </article>

          {/* <article className={styles.featureCard}>
            <h3>Pixel art world with horror atmosphere</h3>
            <p>
              In The Dark leans into a low-resolution aesthetic to make every
              silhouette and flicker count:
            </p>
            <ul>
              <li>Custom tiles for terrain, structures, and obstacles</li>
              <li>
                Creature designs that blend zombie and otherworldly influences
              </li>
              <li>
                High-contrast palettes to keep shapes readable, even in low
                light
              </li>
            </ul>
            <p>
              The result feels like a lost cartridge from a weirder timeline.
            </p>
          </article> */}

          <article className={styles.featureCard}>
            <h3>Enemy AI & encounter design</h3>
            <p>
              Enemies have their own trait system from basic attributes such as speed, damage, and size to which Virtual Inteligence they follow.
            </p>
            <ul>
              <li>Basic chase behaviors for roaming threats</li>
              <li>
                Enemy difficult scales with time and distance from the point of spawn
              </li>
            </ul>
          </article>

          <article className={styles.featureCard}>
            <h3>Physics-aware movement & collisions</h3>
            <p>
              Movement is designed to feel responsive without losing the
              crunchy, retro feel:
            </p>
            <ul>
              <li>Tile and object collisions managed in Pygame</li>
              <li>Smooth directional movement with pixel-snapped rendering</li>
              <li>
                Layouts shaped around chokepoints, flanking routes, and escape
                paths
              </li>
            </ul>
          </article>

          <article className={styles.featureCard}>
            <h3>Built for iteration & expansion</h3>
            <p>
              Under the hood, systems are modular so the game can grow:
            </p>
            <ul>
              <li>Separate modules for rendering, input, VI, and UI</li>
              <li>
                Data-driven definitions for items and enemies for easier tuning(Allows )
              </li>
              <li>
                Room to add new enemy types, and weapons
                without rewrites
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* Outcome */}
      <section className={styles.outcome}>
        <div className={styles.outcomeCard}>
          <h2>Outcome</h2>
          <p>
            In The Dark serves as a playground for experimenting with lighting,
            AI, and progression systems inside a tightly scoped pixel-horror
            world. It blends low-fi visuals with deliberate systems design,
            making each step into the dark feel risky, intentional, and just a
            little bit cursed. The project is ongoing, I decided that Voxcorda was more important at this time.
          </p>
        </div>
      </section>
    </main>
  );
}
