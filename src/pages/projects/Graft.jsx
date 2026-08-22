import CaseStudyLayout, { Section, Milestone } from '../../components/CaseStudyLayout/CaseStudyLayout'
import { asset } from '../../utils/asset'
import cs from './caseStudy.module.css'
import g from './Graft.module.css'

const BASE = asset('graft assets')

const SECTIONS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'direction',   label: 'Visual Direction' },
  { id: 'loop',        label: 'The Core Loop' },
  { id: 'grafting',    label: 'Grafting & Traits' },
  { id: 'minigames',   label: 'The Minigames' },
  { id: 'guiding',     label: 'Guiding the Player' },
  { id: 'constraints', label: 'Constraints' },
  { id: 'next',        label: "What's Next" },
]

const META = [
  { label: 'When',   value: 'Summer 2026' },
  { label: 'Role',   value: 'UI & UX Designer' },
  { label: 'Team',   value: 'The Bee Team · 6 people' },
  { label: 'Built',  value: 'Unity · Figma' },
]

const OWNED = [
  { title: 'All UI/UX design', body: 'Every menu, minigame screen, letter, and trait panel in the game.' },
  { title: 'Visual direction', body: 'The cozy, hand-drawn look, and how the UI reads against a 3D world.' },
  { title: 'UI in Unity', body: 'I built and placed the UI prefabs, then handed them to engineers to wire up.' },
  { title: 'Micro-UX calls', body: 'The small feedback and layout decisions, plus collaborating on the core systems.' },
]

const CREDITS = [
  { role: 'UI & UX Designer', name: 'Tiffany Mao', me: true },
  { role: 'PM & Narrative Designer', name: 'Pedro Iriarte Ward' },
  { role: 'Programmer & Game Designer', name: 'CJ Iino' },
  { role: 'Programmer & Game Designer', name: 'Issac Greene' },
  { role: 'Music & Sound Designer', name: 'Justus Burdick' },
  { role: '3D & 2D Artist', name: 'Kendall Metcalf' },
]

const DIRECTION = [
  { title: 'Type', body: 'IBM Plex Mono for labels and a handwritten face for names and letters.' },
  { title: 'Color', body: 'Soft greens and cream over the greenhouse. Nothing competes with the plants.' },
  { title: 'Shape', body: 'Rounded panels and buttons with little sprout tabs, matching the soft 3D world.' },
  { title: 'Voice', body: 'Warm and first-person, like handwritten notes from the people you help.' },
]

const LOOP = [
  'A letter arrives asking for a plant with a certain trait.',
  'You cut a scion and a rootstock at the cutting station.',
  'You graft them together and wax the join in a timing minigame.',
  'You pick which trait the hybrid keeps.',
  'You ship it out, and a thank-you letter comes back.',
]

const NEXT = [
  { title: 'More diegetic UI', body: 'The mail already lives on a cork board. I would push the rest the same way: a field journal for traits, a real plant bed for grafting.' },
]

export default function Graft() {
  return (
    <CaseStudyLayout
      id="graft"
      title="Graft! — designing the UI for a cozy game about grafting plants"
      breadcrumbLabel="Graft!"
      meta={META}
      heroMedia={{ src: `${BASE}/title-menu.png`, alt: 'Graft! title screen, set inside a soft 3D greenhouse', maxWidth: 1100 }}
      sections={SECTIONS}
      tags={['Game Design', 'UX/UI', 'Unity']}
      skipTo="grafting"
      skipLabel="Skip to the screens"
      variant="warm"
    >
      {/* ── Overview ── */}
      <Section
        id="overview"
        label="Overview"
        claim="A cozy game about grafting two plants into one hybrid, then sending it out to green the places that need it."
      >
        <p className={cs.prose}>
          We built Graft! in a game jam on the theme <strong>plant a seed</strong>. You play a
          botanist who grafts plants and ships them to gardens that need specific traits. Grafting is
          a real horticultural technique one of our teammates studied, so we built the game around
          teaching it. The climate angle is permaculture: biodiversity, pollinators, and green space.
          If a player finishes curious enough to look up how grafting actually works, the game did its
          job.
        </p>
        <p className={cs.note}>
          I designed all of the UI and UX, set the visual direction, and built the UI prefabs in Unity
          for the engineers to wire up. Everything shown here is from the jam build.
        </p>
        <p className={cs.prose}>
          <a
            className={cs.proseLink}
            href="https://haslurianexplorer.itch.io/the-bee-team-graft"
            target="_blank"
            rel="noopener noreferrer"
          >
            Play the jam build on itch.io ↗
          </a>
        </p>

        <figure className={cs.figure}>
          <iframe
            className={g.video}
            src="https://www.youtube.com/embed/tISzqS7Sc_Y"
            title="Graft! gameplay"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <figcaption className={cs.caption}>A short walk through the greenhouse and the grafting loop.</figcaption>
        </figure>

        <div className={cs.cols2}>
          {OWNED.map((o) => (
            <div key={o.title} className={cs.block}>
              <p className={cs.blockTitle}>{o.title}</p>
              <p className={cs.blockBody}>{o.body}</p>
            </div>
          ))}
        </div>

        <p className={cs.label} style={{ marginTop: 28 }}>The team</p>
        <div className={g.creditsList}>
          {CREDITS.map((c) => (
            <div key={c.name} className={`${g.credit} ${c.me ? g.creditMe : ''}`}>
              <span className={g.creditRole}>{c.role}</span>
              <span className={g.creditName}>{c.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Visual Direction ── */}
      <Section
        id="direction"
        label="Visual Direction"
        claim="Cozy and gentle: 2D hand-drawn plants living in a soft 3D world."
      >
        <p className={cs.prose}>
          I kept the UI simple so the greenhouse and the grafting stay the center of attention. Warm
          creams and greens, rounded shapes, and a handwritten typeface give it a papery, personable
          feel that sits comfortably on top of the 3D world.
        </p>
        <div className={g.pair}>
          <figure className={cs.figure} style={{ margin: 0 }}>
            <img src={`${BASE}/pause-menu.png`} alt="Pause menu with Resume, Settings, Main Menu, and a Controls card" className={cs.media} />
            <figcaption className={cs.caption}>Pause: sprout-topped buttons and a hand-drawn wordmark.</figcaption>
          </figure>
          <figure className={cs.figure} style={{ margin: 0 }}>
            <img src={`${BASE}/settings-menu.png`} alt="Settings menu with Music Volume and SFX Volume sliders and a Close button" className={cs.media} />
            <figcaption className={cs.caption}>Settings: the same rounded buttons and green sliders carry across screens.</figcaption>
          </figure>
        </div>
        <div className={cs.cols2}>
          {DIRECTION.map((d) => (
            <div key={d.title} className={cs.block}>
              <p className={cs.blockTitle}>{d.title}</p>
              <p className={cs.blockBody}>{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── The Core Loop ── */}
      <Section id="loop" label="The Core Loop" claim="Read a request, make the plant, ship it.">
        <div className={g.loop}>
          {LOOP.map((step) => (
            <div key={step} className={g.step}>
              <span className={g.stepNum} aria-hidden="true" />
              <span className={g.stepText}>{step}</span>
            </div>
          ))}
        </div>
        <p className={cs.prose} style={{ marginTop: 22 }}>
          Every screen in the sections below is one beat of this loop. I designed each to teach its
          step on sight, so a first-time player never needs a tutorial wall.
        </p>
      </Section>

      <Milestone>The Screens · One Beat at a Time</Milestone>

      {/* ── Grafting & Traits ── */}
      <Section
        id="grafting"
        label="Grafting & Traits"
        claim="The grafting screen teaches a real technique while you play."
      >
        <figure className={cs.figure}>
          <img src={`${BASE}/grafting-letter.png`} alt="In-game grafting guide explaining scion, rootstock, and the grafting steps" className={cs.media} style={{ maxWidth: 620 }} />
          <figcaption className={cs.caption}>
            The in-game grafting guide. It names scion and rootstock and walks the real steps, the same
            technique the minigames act out.
          </figcaption>
        </figure>
        <p className={cs.prose}>
          After grafting, you choose which trait the hybrid keeps. I laid the traits across two facing
          notebook pages, scion on the left and rootstock on the right, so the choice reads like
          picking from a field journal. Locked traits stay on the page as a <strong>?</strong>, so you
          can always see there is more to earn.
        </p>
        <div className={g.pair}>
          <figure className={cs.figure} style={{ margin: 0 }}>
            <img src={`${BASE}/trait-selection-locked.png`} alt="Trait selection early on, with only two traits unlocked" className={cs.media} />
            <figcaption className={cs.caption}>Early: two traits unlocked.</figcaption>
          </figure>
          <figure className={cs.figure} style={{ margin: 0 }}>
            <img src={`${BASE}/trait-selection.png`} alt="Trait selection later, with more traits unlocked and one selected" className={cs.media} />
            <figcaption className={cs.caption}>Later: more unlocked, one picked.</figcaption>
          </figure>
        </div>
      </Section>

      {/* ── The Minigames ── */}
      <Section id="minigames" label="The Minigames" claim="Precision you can read at a glance.">
        <p className={cs.prose}>
          Cutting and waxing are the two hands-on steps. Each screen shows one line of instruction and
          one action. In cutting, you drag along a dotted line to slice the stem. In waxing, you stop
          three moving bars inside a green zone.
        </p>
        <div className={g.pair}>
          <figure className={cs.figure} style={{ margin: 0 }}>
            <img src={`${BASE}/cutting-minigame.png`} alt="Cutting minigame: drag scissors along a dotted line across a plant stem" className={cs.media} />
            <figcaption className={cs.caption}>Cutting: drag along the dotted line to make the cut.</figcaption>
          </figure>
          <figure className={cs.figure} style={{ margin: 0 }}>
            <img src={`${BASE}/waxing-minigame.png`} alt="Waxing minigame: three bars to stop inside a green zone, with a Go button" className={cs.media} />
            <figcaption className={cs.caption}>Waxing: stop each bar in the green zone by pressing Go!</figcaption>
          </figure>
        </div>
      </Section>

      {/* ── Guiding the Player ── */}
      <Section
        id="guiding"
        label="Guiding the Player"
        claim="Letters do the wayfinding, so the HUD stays quiet."
      >
        <p className={cs.prose}>
          Quests arrive as mail. A banner tells you a letter is waiting, a small bubble flags when
          something is new, and a tooltip names what you are holding. I leaned on this notification
          system instead of a busy HUD, so the screen stays mostly world. When something is wrong, like
          a plant that has not been cut yet, the game says so in plain words instead of failing
          silently.
        </p>
        <figure className={cs.figure}>
          <img src={`${BASE}/bulletin-board.png`} alt="In-game cork bulletin board with customer letters and the grafting guide pinned up" className={cs.media} />
          <figcaption className={cs.caption}>
            The letters live on a cork board in the greenhouse, so reading your mail stays part of the world.
          </figcaption>
        </figure>
        <figure className={cs.figure}>
          <img src={`${BASE}/tooltip-notification.png`} alt="Notification system: a mail banner, an alert bubble, and an in-hand tooltip reading Scion: Pollinates Self" className={cs.media} style={{ maxWidth: 720 }} />
          <figcaption className={cs.caption}>
            The notification set: a mail banner, an alert bubble for something new, and an in-hand
            tooltip that names the trait you are carrying.
          </figcaption>
        </figure>
        <figure className={cs.figure}>
          <img src={`${BASE}/thankyou-letter.png`} alt="A customer's handwritten thank-you letter, signed Granny" className={cs.media} style={{ maxWidth: 620 }} />
          <figcaption className={cs.caption}>A note back from the customer once their plant arrives.</figcaption>
        </figure>
      </Section>

      {/* ── Constraints ── */}
      <Section id="constraints" label="Constraints" claim="A jam timeline forced honest calls.">
        <div className={cs.stack} style={{ marginTop: 0 }}>
          <div className={cs.block}>
            <p className={cs.blockTitle}>Art: not everything could be diegetic</p>
            <p className={cs.blockBody}>
              I wanted more of the UI to live in the world instead of floating on top of it. With the
              art time we had, we could not model every surface, so some screens stayed as overlays. I
              made those feel handmade, papery and hand-lettered, so they still read as part of the
              world rather than a separate layer.
            </p>
          </div>
          <div className={cs.block}>
            <p className={cs.blockTitle}>Engineering: fitting the placeholders</p>
            <p className={cs.blockBody}>
              Some designs had to fit placeholders the engineers built early to save time. The title
              screen is the clearest case: I simplified my layout to match the placeholder already in
              the scene rather than ask for a rebuild mid-jam.
            </p>
          </div>
        </div>
      </Section>

      {/* ── What's Next ── */}
      <Section id="next" label="What's Next" claim="Where I'd take it.">
        <div className={cs.stack} style={{ marginTop: 0 }}>
          {NEXT.map((n) => (
            <div key={n.title} className={cs.block}>
              <p className={cs.blockTitle}>{n.title}</p>
              <p className={cs.blockBody}>{n.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </CaseStudyLayout>
  )
}
