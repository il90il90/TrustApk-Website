import { useState } from 'react'
import { Section, Kicker } from './Section.jsx'
import PhoneFrame from './PhoneFrame.jsx'
import { Check } from './Icons.jsx'
import { VERSION } from '../lib/constants.js'

const steps = [
  {
    label: 'Load target',
    img: './shots/dashboard.jpg',
    title: '1 · Load the target',
    body: 'Pick an installed app (splits included) or an .apk / .apks / .xapk file. TrustAPK opens a single dashboard for the whole assessment — inspect, patch, capture and analyse from one place.',
    log: ['> reading target package …', '> base.apk + 6 splits (174.8 MB)', '> dashboard ready'],
  },
  {
    label: 'Trust proxy',
    img: './shots/proxy-cert.jpg',
    title: '2 · Trust your proxy',
    body: 'Point at your proxy’s CA (Reqable / mitmproxy / Burp / Charles). TrustAPK writes it inside the patched APK, so that one app trusts your proxy — no system CA, no security warning, works on MDM devices.',
    log: ['> import mitmproxy-ca.pem', '> write network_security_config.xml', '> per-app trust only'],
  },
  {
    label: 'Intercept',
    img: './shots/live-traffic.jpg',
    title: '3 · Patch & intercept',
    body: 'Strip pinning (on by default), re-sign and install, then read the app’s own HTTPS live in the built-in inspector — every request, header and body, on the device.',
    log: ['> unpin + re-sign (v2 + v3)', '> CONNECT api.target.tld:443 mitm=true', '> TLS client-side ok — 406 captured'],
    scanning: true,
  },
  {
    label: 'Map surface',
    img: './shots/components.jpg',
    title: '4 · Map the attack surface',
    body: 'Pull every host and URL, then enumerate activities, services, receivers and providers flagged Exported / Unguarded / Reachable — the entry points worth probing.',
    log: ['> 139 hosts / 729 URLs', '> 75 components — 31 exported, 27 unguarded', '> intent actions + deep-link schemes'],
  },
  {
    label: 'Dig in',
    img: './shots/app-data.jpg',
    title: '5 · Dig into data & logs',
    body: 'Browse the app’s private sandbox — shared_prefs, databases and files — stream its logcat live over localhost, and export the captured flows for your report.',
    log: ['> shared_prefs / databases / files', '> files/trustapk_flows.jsonl (3.4 MB)', '> classes*.dex unchanged ✓'],
  },
]

const resultRows = [
  '406 HTTPS requests decrypted',
  '139 hosts, 729 URLs mapped',
  '31 exported components flagged',
  'App sandbox data browsed',
  'classes*.dex identical to original',
  'Flows exported for the report',
]

export default function Demo() {
  const [i, setI] = useState(0)
  const step = steps[i]
  const isLast = i === steps.length - 1

  return (
    <Section id="demo" soft>
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Interactive walkthrough</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Walk through an assessment</h2>
        <p className="mt-4 text-muted-c">
          Click through the five steps of a real on-device assessment, on the actual screens. Nothing
          here talks to a server — it mirrors what happens entirely on your phone.
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
