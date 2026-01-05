'use client'

import Hero from '@/components/Voxcorda/Hero/Hero'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Projects.module.css'
import BallotThreads from '@/components/demo/BallotThreads'
import Problem from '@/components/Voxcorda/Problem/Problem'
import DeeperProblem from '@/components/Voxcorda/Problem/DeeperProblem'

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
      <Hero />
      {/* <Problem /> */}
      {/* <DeeperProblem /> */}




      <section className={styles.gridSection}>
        <div className={styles.containerGrid}>
          <div className={styles.panel}>
            <h3 className={styles.h3}>What the pilot includes</h3>
            <ul className={styles.list}>
              <li>Social feed and direct messaging.</li>
              <li>Bipartisan-tilt ranking: posts with cross-party likes are elevated; heat without balance is de-emphasized.</li>
              <li>See ballot issues in your area and open a discussion about them.</li>
            </ul>

            <h4 className={styles.h4}>Our path</h4>
            <p className={styles.note}>
              We’re executing a <strong>4-phase plan</strong> toward Direct Liquid Democracy. Phase 1 focuses on conversation quality
              and connection to your ballot issues.
            </p>

            {/* ---- Final vision ---- */}
            <h3 className={styles.h3}>The final vision</h3>
            <p className={styles.visionBody}>
              We’re building a platform to support a Direct Liquid Democracy where everyone’s voice has equal weight.
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
              <span className={styles.sep}>•</span>
              <a className={styles.link} href='https://www.reddit.com/r/Voxcorda/'>Discuss on Reddit</a>


            </div>
          </div>


          <div className={styles.card}>
            <h3 className={styles.h3}>Apply to the Pilot</h3>
            <p className={styles.cardLead}>
              I can't build this without your help. Tell me about about yourself, how you would like the system to change and help me bring your representation back to you! (This will notify you only when version 1 is released)
            </p>

            <form className={styles.form} onChange={onIntentToggle} onSubmit={onSubmit}>
              <input name="website" autoComplete="off" className={styles.honey} tabIndex={-1} />

              <label className={styles.label}>
                <span>User Name</span>
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

    </main>
  )
}
