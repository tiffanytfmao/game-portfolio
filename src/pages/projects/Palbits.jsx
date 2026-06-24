import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CatSprite from '../../components/CatSprite/CatSprite'
import { asset } from '../../utils/asset'
import styles from './Palbits.module.css'

const BASE = asset('palbit assets')

const SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'problem',    label: 'The Problem' },
  { id: 'prototypes', label: 'Prototyping' },
  { id: 'pivot',      label: 'The Pivot' },
  { id: 'decisions',  label: 'Design Decisions' },
  { id: 'final',      label: 'Final Design' },
  { id: 'reflection', label: 'Reflection' },
]

const TAGS = ['Game Design', 'Physical-Digital', 'Rapid Prototyping', 'Children 8–12', 'Interaction Design', 'CAD / 3D Printing']

const PROTOTYPES = [
  {
    num: '01',
    title: 'Cosmetic Evolution',
    img: `${BASE}/initial%20concept%201.png`,
    caption: 'Concept 1, controller grows cosmetic parts as you level up',
    what: 'I designed the controller to grow horns as players leveled up, cosmetic parts that deployed automatically from the body once a threshold was hit.',
    feedback: 'Users in testing thought it looked cool, but felt the evolving interaction too strictly limited what the game could be.',
  },
  {
    num: '02',
    title: 'Difficulty Escalation',
    img: `${BASE}/initial%20concept%202.png`,
    caption: 'Concept 2, parts detach as trophies as you progress',
    what: 'Parts physically detached as players progressed. The removed pieces became a trophy to keep.',
    feedback: 'The interaction read as the controller breaking, not rewarding. It created frustration. Progress you can hold was the right idea. The form and interaction just needed to work with the player, not against them.',
  },
]

const DECISIONS = [
  {
    num: 'D1',
    title: 'Physical bits, not digital badges',
    body: 'A digital badge only exists on a screen the player is looking at. A physical bit that slots into the controller can be shown to a friend, compared, even traded. For children 8–12, whose play is intensely social and whose pride is externally performed, that difference in materiality changes the emotional weight of earning something.',
    img: `${BASE}/prototype.png`,
  },
  {
    num: 'D2',
    title: 'Discrete milestones, not continuous progress',
    body: 'A continuously filling bar teaches optimization. Defined milestones create discrete moments, a new bit snaps in and something visibly changes. The controller looks different. Testing showed kids responded to the arrival of a milestone as an event, not a metric. Milestones feel like achievements; a filling meter feels like a job.',
    img: `${BASE}/gemini%20mockup.png`,
  },
  {
    num: 'D3',
    title: 'Customization as autonomy, not cosmetics',
    body: 'Every Palbit can be personalized. The design intent was to give children ownership over what their progression looked like, not the game\'s version of their progress, but their version. Research into child development showed autonomy and self-expression at this age group aren\'t nice-to-haves; they\'re how kids form identity and confidence. When kids own what their controller looks like, they own what they\'ve achieved.',
    img: `${BASE}/kids%20using%20controller%20v2.png`,
    caption: 'Gemini generated mockups of potential controller use',
  },
  {
    num: 'D4',
    title: 'Social visibility as a core feature',
    body: 'The bits are visible on the outside of the controller. That\'s a deliberate choice. For children 8–12, gaming is fundamentally social. Showing a friend your bits, comparing configurations, demonstrating a new unlock, these are part of the reward loop. The social layer wasn\'t added later. It was load-bearing from the start.',
    img: `${BASE}/kids%20using%20controller.png`,
    caption: 'Gemini generated mockups of potential controller use',
  },
]

export default function Palbits() {
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
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />

        <div className={styles.heroLayout}>
          {/* Left */}
          <div className={styles.heroLeft}>
            <div className={styles.heroEyebrow}>Game Design · Physical-Digital</div>
            <h1 className={styles.heroTitle}>Pal<span className={styles.heroAccent}>bits</span></h1>
            <div className={styles.heroRule} />
            <p className={styles.heroTagline}>What if the controller in your hands grew alongside the game?</p>
            <div className={styles.heroMetaRow}>
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>Year</span>
                <span className={styles.heroMetaValue}>2025</span>
              </div>
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>Program</span>
                <span className={styles.heroMetaValue}>MDes · UC Berkeley</span>
              </div>
              <div className={styles.heroMetaItem}>
                <span className={styles.heroMetaLabel}>Advisor</span>
                <span className={styles.heroMetaValue}>Prof. Ahmed Riaz · Logitech</span>
              </div>
            </div>
            <div className={styles.heroTags}>
              {TAGS.map(t => <span key={t} className={styles.heroTag}>{t}</span>)}
            </div>
          </div>

          {/* Right */}
          <div className={styles.heroRight}>
            <div className={styles.deviceScene}>
              <div className={`${styles.ring} ${styles.ring1}`} />
              <div className={`${styles.ring} ${styles.ring2}`} />
              <div className={`${styles.ring} ${styles.ring3}`} />
              <div className={`${styles.ringDot} ${styles.rd1}`} />
              <div className={`${styles.ringDot} ${styles.rd2}`} />
              <div className={`${styles.ringDot} ${styles.rd3}`} />
              <img
                src={`${BASE}/prototype.png`}
                alt="Palbits prototype"
                className={styles.deviceImg}
              />
              <div className={`${styles.chip} ${styles.chipA}`}><span className={styles.chipDot} />Collectible Bits</div>
              <div className={`${styles.chip} ${styles.chipB}`}><span className={styles.chipDot} />Physical Memory</div>
              <div className={`${styles.chip} ${styles.chipC}`}><span className={styles.chipDot} />Evolves With Play</div>
            </div>
          </div>
        </div>

        <div className={styles.heroFooter}>
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
            <h1 className={styles.projectTitle}>Palbits</h1>
            <p className={styles.tagline}>What if the controller in your hands grew alongside the game?</p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}><span className={styles.metaKey}>Year</span><span className={styles.metaVal}>2025</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Team</span><span className={styles.metaVal}>3 people</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Program</span><span className={styles.metaVal}>MDes · UC Berkeley</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Advisor</span><span className={styles.metaVal}>Prof. Ahmed Riaz · Logitech</span></div>
            </div>

            <p className={styles.prose}>
              Palbits is a <strong>physical-digital controller system</strong> where insertable collectible "bits" evolve as players progress through games. It started from a simple brief: <strong>design a unique controller</strong>. Immediately, a concept came to me. Kids spend hundreds of hours holding a controller, and yet no controller on the market had been designed to show signs of those hours. Well, what if it did? We didn't know yet what the answer looked like. It took two failed prototypes, child development psychology, 3D printing iterations, and a pivot away from our original audience to find it.
            </p>

            <div className={styles.roleBlock}>
              <div className={styles.roleCols}>
                <div>
                  <span className={styles.sectionLabel}>My Role</span>
                  <ul className={styles.roleList}>
                    <li>Design lead</li>
                    <li>Concept ideation &amp; interaction design direction</li>
                    <li>Led all user research sessions</li>
                    <li>Synthesized findings into design pivots</li>
                  </ul>
                </div>
                <div>
                  <span className={styles.sectionLabel}>Team</span>
                  <ul className={styles.roleList}>
                    <li>2 MDes collaborators</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* The Problem */}
          <section id="problem" ref={el => { sectionRefs.current['problem'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>The Problem</span>

            <p className={styles.prose}>
              Every part of a game grows with you. Your character levels up, your inventory fills, your world expands. The controller in your hands stays exactly as it was on day one.
            </p>
            <p className={styles.prose}>
              That asymmetry was the whole project, before we even knew what to build around it.
            </p>

            <blockquote className={styles.hmw}>
              How might we design a controller that evolves alongside its player?
            </blockquote>
            <blockquote className={styles.hmwSecondary}>
              How might we define "fun" and translate it into controller design?
            </blockquote>

            <div className={styles.contextGrid}>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Audience</span>
                <p className={styles.contextText}>Children 8–12. An age group that craves customization, social validation, and visible markers of growth.</p>
              </div>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Form factor</span>
                <p className={styles.contextText}>Physical game controller. The one object in gaming that has never changed to reflect the player holding it.</p>
              </div>
              <div className={styles.contextItem}>
                <span className={styles.contextLabel}>Challenge</span>
                <p className={styles.contextText}>Translating the abstract emotion of "fun" into a tangible, evolving physical interaction.</p>
              </div>
            </div>
          </section>

          {/* Prototyping */}
          <section id="prototypes" ref={el => { sectionRefs.current['prototypes'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Prototyping</span>
            <p className={styles.prose}>
              We built two physical prototypes before arriving at the final system. Both were 3D printed. Both received positive reactions in testing. Both had meaningful shortcomings that only became visible once something was in users' hands.
            </p>

            <div className={styles.protoGrid}>
              {PROTOTYPES.map(p => (
                <div key={p.num} className={styles.protoCard}>
                  <figure className={styles.protoFig}>
                    <img src={p.img} alt={p.title} className={styles.protoImg} />
                    <figcaption className={styles.protoCaption}>{p.caption}</figcaption>
                  </figure>
                  <div className={styles.protoBody}>
                    <div className={styles.protoMeta}>
                      <span className={styles.protoNum}>{p.num}</span>
                      <h3 className={styles.protoTitle}>{p.title}</h3>
                    </div>
                    <p className={styles.protoWhat}>{p.what}</p>
                    <div className={styles.protoBlock}>
                      <span className={styles.protoBlockLabel}>What I Learned</span>
                      <p className={styles.protoBlockText}>{p.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.prose}>
              Between the two of the prototypes, I started to see what we'd actually been getting wrong: we kept designing the visual payoff before we'd figured out what earning something was supposed to feel like for these particular players.
            </p>

            <figure className={styles.sketchFig}>
              <img src={`${BASE}/concept%20sketch.png`} alt="Early concept sketches" className={styles.sketchImg} />
              <figcaption className={styles.sketchCaption}>Early concept sketches, exploring the physical form language</figcaption>
            </figure>
          </section>

          {/* The Pivot */}
          <section id="pivot" ref={el => { sectionRefs.current['pivot'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>The Pivot</span>

            <p className={styles.prose}>
              We had been designing for adults 18 to 28. That was the comfortable choice, the demographic closest to us as student designers. The evolving controller concept kept feeling forced for that group. Adults had already made their peace with static hardware.
            </p>
            <p className={styles.prose}>
              Our professor Ahmed, drawing on his experience at Logitech, pushed us to think about a wider audience. I went and read more child development research than I expected to for a hardware project, and the answer that kept surfacing was kids around 8 to 12: an age where wanting to show off what you've earned isn't a quirk, it's developmentally normal. <strong>Adults had mostly made peace with their hardware staying the same forever. Kids hadn't, because for them customization and visible status are still how identity gets built.</strong>
            </p>
          </section>

          {/* Design Decisions */}
          <section id="decisions" ref={el => { sectionRefs.current['decisions'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Design Decisions</span>

            {DECISIONS.map(d => (
              <div key={d.num} className={styles.decision}>
                <div className={styles.decisionMeta}>
                  <span className={styles.decisionNum}>{d.num}</span>
                  <h3 className={styles.decisionTitle}>{d.title}</h3>
                </div>
                <div className={styles.decisionSplit}>
                  <div className={styles.decisionText}>
                    <p className={styles.prose}>{d.body}</p>
                  </div>
                  {d.placeholder ? (
                    <div className={styles.placeholder}>
                      <span className={styles.placeholderLabel}>◆ Image placeholder</span>
                      <p className={styles.placeholderPrompt}>{d.placeholderPrompt}</p>
                    </div>
                  ) : d.img ? (
                    d.caption ? (
                      <figure className={styles.decisionFig}>
                        <img src={d.img} alt={d.title} className={styles.decisionImg} />
                        <figcaption className={styles.decisionCaption}>{d.caption}</figcaption>
                      </figure>
                    ) : (
                      <img src={d.img} alt={d.title} className={styles.decisionImg} />
                    )
                  ) : null}
                </div>
              </div>
            ))}
          </section>

          {/* Final Design */}
          <section id="final" ref={el => { sectionRefs.current['final'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Final Design</span>
            <p className={styles.prose}>
              Palbits: personalizable, insertable ability bits that power up as players progress through games. The controller becomes a display object as much as an input device, something that reflects its owner.
            </p>

            <img
              src={`${BASE}/final%20prototype.png`}
              alt="Palbits final prototype"
              className={styles.finalHero}
            />

            <figure className={styles.finalFig}>
              <img src={`${BASE}/group%20demo.png`} alt="Group demo of Palbits" className={styles.finalImgFull} />
              <figcaption className={styles.finalCaption}>Group demo and final presentation</figcaption>
            </figure>

            <div className={styles.principlesGrid}>
              {[
                { label: 'Discrete Evolution', desc: 'Defined progression points prevent overwhelm. Achievements feel concrete, not incremental.' },
                { label: 'Physical + Digital', desc: 'Tangible bits combined with digital progression strengthen the emotional weight of each milestone.' },
                { label: 'Identity & Ownership', desc: 'Customization enables player autonomy. Kids build a controller that looks like them.' },
                { label: 'Social by Design', desc: 'Visible upgrades make progress something to share, not just something to track.' },
              ].map(p => (
                <div key={p.label} className={styles.principleCard}>
                  <p className={styles.principleTitle}>{p.label}</p>
                  <p className={styles.principleDesc}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reflection */}
          <section id="reflection" ref={el => { sectionRefs.current['reflection'] = el }} className={`${styles.section} ${styles.sectionLast}`}>
            <span className={styles.sectionLabel}>Reflection</span>

            <div className={styles.reflectionCols}>
              <div>
                <p className={styles.reflectionHead}>What I'd carry forward</p>
                <ul className={styles.reflectionList}>
                  <li>Both prototypes failed productively. Physical prototyping surfaced things no sketch or digital mockup could, you have to put something in someone's hands to know if the interaction actually lands.</li>
                  <li>Research reveals the unexpected audience. The pivot to children wasn't in the brief. It came from sitting with child development psychology long enough to see where the concept had always belonged.</li>
                  <li>Translating "fun" into form is a research problem, not an aesthetic one. We needed a working definition of fun for our specific audience before any design decision could be justified.</li>
                </ul>
              </div>
              <div>
                <p className={styles.reflectionHead}>What I'd do differently</p>
                <ul className={styles.reflectionList}>
                  <li>Test with the target audience earlier. The first two prototypes were evaluated with adults because that's who was available. The pivot might have come sooner if kids had been in the room from the start.</li>
                  <li>Prototype the digital integration in parallel with the physical. The physical form got most of the iteration time; the digital-physical handshake was more assumed than designed.</li>
                  <li>Document more of the research synthesis. The insights that drove the pivot lived in my notes, I'd externalize that process earlier for a better paper trail and better team alignment.</li>
                </ul>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
