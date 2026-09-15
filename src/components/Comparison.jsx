import { Section, Kicker } from './Section.jsx'
import { Check, Close } from './Icons.jsx'

// Honest comparison: TrustAPK wins on convenience, and the trade-offs (re-signing,
// paid license) are shown as wins for the classic setup - no manufactured X's.
const rows = [
  ['Runs entirely on the phone (no computer)', 'yes', 'no'],
  ['Works without rooting the device', 'yes', 'no'],
  ['Capture, inspect & decompile in one app', 'yes', 'depends'],
  ['Keeps the app’s original signature', 'no', 'yes'],
  ['Free / open source', 'no', 'yes'],
]

function Cell({ v }) {
  if (v === 'yes')
    return (
      <span className="inline-flex items-center gap-1.5 text-brand">
        <Check width={16} height={16} aria-hidden="true" /> Yes
      </span>
    )
  if (v === 'depends')
    return <span className="text-amber-400/90 text-xs font-semibold">Depends</span>
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-c">
      <Close width={14} height={14} aria-hidden="true" /> No
    </span>
  )
}

export default function Comparison() {
  return (
    <Section id="compare">
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Why TrustAPK</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">The old way vs. one app</h2>
        <p className="mt-4 text-muted-c">
          The usual mobile-intercept setup means a rooted phone with desktop Frida attached. TrustAPK
          folds capture, inspection and patching into one on-device app - with real trade-offs.
        </p>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-base thin-scroll">
        <table className="w-full min-w-[30rem] text-sm">
          <caption className="sr-only">TrustAPK compared with a rooted phone plus desktop Frida</caption>
          <thead>
            <tr className="bg-panel">
              <th scope="col" className="text-left font-medium text-muted-c px-4 sm:px-6 py-4">Capability</th>
              <th scope="col" className="px-3 py-4 text-center font-bold text-brand w-24 sm:w-32">TrustAPK</th>
              <th scope="col" className="px-3 py-4 text-center font-medium text-muted-c w-28 sm:w-44">Root + desktop Frida</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, a, b], i) => (
              <tr key={label} className={i % 2 ? 'bg-panel-soft' : ''}>
                <th scope="row" className="text-left font-normal px-4 sm:px-6 py-3.5 text-base-c border-t border-base">{label}</th>
                <td className="px-3 py-3.5 text-center border-t border-base bg-brand/[0.04]"><Cell v={a} /></td>
                <td className="px-3 py-3.5 text-center border-t border-base"><Cell v={b} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-xs text-muted-c">
        TrustAPK trades some things for convenience: it re-signs the APK (which can break server-side
        integrity checks) and needs a paid license. The classic setup avoids both, but needs a computer
        and a rooted device.
      </p>
    </Section>
  )
}
