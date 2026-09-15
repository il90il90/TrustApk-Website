import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ValueProps from './components/ValueProps.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Demo from './components/Demo.jsx'
import Features from './components/Features.jsx'
import Screenshots from './components/Screenshots.jsx'
import WhyItExists from './components/WhyItExists.jsx'
import Limitations from './components/Limitations.jsx'
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
        <HowItWorks />
        <Demo />
        <Features />
        <Screenshots />
        <WhyItExists />
        <Limitations />
        <Download />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
