import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ValueProps from './components/ValueProps.jsx'
import Audience from './components/Audience.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import InteractiveDemo from './components/InteractiveDemo.jsx'
import ControlRoom from './components/ControlRoom.jsx'
import AiPentest from './components/AiPentest.jsx'
import Features from './components/Features.jsx'
import Compatibility from './components/Compatibility.jsx'
import Screenshots from './components/Screenshots.jsx'
import WhyItExists from './components/WhyItExists.jsx'
import TechNotes from './components/TechNotes.jsx'
import Comparison from './components/Comparison.jsx'
import Limitations from './components/Limitations.jsx'
import Faq from './components/Faq.jsx'
import Download from './components/Download.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { useTheme } from './lib/useTheme.js'
import { useState, useEffect } from 'react'

export default function App() {
  const { theme, toggle } = useTheme()
  const [demoOpen, setDemoOpen] = useState(false)
  const openDemo = () => setDemoOpen(true)

  // A #demo link (shared or bookmarked) opens the demo directly.
  useEffect(() => {
    const sync = () => setDemoOpen(window.location.hash === '#demo')
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  // Keep the URL shareable while the demo is open, without scrolling the page.
  useEffect(() => {
    const { pathname, search, hash } = window.location
    if (demoOpen && hash !== '#demo') window.history.replaceState(null, '', pathname + search + '#demo')
    if (!demoOpen && hash === '#demo') window.history.replaceState(null, '', pathname + search)
  }, [demoOpen])

  return (
    <div className="bg-base text-base-c min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-brand-surface focus:px-4 focus:py-2 focus:text-[#04140f] focus:font-semibold"
      >
        Skip to main content
      </a>
      <Header theme={theme} toggleTheme={toggle} onOpenDemo={openDemo} />
      <main id="main">
        <Hero onOpenDemo={openDemo} />
        <ValueProps />
        <Audience />
        <WhyItExists />
        <HowItWorks />
        <ControlRoom />
        <AiPentest />
        <Features />
        <Compatibility />
        <Screenshots />
        <TechNotes />
        <Comparison />
        <Limitations />
        <Faq />
        <Download />
        <Contact />
      </main>
      <Footer />
      <InteractiveDemo open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  )
}
