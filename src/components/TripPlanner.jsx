import { useState } from 'react'
import { media } from '../media.js'
import { routes, T2_EV_KM, T2_COMBINED_KM } from '../models.js'
import { useT } from '../i18n.js'

const fmt = (n, lang) => n.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')

export default function TripPlanner() {
  const { t, lang } = useT()
  const [route, setRoute] = useState('cox')
  const [ret, setRet] = useState(false)

  const r = routes.find((x) => x.id === route)
  const total = r.km * (ret ? 2 : 1)
  const battery = Math.min(T2_EV_KM, total)
  const fuel = total - battery
  const pct = Math.round((battery / total) * 100)
  const fits = total <= T2_COMBINED_KM

  return (
    <section className="trip section" id="trip">
      <div className="container trip__grid">
        <div className="trip__intro" data-reveal>
          <p className="overline overline--accent">{t.trip.over}</p>
          <h2 className="h1">{t.trip.title}</h2>
          <p className="lead">{t.trip.daily}</p>
          <img className="trip__car" src={media.t2.side} alt="Jetour T2 i-DM" referrerPolicy="no-referrer" loading="lazy" />
        </div>

        <div className="trip__panel" data-reveal>
          <p className="label">{t.trip.from}</p>
          <div className="chips" role="radiogroup">
            {routes.map((x) => (
              <button
                key={x.id}
                role="radio"
                aria-checked={route === x.id}
                className={`chip ${route === x.id ? 'is-on' : ''}`}
                onClick={() => setRoute(x.id)}
              >
                {t.trip.routes[x.id]}
                <small>~{fmt(x.km, lang)} km</small>
              </button>
            ))}
          </div>

          <div className="toggle" role="radiogroup">
            <button className={!ret ? 'is-on' : ''} aria-checked={!ret} role="radio" onClick={() => setRet(false)}>{t.trip.oneWay}</button>
            <button className={ret ? 'is-on' : ''} aria-checked={ret} role="radio" onClick={() => setRet(true)}>{t.trip.ret}</button>
          </div>

          <div className="trip__route" aria-hidden="true">
            <span>{lang === 'bn' ? 'ঢাকা' : 'Dhaka'}</span>
            <span>{t.trip.routes[route]}</span>
          </div>
          <div className="trip__bar" aria-hidden="true">
            <div className="trip__bar-ev" style={{ width: `${pct}%` }} />
            <div className="trip__bar-fuel" style={{ width: `${100 - pct}%` }} />
          </div>

          <dl className="trip__stats">
            <div>
              <dt><i className="dot dot--ev" />{t.trip.battery}</dt>
              <dd className="mono">{fmt(battery, lang)}<span> km</span></dd>
            </div>
            <div>
              <dt><i className="dot dot--fuel" />{t.trip.fuel}</dt>
              <dd className="mono">{fmt(fuel, lang)}<span> km</span></dd>
            </div>
            <div>
              <dt>{t.trip.total}</dt>
              <dd className="mono">{fmt(total, lang)}<span> km</span></dd>
            </div>
          </dl>

          <p className={`trip__verdict ${fits ? 'is-good' : ''}`}>{fits ? t.trip.noStop : t.trip.oneStop}</p>
          <p className="fine">{t.trip.note}</p>
        </div>
      </div>
    </section>
  )
}
