import CaseStudyLayout, { Section, Milestone } from '../../components/CaseStudyLayout/CaseStudyLayout'
import { asset } from '../../utils/asset'
import cs from './caseStudy.module.css'

const BASE = asset('berky assets')

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'problem',    label: 'The Problem' },
  { id: 'research',   label: 'Research' },
  { id: 'hypothesis', label: 'The Hypothesis' },
  { id: 'ideation',   label: 'Ideation' },
  { id: 'solution',   label: 'The Solution' },
  { id: 'app',        label: 'The App' },
  { id: 'reflection', label: 'Reflection' },
]

const META = [
  { label: 'Year',     value: '2025' },
  { label: 'Role',     value: 'Product Designer · UI Lead' },
  { label: 'Team',     value: 'Elisa, Precious, Skye & Tiffany' },
  { label: 'Timeline', value: '4 weeks · Fall 2025' },
]

const ROLE = [
  {
    title: 'My Role',
    body: 'Ideation and concept direction, user research and synthesis, high-fidelity app UI design, and UI lead for the digital companion.',
  },
  {
    title: 'Team',
    body: 'Elisa, Precious, and Skye.',
  },
]

const PAIN_POINTS = [
  {
    title: 'The "gross" factor',
    body: 'Indoor bins are perceived as unhygienic, attracting pests and bad smells. The sensory experience of composting is the first barrier, and it lands before habits even form.',
    note: 'Perception → avoidance',
  },
  {
    title: 'The effort gap',
    body: 'Manual waste sorting is viewed as tedious, requiring more effort than standard recycling with no visible payoff. The ratio of effort to reward feels broken.',
    note: 'Effort → abandonment',
  },
  {
    title: 'The knowledge void',
    body: "Residents often don't know where their waste goes or how to manage it if their building doesn't participate. Without feedback, composting feels like shouting into a void.",
    note: 'Opacity → disengagement',
  },
]

const RESEARCH_PHOTOS = [
  { src: `${BASE}/berkeley-residents%201.png`, alt: 'Berkeley residents composting' },
  { src: `${BASE}/IMG_4642%202.png`, alt: 'Expert interview' },
  { src: `${BASE}/IMG_4642%201.png`, alt: 'Berkeley Student Food Collective' },
]

const CONCEPTS = [
  {
    title: 'Compost vending machine / locker',
    img: `${BASE}/image%2010.png`,
    desc: 'A locker-style drop-off kiosk with goal tracking and rewards. Familiar form factor, but it felt transactional, more ATM than community.',
    selected: false,
  },
  {
    title: 'Community compost worm',
    img: `${BASE}/image%201.png`,
    desc: 'A large sculptural worm functioning as a composting hub. This is the direction we bet on. It merged infrastructure, education, play, and identity into one object.',
    selected: true,
  },
  {
    title: 'Community cargo monster',
    img: `${BASE}/image%2012.png`,
    desc: 'A mobile compost collector with a community display, so the worm comes to residents on its route. Operationally complex but directionally interesting.',
    selected: false,
  },
]

const HOW_IT_WORKS = [
  { step: 'Feed the worm', desc: 'Users drop organic waste directly into Berky at the community garden.' },
  { step: 'Compost turns', desc: 'Integrated bikes let visitors exercise while physically turning the compost, which speeds up decomposition sustainably.' },
  { step: 'Watch it work', desc: 'A clear educational window lets passersby see the transformation process firsthand.' },
  { step: 'Track on the app', desc: 'Scan the QR code on Berky to monitor health, get feeding suggestions, and earn rewards.' },
]

const APP_FEATURES = [
  {
    title: 'Feeding suggestions + shuffle',
    body: 'Berky tells you exactly what she needs right now, which removes the "is this even compostable?" decision paralysis. A shuffle button swaps in other options if you don\'t have the suggested item, so people actually bring something, and something effective.',
  },
  {
    title: 'Reward progress bar',
    body: 'The bar shows how close you are to the next reward. Seeing "almost there" is what pulls people back, and perks redeem at real local stores like Berkeley Bowl, grounding the loop in the community.',
  },
  {
    title: 'Care-based notifications',
    body: 'Push copy is framed as Berky needing you: "Berky\'s hungry." A care nudge that leans on the caretaker relationship does more for habit than a reminder ever could.',
  },
  {
    title: "Berky's status",
    body: 'A live readout of Capacity, C:N Ratio, Moisture, and pH, turning an invisible process into something you can follow and feel responsible for.',
  },
  {
    title: 'Mascot design',
    body: "The cute illustrated worm builds emotional connection, so residents feel like they're looking after something alive.",
  },
]

export default function Berky() {
  return (
    <CaseStudyLayout
      id="berky"
      title="Making composting a fun, habitual part of Berkeley life through play, art, and a very cute worm"
      breadcrumbLabel="Berky the Worm"
      meta={META}
      heroMedia={{ src: `${BASE}/mockup%20berky.png`, alt: 'Berky the Worm app and installation mockup', maxWidth: 775 }}
      sections={SECTIONS}
    >
      {/* ── Overview ── */}
      <Section
        id="overview"
        label="Overview"
        claim="Turning a “gross” chore into an art-integrated social experience."
      >
        <p className={cs.prose}>
          Berky the Worm is a service design initiative aimed at making composting a fun, habitual
          part of life for the Berkeley community. By blending physical play structures with a
          digital reward system, we transformed a "gross" chore into an art-integrated social
          experience.
        </p>
        <p className={cs.prose}>
          Berky doubles as a public play structure, workout space, and organic waste drop-off, all
          while educating the community about the composting process. My role as UI lead was to
          contribute heavily to initial idea generation and design the high-fidelity app.
        </p>

        <div className={cs.cols2}>
          {ROLE.map((r) => (
            <div key={r.title} className={cs.block}>
              <p className={cs.blockTitle}>{r.title}</p>
              <p className={cs.blockBody}>{r.body}</p>
            </div>
          ))}
        </div>

        <figure className={cs.figure}>
          <video
            src={`${BASE}/berky%20mockup%20demo.mp4`}
            className={cs.media}
            autoPlay
            loop
            muted
            playsInline
            controls
          />
          <figcaption className={cs.caption}>
            App walkthrough: the full Berky experience, from feeding the worm to earning rewards
          </figcaption>
        </figure>
      </Section>

      {/* ── The Problem ── */}
      <Section
        id="problem"
        label="The Problem"
        claim="Composting isn't failing because people don't care. It's failing because the current experience doesn't work for them."
      >
        <p className={cs.prose}>
          Berkeley generates tons of organic waste daily, yet residents consistently fail to
          compost. The problem isn't awareness. It's friction, perception, and a broken feedback
          loop.
        </p>

        <div className={cs.stack}>
          {PAIN_POINTS.map((p) => (
            <div key={p.title} className={cs.block}>
              <p className={cs.blockTitle}>{p.title}</p>
              <p className={cs.blockBody}>{p.body}</p>
              <p className={cs.note}>{p.note}</p>
            </div>
          ))}
        </div>

        <p className={cs.prose} style={{ fontStyle: 'italic', color: 'var(--cs-ink)' }}>
          "Maybe it would motivate me if I knew more of the impact I was making by composting, or if
          it could be more fun / less gross somehow."
        </p>
        <p className={cs.note}>— Berkeley resident interview</p>
      </Section>

      {/* ── Research ── */}
      <Section id="research" label="Research" claim="8 interviews. 6 residents, 2 experts.">
        <div className={cs.cols2} style={{ marginTop: 0 }}>
          <div className={cs.block}>
            <p className={cs.blockTitle}>Interview goal</p>
            <p className={cs.blockBody}>
              Understand why composting is inconvenient or unsustainable for urban residents, and
              identify opportunities to make it easier, cleaner, and more habitual.
            </p>
          </div>
          <div className={cs.block}>
            <p className={cs.blockTitle}>Target interviewees</p>
            <p className={cs.blockBody}>Berkeley residents, community organizers, and business owners.</p>
          </div>
        </div>

        <div className={cs.cols3}>
          {RESEARCH_PHOTOS.map((p) => (
            <figure key={p.src} className={cs.figure}>
              <img src={p.src} alt={p.alt} className={cs.media} />
            </figure>
          ))}
        </div>

        <div className={cs.block}>
          <p className={cs.label}>Key insight</p>
          <p className={cs.blockBody}>
            The three barriers of disgust, effort, and opacity aren't independent. A solution that
            tackles only one leaves the other two standing. We needed a single intervention that
            addressed all three at once.
          </p>
        </div>
      </Section>

      {/* ── The Hypothesis ── */}
      <Section
        id="hypothesis"
        label="The Hypothesis"
        question="If composting systems are redesigned to be more intuitive, accessible, and personally rewarding, users will be more likely to adopt and sustain composting behaviors, reducing organic waste sent to landfills."
      >
        <div className={cs.cols2} style={{ marginTop: 0 }}>
          <figure className={cs.figure}>
            <img src={`${BASE}/image%2014.png`} alt="Berky scenario storyboard" className={cs.media} />
            <figcaption className={cs.caption}>
              Early scenario storyboard mapping the before and after of a Berkeley resident's
              composting journey
            </figcaption>
          </figure>
          <figure className={cs.figure}>
            <img src={`${BASE}/image%203.png`} alt="Early app wireframe sketches" className={cs.media} />
            <figcaption className={cs.caption}>
              Initial wireframe sketches exploring the app's core interactions
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* ── Ideation ── */}
      <Section id="ideation" label="Ideation" claim="Three directions. One clear winner.">
        <p className={cs.prose}>
          The team explored three initial concepts before converging on the community worm, the only
          direction that could merge infrastructure, education, play, and community identity into a
          single object.
        </p>

        <div className={cs.cols3}>
          {CONCEPTS.map((c) => (
            <div key={c.title} className={cs.block}>
              <figure className={cs.figure}>
                <img src={c.img} alt={c.title} className={cs.media} />
              </figure>
              {c.selected && <p className={cs.label}>Selected direction</p>}
              <p className={cs.blockTitle}>{c.title}</p>
              <p className={cs.blockBody}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className={cs.block}>
          <p className={cs.label}>Why the worm won</p>
          <p className={cs.blockBody}>
            After early prototyping, the team doubled down on the community compost worm for its
            ability to merge infrastructure, education, play, and community identity into a single
            object. The other concepts were functional. This one was memorable.
          </p>
        </div>
      </Section>

      <Milestone>The Solution · Physical + digital</Milestone>

      {/* ── The Solution ── */}
      <Section
        id="solution"
        label="The Solution"
        claim="An intelligent, art-integrated community space that makes composting education and practice engaging and accessible."
      >
        <p className={cs.prose}>
          The north-star mission: to help Berkeley move toward food self-reliance by pairing a
          physical worm installation with a companion app.
        </p>

        <div className={cs.cols2}>
          <div className={cs.block}>
            <p className={cs.blockTitle}>Short-term</p>
            <p className={cs.blockBody}>
              A unique community space: part playground, part workout area, part organic waste
              drop-off.
            </p>
          </div>
          <div className={cs.block}>
            <p className={cs.blockTitle}>Long-term</p>
            <p className={cs.blockBody}>
              Access to compost, revitalization of local soils, education on food systems, and
              increased community food accessibility.
            </p>
          </div>
        </div>

        <figure className={cs.figure}>
          <img
            src={`${BASE}/Group%204710.png`}
            alt="Annotated Berky physical installation model"
            className={cs.media}
          />
          <figcaption className={cs.caption}>Berky the Worm, the physical installation</figcaption>
        </figure>

        <div className={cs.cols2}>
          {HOW_IT_WORKS.map((h) => (
            <div key={h.step} className={cs.block}>
              <p className={cs.blockTitle}>{h.step}</p>
              <p className={cs.blockBody}>{h.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── The App ── */}
      <Section id="app" label="The App" claim="A digital care companion.">
        <p className={cs.prose}>
          Berky is paired with a companion app that extends engagement beyond the physical site.
          Users can track Berky's health status, see what organic material is needed, monitor
          composting progress, and earn rewards redeemable at local grocery stores. Push
          notifications prompt users when Berky is hungry. We chose a playful, modern aesthetic,
          designing Berky's digital counterpart as a cute illustrated worm to inspire personal
          attachment and connection even beyond the playground.
        </p>

        <div className={cs.cols2}>
          <figure className={cs.figure}>
            <img
              src={`${BASE}/Group%204711.png`}
              alt="Berky app home screen, annotated"
              className={cs.media}
            />
          </figure>
          <figure className={cs.figure}>
            <img src={`${BASE}/reward%20details.png`} alt="Reward earned screen" className={cs.media} />
          </figure>
        </div>

        <div className={cs.stack}>
          {APP_FEATURES.map((f) => (
            <div key={f.title} className={cs.block}>
              <p className={cs.blockTitle}>{f.title}</p>
              <p className={cs.blockBody}>{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Reflection ── */}
      <Section id="reflection" label="Reflection" claim="Play versus practicality.">
        <p className={cs.prose}>
          The core tension I kept running into was play versus practicality. I really wanted to
          design something playful and fun, but that was challenging due to the nature of composting
          and the assignment requirement of using technology.
        </p>
        <p className={cs.prose}>
          The whole premise of Berky was to make it feel fun and social, but there's a version of
          that thinking that becomes superficial fast. As a team, we had to really ask ourselves
          whether the playfulness was actually doing something: changing behavior, lowering friction,
          creating a reason to come back. Or was it just aesthetic justification for a concept we
          already liked? With studio critique and user research, we were confident in our final
          product being both delightful and purposeful.
        </p>
      </Section>
    </CaseStudyLayout>
  )
}
