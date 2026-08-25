import CaseStudyLayout, { Section, Milestone } from '../../components/CaseStudyLayout/CaseStudyLayout'
import { asset } from '../../utils/asset'
import cs from './caseStudy.module.css'

const BASE = asset('cocoon assets')
const PUB = `${BASE}/cocoon%20public`

const SECTIONS = [
  { id: 'context',    label: 'Context' },
  { id: 'role',       label: 'My Role' },
  { id: 'problem',    label: 'The Problem' },
  { id: 'solution',   label: 'Solution' },
  { id: 'discovery',  label: 'Discovery' },
  { id: 'challenge',  label: 'Design Challenge' },
  { id: 'principles', label: 'Principles' },
  { id: 'decisions',  label: 'Design Decisions' },
  { id: 'final',      label: 'Final Design' },
  { id: 'reflection', label: 'Reflection' },
]

const META = [
  { label: 'Year',     value: '2024' },
  { label: 'Role',     value: 'Product Designer + Engineer' },
  { label: 'Company',  value: 'Cocoon · Series A, B2B SaaS' },
  { label: 'Timeline', value: '6 weeks · May–Jun 2024' },
]

const ROLE = [
  {
    title: 'Dual role',
    body: 'Product Designer across the end-to-end UX, and Front-End Engineer building 6 production React components for the PDL flow.',
  },
  {
    title: 'Cross-functional team',
    body: 'PM scoping requirements and legal review, 2 legal experts on PDL/SHC, 2 ops managers as implementation partners.',
  },
  {
    title: 'Constraints',
    body: '6 weeks kickoff to launch. Greenfield, no prior PDL product. Had to fit the existing leave-claim architecture.',
  },
]

const GAPS = [
  {
    title: 'SHC forms required multiple re-submissions',
    body: 'Employees did not know SHC certification was mandatory, or how to file it correctly. Ambiguity created repeated loops back to HR.',
    note: 'Ambiguity → re-submissions',
  },
  {
    title: 'Leave approval had no audit trail',
    body: 'Approval happened over email chains. Neither employer nor employee had a timestamped record of decisions.',
    note: 'No audit trail → compliance risk',
  },
  {
    title: 'Employee leave visibility was zero',
    body: 'Employees filed into a black box and waited, with no insight into approval status, estimated pay, or timeline.',
    note: 'Opacity → anxiety + attrition',
  },
]

const DISCOVERY = [
  {
    title: 'Policy deep dive',
    body: 'Mapped ADA, California PDL, and SHC eligibility rules into a compliance matrix before touching any user flows.',
  },
  {
    title: 'Stakeholder interviews',
    body: '3 sessions with the PM, ops lead, and 2 legal experts on current-state pain: what was breaking, and why.',
  },
]

const PRINCIPLES = [
  {
    title: 'Compliance-first, invisible to users',
    body: 'Handle SHC, ADA, and California PDL correctly. The user should never feel the legal complexity.',
  },
  {
    title: 'Transparency over efficiency',
    body: 'Status, timeline, and pay estimates matter more than fewer clicks. Anxiety costs more than extra steps.',
  },
  {
    title: 'Shared context, separate views',
    body: 'HR and employees share a leave case but need different controls. No single view serves both safely.',
  },
  {
    title: 'Fit the existing architecture',
    body: "PDL had to work within the existing leave engine. We didn't have room for a rebuild.",
  },
]

// Shown full-width: both are high-resolution enough to stay crisp at 688px.
const HERO_SCREENS = [
  {
    title: 'Leave timeline planner',
    body: 'Color-coded pre/post-birth/bonding segments, with pay marked "subject to approval authority."',
    img: `${BASE}/Leave%20timeline%20-_%20Time%20(2).png`,
    alt: 'Leave timeline planner with color-coded leave segments',
  },
  {
    title: 'Personalized landing',
    body: 'Plan in private, with no HR notification until submitted.',
    img: `${BASE}/EE%20Home%20-_%20Leave%20Approved%201.png`,
    alt: 'Employee home screen showing an approved leave',
  },
]

export default function Cocoon() {
  return (
    <CaseStudyLayout
      id="cocoon"
      title="Designing a pregnancy disability leave tracker as both the designer and the engineer shipping it"
      breadcrumbLabel="Cocoon"
      meta={META}
      heroMedia={{
        src: `${BASE}/cocoon.gif`,
        alt: 'Animated walkthrough of the launched Cocoon PDL leave planner',
        maxWidth: 640,
      }}
      sections={SECTIONS}
    >
      {/* ── Context ── */}
      <Section
        id="context"
        label="Context"
        claim="Cocoon didn't support pregnancy disability leave at all, and it was holding back a client deal."
      >
        <p className={cs.prose}>
          Cocoon automates federal and state leave compliance and payroll for People teams at over
          50 companies. Pregnancy disability leave was absent from that coverage, and a specific
          client deal was blocked on it — which set the six-week timeline.
        </p>
        <p className={cs.prose}>
          This was Cocoon's first end-to-end PDL product. I was its first dedicated designer, and
          simultaneously a front-end engineer shipping its components.{' '}
          <a
            href="https://www.linkedin.com/posts/at-cocoon-were-all-about-pushing-the-boundaries-share-7232836636621815810-ImsP/"
            target="_blank"
            rel="noopener noreferrer"
            className={cs.proseLink}
          >
            Cocoon's launch post
          </a>
          .
        </p>

        <figure className={cs.figure}>
          <img
            src={`${PUB}/cocoon-employee-experience.webp`}
            alt="Cocoon's employee leave experience, with ongoing support from a leave expert"
            className={cs.media}
          />
          <figcaption className={cs.caption}>
            The existing Cocoon leave experience I was designing into · Image courtesy of cocoon.com
          </figcaption>
        </figure>
      </Section>

      {/* ── My Role ── */}
      <Section
        id="role"
        label="My Role"
        claim="Designing and building the same feature, in six weeks, with legal in the room."
      >
        <div className={cs.cols3} style={{ marginTop: 0 }}>
          {ROLE.map((r) => (
            <div key={r.title} className={cs.block}>
              <p className={cs.blockTitle}>{r.title}</p>
              <p className={cs.blockBody}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── The Problem ── */}
      <Section
        id="problem"
        label="The Problem"
        claim="Three structural gaps were quietly creating overhead for the company, employers, and the employees stuck in the middle."
      >
        <p className={cs.prose}>
          With no PDL support, every case fell back on manual handling. The failures were structural,
          not cosmetic.
        </p>

        <figure className={cs.figure}>
          <img
            src={`${BASE}/parental%20leave%20gap%20brainstorm%201.png`}
            alt="FigJam brainstorm mapping the parental leave product gaps"
            className={`${cs.media} ${cs.blurred}`}
          />
          <figcaption className={cs.caption}>
            Mapping the gaps in FigJam · Blurred for privacy
          </figcaption>
        </figure>

        <div className={cs.stack}>
          {GAPS.map((g) => (
            <div key={g.title} className={cs.block}>
              <p className={cs.blockTitle}>{g.title}</p>
              <p className={cs.blockBody}>{g.body}</p>
              <p className={cs.note}>{g.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Solution ── */}
      <Section
        id="solution"
        label="Solution"
        claim="One planner that carries the compliance weight so the employee never has to."
      >
        <p className={cs.prose}>
          SHC certification, approval, and pay visibility became one flow: fields revealed
          progressively rather than all at intake, approval routed through the employer's existing
          view, and a live timeline with an estimated pay range from the first screen.
        </p>
        <figure className={cs.figure}>
          <img
            src={`${BASE}/full%20final%202.png`}
            alt="Overview of the pregnancy disability leave planner flow"
            className={cs.media}
          />
        </figure>
      </Section>

      {/* ── Discovery ── */}
      <Section
        id="discovery"
        label="Discovery"
        claim="Before sketching anything, I needed to understand PDL well enough to know what I was even designing for."
      >
        <div className={cs.cols2} style={{ marginTop: 0 }}>
          {DISCOVERY.map((d) => (
            <div key={d.title} className={cs.block}>
              <p className={cs.blockTitle}>{d.title}</p>
              <p className={cs.blockBody}>{d.body}</p>
            </div>
          ))}
        </div>

        <p className={cs.prose}>
          SHC forms, leave approval, and the employee's mental model were three completely separate
          systems, with no handshake between them.
        </p>

        <figure className={cs.figure}>
          <img
            src={`${BASE}/design%20studio%20sketch.png`}
            alt="Design studio sketches exploring the leave planner"
            className={`${cs.media} ${cs.blurred}`}
          />
          <figcaption className={cs.caption}>Design studio sketches · Blurred for privacy</figcaption>
        </figure>
      </Section>

      {/* ── Design Challenge ── */}
      <Section
        id="challenge"
        label="Design Challenge"
        question="How might we support pregnancy disability leave from start to end, so employees never feel like they're navigating it alone?"
      >
        <div className={cs.stack} style={{ marginTop: 0 }}>
          <p className={cs.blockBody}>
            HMW inform employees of what they need to submit to unlock their full leave entitlement?
          </p>
          <p className={cs.blockBody}>
            HMW make leave approval visible and auditable for HR admins, without adding ops burden?
          </p>
          <p className={cs.blockBody}>
            HMW give employees a live timeline that keeps them in the loop the whole way through?
          </p>
        </div>
      </Section>

      {/* ── Principles ── */}
      <Section
        id="principles"
        label="Principles"
        claim="Before sketching, we aligned on filters."
      >
        <div className={cs.cols2} style={{ marginTop: 0 }}>
          {PRINCIPLES.map((p) => (
            <div key={p.title} className={cs.block}>
              <p className={cs.blockTitle}>{p.title}</p>
              <p className={cs.blockBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Design Decisions ── */}
      <Section
        id="decisions"
        label="Design Decision"
        claim="Reveal the SHC form one step at a time, not all at once."
      >
        <p className={cs.prose}>
          Presenting every SHC field at intake puts the heaviest cognitive load on employees at
          exactly the wrong moment. We split the form into three contextual steps, surfacing each
          field only when it became relevant. That meant more engineering states to manage, so I cut
          the cost by using a theme-wrapped JSON form already in the codebase.
        </p>
        <figure className={cs.figure}>
          <img
            src={`${BASE}/flow%201.png`}
            alt="Blurred flow of the three-step progressive SHC disclosure form"
            className={`${cs.media} ${cs.blurred}`}
          />
          <figcaption className={cs.caption}>Blurred for privacy</figcaption>
        </figure>
      </Section>

      <Section
        id="decision-approval"
        label="Design Decision"
        claim="Keep approval with employers, so the system scales as companies onboard."
      >
        <p className={cs.prose}>
          HR already had its own view, so the real question was where approval itself should happen.
          We pushed it out to the employer's existing view rather than building it inside our
          product. That meant adding UI to an interface we didn't fully own, but it kept the system
          scalable as we onboarded more companies instead of routing every approval back through us.
        </p>
        <figure className={cs.figure}>
          <img
            src={`${BASE}/flow%202.png`}
            alt="Blurred flow of the employer-side leave approval experience"
            className={`${cs.media} ${cs.blurred}`}
          />
          <figcaption className={cs.caption}>Blurred for privacy</figcaption>
        </figure>
      </Section>

      <Section
        id="decision-pay"
        label="Design Decision"
        claim="Surface a pay range early, clearly labeled as an estimate."
      >
        <p className={cs.prose}>
          Uncertainty about pay is the core emotional driver of leave-related anxiety. We surfaced a
          pay range early, clearly labeled "Estimated, subject to approval authority," with an
          expandable disclaimer.
        </p>
        <figure className={cs.figure}>
          <img
            src={`${BASE}/flow%203.png`}
            alt="Blurred flow showing estimated pay visibility in the leave planner"
            className={`${cs.media} ${cs.blurred}`}
          />
          <figcaption className={cs.caption}>Blurred for privacy</figcaption>
        </figure>
      </Section>

      <Milestone>Milestone 1 · Employee leave planner</Milestone>

      {/* ── Final Design ── */}
      <Section id="final" label="Final Design" claim="The employee leave planner.">
        {HERO_SCREENS.map((s) => (
          <div key={s.title} className={cs.block} style={{ marginBottom: 34 }}>
            <figure className={cs.figure}>
              <img src={s.img} alt={s.alt} className={cs.media} />
            </figure>
            <p className={cs.blockTitle}>{s.title}</p>
            <p className={cs.blockBody}>{s.body}</p>
          </div>
        ))}

        <figure className={cs.figure}>
          <img
            src={`${BASE}/cocoon.gif`}
            alt="Animated walkthrough of the launched Cocoon PDL leave planner"
            className={cs.media}
            style={{ maxWidth: 640 }}
          />
          <figcaption className={cs.caption}>Walkthrough of launched PDL planner</figcaption>
        </figure>
      </Section>

      {/* ── Reflection ── */}
      <Section id="reflection" label="Reflection" claim="What I took away from shipping it.">
        <div className={cs.stack} style={{ marginTop: 0 }}>
          <div className={cs.block}>
            <p className={cs.blockTitle}>
              Deciding trade-off priorities first made the biggest difference.
            </p>
            <p className={cs.blockBody}>
              Every time a tradeoff came up we went back to them, and that kept debates short instead
              of letting them escalate.
            </p>
          </div>
          <div className={cs.block}>
            <p className={cs.blockTitle}>
              Being both the designer and the engineer added complexity, but it was worth it.
            </p>
            <p className={cs.blockBody}>
              Building the components I'd designed surfaced edge cases no Figma prototype would have
              caught, and it kept reminding me to design for the emotion underneath each task.
            </p>
          </div>
        </div>
      </Section>
    </CaseStudyLayout>
  )
}
