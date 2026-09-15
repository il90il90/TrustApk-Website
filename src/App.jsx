import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ValueProps from './components/ValueProps.jsx'
import Stats from './components/Stats.jsx'
import Audience from './components/Audience.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Demo from './components/Demo.jsx'
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
      <Header theme={theme} toggleTheme={toggle} />
      <main>
        <Hero />
        <ValueProps />
        <Stats />
        <Audience />
        <HowItWorks />
        <Demo />
        <Features />
        <Compatibility />
        <Screenshots />
        <WhyItExists />
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
