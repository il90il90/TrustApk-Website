import { Section, Kicker } from './Section.jsx'
import { Certificate, Install, Lock, Code, Unlock } from './Icons.jsx'

const specs = [
  { icon: Certificate, title: 'Any intercepting proxy', items: ['Reqable', 'mitmproxy', 'Burp Suite', 'Charles', 'Fiddler'] },
  { icon: Install, title: 'Input formats', items: ['.apk', '.apks', '.xapk', '.apkm', 'installed splits'] },
  { icon: Lock, title: 'On-device signing', items: ['APK Signature v2', 'APK Signature v3', 'v2-only fallback'] },
  { icon: Code, title: 'Decompile', items: ['smali (highlighted)', 'Java via jadx', 'package tree + search'] },
  { icon: Unlock, title: 'Pinning bypass', items: ['NSC strip (default)', 'Frida gadget', 'runtime bypass'] },
]

export default function Compatibility() {
  return (
    <Section id="compatibility" soft>
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Compatibility</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Works with your kit</h2>
        <p className="mt-4 text-muted-c">
          Bring the proxy you already use and the APK in whatever shape you have it - TrustAPK handles
          the rest on the device.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {specs.map(({ icon: Icon, title, items }) => (
          <div key={title} className="rounded-2xl border border-base bg-panel p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon width={20} height={20} />
              </span>
              <h3 className="font-semibold">{title}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((it) => (
                <span key={it} className="rounded-md border border-base bg-base px-2.5 py-1 text-xs font-mono text-muted-c">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
