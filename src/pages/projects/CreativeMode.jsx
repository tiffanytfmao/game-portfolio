import CaseStudyLayout, { Section, Milestone } from '../../components/CaseStudyLayout/CaseStudyLayout'
import { asset } from '../../utils/asset'
import cs from './caseStudy.module.css'

const BASE = asset('creativemode assets')

const SECTIONS = [
  { id: 'overview',     label: 'Overview' },
  { id: 'brief',        label: 'The Brief' },
  { id: 'painpoints',   label: 'Pain Points' },
  { id: 'users',        label: 'The Users' },
  { id: 'research',     label: 'Research' },
  { id: 'challenge',    label: 'The Challenge' },
  { id: 'explorations', label: 'Explorations' },
  { id: 'decisions',    label: 'Design Decisions' },
  { id: 'final',        label: 'Final Design' },
  { id: 'reflection',   label: 'Reflection' },
]

const META = [
  { label: 'Year',    value: '2025' },
  { label: 'Role',    value: 'Product Designer (end-to-end)' },
  { label: 'Company', value: 'YC-backed startup · Consumer AI' },
  { label: 'Scope',   value: 'Explore & discovery page' },
]

const ROLE = [
  { title: 'What I owned', body: 'Heuristic audit of the live Explore page. User and competitor research. Wireframes through high-fidelity design.' },
  { title: 'The brief', body: 'Surface the best creations. Unify mods, modpacks, and skins. Make discovery feel effortless.' },
  { title: 'Constraints', body: 'Existing brand and dark UI system. Three content types, one page. A mix of logged-in and SEO traffic.' },
]

const REQUIREMENTS = [
  { title: 'Surface the best content prominently', body: 'The strongest creations should be the first thing people see on the page.' },
  { title: 'Balance density without overwhelming', body: 'Show a lot without the page turning into a wall of noise.' },
  { title: 'Unify mods, modpacks & skins', body: 'One coherent browsing experience across three very different content types.' },
  { title: 'Make jumping in easy', body: 'Quick discovery, and a short path from spotting something to installing or remixing it.' },
]

const PAINPOINTS = [
  { title: 'One card layout for three different things', body: 'Mods, modpacks, and skins were forced into the same card, even though people browse them with completely different intent and levels of commitment.', note: 'Uniform cards → mismatched intent' },
  { title: 'Quality had nowhere to rise', body: 'There was no editorial curation, and social proof like downloads and remixes sat low in the card hierarchy, so the best creations never stood out from the rest.', note: 'No curation → best work buried' },
  { title: 'The chrome crowded out the content', body: 'A persistent, non-closeable "get started" block and a low-priority search field ate the top of the page. Explicit sort and filter controls only appeared at smaller widths.', note: 'Chrome → crowds out content' },
  { title: 'Browsing rarely became doing', body: 'Nothing bridged the gap between scanning a card and actually installing or remixing it. Discovery and engagement felt like two separate steps.', note: 'Browse → engage drop-off' },
]

const PERSONAS = [
  { name: 'The Tinkerer', body: 'Comes in with a specific thing to add and wants to execute fast. Gets frustrated by anything that slows them down.', stake: 'Judges the product entirely on whether they got what they came for.' },
  { name: 'The Dabbler', body: "Curious but uncommitted. Wants to see what's possible before investing effort, and bounces the moment something feels confusing.", stake: 'The explore page lives or dies on this person.' },
  { name: 'The Collector', body: 'Browses constantly, downloads a lot, creates rarely. Cares about discovery quality, filtering, and curation above all.', stake: 'Largely the SEO audience arriving from Google.' },
  { name: 'The Evangelist', body: 'Makes mods to share with their friends or community. Success means other people playing their creation.', stake: 'Cares about share flow and social proof, the source of organic growth.' },
  { name: 'The Reluctant Parent', body: "Doesn't play themselves. They're helping a kid get set up, patience low and technical tolerance near zero.", stake: "If it doesn't work in 5 minutes, they're gone, and they take the kid with them." },
]

const TAKEAWAYS = [
  { src: 'A streamlined mod marketplace', body: 'Compact cards with thumbnail, name, short description, download count, and category tags, plus a sidebar filter system that stays easily scannable.' },
  { src: 'An established mod platform', body: 'A category-first architecture and hero spotlights that promote one big creation well, but do less to encourage broader community browsing.' },
  { src: 'Across the board', body: 'Social proof (downloads, plays, remixes) is the shared quality signal, and human-picked curation builds trust that a raw feed never earns.' },
]

const DIRECTIONS = [
  { tag: 'Direction A', title: 'Metric-first', body: 'Social proof shown first: downloads and remixes are the first thing you read after the thumbnail, with full-width CTAs at the bottom.' },
  { tag: 'Direction B', title: 'Compact high-density', body: 'Smaller cards, more per row, icon-only CTAs that label on hover, for a feeling of abundance across the page.' },
  { tag: 'Direction C', title: 'Horizontal list row', body: 'Landscape cards that fit more detail without growing taller. Better for scanning specifics, at the cost of fewer cards on screen at once.' },
  { tag: 'Direction D', title: 'CTA-first', body: 'Download as the clear primary action; Remix as a secondary pill, each carrying its own social proof.' },
]

const DECISIONS = [
  { title: 'Separate browse intent from filter intent', body: 'I split the page into intent-led sections: Trending This Week, Staff Picks, Community Favorites. People land in a curated lane, and filtering becomes something they reach for when they want it.' },
  { title: 'Give quality somewhere to rise', body: 'Editorial curation (Staff Picks) sits alongside community signals (Community Favorites, download and remix counts) so the best work surfaces first. Remix counts reward the behavior the platform grows on, which is someone playing what another person made and putting a twist on it.' },
  { title: 'A category-first "Browse By Type"', body: "Mods, Modpacks, and Skins each get their own thumbnail-rich entry point, matching the fact that a skin-browser and a modpack-researcher show up with different goals. One chip filter couldn't hold both." },
  { title: 'Make the card the moment of engagement', body: 'Every card carries a thumbnail, version, author, downloads, remixes, and a clear Download + Remix pair. The jump from browsing to installing or remixing happens in place, so discovery and doing stop being two separate steps.' },
]

const FINAL_SCREENS = [
  { label: 'Prompt-forward hero', desc: '"Create Minecraft mods without coding" with the craft box right there. Creating sits one field away from browsing.' },
  { label: 'Trending This Week', desc: 'A curated carousel of what is hot right now, up top where attention lands.' },
  { label: 'Staff Picks for This Month', desc: 'Human-picked editorial curation that reads as chosen by a person.' },
  { label: 'Browse By Type', desc: 'Mods / Modpacks / Skins as distinct, thumbnail-rich lanes for different mindsets.' },
  { label: 'Community Favorites', desc: 'A social-proof-led row surfacing what the community actually rewards.' },
]

const KPIS = [
  { metric: 'Time to first click', why: 'How fast a user engages with a card after landing. Does the top of the page earn attention?' },
  { metric: 'Scroll depth', why: 'Are people reaching Staff Picks and Community Favorites, or leaving in section one?' },
  { metric: 'Click-through to creations', why: 'From explore into an individual mod page, the core browse-to-consider step.' },
  { metric: 'Downloads / installs from explore', why: 'The browse-to-engage payoff, and the behavior this redesign is built to unlock.' },
  { metric: 'Session length vs. before', why: 'Depth of exploration compared to the old page. Did discovery get more rewarding?' },
  { metric: 'Time on page: SEO vs. direct', why: 'The Collector arriving from Google behaves differently from a logged-in browser.' },
]

const NEXT_STEPS = [
  { title: 'A personalization layer', body: '"Because you remixed X" or "New from creators you\'ve played" as a fourth section for logged-in users.' },
  { title: 'Remix attribution', body: 'When a remix is published, visibly link it back to the source mod, closing the credit loop that fuels the Evangelist.' },
  { title: 'A/B test curation', body: 'Trial different section orders and curation approaches against time-to-first-click and scroll depth.' },
  { title: 'Carry it to mobile', body: 'Bring the intent-led sections into a collapsed, thumb-friendly layout.' },
]

export default function CreativeMode() {
  return (
    <CaseStudyLayout
      id="creativemode"
      title="Redesigning discovery for a platform where anyone can turn a sentence into a Minecraft mod"
      breadcrumbLabel="YC Redesign"
      meta={META}
      heroMedia={{ src: `${BASE}/thumb.png`, alt: 'The redesigned Explore page' }}
      sections={SECTIONS}
    >
      {/* ── Overview ── */}
      <Section
        id="overview"
        label="Overview"
        claim="The front door to thousands of community creations was failing at its one job: people couldn't find the good stuff."
      >
        <p className={cs.prose}>
          The company builds a tool that turns a text prompt into a working Minecraft mod, no code
          required. People were making thousands of mods, modpacks, and skins, but the Explore page
          hadn't kept up. It's the front door to all that community work, and it was failing at its
          one job. People couldn't find the good stuff.
        </p>
        <p className={cs.note}>
          This started as a take-home from the company's brief, which I took from research through
          high-fidelity design. Everything shown here is a redesign proposal I made for the exercise.
        </p>

        <div className={cs.cols3}>
          {ROLE.map((r) => (
            <div key={r.title} className={cs.block}>
              <p className={cs.blockTitle}>{r.title}</p>
              <p className={cs.blockBody}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── The Brief ── */}
      <Section
        id="brief"
        label="The Brief"
        claim="Showcase the best user creations, with browsing that works across every content type."
      >
        <p className={cs.prose}>
          The company handed me a one-line challenge. Redesign the Explore page to surface the best
          creations, unify browsing across mods, modpacks, and skins, and shorten the jump from
          spotting a creation to installing it. Four requirements came with it.
        </p>
        <div className={cs.cols2}>
          {REQUIREMENTS.map((r) => (
            <div key={r.title} className={cs.block}>
              <p className={cs.blockTitle}>{r.title}</p>
              <p className={cs.blockBody}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Pain Points ── */}
      <Section
        id="painpoints"
        label="Pain Points"
        claim="I audited the live page. Four structural problems kept the best work from ever getting seen."
      >
        <p className={cs.prose}>
          A heuristic pass on the live page turned up four structural problems, in how content types,
          curation, and page chrome were handled. A visual refresh wouldn't have touched them.
        </p>
        <div className={cs.stack}>
          {PAINPOINTS.map((p) => (
            <div key={p.title} className={cs.block}>
              <p className={cs.blockTitle}>{p.title}</p>
              <p className={cs.blockBody}>{p.body}</p>
              <p className={cs.note}>{p.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── The Users ── */}
      <Section
        id="users"
        label="The Users"
        claim="Explore had five audiences, each showing up with a different goal."
      >
        <div className={cs.block} style={{ marginBottom: 26 }}>
          <p className={cs.label}>Key insight</p>
          <p className={cs.blockBody}>
            Someone browsing skins is in a completely different mindset than someone hunting for a
            modpack. Skins are fast, visual, low-stakes. Modpacks are slower, research-oriented,
            high-commitment. One uniform grid can't serve both.
          </p>
        </div>
        <div className={cs.cols2}>
          {PERSONAS.map((p) => (
            <div key={p.name} className={cs.block}>
              <p className={cs.blockTitle}>{p.name}</p>
              <p className={cs.blockBody}>{p.body}</p>
              <p className={cs.note}>{p.stake}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Research ── */}
      <Section
        id="research"
        label="Research"
        claim="I studied how the best modding communities make discovery feel good."
      >
        <p className={cs.prose}>
          I pulled apart the major mod marketplaces and a handful of in-game storefronts to see what
          earns trust and keeps people browsing, then annotated what to borrow and what to avoid.
        </p>
        <figure className={cs.figure}>
          <img
            src={`${BASE}/moodboard.png`}
            alt="Competitor moodboard of mod marketplaces and in-game storefronts, annotated"
            className={cs.media}
          />
          <figcaption className={cs.caption}>Moodboard and competitor analysis, annotated in FigJam</figcaption>
        </figure>
        <div className={cs.cols3}>
          {TAKEAWAYS.map((t) => (
            <div key={t.src} className={cs.block}>
              <p className={cs.blockTitle}>{t.src}</p>
              <p className={cs.blockBody}>{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── The Challenge ── */}
      <Section
        id="challenge"
        label="The Challenge"
        question="How might we surface the best creations and make them discoverable, without burying anyone in options?"
      >
        <div className={cs.stack} style={{ marginTop: 0 }}>
          <p className={cs.blockBody}>
            HMW separate browsing intent from filtering intent, so people land somewhere curated
            instead of a wall of results?
          </p>
          <p className={cs.blockBody}>
            HMW give the community's best work (measured by downloads, remixes, and staff picks) a
            place to rise to the top?
          </p>
          <p className={cs.blockBody}>
            HMW shorten the distance between spotting a creation and actually installing or remixing
            it?
          </p>
        </div>
      </Section>

      {/* ── Explorations ── */}
      <Section
        id="explorations"
        label="Explorations"
        claim="Wireframing the structure, then pressure-testing the card."
      >
        <p className={cs.prose}>
          I started low-fidelity to settle the page skeleton: where curation lives, how sections
          stack, and how filtering steps out of the way until it's wanted.
        </p>
        <figure className={cs.figure}>
          <img src={`${BASE}/wireframes.png`} alt="Low-fidelity wireframes of the Explore page layout" className={cs.media} />
        </figure>
        <p className={cs.prose}>
          The card is where browsing turns into doing, so I explored four directions for how much to
          show and which action to lead with.
        </p>
        <div className={cs.cols2}>
          {DIRECTIONS.map((d) => (
            <div key={d.title} className={cs.block}>
              <p className={cs.label}>{d.tag}</p>
              <p className={cs.blockTitle}>{d.title}</p>
              <p className={cs.blockBody}>{d.body}</p>
            </div>
          ))}
        </div>

        <div className={cs.block}>
          <p className={cs.label}>Where it landed</p>
          <p className={cs.blockBody}>
            The final card took the CTA-first hierarchy of Direction D — Download as the primary
            action, Remix as a secondary pill — and kept the visible download and remix counts from
            the metric-first direction, so the social proof and the action to take on it live on one
            compact card. The high-density and horizontal-row explorations were set aside: the page
            already creates a sense of abundance through its intent-led sections, so the card itself
            could afford to be clearer rather than smaller.
          </p>
        </div>
      </Section>

      <Milestone>The Final Design · Intent-led Explore</Milestone>

      {/* ── Design Decisions ── */}
      <Section id="decisions" label="Design Decisions" claim="Four decisions shaped the final page.">
        <div className={cs.stack} style={{ marginTop: 0 }}>
          {DECISIONS.map((d) => (
            <div key={d.title} className={cs.block}>
              <p className={cs.blockTitle}>{d.title}</p>
              <p className={cs.blockBody}>{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Final Design ── */}
      <Section id="final" label="Final Design" claim="An intent-led Explore page.">
        <figure className={cs.figure}>
          {/* aspect-ratio crops ~12% off the bottom so the page footer/wordmark stays out */}
          <img
            src={`${BASE}/explore-desktop.png`}
            alt="Final Explore page — desktop"
            className={cs.media}
            style={{ aspectRatio: '1355 / 2840', objectFit: 'cover', objectPosition: 'top' }}
          />
        </figure>
        <div className={cs.stack}>
          {FINAL_SCREENS.map((s) => (
            <div key={s.label} className={cs.block}>
              <p className={cs.blockTitle}>{s.label}</p>
              <p className={cs.blockBody}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Reflection ── */}
      <Section
        id="reflection"
        label="Reflection"
        claim="How I'd know it worked, and where I'd take it next."
      >
        <p className={cs.prose}>
          The redesign only works if people reach the good stuff faster and scroll deeper into it.
          I'd track a handful of signals for that.
        </p>
        <div className={cs.cols2}>
          {KPIS.map((k) => (
            <div key={k.metric} className={cs.block}>
              <p className={cs.blockTitle}>{k.metric}</p>
              <p className={cs.blockBody}>{k.why}</p>
            </div>
          ))}
        </div>

        <p className={cs.label} style={{ marginTop: 8 }}>Where it goes next</p>
        <div className={cs.cols2}>
          {NEXT_STEPS.map((n) => (
            <div key={n.title} className={cs.block}>
              <p className={cs.blockTitle}>{n.title}</p>
              <p className={cs.blockBody}>{n.body}</p>
            </div>
          ))}
        </div>

        <p className={cs.label} style={{ marginTop: 8 }}>What I took away</p>
        <p className={cs.prose}>
          The old page showed every creation at the same volume. Treating browsing and filtering as
          two different jobs was the decision everything else hung off: once staff picks, community
          favorites, and remix counts had somewhere to sit, the strongest work became the first thing
          people see instead of something you had to dig for.
        </p>
        <p className={cs.prose}>
          The harder lesson was that curation is a product surface, not a nice-to-have. Every ranking
          choice is an editorial position about what the community should see, and it needs an owner
          and a review cadence, not a one-time launch.
        </p>
      </Section>
    </CaseStudyLayout>
  )
}
