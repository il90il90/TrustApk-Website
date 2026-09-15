import { Section, Kicker } from './Section.jsx'
import { Download as DownloadIcon, Check, Telegram } from './Icons.jsx'
import { VERSION, DOWNLOAD_URL, RELEASES_PAGE, TELEGRAM } from '../lib/constants.js'

const quickstart = [
  'Install TrustAPK and allow it to install unknown apps when asked.',
  'Open your proxy (Reqable / mitmproxy / Burp / Charles) and export its CA certificate.',
  'On the home screen, pick an installed app (or an APK file).',
  'Leave "Remove certificate pinning" on and tap "Patch this APK".',
  'Install it now - replace, or as a separate copy.',
  'Point your Wi-Fi proxy at your tool and open the app - traffic is readable.',
]

export default function Download() {
  return (
    <Section id="download">
      <div className="rounded-3xl border border-base bg-gradient-to-b from-brand/[0.08] to-transparent p-8 sm:p-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <Kicker>Get started</Kicker>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Download &amp; patch your first app
            </h2>
            <p className="mt-4 text-muted-c leading-relaxed">
              The signed APK is free to download from GitHub Releases and the in-app updater keeps it
              current. Using it requires a paid license - message the developer on Telegram to get a key.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="glow inline-flex items-center justify-center gap-2 rounded-xl bg-brand text-[#04140f] font-semibold px-6 py-3.5 hover:brightness-110 transition"
              >
                <DownloadIcon width={20} height={20} /> Download v{VERSION}
              </a>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-base bg-panel px-6 py-3.5 font-medium hover:text-brand transition"
              >
                <Telegram width={18} height={18} /> Get a license
              </a>
            </div>
            <a
              href={RELEASES_PAGE}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-block text-sm text-muted-c hover:text-brand transition"
            >
              All releases
            </a>

            <div className="mt-8 flex items-start gap-2 rounded-xl border border-base bg-panel p-4 text-xs text-muted-c">
              <span className="text-brand mt-0.5"><Check width={14} height={14} /></span>
              Signed with a stable key, so the in-app updater can upgrade it in place. On first install,
              allow installing unknown apps when Android asks.
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-c">Quick start</p>
            <ol className="mt-4 space-y-3">
              {quickstart.map((s, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-brand/10 text-brand grid place-items-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-muted-c leading-relaxed pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-start gap-2 text-xs text-muted-c">
              <span className="text-brand mt-0.5"><Check width={14} height={14} /></span>
              Android 8.0+ (min SDK 26). Patching and inspection run locally; the network is used for
              license validation, update checks, the optional ad-block list and Frida download, and any
              webhook you set.
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
