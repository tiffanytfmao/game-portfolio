import CaseStudyLayout, { Section, Milestone } from '../../components/CaseStudyLayout/CaseStudyLayout'
import { asset } from '../../utils/asset'
import cs from './caseStudy.module.css'

const BASE = asset('nudge assets')

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'problem',    label: 'The Problem' },
  { id: 'research',   label: 'Research' },
  { id: 'signals',    label: 'Interaction Design' },
  { id: 'build',      label: 'Making It Work' },
  { id: 'final',      label: 'The System' },
  { id: 'reflection', label: 'Reflection' },
]

const META = [
  { label: 'Year',    value: '2025' },
  { label: 'Team',    value: '3 people' },
  { label: 'Course',  value: 'DES INV 202 · UC Berkeley' },
  { label: 'Shipped', value: 'Jacobs Design Showcase' },
]

const ROLE = [
  {
    title: 'My Role',
    body: 'Led research and interaction design, and wrote all the software. On the ESP32, I built the Weather and Google Calendar integration, parsed the data, matched calendar events to hooks, and wrote the logic that decides which reminder fires. I also helped with fabrication, cable management, and the electronics housing.',
  },
  {
    title: 'Team',
    body: 'Joy He led the LED design and fabrication. Charlie Duan designed the servo mechanism and proximity sensing. They did most of the CAD and CNC work that turned this into real furniture.',
  },
]

const CONTEXT = [
  { title: 'Where', body: 'The entryway. The last place you stand before the decision becomes irreversible.' },
  { title: 'Constraint', body: 'No screens, no app, no text. Light and motion are the entire vocabulary available.' },
  { title: 'Risk', body: 'Ambient systems fail in two directions — too subtle to notice, or startling enough to resent.' },
]

const SIGNALS = [
  { name: 'Glow', means: 'Ambient · low stakes', body: 'A slow warm fade on the NeoPixel strip. Readable from across the room, ignorable if you already know. This is the default state for anything the weather told us — cold today, rain later.' },
  { name: 'Tilt', means: 'Directed · specific object', body: 'A hook physically rotates toward you. It points at the one thing you need, which no light can do. Reserved for calendar-driven reminders, where the system is confident about a specific item.' },
  { name: 'Pulse', means: 'Urgent · you are leaving now', body: 'Triggered only by the proximity sensor, when someone is actually at the door. The last-second catch, and the only signal allowed to be attention-grabbing.' },
]

const PIPELINE = [
  { title: 'Fetch', body: 'ESP32 polls OpenWeather and the Google Calendar API over WiFi on a timed loop.' },
  { title: 'Parse', body: "Strip the JSON down to what matters: precipitation probability, low temperature, and today's event titles." },
  { title: 'Match', body: 'Keyword detection maps events to hooks — "climbing" or "bouldering" lights the gear hook, and thresholds decide cold vs. rain.' },
  { title: 'Signal', body: 'A coordinator picks one signal per hook so four reminders never fire as noise, then drives servos and LEDs.' },
]

const SYSTEM = [
  {
    name: 'The Hook Box',
    img: `${BASE}/hook-box.png`,
    alt: 'Finished hook box with four character hooks',
    body: 'Four servo-controlled rotating hooks (cold, rain, go, and climbing), triggered by live weather forecast and calendar context. Ultrasonic proximity sensing detects someone approaching, and a NeoPixel strip behind an acrylic diffuser gives the ambient glow.',
  },
  {
    name: 'The Table',
    img: `${BASE}/table-glow.png`,
    alt: 'Tulip table glowing from NeoPixels under the top',
    body: 'A CNC-milled plywood tulip table, cut from a single sheet, with a NeoPixel matrix embedded under the tabletop. A pressure sensor detects objects you set down the night before, and it glows to remind you to pick them back up on the way out.',
  },
]

const PRINCIPLES = [
  { title: 'Right place, right second', body: 'The reminder is silent everywhere except the one spot where you can still act on it.' },
  { title: 'Graded, not loud', body: 'Three tiers of signal mean the system can be informative without being demanding.' },
  { title: 'Furniture first', body: 'It had to read as an object someone would choose to own, not as an electronics project on a wall.' },
  { title: 'Legible without instruction', body: 'A tilting hook points at a thing. No manual, no onboarding, no app.' },
]

const CREDITS = [
  { src: `${BASE}/table-cad.png`, alt: 'CAD render of the interlocking tulip table base' },
  { src: `${BASE}/cnc.png`, alt: 'CNC mill cutting the table parts in the shop' },
  { src: `${BASE}/mechanism-cad.png`, alt: 'Fusion 360 CAD of the hook rotation mechanism' },
  { src: `${BASE}/table-finished.png`, alt: 'Finished tulip table after sanding and spray paint' },
]

const CARRY_FORWARD = [
  'Writing the software made me a better interaction designer here, not a distracted one. Seeing what the calendar data actually looked like changed what I thought the interaction could honestly promise.',
]

const DO_DIFFERENTLY = [
  "Test the signals with people who hadn't built the thing. We could all read them easily because we designed them, and that's exactly the wrong sample.",
  'Keyword matching on calendar titles is fragile, and I knew it while writing it. A real version needs either user-defined mappings or something less brittle than string matching.',
]

export default function Nudge() {
  return (
    <CaseStudyLayout
      id="nudge"
      title="Entryway furniture that reminds you what to bring by moving and glowing, not by buzzing in your pocket"
      breadcrumbLabel="Nudge"
      meta={META}
      heroMedia={{ src: `${BASE}/nudge.png`, alt: 'The Nudge hook box and table' }}
      sections={SECTIONS}
    >
      {/* ── Overview ── */}
      <Section
        id="overview"
        label="Overview"
        claim="A hook box and companion table that move and glow when you need something."
      >
        <p className={cs.prose}>
          Nudge is a wall-mounted hook box and a companion table that move and glow when you need
          something. Rain in the forecast? The umbrella hook tilts toward you. Climbing on the
          calendar at 6pm? The gear hook lights up. The reminder lives in the furniture you already
          walk past, so it arrives at the only moment it's useful — the last few seconds before you
          leave.
        </p>
        <p className={cs.prose}>
          The project started as <em>Perch</em>, a much bigger idea about smart furniture in general.
          Narrowing it to a single moment in a single room is most of what made it work.
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
        question="How might we deliver a reminder at the exact moment it's actionable, without adding another screen to someone's life?"
      >
        <p className={cs.prose}>
          Everyone runs the same silent inventory on the way out: keys, wallet, do I need a jacket,
          is it going to rain, do I have my gym bag. It's small, but it's daily, and it's the kind of
          low-grade cognitive load you stop noticing until you're already on the bus without your
          umbrella.
        </p>
        <p className={cs.prose}>
          Phones already solve this badly. A notification arrives when the phone decides, not when
          you're standing at the door, and it competes with every other notification for the same
          attention. The information isn't the problem. <strong>When and how it reaches you is.</strong>
        </p>
        <p className={cs.prose} style={{ fontStyle: 'italic', color: 'var(--cs-ink)' }}>
          And there's a harder question underneath: how does a piece of furniture tell you something
          specific when it can't use words?
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

      {/* ── Research ── */}
      <Section
        id="research"
        label="Research"
        claim="The forgetting doesn't happen in the kitchen. It happens in the last ten seconds, at the door."
      >
        <p className={cs.prose}>
          We opened with poster presentations and a collaborative FigJam to argue out what the system
          should even include. The early scope was enormous — smart furniture for the whole home. My
          job was to cut it down to something we could defend.
        </p>
        <figure className={cs.figure}>
          <img src={`${BASE}/figjam.png`} alt="Collaborative FigJam board for Nudge concept development" className={cs.media} />
          <figcaption className={cs.caption}>
            Concept development board — where "smart furniture" got narrowed to one room and one moment
          </figcaption>
        </figure>
        <p className={cs.prose}>
          Walking through people's actual leaving-the-house routines, the same structure kept showing
          up: the forgetting happens at the door, when there's no time left to fix it. That made the
          entryway the intervention point, and it made <strong>proximity</strong> — not time of day —
          the right trigger for anything urgent.
        </p>
        <div className={cs.block}>
          <p className={cs.label}>The insight that shaped everything</p>
          <p className={cs.blockBody}>
            A reminder that arrives early gets dismissed and forgotten. A reminder that arrives late
            is useless. The entryway is the only place where a reminder is both timely and still
            actionable — so the system should be silent everywhere else.
          </p>
        </div>
      </Section>

      {/* ── Interaction Design ── */}
      <Section
        id="signals"
        label="Interaction Design"
        claim="Once you remove screens, you're left with light and motion — and each has to say something clear."
      >
        <p className={cs.prose}>
          This was the part I owned most directly. Four hooks and a table all sharing light and motion
          get confusing fast if the signals blur together. So I gave the system three signals, each
          for a different level of urgency. Every reminder has to pick one.
        </p>
        <div className={cs.cols3}>
          {SIGNALS.map((s) => (
            <div key={s.name} className={cs.block}>
              <p className={cs.blockTitle}>{s.name}</p>
              <p className={cs.label}>{s.means}</p>
              <p className={cs.blockBody} style={{ marginTop: 6 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <p className={cs.prose}>
          Having three levels mattered more than any single signal. It let the system stay quiet most
          of the time and still get louder when something was actually urgent.
        </p>
        <div className={cs.block}>
          <p className={cs.label}>Tuning decision</p>
          <p className={cs.blockBody}>
            Early servo tests moved fast and snapped into position, which read as a malfunction rather
            than a message. We slowed the rotation and softened the easing until it read as
            deliberate. Ambient motion has to look intentional or people assume something broke.
          </p>
        </div>
      </Section>

      {/* ── Making It Work ── */}
      <Section
        id="build"
        label="Making It Work"
        claim="The interaction design only means anything if the system actually knows what you need."
      >
        <p className={cs.prose}>
          I wrote the software layer end to end: getting an ESP32 onto WiFi, talking to two APIs, and
          turning their responses into the signal vocabulary.
        </p>
        <div className={cs.cols2}>
          {PIPELINE.map((p) => (
            <div key={p.title} className={cs.block}>
              <p className={cs.blockTitle}>{p.title}</p>
              <p className={cs.blockBody}>{p.body}</p>
            </div>
          ))}
        </div>
        <p className={cs.prose}>
          The hard part wasn't the API calls. It was deciding what to do with the data.{' '}
          <strong>How early is too early?</strong> A climbing reminder at 8am for a 6pm session is
          noise. <strong>What counts as a match?</strong> Calendar titles are written by humans, so
          "bouldering sesh" and "climbing @ IB" both have to land on the same hook.{' '}
          <strong>And what happens when three things fire at once?</strong> That last one is why
          there's a coordination layer instead of each hook reacting independently — four hooks all
          tilting simultaneously communicates nothing.
        </p>
        <figure className={cs.figure}>
          <img src={`${BASE}/electronics.png`} alt="ESP32 and servo motors wired on a breadboard" className={cs.media} />
          <figcaption className={cs.caption}>
            Bench setup — testing servo and LED behavior against live API data before anything went
            into furniture
          </figcaption>
        </figure>
      </Section>

      <Milestone>The System · Shipped at Jacobs Design Showcase</Milestone>

      {/* ── The System ── */}
      <Section id="final" label="The System" claim="Two pieces, both functional, demoed end to end.">
        <div className={cs.cols2} style={{ marginTop: 0 }}>
          {SYSTEM.map((s) => (
            <div key={s.name} className={cs.block}>
              <figure className={cs.figure}>
                <img src={s.img} alt={s.alt} className={cs.media} />
              </figure>
              <p className={cs.blockTitle}>{s.name}</p>
              <p className={cs.blockBody}>{s.body}</p>
            </div>
          ))}
        </div>

        <figure className={cs.figure}>
          <img
            src={`${BASE}/hook-box-wall.png`}
            alt="Hook box mounted on a wall glowing with a scarf hanging from a hook"
            className={cs.media}
          />
          <figcaption className={cs.caption}>Mounted and running — the glow state, doing its job quietly</figcaption>
        </figure>

        <div className={cs.cols2}>
          {PRINCIPLES.map((p) => (
            <div key={p.title} className={cs.block}>
              <p className={cs.blockTitle}>{p.title}</p>
              <p className={cs.blockBody}>{p.body}</p>
            </div>
          ))}
        </div>

        <p className={cs.label} style={{ marginTop: 8 }}>Built by my teammates</p>
        <div className={cs.cols2}>
          {CREDITS.map((c) => (
            <figure key={c.src} className={cs.figure}>
              <img src={c.src} alt={c.alt} className={cs.media} />
            </figure>
          ))}
        </div>
        <p className={cs.note}>
          The CAD and CNC work was Joy and Charlie's. Joy designed the hook rotation mechanism in
          Fusion 360 and CAD'd the tulip table for single-sheet milling; the fabrication, finishing,
          and enclosure design were theirs. I supported the builds, and my software had to fit the
          mechanisms they made — servo torque limits and hook travel were real constraints on what
          the signal vocabulary could ask for. Build photography by Joy He.
        </p>
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
