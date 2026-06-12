import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CatSprite from '../../components/CatSprite/CatSprite'
import { asset } from '../../utils/asset'
import styles from './Berky.module.css'

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

const TAGS = ['Service Design', 'Community Design', 'Physical-Digital', 'Sustainability', 'UI Design', 'XFN Research']

const PAIN_POINTS = [
  {
    num: '01',
    title: 'The "Gross" Factor',
    body: 'Indoor bins are perceived as unhygienic, attracting pests and bad smells. The sensory experience of composting is the first barrier — before habits even form.',
    tag: 'Perception → avoidance',
  },
  {
    num: '02',
    title: 'The Effort Gap',
    body: 'Manual waste sorting is viewed as tedious, requiring more effort than standard recycling with no visible payoff. The ratio of effort to reward feels broken.',
    tag: 'Effort → abandonment',
  },
  {
    num: '03',
    title: 'The Knowledge Void',
    body: "Residents often don't know where their waste goes or how to manage it if their building doesn't participate. Without feedback, composting feels like shouting into a void.",
    tag: 'Opacity → disengagement',
  },
]

const CONCEPTS = [
  {
    num: '01',
    title: 'Compost Vending Machine / Locker',
    img: `${BASE}/image%2010.png`,
    desc: 'A locker-style drop-off kiosk with goal tracking and rewards. Familiar form factor, but felt transactional — more ATM than community.',
  },
  {
    num: '02',
    title: 'Community Compost Worm',
    img: `${BASE}/image%201.png`,
    desc: 'A large sculptural worm functioning as a composting hub. This is the direction we bet on — it merged infrastructure, education, play, and identity into one object.',
  },
  {
    num: '03',
    title: 'Community Cargo Monster',
    img: `${BASE}/image%2012.png`,
    desc: 'A mobile compost collector with a community display — the worm goes to residents rather than the other way around. Operationally complex but directionally interesting.',
  },
]

const HOW_IT_WORKS = [
  { icon: '🪱', step: 'Feed the worm', desc: 'Users drop organic waste directly into Berky at the community garden.' },
  { icon: '⚙️', step: 'Compost turns', desc: 'Integrated bikes let visitors exercise while physically turning the compost — speeding up decomposition sustainably.' },
  { icon: '🪟', step: 'Watch it work', desc: 'A clear educational window lets passersby see the transformation process firsthand.' },
  { icon: '📱', step: 'Track on the app', desc: 'Scan the QR code on Berky to monitor health, get feeding suggestions, and earn rewards.' },
]

export default function Berky() {
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

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroBlobPink} />
        <div className={styles.heroBlobGreen} />

        <div className={styles.heroLayout}>
          {/* Left */}
          <div className={styles.heroLeft}>
            <div className={styles.heroEyebrow}>Service Design · Community</div>
            <h1 className={styles.heroTitle}>
              Berky<br /><span className={styles.heroAccent}>the Worm</span>
            </h1>
            <div className={styles.heroRule} />
            <p className={styles.heroTagline}>
              How we turned Berkeley's composting crisis into a community playground.
            </p>
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
                <span className={styles.heroMetaLabel}>Timeline</span>
                <span className={styles.heroMetaValue}>4 Weeks · Fall 2025</span>
              </div>
            </div>
            <div className={styles.heroTags}>
              {TAGS.map(t => <span key={t} className={styles.heroTag}>{t}</span>)}
            </div>
          </div>

          {/* Right */}
          <div className={styles.heroRight}>
            <div className={styles.deviceScene}>
              <img
                src={`${BASE}/mockup%20berky.png`}
                alt="Berky app mockup"
                className={styles.deviceImg}
              />
              <div className={`${styles.chip} ${styles.chipA}`}><span className={styles.chipDot} />Physical + Digital</div>
              <div className={`${styles.chip} ${styles.chipB}`}><span className={styles.chipDot} />Community Play</div>
              <div className={`${styles.chip} ${styles.chipC}`}><span className={styles.chipDot} />Art-Integrated</div>
            </div>
          </div>
        </div>

        <div className={styles.heroFooter}>
          <button className={styles.skipBtn} onClick={() => scrollToSection('solution')}>
            Skip to solution ◆
          </button>
        </div>
      </div>

      {/* ── Body ── */}
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
            <h1 className={styles.projectTitle}>Berky the Worm</h1>
            <p className={styles.tagline}>Making composting a fun, habitual part of Berkeley life — through play, art, and a very cute worm.</p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}><span className={styles.metaKey}>Year</span><span className={styles.metaVal}>2025</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Role</span><span className={styles.metaVal}>Product Designer · UI Lead</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Team</span><span className={styles.metaVal}>Elisa, Precious, Skye & Tiffany</span></div>
              <div className={styles.metaItem}><span className={styles.metaKey}>Timeline</span><span className={styles.metaVal}>4 Weeks · Fall 2025</span></div>
            </div>

            <p className={styles.prose}>
              Berky the Worm is a service design initiative aimed at making composting a fun, habitual part of life for the Berkeley community. By blending physical play structures with a digital reward system, we transformed a "gross" chore into an art-integrated social experience.
            </p>
            <p className={styles.prose}>
              Berky doubles as a public play structure, workout space, and organic waste drop-off — all while educating the community about the composting process. My role as UI lead was to contribute heavily to initial idea generation and design the high-fidelity app.
            </p>

            <div className={styles.roleBlock}>
              <div className={styles.roleCols}>
                <div>
                  <span className={styles.sectionLabel}>My Role</span>
                  <ul className={styles.roleList}>
                    <li>Ideation &amp; concept direction</li>
                    <li>User research &amp; synthesis</li>
                    <li>High-fidelity app UI design</li>
                    <li>UI lead for digital companion</li>
                  </ul>
                </div>
                <div>
                  <span className={styles.sectionLabel}>Team</span>
                  <ul className={styles.roleList}>
                    <li>Elisa</li>
                    <li>Precious</li>
                    <li>Skye</li>
                  </ul>
                </div>
              </div>
            </div>

            <img
              src={`${BASE}/Group%204704.png`}
              alt="Berky the Worm physical installation model"
              className={styles.overviewImg}
            />
          </section>

          {/* The Problem */}
          <section id="problem" ref={el => { sectionRefs.current['problem'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>The Problem</span>
            <h2 className={styles.sectionHeading}>
              Composting isn't failing because people don't care. It's failing because the current experience doesn't work for them.
            </h2>
            <p className={styles.prose}>
              Berkeley generates tons of organic waste daily, yet residents consistently fail to compost. The problem isn't awareness — it's friction, perception, and a broken feedback loop.
            </p>

            <div className={styles.gaps}>
              {PAIN_POINTS.map(p => (
                <div key={p.num} className={styles.gapRow}>
                  <div className={styles.gapMain}>
                    <span className={styles.gapNum}>{p.num}</span>
                    <div>
                      <p className={styles.gapTitle}>{p.title}</p>
                      <p className={styles.gapBody}>{p.body}</p>
                    </div>
                  </div>
                  <span className={styles.gapLabel}>{p.tag}</span>
                </div>
              ))}
            </div>

            <blockquote className={styles.pullQuote}>
              "Maybe it would motivate me if I knew more of the impact I was making by composting, or if it could be more fun / less gross somehow."
              <cite>— Berkeley resident interview</cite>
            </blockquote>
          </section>

          {/* Research */}
          <section id="research" ref={el => { sectionRefs.current['research'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Research</span>
            <h2 className={styles.sectionHeading}>8 interviews. 6 residents, 2 experts.</h2>

            <div className={styles.researchMeta}>
              <div className={styles.researchCard}>
                <p className={styles.researchCardHead}>Interview Goal</p>
                <p className={styles.researchCardBody}>Understand why composting is inconvenient or unsustainable for urban residents, and identify opportunities to make it easier, cleaner, and more habitual.</p>
              </div>
              <div className={styles.researchCard}>
                <p className={styles.researchCardHead}>Target Interviewees</p>
                <ul className={styles.researchList}>
                  <li>Berkeley residents</li>
                  <li>Community organizers</li>
                  <li>Business owners</li>
                </ul>
              </div>
            </div>

            <div className={styles.photoRow}>
              <img src={`${BASE}/berkeley-residents%201.png`} alt="Berkeley residents composting" className={styles.photo} />
              <img src={`${BASE}/IMG_4642%202.png`} alt="Expert interview" className={styles.photo} />
              <img src={`${BASE}/IMG_4642%201.png`} alt="Berkeley Student Food Collective" className={styles.photo} />
            </div>

            <div className={styles.insightBlock}>
              <span className={styles.insightLabel}>Key Insight</span>
              <p className={styles.insightText}>The three barriers — disgust, effort, and opacity — aren't independent. A solution that tackles only one leaves the other two standing. We needed a single intervention that addressed all three simultaneously.</p>
            </div>
          </section>

          {/* The Hypothesis */}
          <section id="hypothesis" ref={el => { sectionRefs.current['hypothesis'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>The Hypothesis</span>

            <blockquote className={styles.hmw}>
              If composting systems are redesigned to be more intuitive, accessible, and personally rewarding, users will be more likely to adopt and sustain composting behaviors — reducing organic waste sent to landfills.
            </blockquote>

            <div className={styles.storyboard}>
              <img src={`${BASE}/image%2014.png`} alt="Berky scenario storyboard" className={styles.storyboardImg} />
              <p className={styles.storyboardCaption}>Early scenario storyboard — mapping the before/after of a Berkeley resident's composting journey</p>
            </div>
          </section>

          {/* Ideation */}
          <section id="ideation" ref={el => { sectionRefs.current['ideation'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>Ideation</span>
            <h2 className={styles.sectionHeading}>Three directions. One clear winner.</h2>
            <p className={styles.prose}>
              The team explored three initial concepts before converging on the community worm — the only direction that could merge infrastructure, education, play, and community identity into a single object.
            </p>

            <div className={styles.conceptGrid}>
              {CONCEPTS.map(c => (
                <div key={c.num} className={`${styles.conceptCard} ${c.num === '02' ? styles.conceptCardWinner : ''}`}>
                  {c.num === '02' && <span className={styles.winnerBadge}>◆ Selected direction</span>}
                  <img src={c.img} alt={c.title} className={styles.conceptImg} />
                  <div className={styles.conceptBody}>
                    <span className={styles.conceptNum}>{c.num}</span>
                    <p className={styles.conceptTitle}>{c.title}</p>
                    <p className={styles.conceptDesc}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.insightBlock}>
              <span className={styles.insightLabel}>Why the worm won</span>
              <p className={styles.insightText}>After early prototyping, the team doubled down on the community compost worm for its ability to merge infrastructure, education, play, and community identity into a single object. The other concepts were functional. This one was memorable.</p>
            </div>
          </section>

          {/* The Solution */}
          <section id="solution" ref={el => { sectionRefs.current['solution'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>The Solution</span>

            <div className={styles.missionBlock}>
              <p className={styles.missionEyebrow}>North star mission</p>
              <p className={styles.missionText}>
                To empower Berkeley toward food self-reliance by creating an intelligent, art-integrated community space that makes composting education and practice engaging and accessible.
              </p>
            </div>

            <div className={styles.impactRow}>
              <div className={styles.impactCard}>
                <p className={styles.impactHead}>Short-term</p>
                <p className={styles.impactBody}>A unique community space — part playground, part workout area, part organic waste drop-off.</p>
              </div>
              <div className={styles.impactCard}>
                <p className={styles.impactHead}>Long-term</p>
                <p className={styles.impactBody}>Access to compost, revitalization of local soils, education on food systems, and increased community food accessibility.</p>
              </div>
            </div>

            <h2 className={styles.sectionHeading}>Berky the Worm — physical installation</h2>
            <p className={styles.prose}>An intelligent, art-integrated community hub with both physical and digital counterparts. Designed to empower Berkeley toward food self-reliance.</p>

            <img
              src={`${BASE}/Group%204710.png`}
              alt="Annotated Berky physical model"
              className={styles.annotatedImg}
            />

            <div className={styles.howGrid}>
              {HOW_IT_WORKS.map(h => (
                <div key={h.step} className={styles.howItem}>
                  <span className={styles.howIcon}>{h.icon}</span>
                  <div>
                    <p className={styles.howStep}>{h.step}</p>
                    <p className={styles.howDesc}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.protoRow}>
              <img src={`${BASE}/image%205.png`} alt="Berky paper prototype" className={styles.protoImg} />
              <img src={`${BASE}/Group%204704.png`} alt="Berky refined physical model" className={styles.protoImg} />
            </div>
          </section>

          {/* The App */}
          <section id="app" ref={el => { sectionRefs.current['app'] = el }} className={styles.section}>
            <span className={styles.sectionLabel}>The App</span>
            <h2 className={styles.sectionHeading}>Gamify: A Digital Care Companion.</h2>
            <p className={styles.prose}>
              Berky is paired with a companion app that extends engagement beyond the physical site. Users can track Berky's health status, see what organic material is needed, monitor composting progress, and earn rewards redeemable at local grocery stores. Push notifications prompt users when Berky is hungry.
            </p>
            <p className={styles.prose}>
              We chose a playful, modern aesthetic — designing Berky's digital counterpart as a cute illustrated worm to inspire personal attachment and connection even beyond the playground.
            </p>

            <div className={styles.appSplit}>
              <div className={styles.appFeatures}>
                <div className={styles.appFeature}>
                  <span className={styles.appFeatureLabel}>Feeding suggestions</span>
                  <p className={styles.appFeatureDesc}>Lowering barrier of entry with regenerable suggestions of what to compost. Berky tells you exactly what she needs right now.</p>
                </div>
                <div className={styles.appFeature}>
                  <span className={styles.appFeatureLabel}>Berky's status</span>
                  <p className={styles.appFeatureDesc}>Live readout of Capacity, C:N Ratio, Moisture, and pH — turning an invisible process into something you can follow.</p>
                </div>
                <div className={styles.appFeature}>
                  <span className={styles.appFeatureLabel}>Rewards</span>
                  <p className={styles.appFeatureDesc}>Progress bar toward the next reward. Earn perks redeemable at local grocery stores like Berkeley Bowl.</p>
                </div>
                <div className={styles.appFeature}>
                  <span className={styles.appFeatureLabel}>Mascot design</span>
                  <p className={styles.appFeatureDesc}>The cute illustrated worm character builds emotional connection — so residents feel like caretakers, not just users.</p>
                </div>
              </div>
              <div className={styles.appScreens}>
                <img src={`${BASE}/Group%204711.png`} alt="Berky app home screen annotated" className={styles.appScreenMain} />
              </div>
            </div>

            <div className={styles.appSecondary}>
              <img src={`${BASE}/image%203.png`} alt="Early app wireframes" className={styles.wireframeImg} />
              <img src={`${BASE}/reward%20details.png`} alt="Reward earned screen" className={styles.rewardImg} />
              <img src={`${BASE}/mockup%20berky.png`} alt="Berky app mockup" className={styles.mockupImg} />
            </div>
          </section>

          {/* Reflection */}
          <section id="reflection" ref={el => { sectionRefs.current['reflection'] = el }} className={`${styles.section} ${styles.sectionLast}`}>
            <span className={styles.sectionLabel}>Reflection</span>
            <h2 className={styles.sectionHeading}>Play versus practicality.</h2>
            <p className={styles.prose}>
              The core tension I kept running into was play versus practicality. I really wanted to design something playful and fun, but that was challenging due to the nature of composting and the assignment requirement of using technology.
            </p>
            <p className={styles.prose}>
              The whole premise of Berky was to make it feel fun and social — but there's a version of that thinking that becomes superficial fast. As a team, we had to really ask ourselves whether the playfulness was actually doing something: changing behavior, lowering friction, creating a reason to come back. Or was it just aesthetic justification for a concept we already liked? With studio critique and user research, we were confident in our final product being both delightful and purposeful.
            </p>

            <div className={styles.questBoard} aria-label="Reflection board">
              <div className={styles.questBoardNailTL} />
              <div className={styles.questBoardNailTR} />
              <div className={styles.questBoardNailBL} />
              <div className={styles.questBoardNailBR} />
              <div className={styles.questPaper}>
                <div className={styles.questTapeTop} />
                <p className={styles.questText}>
                  Learning to hold the tension between delight and utility is probably the most useful thing I took out of this project as a designer.
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
