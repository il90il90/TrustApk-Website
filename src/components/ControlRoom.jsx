import { Section, Kicker } from './Section.jsx'
import PhoneFrame from './PhoneFrame.jsx'
import { Search, Lock, Doc, Grid, Shield, Sliders, Folder, Traffic, Logs } from './Icons.jsx'

const tools = [
  { icon: Search, name: 'Links', text: 'Every host and URL the app talks to, pulled from the APK - filter, and flag ad/tracker hosts to block.' },
  { icon: Lock, name: 'Secrets', text: 'API keys and tokens found bundled inside the app, with the values redacted.' },
  { icon: Doc, name: 'Files', text: 'Browse every file in the package, search names and contents, and open any class as smali or Java.' },
  { icon: Grid, name: 'Components', text: 'Activities, services, receivers and providers - see which are exported, unguarded or reachable.' },
  { icon: Shield, name: 'Security scan', text: 'A MASVS-style static scan of the app, scored on the device.' },
  { icon: Sliders, name: 'App settings', text: 'Flip debuggable, cleartext, backup and WebView debugging before you patch.' },
  { icon: Folder, name: 'App data', text: "The app's own sandbox - shared_prefs, databases and files - watch and edit values live." },
  { icon: Traffic, name: 'Live traffic', text: "Read the app's decrypted HTTPS live in a built-in inspector - requests, headers and bodies." },
  { icon: Logs, name: 'Capture logs', text: "Stream the app's own logcat to TrustAPK over localhost while it runs." },
]

export default function ControlRoom() {
  return (
    <Section id="control-room">
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>The control room</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Load an app - everything opens from one screen
        </h2>
        <p className="mt-4 text-muted-c">
          Pick any installed app or an .apk / .apks / .xapk file and TrustAPK opens a single dashboard
          for the whole assessment. Every tool below is one tap away - then <span className="text-base-c font-medium">Patch this APK</span> when you&rsquo;re ready.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-12 items-start">
        <div className="lg:sticky lg:top-24">
          <PhoneFrame src="./shots/dashboard.jpg" alt="The TrustAPK dashboard for a loaded app" glow />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {tools.map(({ icon: Icon, name, text }) => (
            <div key={name} className="flex gap-3 rounded-2xl border border-base bg-panel p-4 min-w-0">
              <span className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon width={19} height={19} />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm">{name}</h3>
                <p className="mt-1 text-xs text-muted-c leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
