import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useT } from '../i18n.js'
import { media } from '../media.js'
import { models } from '../models.js'
import { reduceMotion, scrollToId } from '../hooks/motion.js'
import { useSectionMotion } from '../hooks/useSectionMotion.js'
import { DesignRail, IdmExplainer } from '../components/Sections.jsx'
import Spin360 from '../components/Spin360.jsx'
import TripPlanner from '../components/TripPlanner.jsx'
import { ModelCard, TestDriveForm, ShowroomMap, ContactList, directionsHref, usePageTitle } from '../components/Blocks.jsx'
import { IconArrow } from '../components/icons.jsx'

function Hero() {
  const { t } = useT()
  const ref = useRef(null)
  const reduce = reduceMotion()
  useEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.from('.hero__line > span', { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.12, delay: 0.2 })
      gsap.from('[data-hero-fade]', { y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.6 })
      gsap.to('.hero__media', {
        yPercent: 12, scale: 1.08, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [reduce])
  return (
    <section className="hero" ref={ref}>
      <div className="hero__media" aria-hidden="true">
        {reduce
          ? <img src={media.heroPoster} alt="" referrerPolicy="no-referrer" />
          : <video src={media.heroVideo} autoPlay muted loop playsInline preload="auto" />}
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__content container">
        <p className="overline" data-hero-fade>{t.hero.over}</p>
        <h1 className="display">
          <span className="hero__line"><span>{t.hero.title1}</span></span>
          <span className="hero__line"><span>{t.hero.title2}</span></span>
        </h1>
        <p className="hero__sub" data-hero-fade>{t.hero.sub}</p>
        <div className="hero__ctas" data-hero-fade>
          <button type="button" className="btn btn--light" onClick={() => scrollToId('models')}>{t.hero.explore}<IconArrow /></button>
          <Link to="/test-drive" className="btn btn--ghost">{t.hero.drive}</Link>
        </div>
      </div>
      <div className="hero__foot container" data-hero-fade>
        <span className="hero__slogan">Drive Your Future</span>
        <span className="hero__scroll">{t.hero.scroll}<i /></span>
      </div>
    </section>
  )
}

function Lineup() {
  const { t } = useT()
  return (
    <section className="lineup section" id="models">
      <div className="container">
        <div className="section-head section-head--row" data-mx="head">
          <div>
            <p className="overline">{t.lineup.over}</p>
            <h2 className="h1">{t.lineup.title}</h2>
          </div>
          <Link to="/models" className="btn btn--ghost">{t.common.compare}<IconArrow /></Link>
        </div>
        <div className="lineup__grid">
          {models.map((m, i) => <ModelCard key={m.id} m={m} index={i} />)}
        </div>
        <p className="fine lineup__note">{t.lineup.note}</p>
      </div>
    </section>
  )
}

function Travel() {
  const { t } = useT()
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.travel__img img', { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section className="travel" ref={ref}>
      <div className="travel__img" aria-hidden="true">
        <img src={media.travel.coast} alt="" loading="lazy" referrerPolicy="no-referrer" />
      </div>
      <div className="travel__scrim" aria-hidden="true" />
      <div className="container travel__content" data-reveal>
        <p className="overline overline--accent">{t.travel.over}</p>
        <blockquote className="travel__quote">{t.travel.quote}</blockquote>
        <p className="lead">{t.travel.body}</p>
      </div>
    </section>
  )
}

// "Made for the journey": the same pinned, sideways rail as the model pages' design section.
function Journey() {
  const { t } = useT()
  const block = {
    title: t.bento.title,
    items: [
      { img: media.dashing.rear, title: t.bento.a, text: 'Jetour Dashing' },
      { img: media.t2.forest, title: t.bento.d, text: 'Jetour T2 i-DM' },
      { img: media.x70.family, title: t.bento.c, text: 'Jetour X70 Plus' },
      { img: media.dashing.interior, title: t.bento.b, text: 'Jetour Dashing' },
      { img: media.t2.mountain, title: t.bento.e, text: 'Jetour T2 i-DM' },
    ],
  }
  return <DesignRail id="journey" over={t.bento.over} block={block} />
}

function Trust() {
  const { t } = useT()
  return (
    <section className="trust section">
      <div className="container trust__grid">
        <div data-mx="head">
          <p className="overline">{t.trust.over}</p>
          <h2 className="h2">{t.trust.title}</h2>
        </div>
        <ol className="trust__list" data-mx="list">
          {t.trust.items.map(([h, p], i) => (
            <li key={h}>
              <span className="mono trust__n">0{i + 1}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function DriveSection() {
  const { t } = useT()
  return (
    <section className="drive section" id="drive">
      <div className="container drive__grid">
        <div className="drive__copy">
          <div data-mx="head">
            <p className="overline overline--accent">{t.drive.over}</p>
            <h2 className="h1">{t.drive.title}</h2>
            <p className="lead">{t.drive.body}</p>
          </div>
          <div className="drive__imgwrap" data-mx="photo">
            <img src={media.dashing.street} alt="Jetour Dashing" loading="lazy" referrerPolicy="no-referrer" className="drive__img" />
          </div>
        </div>
        <TestDriveForm />
      </div>
    </section>
  )
}

function ShowroomSection() {
  const { t } = useT()
  return (
    <section className="showroom section" id="showroom">
      <div className="container showroom__grid">
        <div>
          <div data-mx="head">
            <p className="overline">{t.showroom.over}</p>
            <h2 className="h2">{t.showroom.title}</h2>
          </div>
          <p className="showroom__status"><i />{t.showroom.status}</p>
          <address className="showroom__addr">218/B Bir Uttam Mir Shawkat Sarak, Tejgaon-Gulshan Link Road, Dhaka</address>
          <ContactList />
          <div className="hero__ctas">
            <a className="btn btn--ghost" href={directionsHref} target="_blank" rel="noreferrer">{t.showroom.directions}<IconArrow /></a>
            <Link className="btn btn--ghost" to="/showroom">{t.common.explore}</Link>
          </div>
        </div>
        <ShowroomMap />
      </div>
    </section>
  )
}

export default function Home() {
  const ref = useRef(null)
  const [idmStep, setIdmStep] = useState(0)
  usePageTitle(null)
  useSectionMotion(ref, 'home', { chrome: 76, setIdmStep })
  const t2 = models.find((m) => m.id === 't2')
  return (
    <div ref={ref}>
      <Hero />
      <Lineup />
      <Journey />
      <Spin360 />
      <IdmExplainer m={t2} step={idmStep} showPower={false} />
      <TripPlanner />
      <Travel />
      <Trust />
      <DriveSection />
      <ShowroomSection />
    </div>
  )
}
