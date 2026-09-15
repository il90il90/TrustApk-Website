import { useState, useEffect } from 'react'
import { Section, Kicker } from './Section.jsx'
import { Close } from './Icons.jsx'
import PhoneFrame from './PhoneFrame.jsx'

const shots = [
  {
    src: './shots/dashboard.jpg',
    title: 'The target dashboard',
    desc: 'Load any installed app or APK and get one control room - Inspect (Links, Secrets, Files, Components, Security scan, App settings), live App data, Live traffic and Capture logs, then Patch this APK. Here: a shipping app of 174.8 MB, base + 6 splits.',
  },
  {
    src: './shots/live-traffic.jpg',
    title: 'Decrypted HTTPS, live',
    desc: 'After patching, the app’s own TLS is readable in the built-in inspector - 406 requests captured across the app’s analytics, backend APIs, Firebase and more. Tap any request to read its headers and body.',
  },
  {
    src: './shots/links.jpg',
    title: 'Endpoint recon',
    desc: 'Every host and URL the app can reach, pulled statically: 139 hosts and 729 URLs across 124 domains. Filter instantly, flag ad/tracker hosts to block, and see which come from bundled SDKs.',
  },
  {
    src: './shots/components.jpg',
    title: 'Attack-surface map',
    desc: 'Enumerate every activity, service, receiver and provider - flagged Exported / Unguarded / Reachable. 75 components, 31 exported, 27 unguarded, with the intent actions and deep-link schemes that reach them.',
  },
  {
    src: './shots/logs.jpg',
    title: 'Live logcat over localhost',
    desc: 'A companion component streams the app’s own logs to TrustAPK without touching its code - watch the interception happen in real time (CONNECT ...:443 mitm=true, TLS client-side ok).',
  },
  {
    src: './shots/app-data.jpg',
    title: 'Data at rest',
    desc: 'Browse the app’s private sandbox on-device: shared_prefs, databases and files with sizes and timestamps. Read Firebase prefs and Google measurement DBs, or export the captured flows.',
  },
  {
    src: './shots/proxy-cert.jpg',
    title: 'Per-app CA trust',
    desc: 'Point at your proxy’s CA once; TrustAPK writes it inside the patched APK so that one app trusts your proxy - no system CA, no security warning, and it works on locked-down / MDM devices.',
  },
  {
    src: './shots/app-info.jpg',
    title: 'Fingerprint the build',
    desc: 'Know what you’re up against: framework (React Native / Hermes), language, SDK levels, install source, split APKs and entry point - plus a one-tap “Full AI penetration test”.',
  },
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
        <Kicker>Inside TrustAPK</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">A real assessment, screen by screen</h2>
        <p className="mt-4 text-muted-c">
          Actual screens from an on-device assessment of a shipping app. Tap any screen to enlarge.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {shots.map((s, idx) => (
          <div key={s.title} className="flex flex-col">
            <button onClick={() => setActive(idx)} className="group text-left focus:outline-none">
              <div className="transition-transform duration-300 group-hover:-translate-y-1.5">
                <PhoneFrame src={s.src} alt={s.title} glow={idx === 0} />
              </div>
            </button>
            <div className="mt-5 px-1">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-brand/10 text-brand text-xs font-bold">
                  {idx + 1}
                </span>
                <h3 className="font-semibold">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm text-muted-c leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
          >
            <Close width={22} height={22} />
          </button>
          <figure className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={shots[active].src}
              alt={shots[active].title}
              className="max-h-[80vh] w-auto rounded-2xl shadow-2xl"
            />
            <figcaption className="mt-4 max-w-lg text-center text-sm text-white/80">
              <span className="font-semibold text-white">{shots[active].title}.</span> {shots[active].desc}
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  )
}
