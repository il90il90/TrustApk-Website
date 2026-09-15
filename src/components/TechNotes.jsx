import { Section, Kicker } from './Section.jsx'
import { Cpu, Code, Shield } from './Icons.jsx'

const notes = [
  {
    icon: Cpu,
    title: 'No Gradle, framework APIs only',
    text: 'The app is linked by hand against the framework APIs, with no Android SDK, Android Studio or Gradle in the mix. (Building it from source needs only Docker on the host - a developer detail, not something you install to run it.)',
  },
  {
    icon: Code,
    title: 'The formats, from scratch',
    text: 'Binary XML (AndroidManifest), the resources.arsc chunk table, the ZIP/APK container and the v2/v3 signature schemes are all implemented in-app - that’s how it edits and re-signs on the phone.',
  },
  {
    icon: Shield,
    title: 'Pure-Java, vendored',
    text: 'dexlib2 / baksmali and jadx (decompilation), Guava, and XZ are vendored in-repo - all pure Java, so they run on Android’s ART with nothing fetched at runtime.',
  },
]

export default function TechNotes() {
  return (
    <Section id="tech">
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Under the hood</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Built for on-device inspection</h2>
        <p className="mt-4 text-muted-c">
          The parts that make on-device patching possible - built from the raw formats up, so editing
          and re-signing happen on the phone with no desktop toolchain to install.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
