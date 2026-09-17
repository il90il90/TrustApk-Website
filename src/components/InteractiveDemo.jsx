import { useState, useRef, useEffect, useCallback } from 'react'
import { Section, Kicker } from './Section.jsx'

const DIR = './shots/sim/'

// Human-readable name per screen (for the caption + a11y).
const TITLE = {
  '00': 'Home', '01': 'Choose an app', '02': 'Dashboard',
  '03': 'Links & endpoints', '05': 'Secrets & keys', '06': 'Files inside',
  '07': 'Components', '08': 'Security scan', '30': 'App data files',
  '31': 'Permissions', '32': 'Capture logs', '33': 'Live traffic',
  '34': 'App settings',
}

// Forward tap targets, as percentages of the screen image (x, y, w, h).
// Only the three "hub" screens need them; every other screen is reached from
// here and returns with the phone's Back button.
const HOTSPOTS = {
  '00': [
    { x: 9, y: 22, w: 82, h: 9, to: '01', label: 'Pick an installed app' },
    { x: 9, y: 32, w: 82, h: 8, to: '01', label: 'Pick an APK file' },
  ],
  '01': [{ x: 6, y: 34, w: 88, h: 10, to: '02', label: 'Open lichess' }],
  '02': [
    { x: 8, y: 19, w: 27, h: 9, to: '03', label: 'Links' },
    { x: 37, y: 19, w: 26, h: 9, to: '05', label: 'Secrets' },
    { x: 65, y: 19, w: 27, h: 9, to: '06', label: 'Files' },
    { x: 8, y: 28, w: 27, h: 8, to: '07', label: 'Components' },
    { x: 37, y: 28, w: 26, h: 8, to: '08', label: 'Security scan' },
    { x: 65, y: 28, w: 27, h: 8, to: '34', label: 'App settings' },
    { x: 8, y: 36.5, w: 84, h: 6, to: '30', label: 'App data' },
    { x: 8, y: 43, w: 84, h: 6, to: '33', label: 'Live traffic' },
    { x: 8, y: 49.5, w: 84, h: 5.5, to: '32', label: 'Capture logs' },
    { x: 8, y: 60.5, w: 84, h: 5.5, to: '31', label: 'Permissions' },
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
                className="relative overflow-y-auto thin-scroll rounded-t-[1.9rem] aspect-[9/19] bg-[#0a0f16] overscroll-contain"
              >
                <div className="relative">
                  <Screen id={current} />
                  {hots.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => go(h.to)}
                      aria-label={h.label}
                      className="absolute rounded-lg ring-1 ring-brand/40 bg-brand/5 hover:bg-brand/15 hover:ring-brand/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors animate-pulse-glow"
                      style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
                    />
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
          {hots.length > 0 ? (
            <span>You&rsquo;re on <span className="text-base-c font-medium">{TITLE[current]}</span> - tap a highlighted button</span>
          ) : (
            <span><span className="text-base-c font-medium">{TITLE[current]}</span> - use the back button to go back</span>
          )}
        </div>
      </div>
    </Section>
  )
}
