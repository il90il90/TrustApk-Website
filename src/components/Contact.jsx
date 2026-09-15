import { Section, Kicker } from './Section.jsx'
import { Telegram } from './Icons.jsx'
import { TELEGRAM } from '../lib/constants.js'

export default function Contact() {
  return (
    <Section id="contact" soft>
      <div className="max-w-xl mx-auto text-center">
        <Kicker>Get in touch</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
          Questions, licenses or ideas?
        </h2>
        <p className="mt-4 text-muted-c leading-relaxed">
          The fastest way to reach the developer - for a license key, a question or a bug - is Telegram.
        </p>

        <div className="mt-7 flex justify-center">
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-xl bg-[#229ED9] text-white font-semibold px-6 py-3.5 hover:brightness-110 transition"
          >
            <Telegram width={20} height={20} /> Message on Telegram
          </a>
        </div>
      </div>
    </Section>
  )
}
