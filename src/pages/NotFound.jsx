import { Link } from 'react-router-dom'
import { useT } from '../i18n.js'
import { media } from '../media.js'
import { usePageTitle } from '../components/Blocks.jsx'
import { IconArrow } from '../components/icons.jsx'

export default function NotFound() {
  const { t } = useT()
  usePageTitle('404')
  return (
    <section className="nf">
      <img className="nf__bg" src={media.t2.mountain} alt="" referrerPolicy="no-referrer" />
      <div className="hero__scrim" aria-hidden="true" />
      <div className="container nf__inner">
        <p className="overline mono">404</p>
        <h1 className="h1">{t.notFound.title}</h1>
        <p className="lead">{t.notFound.body}</p>
        <div className="hero__ctas">
          <Link className="btn btn--light" to="/">{t.notFound.home}<IconArrow /></Link>
          <Link className="btn btn--ghost" to="/models">{t.common.allModels}</Link>
        </div>
      </div>
    </section>
  )
}
