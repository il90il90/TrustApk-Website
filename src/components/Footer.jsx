import { Shield, Telegram, Warning } from './Icons.jsx'
import { TELEGRAM, VERSION } from '../lib/constants.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-base bg-soft">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-4 flex items-start gap-3 mb-10">
          <span className="text-amber-400/90 mt-0.5"><Warning width={18} height={18} /></span>
          <p className="text-sm text-muted-c">
            <span className="font-semibold text-base-c">Use responsibly.</span> TrustAPK is for apps
            you own or are explicitly authorised to test. Patching and inspection run on your device;
            you choose what to export or share.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <a href="#top" className="flex items-center gap-2 font-extrabold">
              <span className="text-brand"><Shield width={24} height={24} /></span>
              <span>Trust<span className="text-gradient">APK</span></span>
            </a>
            <p className="mt-3 text-xs text-muted-c">
              Made with ❤️ from Israel · by{' '}
              <a href={TELEGRAM} target="_blank" rel="noreferrer noopener" className="text-brand hover:underline">
                t.me/IsraelCohen
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex gap-3">
              <a href={TELEGRAM} target="_blank" rel="noreferrer noopener" aria-label="Telegram" className="p-2.5 rounded-lg border border-base bg-panel hover:text-brand transition">
                <Telegram width={18} height={18} />
              </a>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-c sm:justify-end">
              <a href="#features" className="hover:text-base-c">Features</a>
              <a href="#faq" className="hover:text-base-c">FAQ</a>
              <a href="#download" className="hover:text-base-c">Download</a>
              <a href="#contact" className="hover:text-base-c">Contact</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-base flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-c">
          <p>© {year} TrustAPK · v{VERSION}</p>
          <p>
            Uses open source: jadx, smali/baksmali, Guava, XZ for Java, and AdAway-style hosts data.
            All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
