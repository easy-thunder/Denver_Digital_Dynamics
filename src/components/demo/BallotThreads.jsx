'use client'
import { useState, useMemo } from 'react'
import styles from './BallotThreads.module.css'

const STANCE = { FOR: 'for', AGAINST: 'against', NUANCED: 'nuanced' }

const POSTS = [
  {
    id: 'p1',
    stance: STANCE.FOR,
    author: 'Dan',
    title: 'Require a one-semester finance course',
    body:
      'Budgeting, credit, taxes, loans—teach the basics before mistakes get expensive. Keep banks out of the content and make it a plain-language, real-life class.',
    up: 42, down: 3, created_at: '2025-09-12T10:05:00Z',
    replies: [
      {
        id: 'r1',
        author: 'Mike',
        text:
          "If everyone knows how to invest then my ‘easy mode’ of skimming gains off other people’s work gets harder. Can’t quietly exploit the workforce with my stocks if the workforce understands the game."
      },
      {
        id: 'r2',
        author: 'Sarah',
        text:
          "It isn’t fair that I didn’t get this education. I learned about APR, credit scores, and taxes by getting burned. Make the next class luckier than we were."
      },
    ]
  },
  {
    id: 'p2',
    stance: STANCE.AGAINST,
    author: 'Jon',
    title: 'Don’t teach the peasants the playbook 😅',
    body:
      "Listen, I can’t hold control over people if everyone learns how to invest. How am I supposed to leverage other people’s work ethic if everybody else also knows how to leverage other people’s work ethic? If kids spot fee traps, index drift, and buyback games, they’ll demand better wages and stop feeding my passive yield. Please, keep the fog of confusion—my portfolio depends on it.",
    up: 14, down: 28, created_at: '2025-09-12T10:07:00Z',
    replies: [
      { id: 'r3', author: 'Kevin', text: "Appreciate the honesty, villain monologue and all. Sounds like… teach it." },
      { id: 'r4', author: 'Lisa',  text: "Exactly. Power hoards knowledge. Public school should return it to the public." },
    ]
  },
  {
    id: 'p3',
    stance: STANCE.NUANCED,
    author: 'Susan',
    title: 'Teach it—and name the bigger problem',
    body:
      "Financial literacy helps people dodge traps, but the stock market we’ve built is lazy capital too often. Index flows funnel money to incumbents; boards chase buybacks over building; financial engineering squeezes margins without adding real output. That adds little in innovation, invention, or work—it’s extraction dressed up as efficiency. So yes, require the class, but also reform incentives: rein in junk fees and predatory credit, curb buyback addiction, and tilt capital toward actual production and new supply.",
    up: 33, down: 2, created_at: '2025-09-12T10:10:00Z',
    replies: [
      { id: 'r5', author: 'Alex',  text: "Curriculum + guardrails. Make payday loans, collections, credit reporting, and buybacks part of the lesson." },
      { id: 'r6', author: 'Priya', text: "And practicals: W-4s, 1099s, withholding, health premiums—real paperwork kids actually face." },
    ]
  },
]


export default function BallotThreads() {
  const [filter, setFilter] = useState('all')

  const visible = useMemo(() => {
    if (filter === 'all') return POSTS
    if (filter === 'for') return POSTS.filter(p => p.stance === STANCE.FOR)
    if (filter === 'against') return POSTS.filter(p => p.stance === STANCE.AGAINST)
    return POSTS.filter(p => p.stance === STANCE.NUANCED)
  }, [filter])

  return (
    <main className={styles.page}>
      {/* Issue card */}
      <section className={styles.issue}>
        <h1 className={styles.h1}>Should Financial Literacy Be Required in High School?</h1>
        <p className={styles.meta}>
          Draft ballot text: “The state shall require a semester-long curriculum covering budgeting,
          credit, loans, taxes, and consumer protections. Districts may adapt materials to local
          needs. Estimated cost: $12 per pupil.”
        </p>
        <p className={styles.meta}>
          Context: Many graduates report difficulty managing debt, opening accounts, filing taxes,
          and understanding credit. This measure aims to reduce predatory exposure and improve
          financial independence.
        </p>

        {/* Filter */}
        <div className={styles.filters} role="tablist" aria-label="Filter posts by stance">
          {[
            { key: 'all', label: 'All' },
            { key: 'for', label: 'For' },
            { key: 'against', label: 'Against' },
            { key: 'nuanced', label: 'Nuanced' },
          ].map(t => (
            <button
              key={t.key}
              role="tab"
              aria-selected={filter === t.key}
              className={`${styles.pill} ${filter === t.key ? styles.pillActive : ''}`}
              onClick={() => setFilter(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Posts list */}
      <section className={styles.list} aria-label="Linked posts">
        {visible.map(p => (
          <article key={p.id} className={`${styles.post} ${styles[p.stance]}`} aria-label={`${p.stance} post`}>
            <header className={styles.postHead}>
              <div className={styles.avatar}>{p.author[0].toUpperCase()}</div>
              <div className={styles.headText}>
                <div className={styles.titleRow}>
                  <span className={styles.author}>{p.author}</span>
                  <span className={styles.time}>{new Date(p.created_at).toLocaleString()}</span>
                </div>
                <h3 className={styles.postTitle}>{p.title}</h3>
              </div>
            </header>

            <p className={styles.body}>{p.body}</p>

            <div className={styles.postMeta}>
              <span>👍 {p.up}</span>
              <span className={styles.dot} />
              <span>👎 {p.down}</span>
              <span className={styles.dot} />
              <span className={styles.badge}>{labelFor(p.stance)}</span>
            </div>

            {/* replies */}
            <div className={styles.replies}>
              {p.replies.map(r => (
                <div key={r.id} className={styles.reply}>
                  <div className={styles.replyAvatar}>{r.author[0].toUpperCase()}</div>
                  <div className={styles.replyBody}>
                    <div className={styles.replyMeta}>
                      <span className={styles.replyAuthor}>{r.author}</span>
                    </div>
                    <p className={styles.replyText}>{r.text}</p>
                    <div className={styles.replyActions}>
                      <button type="button">Reply</button>
                      <button type="button">Edit</button>
                      <button type="button">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

function labelFor(stance) {
  if (stance === STANCE.FOR) return 'For'
  if (stance === STANCE.AGAINST) return 'Against'
  return 'Nuanced'
}
