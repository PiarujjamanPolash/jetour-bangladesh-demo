import { useEffect, useRef, useState } from 'react'
import { media } from '../media.js'
import { useT } from '../i18n.js'

const N = media.t2.spinFrames

export default function Spin360() {
  const { t } = useT()
  const [frame, setFrame] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const drag = useRef(null)
  const stage = useRef(null)
  const touched = useRef(false)

  // Preload every frame so dragging is smooth.
  useEffect(() => {
    let count = 0
    const imgs = Array.from({ length: N }, (_, i) => {
      const img = new Image()
      img.referrerPolicy = 'no-referrer'
      img.onload = img.onerror = () => setLoaded(++count)
      img.src = media.t2.spinFrame(i)
      return img
    })
    return () => imgs.forEach((img) => (img.onload = img.onerror = null))
  }, [])

  // A slow half-turn once the viewer scrolls into view, until the visitor touches it.
  useEffect(() => {
    const el = stage.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf, start
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || touched.current) return
      io.disconnect()
      const tick = (ts) => {
        if (touched.current) return
        start ??= ts
        const p = Math.min((ts - start) / 2600, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setFrame(Math.round(eased * (N / 2)) % N)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  const onDown = (e) => {
    touched.current = true
    drag.current = { x: e.clientX, f: frame }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e) => {
    if (!drag.current) return
    const w = stage.current.offsetWidth
    const delta = Math.round(((drag.current.x - e.clientX) / w) * N * 1.2)
    setFrame((((drag.current.f + delta) % N) + N) % N)
  }
  const onUp = () => (drag.current = null)

  return (
    <section className="spin section" id="spin">
      <div className="container spin__head" data-reveal>
        <p className="overline">{t.spin.over}</p>
        <h2 className="h1">{t.spin.title}</h2>
      </div>

      <div
        ref={stage}
        className="spin__stage"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="img"
        aria-label="Jetour T2 i-DM, 360 degree view"
      >
        <div className="spin__floor" aria-hidden="true" />
        {Array.from({ length: N }, (_, i) => (
          <img
            key={i}
            src={media.t2.spinFrame(i)}
            alt=""
            draggable="false"
            referrerPolicy="no-referrer"
            className={i === frame ? 'is-on' : ''}
          />
        ))}
        {loaded < N && (
          <div className="spin__loading">
            <span style={{ transform: `scaleX(${loaded / N})` }} />
          </div>
        )}
      </div>

      <div className="container spin__controls">
        <input
          type="range"
          min="0"
          max={N - 1}
          value={frame}
          onChange={(e) => { touched.current = true; setFrame(+e.target.value) }}
          aria-label={t.spin.hint}
        />
        <p className="spin__hint">{t.spin.hint}</p>
        <ul className="spin__facts">
          {t.spin.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </section>
  )
}
