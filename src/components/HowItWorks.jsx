import { Section, Kicker } from './Section.jsx'

const steps = [
  {
    n: '01',
    title: 'Edit only the wrapper',
    text: "Rewrites the manifest (AndroidManifest.xml), the compiled resources (resources.arsc) and the network-security config — the parts that decide who the app trusts.",
  },
  {
    n: '02',
    title: 'Add, never rewrite',
    text: 'Adds a network-security config, bundles your proxy certificate, and optionally adds companion dex (logs/debug) or native libs (Frida gadget) — as new files beside the originals.',
  },
  {
    n: '03',
    title: 'Re-sign & install',
    text: 'Signs the whole APK with a local key using APK Signature Scheme v2/v3 and hands it to Android’s package installer. Splits and bundles are handled too.',
  },
]

export default function HowItWorks() {
  return (
    <Section id="how">
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>The core idea</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Three edits. One golden rule.
        </h2>
        <p className="mt-4 text-muted-c">
          Everything is implemented from scratch against the raw formats — binary XML,
          <span className="font-mono text-sm"> resources.arsc</span> chunks, the ZIP/APK container,
          and the v2/v3 signature schemes. No Gradle, no AndroidX at build time.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((s) => (
          <div key={s.n} className="relative rounded-2xl border border-base bg-panel p-6 overflow-hidden">
            <span className="absolute -top-4 -right-2 text-7xl font-black text-brand/10 select-none">{s.n}</span>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-c leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-brand/30 bg-brand/[0.06] p-6 text-center">
        <p className="text-base sm:text-lg">
          <span className="font-semibold text-brand">The golden rule:</span>{' '}
          TrustAPK never modifies the app&rsquo;s own code. After patching, every
          <span className="font-mono text-sm"> classes*.dex</span> is byte-for-byte identical to the original.
        </p>
      </div>
    </Section>
  )
}
