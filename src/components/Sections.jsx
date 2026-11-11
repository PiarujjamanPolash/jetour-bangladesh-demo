// Sections shared by the home page and the model pages.
// Their scroll motion lives in hooks/useSectionMotion.js (matched by data-mx attributes).
import { useT, pick } from '../i18n.js'
import { media } from '../media.js'
import { IconBolt, IconFuel, IconPlug } from './icons.jsx'

// Design rail: pinned and scrubbed sideways on desktop, swipeable on phones.
export function DesignRail({ id, over, block }) {
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
export function IdmViz({ step }) {
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

export function IdmExplainer({ m, step, showPower = true }) {
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
      {showPower && <PowerCards block={m.power} />}
    </section>
  )
}

export function PowerCards({ block }) {
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
