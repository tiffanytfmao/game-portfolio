import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CatSprite from '../../components/CatSprite/CatSprite'
import { asset } from '../../utils/asset'
import styles from './Cocoon.module.css'

const BASE = asset('cocoon assets')

const SECTIONS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'problem',     label: 'The Problem' },
  { id: 'discovery',   label: 'Discovery' },
  { id: 'challenge',   label: 'Design Challenge' },
  { id: 'principles',  label: 'Principles' },
  { id: 'decisions',   label: 'Design Decisions' },
  { id: 'engineering', label: 'Design + Eng' },
  { id: 'final',       label: 'Final Design' },
  { id: 'reflection',  label: 'Reflection' },
]

const TAGS = ['B2B', 'Product Design', 'UX/UI', 'Compliance', 'Series A Startup', 'Full-stack']

const GAPS = [
  {
    num: '01',
    title: 'SHC Forms Required Multiple Re-Submissions',
    body: 'Employees did not know SHC certification was mandatory or how to file correctly. Ambiguity in form requirements created repeated loops back to HR.',
    label: 'Ambiguity → re-submissions',
  },
  {
    num: '02',
    title: 'Leave Approval Had No Audit Trail',
    body: 'Approval happened over email chains. HR could not prove compliance. Neither employer nor employee had a timestamped record of decisions.',
    label: 'No audit trail → compliance risk',
  },
  {
    num: '03',
    title: 'Employee Leave Visibility Was Zero',
    body: 'Employees filed into a black box and waited. No insight into approval status, estimated pay, or timeline. Opacity caused anxiety and attrition risk.',
    label: 'Opacity → anxiety + attrition',
  },
]

const PRINCIPLES = [
  {
    title: 'Compliance-First, Invisible to Users',
    body: 'Every flow must handle SHC, ADA, and California PDL correctly. The user should never feel the weight of the legal complexity.',
  },
  {
    title: 'Transparency Over Efficiency',
    body: 'Showing approval status, timeline, and pay estimates matters more than reducing clicks. Anxiety costs more than extra steps.',
  },
  {
    title: 'Shared Context, Separate Views',
    body: 'HR and employees share the same leave case but need different controls. No single view serves both without creating compliance risk.',
  },
  {
    title: 'Fit the Existing Architecture',
    body: 'PDL must integrate, not rebuild, the existing leave engine. Design scope cannot outpace engineering capacity.',
  },
]

const DECISIONS = [
  {
    num: 'D1',
    title: 'Progressive SHC Disclosure',
    options: 'Option A: All SHC fields at intake  ·  Option B: Contextual 3-step disclosure',
    body: 'Compliance forms are dense. Presenting all SHC fields at intake puts the heaviest cognitive load on employees at the worst possible moment. We split the form into 3 contextual steps, surfacing each field only when it was relevant to what the employee had just entered.',
    tradeoff: 'More engineering states to manage.',
    result: 'Zero form abandonment in design review.',
    img: `${BASE}/flow%201.png`,
  },
  {
    num: 'D2',
    title: 'Separate HR and Employee Views',
    options: 'Option A: Single shared dashboard  ·  Option B: Two views, one data model',
    body: 'HR needs edit and approve controls. Employees need status and pay estimates. The actions, permissions, and compliance stakes are completely different. Combining them into one view would require hiding critical controls from one audience while exposing them to the other — a compliance risk, not just a UX one.',
    tradeoff: 'Double the design surface.',
    result: 'Each audience gets exactly the context and controls they need.',
    img: `${BASE}/flow%202.png`,
  },
  {
    num: 'D3',
    title: 'Estimated Pay Visibility',
    options: 'Option A: Hide estimates until approved  ·  Option B: Show range early with caveats',
    body: 'Uncertainty about pay is the core emotional driver of leave-related anxiety. Withholding an estimate until formal approval prioritizes legal caution at the expense of the employee\'s ability to plan their life. We surfaced a pay range early, clearly labeled "Estimated — subject to approval authority," with an expandable disclaimer. Legal signed off on the framing.',
    tradeoff: 'Required legal negotiation on labeling.',
    result: 'Employees can plan financially from day one.',
    img: `${BASE}/flow%203.png`,
  },
]

const ENG_POINTS = [
  {
    title: 'Designed for real constraints',
    body: 'Knowing the component architecture meant no specs requiring a full refactor. I worked within the existing leave-claim tree — design stayed buildable throughout.',
  },
  {
    title: 'Caught edge cases early',
    body: 'Building the SHC step component surfaced a name-field pre-population bug in Week 3 — before it could have caused a live SHC rejection for a real employee.',
  },
  {
    title: 'Faster iteration loop',
    body: 'I could prototype in code rather than waiting for engineering capacity. This cut the review cycle from 5 days to same-day for low-risk components.',
  },
  {
    title: 'Earned engineering trust',
    body: 'Being in the codebase gave design decisions credibility. They were discussed as shared engineering problems, not designer asks.',
  },
]

const FINAL_SCREENS = [
  {
    label: '① Personalized landing',
    desc: 'Plan in private — no HR notification until submitted.',
  },
  {
    label: '② Leave timeline planner',
    desc: 'Color-coded pre/post-birth/bonding segments. Pay figures marked "subject to approval authority."',
  },
  {
    label: '③ Claims dashboard',
    desc: 'California EDD + disability task list with clear pending/complete states.',
  },
  {
    label: '④ Leave type selector',
    desc: 'Plain-language descriptions that eliminate the "which one applies to me?" confusion.',
  },
]

export default function Cocoon() {
  const [activeSection, setActiveSection] = useState('overview')
  const [catY, setCatY] = useState(0)
  const sectionRefs = useRef({})
  const navItemRefs = useRef({})
  const navRef = useRef(null)

  useEffect(() => {
    const observers = []
    const options = { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id]
      if (!el) return
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id)
      }, options)
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    const itemEl = navItemRefs.current[activeSection]
    const navEl = navRef.current
    if (!itemEl || !navEl) return
    const navRect = navEl.getBoundingClientRect()
    const itemRect = itemEl.getBoundingClientRect()
    setCatY(itemRect.top - navRect.top + itemRect.height / 2 - 16)
  }, [activeSection])

  const scrollToSection = useCallback((id) => {
    const el = sectionRefs.current[id]
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backBtn}>
        <span className={styles.backDiamond}>◆</span> Back
      </Link>

      {/* Hero */}
      <div className={styles.hero}>
        <img
          src={`${BASE}/cocoon%20hero.png`}
          alt="Cocoon — Pregnancy Disability Leave Tracker"
          className={styles.heroImg}
        />
        <div className={styles.heroFooter}>
          <div className={styles.tags}>
            {TAGS.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>
          <button className={styles.skipBtn} onClick={() => scrollToSection('decisions')}>
            Skip to solution ◆
          </button>
        </div>
      </div>

      <div className={styles.body}>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <nav ref={navRef} className={styles.sideNav} aria-label="Case study navigation">
            <div
              className={styles.catIndicator}
              style={{ transform: `translateY(${catY}px)` }}
              aria-hidden="true"
            >
              <CatSprite variant="idle" size="sm" />
            </div>
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                ref={el => { navItemRefs.current[id] = el }}
                className={`${styles.navItem} ${activeSection === id ? styles.navActive : ''}`}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className={styles.content}>

          {/* Overview */}
          <section id="overview" ref={el => { sectionRefs.current['overview'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Overview</span>
            <h1 className={styles.projectTitle}>Cocoon</h1>
            <p className={styles.tagline}>Designing a pregnancy disability leave tracker as both the designer and the engineer shipping it.</p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}><span className={styles.metaKey}>Year</span><span className={styles.metaVal}>2024</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Role</span><span className={styles.metaVal}>Product Designer + Engineer</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Company</span><span className={styles.metaVal}>Cocoon · Series A, B2B SaaS</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Timeline</span><span className={styles.metaVal}>6 Weeks · May–Jun 2024</span></div>
            </div>

            <p className={styles.prose}>
              Cocoon automates federal and state leave compliance and payroll for People teams at over 50 companies. This was Cocoon's first end-to-end PDL (Pregnancy Disability Leave) product — built greenfield in 6 weeks with no prior internal reference. I was the first dedicated designer on the feature and simultaneously a front-end engineer shipping its components.
            </p>

            <div className={styles.roleBlock}>
              <span className={styles.sectionLabel}>My Role</span>
              <div className={styles.roleGrid}>
                <div className={styles.roleCol}>
                  <p className={styles.roleColHead}>My Dual Role</p>
                  <ul className={styles.roleList}>
                    <li>Product Designer — end-to-end UX from research brief through final spec</li>
                    <li>Front-End Engineer — built 6 production React components for the PDL flow</li>
                  </ul>
                </div>
                <div className={styles.roleCol}>
                  <p className={styles.roleColHead}>Cross-Functional Team</p>
                  <ul className={styles.roleList}>
                    <li>PM — scoped requirements, managed legal review</li>
                    <li>2 legal experts — PDL/SHC subject matter</li>
                    <li>2 ops managers — implementation partners</li>
                  </ul>
                </div>
                <div className={styles.roleCol}>
                  <p className={styles.roleColHead}>Constraints</p>
                  <ul className={styles.roleList}>
                    <li>6-week kick-off to launch</li>
                    <li>Greenfield — no prior PDL product internally</li>
                    <li>Must integrate with existing leave-claim architecture</li>
                  </ul>
                </div>
              </div>
              <div className={styles.stakes}>
                PDL is legally sensitive and personally charged. Getting it wrong meant compliance risk for clients and real harm to employees at a vulnerable life moment.
              </div>
            </div>
          </section>

          {/* Problem */}
          <section id="problem" ref={el => { sectionRefs.current['problem'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>The Problem</span>
            <h2 className={styles.sectionHeading}>Three structural gaps, not UI problems.</h2>
            <p className={styles.prose}>
              Pregnancy Disability Leave is a separate legal entitlement from parental leave, but Cocoon's system handled it ambiguously. The gaps weren't cosmetic — they were structural failures in how SHC forms, approvals, and employee visibility were handled.
            </p>

            <div className={styles.gaps}>
              {GAPS.map(g => (
                <div key={g.num} className={styles.gapRow}>
                  <div className={styles.gapMain}>
                    <span className={styles.gapNum}>{g.num}</span>
                    <div>
                      <p className={styles.gapTitle}>{g.title}</p>
                      <p className={styles.gapBody}>{g.body}</p>
                    </div>
                  </div>
                  <span className={styles.gapLabel}>{g.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Discovery */}
          <section id="discovery" ref={el => { sectionRefs.current['discovery'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Discovery</span>
            <h2 className={styles.sectionHeading}>I started with what I didn't know.</h2>

            <div className={styles.discoveryGrid}>
              <div className={styles.discoveryCard}>
                <span className={styles.discoveryNum}>01</span>
                <p className={styles.discoveryTitle}>Policy Deep Dive</p>
                <p className={styles.discoveryBody}>Mapped ADA, California PDL, and SHC eligibility rules before touching any user flows. Built a compliance matrix to identify every edge case the design had to handle.</p>
              </div>
              <div className={styles.discoveryCard}>
                <span className={styles.discoveryNum}>02</span>
                <p className={styles.discoveryTitle}>Stakeholder Interviews</p>
                <p className={styles.discoveryBody}>3 sessions with the PM, ops lead, and 2 legal experts. Focused entirely on current-state pain: what was breaking, what was being handled manually, and why.</p>
              </div>
            </div>

            <div className={styles.insightBlock}>
              <span className={styles.insightLabel}>Key Insight</span>
              <p className={styles.insightText}>SHC forms, leave approval, and the employee's mental model were three completely separate systems — with no handshake between them.</p>
            </div>

            <div className={styles.artifactRow}>
              <figure className={styles.artifactFig}>
                <img src={`${BASE}/parental%20leave%20gap%20brainstorm%201.png`} alt="Parental leave gap brainstorm" className={styles.artifactImg} />
                <figcaption className={styles.artifactCaption}>FigJam brainstorm — mapping product gaps before wireframes</figcaption>
              </figure>
              <figure className={styles.artifactFig}>
                <img src={`${BASE}/design%20studio%20sketch.png`} alt="Design studio sketches" className={styles.artifactImg} />
                <figcaption className={styles.artifactCaption}>Early design studio sketches</figcaption>
              </figure>
            </div>
          </section>

          {/* Design Challenge */}
          <section id="challenge" ref={el => { sectionRefs.current['challenge'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Design Challenge</span>
            <blockquote className={styles.hmw}>
              How might we support pregnancy disability leave from start to end — so employees feel confident, not lost?
            </blockquote>
            <div className={styles.hmwSubs}>
              <p className={styles.hmwSub}>HMW inform employees of what they need to submit to unlock their full leave entitlement?</p>
              <p className={styles.hmwSub}>HMW make leave approval visible and auditable for HR admins, without adding ops burden?</p>
              <p className={styles.hmwSub}>HMW give employees a live timeline so they feel empowered, not abandoned, during their leave?</p>
            </div>
          </section>

          {/* Principles */}
          <section id="principles" ref={el => { sectionRefs.current['principles'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Design Principles</span>
            <h2 className={styles.sectionHeading}>Before sketching, we aligned on filters.</h2>
            <p className={styles.prose}>These were decision filters I returned to every time I hit a tradeoff. Not aspirational values — actual constraints that shaped what got built.</p>

            <div className={styles.principlesGrid}>
              {PRINCIPLES.map(p => (
                <div key={p.title} className={styles.principleCard}>
                  <p className={styles.principleTitle}>{p.title}</p>
                  <p className={styles.principleBody}>{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Design Decisions */}
          <section id="decisions" ref={el => { sectionRefs.current['decisions'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Design Decisions</span>
            <h2 className={styles.sectionHeading}>Three decisions that shaped the product.</h2>

            {DECISIONS.map(d => (
              <div key={d.num} className={styles.decision}>
                <div className={styles.decisionMeta}>
                  <span className={styles.decisionNum}>{d.num}</span>
                  <h3 className={styles.decisionTitle}>{d.title}</h3>
                </div>
                <div className={styles.decisionSplit}>
                  <div className={styles.decisionText}>
                    <p className={styles.decisionOptions}>{d.options}</p>
                    <p className={styles.prose}>{d.body}</p>
                    <div className={styles.decisionOutcomes}>
                      <div className={styles.outcomeItem}>
                        <span className={styles.outcomeKey}>Tradeoff</span>
                        <span className={styles.outcomeVal}>{d.tradeoff}</span>
                      </div>
                      <div className={styles.outcomeItem}>
                        <span className={styles.outcomeKey}>Result</span>
                        <span className={styles.outcomeVal}>{d.result}</span>
                      </div>
                    </div>
                  </div>
                  <img src={d.img} alt={d.title} className={styles.decisionImg} />
                </div>
              </div>
            ))}
          </section>

          {/* Design + Engineering */}
          <section id="engineering" ref={el => { sectionRefs.current['engineering'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Design + Engineering</span>
            <h2 className={styles.sectionHeading}>I didn't just hand off. I shipped.</h2>
            <p className={styles.prose}>
              As a front-end engineer, I built 6 production React components for the PDL flow. This changed how I designed — not just how I handed off.
            </p>

            <div className={styles.engGrid}>
              {ENG_POINTS.map(e => (
                <div key={e.title} className={styles.engCard}>
                  <p className={styles.engTitle}>{e.title}</p>
                  <p className={styles.engBody}>{e.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final Design */}
          <section id="final" ref={el => { sectionRefs.current['final'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Final Design</span>
            <h2 className={styles.sectionHeading}>Milestone 1: The employee leave planner.</h2>

            <div className={styles.finalGrid}>
              <figure className={styles.finalFig}>
                <img src={`${BASE}/final%201.png`} alt="Final design screen 1" className={styles.finalImg} />
              </figure>
              <div className={styles.finalScreenList}>
                {FINAL_SCREENS.map(s => (
                  <div key={s.label} className={styles.finalScreenItem}>
                    <p className={styles.finalScreenLabel}>{s.label}</p>
                    <p className={styles.finalScreenDesc}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <img src={`${BASE}/full%20final%201.png`} alt="Full final design view 1" className={styles.fullFinal} />
            <img src={`${BASE}/full%20final%202.png`} alt="Full final design view 2" className={styles.fullFinal} />
          </section>

          {/* Reflection */}
          <section id="reflection" ref={el => { sectionRefs.current['reflection'] = el }} className={`${styles.section} ${styles.sectionLast}`}>
            <span className={styles.sectionLabel}>Reflection</span>

            <div className={styles.reflectionGrid}>
              <div className={styles.reflectionCol}>
                <p className={styles.reflectionColHead}>What I'd do differently</p>
                <ul className={styles.reflectionList}>
                  <li>Test with employees who had direct lived experience earlier. Proxy users weren't emotionally authentic — the anxiety dimension needed that perspective to design for accurately.</li>
                  <li>Push harder on metric instrumentation pre-launch. We relied on client feedback rather than behavioral data. I'd instrument before shipping.</li>
                  <li>Scope one more week for legal review. The compliance sign-off cycle compressed the build phase in ways that were hard to recover from.</li>
                </ul>
              </div>
              <div className={styles.reflectionCol}>
                <p className={styles.reflectionColHead}>What I'd carry forward</p>
                <ul className={styles.reflectionList}>
                  <li>Principles as decision filters. Every tradeoff went back to the 4 principles — kept debates short without escalation.</li>
                  <li>The dual design-engineer role was worth the complexity. Building what I designed surfaced edge cases no Figma prototype could have caught.</li>
                  <li>Design for the emotion, not just the task. PDL isn't a workflow — it's a life event. The best decisions came from that framing.</li>
                </ul>
              </div>
            </div>

            <blockquote className={styles.closingQuote}>
              Good compliance UX isn't about hiding the rules. It's about holding the user's hand through them.
              <span className={styles.closingSub}>The hardest design problems aren't visual — they're structural. The gaps were in the system, not the UI.</span>
            </blockquote>
          </section>

        </main>
      </div>
    </div>
  )
}
