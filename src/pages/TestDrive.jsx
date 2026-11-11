import { useRef } from 'react'
import { useT } from '../i18n.js'
import { media, contact } from '../media.js'
import { useReveal } from '../hooks/motion.js'
import { TestDriveForm, ContactList, usePageTitle } from '../components/Blocks.jsx'

export default function TestDrive() {
  const { t } = useT()
  const ref = useRef(null)
  usePageTitle(t.nav.drive)
  useReveal(ref, [])
  return (
    <div ref={ref} className="page page--drive">
      <div className="page__bg" aria-hidden="true">
        <img src={media.t2.night} alt="" referrerPolicy="no-referrer" />
      </div>
      <section className="section">
        <div className="container drive__grid">
          <div className="drive__copy">
            <p className="overline overline--accent" data-reveal>{t.drive.over}</p>
            <h1 className="h1" data-reveal>{t.drive.title}</h1>
            <p className="lead" data-reveal>{t.drive.body}</p>
            <ol className="steps">
              {t.drivePage.steps.map(([h, p], i) => (
                <li key={h} data-reveal style={{ '--i': i }}>
                  <span className="mono">0{i + 1}</span>
                  <div><h3>{h}</h3><p>{p}</p></div>
                </li>
              ))}
            </ol>
            <p className="fine">{t.drivePage.bring}</p>
            <address className="showroom__addr" data-reveal>{contact.address}</address>
            <ContactList />
          </div>
          <TestDriveForm />
        </div>
      </section>
    </div>
  )
}
