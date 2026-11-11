import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reduceMotion } from './motion.js'

gsap.registerPlugin(ScrollTrigger)


/* =====================================================================
   Shared scroll motion (home page and model pages)
   - Section headings rise in line by line
   - Design rail: pinned on desktop, cards slide sideways as you scroll,
     each card's photo wipes open as it arrives (containerAnimation)
   - i-DM: pinned on desktop, scrolling steps through the three drive modes
   - Interior, features, safety, specs, stats, gallery: their own reveals
   ===================================================================== */
// `chrome` = height of whatever is stuck to the top of the screen on desktop
// (header only on the home page, header + model sub-nav on model pages).
// Pinned sections start right below it.
export function useSectionMotion(rootRef, key, { chrome = 76, setIdmStep } = {}) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (reduceMotion()) return

    const mm = gsap.matchMedia()
    mm.add({ desktop: '(min-width: 821px)', mobile: '(max-width: 820px)' }, (ctx) => {
      const { desktop } = ctx.conditions
      const q = (sel) => gsap.utils.toArray(root.querySelectorAll(sel))
      const ease = 'expo.out'

      /* ---- 1. Section heads ---- */
      q('[data-mx="head"]').forEach((head) => {
        gsap.from(head.children, {
          yPercent: 40, opacity: 0, duration: 1.1, ease, stagger: 0.09,
          scrollTrigger: { trigger: head, start: 'top 85%', once: true },
        })
      })

      /* ---- 2. Overview: copy + counting stats ---- */
      q('[data-mx="fade"]').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 1, ease, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
      q('.statstrip').forEach((strip) => {
        const cells = strip.querySelectorAll(':scope > div')
        gsap.from(cells, { y: 40, opacity: 0, duration: 1, ease, stagger: 0.08, scrollTrigger: { trigger: strip, start: 'top 85%', once: true } })
        strip.querySelectorAll('[data-count]').forEach((el) => {
          const raw = el.dataset.count
          const target = parseFloat(raw.replace(/,/g, ''))
          if (Number.isNaN(target)) return
          const decimals = (raw.split('.')[1] || '').length
          const commas = raw.includes(',')
          const obj = { v: 0 }
          gsap.to(obj, {
            v: target, duration: 1.6, ease: 'power3.out',
            scrollTrigger: { trigger: strip, start: 'top 85%', once: true },
            onUpdate: () => {
              const n = obj.v.toFixed(decimals)
              el.textContent = commas ? Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals }) : n
            },
            onComplete: () => { el.textContent = raw },
          })
        })
      })

      /* ---- 3. Design rail (and any other pinned rail) ---- */
      q('[data-mx="rail"]').forEach((sec) => {
        const track = sec.querySelector('.rail__track')
        const items = gsap.utils.toArray(track.querySelectorAll('.rail__item'))
        const bar = sec.querySelector('.rail__progress span')
        const counter = sec.querySelector('[data-mx="rail-count"]')

        if (desktop) {
          sec.classList.add('is-pinned')
          sec.style.setProperty('--chrome', `${chrome}px`)
          const dist = () => Math.max(0, track.scrollWidth - track.clientWidth)
          const slide = gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: `top ${chrome}px`,
              end: () => `+=${dist() + window.innerHeight * 0.35}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (bar) bar.style.transform = `scaleX(${self.progress})`
                if (counter) counter.textContent = `0${Math.min(items.length, Math.floor(self.progress * items.length) + 1)}`
              },
            },
          })

          items.forEach((it, i) => {
            const frame = it.querySelector('.rail__img')
            const pic = frame.querySelector('img')
            const cap = it.querySelector('figcaption')
            if (i === 0) {
              // The first card is on screen when the pin starts: reveal it on entry.
              const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 70%', once: true } })
              tl.fromTo(frame, { clipPath: 'inset(14% 14% 14% 14% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.4, ease })
                .fromTo(pic, { scale: 1.3 }, { scale: 1, duration: 1.6, ease }, 0)
                .from(cap.children, { y: 24, opacity: 0, duration: 0.9, ease, stagger: 0.06 }, 0.35)
            } else {
              // Each card opens while it slides in; the last one finishes exactly as the rail stops.
              const last = i === items.length - 1
              const st = { trigger: it, containerAnimation: slide, start: 'left 100%', end: last ? 'left 52%' : 'left 45%', scrub: true }
              gsap.fromTo(frame, { clipPath: 'inset(10% 0% 10% 60% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', ease: 'none', scrollTrigger: st })
              gsap.fromTo(pic, { scale: 1.35, xPercent: -12 }, { scale: 1, xPercent: 0, ease: 'none', scrollTrigger: st })
              gsap.from(cap.children, { y: 28, opacity: 0, stagger: 0.08, ease: 'none', scrollTrigger: { ...st, start: 'left 80%', end: last ? 'left 56%' : 'left 50%' } })
            }
          })
          return () => sec.classList.remove('is-pinned')
        }

        // Mobile: swipe rail, each card wipes up as it scrolls into view.
        items.forEach((it) => {
          const frame = it.querySelector('.rail__img')
          gsap.timeline({ scrollTrigger: { trigger: sec.querySelector('.rail__track'), start: 'top 85%', once: true } })
            .fromTo(frame, { clipPath: 'inset(100% 0% 0% 0% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.2, ease })
            .fromTo(frame.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1.4, ease }, 0)
            .from(it.querySelector('figcaption').children, { y: 20, opacity: 0, duration: 0.8, ease, stagger: 0.06 }, 0.3)
        })
        return undefined
      })

      /* ---- 4. i-DM: pinned stepper through Electric → Hybrid → Charging ---- */
      const idmStage = root.querySelector('[data-mx="idm"]')
      if (idmStage) {
        const modes = gsap.utils.toArray(idmStage.querySelectorAll('.idm__mode'))
        const viz = idmStage.querySelector('.idmviz')
        gsap.from(viz, { y: 50, opacity: 0, duration: 1.2, ease, scrollTrigger: { trigger: idmStage, start: 'top 75%', once: true } })
        // Animate the cards' contents, not the cards: the cards' own CSS transitions show the active step.
        gsap.from(modes.map((el) => el.children), { x: desktop ? 50 : 0, y: desktop ? 0 : 24, opacity: 0, duration: 1, ease, stagger: 0.08, scrollTrigger: { trigger: idmStage, start: 'top 70%', once: true } })

        if (desktop) {
          idmStage.style.setProperty('--chrome', `${chrome}px`)
          const bar = idmStage.querySelector('.idm__progress span')
          ScrollTrigger.create({
            trigger: idmStage,
            start: `top ${chrome}px`,
            end: () => `+=${window.innerHeight * 2.2}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setIdmStep?.(Math.min(modes.length - 1, Math.floor(self.progress * modes.length * 0.999)))
              if (bar) bar.style.transform = `scaleY(${self.progress})`
            },
          })
        } else {
          modes.forEach((el, i) => {
            ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 40%', onToggle: (s) => s.isActive && setIdmStep?.(i) })
          })
        }
      }

      /* ---- 5. Power cards (engine, transmission, battery): staggered wipe ---- */
      q('[data-mx="cards"]').forEach((grid) => {
        const cards = grid.querySelectorAll('.pcard')
        cards.forEach((c, i) => {
          const frame = c.querySelector('.pcard__img')
          gsap.timeline({ scrollTrigger: { trigger: grid, start: 'top 80%', once: true }, delay: i * 0.12 })
            .fromTo(frame, { clipPath: 'inset(0% 0% 100% 0% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.2, ease: 'power4.inOut' })
            .fromTo(frame.querySelector('img'), { scale: 1.3, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.6, ease }, 0)
            .from(c.querySelectorAll('.pcard__body > *'), { y: 24, opacity: 0, duration: 0.8, ease, stagger: 0.06 }, 0.5)
        })
      })

      /* ---- 6. Interior bento: tiles open from the bottom, photo settles ---- */
      q('.ibento').forEach((grid) => {
        grid.querySelectorAll('.ibento__tile').forEach((tile, i) => {
          gsap.timeline({ scrollTrigger: { trigger: tile, start: 'top 88%', once: true }, delay: (i % 2) * 0.1 })
            .fromTo(tile, { clipPath: 'inset(100% 0% 0% 0% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.3, ease: 'power4.inOut' })
            .fromTo(tile.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1.8, ease }, 0)
            .from(tile.querySelector('figcaption'), { y: 20, opacity: 0, duration: 0.8, ease }, 0.6)
        })
      })

      /* ---- 7. Feature + safety cards: batched, row by row ---- */
      ScrollTrigger.batch(q('.fcard'), {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          batch.forEach((card, i) => {
            const frame = card.querySelector('.fcard__img')
            gsap.timeline({ delay: i * 0.1 })
              .fromTo(frame, { clipPath: 'inset(0% 100% 0% 0% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.1, ease: 'power4.inOut' })
              .fromTo(frame.querySelector('img'), { scale: 1.2 }, { scale: 1, duration: 1.4, ease }, 0)
              .fromTo(card.querySelectorAll('h3, p'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease, stagger: 0.06 }, 0.45)
          })
        },
      })
      gsap.set(q('.fcard h3, .fcard p'), { opacity: 0 })
      gsap.set(q('.fcard__img'), { clipPath: 'inset(0% 100% 0% 0% round 14px)' })

      /* ---- 8. Gallery: photos drift at different speeds ---- */
      q('.gallery__item').forEach((fig, i) => {
        gsap.fromTo(fig.querySelector('img'), { yPercent: -10, scale: 1.15 }, {
          yPercent: 10, scale: 1.15, ease: 'none',
          scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.from(fig, { y: 60 + i * 30, opacity: 0, duration: 1.2, ease, scrollTrigger: { trigger: fig, start: 'top 92%', once: true } })
      })

      /* ---- 9. Spec tables: rows slide in ---- */
      q('.specs__group').forEach((g) => {
        gsap.from(g.querySelector('h3'), { y: 20, opacity: 0, duration: 0.8, ease, scrollTrigger: { trigger: g, start: 'top 85%', once: true } })
        gsap.from(g.querySelectorAll('dl > div'), {
          x: -24, opacity: 0, duration: 0.7, ease, stagger: 0.04,
          scrollTrigger: { trigger: g, start: 'top 82%', once: true },
        })
      })

      /* ---- 10. CTA band: background zooms out as it scrolls past ---- */
      q('.ctaband').forEach((band) => {
        gsap.fromTo(band.querySelector('.ctaband__bg img'), { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: true } })
      })

      /* ---- 10b. Model cards: photo wipes open, details follow ---- */
      ScrollTrigger.batch(q('.model'), {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => batch.forEach((card, i) => {
          const media = card.querySelector('.model__media')
          gsap.timeline({ delay: i * 0.12 })
            .fromTo(card, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease })
            .fromTo(media, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, 0)
            .fromTo(media.querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 1.6, ease }, 0)
            .fromTo(card.querySelectorAll('.model__body > *'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease, stagger: 0.05 }, 0.45)
        }),
      })
      gsap.set(q('.model'), { opacity: 0 })

      /* ---- 10c. Single photos (test drive, travel, trip planner car) and the map ---- */
      q('[data-mx="photo"]').forEach((el) => {
        const img = el.tagName === 'IMG' ? el : el.querySelector('img, iframe')
        gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
          .fromTo(el, { clipPath: 'inset(10% 10% 10% 10% round 14px)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', opacity: 1, duration: 1.4, ease })
          .fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.6, ease }, 0)
      })

      /* ---- 10d. Numbered lists (why buy official, test drive steps) ---- */
      q('[data-mx="list"]').forEach((list) => {
        gsap.from(list.children, {
          y: 40, opacity: 0, duration: 1, ease, stagger: 0.1,
          scrollTrigger: { trigger: list, start: 'top 85%', once: true },
        })
      })

      /* ---- 11. Anything else marked data-reveal (360 viewer, trip planner, other models) ---- */
      q('[data-reveal]').forEach((el) => {
        const i = Number(getComputedStyle(el).getPropertyValue('--i')) || 0
        gsap.from(el, { y: 30, opacity: 0, duration: 0.9, ease, delay: i * 0.07, scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })

      return undefined
    })

    // Images load late and change heights: recalculate pins once things settle.
    const refresh = () => ScrollTrigger.refresh()
    const t1 = setTimeout(refresh, 500)
    const t2 = setTimeout(refresh, 1800)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(t1); clearTimeout(t2)
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps
}
