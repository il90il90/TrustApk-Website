import { Section, Kicker } from './Section.jsx'
import { Warning } from './Icons.jsx'

const items = [
  { title: 'Hardened & packed apps resist (e.g. Ijiami)', text: 'Apps reinforced by a commercial hardening SDK such as Ijiami (爱加密) ship their real code encrypted inside a native shell that only unpacks at runtime, wrapped in anti-tamper and anti-debug guards. TrustAPK can’t unpack or defeat that shell, so those apps can’t be unpinned, patched or read - this is one protection it cannot get past.' },
  { title: 'Re-signing can trip integrity checks', text: 'A re-signed build changes the app’s signature, so features gated behind Play Integrity or hardware attestation may refuse to run. Capturing the app’s traffic usually still works - a re-sign only trips those specific attestation checks; it does not break whole categories such as banking apps.' },
  { title: 'Removing a permission is not the same as revoking it', text: 'A permission removed from the manifest can make an app hit a SecurityException it never expected and crash. To just stop camera/mic/location use, revoke it in Settings instead - no reinstall, no data loss.' },
  { title: 'Manifest edits need a reinstall', text: "You can't change an installed app's manifest in place; and because the signature differs, an in-place update over the original isn't possible (Android forces uninstall first)." },
  { title: 'Decompilation is approximate', text: 'The decompiler emits readable Java, not the original source; Kotlin can’t be reconstructed and the output may be partial or imperfect.' },
  { title: 'Native pinning may resist', text: 'Pinning done in native code may need the Frida gadget or runtime bypass to read the traffic.' },
  { title: 'Reinstalling replaces the app', text: 'Installing a patched build in place removes the original and its data (or install it as a separate copy to keep both). Back up anything you need first.' },
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
