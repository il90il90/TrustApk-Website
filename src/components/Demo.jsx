import { useState } from 'react'
import { Section, Kicker } from './Section.jsx'
import PhoneFrame from './PhoneFrame.jsx'
import { Check } from './Icons.jsx'
import { VERSION } from '../lib/constants.js'

const steps = [
  {
    label: 'Pick an app',
    img: './screenshots/home.png',
    title: '1 · Pick an app or an APK',
    body: 'Start from an app already installed on the phone (splits included) or choose an .apk / .apks / .xapk file. No hunting for files, no desktop.',
    log: ['> reading installed package…', '> found base.apk + config.arm64_v8a.apk', '> ready to inspect'],
  },
  {
    label: 'Trust proxy',
    img: './screenshots/02-certificate.png',
    title: '2 · Trust your proxy certificate',
    body: 'Point at your proxy’s CA (Reqable / mitmproxy / Burp / Charles). TrustAPK bundles it inside the patched APK, so that one app trusts your proxy — no system CA, no MDM block.',
    log: ['> import mitmproxy-ca.pem', '> writing network_security_config.xml', '> pin certificate to app store only'],
  },
  {
    label: 'Strip pinning',
    img: './screenshots/03-app-loaded.png',
    title: '3 · Strip pinning & trim permissions',
    body: 'Remove certificate pinning (on by default), untick sensitive permissions to strip them, and browse Links, Secrets and Files — all read-only, all on-device.',
    log: ['> scanning for pinning config…', '> unpinned: api.example.com, cdn.example.com', '> flagged 3 SENSITIVE permissions'],
    scanning: true,
  },
  {
    label: 'Advanced',
    img: './screenshots/04-advanced.png',
    title: '4 · Advanced (optional)',
    body: 'Flip manifest flags (debuggable, cleartext, extractNativeLibs), enable WebView debugging, add a Frida gadget for native/OkHttp pinning, or set min-SDK & version code.',
    log: ['> set application:debuggable=true', '> inject frida-gadget.so (+ frida_unpin.js)', '> min-sdk 26 → 24'],
  },
  {
    label: 'Result',
    img: './screenshots/05-result.png',
    title: '5 · Patch, sign & install',
    body: 'One tap applies everything, re-signs with a local v2/v3 key and installs. The result screen shows exactly what changed — then Install, Save or Send the APK.',
    log: ['> re-signing (v2 + v3)…', '> classes.dex unchanged ✓', '> patched in 3.1s — install ready'],
  },
]

const resultRows = [
  'User-CA trust enabled',
  'Network-security config written',
  'Proxy certificate bundled',
  '2 domains unpinned',
  'classes*.dex identical to original',
  'Signed with v2 + v3',
]

export default function Demo() {
  const [i, setI] = useState(0)
  const step = steps[i]
  const isLast = i === steps.length - 1

  return (
    <Section id="demo" soft>
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Interactive walkthrough</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">See the patch flow</h2>
        <p className="mt-4 text-muted-c">
          A front-end walkthrough of the real screens — click through the steps. Nothing here talks
          to a server; it mirrors what happens entirely on your device.
        </p>
      </div>

      {/* Step tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {steps.map((s, idx) => (
          <button
            key={s.label}
            onClick={() => setI(idx)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition ${
              idx === i
                ? 'bg-brand text-[#04140f] border-brand'
                : 'border-base bg-panel text-muted-c hover:text-base-c'
            }`}
          >
            {idx + 1}. {s.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
        <PhoneFrame src={step.img} alt={step.title} scanning={step.scanning} />

        <div>
          <h3 className="text-2xl font-semibold">{step.title}</h3>
          <p className="mt-3 text-muted-c leading-relaxed">{step.body}</p>

          <div className="mt-5 rounded-xl border border-base bg-[#080d13] text-emerald-300/90 font-mono text-xs p-4 thin-scroll overflow-x-auto">
            {step.log.map((line, k) => (
              <div key={k} className="whitespace-pre">{line}</div>
            ))}
            <div className="mt-1 h-3 w-2 bg-brand inline-block animate-pulse-glow" />
          </div>

          {isLast && (
            <ul className="mt-5 grid sm:grid-cols-2 gap-2">
              {resultRows.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-brand"><Check width={16} height={16} /></span>
                  <span className="text-muted-c">{r}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 flex items-center gap-3">
            <button
              onClick={() => setI((n) => Math.max(0, n - 1))}
              disabled={i === 0}
              className="rounded-lg border border-base bg-panel px-4 py-2 text-sm font-medium disabled:opacity-40 hover:text-brand transition"
            >
              Back
            </button>
            <button
              onClick={() => setI((n) => Math.min(steps.length - 1, n + 1))}
              disabled={isLast}
              className="rounded-lg bg-brand text-[#04140f] px-5 py-2 text-sm font-semibold disabled:opacity-40 hover:brightness-110 transition"
            >
              {isLast ? 'Done' : 'Next step'}
            </button>
            <span className="ml-auto text-xs text-muted-c font-mono">v{VERSION}</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
