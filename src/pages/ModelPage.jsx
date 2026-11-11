import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { useT, pick } from '../i18n.js'
import { contact, waLink } from '../media.js'
import { modelBySlug, models } from '../models.js'
import { reduceMotion, scrollToId } from '../hooks/motion.js'
import Spin360 from '../components/Spin360.jsx'
import TripPlanner from '../components/TripPlanner.jsx'
import { ResponsiveVideo, CtaBand, ModelCard, usePageTitle } from '../components/Blocks.jsx'
import { IconPhone, IconWA, IconArrow } from '../components/icons.jsx'
import { DesignRail, IdmExplainer } from '../components/Sections.jsx'
import { useSectionMotion } from '../hooks/useSectionMotion.js'
import NotFound from './NotFound.jsx'

/* ===================================================================== */

function ModelHero({ m }) {
  const { t, lang } = useT()
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.mhero__name', { yPercent: 40, opacity: 0, duration: 1.3, ease: 'expo.out', delay: 0.15 })
      gsap.from('[data-hero-fade]', { y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.5 })
      gsap.to('.mhero__media', { yPercent: 10, scale: 1.06, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [m.id])
  return (
    <section className="mhero" ref={ref}>
      <div className="mhero__media" aria-hidden="true">
        <ResponsiveVideo desktop={m.m.video} mobile={m.m.videoMobile} poster={m.image} />
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="container mhero__content">
        <p className="overline" data-hero-fade>{pick(m.tag, lang)}</p>
        <h1 className="display mhero__name">{m.name}</h1>
        <p className="hero__sub" data-hero-fade>{pick(m.headline, lang)}</p>
        <div className="hero__ctas" data-hero-fade>
          <a className="btn btn--gold" href={`tel:${contact.phoneTel}`}><IconPhone />{t.cta.price}</a>
          <Link className="btn btn--ghost" to={`/test-drive?model=${m.slug}`}>{t.hero.drive}</Link>
          <a className="btn btn--icon btn--ghost" href={waLink(t.drive.priceMsg(`Jetour ${m.name}`))} target="_blank" rel="noreferrer" aria-label={`${t.cta.whatsapp}: Jetour ${m.name}`}><IconWA /></a>
        </div>
      </div>
      <dl className="container mhero__specs" data-hero-fade>
        {m.stats.slice(0, 3).map((s) => (
          <div key={s.value + s.unit}>
            <dd className="mono">{s.value}<span>{s.unit}</span></dd>
            <dt>{pick(s.label, lang)}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

function SubNav({ m, sections }) {
  const { t } = useT()
  const [active, setActive] = useState(sections[0])
  useEffect(() => {
    const els = sections.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
    }, { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [sections])
  return (
    <div className="subnav">
      <div className="subnav__inner">
        <strong className="subnav__name">{m.name}</strong>
        <nav aria-label={`${m.name} sections`}>
          {sections.map((id) => (
            <button key={id} type="button" className={active === id ? 'is-on' : ''} onClick={() => scrollToId(id, -120)}>{t.sub[id]}</button>
          ))}
        </nav>
        <a className="btn btn--gold btn--sm" href={`tel:${contact.phoneTel}`}>{t.cta.price}</a>
      </div>
    </div>
  )
}

function Overview({ m }) {
  const { t, lang } = useT()
  return (
    <section className="section overview" id="overview">
      <div className="container overview__grid">
        <div data-mx="head">
          <p className="overline">{t.sub.overview}</p>
          <h2 className="h2">{pick(m.headline, lang)}</h2>
        </div>
        <div data-mx="fade">
          <p className="lead overview__lead">{pick(m.intro, lang)}</p>
          {m.colours && (
            <div className="colours">
              <p className="label">{t.common.colours}</p>
              <ul>{m.colours.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          )}
        </div>
      </div>
      <dl className="container statstrip">
        {m.stats.map((s, i) => (
          <div key={i}>
            <dd className="mono"><span data-count={s.value}>{s.value}</span><span>{s.unit}</span></dd>
            <dt>{pick(s.label, lang)}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

function InteriorBento({ m }) {
  const { t, lang } = useT()
  return (
    <section className="section interior" id="interior">
      <div className="container">
        <div className="section-head" data-mx="head">
          <p className="overline">{t.sub.interior}</p>
          <h2 className="h1">{pick(m.interior.title, lang)}</h2>
        </div>
        <div className="ibento">
          {m.interior.items.map((it, i) => (
            <figure key={i} className={`ibento__tile ib${i + 1}`}>
              <img src={it.img} alt={pick(it.title, lang)} loading="lazy" referrerPolicy="no-referrer" />
              <figcaption>{pick(it.title, lang)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureGrid({ id, over, block, cols = 3 }) {
  const { lang } = useT()
  return (
    <section className={`section fgrid fgrid--${id}`} id={id}>
      <div className="container">
        <div className="section-head" data-mx="head">
          <p className="overline">{over}</p>
          <h2 className="h1">{pick(block.title, lang)}</h2>
        </div>
        <div className="fgrid__grid" style={{ '--cols': cols }}>
          {block.items.map((it, i) => (
            <article key={i} className="fcard">
              <div className="fcard__img"><img src={it.img} alt={pick(it.title, lang)} loading="lazy" referrerPolicy="no-referrer" /></div>
              <h3>{pick(it.title, lang)}</h3>
              {it.text && <p>{pick(it.text, lang)}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery({ m }) {
  const { t } = useT()
  return (
    <section className="gallery">
      <div className="container">
        <div className="section-head" data-mx="head">
          <p className="overline">{t.modelPage.gallery}</p>
        </div>
      </div>
      <div className="gallery__grid">
        {m.gallery.map((src, i) => (
          <figure key={i} className={`gallery__item g${i + 1}`}>
            <img src={src} alt={`Jetour ${m.name}`} loading="lazy" referrerPolicy="no-referrer" />
          </figure>
        ))}
      </div>
    </section>
  )
}

function Specs({ m }) {
  const { t, lang } = useT()
  return (
    <section className="section specs" id="specs">
      <div className="container specs__grid">
        <div className="specs__head" data-mx="head">
          <p className="overline">{t.sub.specs}</p>
          <h2 className="h2">{t.common.specs}</h2>
          <p className="fine">{t.common.specNote}</p>
          <p className="specs__price">{t.common.priceNote}</p>
          <div className="hero__ctas">
            <a className="btn btn--gold" href={`tel:${contact.phoneTel}`}><IconPhone />{t.cta.price}</a>
            <a className="btn btn--icon" href={waLink(t.drive.priceMsg(`Jetour ${m.name}`))} target="_blank" rel="noreferrer" aria-label={t.cta.whatsapp}><IconWA /></a>
          </div>
        </div>
        <div className="specs__tables">
          {m.specTable.map((g, gi) => (
            <div key={gi} className="specs__group">
              <h3>{pick(g.group, lang)}</h3>
              <dl>
                {g.rows.map(([k, v], i) => (
                  <div key={i}><dt>{pick(k, lang)}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OtherModels({ m }) {
  const { t } = useT()
  const others = models.filter((x) => x.id !== m.id)
  return (
    <section className="section others">
      <div className="container">
        <div className="section-head section-head--row" data-mx="head">
          <h2 className="h2">{t.common.otherModels}</h2>
          <Link to="/models" className="btn btn--ghost">{t.common.compare}<IconArrow /></Link>
        </div>
        <div className="others__grid">
          {others.map((x, i) => <ModelCard key={x.id} m={x} index={i} />)}
        </div>
      </div>
    </section>
  )
}

export default function ModelPage() {
  const { slug } = useParams()
  const m = modelBySlug(slug)
  const { t } = useT()
  const ref = useRef(null)
  const [idmStep, setIdmStep] = useState(0)
  usePageTitle(m?.name)
  useSectionMotion(ref, slug, { chrome: 136, setIdmStep })
  if (!m) return <NotFound />

  const isT2 = m.id === 't2'
  const sections = isT2
    ? ['overview', 'design', 'idm', 'interior', 'features', 'safety', 'specs']
    : ['overview', 'design', 'interior', 'features', 'safety', 'specs']

  return (
    <div ref={ref} key={slug} className={`mpage mpage--${m.id}`}>
      <ModelHero m={m} />
      <SubNav m={m} sections={sections} />
      <Overview m={m} />
      <DesignRail id="design" over={t.sub.design} block={m.design} />
      {isT2 && <Spin360 />}
      {isT2 && <IdmExplainer m={m} step={idmStep} />}
      {isT2 && <TripPlanner />}
      <InteriorBento m={m} />
      <FeatureGrid id="features" over={t.sub.features} block={m.features} cols={3} />
      <FeatureGrid id="safety" over={t.sub.safety} block={m.safety} cols={m.safety.items.length === 4 ? 4 : m.safety.items.length} />
      <Gallery m={m} />
      <Specs m={m} />
      <CtaBand m={m} />
      <OtherModels m={m} />
    </div>
  )
}
