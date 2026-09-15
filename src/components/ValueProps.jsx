import { Cpu, Cloud, Code, Lock } from './Icons.jsx'

const items = [
  { icon: Cpu, title: 'Fully on-device', text: 'Patching, signing and installing all happen on the phone. No desktop, no Gradle, no root.' },
  { icon: Cloud, title: 'Nothing uploaded', text: 'No APK ever leaves the device during patching. Your apps and data stay with you.' },
  { icon: Code, title: 'Code untouched', text: "The app's own classes*.dex stay byte-for-byte identical. Only the manifest & resources change." },
  { icon: Lock, title: 'Per-app CA trust', text: 'Trust your proxy inside one app — no system-wide CA, no scary warning, works on MDM devices.' },
]

export default function ValueProps() {
  return (
    <section className="relative border-y border-base bg-soft">
      <div className="mx-auto max-w-6xl px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon width={22} height={22} />
            </span>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-c leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
