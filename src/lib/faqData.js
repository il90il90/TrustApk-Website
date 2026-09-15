// Single source of truth for the FAQ - feeds both the rendered <Faq> component
// and the FAQPage JSON-LD injected at build time (see scripts/prerender.mjs),
// so the two can never drift apart.
export const faqs = [
  {
    q: 'Is this legal to use?',
    a: 'TrustAPK is for apps you own or are explicitly authorised to test - the same rule as any pentest tool. It makes an app you’re assessing trust your proxy so you can inspect its own traffic. Patching and inspection happen on your device; you decide whether to export or share any evidence.',
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
    q: 'Will apps work after patching?',
    a: 'Compatibility varies by app. Because the APK is re-signed with your key, apps with server-side signature or Play-Integrity checks (many banking and large apps) may refuse to talk to their backend. That’s how Android’s signature model works - it’s a limitation of re-signing, not a bug.',
  },
  {
    q: 'What uses the network?',
    a: 'Patching and local inspection don’t need the network. The app does reach out for: license validation, update checks, the optional ad-block hosts list, an optional Frida-gadget download, any log webhook you configure, and - as its core job - the live traffic it proxies for the app under test. Sharing evidence to an AI assistant is handed to that app by Android, not uploaded by TrustAPK.',
  },
  {
    q: 'Which AI does it use, and what does it see?',
    a: 'Your own. TrustAPK has no built-in AI model - it shares a bundle into a chat app you have installed (ChatGPT, Gemini, Claude, Grok, ...) via Android’s share sheet, and you can add a custom prompt. You choose which evidence to include (app identity is always in, everything else is optional); that bundle can contain sensitive data such as captured traffic, logs, decompiled code or the APK.',
  },
  {
    q: 'Is it free?',
    a: 'The APK is free to download from GitHub Releases, but using it requires a paid license. Message the developer on Telegram to get a key.',
  },
]
