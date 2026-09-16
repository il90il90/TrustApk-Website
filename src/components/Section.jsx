export function Section({ id, children, className = '', soft = false }) {
  return (
    <section id={id} className={`${soft ? 'bg-soft border-y border-base' : ''} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">{children}</div>
    </section>
  )
}

export function Kicker({ children }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
      <span className="inline-flex items-center gap-1.5" aria-hidden="true">
        <span className="h-px w-5 bg-gradient-to-r from-transparent to-brand/70" />
        <span className="h-1 w-1 rotate-45 bg-brand/80" />
      </span>
      {children}
      <span className="inline-flex items-center gap-1.5" aria-hidden="true">
        <span className="h-1 w-1 rotate-45 bg-brand/80" />
        <span className="h-px w-5 bg-gradient-to-l from-transparent to-brand/70" />
      </span>
    </span>
  )
}
