// app/projects/page.jsx
import Link from 'next/link';
import styles from './ProjectsPage.module.css';

const projects = [
  {
    slug: 'voxcorda',
    name: 'VoxCorda – Heart & Voice',
    status: 'In Development',
    summary:
      'A civic-tech platform experimenting with issue-based representation, delegation, and transparent decision-making.',
    liveUrl: null, // e.g. 'https://voxcorda.com' if you want later
    tech: ['Next.js', 'Supabase', 'PostgreSQL', 'TypeScript'],
  },
  {
    slug: 'owlsskills',
    name: 'OWLS Skills',
    status: 'Live',
    summary:
      'Outdoor Wilderness Life Skills: a survival training brand with one-day and weekend courses for all experience levels.',
    liveUrl: 'https://owlsskills.com', // update to your actual domain
    tech: ['Next.js', 'SCSS Modules', 'React', 'Mailchimp'],
  },
  {
    slug: 'inthe-dark-game',
    name: 'In The Dark (Game)',
    status: 'In Development',
    summary:
      'A narrative-driven game blending exploration and tension, with a focus on atmosphere and systemic design.',
    liveUrl: null, // e.g. itch.io link later
    tech: ['Pygame', 'Python', 'Pixel Art'],
  },
];

function ProjectCard({ project }) {
  const { slug, name, status, summary, liveUrl, tech } = project;

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{name}</h2>
        <span
          className={`${styles.status} ${
            status === 'Live' ? styles.statusLive : styles.statusDev
          }`}
        >
          {status}
        </span>
      </header>

      <p className={styles.summary}>{summary}</p>

      {tech && tech.length > 0 && (
        <ul className={styles.techList}>
          {tech.map((item) => (
            <li key={item} className={styles.techItem}>
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.actions}>
        <Link href={`/projects/${slug}`} className={styles.primaryLink}>
          View project details
        </Link>

        {liveUrl ? (
          <a
            href={liveUrl}
            className={styles.secondaryLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit live site
          </a>
        ) : (
          <span className={styles.secondaryDisabled}>Live site coming soon</span>
        )}
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Projects</h1>
        <p className={styles.subheading}>
          A snapshot of the systems, products, and experiments I&apos;m actively
          building.
        </p>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
