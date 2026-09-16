import { useCallback, useEffect, useRef, useState } from 'react'
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
    desc: 'Hosts and URLs found in the APK, pulled statically: 139 hosts and 729 URLs across 124 domains. Filter instantly, flag ad/tracker hosts to block, and see which come from bundled SDKs.',
  },
  {
    src: './shots/ad-block.jpg',
    title: 'Block ads & unwanted hosts',
    desc: 'Stop ad, tracker and other unwanted requests from leaving the patched app - block a specific host you spotted in the traffic, or pull in ready-made lists (AdAway, HaGeZi, 1Hosts, Peter Lowe, StevenBlack) and choose which to apply.',
  },
  {
    src: './shots/components.jpg',
    title: 'Attack-surface map',
    desc: 'Enumerate every activity, service, receiver and provider - flagged Exported / Unguarded / Reachable. 75 components, 31 exported, 27 unguarded, with the intent actions and deep-link schemes that reach them.',
  },
  {
    src: './shots/source-files.jpg',
    title: 'Read the app’s code & files',
    desc: 'Browse the app’s entire contents on the device - every package and resource in the tree (7,212 files here), the AndroidManifest and more - search names and contents, and open any class decompiled to smali or Java.',
  },
  {
    src: './shots/permissions.jpg',
    title: 'Strip risky permissions',
    desc: 'Every permission the app requests, each with a plain-language note and a SENSITIVE flag. Untick any to remove it from the patched app, or bulk-remove the sensitive ones - then see exactly what changed after patching.',
  },
  {
    src: './shots/logs.jpg',
    title: 'Live logcat over localhost',
    desc: 'A companion component streams the app’s own logs to TrustAPK without touching its code - watch the interception happen in real time (CONNECT ...:443 mitm=true, TLS client-side ok).',
  },
  {
    src: './shots/app-data.jpg',
    title: 'Data at rest',
    desc: 'Browse the patched app’s own sandbox on-device: shared_prefs, databases and files with sizes and timestamps. Read Firebase prefs and Google measurement DBs, or export the captured flows.',
  },
  {
    src: './shots/live-watch.jpg',
    title: 'Watch & edit app data live',
    desc: 'Live-watch the app’s shared_prefs and files as you use it - see exactly which keys flip and what values are written, so session ids, feature flags and gatekeepers reveal themselves in real time. Tap any change to edit the value on the spot and feed the app whatever you want.',
  },
  {
    src: './shots/proxy-cert.jpg',
    title: 'Per-app CA trust',
    desc: 'Select your proxy’s CA certificate once; TrustAPK writes it inside the patched APK so that one app trusts your proxy - no system-wide CA install (managed-device compatibility depends on your org’s policy).',
  },
  {
    src: './shots/app-info.jpg',
    title: 'Fingerprint the build',
    desc: 'Know what you’re up against: framework (React Native / Hermes), language, SDK levels, install source, split APKs and entry point - and the app’s one-tap AI review that shares the evidence to your assistant.',
  },
]

export default function Screenshots() {
  const [active, setActive] = useState(null)
  const openerRef = useRef(null)
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)

  const close = useCallback(() => {
    setActive(null)
    // Return focus to the thumbnail that opened the lightbox.
    openerRef.current?.focus()
    openerRef.current = null
  }, [])

  const open = (idx, e) => {
    openerRef.current = e.currentTarget
    setActive(idx)
  }

  useEffect(() => {
    if (active === null) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Move focus into the dialog.
    closeBtnRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key === 'Tab') {
        // Trap focus among the dialog's focusable elements.
        const nodes = dialogRef.current?.querySelectorAll(
          'button, [href], img[tabindex], [tabindex]:not([tabindex="-1"])'
        )
        if (!nodes || nodes.length === 0) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [active, close])

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
          <div key={s.title} className="flex flex-col min-w-0">
            <button
              onClick={(e) => open(idx, e)}
              aria-haspopup="dialog"
              aria-label={`Enlarge screenshot: ${s.title}`}
              className="group text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-soft)]"
            >
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={close}
        >
          <button
            ref={closeBtnRef}
            aria-label="Close screenshot"
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={close}
          >
            <Close width={22} height={22} />
          </button>
          <figure className="flex flex-col items-center max-h-full" onClick={(e) => e.stopPropagation()}>
            <picture>
              <source type="image/webp" srcSet={shots[active].src.replace(/\.jpg$/, '.webp')} />
              <img
                src={shots[active].src}
                alt={shots[active].title}
                className="max-h-[78vh] w-auto max-w-full rounded-2xl shadow-2xl"
              />
            </picture>
            <figcaption className="mt-4 max-w-lg text-center text-sm text-white/80 overflow-y-auto">
              <span id="lightbox-title" className="font-semibold text-white">{shots[active].title}.</span>{' '}
              {shots[active].desc}
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  )
}
