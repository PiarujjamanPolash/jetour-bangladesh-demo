import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n.js'
import { contact } from '../media.js'
import { useSectionMotion } from '../hooks/useSectionMotion.js'
import { ShowroomMap, ContactList, directionsHref, usePageTitle } from '../components/Blocks.jsx'
import { IconArrow } from '../components/icons.jsx'

function Faq() {
  const { t } = useT()
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {t.showroomPage.faq.map(([q, a], i) => (
        <div key={q} className={`faq__item ${open === i ? 'is-open' : ''}`} data-reveal style={{ '--i': i }}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{q}</span><i aria-hidden="true" />
          </button>
          <div className="faq__a"><p>{a}</p></div>
        </div>
      ))}
    </div>
  )
}

export default function Showroom() {
  const { t } = useT()
  const ref = useRef(null)
  usePageTitle(t.nav.showroom)
  useSectionMotion(ref, 'showroom')
  return (
    <div ref={ref} className="page">
      <header className="pagehead container">
        <p className="overline" data-reveal>{t.showroom.over}</p>
        <h1 className="h1 pagehead__title" data-reveal>{t.showroom.title}</h1>
        <p className="showroom__status" data-reveal><i />{t.showroom.status}</p>
      </header>

      <section className="section section--tight">
        <div className="container showroom__grid">
          <div className="showroom__cards">
            <div className="infocard" data-reveal>
              <p className="label">{t.showroom.over}</p>
              <address className="showroom__addr">{contact.address}</address>
              <a className="btn btn--ghost btn--sm" href={directionsHref} target="_blank" rel="noreferrer">{t.showroom.directions}<IconArrow /></a>
            </div>
            <div className="infocard" data-reveal style={{ '--i': 1 }}>
              <p className="label">{t.showroomPage.hours}</p>
              <p className="infocard__big">{t.showroomPage.hoursValue}</p>
            </div>
            <div className="infocard" data-reveal style={{ '--i': 2 }}>
              <p className="label">{t.showroomPage.contact}</p>
              <ContactList />
              <Link className="btn btn--gold btn--sm" to="/test-drive">{t.hero.drive}</Link>
            </div>
          </div>
          <ShowroomMap />
        </div>
      </section>

      <section className="section">
        <div className="container faq__grid">
          <h2 className="h2" data-reveal>{t.showroomPage.faqTitle}</h2>
          <Faq />
        </div>
      </section>
    </div>
  )
}
