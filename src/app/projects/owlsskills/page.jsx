import Link from "next/link";
// import Image from "next/image";
import styles from "./owlsskills.module.css";

export const metadata = {
  title: "OWLS Skills — Project Details",
};

export default function OwlSkillsProjectPage() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Client spotlight</p>
          <h1 className={styles.title}>
            OWLS Skills
            <span className={styles.titleTagline}>
              Outdoorsy Women Learning Survival
            </span>
          </h1>

          <p className={styles.subtitle}>
            A women-led outdoor survival school needed a modern, story-driven
            site that kept their existing booking flow while making it easy to
            publish new articles, photos, and course updates.
          </p>

          <div className={styles.heroMeta}>
            <div className={styles.pillList}>
              <span className={styles.pill}>Brand-aligned UX</span>
              <span className={styles.pill}>Content tooling</span>
              <span className={styles.pill}>Supabase CDN</span>
            </div>

            <div className={styles.heroActions}>
              {/* TODO: replace href with the live OWLS Skills URL */}
              <a
                href="https://www.owlsskills.com/"
                target="_blank"
                rel="noreferrer"
                className={styles.primaryCta}
              >
                View live site
              </a>
              <Link href="/" className={styles.secondaryCta}>
                Back to projects
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroMedia}>
          {/* <div className={styles.polaroidStack}>
            <div className={styles.polaroid}>
              <div className={styles.polaroidInner}>
                <Image
                  src="/projects/owlsskills/hero-collage.jpg"
                  alt="OWLS Skills hero collage with polaroid photos from courses."
                  width={520}
                  height={340}
                />
              </div>
              <span className={styles.polaroidCaption}>
                Real courses, real skills.
              </span>
            </div>
          </div> */}
        </div>
      </section>

      {/* Project summary */}
      <section className={styles.summary}>
        <div className={styles.summaryCard}>
          <h2>Project at a glance</h2>
          <div className={styles.summaryGrid}>
            <div>
              <h3>Role</h3>
              <p>Design, development, content tooling, Supabase integration</p>
            </div>
            <div>
              <h3>Stack</h3>
              <p>Next.js · React · Supabase Storage CDN · CSS Modules</p>
            </div>
            <div>
              <h3>Goals</h3>
              <p>
                Keep the existing booking system, modernize the brand presence,
                and make content updates as easy as copy-and-paste.
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
            <h3>Layered booking integration</h3>
            <p>
              OWLS Skills already had a functioning booking platform that
              worked for their students, so we kept it in place. The new site
              acts as a brand and storytelling layer on top:
            </p>
            <ul>
              <li>“Book a course” CTAs that route into the existing system</li>
              <li>No changes required for staff workflows</li>
              <li>
                Clean handoff from marketing pages into the familiar booking
                experience
              </li>
            </ul>
            <p>
              Result: a fresh site without disrupting how students actually
              reserve their spots.
            </p>
          </article>

          <article className={styles.featureCard}>
            <h3>Copy-and-paste articles, no code required</h3>
            <p>
              Jessie can take formatted content from her writing tool and drop
              it straight into the site:
            </p>
            <ul>
              <li>Headings, lists, and emphasis are preserved automatically</li>
              <li>No HTML editing or markdown expertise required</li>
              <li>Perfect for course recaps, field notes, and long-form posts</li>
            </ul>
            <p>
              This keeps her focused on teaching and content, not on wrestling
              with layout.
            </p>
          </article>

          <article className={styles.featureCard}>
            <h3>Image upload to Supabase CDN</h3>
            <p>
              Photos are central to OWLS Skills, so we optimized how they get
              into the site:
            </p>
            <ul>
              <li>Paste or upload an image directly into the editor</li>
              <li>
                Assets are stored in Supabase Storage and served via their CDN
              </li>
              <li>
                Images are ready for reuse in articles, hero sections, and
                galleries
              </li>
            </ul>
            <p>
              Behind the scenes, Supabase handles storage and delivery so pages
              stay fast and reliable.
            </p>
          </article>

          <article className={styles.featureCard}>
            <h3>Brand-true visual system</h3>
            <p>
              The UI mirrors the existing OWLS Skills brand while tightening it
              into a consistent system:
            </p>
            <ul>
              <li>Forest greens and deep purples from the original palette</li>
              <li>
                Topographic line textures and “field notebook” tape elements
              </li>
              <li>
                Polaroid-style photo stacks that feel like trip snapshots, not
                stock photos
              </li>
            </ul>
            <p>
              The result feels outdoorsy, competent, and welcoming — exactly
              like the courses themselves.
            </p>
          </article>

          <article className={styles.featureCard}>
            <h3>Mobile-first layout</h3>
            <p>
              Many visitors discover OWLS Skills from their phones in between
              work, travel, and trail time:
            </p>
            <ul>
              <li>Responsive layout down to small mobile screens</li>
              <li>Large, thumb-friendly CTAs for booking and newsletter</li>
              <li>Legible typography against soft, low-glare backgrounds</li>
            </ul>
          </article>

          <article className={styles.featureCard}>
            <h3>Built to grow with the business</h3>
            <p>
              Under the hood, the site is structured for future expansion:
            </p>
            <ul>
              <li>Reusable sections for new courses and offerings</li>
              <li>Ready for future blog, gallery, or merch pages</li>
              <li>
                Clear separation between content and layout so updates stay
                simple
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
            OWLS Skills now has a site that reflects the quality of the
            in-person experience: grounded, capable, and welcoming. The
            existing booking flow stays intact, while the new design and
            content tools make it easy to tell richer stories, highlight new
            courses, and keep the community engaged.
          </p>
        </div>
      </section>
    </main>
  );
}
