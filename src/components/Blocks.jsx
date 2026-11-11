// Building blocks shared by several pages.
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useT, pick } from '../i18n.js'
import { media, contact, waLink } from '../media.js'
import { models } from '../models.js'
import { IconWA, IconPhone, IconArrow } from './icons.jsx'

export function ModelCard({ m, index }) {
  const { t, lang } = useT()
  return (
    <article className={`model model--${m.id}`} style={{ '--i': index }}>
      <Link to={`/models/${m.slug}`} className="model__media" aria-label={`Jetour ${m.name}`}>
        <img src={m.image} alt={`Jetour ${m.name}`} loading="lazy" referrerPolicy="no-referrer" />
        <span className="model__badge">{m.badge}</span>
      </Link>
      <div className="model__body">
        <p className="model__tag">{pick(m.tag, lang)}</p>
        <h3 className="model__name"><Link to={`/models/${m.slug}`}>{m.name}</Link></h3>
        <p className="model__blurb">{pick(m.blurb, lang)}</p>
        <dl className="model__specs">
          {m.specs.map((s) => (
            <div key={s.key}>
              <dd className="mono">{s.value}<span>{s.unit}</span></dd>
              <dt>{t.spec[s.key]}</dt>
            </div>
          ))}
        </dl>
        <div className="model__ctas">
          <a className="btn btn--gold" href={`tel:${contact.phoneTel}`}><IconPhone />{t.cta.price}</a>
          <Link className="btn btn--icon" to={`/models/${m.slug}`} aria-label={`${t.common.explore}: Jetour ${m.name}`}><IconArrow /></Link>
        </div>
      </div>
    </article>
  )
}

// Plays the desktop or the mobile cut of a video, depending on screen width.
export function ResponsiveVideo({ desktop, mobile, poster, className }) {
  const [src, setSrc] = useState(null)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)')
    const set = () => setSrc(mq.matches && mobile ? mobile : desktop)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [desktop, mobile])
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return <img className={className} src={poster} alt="" referrerPolicy="no-referrer" />
  }
  return src ? <video key={src} className={className} src={src} poster={poster} autoPlay muted loop playsInline preload="auto" /> : null
}

export function TestDriveForm({ initialModel }) {
  const { t } = useT()
  const [params] = useSearchParams()
  const fromQuery = models.find((m) => m.slug === params.get('model'))?.name
  const [f, setF] = useState({ name: '', phone: '', model: initialModel || fromQuery || 'T2 i-DM', day: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    window.open(waLink(t.drive.msg(f)), '_blank', 'noopener')
  }
  return (
    <form className="drive__form" onSubmit={submit} data-reveal>
      <label className="field">
        <span>{t.drive.name}</span>
        <input required value={f.name} onChange={set('name')} autoComplete="name" />
      </label>
      <label className="field">
        <span>{t.drive.phone}</span>
        <input required type="tel" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="01XXX-XXXXXX" />
      </label>
      <fieldset className="field">
        <legend>{t.drive.model}</legend>
        <div className="seg">
          {models.map((m) => (
            <label key={m.id} className={f.model === m.name ? 'is-on' : ''}>
              <input type="radio" name="model" value={m.name} checked={f.model === m.name} onChange={set('model')} />
              {m.name}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="field">
        <span>{t.drive.day}</span>
        <input type="date" value={f.day} onChange={set('day')} />
      </label>
      <button className="btn btn--gold btn--block" type="submit"><IconWA />{t.drive.send}</button>
    </form>
  )
}

export function ShowroomMap() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`
  return (
    <div className="showroom__map" data-mx="photo">
      <iframe title="Map: Jetour Bangladesh showroom" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  )
}

export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapQuery)}`

export function ContactList() {
  return (
    <ul className="showroom__contact">
      <li><a href={`tel:${contact.phoneTel}`}><IconPhone />{contact.phoneDisplay}</a></li>
      <li><a href={waLink('Hello Jetour Bangladesh')} target="_blank" rel="noreferrer"><IconWA />WhatsApp</a></li>
      <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
    </ul>
  )
}

// Closing call-to-action band used at the bottom of model pages.
export function CtaBand({ m }) {
  const { t } = useT()
  return (
    <section className="ctaband">
      <div className="ctaband__bg" aria-hidden="true">
        <img src={m.gallery[0]} alt="" loading="lazy" referrerPolicy="no-referrer" />
      </div>
      <div className="container ctaband__inner" data-reveal>
        <h2 className="h1">{t.modelPage.ctaTitle(m.name)}</h2>
        <p className="lead">{t.modelPage.ctaBody}</p>
        <div className="hero__ctas">
          <a className="btn btn--gold" href={`tel:${contact.phoneTel}`}><IconPhone />{t.cta.price}</a>
          <Link className="btn btn--light" to={`/test-drive?model=${m.slug}`}>{t.hero.drive}<IconArrow /></Link>
          <a className="btn btn--ghost" href={waLink(t.drive.priceMsg(`Jetour ${m.name}`))} target="_blank" rel="noreferrer"><IconWA />{t.cta.whatsapp}</a>
        </div>
      </div>
    </section>
  )
}

export function usePageTitle(title) {
  const prev = useRef(document.title)
  useEffect(() => {
    document.title = title ? `${title} · Jetour Bangladesh` : 'Jetour Bangladesh · Concept demo by Braingig'
    return () => { document.title = prev.current }
  }, [title])
}

export { media }
