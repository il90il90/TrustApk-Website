export function Section({ id, children, className = '', soft = false }) {
  return (
    <section id={id} className={`${soft ? 'bg-soft border-y border-base' : ''} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">{children}</div>
    </section>
  )
}

export function Kicker({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
      <span className="h-px w-6 bg-brand/60" />
      {children}
      <span className="h-px w-6 bg-brand/60" />
    </span>
  )
}
