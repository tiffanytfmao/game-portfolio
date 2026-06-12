import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CatSprite from '../../components/CatSprite/CatSprite'
import { asset } from '../../utils/asset'
import styles from './WonderWorkshop.module.css'

const BASE = asset('wonder workshop assets')

const SECTIONS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'problem',     label: 'The Problem' },
  { id: 'pivot',       label: 'The Pivot' },
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'decisions',   label: 'Design Decisions' },
  { id: 'try-it',      label: 'Try It' },
  { id: 'research',    label: 'User Testing' },
  { id: 'next-steps',  label: "What's Next" },
  { id: 'reflection',  label: 'Reflection' },
]

const TAGS = ['Game Design', 'Education', 'Children 9–12', 'UX/UI', 'Physical-Digital', 'Research']

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
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return (
    <div className={styles.page}>
      {/* Back */}
      <Link to="/" className={styles.backBtn}>
        <span className={styles.backDiamond}>◆</span> Back
      </Link>

      {/* Hero */}
      <div className={styles.hero}>
        <img
          src={`${BASE}/Hero-animation-WITH%20TITLE.gif`}
          alt="Wonder Workshop"
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
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Content ── */}
        <main className={styles.content}>

          {/* Overview */}
          <section id="overview" ref={el => { sectionRefs.current['overview'] = el }} className={styles.section}>
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
                  <span className={styles.sectionLabel}>My Role</span>
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
                  <span className={styles.sectionLabel}>Team</span>
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
          <section id="problem" ref={el => { sectionRefs.current['problem'] = el }} className={`${styles.section} ${styles.sectionRelative}`}>
            <img src={`${BASE}/happyhugh.gif`} alt="Hugh character" className={styles.charFloatRight} />
            <span className={styles.sectionLabel}>The Problem</span>

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

          {/* The Pivot */}
          <section id="pivot" ref={el => { sectionRefs.current['pivot'] = el }} className={`${styles.section} ${styles.sectionRelative}`}>
            <img src={`${BASE}/Mentordog.gif`} alt="Mentor Dog character" className={`${styles.charFloatRight} ${styles.charFloatRightLow}`} />
            <span className={styles.sectionLabel}>The Pivot</span>

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

            <p className={styles.prose}>
              For the midterm, we had a battle card game. The original pitch, which I brought to the team, was a Pokédex-style system where kids craft physical creatures and an app scans them, assigning stats based on how they were made: how many colors used, whether there are 3D elements, unusual materials, natural objects. The creatures battle a grey algorithmic antagonist representing soulless digital emptiness. Five stats, turn structures, threat cards. The mechanic was coherent and the concept worked.
            </p>
            <p className={styles.prose}>
              After midterm feedback, we started asking whether the battle mechanics were serving our goals or just being the most compelling part of the system. Reward loops built around collecting and leveling stats made the stats the point, not the making. We had designed a game where you craft to win. That is a different thing from a game where crafting is worth doing on its own terms.
            </p>
            <p className={styles.prose}>
              We removed the competitive systems and rebuilt around a simpler question: what does an experience look like when making is genuinely the center? The result was Wonder Workshop. Slower, narrative-driven, structured around characters and story rather than scores.
            </p>

            <div className={styles.videoCard}>
              <video
                src={`${BASE}/skrawl%20prototype.mp4`}
                controls
                muted
                playsInline
                className={styles.prototypeVideo}
              />
              <p className={styles.videoCaption}>Early prototype — the midterm direction</p>
            </div>
          </section>

          {/* Inspiration */}
          <section id="inspiration" ref={el => { sectionRefs.current['inspiration'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Inspiration</span>
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

          {/* Design Decisions */}
          <section id="decisions" ref={el => { sectionRefs.current['decisions'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Design Decisions</span>

            <div className={styles.decision}>
              <div className={styles.decisionMeta}>
                <span className={styles.decisionNum}>01</span>
                <h3 className={styles.decisionTitle}>Making is the point, not a means to one</h3>
              </div>
              <div className={styles.decisionSplit}>
                <div className={styles.decisionText}>
                  <p className={styles.prose}>Most game mechanics give you something to do <em>with</em> what you make. In practice that subordinates making to a larger system. We removed that layer entirely.</p>
                  <div className={styles.insightBox}>
                    <span className={styles.insightLabel}>Key insight</span>
                    <p>A child completes a craft task, documents it in their scrapbook, and that is the loop. Nothing depends on it performing well.</p>
                  </div>
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
                  <p className={styles.prose}>Craft without context feels like an assignment. Each task in Wonder Workshop comes from a character with a problem to solve.</p>
                  <div className={styles.insightBox}>
                    <span className={styles.insightLabel}>Key insight</span>
                    <p>The child is not completing a worksheet about paper folding. They are helping someone. Characters act as guides <em>and</em> emotional anchors.</p>
                  </div>
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
                  <p className={styles.prose}>Progress comes from participation and experimentation, not performance scores. No grading, no leaderboard, no punishment for a craft going wrong.</p>
                  <div className={styles.insightBox}>
                    <span className={styles.insightLabel}>Key insight</span>
                    <p>Finished work lives in a personal scrapbook. We wanted children to return because they <em>wanted</em> to, not because they were anxious about falling behind.</p>
                  </div>
                </div>
                <img src={`${BASE}/gameplay%203.jpeg`} alt="Wonder Workshop scrapbook" className={styles.decisionImg} />
              </div>
            </div>
          </section>

          {/* Try It */}
          <section id="try-it" ref={el => { sectionRefs.current['try-it'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Try It</span>
            <p className={styles.prose}>
              Wonder Workshop is live and playable now. Skip the onboarding for the demo. Left, right, forward, and back navigation. When a task says "done," the full version would repopulate with a more complex task in the same category.
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
          <section id="research" ref={el => { sectionRefs.current['research'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>User Testing</span>

            <div className={styles.photoRow}>
              <img src={`${BASE}/kids%20in%20action.jpeg`} alt="Kids playtesting Wonder Workshop" className={styles.photo} />
              <img src={`${BASE}/users%20in%20action.jpeg`} alt="Users in action" className={styles.photo} />
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
                  <span className={styles.findingDiamond}>◆</span>
                  <p className={styles.findingText}>{f}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Next Steps */}
          <section id="next-steps" ref={el => { sectionRefs.current['next-steps'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>What's Next</span>
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
          <section id="reflection" ref={el => { sectionRefs.current['reflection'] = el }} className={`${styles.section} ${styles.sectionLast} ${styles.sectionRelative}`}>
            <img src={`${BASE}/Puff.gif`} alt="Puff character" className={`${styles.charFloatRight} ${styles.charFloatRightTop}`} />
            <span className={styles.sectionLabel}>Reflection</span>
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

        </main>
      </div>
    </div>
  )
}
