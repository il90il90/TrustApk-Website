import { useState } from 'react'
import { Section, Kicker } from './Section.jsx'
import { faqs } from '../lib/faqData.js'

function Item({ q, a, open, onClick, id }) {
  const btnId = `faq-q-${id}`
  const panelId = `faq-a-${id}`
  return (
    <div className="border-b border-base">
      <button
        id={btnId}
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-medium">{q}</span>
        <span
          aria-hidden="true"
          className={`flex-shrink-0 text-brand transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        aria-hidden={!open}
        className={`grid transition-all duration-200 ${open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}
      >
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
            <Item key={f.q} {...f} id={i} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </Section>
  )
}
