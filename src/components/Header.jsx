import { useEffect, useState } from 'react'
import { Shield, Github, Sun, Moon, Download, Menu, Close } from './Icons.jsx'
import { RELEASES_PAGE, DOWNLOAD_URL } from '../lib/constants.js'

const links = [
  { href: '#pentest', label: 'Who it’s for' },
  { href: '#how', label: 'How it works' },
  { href: '#demo', label: 'Demo' },
  { href: '#ai', label: 'AI pentest' },
  { href: '#features', label: 'Features' },
  { href: '#faq', label: 'FAQ' },
  { href: '#download', label: 'Download' },
]

export default function Header({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-header backdrop-blur-md border-b border-base' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="text-brand"><Shield width={26} height={26} /></span>
          <span className="text-lg">Trust<span className="text-gradient">APK</span></span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-c">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-base-c transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2 rounded-lg border border-base bg-panel hover:text-brand transition-colors"
          >
            {theme === 'light' ? <Moon width={18} height={18} /> : <Sun width={18} height={18} />}
          </button>
          <a
            href={RELEASES_PAGE}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Releases on GitHub"
            className="hidden sm:inline-flex p-2 rounded-lg border border-base bg-panel hover:text-brand transition-colors"
          >
            <Github width={18} height={18} />
          </a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-brand text-[#04140f] font-semibold text-sm px-3.5 py-2 hover:brightness-110 transition"
          >
            <Download width={16} height={16} /> Download
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg border border-base bg-panel"
          >
            {open ? <Close width={18} height={18} /> : <Menu width={18} height={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-base bg-base shadow-xl">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-muted-c hover:text-base-c"
              >
                {l.label}
              </a>
            ))}
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand text-[#04140f] font-semibold px-4 py-2.5"
            >
              <Download width={16} height={16} /> Download latest APK
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
