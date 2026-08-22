import CaseStudyLayout, { Section, Milestone } from '../../components/CaseStudyLayout/CaseStudyLayout'
import { asset } from '../../utils/asset'
import cs from './caseStudy.module.css'

const BASE = asset('tintura assets')
const LIVE_URL = 'https://tiffanytfmao.github.io/Tintura/'

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'idea',       label: 'The Idea' },
  { id: 'pipeline',   label: 'The Pipeline' },
  { id: 'decisions',  label: 'Design Decisions' },
  { id: 'craft',      label: 'Under the Hood' },
  { id: 'final',      label: 'Final Design' },
  { id: 'reflection', label: 'Reflection' },
]

const META = [
  { label: 'Year',     value: '2026' },
  { label: 'Role',     value: 'Solo · Design + Code' },
  { label: 'Event',    value: 'Config Makeathon' },
  { label: 'Timeline', value: '2 days · Jun 2026' },
]

const STATS = [
  { value: '2 days', body: 'Spec written June 15. First commit June 16. Live on GitHub Pages June 17.' },
  { value: '1 person', body: 'Product thinking, visual design, and code, with AI tools as a second pair of hands at every step.' },
  { value: '3 tools', body: 'Claude for the spec, Figma Make for the scaffold, Claude Code for the build that actually shipped.' },
]

const PIPELINE = [
  { title: 'Spec, written in conversation', body: 'Before opening any design tool, I worked the whole product out in a long Claude conversation: the film metaphor, every screen, the data model, the edge cases. By the end I had a spec I could hand to a machine. The thinking was the slow part, and it happened here.' },
  { title: 'Scaffold from Figma Make', body: 'I fed the spec into Figma Make and got a working skeleton: routes, screens, and a first pass at the visual direction. It was generous in the way generated code is generous. It also shipped 46 UI components the app would never use.' },
  { title: 'The real build, in Claude Code', body: 'The scaffold ran on mock data. In Claude Code I wired a real data layer, built the diary sorting and filter system, added the export card, and deleted everything the app did not need. This is where the prototype became a product.' },
  { title: 'Ship', body: 'Deployed to GitHub Pages the same day I decided to, with a router fix for the subpath and a hand-drawn SVG favicon of the film reel. Sixteen commits, first to last, across two days.' },
]

const DECISIONS = [
  {
    title: 'Made to feel like film',
    body: 'Photos land in a developing roll with twelve frames, blurred until you sit down to curate them. The limit is the point. A feed asks you to keep scrolling; a roll asks you to come back and finish what you started.',
    img: `${BASE}/roll.png`,
    alt: 'The Roll screen: three blurred photos developing in a twelve-frame grid',
  },
  {
    title: 'Colors picked by hand',
    body: 'The app can extract a palette automatically, but the default is a magnifying loupe you drag across the photo yourself. Deciding which five colors a memory keeps is the product. Automation is there for speed; the taste is yours.',
    img: `${BASE}/curation.png`,
    alt: 'The Curation screen: a photo beside four picked swatches and a develop button',
  },
  {
    title: 'Memories you can blend',
    body: 'Any two entries can be merged into a new palette. The blend is computed in a perceptual color space, so the two moments merge into one clean shared mood.',
    img: `${BASE}/blend.png`,
    alt: 'The Blend screen: two chosen memories above a five-swatch blend result',
  },
]

const CRAFT = [
  { title: 'Color extraction in the browser', body: 'The auto-pick runs k-means clustering over the photo canvas, sampling pixels and seeding with k-means++, and returns up to five dominant colors with no server involved.' },
  { title: 'Perceptual blending', body: 'Blends convert hex to CIELAB, keep candidate colors at least a deltaE of 25 apart so no two swatches read as the same color, and sort the result by luminance.' },
  { title: 'No backend at all', body: 'The diary and the roll live in localStorage with seeded example entries and an upgrade path for old data. For a two-day prototype, a database would have been procrastination.' },
  { title: 'Analog texture', body: 'A fractal-noise grain overlay sits behind every screen, and photos get a thin inset border, so entries read as physical prints.' },
]

const FINAL_SCREENS = [
  { img: `${BASE}/entry.png`, alt: 'An entry: photo with a vertical color strip, palette, and export actions', title: 'The entry', body: 'Each memory keeps its photo, a vertical strip of its colors, and a name split into an anchor and an observation. From here it can be exported as a card, blended, or let go.' },
  { img: `${BASE}/capture.png`, alt: 'The Capture screen: take a photo or upload from camera roll', title: 'Capture', body: 'Deliberately plain. Take or upload a photo, write one line about what stopped you, and let it develop. The considered work happens later, at curation.' },
]

const REFLECTIONS = [
  { title: 'The spec was the speed.', body: 'Two days sounds like the interesting number, but the build was only fast because every open question had already been answered in writing. AI tools multiply whatever clarity you bring them. Bring none and they multiply that too.' },
  { title: 'Generated code is a draft.', body: 'The scaffold arrived with 46 components the app never used, and pruning them was as much of the work as adding features. Working this way, taste shows up less in what you make and more in what you refuse to keep.' },
]

export default function Tintura() {
  return (
    <CaseStudyLayout
      id="tintura"
      title="A diary that remembers moments by their colors, from written spec to a public URL in two days"
      breadcrumbLabel="Tintura"
      meta={META}
      heroMedia={{ src: `${BASE}/diary.png`, alt: 'The Tintura diary — a grid of color memories' }}
      sections={SECTIONS}
    >
      {/* ── Overview ── */}
      <Section
        id="overview"
        label="Overview"
        claim="Keeping memories by color — capture is careless, curation is the point."
      >
        <p className={cs.prose}>
          Tintura is a small web app for keeping memories by color. Photos wait in a developing roll
          like undeveloped film. You pull a handful of colors out of each one, name the moment, and
          it joins a diary you can sort by time, color, or place. I built it solo for Figma's Config
          Makeathon in June 2026, and it went from a written spec to a public URL in two days.{' '}
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className={cs.proseLink}>
            Try the live prototype
          </a>
          .
        </p>

        <div className={cs.cols3}>
          {STATS.map((s) => (
            <div key={s.value} className={cs.block}>
              <p className={cs.statValue}>{s.value}</p>
              <p className={cs.statLabel}>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── The Idea ── */}
      <Section
        id="idea"
        label="The Idea"
        claim="My phone is full of thousands of photos saved for 'future color reference' — and they all get lost in the void of the camera roll."
      >
        <p className={cs.prose}>
          The morning the coffee had three colors and none of them were brown. The evening the sea
          kept changing its mind about which blue it wanted to be. Tintura treats those as the memory
          itself: capture is quick and careless, and the real act is sitting down later to decide
          which five colors a moment gets to keep.
        </p>
        <p className={cs.prose}>
          The metaphor is analog film. Photos develop in a roll before they earn a place in the
          diary, and the visual language follows: warm paper background, serif entries, film grain
          over everything, photos with the thin white border of a print.
        </p>
      </Section>

      {/* ── The Pipeline ── */}
      <Section
        id="pipeline"
        label="The Pipeline"
        claim="The two days were the cheap part. Here is where they came from."
      >
        <p className={cs.prose}>
          Nothing in Tintura's interface is AI. The AI is in how it was made: each tool did the work
          it is fastest at, and I stayed in the loop for every decision that touches taste.
        </p>
        <div className={cs.stack}>
          {PIPELINE.map((p) => (
            <div key={p.title} className={cs.block}>
              <p className={cs.blockTitle}>{p.title}</p>
              <p className={cs.blockBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Milestone>The Build · Design + code</Milestone>

      {/* ── Design Decisions ── */}
      <Section id="decisions" label="Design Decisions" claim="Fast did not get to mean careless.">
        <div className={cs.stack} style={{ marginTop: 0 }}>
          {DECISIONS.map((d) => (
            <div key={d.title} className={cs.block}>
              <figure className={cs.figure}>
                <img src={d.img} alt={d.alt} className={cs.media} />
              </figure>
              <p className={cs.blockTitle} style={{ marginTop: 14 }}>{d.title}</p>
              <p className={cs.blockBody}>{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Under the Hood ── */}
      <Section
        id="craft"
        label="Under the Hood"
        claim="The color work is real math, running entirely in the browser."
      >
        <div className={cs.cols2} style={{ marginTop: 0 }}>
          {CRAFT.map((c) => (
            <div key={c.title} className={cs.block}>
              <p className={cs.blockTitle}>{c.title}</p>
              <p className={cs.blockBody}>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Final Design ── */}
      <Section
        id="final"
        label="Final Design"
        claim="Six screens, one loop: capture, develop, curate, keep."
      >
        <div className={cs.cols2} style={{ marginTop: 0 }}>
          {FINAL_SCREENS.map((s) => (
            <div key={s.title} className={cs.block}>
              <figure className={cs.figure}>
                <img src={s.img} alt={s.alt} className={cs.media} />
              </figure>
              <p className={cs.blockTitle}>{s.title}</p>
              <p className={cs.blockBody}>{s.body}</p>
            </div>
          ))}
        </div>
        <p className={cs.prose}>
          The full loop is live and free to wander through at{' '}
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className={cs.proseLink}>
            tiffanytfmao.github.io/Tintura
          </a>
          . It seeds itself with two example memories, so there is something to blend on arrival.
        </p>
      </Section>

      {/* ── Reflection ── */}
      <Section id="reflection" label="Reflection" claim="What building this way taught me.">
        <div className={cs.stack} style={{ marginTop: 0 }}>
          {REFLECTIONS.map((r) => (
            <div key={r.title} className={cs.block}>
              <p className={cs.blockTitle}>{r.title}</p>
              <p className={cs.blockBody}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </CaseStudyLayout>
  )
}
