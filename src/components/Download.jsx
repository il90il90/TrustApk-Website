import { Section, Kicker } from './Section.jsx'
import { Download as DownloadIcon, Check, Telegram, Warning } from './Icons.jsx'
import { VERSION, DOWNLOAD_URL, RELEASES_PAGE, TELEGRAM } from '../lib/constants.js'

// First-run setup, shared by both capture paths.
const setup = [
  'Install TrustAPK and, when Android asks, allow TrustAPK to install unknown apps.',
  'On the home screen, pick an installed app (splits included) or an .apk / .apks / .xapk file.',
]

// Path A: read traffic in TrustAPK's own inspector - no computer needed.
const builtInPath = [
  'Leave "Remove certificate pinning" on and tap "Patch this APK".',
  'Install the patched build (allow the install if Android prompts for the patched app too).',
  'Open the app, then read its live HTTPS in TrustAPK’s built-in traffic inspector.',
]

// Path B: send traffic to a desktop proxy (Burp / mitmproxy / Reqable / Charles).
const proxyPath = [
  'In your proxy, export its CA certificate; in TrustAPK, select that certificate before patching.',
  'Patch and install as above, then point your phone’s Wi-Fi proxy at your desktop tool.',
  'Open the app - its traffic is now readable in your proxy.',
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

            <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3 text-xs text-muted-c">
              <span className="text-amber-400/90 mt-0.5"><Warning width={14} height={14} /></span>
              Installing a patched build in place replaces the original app and its data. Install it as a
              separate copy, or back up first, if you need to keep the original.
            </div>

            <ol className="mt-4 space-y-3">
              {setup.map((s, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-brand/10 text-brand grid place-items-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-muted-c leading-relaxed pt-0.5">{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-base bg-panel p-4">
                <p className="text-xs font-semibold text-base-c">Path A · Built-in inspector</p>
                <p className="text-[11px] text-muted-c mb-2">No computer needed.</p>
                <ol className="space-y-2">
                  {builtInPath.map((s, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-muted-c leading-relaxed">
                      <span className="text-brand font-bold">{idx + 3}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-xl border border-base bg-panel p-4">
                <p className="text-xs font-semibold text-base-c">Path B · Desktop proxy</p>
                <p className="text-[11px] text-muted-c mb-2">Burp / mitmproxy / Reqable.</p>
                <ol className="space-y-2">
                  {proxyPath.map((s, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-muted-c leading-relaxed">
                      <span className="text-brand font-bold">{idx + 3}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 text-xs text-muted-c">
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
