import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Smooth-scroll to an element id (works with Lenis when it's running).
export function scrollToId(id, offset = -72) {
  const el = typeof id === 'string' ? document.getElementById(id) : id
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset, duration: 1.3 })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
}

// Fade-and-rise every [data-reveal] element inside `root` once it scrolls into view.
export function useReveal(rootRef, deps = []) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray(root.querySelectorAll('[data-reveal]')).forEach((el) => {
        const i = Number(getComputedStyle(el).getPropertyValue('--i')) || 0
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: i * 0.07,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    }, root)
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => { clearTimeout(t); ctx.revert() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
