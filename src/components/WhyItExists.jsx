import { Section, Kicker } from './Section.jsx'

const problems = [
  {
    n: '1',
    title: 'Apps ignore user CAs',
    text: 'Since Android 7, apps only trust the system CA store by default — so pointing your phone at a proxy shows empty or broken traffic.',
  },
  {
    n: '2',
    title: 'Installing a system CA is intrusive',
    text: 'It shows a scary security warning, affects every app, and is often forbidden on managed / work devices.',
  },
  {
    n: '3',
    title: 'Certificate pinning goes further',
    text: 'Even a trusted CA is rejected, because the app only accepts specific certificates baked into its own code.',
  },
]

export default function WhyItExists() {
  return (
    <Section id="why">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Kicker>Why this exists</Kicker>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Modern Android makes inspection hard — on purpose
          </h2>
          <p className="mt-4 text-muted-c leading-relaxed">
            The usual workarounds need a rooted phone, Frida with a desktop attached, or a full
            Android Studio + Gradle setup. TrustAPK does it{' '}
            <span className="text-base-c font-medium">per-app, on the device itself</span>, with none of that.
          </p>
        </div>

        <div className="space-y-4">
          {problems.map((p) => (
            <div key={p.n} className="flex gap-4 rounded-2xl border border-base bg-panel p-5">
              <span className="flex-shrink-0 h-9 w-9 rounded-lg bg-brand/10 text-brand grid place-items-center font-bold">
                {p.n}
              </span>
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-c leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
