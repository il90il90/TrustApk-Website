import { Cpu, Cloud, Code, Lock } from './Icons.jsx'

const items = [
  { icon: Cpu, title: 'Fully on-device', text: 'Patching, inspection, signing and installing run on the phone - no desktop, no Gradle, no root.' },
  { icon: Cloud, title: 'Local by default', text: 'Nothing leaves the device while you patch and inspect. Exporting evidence, sharing it with an AI app or forwarding logs is your choice.' },
  { icon: Code, title: 'Code preserved', text: "In the default and most modes, the app's original classes*.dex are kept byte-for-byte - only the manifest and resources are edited and new files added." },
  { icon: Lock, title: 'Per-app CA trust', text: 'Trust your proxy inside one app - no system-wide CA install. Managed-device compatibility depends on your org’s install policy.' },
]

export default function ValueProps() {
  return (
    <section className="relative border-y border-base bg-soft" aria-labelledby="valueprops-heading">
      <h2 id="valueprops-heading" className="sr-only">At a glance</h2>
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
