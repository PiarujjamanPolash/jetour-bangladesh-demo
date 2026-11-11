import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useT } from '../i18n.js'
import { media, contact, waLink } from '../media.js'
import { models } from '../models.js'
import { reduceMotion } from '../hooks/motion.js'
import { IconWA, IconPhone, IconCar, IconMenu, IconClose, IconArrow } from './icons.jsx'

function Ribbon() {
  const { t } = useT()
  return <div className="ribbon">{t.ribbon}</div>
}

function Nav() {
  const { t, lang, setLang } = useT()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start()
  }, [open])

  return (
    <>
    <header className={`nav ${scrolled || open ? 'is-scrolled' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo" aria-label="Jetour Bangladesh, home">
          <img src={media.logo} alt="JETOUR" referrerPolicy="no-referrer" />
          <span>Bangladesh</span>
        </Link>
        <nav className="nav__links" aria-label="Main">
          {models.map((m) => (
            <NavLink key={m.id} to={`/models/${m.slug}`}>{m.name}</NavLink>
          ))}
          <NavLink to="/models" end>{t.nav.compare}</NavLink>
          <NavLink to="/showroom">{t.nav.showroom}</NavLink>
        </nav>
        <div className="nav__actions">
          <button className="nav__lang" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}>{t.lang}</button>
          <Link to="/test-drive" className="btn btn--gold btn--sm nav__cta">{t.nav.drive}</Link>
          <button className="nav__burger" aria-expanded={open} aria-label={open ? t.menu.close : t.menu.open} onClick={() => setOpen(!open)}>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
    </header>

      <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="menu__inner">
          <p className="overline">{t.menu.models}</p>
          <ul className="menu__models">
            {models.map((m) => (
              <li key={m.id}>
                <Link to={`/models/${m.slug}`} tabIndex={open ? 0 : -1}>
                  <img src={m.image} alt="" referrerPolicy="no-referrer" loading="lazy" />
                  <span>{m.name}</span>
                  <IconArrow />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="menu__links">
            <li><Link to="/" tabIndex={open ? 0 : -1}>{t.menu.home}</Link></li>
            <li><Link to="/models" tabIndex={open ? 0 : -1}>{t.menu.compare}</Link></li>
            <li><Link to="/test-drive" tabIndex={open ? 0 : -1}>{t.nav.drive}</Link></li>
            <li><Link to="/showroom" tabIndex={open ? 0 : -1}>{t.nav.showroom}</Link></li>
          </ul>
        </div>
      </div>
    </>
  )
}

function Footer() {
  const { t } = useT()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={media.logo} alt="JETOUR" referrerPolicy="no-referrer" />
          <p className="mono">Drive Your Future</p>
        </div>
        <div className="footer__cols">
          <div>
            <p className="label">{t.nav.models}</p>
            {models.map((m) => <Link key={m.id} to={`/models/${m.slug}`}>{m.name}</Link>)}
            <Link to="/models">{t.nav.compare}</Link>
          </div>
          <div>
            <p className="label">{t.showroomPage.contact}</p>
            <a href={`tel:${contact.phoneTel}`}>{contact.phoneDisplay}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <Link to="/test-drive">{t.nav.drive}</Link>
            <Link to="/showroom">{t.nav.showroom}</Link>
          </div>
          <div>
            <p className="label">{t.footer.follow}</p>
            <a href={contact.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
        <div className="footer__legal">
          <p className="footer__copy"><strong>{t.footer.copyright}</strong></p>
          <p className="fine">{t.footer.ownership}</p>
          <p className="fine">{t.footer.trademarks} {t.footer.note}</p>
        </div>
      </div>
    </footer>
  )
}

function MobileBar() {
  const { t } = useT()
  return (
    <nav className="mbar" aria-label="Quick contact">
      <a href={waLink('Hello Jetour Bangladesh')} target="_blank" rel="noreferrer"><IconWA /><span>{t.cta.whatsapp}</span></a>
      <a href={`tel:${contact.phoneTel}`}><IconPhone /><span>{t.cta.call}</span></a>
      <Link to="/test-drive" className="mbar__main"><IconCar /><span>{t.cta.drive}</span></Link>
    </nav>
  )
}

// Smooth scrolling for the whole site, and a fresh start at the top on every page change.
function ScrollManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (reduceMotion()) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy(); window.__lenis = null }
  }, [])

  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [pathname])

  return null
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Ribbon />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
