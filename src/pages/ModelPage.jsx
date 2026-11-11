import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT, pick } from '../i18n.js'
import { contact, waLink, media } from '../media.js'
import { modelBySlug, models } from '../models.js'
import { reduceMotion, scrollToId } from '../hooks/motion.js'
import Spin360 from '../components/Spin360.jsx'
import TripPlanner from '../components/TripPlanner.jsx'
import { ResponsiveVideo, CtaBand, ModelCard, usePageTitle } from '../components/Blocks.jsx'
import { IconPhone, IconWA, IconArrow, IconBolt, IconFuel, IconPlug } from '../components/icons.jsx'
import NotFound from './NotFound.jsx'

gsap.registerPlugin(ScrollTrigger)

// Height of the sticky header + model sub-nav on desktop. Pinned sections start below it.
const CHROME_DESKTOP = 136

/* =====================================================================
   Scroll motion for model pages
   - Section headings rise in line by line
   - Design rail: pinned on desktop, cards slide sideways as you scroll,
     each card's photo wipes open as it arrives (containerAnimation)
   - i-DM: pinned on desktop, scrolling steps through the three drive modes
   - Interior, features, safety, specs, stats, gallery: their own reveals
   ===================================================================== */
function useModelMotion(rootRef, slug, setIdmStep) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (reduceMotion()) return

    const mm = gsap.matchMedia()
    mm.add({ desktop: '(min-width: 821px)', mobile: '(max-width: 820px)' }, (ctx) => {
      const { desktop } = ctx.conditions
      const q = (sel) => gsap.utils.toArray(root.querySelectorAll(sel))
      const ease = 'expo.out'

      /* ---- 1. Section heads ---- */
      q('[data-mx="head"]').forEach((head) => {
        gsap.from(head.children, {
          yPercent: 40, opacity: 0, duration: 1.1, ease, stagger: 0.09,
          scrollTrigger: { trigger: head, start: 'top 85%', once: true },
        })
      })

      /* ---- 2. Overview: copy + counting stats ---- */
      q('[data-mx="fade"]').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 1, ease, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
      q('.statstrip').forEach((strip) => {
        const cells = strip.querySelectorAll(':scope > div')
        gsap.from(cells, { y: 40, opacity: 0, duration: 1, ease, stagger: 0.08, scrollTrigger: { trigger: strip, start: 'top 85%', once: true } })
        strip.querySelectorAll('[data-count]').forEach((el) => {
          const raw = el.dataset.count
          const target = parseFloat(raw.replace(/,/g, ''))
          if (Number.isNaN(target)) return
          const decimals = (raw.split('.')[1] || '').length
          const commas = raw.includes(',')
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target, duration: 1.6, ease: 'power3.out',
            scrollTrigger: { trigger: strip, start: 'top 85%', once: true },
            onUpdate: () => {
              const n = obj.v.toFixed(decimals)
              el.textContent = commas ? Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals }) : n
            },
            onComplete: () => { el.textContent = raw },
          })
        })
      })

      /* ---- 3. Design rail (and any other pinned rail) ---- */
      q('[data-mx="rail"]').forEach((sec) => {
        const track = sec.querySelector('.rail__track')
        const items = gsap.utils.toArray(track.querySelectorAll('.rail__item'))
        const bar = sec.querySelector('.rail__progress span')
        const counter = sec.querySelector('[data-mx="rail-count"]')

        if (desktop) {
          sec.classList.add('is-pinned')
          const dist = () => Math.max(0, track.scrollWidth - track.clientWidth)
          const slide = gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: `top ${CHROME_DESKTOP}px`,
              end: () => `+=${dist() + window.innerHeight * 0.35}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (bar) bar.style.transform = `scaleX(${self.progress})`
                if (counter) counter.textContent = `0${Math.min(items.length, Math.floor(self.progress * items.length) + 1)}`
              },
            },
          })

          items.forEach((it, i) => {
            const frame = it.querySelector('.rail__img')
            const pic = frame.querySelector('img')
            const cap = it.querySelector('figcaption')
            if (i === 0) {
              // The first card is on screen when the pin starts: reveal it on entry.
              const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 70%', once: true } })
              tl.fromTo(frame, { clipPath: 'inset(14% 14% 14% 14% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.4, ease })
                .fromTo(pic, { scale: 1.3 }, { scale: 1, duration: 1.6, ease }, 0)
                .from(cap.children, { y: 24, opacity: 0, duration: 0.9, ease, stagger: 0.06 }, 0.35)
            } else {
              // Each card opens while it slides in; the last one finishes exactly as the rail stops.
              const last = i === items.length - 1
              const st = { trigger: it, containerAnimation: slide, start: 'left 100%', end: last ? 'left 52%' : 'left 45%', scrub: true }
              gsap.fromTo(frame, { clipPath: 'inset(10% 0% 10% 60% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', ease: 'none', scrollTrigger: st })
              gsap.fromTo(pic, { scale: 1.35, xPercent: -12 }, { scale: 1, xPercent: 0, ease: 'none', scrollTrigger: st })
              gsap.from(cap.children, { y: 28, opacity: 0, stagger: 0.08, ease: 'none', scrollTrigger: { ...st, start: 'left 80%', end: last ? 'left 56%' : 'left 50%' } })
            }
          })
          return () => sec.classList.remove('is-pinned')
        }

        // Mobile: swipe rail, each card wipes up as it scrolls into view.
        items.forEach((it) => {
          const frame = it.querySelector('.rail__img')
          gsap.timeline({ scrollTrigger: { trigger: sec.querySelector('.rail__track'), start: 'top 85%', once: true } })
            .fromTo(frame, { clipPath: 'inset(100% 0% 0% 0% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.2, ease })
            .fromTo(frame.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1.4, ease }, 0)
            .from(it.querySelector('figcaption').children, { y: 20, opacity: 0, duration: 0.8, ease, stagger: 0.06 }, 0.3)
        })
        return undefined
      })

      /* ---- 4. i-DM: pinned stepper through Electric → Hybrid → Charging ---- */
      const idmStage = root.querySelector('[data-mx="idm"]')
      if (idmStage) {
        const modes = gsap.utils.toArray(idmStage.querySelectorAll('.idm__mode'))
        const viz = idmStage.querySelector('.idmviz')
        gsap.from(viz, { y: 50, opacity: 0, duration: 1.2, ease, scrollTrigger: { trigger: idmStage, start: 'top 75%', once: true } })
        // Animate the cards' contents, not the cards: the cards' own CSS transitions show the active step.
        gsap.from(modes.map((el) => el.children), { x: desktop ? 50 : 0, y: desktop ? 0 : 24, opacity: 0, duration: 1, ease, stagger: 0.08, scrollTrigger: { trigger: idmStage, start: 'top 70%', once: true } })

        if (desktop) {
          const bar = idmStage.querySelector('.idm__progress span')
          ScrollTrigger.create({
            trigger: idmStage,
            start: `top ${CHROME_DESKTOP}px`,
            end: () => `+=${window.innerHeight * 2.2}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setIdmStep(Math.min(modes.length - 1, Math.floor(self.progress * modes.length * 0.999)))
              if (bar) bar.style.transform = `scaleY(${self.progress})`
            },
          })
        } else {
          modes.forEach((el, i) => {
            ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 40%', onToggle: (s) => s.isActive && setIdmStep(i) })
          })
        }
      }

      /* ---- 5. Power cards (engine, transmission, battery): staggered wipe ---- */
      q('[data-mx="cards"]').forEach((grid) => {
        const cards = grid.querySelectorAll('.pcard')
        cards.forEach((c, i) => {
          const frame = c.querySelector('.pcard__img')
          gsap.timeline({ scrollTrigger: { trigger: grid, start: 'top 80%', once: true }, delay: i * 0.12 })
            .fromTo(frame, { clipPath: 'inset(0% 0% 100% 0% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.2, ease: 'power4.inOut' })
            .fromTo(frame.querySelector('img'), { scale: 1.3, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.6, ease }, 0)
            .from(c.querySelectorAll('.pcard__body > *'), { y: 24, opacity: 0, duration: 0.8, ease, stagger: 0.06 }, 0.5)
        })
      })

      /* ---- 6. Interior bento: tiles open from the bottom, photo settles ---- */
      q('.ibento').forEach((grid) => {
        grid.querySelectorAll('.ibento__tile').forEach((tile, i) => {
          gsap.timeline({ scrollTrigger: { trigger: tile, start: 'top 88%', once: true }, delay: (i % 2) * 0.1 })
            .fromTo(tile, { clipPath: 'inset(100% 0% 0% 0% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.3, ease: 'power4.inOut' })
            .fromTo(tile.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1.8, ease }, 0)
            .from(tile.querySelector('figcaption'), { y: 20, opacity: 0, duration: 0.8, ease }, 0.6)
        })
      })

      /* ---- 7. Feature + safety cards: batched, row by row ---- */
      ScrollTrigger.batch(q('.fcard'), {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          batch.forEach((card, i) => {
            const frame = card.querySelector('.fcard__img')
            gsap.timeline({ delay: i * 0.1 })
              .fromTo(frame, { clipPath: 'inset(0% 100% 0% 0% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.1, ease: 'power4.inOut' })
              .fromTo(frame.querySelector('img'), { scale: 1.2 }, { scale: 1, duration: 1.4, ease }, 0)
              .fromTo(card.querySelectorAll('h3, p'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease, stagger: 0.06 }, 0.45)
          })
        },
      })
      gsap.set(q('.fcard h3, .fcard p'), { opacity: 0 })
      gsap.set(q('.fcard__img'), { clipPath: 'inset(0% 100% 0% 0% round 14px)' })

      /* ---- 8. Gallery: photos drift at different speeds ---- */
      q('.gallery__item').forEach((fig, i) => {
        gsap.fromTo(fig.querySelector('img'), { yPercent: -10, scale: 1.15 }, {
          yPercent: 10, scale: 1.15, ease: 'none',
          scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.from(fig, { y: 60 + i * 30, opacity: 0, duration: 1.2, ease, scrollTrigger: { trigger: fig, start: 'top 92%', once: true } })
      })

      /* ---- 9. Spec tables: rows slide in ---- */
      q('.specs__group').forEach((g) => {
        gsap.from(g.querySelector('h3'), { y: 20, opacity: 0, duration: 0.8, ease, scrollTrigger: { trigger: g, start: 'top 85%', once: true } })
        gsap.from(g.querySelectorAll('dl > div'), {
          x: -24, opacity: 0, duration: 0.7, ease, stagger: 0.04,
          scrollTrigger: { trigger: g, start: 'top 82%', once: true },
        })
      })

      /* ---- 10. CTA band: background zooms out as it scrolls past ---- */
      q('.ctaband').forEach((band) => {
        gsap.fromTo(band.querySelector('.ctaband__bg img'), { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true } })
      })

      /* ---- 11. Anything else marked data-reveal (360 viewer, trip planner, other models) ---- */
      q('[data-reveal]').forEach((el) => {
        const i = Number(getComputedStyle(el).getPropertyValue('--i')) || 0
        gsap.from(el, { y: 30, opacity: 0, duration: 0.9, ease, delay: i * 0.07, scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })

      return undefined
    })

    // Images load late and change heights: recalculate pins once things settle.
    const refresh = () => ScrollTrigger.refresh()
    const t1 = setTimeout(refresh, 500)
    const t2 = setTimeout(refresh, 1800)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(t1); clearTimeout(t2)
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps
}

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

// Design rail: pinned and scrubbed sideways on desktop, swipeable on phones.
function DesignRail({ id, over, block }) {
  const { lang } = useT()
  const n = block.items.length
  return (
    <section className="section rail" id={id} data-mx="rail">
      <div className="container rail__head">
        <div data-mx="head">
          <p className="overline">{over}</p>
          <h2 className="h1">{pick(block.title, lang)}</h2>
        </div>
        <p className="rail__count mono" aria-hidden="true"><span data-mx="rail-count">01</span> / 0{n}</p>
      </div>
      <div className="rail__track">
        {block.items.map((it, i) => (
          <figure key={i} className="rail__item">
            <div className="rail__img"><img src={it.img} alt={pick(it.title, lang)} loading="lazy" referrerPolicy="no-referrer" /></div>
            <figcaption>
              <span className="mono">0{i + 1}</span>
              <strong>{pick(it.title, lang)}</strong>
              {it.text && <p>{pick(it.text, lang)}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="container rail__foot" aria-hidden="true">
        <div className="rail__progress"><span /></div>
      </div>
    </section>
  )
}

// The live graphic beside the i-DM modes: what the battery and engine are doing.
function IdmViz({ step }) {
  const { t } = useT()
  const v = t.modelPage.idmViz
  const battery = [100, 55, 80][step]
  const engineOn = step === 1
  return (
    <div className={`idmviz idmviz--${['ev', 'hev', 'charge'][step]}`} aria-live="polite">
      <div className="idmviz__car">
        <img src={media.t2.side} alt="Jetour T2 i-DM" referrerPolicy="no-referrer" loading="lazy" />
        <span className="idmviz__flow idmviz__flow--ev" aria-hidden="true" />
        <span className="idmviz__flow idmviz__flow--fuel" aria-hidden="true" />
        <span className="idmviz__plug" aria-hidden="true"><IconPlug /></span>
      </div>
      <div className="idmviz__meters">
        <div className="meter meter--ev">
          <div className="meter__top"><span><IconBolt />{v.battery}</span><b className="mono">{battery}%</b></div>
          <div className="meter__bar"><i style={{ transform: `scaleX(${battery / 100})` }} /></div>
        </div>
        <div className={`meter meter--fuel ${engineOn ? 'is-on' : ''}`}>
          <div className="meter__top"><span><IconFuel />{v.engine}</span><b className="mono">{engineOn ? v.on : v.off}</b></div>
          <div className="meter__bar"><i style={{ transform: `scaleX(${engineOn ? 1 : 0})` }} /></div>
        </div>
      </div>
      <p className="idmviz__state">{v.states[step]}</p>
    </div>
  )
}

function IdmExplainer({ m, step }) {
  const { t, lang } = useT()
  const icons = { ev: <IconBolt />, hev: <IconFuel />, charge: <IconPlug /> }
  return (
    <section className="idm" id="idm">
      <div className="idm__stage" data-mx="idm">
        <div className="container idm__grid">
          <div className="idm__copy">
            <div data-mx="head">
              <p className="overline overline--accent">{t.sub.idm}</p>
              <h2 className="h1">{t.modelPage.idmTitle}</h2>
              <p className="lead">{t.modelPage.idmBody}</p>
            </div>
            <IdmViz step={step} />
          </div>
          <div className="idm__side">
            <div className="idm__progress" aria-hidden="true"><span /></div>
            <ol className="idm__modes">
              {m.idm.modes.map((md, i) => (
                <li key={md.key} className={`idm__mode idm__mode--${md.key} ${step === i ? 'is-active' : ''} ${step > i ? 'is-past' : ''}`}>
                  <span className="idm__icon">{icons[md.key]}</span>
                  <div>
                    <span className="idm__n mono">0{i + 1}</span>
                    <h3>{pick(md.title, lang)}</h3>
                    <p>{pick(md.text, lang)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <PowerCards block={m.power} />
    </section>
  )
}

function PowerCards({ block }) {
  const { lang } = useT()
  return (
    <div className="section power" id="power">
      <div className="container">
        <div className="section-head" data-mx="head">
          <p className="overline">i-DM</p>
          <h2 className="h1">{pick(block.title, lang)}</h2>
        </div>
        <div className="power__grid" data-mx="cards">
          {block.items.map((it, i) => (
            <article key={i} className="pcard">
              <div className="pcard__img"><img src={it.img} alt={pick(it.title, lang)} loading="lazy" referrerPolicy="no-referrer" /></div>
              <div className="pcard__body">
                <span className="mono">0{i + 1}</span>
                <h3>{pick(it.title, lang)}</h3>
                <p>{pick(it.text, lang)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
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
  useModelMotion(ref, slug, setIdmStep)
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
