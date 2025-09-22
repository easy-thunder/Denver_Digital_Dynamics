'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Projects.module.css'
import BallotThreads from '@/components/demo/BallotThreads'

export default function Projects() {
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState(null)
  const [err, setErr] = useState(null)
  const [isAdvertiser, setIsAdvertiser] = useState(false)

  function onIntentToggle(e) {
    if (e.target.name !== 'intents') return
    if (e.target.value === 'advertiser') setIsAdvertiser(e.target.checked)
  }

  async function onSubmit(e) {
    e.preventDefault()
    setErr(null); setOk(null); setBusy(true)

    const fd = new FormData(e.currentTarget)
    // honeypot
    const honeypot = (fd.get('website') || '').trim()
    if (honeypot) { setBusy(false); return }

    // intents (must choose at least one)
    const intents = (fd.getAll('intents') || []).map(s => String(s).toLowerCase())
    if (intents.length === 0) {
      setErr('Please select at least one: creator, advertiser, or consumer.')
      setBusy(false)
      return
    }

    // party (for algorithm tuning)
    const party = String(fd.get('party') || '').toLowerCase() // 'democrat' | 'republican'
    if (!party) {
      setErr('Please choose Democrat or Republican (for feed tuning).')
      setBusy(false)
      return
    }

    const tosAccepted = !!fd.get('tos')
    const ageConfirmed = !!fd.get('age_confirm')

    if (!tosAccepted) {
      setErr('Please accept the Terms of Service and Privacy Policy.')
      setBusy(false)
      return
    }
    if (!ageConfirmed) {
      setErr('Please confirm you meet the age requirement (or have parental consent).')
      setBusy(false)
      return
    }
    const payload = {
      name: (fd.get('name') || '').trim(),
      email: (fd.get('email') || '').trim(),
      org: (fd.get('org') || '').trim(),
      role: party, // store party in the existing "role" field on the backend
      usecase: (fd.get('usecase') || '').trim(),
      updates: Boolean(fd.get('updates')),
      source: 'projects-page',
      tos_accepted: tosAccepted,
      privacy_accepted: tosAccepted,
      age_confirmed: ageConfirmed,
      intents,
      adv_message: isAdvertiser ? (fd.get('adv_message') || '').trim() : undefined,
    }

    try {
      // 1) Save in Supabase for everyone
      const res = await fetch('/api/pilot_signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Submit failed')

      // 2) Notify me only if advertiser
      if (intents.includes('advertiser')) {
        try {
          const r2 = await fetch('/api/advertiser_notify', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              name: payload.name,
              email: payload.email,
              org: payload.org,
              role: payload.role,
              usecase: payload.usecase,
              message: payload.adv_message || '(no message provided)',
            }),
          })
          const j2 = await r2.json().catch(() => ({}))
          if (!r2.ok || !j2?.success) console.warn('Advertiser notify failed', j2?.error || r2.statusText)
        } catch (err2) {
          console.warn('Advertiser notify errored', err2)
        }
      }

      // Success (no auth link—just a release notification confirmation)
      setOk("You're on the release notification list. We’ll email you when version one ships.")
      e.target.reset()
      setIsAdvertiser(false)
    } catch (e2) {
      setErr(e2?.message || 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className={styles.page}>
      {/* --- Hero / Vision --- */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.h1}>Voxcorda Pilot</h1>
          <p className={styles.tagline}>
            A people-first social platform that surfaces **bipartisan agreement** and downshifts heat.
            This starts as a social media platform. The final vision is to remove the bought politicians through direct voting, revocable delegation, and transparent profiles for those we elect.
          </p>

          <div className={styles.longform}>
            <p>
              Our ranking algorithm detects partisan skew and lifts posts that earn support across
              lines—while burying one-sided outrage. You’ll also be able to attach posts to real
              ballot issues in your local area via the Google Civics API and browse a concise “three arguments” view.
            </p>
            <div className={styles.badges}>
              <span className={styles.badge}>Bipartisan signal</span>
              <span className={styles.badge}>Feed + messaging</span>
              <span className={styles.badge}>Civics-linked issues</span>
              <span className={styles.badge}>Three-arguments view</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Grid: Details + Pilot form --- */}
      <section className={styles.gridSection}>
        <div className={styles.containerGrid}>
          <div className={styles.panel}>
            <h3 className={styles.h3}>What the pilot includes</h3>
            <ul className={styles.list}>
              <li>Social feed and direct messaging.</li>
              <li>Bipartisan-tilt ranking: posts with cross-party likes are elevated; heat without balance is de-emphasized.</li>
              <li>Google Civics API integration: link posts to real-world issues and representatives.</li>
              <li>“Three arguments” under issues to frame trade-offs (for / against / key trade-off).</li>
            </ul>

            <h4 className={styles.h4}>Our path</h4>
            <p className={styles.note}>
              We’re executing a <strong>4-phase plan</strong> toward liquid direct democracy. Phase 1 focuses on conversation quality
              and civic context; later phases introduce decision tools once the foundation is healthy.
            </p>

            {/* ---- Final vision ---- */}
            <h3 className={styles.h3}>The final vision</h3>
            <p className={styles.visionBody}>
              We’re building a direct, delegable democracy—no elected representatives required—where everyone’s voice has equal weight.
              Decisions happen in cycles so we focus on one issue at a time and publish transparent outcomes.
            </p>

            <h4 className={styles.h4}>How it works</h4>
            <ol className={styles.steps}>
              <li>
                <strong>Issue cycle.</strong> Everyone proposes and discusses issues. Each person gets one vote
                to pick the next problem to solve.
              </li>
              <li>
                <strong>Solution cycle.</strong> For the chosen issue, we collect proposals and debate trade-offs,
                then vote to select the solution.
              </li>
              <li>
                <strong>Budget & implementation.</strong> A concrete budget is set, owners are assigned, and timelines are published.
              </li>
              <li>
                <strong>Confirm & publish.</strong> A final vote confirms the plan, results are auditable, and progress is tracked publicly.
              </li>
            </ol>

            <div className={styles.callout}>
              <strong>Delegation to fight voter atrophy:</strong> you can delegate your vote by topic to anyone you trust.
              Delegations are public, revocable at any time, and scoped—so expertise can travel without surrendering control.
            </div>


            <div className={styles.links}>
              <Link href="/projects/voxcorda/manifesto" className={styles.link}>Jacob's Manifesto</Link>
              <span className={styles.sep}>•</span>
              <a href="https://gofund.me/8052698c9" className={styles.link}>Fund Me</a>

            </div>
          </div>


          <div className={styles.card}>
            <h3 className={styles.h3}>Apply to the Pilot</h3>
            <p className={styles.cardLead}>
              I can't build this without your help. Tell me about about yourself, how you would like the system to change and help me bring your representation back to you! (This will notify you only when version 1 is released)
            </p>

            <form className={styles.form} onChange={onIntentToggle} onSubmit={onSubmit}>
              {/* honeypot */}
              <input name="website" autoComplete="off" className={styles.honey} tabIndex={-1} />

              <label className={styles.label}>
                <span>Name</span>
                <input name="name" className={styles.input} required maxLength={120} />
              </label>

              <label className={styles.label}>
                <span>Email</span>
                <input type="email" name="email" className={styles.input} required />
              </label>

              <label className={styles.label}>
                <span>Organization (optional)</span>
                <input name="org" className={styles.input} />
              </label>

              {/* Party choice for algorithm tuning */}
              <fieldset className={styles.group}>
                <legend className={styles.legend}>Political lean (for feed tuning)</legend>
                <div className={styles.radioRow}>
                  <label className={styles.tick}>
                    <input type="radio" name="party" value="left" /> Left
                  </label>
                  <label className={styles.tick}>
                    <input type="radio" name="party" value="right" /> Right
                  </label>
                </div>
                <p className={styles.hint}>
                  Nobody likes putting themselves into a box. To sew the divide we must first acknowledge the difference. This information helps bridge the gap by surfacing issues with bi-partisan support.
                </p>
              </fieldset>

              {/* Intents */}
              <fieldset className={styles.group}>
                <legend className={styles.legend}>I’m interested as a…</legend>
                <label className={styles.tick}>
                  <input type="checkbox" name="intents" value="creator" /> Creator (publish content)
                </label>
                <label className={styles.tick}>
                  <input type="checkbox" name="intents" value="advertiser" /> Advertiser (buy ad space)
                </label>
                <label className={styles.tick}>
                  <input type="checkbox" name="intents" value="consumer" /> Reader / Member (consume content)
                </label>
              </fieldset>

              {/* Only for advertisers */}
              {isAdvertiser && (
                <label className={styles.label}>
                  <span>Advertiser message</span>
                  <textarea
                    name="adv_message"
                    className={styles.textarea}
                    rows={4}
                    placeholder="Tell me about your campaign, goals, audience, timeline, or budget range…"
                  />
                </label>
              )}

              <label className={styles.label}>
                <span>How do you want to use Voxcorda?</span>
                <textarea
                  name="usecase"
                  className={styles.textarea}
                  rows={5}
                  placeholder="A few sentences about your use case…"
                  required
                />
              </label>


              <label className={styles.check}>
                <input type="checkbox" name="updates" defaultChecked />
                <span>Send me product updates & early features (beyond the initial release)</span>
              </label>

              {/* REQUIRED: Terms of Service & Privacy */}
              <label className={`${styles.check} ${styles.must}`}>
                <input type="checkbox" name="tos" required />
                <span>
                  I have read and agree to the&nbsp;
                  <Link href="/projects/voxcorda/terms" className={styles.inlineLink} target="_blank">Terms of Service</Link>
                  &nbsp;and&nbsp;
                  <Link href="/projects/voxcorda/privacy" className={styles.inlineLink} target="_blank">Privacy Policy</Link>.
                </span>
              </label>
              <p className={styles.hintSmall}>
                We store your name, email, org (if provided), intents, and your political lean solely to tune
                bipartisan ranking. We don’t sell your data. You can request deletion at any time.
              </p>

              {/* REQUIRED: Age / Parental consent */}
              <label className={`${styles.check} ${styles.must}`}>
                <input type="checkbox" name="age_confirm" required />
                <span>
                  I am at least 16 years old, or I am 13–15 and have verifiable parental/guardian consent.
                  Users under 13 may not register.
                </span>
              </label>
              <p className={styles.hintSmall}>
                This pilot is intended for ages 16+. If you’re 13–15, a parent/guardian must consent. We’ll
                provide a consent workflow before general release.
              </p>


              <button className={styles.button} disabled={busy}>
                {busy ? 'Submitting…' : 'Request Invite'}
              </button>

              {ok && <div className={styles.ok}>{ok}</div>}
              {err && <div className={styles.err}>{err}</div>}
            </form>
          </div>
        </div>
      </section>
      {/* --- Cycle diagram + edge cases --- */}
      <section className={styles.cycleSection}>
        <div className={styles.container}>
          <h2 className={styles.h2}>How the decision cycle works(Final Vision)</h2>
          <p className={styles.sub}>
            Focus one issue at a time: <strong>Issue selection → Solution development → Final vote</strong>.
            Transparent inputs, auditable outcomes, optional delegation by topic.
          </p>
        </div>

        <div className={styles.cycleGrid}>
          {/* Left: image */}
          <div className={styles.cycleImageWrap}>
            <img
              className={styles.cycleImg}
              src="/images/cycle.png"
              alt="Voxcorda decision cycle: Issue → Solution → Final vote"
              loading="lazy"
            />
          </div>

          {/* Right: edge cases */}
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
    </main>
  )
}
