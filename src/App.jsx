import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ValueProps from './components/ValueProps.jsx'
import Audience from './components/Audience.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Demo from './components/Demo.jsx'
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

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <div className="bg-base text-base-c min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-brand-surface focus:px-4 focus:py-2 focus:text-[#04140f] focus:font-semibold"
      >
        Skip to main content
      </a>
      <Header theme={theme} toggleTheme={toggle} />
      <main id="main">
        <Hero />
        <ValueProps />
        <Audience />
        <WhyItExists />
        <HowItWorks />
        <Demo />
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
    </div>
  )
}
