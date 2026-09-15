import { Section, Kicker } from './Section.jsx'
import {
  Certificate, Unlock, KeyPerm, Search, Code, Logs, Webhook,
  Stethoscope, Sliders, NoAds, Install, Sparkle,
} from './Icons.jsx'

const features = [
  { icon: Sparkle, title: 'AI assistant, everywhere', text: 'Ask AI about the links and secrets you find, generate a replacement app icon by describing it, or run a full AI penetration test - with ChatGPT, Gemini, Claude, Grok or your own prompt.' },
  { icon: Certificate, title: 'Trust your proxy CA', text: 'Writes a network-security config and can bundle your proxy certificate right inside the APK - pick it once, reused for every future patch.' },
  { icon: Unlock, title: 'Remove certificate pinning', text: 'On by default. Detects and neutralises pinning and reports exactly which domains were unpinned. Turn it off to leave the app untouched.' },
  { icon: KeyPerm, title: 'Permissions manager', text: 'Every permission with a plain-language note and a SENSITIVE flag. Untick to strip, or bulk-remove sensitive ones. See what changed after patching.' },
  { icon: Search, title: 'Inspect: links, secrets & files', text: 'Pull every host & URL, surface API keys and tokens (redacted), and browse every file inside the APK - search names and contents.' },
  { icon: Code, title: 'Dex decompiler - smali & Java', text: 'Read the app’s code on the device: an expandable package tree, search across names and contents, smali with highlighting or Java via jadx.' },
  { icon: Logs, title: 'Capture logs', text: 'Adds a tiny companion so TrustAPK can read the app’s own logcat live over localhost - the app’s code stays untouched.' },
  { icon: Webhook, title: 'Webhook forwarding', text: 'Forward captured logs to an HTTP webhook you configure. A foreground service keeps forwarding in the background, resuming after reboot.' },
  { icon: Stethoscope, title: 'Diagnose', text: 'A downloadable report combining static checks, cross-references and a runtime log scan to explain why a patched app might misbehave.' },
  { icon: Sliders, title: 'Advanced & Frida', text: 'Debuggable, cleartext, extractNativeLibs, allowBackup, WebView debugging, screenshots, crash/ANR catcher, Frida gadget & runtime unpinning.' },
  { icon: NoAds, title: 'Ad & tracker blocking', text: 'Optionally block ad/tracker hosts inside the patched app, backed by an AdAway-style hosts list. Blocked hosts are listed on the result screen.' },
  { icon: Install, title: 'Install, clone & signing', text: 'On-device v2/v3 signing, split & bundle handling, and cloning that re-roots the package in the manifest and resources.arsc so lookups keep working.' },
]

export default function Features() {
  return (
    <Section id="features">
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Everything it does</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Features in full</h2>
        <p className="mt-4 text-muted-c">
          A complete toolkit for inspecting and reverse-engineering apps you own - the intercept
          proxy work, plus a full on-device APK explorer and decompiler.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group rounded-2xl border border-base bg-panel p-6 hover:border-brand/40 transition-colors"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors">
              <Icon width={22} height={22} />
            </span>
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-c leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
