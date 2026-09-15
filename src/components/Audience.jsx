import { Section, Kicker } from './Section.jsx'
import { Shield, Search, Unlock, Cpu } from './Icons.jsx'

const roles = ['Pentesters', 'Bug bounty hunters', 'Mobile security researchers', 'Red teams', 'App QA & AppSec']

const cases = [
  {
    icon: Unlock,
    title: 'Intercept a target on engagement',
    text: 'Make a client app’s HTTPS readable in Burp / mitmproxy without touching the device’s system CA store - bundle your CA inside that one app.',
  },
  {
    icon: Shield,
    title: 'Beat pinning on a bounty target',
    text: 'Strip network-security-config pinning, and drop a Frida gadget with an unpinning script for apps that pin in native / OkHttp code - no desktop Frida attached.',
  },
  {
    icon: Search,
    title: 'Recon endpoints, secrets & code',
    text: 'Extract hosts and URLs, surface API keys and tokens (values redacted), and decompile the dex to smali or Java for a static review - all on-device.',
  },
  {
    icon: Cpu,
    title: 'Avoid a device-wide CA',
    text: 'Per-app CA trust and on-device re-signing let you test without a rooted phone or a laptop, and without a system-wide CA - though installing apps may still be governed by your org’s policy.',
  },
]

export default function Audience() {
  return (
    <Section id="pentest">
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Who it's for</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Built for the field
        </h2>
        <p className="mt-4 text-muted-c">
          A pentester’s intercept-and-analyse workflow, packed into one app that runs entirely on
          the phone in your hand.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {roles.map((r) => (
            <span key={r} className="rounded-full border border-brand/30 bg-brand/[0.06] px-3.5 py-1.5 text-sm text-brand">
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-5">
        {cases.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4 rounded-2xl border border-base bg-panel p-6 hover:border-brand/40 transition-colors">
            <span className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon width={22} height={22} />
            </span>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-c leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
