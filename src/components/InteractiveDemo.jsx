import { useState, useRef, useEffect, useCallback } from 'react'
import { Section, Kicker } from './Section.jsx'

const DIR = './shots/sim/'

// Human-readable name per screen (for the caption + a11y).
const TITLE = {
  '00': 'Home', '01': 'Choose an app', '02': 'Dashboard',
  '03': 'Links & endpoints', '05': 'Secrets & keys', '06': 'Files inside',
  '07': 'Components', '08': 'Security scan', '25': 'Capture logs',
  '26': 'Live traffic', '30': 'App data files', '31': 'Permissions',
  '32': 'App settings', '33': 'App info', '34': 'Proxy certificate',
  '37': 'AI pentest · pick evidence', '38': 'Choose your AI',
}

// Tap targets, as percentages of the screen image (x, y, w, h). `to` steps
// forward to another screen; `back: true` closes the current screen (Done /
// Close / the on-screen back arrow) exactly like the phone's Back button.
// Coordinates are measured against each processed screenshot so the box sits
// squarely on the real button.
const HOTSPOTS = {
  '00': [
    { x: 6, y: 21, w: 84, h: 9, to: '01', label: 'Pick an installed app' },
    { x: 6, y: 32.5, w: 84, h: 10.5, to: '01', label: 'Pick an APK file' },
  ],
  '01': [
    { x: 6, y: 37, w: 88, h: 9, to: '02', label: 'Open lichess' },
    { x: 74, y: 22.5, w: 22, h: 4.5, back: true, label: 'Close' },
  ],
  '02': [
    { x: 5, y: 9, w: 62, h: 8, to: '33', label: 'App info' },
    { x: 6, y: 19, w: 27, h: 9, to: '03', label: 'Links' },
    { x: 35, y: 19, w: 27, h: 9, to: '05', label: 'Secrets' },
    { x: 64, y: 19, w: 28, h: 9, to: '06', label: 'Files' },
    { x: 6, y: 28, w: 27, h: 8, to: '07', label: 'Components' },
    { x: 35, y: 28, w: 27, h: 8, to: '08', label: 'Security scan' },
    { x: 64, y: 28, w: 28, h: 8, to: '32', label: 'App settings' },
    { x: 6, y: 36.5, w: 86, h: 5.5, to: '30', label: 'App data' },
    { x: 6, y: 42.5, w: 86, h: 5.5, to: '26', label: 'Live traffic' },
    { x: 6, y: 48.5, w: 86, h: 5.5, to: '25', label: 'Capture logs' },
    { x: 6, y: 59.5, w: 86, h: 6, to: '31', label: 'Permissions' },
    { x: 6, y: 66, w: 86, h: 9, to: '34', label: 'Remove certificate pinning - proxy certificate' },
  ],
  // Security scan -> Ask AI opens the pentest bundle picker.
  '08': [{ x: 5, y: 18, w: 90, h: 5, to: '37', label: 'Ask AI - review all findings' }],
  // Leaf screens: close via their Done / Close / back arrow.
  '03': [{ x: 75, y: 4.5, w: 22, h: 4, back: true, label: 'Done' }],
  '05': [{ x: 75, y: 8.5, w: 22, h: 4, back: true, label: 'Done' }],
  '06': [{ x: 75, y: 16, w: 22, h: 4, back: true, label: 'Done' }],
  '07': [{ x: 3, y: 6, w: 14, h: 5, back: true, label: 'Back' }],
  '25': [{ x: 3, y: 4.5, w: 14, h: 5, back: true, label: 'Back' }],
  '26': [{ x: 3, y: 5, w: 14, h: 5, back: true, label: 'Back' }],
  '30': [{ x: 3, y: 6, w: 14, h: 5, back: true, label: 'Back' }],
  '31': [{ x: 75, y: 9, w: 22, h: 4, back: true, label: 'Done' }],
  '32': [{ x: 75, y: 4.5, w: 22, h: 4, back: true, label: 'Done' }],
  '34': [{ x: 75, y: 11, w: 22, h: 4, back: true, label: 'Done' }],
  // Pick evidence -> Run pentest opens the AI chooser; Not now closes it.
  '37': [
    { x: 62, y: 86.5, w: 32, h: 6, to: '38', label: 'Run pentest' },
    { x: 39, y: 86.5, w: 21, h: 6, back: true, label: 'Not now' },
  ],
}

const START = '00'

function Screen({ id }) {
  return (
    <picture>
      <source type="image/webp" srcSet={`${DIR}sim-${id}.webp`} />
      <img
        src={`${DIR}sim-${id}.jpg`}
        alt={TITLE[id] || 'TrustAPK screen'}
        className="block w-full select-none"
        draggable="false"
      />
    </picture>
  )
}

const NavIcon = ({ d, fill = 'none' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)

export default function InteractiveDemo() {
  const [stack, setStack] = useState([START])
  const current = stack[stack.length - 1]
  const scrollRef = useRef(null)
  const liveRef = useRef(null)
  const hots = HOTSPOTS[current] || []
  const hasForward = hots.some((h) => !h.back)

  // Respect reduced-motion: skip the brief on-load "tap here" pulse.
  const [animate, setAnimate] = useState(true)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setAnimate(!mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  const go = useCallback((to) => setStack((s) => [...s, to]), [])
  const back = useCallback(() => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)), [])
  const home = useCallback(() => setStack([START]), [])

  // Reset scroll to the top and announce the screen on every change.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    if (liveRef.current) liveRef.current.textContent = `Screen: ${TITLE[current] || current}`
  }, [current])

  return (
    <Section id="demo" soft>
      <div className="text-center max-w-2xl mx-auto">
        <Kicker>Live demo</Kicker>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Try the app, right here</h2>
        <p className="mt-4 text-muted-c">
          A real hands-on demo. Tap the buttons on the screen like you would on your phone, scroll inside
          it, and use the back button to step out - exactly how TrustAPK feels in your hand.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center">
        {/* Phone */}
        <div className="relative mx-auto w-full max-w-[300px]">
          <span className="absolute -left-[3px] top-[24%] h-10 w-[3px] rounded-l bg-[#243244]" aria-hidden="true" />
          <span className="absolute -left-[3px] top-[36%] h-16 w-[3px] rounded-l bg-[#243244]" aria-hidden="true" />
          <span className="absolute -right-[3px] top-[28%] h-20 w-[3px] rounded-r bg-[#243244]" aria-hidden="true" />

          <div className="relative rounded-[2.6rem] p-[3px] bg-gradient-to-b from-[#2a3a4d] via-[#0e151e] to-[#2a3a4d] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.65)] ring-1 ring-brand/20">
            <div className="relative rounded-[2.4rem] border-[7px] border-[#080c12] bg-[#080c12]">
              {/* camera pill */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-[16px] w-[58px] rounded-full bg-black/90 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1b2836]" />
              </div>

              {/* screen: scrolls inside */}
              <div
                ref={scrollRef}
                className="relative overflow-y-auto thin-scroll rounded-t-[1.9rem] aspect-[720/1580] bg-[#0a0f16] overscroll-contain"
              >
                <div className="relative">
                  <Screen id={current} />
                  {hots.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => (h.back ? back() : go(h.to))}
                      aria-label={h.label}
                      className="absolute rounded-xl cursor-pointer bg-transparent hover:bg-brand/15 hover:ring-2 hover:ring-brand/60 active:bg-brand/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors"
                      style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
                    >
                      {animate && (
                        <span
                          key={current}
                          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-brand/60 bg-brand/10 opacity-0 animate-hint-tap"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Android nav bar */}
              <div className="flex items-center justify-around rounded-b-[1.9rem] bg-[#05080c] py-2.5 text-white/70">
                <button onClick={back} disabled={stack.length <= 1} aria-label="Back" className="p-1.5 rounded-lg hover:text-white disabled:opacity-30 disabled:hover:text-white/70 transition-colors">
                  <NavIcon d={<path d="M15 5l-7 7 7 7" />} />
                </button>
                <button onClick={home} aria-label="Home" className="p-1.5 rounded-lg hover:text-white transition-colors">
                  <NavIcon d={<circle cx="12" cy="12" r="8" />} />
                </button>
                <button onClick={back} aria-label="Recent apps" className="p-1.5 rounded-lg hover:text-white transition-colors">
                  <NavIcon d={<rect x="5" y="5" width="14" height="14" rx="2" />} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* caption + hint */}
        <p className="sr-only" aria-live="polite" ref={liveRef} />
        <div className="mt-5 flex items-center gap-2 text-sm text-muted-c">
          <span className="inline-block h-2 w-2 rounded-full bg-brand animate-pulse-glow" />
          {hasForward ? (
            <span>You&rsquo;re on <span className="text-base-c font-medium">{TITLE[current]}</span> - tap any button to open it</span>
          ) : hots.length > 0 ? (
            <span>On <span className="text-base-c font-medium">{TITLE[current]}</span> - tap Done, or the back button, to go back</span>
          ) : (
            <span><span className="text-base-c font-medium">{TITLE[current]}</span> - use the back button to go back</span>
          )}
        </div>
      </div>
    </Section>
  )
}
