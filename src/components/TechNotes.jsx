import { Section, Kicker } from './Section.jsx'
import { Cpu, Code, Shield, Check } from './Icons.jsx'

const notes = [
  {
    icon: Cpu,
    title: 'No Gradle, framework APIs only',
    text: 'The app is linked by hand so the build stays fully offline and reproducible — no Android SDK, Android Studio or Gradle needed. Docker is the only host requirement.',
  },
  {
    icon: Code,
    title: 'The formats, from scratch',
    text: 'Binary XML (AndroidManifest), the resources.arsc chunk table, the ZIP/APK container and the v2/v3 signature schemes are all implemented in-app — that’s how it edits and re-signs on the phone.',
  },
  {
    icon: Shield,
    title: 'Pure-Java, vendored',
    text: 'dexlib2 / baksmali and jadx (decompilation), Guava, and XZ are vendored in-repo — all pure Java, so they run on Android’s ART with nothing fetched at runtime.',
  },
  {
    icon: Check,
    title: 'Your app’s code is never touched',
    text: 'Only the manifest, resources and network-security config are edited; companions are added as new files. Every classes*.dex stays byte-for-byte identical to the original.',
  },
]

export default function TechNotes() {
  return (
    <Section id="tech">
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Under the hood</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Engineered to run anywhere, offline</h2>
        <p className="mt-4 text-muted-c">
          The parts that make on-device patching possible — built from the raw formats up, with no
          server and no toolchain to install.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-5">
        {notes.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4 rounded-2xl border border-base bg-panel p-6">
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
