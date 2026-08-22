import CaseStudyLayout, { Section, Milestone } from '../../components/CaseStudyLayout/CaseStudyLayout'
import { asset } from '../../utils/asset'
import cs from './caseStudy.module.css'

const BASE = asset('palbit assets')

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'problem',    label: 'The Problem' },
  { id: 'prototypes', label: 'Prototyping' },
  { id: 'pivot',      label: 'The Pivot' },
  { id: 'final',      label: 'The Solution' },
  { id: 'decisions',  label: 'Design Decisions' },
  { id: 'reflection', label: 'Reflection' },
]

const META = [
  { label: 'Year',    value: '2025' },
  { label: 'Team',    value: '3 people' },
  { label: 'Program', value: 'MDes · UC Berkeley' },
  { label: 'Advisor', value: 'Prof. Ahmed Riaz · Logitech' },
]

const ROLE = [
  {
    title: 'My Role',
    body: 'Design lead. Concept ideation and interaction-design direction, led all user research sessions, and synthesized findings into design pivots.',
  },
  {
    title: 'Team',
    body: '2 MDes collaborators.',
  },
]

const CONTEXT = [
  {
    title: 'Audience',
    body: 'Children 8–12. An age group that craves customization, social validation, and visible markers of growth.',
  },
  {
    title: 'Form factor',
    body: 'Physical game controller. The one object in gaming that has never changed to reflect the player holding it.',
  },
  {
    title: 'Challenge',
    body: 'Translating the abstract emotion of "fun" into a tangible, evolving physical interaction.',
  },
]

const PROTOTYPES = [
  {
    title: 'Cosmetic evolution',
    img: `${BASE}/initial%20concept%201.png`,
    caption: 'Concept 1 — controller grows cosmetic parts as you level up',
    what: 'I designed the controller to grow horns as players leveled up, cosmetic parts that deployed automatically from the body once a threshold was hit.',
    feedback: 'Users in testing thought it looked cool, but felt the evolving interaction too strictly limited what the game could be.',
  },
  {
    title: 'Difficulty escalation',
    img: `${BASE}/initial%20concept%202.png`,
    caption: 'Concept 2 — parts detach as trophies as you progress',
    what: 'Parts physically detached as players progressed. The removed pieces became a trophy to keep.',
    feedback: 'The interaction read as the controller breaking, and it created frustration. Progress you can hold was the right idea. The form and interaction just needed to work with the player.',
  },
]

const PRINCIPLES = [
  { title: 'Discrete evolution', body: 'Defined progression points prevent overwhelm. Achievements feel concrete and countable.' },
  { title: 'Physical + digital', body: 'Tangible bits combined with digital progression strengthen the emotional weight of each milestone.' },
  { title: 'Identity & ownership', body: 'Customization enables player autonomy. Kids build a controller that looks like them.' },
  { title: 'Social by design', body: 'Visible upgrades turn private progress into something worth showing off.' },
]

const DECISIONS = [
  {
    title: 'Physical bits you can hold',
    body: 'A digital badge only exists on a screen the player is looking at. A physical bit that slots into the controller can be shown to a friend, compared, even traded. For children 8–12, whose play is intensely social and whose pride is externally performed, that difference in materiality changes the emotional weight of earning something.',
    img: `${BASE}/prototype.png`,
    maxWidth: 544,
  },
  {
    title: 'Discrete milestones that snap into place',
    body: 'A continuously filling bar teaches optimization. Defined milestones create discrete moments, a new bit snaps in and something visibly changes. The controller looks different. Testing showed kids responded to the arrival of a milestone as an event. Milestones feel like achievements; a filling meter feels like a job.',
    img: `${BASE}/gemini%20mockup.png`,
    maxWidth: 586,
  },
  {
    title: 'Customization as autonomy',
    body: "Every Palbit can be personalized. The design intent was to give children ownership over what their progression looked like, so the look of their progress was theirs to decide. Research into child development showed autonomy and self-expression are central at this age, part of how kids form identity and confidence. When kids own what their controller looks like, they own what they've achieved.",
  },
  {
    title: 'Social visibility as a core feature',
    body: "The bits are visible on the outside of the controller. That's a deliberate choice. For children 8–12, gaming is fundamentally social. Showing a friend your bits, comparing configurations, demonstrating a new unlock, these are part of the reward loop. The social layer wasn't added later. It was load-bearing from the start.",
  },
]

const CARRY_FORWARD = [
  'Both prototypes failed productively. Physical prototyping surfaced things no sketch or digital mockup could, you have to put something in someone\'s hands to know if the interaction actually lands.',
  'Research reveals the unexpected audience. The pivot to children wasn\'t in the brief. It came from sitting with child development psychology long enough to see where the concept had always belonged.',
  'Translating "fun" into form starts as a research problem. We needed a working definition of fun for our specific audience before any design decision could be justified.',
]

const DO_DIFFERENTLY = [
  'Test with the target audience earlier. The first two prototypes were evaluated with adults because that\'s who was available. The pivot might have come sooner if kids had been in the room from the start.',
  'Prototype the digital integration in parallel with the physical. The physical form got most of the iteration time; the digital-physical handshake was more assumed than designed.',
  'Document more of the research synthesis. The insights that drove the pivot lived in my notes, I\'d externalize that process earlier for a better paper trail and better team alignment.',
]

export default function Palbits() {
  return (
    <CaseStudyLayout
      id="palbits"
      title="What if the controller in your hands grew alongside the game?"
      breadcrumbLabel="Palbits"
      meta={META}
      heroMedia={{ src: `${BASE}/hero.png`, alt: 'Palbits evolving controller system' }}
      sections={SECTIONS}
    >
      {/* ── Overview ── */}
      <Section
        id="overview"
        label="Overview"
        claim="A physical-digital controller where insertable collectible bits evolve as players progress."
      >
        <p className={cs.prose}>
          Palbits is a physical-digital controller system where insertable collectible "bits" evolve
          as players progress through games. It started from a simple brief: design a unique
          controller. Immediately, a concept came to me. Kids spend hundreds of hours holding a
          controller, and yet no controller on the market had been designed to show signs of those
          hours. Well, what if it did? We didn't know yet what the answer looked like. It took two
          failed prototypes, child development psychology, 3D printing iterations, and a pivot away
          from our original audience to find it.
        </p>

        <div className={cs.cols2}>
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
        question="How might we design a controller that evolves alongside its player?"
      >
        <p className={cs.prose}>
          Every part of a game grows with you. Your character levels up, your inventory fills, your
          world expands. The controller in your hands stays exactly as it was on day one. That
          asymmetry was the whole project, before we even knew what to build around it.
        </p>
        <p className={cs.prose} style={{ fontStyle: 'italic', color: 'var(--cs-ink)' }}>
          And a harder, quieter question underneath it — how might we define "fun," and translate it
          into controller design?
        </p>

        <div className={cs.cols3}>
          {CONTEXT.map((c) => (
            <div key={c.title} className={cs.block}>
              <p className={cs.blockTitle}>{c.title}</p>
              <p className={cs.blockBody}>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Prototyping ── */}
      <Section
        id="prototypes"
        label="Prototyping"
        claim="Two prototypes. Both tested well. Both wrong in ways only your hands could tell you."
      >
        <p className={cs.prose}>
          We built two physical prototypes before arriving at the final system. Both were 3D
          printed. Both received positive reactions in testing. Both had meaningful shortcomings that
          only became visible once something was in users' hands.
        </p>

        <div className={cs.cols2}>
          {PROTOTYPES.map((p) => (
            <div key={p.title} className={cs.block}>
              <figure className={cs.figure}>
                <img src={p.img} alt={p.title} className={cs.media} />
                <figcaption className={cs.caption}>{p.caption}</figcaption>
              </figure>
              <p className={cs.blockTitle}>{p.title}</p>
              <p className={cs.blockBody}>{p.what}</p>
              <p className={cs.label} style={{ marginTop: 12 }}>What I learned</p>
              <p className={cs.blockBody}>{p.feedback}</p>
            </div>
          ))}
        </div>

        <p className={cs.prose}>
          Between the two of the prototypes, I started to see what we'd actually been getting wrong:
          we kept designing the visual payoff before we'd figured out what earning something was
          supposed to feel like for these particular players.
        </p>

        <figure className={cs.figure}>
          <img
            src={`${BASE}/concept%20sketch.png`}
            alt="Early concept sketches"
            className={cs.media}
            style={{ maxWidth: 426 }}
          />
          <figcaption className={cs.caption}>
            Early concept sketches, exploring the physical form language
          </figcaption>
        </figure>
      </Section>

      {/* ── The Pivot ── */}
      <Section
        id="pivot"
        label="The Pivot"
        claim="Adults had made peace with static hardware. Kids hadn't."
      >
        <p className={cs.prose}>
          We had been designing for adults 18 to 28. That was the comfortable choice, the demographic
          closest to us as student designers. The evolving controller concept kept feeling forced for
          that group. Adults had already made their peace with static hardware.
        </p>
        <p className={cs.prose}>
          Our professor Ahmed, drawing on his experience at Logitech, pushed us to think about a
          wider audience. I went and read more child development research than I expected to for a
          hardware project, and the answer that kept surfacing was kids around 8 to 12: an age where
          wanting to show off what you've earned is developmentally normal.{' '}
          <strong>
            Adults had mostly made peace with their hardware staying the same forever. Kids hadn't,
            because for them customization and visible status are still how identity gets built.
          </strong>
        </p>
      </Section>

      <Milestone>The Solution · Palbits</Milestone>

      {/* ── The Solution ── */}
      <Section
        id="final"
        label="The Solution"
        claim="Personalizable, insertable ability bits that power up as players progress."
      >
        <p className={cs.prose}>
          Palbits: personalizable, insertable ability bits that power up as players progress through
          games. The controller becomes a display object as much as an input device, something that
          reflects its owner.
        </p>

        <figure className={cs.figure}>
          <img src={`${BASE}/final%20prototype.png`} alt="Palbits final prototype" className={cs.media} />
        </figure>
        <figure className={cs.figure}>
          <img src={`${BASE}/group%20demo.png`} alt="Group demo of Palbits" className={cs.media} />
          <figcaption className={cs.caption}>Group demo and final presentation</figcaption>
        </figure>

        <div className={cs.cols2}>
          {PRINCIPLES.map((p) => (
            <div key={p.title} className={cs.block}>
              <p className={cs.blockTitle}>{p.title}</p>
              <p className={cs.blockBody}>{p.body}</p>
            </div>
          ))}
        </div>

        <p className={cs.label} style={{ marginTop: 8 }}>Envisioning how kids would use it</p>
        <div className={cs.cols2}>
          <figure className={cs.figure}>
            <img
              src={`${BASE}/kids%20using%20controller%20v2.png`}
              alt="Concept mockup of children using the Palbits controller"
              className={cs.media}
            />
          </figure>
          <figure className={cs.figure}>
            <img
              src={`${BASE}/kids%20using%20controller.png`}
              alt="Concept mockup of children using the Palbits controller"
              className={cs.media}
            />
          </figure>
        </div>
        <p className={cs.note}>
          AI-generated concept imagery, used to picture the controller in real, social play. Concept
          renders only.
        </p>
      </Section>

      {/* ── Design Decisions ── */}
      <Section
        id="decisions"
        label="Design Decisions"
        claim="The choices behind that solution, and the reasoning that got us to each one."
      >
        <div className={cs.stack} style={{ marginTop: 0 }}>
          {DECISIONS.map((d) => (
            <div key={d.title} className={cs.block}>
              <p className={cs.blockTitle}>{d.title}</p>
              <p className={cs.blockBody}>{d.body}</p>
              {d.img && (
                <figure className={cs.figure} style={{ marginTop: 14 }}>
                  <img
                    src={d.img}
                    alt={d.title}
                    className={cs.media}
                    style={d.maxWidth ? { maxWidth: d.maxWidth } : undefined}
                  />
                </figure>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ── Reflection ── */}
      <Section id="reflection" label="Reflection" claim="What I'd carry forward, and what I'd change.">
        <div className={cs.cols2} style={{ marginTop: 0 }}>
          <div className={cs.block}>
            <p className={cs.blockTitle}>What I'd carry forward</p>
            {CARRY_FORWARD.map((t, i) => (
              <p key={i} className={cs.blockBody} style={{ marginTop: i ? 10 : 6 }}>{t}</p>
            ))}
          </div>
          <div className={cs.block}>
            <p className={cs.blockTitle}>What I'd do differently</p>
            {DO_DIFFERENTLY.map((t, i) => (
              <p key={i} className={cs.blockBody} style={{ marginTop: i ? 10 : 6 }}>{t}</p>
            ))}
          </div>
        </div>
      </Section>
    </CaseStudyLayout>
  )
}
