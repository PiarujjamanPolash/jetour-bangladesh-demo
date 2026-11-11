import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useT, pick } from '../i18n.js'
import { contact } from '../media.js'
import { models, compareRows } from '../models.js'
import { useReveal } from '../hooks/motion.js'
import { ModelCard, usePageTitle } from '../components/Blocks.jsx'
import { IconPhone, IconArrow } from '../components/icons.jsx'

export default function Models() {
  const { t, lang } = useT()
  const ref = useRef(null)
  usePageTitle(t.nav.models)
  useReveal(ref, [])
  return (
    <div ref={ref} className="page">
      <header className="pagehead container">
        <p className="overline" data-reveal>{t.modelsPage.over}</p>
        <h1 className="h1 pagehead__title" data-reveal>{t.modelsPage.title}</h1>
        <p className="lead" data-reveal>{t.modelsPage.body}</p>
      </header>

      <section className="section section--tight">
        <div className="container lineup__grid">
          {models.map((m, i) => <ModelCard key={m.id} m={m} index={i} />)}
        </div>
      </section>

      <section className="section compare">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="overline">{t.common.compare}</p>
            <h2 className="h2">{t.modelsPage.compareTitle}</h2>
          </div>
          <div className="compare__wrap" data-reveal>
            <table className="compare__table">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">{t.modelsPage.model}</span></th>
                  {models.map((m) => (
                    <th scope="col" key={m.id}>
                      <Link to={`/models/${m.slug}`} className="compare__head">
                        <img src={m.image} alt="" loading="lazy" referrerPolicy="no-referrer" />
                        <span>{m.name}</span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r, i) => (
                  <tr key={i}>
                    <th scope="row">{pick(r.label, lang)}</th>
                    {models.map((m) => <td key={m.id}>{pick(r.values[m.id], lang)}</td>)}
                  </tr>
                ))}
                <tr className="compare__cta">
                  <th scope="row"></th>
                  {models.map((m) => (
                    <td key={m.id}>
                      <a className="btn btn--gold btn--sm" href={`tel:${contact.phoneTel}`}><IconPhone />{t.cta.price}</a>
                      <Link className="compare__more" to={`/models/${m.slug}`}>{t.common.explore}<IconArrow /></Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="fine compare__note">{t.common.specNote}</p>
        </div>
      </section>
    </div>
  )
}
