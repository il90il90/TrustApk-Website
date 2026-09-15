const stats = [
  { n: '406', l: 'HTTPS requests decrypted', s: 'in one assessment' },
  { n: '0', l: 'bytes uploaded', s: 'everything stays on-device' },
  { n: '139', l: 'hosts mapped', s: '729 URLs across 124 domains' },
  { n: '75', l: 'components enumerated', s: '31 exported, 27 unguarded' },
]

export default function Stats() {
  return (
    <section className="border-y border-base bg-soft">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-4xl sm:text-5xl font-extrabold text-gradient">{s.n}</div>
            <div className="mt-2 font-semibold text-sm">{s.l}</div>
            <div className="mt-1 text-xs text-muted-c">{s.s}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
