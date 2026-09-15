import { Download, ArrowDown, Github, Check } from './Icons.jsx'
import { VERSION, DOWNLOAD_URL, SOURCE_REPO } from '../lib/constants.js'

const chips = ['No server', 'No root', 'No laptop', 'Nothing uploaded']

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full blur-3xl opacity-30 animate-pulse-glow pointer-events-none"
        style={{ background: 'radial-gradient(circle, #22d3aa 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-base bg-panel px-3 py-1 text-xs text-muted-c mb-6">
          <span className="h-2 w-2 rounded-full bg-brand animate-pulse-glow" />
          v{VERSION} · The field pentester's APK toolkit
        </div>

        <h1 className="animate-fade-up text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
          On-device APK toolkit
          <br className="hidden sm:block" /> for <span className="text-gradient">mobile app pentesting</span>
        </h1>

        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-c">
          Intercept any app's HTTPS, strip certificate pinning, inspect endpoints and secrets, and
          decompile to Java — right on the phone, in the field.
          <span className="text-base-c font-medium"> No server, no root, no laptop. Nothing is uploaded, ever.</span>
        </p>

        <div className="animate-fade-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={DOWNLOAD_URL}
            className="glow inline-flex items-center gap-2 rounded-xl bg-brand text-[#04140f] font-semibold px-6 py-3.5 hover:brightness-110 transition"
          >
            <Download width={20} height={20} /> Download latest APK
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-xl border border-base bg-panel px-6 py-3.5 font-medium hover:text-brand transition"
          >
            <ArrowDown width={18} height={18} /> See how it works
          </a>
          <a
            href={SOURCE_REPO}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-xl border border-base bg-panel px-6 py-3.5 font-medium hover:text-brand transition"
          >
            <Github width={18} height={18} /> Source
          </a>
        </div>

        <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-c">
          {chips.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5">
              <span className="text-brand"><Check width={16} height={16} /></span> {c}
            </span>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted-c/80">
          For apps you own or are explicitly authorised to test. Requires Android 8.0+.
        </p>
      </div>
    </section>
  )
}
