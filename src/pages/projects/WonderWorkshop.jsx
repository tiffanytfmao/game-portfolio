import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CatSprite from '../../components/CatSprite/CatSprite'
import NextCaseStudy from '../../components/NextCaseStudy/NextCaseStudy'
import { asset } from '../../utils/asset'
import { scrollToId } from '../../utils/scroll'
import styles from './WonderWorkshop.module.css'

const BASE = asset('wonder workshop assets')

const SECTIONS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'problem',     label: 'The Problem' },
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'pivot',       label: 'The Pivot' },
  { id: 'game',        label: 'The Game' },
  { id: 'access',      label: 'Accessibility' },
  { id: 'decisions',   label: 'Design Decisions' },
  { id: 'try-it',      label: 'Try It' },
  { id: 'research',    label: 'User Testing' },
  { id: 'next-steps',  label: "What's Next" },
  { id: 'reflection',  label: 'Reflection' },
]

const TAGS = ['Game Design', 'Education', 'Children 9–12', 'UX/UI', 'Research']

const INSPIRATION = [
  {
    id: 'pokemon',
    name: 'Pokémon TCG Pocket',
    category: 'Battle Card',
    gif: `${BASE}/pokemon-pokemon-tcg-pocket.gif`,
    desc: 'Physical attachment to characters makes abstract mechanics feel personal. Also where the tension between collecting and creating first became visible.',
  },
  {
    id: 'kabuto',
    name: 'Kabuto Park',
    category: 'Battle Game',
    gif: `${BASE}/kabuto%20park.gif`,
    desc: 'Proof that handcraft and card-battle can share a loop — and a clearer look at where that loop starts to prioritize the battle over the making.',
  },
  {
    id: 'animalcrossing',
    name: 'Animal Crossing',
    category: 'Cozy World',
    gif: `${BASE}/animal%20crossing.gif`,
    desc: 'The pacing and tone reference. Nobody rushes you. The world rewards returning to it, not grinding through it.',
  },
  {
    id: 'kiln',
    name: 'Kiln',
    category: 'Creativity Game',
    gif: `${BASE}/kiln.gif`,
    desc: 'A game where the output of your creativity has consequence inside the game world. Validated that making-as-mechanic is playable, not just pedagogical.',
  },
  {
    id: 'deyoungsters',
    name: 'DeYoungsters Studio',
    category: 'Physical Activity',
    gif: `${BASE}/deyoungsters_gif.gif`,
    desc: 'An in-museum program where kids make things in a structured but open-ended context. The characters-as-guides model came from watching how facilitators work here.',
  },
  {
    id: 'sbma',
    name: 'SBMA Piece by Piece',
    category: 'Physical Activity',
    gif: `${BASE}/SBMA%20Piece%20by%20Piece.webp`,
    desc: 'Collage workshops that give children a brief and the freedom to interpret it. That structure is the model for every craft assignment in the game.',
  },
]

const QUOTES = [
  {
    text: '"I like that you can pick your task. In other games you just get a list of jobs you have to do."',
    insight: 'Task choice resonated immediately. Kids named it specifically as something different from what they expected.',
  },
  {
    text: '"I wish I could move around and go to different places within the workshop."',
    insight: 'The desire to explore beyond one room came up consistently. More world, more characters, more areas.',
  },
  {
    text: '"I imagine playing this at home and with friends... doing the crafts together."',
    insight: 'Single-player, but kids immediately imagined doing the physical crafts together while each playing on their own device.',
  },
]

const NEXT_STEPS = [
  { icon: '🏘', title: 'Bigger world', desc: 'More areas of the workshop, a larger town, more character types.' },
  { icon: '⚗️', title: 'New learning categories', desc: 'Science projects and engineering builds beyond basic crafting.' },
  { icon: '📷', title: 'Computer vision', desc: 'Evaluate completed physical crafts through photos, with safety filtering.' },
  { icon: '🤝', title: 'Safe sharing', desc: 'Let kids show finished work to friends or classrooms.' },
  { icon: '🔊', title: 'Character voice-over', desc: 'Every task and line of dialogue read aloud, so a kid who is still building reading fluency is not locked out of the story the tasks live in.' },
  { icon: '📝', title: 'Transcripts for everything', desc: 'A text version of every spoken line and step-by-step build, readable at your own pace and usable without audio.' },
]

/* Accessibility decisions that were made during the build, kept to what the
   team actually did. Voice-over and transcripts are in NEXT_STEPS above,
   because they are the honest gap rather than a shipped feature. */
const ACCESS_NOTES = [
  {
    title: 'Type sized for a nine-year-old, not a designer',
    body: 'Body copy sits at 16px minimum and dialogue runs larger, in a rounded sans with open counters and unambiguous letterforms. Nothing important is set below 14px, and no line of instruction runs past roughly 60 characters.',
  },
  {
    title: 'Every colour pair meets a contrast minimum',
    body: 'The workshop palette is warm and low-saturation, which is exactly where contrast quietly fails. Text and its background were checked to at least 4.5:1, and interface controls to 3:1, with the hand-painted backgrounds darkened behind any text that sits on them.',
  },
  {
    title: 'Colour is never the only signal',
    body: 'Task states, categories, and character cues carry a shape or a label alongside the colour, so nothing depends on telling two warm tones apart.',
  },
  {
    title: 'No timers, no failure states',
    body: 'Originally a tone decision — the world should not rush you. It doubles as an accommodation: nothing expires, nothing punishes a slow read, and a task can be left and returned to.',
  },
]

export default function WonderWorkshop() {
  const [activeSection, setActiveSection] = useState('overview')
  const [catY, setCatY] = useState(0)
  const sectionRefs = useRef({})
  const navItemRefs = useRef({})
  const navRef = useRef(null)

  // Track active section via IntersectionObserver
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

  // Move cat to active nav item
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
    // Lenis owns the scroll position while it is mounted, which makes a raw
    // window.scrollTo a no-op — the sidebar and the skip button were not
    // moving the page at all. utils/scroll.js is the single scroller.
    scrollToId(id, { offset: -80 })
    // Focus follows the scroll. Without this a keyboard user activates a
    // sidebar link and their focus is still in the sidebar, so the next Tab
    // takes them to the following nav item rather than into the section.
    el.focus({ preventScroll: true })
  }, [])

  return (
    <div className={styles.page}>
      {/* Back */}
      <Link to="/" className={styles.backBtn}>
        <span className={styles.backDiamond} aria-hidden="true">◆</span> Back
      </Link>

      {/* Hero */}
      <div className={styles.hero}>
        <img
          src={`${BASE}/Hero-animation-WITH%20TITLE.gif`}
          alt="Wonder Workshop title card: the hand-painted workshop interior with its craft-material characters moving around it."
          className={styles.heroGif}
        />
        <div className={styles.heroFooter}>
          <div className={styles.tags}>
            {TAGS.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>
          <button
            className={styles.skipBtn}
            onClick={() => scrollToSection('decisions')}
          >
            Skip to solution ◆
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>

        {/* ── Sidebar ── */}
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
                aria-current={activeSection === id ? 'true' : undefined}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Content ── */}
        <article className={styles.content}>

          {/* Overview */}
          <section id="overview" ref={el => { sectionRefs.current['overview'] = el }} tabIndex={-1} className={styles.section}>
            <span className={styles.sectionLabel}>Overview</span>
            <h1 className={styles.projectTitle}>Wonder Workshop</h1>
            <p className={styles.tagline}>A crafting game that asks what digital spaces could look like if they were built around making.</p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}><span className={styles.metaKey}>Year</span><span className={styles.metaVal}>2026</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Team</span><span className={styles.metaVal}>4 people</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Class</span><span className={styles.metaVal}>DESINV211 · UC Berkeley</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Platform</span><span className={styles.metaVal}>Browser · Mobile</span></div>
            </div>

            <p className={styles.prose}>
              Wonder Workshop is a browser-based crafting game for children aged 9 to 12, set inside a hand-built workshop world where kids complete real physical craft tasks alongside material-based creature characters. The challenge was designing a digital experience that <strong>actively supports creativity</strong> rather than rewarding consumption.
            </p>

            <div className={styles.roleBlock}>
              <div className={styles.roleCols}>
                <div>
                  <h2 className={styles.sectionLabel}>My Role</h2>
                  <ul className={styles.roleList}>
                    <li>Ideation &amp; concept direction</li>
                    <li>Pitched original critter mechanic</li>
                    <li>Advocated for the pivot</li>
                    <li>All hand-painted background assets</li>
                    <li>Character design</li>
                    <li>Full UI — buttons, icons, interface</li>
                  </ul>
                </div>
                <div>
                  <h2 className={styles.sectionLabel}>Team</h2>
                  <ul className={styles.roleList}>
                    <li>Ajia Grant</li>
                    <li>Olivia Martinoli Issler</li>
                    <li>Isabella Fiorante</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* The Problem */}
          <section id="problem" ref={el => { sectionRefs.current['problem'] = el }} tabIndex={-1} className={`${styles.section} ${styles.sectionRelative}`}>
            <img src={`${BASE}/happyhugh.gif`} alt="" className={styles.charFloatRight} />
            <h2 className={styles.sectionLabel}>The Problem</h2>

            <p className={styles.prose}>
              Children 9 to 12 are growing up in digital environments optimized for personalization and continuous engagement. These platforms <strong>actively shape behaviour, habits, and identity</strong> during exactly the window when those things are most malleable. Reward-seeking consistently develops before critical thinking, so children interact with algorithmic systems without understanding how the content they see is selected or why.
            </p>

            <blockquote className={styles.hmw}>
              How might we create a healthy digital space that encourages creativity and critical thinking?
            </blockquote>

            <div className={styles.contextGrid}>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Audience</span>
                <p className={styles.contextText}>Children 9 to 12. Early digital natives capable of guided learning, reflection, and growing creative independence.</p>
              </div>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Where it lives</span>
                <p className={styles.contextText}>Home devices. School. Social play. Designed to fit where kids already are.</p>
              </div>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Why this age</span>
                <p className={styles.contextText}>Media habits are forming while creativity is still highly flexible. An important window before patterns solidify.</p>
              </div>
            </div>
          </section>

          {/* Inspiration */}
          <section id="inspiration" ref={el => { sectionRefs.current['inspiration'] = el }} tabIndex={-1} className={styles.section}>
            <h2 className={styles.sectionLabel}>Inspiration</h2>
            <p className={styles.prose}>These are the things we actually looked at, and what they changed.</p>

            <div className={styles.inspoGrid}>
              {INSPIRATION.map(item => (
                <div key={item.id} className={styles.inspoCard}>
                  <div className={styles.inspoMedia}>
                    {item.gif
                      ? <img src={item.gif} alt={item.name} className={styles.inspoImg} />
                      : <div className={styles.inspoColor} style={{ background: item.color }} />
                    }
                    <div className={styles.inspoOverlay}>
                      <span className={styles.inspoCategory}>{item.category}</span>
                      <p className={styles.inspoDesc}>{item.desc}</p>
                    </div>
                  </div>
                  <p className={styles.inspoName}>{item.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* The Pivot */}
          <section id="pivot" ref={el => { sectionRefs.current['pivot'] = el }} tabIndex={-1} className={`${styles.section} ${styles.sectionRelative}`}>
            <img src={`${BASE}/Mentordog.gif`} alt="" className={`${styles.charFloatRight} ${styles.charFloatRightLow}`} />
            <h2 className={styles.sectionLabel}>The Pivot</h2>

            <div className={styles.pivotVisual}>
              <figure className={styles.pivotFig}>
                <img src={`${BASE}/skrawl%20screns.png`} alt="Skrawl midterm prototype screens" className={styles.pivotImg} />
                <figcaption className={styles.pivotCaption}>Midterm: critter battle system</figcaption>
              </figure>
              <span className={styles.pivotArrow} aria-hidden="true">→</span>
              <figure className={styles.pivotFig}>
                <img src={`${BASE}/gameplay%201.jpeg`} alt="Wonder Workshop final game" className={styles.pivotImg} />
                <figcaption className={styles.pivotCaption}>Final: Wonder Workshop</figcaption>
              </figure>
            </div>

            <h3 className={styles.pivotSubhead}>The initial concept</h3>
            <p className={styles.prose}>
              Our original pitch was a Pokédex-style battle card game. Kids craft physical creatures, an app scans them, and stats are assigned based on how they were made — how many colors used, whether there are 3D elements, unusual materials, natural objects. The creatures battle a grey algorithmic antagonist representing soulless digital emptiness. Five stats, turn structures, threat cards. The mechanic was coherent and the concept worked.
            </p>

            <h3 className={styles.pivotSubhead}>The question that changed everything</h3>
            <p className={styles.prose}>
              After sharing our concept with experts at Common Sense Media, we started asking whether the battle mechanics were serving our goals or just being the most compelling part of the system. Their challenge was direct: reward loops built around collecting and leveling stats make the stats the point, not the making. <strong>We had designed a game where you craft to win.</strong> That is a different thing from a game where crafting is worth doing on its own terms.
            </p>

            <p className={styles.prose}>
              We removed the competitive systems and rebuilt around a simpler question: <strong>what does an experience look like when making is genuinely the center?</strong> The result was Wonder Workshop. Slower, narrative-driven, structured around characters and story rather than scores.
            </p>

            <div className={styles.videoCard}>
              <video
                src={`${BASE}/skrawl%20prototype.mp4`}
                controls
                muted
                playsInline
                preload="metadata"
                className={styles.prototypeVideo}
                aria-label="Screen recording of the Skrawl midterm prototype"
              />
              <p className={styles.videoCaption}>
                Early prototype — the midterm direction.{' '}
                <span className={styles.videoDesc}>
                  Silent screen recording: a crafted creature is scanned, assigned
                  five stats, and played against a grey opponent in a turn-based
                  card battle.
                </span>
              </p>
            </div>
          </section>

          {/* The Game */}
          <section id="game" ref={el => { sectionRefs.current['game'] = el }} tabIndex={-1} className={styles.section}>
            <h2 className={styles.sectionLabel}>The Game</h2>

            <p className={styles.prose}>
              Wonder Workshop is a single-player crafting game for kids 9 to 12, set in a cozy workshop world. Characters made of craft materials give you small making tasks. You build the real thing with your own hands and materials, then keep it in a scrapbook. There is no rush and no way to lose.
            </p>

            <div className={styles.contextGrid}>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Pick your task</span>
                <p className={styles.contextText}>You choose what to make next, rather than working down a fixed list of chores.</p>
              </div>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Make it for real</span>
                <p className={styles.contextText}>Each task is a physical craft you build offline with real materials, guided step by step.</p>
              </div>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Characters give the tasks</span>
                <p className={styles.contextText}>Material-based creatures hand out the tasks and react to what you make, so every craft has a reason behind it.</p>
              </div>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Keep it in a scrapbook</span>
                <p className={styles.contextText}>Finished crafts go into a personal scrapbook. No scores, no grades, no leaderboard.</p>
              </div>
            </div>

            <figure className={styles.pivotFig} style={{ marginTop: 'var(--space-8)', maxWidth: 560, marginInline: 'auto' }}>
              <img src={`${BASE}/gameplay%202.jpeg`} alt="Wonder Workshop gameplay: a character in the workshop world" className={styles.pivotImg} />
              <figcaption className={styles.pivotCaption}>A character sets you a task inside the workshop world.</figcaption>
            </figure>
          </section>

          {/* Accessibility */}
          <section id="access" ref={el => { sectionRefs.current['access'] = el }} tabIndex={-1} className={styles.section}>
            <h2 className={styles.sectionLabel}>Accessibility</h2>

            <p className={styles.prose}>
              The audience is nine to twelve, which is a range that contains kids
              reading two grades apart, kids using a tablet at arm's length, and
              kids who have never been asked to read an interface at all. A few
              decisions were treated as requirements rather than polish.
            </p>

            <div className={styles.accessGrid}>
              {ACCESS_NOTES.map(note => (
                <div key={note.title} className={styles.accessItem}>
                  <span className={styles.accessDiamond} aria-hidden="true">◆</span>
                  <div>
                    <h3 className={styles.accessTitle}>{note.title}</h3>
                    <p className={styles.accessBody}>{note.body}</p>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* Design Decisions */}
          <section id="decisions" ref={el => { sectionRefs.current['decisions'] = el }} tabIndex={-1} className={styles.section}>
            <h2 className={styles.sectionLabel}>Design Decisions</h2>

            <div className={styles.decision}>
              <div className={styles.decisionMeta}>
                <span className={styles.decisionNum}>01</span>
                <h3 className={styles.decisionTitle}>Making is the point, not a means to one</h3>
              </div>
              <div className={styles.decisionSplit}>
                <div className={styles.decisionText}>
                  <p className={styles.prose}>Most mechanics give you something to do <em>with</em> what you make, which quietly subordinates the making. We removed that layer. Craft a thing, put it in the scrapbook, done.</p>
                  <p className={styles.prose}>That is the overjustification effect: attach points to something a child already enjoys and the points become the reason. Every stat we added converted play into work.</p>
                  <p className={styles.prose}>It is also the commercial case. Reward-driven engagement needs constant refuelling; the making does not. And "my kid makes things" is what a parent pays for.</p>
                </div>
                <img src={`${BASE}/gameplay%201.jpeg`} alt="Wonder Workshop gameplay" className={styles.decisionImg} />
              </div>
            </div>

            <div className={styles.decision}>
              <div className={styles.decisionMeta}>
                <span className={styles.decisionNum}>02</span>
                <h3 className={styles.decisionTitle}>Every task lives inside a story</h3>
              </div>
              <div className={styles.decisionSplit}>
                <img src={`${BASE}/gameplay%202.jpeg`} alt="Wonder Workshop character" className={styles.decisionImg} />
                <div className={styles.decisionText}>
                  <p className={styles.prose}>Craft without context feels like an assignment. Every task comes from a character with a problem. You are not folding paper, you are helping someone.</p>
                  <p className={styles.prose}>Nine to twelve is when attachment to fictional characters runs strongest, and a prosocial ask sustains effort where an instruction stalls. It also softens a wobbly result — you made something for Hugh.</p>
                  <p className={styles.prose}>So characters are the retention asset. Kids come back for them without needing a constant supply of new levels.</p>
                </div>
              </div>
            </div>

            <div className={styles.decision}>
              <div className={styles.decisionMeta}>
                <span className={styles.decisionNum}>03</span>
                <h3 className={styles.decisionTitle}>No grades, no failure states</h3>
              </div>
              <div className={styles.decisionSplit}>
                <div className={styles.decisionText}>
                  <p className={styles.prose}>Progress comes from participation, not scores. No grading, no leaderboard, no punishment for a craft going wrong. Finished work goes in a scrapbook.</p>
                  <p className={styles.prose}>Scoring shifts a child from "what if I try this" to "will this be good enough" — and the experimentation it suppresses <em>is</em> the product.</p>
                  <p className={styles.prose}>Streaks retain better in week one. They also churn hard: break one and returning means facing how far behind you are. We bet on month six.</p>
                </div>
                <img src={`${BASE}/gameplay%203.jpeg`} alt="Wonder Workshop scrapbook" className={styles.decisionImg} />
              </div>
            </div>
          </section>

          {/* Try It */}
          <section id="try-it" ref={el => { sectionRefs.current['try-it'] = el }} tabIndex={-1} className={styles.section}>
            <h2 className={styles.sectionLabel}>Try It</h2>
            <p className={styles.prose}>
              Wonder Workshop is live and playable now! Try it yourself. When a task says "done," the full version would repopulate with a more complex task in the same category.
            </p>

            <p className={styles.embedNote}>
              <span className={styles.embedNoteIcon} aria-hidden="true">◆</span>
              The game below runs in an embedded frame and takes over the arrow
              keys while it has focus. Press <kbd>Esc</kbd> then <kbd>Tab</kbd> to
              step back out to the page, or open it in its own tab using the link
              underneath.
            </p>

            <div className={styles.gameCard}>
              <div className={styles.gameFrameWrap}>
                <iframe
                  src="https://liv-iz.github.io/wonder-workshop/"
                  title="Play Wonder Workshop"
                  className={styles.gameFrame}
                  allowFullScreen
                />
              </div>
              <div className={styles.gameCardFooter}>
                <span className={styles.gameNote}>Best experienced on mobile or tablet</span>
                <a
                  href="https://liv-iz.github.io/wonder-workshop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.gameLink}
                >
                  Open full screen ◆
                </a>
              </div>
            </div>
          </section>

          {/* User Testing */}
          <section id="research" ref={el => { sectionRefs.current['research'] = el }} tabIndex={-1} className={styles.section}>
            <h2 className={styles.sectionLabel}>User Testing</h2>

            <div className={styles.photoRow}>
              <img src={`${BASE}/kids%20in%20action.jpeg`} alt="Kids playtesting Wonder Workshop" className={styles.photo} />
              <img src={`${BASE}/users%20in%20action.jpeg`} alt="A tester building a craft at a table while the game is open beside them" className={styles.photo} />
            </div>

            <div className={styles.quotesGrid}>
              {QUOTES.map((q, i) => (
                <div key={i} className={styles.quoteCard}>
                  <p className={styles.quoteText}>{q.text}</p>
                  <p className={styles.quoteInsight}>{q.insight}</p>
                </div>
              ))}
            </div>

            <div className={styles.findingsGrid}>
              {[
                'Some material lessons felt familiar to kids, suggesting room to expand into science and engineering projects.',
                'Positive feedback on the visuals. Kids expressed a desire for more characters and areas to explore.',
                'Onboarding text was absorbed faster than expected despite the amount on screen.',
                'More time was spent off-screen than on. That was the goal.',
              ].map((f, i) => (
                <div key={i} className={styles.finding}>
                  <span className={styles.findingDiamond} aria-hidden="true">◆</span>
                  <p className={styles.findingText}>{f}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Next Steps */}
          <section id="next-steps" ref={el => { sectionRefs.current['next-steps'] = el }} tabIndex={-1} className={styles.section}>
            <h2 className={styles.sectionLabel}>What's Next</h2>
            <div className={styles.nextGrid}>
              {NEXT_STEPS.map(n => (
                <div key={n.title} className={styles.nextItem}>
                  <span className={styles.nextIcon}>{n.icon}</span>
                  <div>
                    <p className={styles.nextTitle}>{n.title}</p>
                    <p className={styles.nextDesc}>{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reflection */}
          <section id="reflection" ref={el => { sectionRefs.current['reflection'] = el }} tabIndex={-1} className={`${styles.section} ${styles.sectionLast} ${styles.sectionRelative}`}>
            <img src={`${BASE}/Puff.gif`} alt="" className={`${styles.charFloatRight} ${styles.charFloatRightTop}`} />
            <h2 className={styles.sectionLabel}>Reflection</h2>
            <p className={styles.prose}>
              This project required building the wrong version first. The critter battle system was coherent and technically interesting, and we needed to build it before we could see what it was doing to our goals. The clearer lesson: the research case for craft-as-intervention existed before the midterm. The signal was in the literature before we found it in the feedback.
            </p>
            <p className={styles.prose}>
              What carried through from the original concept was the belief that a digital space can be designed to produce things rather than just consume them. Wonder Workshop is one version of that. The mechanics changed significantly, but the question stayed the same.
            </p>
            <div className={styles.questBoard} aria-label="Quest board">
              <div className={styles.questBoardNailTL} />
              <div className={styles.questBoardNailTR} />
              <div className={styles.questBoardNailBL} />
              <div className={styles.questBoardNailBR} />
              <div className={styles.questPaper}>
                <div className={styles.questTapeTop} />
                <p className={styles.questText}>
                  What if digital spaces for children were designed not around endless attention capture, but around creativity, confidence, and care?
                </p>
              </div>
            </div>
          </section>

          <NextCaseStudy currentId="wonder" />

        </article>
      </div>
    </div>
  )
}
