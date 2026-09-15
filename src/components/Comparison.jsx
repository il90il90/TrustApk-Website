import { Section, Kicker } from './Section.jsx'
import { Check, Close } from './Icons.jsx'

const rows = [
  ['Runs entirely on the phone', true, false],
  ['No rooted device needed', true, false],
  ['No laptop / desktop in the room', true, false],
  ['No Android Studio, Gradle or SDK', true, false],
  ['Per-app CA trust (no system CA)', true, false],
  ['Works on locked-down / MDM devices', true, false],
  ['App’s own code left byte-for-byte intact', true, 'partial'],
  ['Nothing uploaded to any server', true, false],
]

function Cell({ v }) {
  if (v === true) return <span className="inline-flex text-brand"><Check width={20} height={20} /></span>
  if (v === 'partial') return <span className="text-amber-400/90 text-xs font-medium">varies</span>
  return <span className="inline-flex text-muted-c/50"><Close width={18} height={18} /></span>
}

export default function Comparison() {
  return (
    <Section id="compare">
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Why TrustAPK</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">The old way vs. one app</h2>
        <p className="mt-4 text-muted-c">
          The usual mobile-intercept setup means a rooted phone, desktop Frida attached, or a full
          Android Studio build. TrustAPK folds it into a single on-device app.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-base">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-panel">
              <th className="text-left font-medium text-muted-c px-4 sm:px-6 py-4">Capability</th>
              <th className="px-3 py-4 text-center font-bold text-brand w-24 sm:w-32">TrustAPK</th>
              <th className="px-3 py-4 text-center font-medium text-muted-c w-28 sm:w-44">Root + Frida + desktop</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, a, b], i) => (
              <tr key={label} className={i % 2 ? 'bg-panel/40' : ''}>
                <td className="px-4 sm:px-6 py-3.5 text-base-c border-t border-base">{label}</td>
                <td className="px-3 py-3.5 text-center border-t border-base bg-brand/[0.04]"><Cell v={a} /></td>
                <td className="px-3 py-3.5 text-center border-t border-base"><Cell v={b} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-xs text-muted-c">
        Trade-off: re-signing with your own key breaks server-side integrity checks (see limitations) —
        the classic setups avoid that but cost you a rooted device and a laptop.
      </p>
    </Section>
  )
}
