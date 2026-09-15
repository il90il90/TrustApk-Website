import { useState } from 'react'
import { Section, Kicker } from './Section.jsx'

const faqs = [
  {
    q: 'Is this legal to use?',
    a: 'TrustAPK is for apps you own or are explicitly authorised to test - the same rule as any pentest tool. It doesn’t bypass licensing or DRM; it makes an app you’re assessing trust your proxy so you can inspect its own traffic. Everything happens on your device and nothing is uploaded.',
  },
  {
    q: 'Do I need a rooted phone?',
    a: 'No. TrustAPK re-signs and installs the patched app through Android’s normal package installer. No root, no custom ROM, no desktop - it runs on a stock phone (Android 8.0+).',
  },
  {
    q: 'Which proxies does it work with?',
    a: 'Any intercepting proxy that exports a CA certificate - Reqable, mitmproxy, Burp Suite, Charles, Fiddler. You export the CA once, pick it in TrustAPK, and it’s bundled inside the patched app.',
  },
  {
    q: 'What about certificate pinning?',
    a: 'Pinning declared in the network-security config and common setups is stripped by default (you can see which domains were unpinned). For apps that pin in native or OkHttp code, add the bundled Frida gadget with the unpinning script, or use the runtime bypass - no desktop Frida required.',
  },
  {
    q: 'Will every app work after patching?',
    a: 'Most do. Because the APK is re-signed with your key, apps with server-side signature or Play-Integrity checks (many banking and large apps) may refuse to talk to their backend. That’s how Android’s signature model works and isn’t fixable by patching - it’s an honest limitation, not a bug.',
  },
  {
    q: 'Does anything leave my device?',
    a: 'No APK ever leaves the device during patching, signing or installing. The app requests INTERNET only for the optional ad-block hosts list and a log webhook you configure yourself.',
  },
  {
    q: 'Which AI does it use, and what does it see?',
    a: 'Your own. Pick ChatGPT, Gemini, Claude or Grok, or set a custom prompt. You tick exactly which artefacts to include - the app identity is always in, everything else is optional - and nothing is gathered or sent until you tap Run pentest.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. Download the signed APK from GitHub Releases at no cost, and the in-app updater keeps it current automatically.',
  },
]

function Item({ q, a, open, onClick }) {
  return (
    <div className="border-b border-base">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <span className={`flex-shrink-0 text-brand transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div className={`grid transition-all duration-200 ${open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="text-sm text-muted-c leading-relaxed pr-8">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq" soft>
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
        <div>
          <Kicker>FAQ</Kicker>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Questions, answered</h2>
          <p className="mt-4 text-muted-c">
            The things pentesters and researchers ask before their first patch. Still stuck?{' '}
            <a href="#contact" className="text-brand hover:underline">Get in touch</a>.
          </p>
        </div>
        <div>
          {faqs.map((f, i) => (
            <Item key={f.q} {...f} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </Section>
  )
}
