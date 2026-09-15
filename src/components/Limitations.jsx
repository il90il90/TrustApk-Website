import { Section, Kicker } from './Section.jsx'
import { Warning } from './Icons.jsx'

const items = [
  { title: 'Re-signing breaks integrity checks', text: 'Apps with server-side signature/integrity checks (banking, Play-Integrity-gated services) may reject a re-signed build. That’s how Android’s signature model works — not fixable by patching.' },
  { title: 'Removing a permission ≠ revoking it', text: 'A permission removed from the manifest can make an app hit a SecurityException it never expected and crash. To just stop camera/mic/location use, revoke it in Settings instead — no reinstall, no data loss.' },
  { title: 'Manifest edits need a reinstall', text: "You can't change an installed app's manifest in place; and because the signature differs, an in-place update over the original isn't possible (Android forces uninstall first)." },
  { title: 'Kotlin isn’t recoverable', text: 'The Java decompiler emits equivalent Java, not the original Kotlin source.' },
  { title: 'Native pinning may resist', text: 'Pinning done in native code may need the Frida gadget or runtime bypass, and very hardened apps can still resist inspection.' },
]

export default function Limitations() {
  return (
    <Section id="limits" soft>
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Honest limitations</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">What it can&rsquo;t do</h2>
        <p className="mt-4 text-muted-c">
          TrustAPK is deliberately transparent about its boundaries. No magic, no overclaiming.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {items.map((it) => (
          <div key={it.title} className="flex gap-3 rounded-2xl border border-base bg-panel p-5">
            <span className="flex-shrink-0 text-amber-400/90 mt-0.5"><Warning width={20} height={20} /></span>
            <div>
              <h3 className="font-semibold text-sm">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-c leading-relaxed">{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
