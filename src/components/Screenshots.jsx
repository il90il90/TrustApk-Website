import { useState, useEffect } from 'react'
import { Section, Kicker } from './Section.jsx'
import { Close } from './Icons.jsx'
import PhoneFrame from './PhoneFrame.jsx'

const shots = [
  { src: './screenshots/home.png', title: 'Home', desc: 'Pick an installed app, an APK file, or install a bundle as-is.' },
  { src: './screenshots/02-certificate.png', title: 'Proxy certificate', desc: 'Bundle your proxy CA inside one app — no system-wide CA.' },
  { src: './screenshots/03-app-loaded.png', title: 'A loaded app', desc: 'Inspect links, secrets & files; review and strip permissions.' },
  { src: './screenshots/04-advanced.png', title: 'Advanced', desc: 'Manifest flags, debug tools, Frida gadget, min-SDK & version.' },
  { src: './screenshots/05-result.png', title: 'Result', desc: 'Exactly what changed — install, save or send the patched APK.' },
  { src: './screenshots/install-choice.png', title: 'Already installed?', desc: 'Replace the original, or install a separate copy beside it.' },
]

export default function Screenshots() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <Section id="screens" soft>
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Screens at a glance</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Real screenshots</h2>
        <p className="mt-4 text-muted-c">Tap any screen to enlarge. These are straight from the app.</p>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {shots.map((s, idx) => (
          <button
            key={s.title}
            onClick={() => setActive(idx)}
            className="group text-left focus:outline-none"
          >
            <div className="transition-transform duration-300 group-hover:-translate-y-1">
              <PhoneFrame src={s.src} alt={s.title} />
            </div>
            <div className="mt-4 px-1">
              <h3 className="font-semibold text-sm">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-c leading-relaxed">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            <Close width={22} height={22} />
          </button>
          <img
            src={shots[active].src}
            alt={shots[active].title}
            className="max-h-[86vh] w-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Section>
  )
}
