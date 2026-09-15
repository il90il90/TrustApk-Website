import { useState } from 'react'
import { Section, Kicker } from './Section.jsx'
import { Telegram } from './Icons.jsx'
import { TELEGRAM, FORMSPREE_ENDPOINT, CONTACT_EMAIL } from '../lib/constants.js'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    // No backend: use Formspree if configured, otherwise fall back to a mailto draft.
    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`TrustAPK - message from ${form.name || 'website'}`)
      const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      return
    }
    try {
      setStatus('sending')
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" soft>
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <Kicker>Get in touch</Kicker>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Questions, bugs or ideas?
          </h2>
          <p className="mt-4 text-muted-c leading-relaxed">
            The fastest way to reach the author is Telegram, or drop a message with the form.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl bg-[#229ED9] text-white font-semibold px-5 py-3 hover:brightness-110 transition"
            >
              <Telegram width={20} height={20} /> Message on Telegram
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-base bg-panel p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={update('name')}
                className="mt-1 w-full rounded-lg border border-base bg-base px-3 py-2.5 text-sm outline-none focus:border-brand transition"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                className="mt-1 w-full rounded-lg border border-base bg-base px-3 py-2.5 text-sm outline-none focus:border-brand transition"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium">Message</span>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={update('message')}
              className="mt-1 w-full rounded-lg border border-base bg-base px-3 py-2.5 text-sm outline-none focus:border-brand transition resize-y"
              placeholder="How can we help?"
            />
          </label>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-lg bg-brand text-[#04140f] font-semibold px-5 py-3 hover:brightness-110 transition disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : FORMSPREE_ENDPOINT ? 'Send message' : 'Compose email'}
          </button>
          {status === 'sent' && <p className="text-sm text-brand">Thanks - your message was sent.</p>}
          {status === 'error' && <p className="text-sm text-amber-400">Something went wrong. Try Telegram or GitHub instead.</p>}
          {!FORMSPREE_ENDPOINT && (
            <p className="text-xs text-muted-c">
              This form opens your email app. To receive messages automatically, add a Formspree
              endpoint in <span className="font-mono">src/lib/constants.js</span>.
            </p>
          )}
        </form>
      </div>
    </Section>
  )
}
