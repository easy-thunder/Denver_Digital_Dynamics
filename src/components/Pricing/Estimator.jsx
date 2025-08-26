"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; import styles from "./Estimator.module.css";
import NumberInput from "@/components/ui/NumberInput/NumberInput";
import Button from "@/components/ui/Button/Button";
import Switch from "../ui/Switch/Switch";
const RATES = { mid: 75};
const ANIMATION_RATE = 50;
const RUSH_PERCENT = 0.25;
const QA_RATE = 100;
const DISCOUNTS = { copy: 25, brand: 25 };

const INTEGRATIONS = [
    { key: "scheduling", label: "Scheduling & calendar", price: 300 },
    { key: "stripe", label: "Stripe payments (Stripe fees apply)", price: 400 },
    { key: "email", label: "Automated email notifications", price: 150 },
    { key: "blog", label: "Blog/SEO pipeline (DB/CMS fees apply)", price: 350 },
    { key: "auth", label: "Authentication (varies — after discovery)", price: null },
    { key: "sms", label: "SMS alerts (varies — after discovery)", price: null },
];

export default function Estimator() {

    const searchParams = useSearchParams();
    const designParam = (searchParams.get("design") || "").toLowerCase();

    
    const [design, setDesign] = useState("ai");

    useEffect(() => {
        if (designParam === "ai" || designParam === "designer") {
            setDesign(designParam);
        }
    }, [designParam]);

    const [pages, setPages] = useState(1);

    const [sectionsMid, setSectionsMid] = useState(2);

    const [animations, setAnimations] = useState(0);

    const [integrations, setIntegrations] = useState(new Set());
    const [otherIntegration, setOtherIntegration] = useState("");

    const [copyReady, setCopyReady] = useState(false);
    const [brandReady, setBrandReady] = useState(false);

    const [deadline, setDeadline] = useState("");
    const [extendedQA, setExtendedQA] = useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");


    const sectionsSubtotal =
       sectionsMid * RATES.mid;

    const designFactor = design === "designer" ? 4 : 1;

    const animationsSubtotal = animations * ANIMATION_RATE;

    const integrationsSubtotal = useMemo(() => {
        let sum = 0;
        INTEGRATIONS.forEach((it) => {
            if (integrations.has(it.key) && typeof it.price === "number") sum += it.price;
        });
        return sum;
    }, [integrations]);

    const discountSubtotal = (copyReady ? DISCOUNTS.copy : 0) + (brandReady ? DISCOUNTS.brand : 0);
    const qaSubtotal = extendedQA ? QA_RATE : 0;

    const baseBeforeRush =
        sectionsSubtotal * designFactor +
        animationsSubtotal +
        integrationsSubtotal +
        qaSubtotal -
        discountSubtotal;

    const rushMultiplier = isRush(deadline) ? 1 + RUSH_PERCENT : 1;
    const rushFee = Math.max(0, baseBeforeRush) * (rushMultiplier - 1);

    const total = Math.max(0, baseBeforeRush) + rushFee;

    const sectionsTotalCount = sectionsMid;

    function toggleIntegration(key) {
        setIntegrations((prev) => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    }


    async function handleContactSubmit(e) {
        e.preventDefault();
        try {
          const payload = {
            name,
            email,
            phone,
            message,
            estimate: money(total),
            website: "" 
          };
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (!res.ok || !data?.success) throw new Error(data?.error || "Send failed");
          alert("Thanks! I’ll be in touch shortly.");
        } catch (err) {
          console.error(err);
          alert("Sorry, there was a problem sending your message. Please try again.");
        }
      }


    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <h1 className={styles.h1}>Pricing & Instant Quote</h1>
                    <p className={styles.lead}>
                        This is a rough estimate. It assumes <strong>2 revisions are included</strong>.
                        Pricing is driven by <strong>number of sections</strong> and their
                        <strong> content density</strong>. Each section targets <strong>100% of viewport height</strong> on desktop.
                    </p>
                    <div className={styles.badges}>
                        <span className={styles.badge}>30-day bugfix: <strong>FREE</strong></span>
                        <span className={styles.badge}>No monthly dev hosting</span>
                        <span className={styles.badge}>You own your accounts</span>
                    </div>
                </header>


                <div className={styles.grid}>

                    <div className={`${styles.card} ${styles.scope}`}>
                        <h2 className={styles.h2}>Scope</h2>


                        <div className={styles.group}>
                            <div className={styles.groupTitle}>Design involvement</div>
                            <div className={styles.segmented}>
                                <label className={`${styles.segment} ${design === "ai" ? styles.active : ""}`}>
                                    <input
                                        type="radio"
                                        name="design"
                                        value="ai"
                                        checked={design === "ai"}
                                        onChange={() => setDesign("ai")}
                                    />
                                    <span>AI Special</span>
                                    <em className={styles.segmentNote}></em>
                                </label>
                                <label className={`${styles.segment} ${design === "designer" ? styles.active : ""}`}>
                                    <input
                                        type="radio"
                                        name="design"
                                        value="designer"
                                        checked={design === "designer"}
                                        onChange={() => setDesign("designer")}
                                    />
                                    <span>Full Designer</span>
                                    <em className={styles.segmentNote}></em>
                                </label>
                            </div>
                        </div>


                        <div className={styles.group}>
                            <label className={styles.row}>
                                <span className={styles.label}>Approx. pages</span>
                                <NumberInput value={pages} setValue={setPages} min={1} />
                            </label>
                            <p className={styles.help}>
                                Pages help plan navigation, but pricing tracks sections & density.
                            </p>
                        </div>


                        <div className={styles.group}>
                            <div className={styles.groupTitle}>Number of Sections</div>
                            <div className={styles.rows}>
                                <DensityRow label="" rate={RATES.mid} value={sectionsMid} setValue={setSectionsMid} />
                            </div>
                        </div>


                        <div className={styles.group}>
                            <label className={styles.row}>
                                <span className={styles.label}>
                                    Feature animations <em className={styles.muted}>(${ANIMATION_RATE} ea.)</em>
                                </span>
                                <NumberInput value={animations} setValue={setAnimations} min={0} />
                            </label>
                            <p className={styles.help}>
                                Micro-animations are included; this is for feature-level effects (parallax, Lottie, scroll-sync).
                            </p>
                        </div>


                        <div className={styles.group}>
                            <div className={styles.groupTitle}>Content readiness (discounts)</div>
                            <label className={styles.switchRow}>
                                <span>Do you have your paragraphs ready <em className={styles.muted}>(-${DISCOUNTS.copy})</em></span>
                                <Switch checked={copyReady} onChange={setCopyReady} />
                            </label>
                            <label className={styles.switchRow}>
                                <span>Brand assets ready (logos/photos) <em className={styles.muted}>(-${DISCOUNTS.brand})</em></span>
                                <Switch checked={brandReady} onChange={setBrandReady} />
                            </label>
                        </div>

                        <div className={styles.group}>
                            <label className={styles.row}>
                                <span className={styles.label}>
                                    Target launch date{" "}
                                    <em className={styles.muted}>{`(rush +${Math.round(RUSH_PERCENT * 100)}% if ≤ 14 days)`}</em>
                                </span>
                                <input
                                    type="date"
                                    className={`${styles.input} ${styles.inputDate}`}
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </label>
                        </div>


                        <div className={styles.group}>
                            <label className={styles.switchRow}>
                                <span>Extended browser/device QA <em className={styles.muted}>(+${QA_RATE})</em></span>
                                <Switch checked={extendedQA} onChange={setExtendedQA} />
                            </label>
                            <p className={styles.help}>
                                Standard QA includes latest Chrome/Firefox/Safari + iOS/Android.
                            </p>
                        </div>
                    </div>


                    <div className={`${styles.card} ${styles.solutions}`}>
                        <h2 className={styles.h2}>Business solutions</h2>
                        <div className={styles.integrations}>
                            {INTEGRATIONS.map((it) => {
                                const isTbd = typeof it.price !== "number";
                                return (
                                    <label key={it.key} className={styles.integrationRow}>
                                        <input
                                            type="checkbox"
                                            checked={integrations.has(it.key)}
                                            onChange={() => toggleIntegration(it.key)}
                                            disabled={isTbd}
                                        />
                                        <span className={styles.integrationLabel}>
                                            {it.label}
                                            <em className={`${styles.priceNote} ${isTbd ? styles.tbd : ""}`}>
                                                {isTbd ? "TBD" : `+$${it.price}`}
                                            </em>
                                        </span>
                                    </label>
                                );
                            })}

                            <label className={styles.rowStack}>
                                <span className={styles.label}>Other needs (optional)</span>
                                <textarea
                                    className={`${styles.input} ${styles.textarea}`}
                                    rows={3}
                                    placeholder="Describe what you have in mind. There are so many potential business solutions we can implement outside of website creation. So if you have something else in mind, let me know!"
                                    value={otherIntegration}
                                    onChange={(e) => setOtherIntegration(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>


                    <aside className={`${styles.summary} ${styles.summaryBox}`}>
                        <h2 className={styles.h2}>Estimate</h2>
                        <ul className={styles.lines}>
                            <Line label={`Sections (${sectionsTotalCount})`} value={money(sectionsSubtotal * designFactor)} hint={design === "designer" ? "Designer 4× applied" : "AI Special"} />
                            {animations > 0 && <Line label={`Animations (${animations})`} value={money(animationsSubtotal)} />}
                            {integrationsSubtotal > 0 && <Line label="Business solutions" value={money(integrationsSubtotal)} />}
                            {extendedQA && <Line label="Extended QA" value={money(qaSubtotal)} />}
                            {(copyReady || brandReady) && (
                                <Line
                                    label="Content readiness discount"
                                    value={`−${money(discountSubtotal)}`}
                                    className={styles.negative}
                                />
                            )}
                            {rushMultiplier > 1 && <Line label="Rush fee" value={money(rushFee)} />}
                        </ul>
                        <div className={styles.totalRow}>
                            <div>Total (rough estimate)</div>
                            <div className={styles.total}>{money(total)}</div>
                        </div>
                        <p className={styles.smallPrint}>
                            Includes <strong>2 revisions</strong>. This is a rough estimate and may change after discovery.
                            Platform/transaction fees (e.g., Stripe, SMS, DB/CMS) are separate. 30-day bugfix window is included.
                        </p>
                    </aside>
                </div>


                <section className={styles.card}>
                    <h2 className={styles.h2}>Contact</h2>
                    <p className={styles.help}>
                        Send your details and I’ll follow up with a refined quote and timeline.
                    </p>

                    <form onSubmit={handleContactSubmit} className={styles.form}>
                        <div className={styles.formGrid}>
                            <label className={styles.rowStack}>
                                <span className={styles.label}>Name</span>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </label>
                            <label className={styles.rowStack}>
                                <span className={styles.label}>Email</span>
                                <input
                                    type="email"
                                    className={styles.input}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <label className={styles.rowStack}>
                                <span className={styles.label}>Phone <em className={styles.muted}>(optional)</em></span>
                                <input
                                    type="tel"
                                    className={styles.input}
                                    placeholder="(555) 123-4567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </label>
                        </div>

                        <label className={styles.rowStack}>
                            <span className={styles.label}>Message</span>
                            <textarea
                                className={`${styles.input} ${styles.textarea}`}
                                rows={5}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell me about your project, goals, and anything from this estimate you'd like to lock in."
                            />
                        </label>

                        <div className={styles.singleCta}>
                            <Button
                                label="Contact me about this estimate"
                                color="var(--color-accent)"
                                type="submit"
                            />
                        </div>
                    </form>
                </section>
            </div>
        </section>
    );
}


function DensityRow({ label, rate, value, setValue }) {
    return (
        <label className={styles.row}>
            <span className={styles.label}>
                {label}  <em className={styles.muted}>(${rate} / section)</em>
            </span>
            <NumberInput value={value} setValue={setValue} min={0} />
        </label>
    );
}





function Line({ label, value, className = "", hint }) {
    return (
        <li className={`${styles.line} ${className}`}>
            <span className={styles.lineLabel}>
                {label} {hint && <em className={styles.muted}>— {hint}</em>}
            </span>
            <span className={styles.lineValue}>{value}</span>
        </li>
    );
}


function isRush(dateStr) {
    if (!dateStr) return false;
    const now = new Date();
    const due = new Date(dateStr + "T00:00:00");
    const diff = (due - now) / (1000 * 60 * 60 * 24);
    return diff <= 14;
}

function money(n) {
    const v = Math.max(0, Math.round(n));
    return `$${v.toLocaleString()}`;
}
