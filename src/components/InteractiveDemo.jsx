import { useState, useRef, useEffect, useCallback } from 'react'
import { Close } from './Icons.jsx'

const DIR = './shots/sim/'

// Human-readable name per screen (for the caption + a11y).
const TITLE = {
  '00': 'Home', '01': 'Choose an app', '02': 'Dashboard',
  '03': 'Links & endpoints', '05': 'Secrets & keys', '06': 'Files inside',
  '07': 'Components', '08': 'Security scan', '25': 'Capture logs',
  '26': 'Request detail', '30': 'App data files', '31': 'Permissions',
  '57': 'Live traffic',
  '32': 'App settings', '33': 'App info', '34': 'Proxy certificate',
  '37': 'AI pentest · pick evidence', '38': 'Choose your AI',
  '39': 'AndroidManifest.xml', '40': 'Log actions', '43': 'Editing app data',
  '44': 'Appearance & license', '45': 'Ask AI', '46': 'Add domains to block',
  '47': 'App info · Force stop', '48': 'Ad-block · mark hosts', '49': 'Ad-block lists',
  '50': 'Ad-block lists loaded', '23': 'Patched & installed',
  '51': 'Saved requests', '52': 'Request runner',
  '53': 'Ad-block · 2 to block', '54': 'Ad-block · 1 to block',
  '55': 'Filter logs', '56': 'Send logs to AI',
  '58': 'Secrets · values', '59': 'kotlin package', '60': 'Rewrite & Debug',
  '61': 'New rule', '62': 'Request · response', '63': 'cURL preview',
  '64': 'Save request', '65': 'Clear request', '66': 'Webhook forwarding',
  '68': 'Traffic filter', '69': 'Tag request', '70': 'Request · cURL',
  '71': 'META-INF folder', '72': 'META-INF / com',
  '04': 'All endpoint URLs', '09': 'App data · not ready',
  '11': 'Capture traffic · choose', '12': 'Traffic capture · not ready',
  '14': 'Capture logs · not on', '16': 'Patch summary',
  '17': 'Already installed', '18': 'Could not remove it',
  '19': 'App info · uninstall', '21': 'Install this app?', '22': 'Installing…',
  '24': 'Dashboard · patched', '27': 'Request · headers',
  '28': 'Response · body', '29': 'Response · headers', '36': 'HTTP method',
}

// Tap targets, as percentages of the screen image (x, y, w, h). `to` steps
// forward to another screen; `back: true` closes the current screen (Done /
// Close / the on-screen back arrow) exactly like the phone's Back button.
// Coordinates are measured against each processed screenshot so the box sits
// squarely on the real button.
const HOTSPOTS = {
  '00': [
    { x: 82, y: 5, w: 13, h: 5, to: '44', label: 'Appearance & license' },
    { x: 10.5, y: 23, w: 79, h: 10.3, to: '01', label: 'Pick an installed app' },
    { x: 10.5, y: 34.5, w: 79, h: 10.3, to: '01', label: 'Pick an APK file' },
    { x: 10.5, y: 51.5, w: 79, h: 8.5, to: '52', label: 'Request runner' },
    { x: 10.5, y: 66.5, w: 79, h: 9.5, to: '17', label: 'Install a file' },
  ],
  '01': [
    { x: 6, y: 37, w: 88, h: 10, to: '02', label: 'Open lichess' },
    { x: 74, y: 22.5, w: 22, h: 4.5, back: true, label: 'Close' },
  ],
  '02': [
    { x: 6, y: 10, w: 70, h: 8.5, to: '33', label: 'App info' },
    { x: 8, y: 20, w: 25, h: 8, to: '03', label: 'Links' },
    { x: 36.5, y: 20, w: 25, h: 8, to: '05', label: 'Secrets' },
    { x: 65, y: 20, w: 26, h: 8, to: '06', label: 'Files' },
    { x: 8, y: 29, w: 25, h: 8, to: '07', label: 'Components' },
    { x: 36.5, y: 29, w: 25, h: 8, to: '08', label: 'Security scan' },
    { x: 65, y: 29, w: 26, h: 8, to: '32', label: 'App settings' },
    { x: 6.5, y: 36.2, w: 87, h: 5.7, to: '09', label: 'App data' },
    { x: 6.5, y: 42.6, w: 87, h: 5.7, to: '12', label: 'Live traffic' },
    { x: 6.5, y: 48.9, w: 87, h: 5.7, to: '14', label: 'Capture logs' },
    { x: 6.5, y: 61.2, w: 87, h: 5.9, to: '31', label: 'Permissions' },
    { x: 6.5, y: 67.9, w: 87, h: 12.3, to: '34', label: 'Remove certificate pinning - proxy certificate' },
    { x: 6.5, y: 81.5, w: 87, h: 6, to: '32', label: 'Advanced' },
    { x: 6, y: 93.2, w: 88, h: 5.3, to: '16', label: 'Patch this APK' },
  ],
  // Security scan -> Ask AI opens the pentest bundle picker.
  '08': [{ x: 5, y: 18, w: 90, h: 5, to: '37', label: 'Ask AI - review all findings' }],
  // Leaf screens: close via their Done / Close / back arrow.
  '03': [
    { x: 47, y: 3.8, w: 14, h: 2.8, to: '46', label: 'Add domains to block' },
    { x: 61, y: 3.8, w: 14, h: 2.8, to: '45', label: 'Ask AI about these' },
    { x: 75, y: 3.8, w: 22, h: 2.8, back: true, label: 'Done' },
    { x: 56, y: 7, w: 20, h: 2.8, to: '04', label: 'URLs (84) - see every full URL' },
    { x: 40, y: 14, w: 14, h: 3, to: '48', label: 'Ads - mark hosts to block' },
  ],
  // URLs tab of Links & endpoints (the full 84 URLs, not just hosts).
  '04': [
    { x: 44, y: 3.8, w: 15, h: 2.8, to: '46', label: 'Add domains to block' },
    { x: 61, y: 3.8, w: 15, h: 2.8, to: '45', label: 'Ask AI about these' },
    { x: 79, y: 3.8, w: 17, h: 2.8, back: true, label: 'Done' },
    { x: 6, y: 7, w: 40, h: 2.8, back: true, label: 'Back to Hosts' },
  ],
  '05': [
    { x: 75, y: 8.5, w: 22, h: 4, back: true, label: 'Done' },
    { x: 54, y: 8.5, w: 19, h: 4, to: '37', label: 'Ask AI about secrets' },
    { x: 50, y: 13.5, w: 43, h: 4, to: '58', label: 'All secret values' },
  ],
  '06': [
    { x: 75, y: 16, w: 22, h: 4, back: true, label: 'Done' },
    { x: 6, y: 37.5, w: 88, h: 5.5, to: '71', label: 'Open the META-INF folder' },
    { x: 6, y: 51, w: 88, h: 5.5, to: '59', label: 'Open the kotlin folder' },
    { x: 6, y: 78, w: 88, h: 5.5, to: '39', label: 'Open AndroidManifest.xml' },
  ],
  '07': [{ x: 3, y: 6, w: 14, h: 5, back: true, label: 'Back' }],
  '25': [
    { x: 3, y: 4.5, w: 14, h: 5, back: true, label: 'Back' },
    { x: 3, y: 17, w: 12, h: 6, to: '55', label: 'Filter logs by level' },
    { x: 74, y: 17, w: 11, h: 6, to: '56', label: 'Send logs to AI' },
    { x: 85, y: 17, w: 13, h: 6, to: '40', label: 'More log actions' },
  ],
  '26': [
    { x: 3, y: 5, w: 14, h: 5, back: true, label: 'Back' },
    { x: 60, y: 25, w: 30, h: 4.5, to: '28', label: 'Response' },
    { x: 18, y: 30, w: 26, h: 4, to: '27', label: 'Headers' },
    { x: 6, y: 91, w: 88, h: 6, to: '70', label: 'Request actions' },
  ],
  // Request headers view (same request, Headers tab).
  '27': [
    { x: 3, y: 5, w: 14, h: 5, back: true, label: 'Back' },
    { x: 2, y: 30, w: 16, h: 4, back: true, label: 'Body' },
    { x: 60, y: 25, w: 30, h: 4.5, to: '29', label: 'Response' },
  ],
  // Response body view (with the JWT + Decode JWT helper).
  '28': [
    { x: 3, y: 5, w: 14, h: 5, back: true, label: 'Back' },
    { x: 14, y: 25, w: 28, h: 4.5, back: true, label: 'Request' },
    { x: 18, y: 30, w: 26, h: 4, to: '29', label: 'Headers' },
  ],
  // Response headers view.
  '29': [
    { x: 3, y: 5, w: 14, h: 5, back: true, label: 'Back' },
    { x: 14, y: 25, w: 28, h: 4.5, back: true, label: 'Request' },
    { x: 2, y: 30, w: 16, h: 4, to: '28', label: 'Body' },
  ],
  '57': [
    { x: 3, y: 6, w: 13, h: 5, back: true, label: 'Back' },
    { x: 16, y: 11.5, w: 12, h: 6, to: '60', label: 'Rewrite & Debug rules' },
    { x: 61, y: 11.5, w: 11, h: 6, to: '68', label: 'Filter captures' },
    { x: 88, y: 11.5, w: 10, h: 6, to: '66', label: 'Webhook forwarding' },
    { x: 2, y: 28, w: 54, h: 7, to: '26', label: 'Open the captured request' },
    { x: 70, y: 29, w: 13, h: 6, to: '69', label: 'Tag this request' },
  ],
  '30': [
    { x: 3, y: 6, w: 14, h: 5, back: true, label: 'Back' },
    { x: 84, y: 6.5, w: 13, h: 5, to: '43', label: 'How editing works' },
    { x: 8, y: 91.5, w: 84, h: 6.5, to: '47', label: 'Force-stop the app' },
  ],
  // Leaf continuations reached from the tools above.
  '39': [
    { x: 3, y: 6, w: 13, h: 5, back: true, label: 'Back' },
    { x: 77, y: 16.5, w: 20, h: 4, back: true, label: 'Done' },
  ],
  '45': [
    { x: 50, y: 61, w: 22, h: 4.5, back: true, label: 'Not now' },
    { x: 76, y: 61, w: 22, h: 4.5, back: true, label: 'Ask AI' },
  ],
  '46': [
    { x: 28, y: 64.5, w: 20, h: 4.5, back: true, label: 'Not now' },
    { x: 50, y: 64.5, w: 44, h: 4.5, back: true, label: 'Add to block list' },
  ],
  '47': [{ x: 3, y: 4.5, w: 13, h: 4.5, back: true, label: 'Back' }],
  '48': [
    { x: 77, y: 8.5, w: 18, h: 4, back: true, label: 'Done' },
    { x: 56, y: 32, w: 24, h: 4, to: '49', label: 'Manage ad-block lists' },
    { x: 82, y: 56, w: 13, h: 5.5, to: '53', label: 'Untick github.com' },
  ],
  '49': [
    { x: 33, y: 72.5, w: 17, h: 4, back: true, label: 'Done' },
    { x: 51, y: 72.5, w: 44, h: 4, to: '50', label: 'Download selected' },
  ],
  '50': [{ x: 76, y: 6.5, w: 20, h: 4, back: true, label: 'Done' }],
  '53': [
    { x: 77, y: 8.5, w: 18, h: 4, back: true, label: 'Done' },
    { x: 82, y: 49, w: 13, h: 5, to: '54', label: 'Untick www.googleapis.com' },
  ],
  '54': [{ x: 77, y: 8.5, w: 18, h: 4, back: true, label: 'Done' }],
  '55': [{ x: 3, y: 4.5, w: 14, h: 5, back: true, label: 'Back' }],
  '56': [
    { x: 38, y: 64, w: 22, h: 4.5, back: true, label: 'Logs only' },
    { x: 62, y: 64, w: 32, h: 4.5, back: true, label: 'Logs + code' },
  ],
  '51': [
    { x: 3, y: 6.5, w: 13, h: 5, back: true, label: 'Back' },
    { x: 64, y: 69, w: 30, h: 5, back: true, label: 'Import' },
    { x: 51, y: 69, w: 10, h: 5, back: true, label: 'Cancel import' },
  ],
  '52': [
    { x: 3, y: 5.5, w: 13, h: 5, back: true, label: 'Back' },
    { x: 2, y: 17, w: 20, h: 8, to: '36', label: 'Choose HTTP method' },
    { x: 63, y: 6, w: 11, h: 5, to: '64', label: 'Save request' },
    { x: 77, y: 6, w: 17, h: 5, to: '63', label: 'Show as cURL' },
    { x: 82, y: 20, w: 13, h: 5, to: '62', label: 'Send request' },
    { x: 65, y: 20, w: 11, h: 5, to: '65', label: 'Clear request' },
    { x: 66, y: 28, w: 30, h: 4.5, to: '62', label: 'Response' },
    { x: 74, y: 88, w: 22, h: 6, to: '51', label: 'Collections · import cURL' },
  ],
  '58': [
    { x: 75, y: 7, w: 20, h: 4, back: true, label: 'Done' },
    { x: 54, y: 7, w: 17, h: 4, to: '37', label: 'Ask AI about secrets' },
  ],
  '59': [
    { x: 3, y: 6, w: 13, h: 5, back: true, label: 'Back' },
    { x: 77, y: 16.5, w: 20, h: 4, back: true, label: 'Done' },
  ],
  '71': [
    { x: 77, y: 17.5, w: 20, h: 4, back: true, label: 'Done' },
    { x: 6, y: 44, w: 88, h: 6, to: '72', label: 'Open the com folder' },
  ],
  '72': [{ x: 77, y: 17.5, w: 20, h: 4, back: true, label: 'Done' }],
  '60': [
    { x: 2, y: 5, w: 11, h: 5, back: true, label: 'Close' },
    { x: 88, y: 5, w: 10, h: 5, to: '61', label: 'New rule' },
    { x: 36, y: 52, w: 28, h: 5, to: '61', label: 'New rule' },
  ],
  '61': [
    { x: 2, y: 5, w: 11, h: 5, back: true, label: 'Close' },
    { x: 84, y: 5, w: 13, h: 5, back: true, label: 'Save' },
  ],
  '62': [{ x: 3, y: 6, w: 13, h: 5, back: true, label: 'Back' }],
  '63': [{ x: 3, y: 6, w: 13, h: 5, back: true, label: 'Back' }],
  '65': [
    { x: 60, y: 55.5, w: 17, h: 4, back: true, label: 'Not now' },
    { x: 77, y: 55.5, w: 16, h: 4, back: true, label: 'Clear' },
  ],
  '68': [{ x: 3, y: 5, w: 13, h: 5, back: true, label: 'Back' }],
  '69': [
    { x: 50, y: 57, w: 12, h: 4.5, back: true, label: 'Cancel' },
    { x: 62, y: 57, w: 32, h: 4.5, back: true, label: 'Save tag' },
  ],
  '70': [{ x: 35, y: 78, w: 30, h: 4.5, back: true, label: 'Close' }],
  // Patch this APK -> installed result. "Open it" shows the patched dashboard.
  '23': [
    { x: 38, y: 56, w: 20, h: 4.5, back: true, label: 'Not now' },
    { x: 61, y: 55, w: 33, h: 6.5, to: '24', label: 'Open it' },
  ],
  // Patched dashboard: the same app, now with the tools live (Active).
  '24': [
    { x: 2, y: 6, w: 13, h: 5, back: true, label: 'Back' },
    { x: 4, y: 26, w: 29, h: 15, to: '03', label: 'Links' },
    { x: 35, y: 26, w: 30, h: 15, to: '05', label: 'Secrets' },
    { x: 64, y: 26, w: 30, h: 15, to: '06', label: 'Files' },
    { x: 4, y: 43, w: 29, h: 13, to: '07', label: 'Components' },
    { x: 35, y: 43, w: 30, h: 13, to: '08', label: 'Security scan' },
    { x: 64, y: 43, w: 30, h: 13, to: '32', label: 'App settings' },
    { x: 5, y: 54, w: 90, h: 10, to: '30', label: 'App data - now active' },
    { x: 5, y: 65, w: 90, h: 9, to: '57', label: 'Live traffic - now active' },
    { x: 5, y: 75, w: 90, h: 10, to: '25', label: 'Capture logs - now active' },
  ],
  // Pre-patch "not ready yet" prompts: tapping a tool before patching explains
  // how to turn it on; the primary action jumps to the (post-patch) tool.
  '09': [
    { x: 4, y: 78, w: 22, h: 5, back: true, label: 'Close' },
    { x: 28, y: 78, w: 40, h: 5, to: '30', label: 'Turn on data access' },
  ],
  '12': [
    { x: 35, y: 77, w: 15, h: 5, back: true, label: 'Close' },
    { x: 51, y: 77, w: 23, h: 5, to: '11', label: 'Turn on Traffic capture' },
  ],
  '11': [
    { x: 4, y: 46, w: 90, h: 9, to: '57', label: 'Patch with certificate' },
    { x: 4, y: 58, w: 90, h: 9, to: '57', label: 'VPN capture' },
    { x: 65, y: 70, w: 17, h: 5, back: true, label: 'Close' },
  ],
  '14': [
    { x: 44, y: 77, w: 15, h: 5, back: true, label: 'Close' },
    { x: 59, y: 77, w: 22, h: 5, to: '25', label: 'Turn it on' },
  ],
  // Patch summary -> Android install prompt.
  '16': [
    { x: 3, y: 4, w: 14, h: 5, back: true, label: 'Back' },
    { x: 5, y: 87, w: 90, h: 7, to: '21', label: 'Install it now' },
    { x: 2, y: 94, w: 30, h: 5, back: true, label: 'Save APK' },
    { x: 48, y: 94, w: 45, h: 5, back: true, label: 'Send APK' },
  ],
  '21': [
    { x: 20, y: 94, w: 20, h: 5, back: true, label: 'Cancel' },
    { x: 40, y: 94, w: 22, h: 5, to: '22', label: 'Install' },
  ],
  // Installing... (progress) -> installed result.
  '22': [{ x: 6, y: 45, w: 88, h: 20, to: '23', label: 'Continue' }],
  // Install a file -> already-installed conflict.
  '17': [
    { x: 5, y: 47, w: 88, h: 9, to: '18', label: 'Replace the installed app' },
    { x: 5, y: 60, w: 88, h: 9, to: '22', label: 'Install as a separate copy' },
    { x: 76, y: 68, w: 20, h: 4, back: true, label: 'Not now' },
  ],
  '18': [
    { x: 53, y: 42, w: 18, h: 4, to: '37', label: 'Ask AI' },
    { x: 30, y: 77, w: 22, h: 4, back: true, label: 'Not now' },
    { x: 64, y: 77, w: 30, h: 4, to: '19', label: 'Open app info' },
  ],
  '19': [
    { x: 1, y: 6, w: 14, h: 5, back: true, label: 'Back' },
    { x: 15, y: 93, w: 13, h: 6, to: '18', label: 'Uninstall' },
  ],
  // HTTP method picker: tapping any method returns to the request runner.
  '36': [{ x: 3, y: 15, w: 94, h: 82, back: true, label: 'Choose a method' }],
  '31': [{ x: 75, y: 9, w: 22, h: 4, back: true, label: 'Done' }],
  '32': [{ x: 75, y: 4.5, w: 22, h: 4, back: true, label: 'Done' }],
  '33': [{ x: 5, y: 6.8, w: 88, h: 3, to: '37', label: 'Full AI penetration test' }],
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

export default function InteractiveDemo({ open = false, onClose }) {
  const [stack, setStack] = useState([START])
  const current = stack[stack.length - 1]
  const scrollRef = useRef(null)
  const liveRef = useRef(null)
  const hots = HOTSPOTS[current] || []
  const hasForward = hots.some((h) => !h.back)

  // Open as its own full-screen view: start at Home, lock the page scroll,
  // and close on Escape.
  useEffect(() => {
    if (!open) return
    setStack([START])
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

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

  // Share a direct link that opens the demo.
  const [copied, setCopied] = useState(false)
  const copyLink = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}#demo`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked - ignore */
    }
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-base"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive TrustAPK demo"
    >
      {/* top bar */}
      <div className="flex-shrink-0 flex items-center justify-between gap-2 px-3 sm:px-6 h-14 border-b border-base bg-base">
        <div className="flex items-center gap-2 font-semibold">
          <span className="h-2 w-2 rounded-full bg-brand animate-pulse-glow" />
          Live demo
          <span className="hidden md:inline text-muted-c font-normal">· tap through the real app</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyLink}
            aria-label="Copy a link to this demo"
            className="inline-flex items-center gap-1.5 rounded-lg border border-base bg-panel px-2.5 sm:px-3 py-1.5 text-sm font-medium hover:text-brand transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
              <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
            </svg>
            <span>{copied ? 'Copied!' : 'Copy link'}</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close demo"
            className="inline-flex items-center gap-1.5 rounded-lg border border-base bg-panel px-2.5 sm:px-3 py-1.5 text-sm font-medium hover:text-brand transition-colors"
          >
            <Close width={16} height={16} /> <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center px-4 py-4">
       <div className="my-auto w-full flex flex-col items-center gap-4">
        {/* Phone */}
        <div className="relative mx-auto w-full max-w-[min(300px,calc((100dvh_-_168px)_*_0.45))]">
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
                <div key={current} className={`relative ${animate ? 'animate-screen-in' : ''}`}>
                  <Screen id={current} />
                  {hots.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => (h.back ? back() : go(h.to))}
                      aria-label={h.label}
                      className="absolute rounded-xl cursor-pointer bg-transparent hover:bg-brand/15 hover:ring-2 hover:ring-brand/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-colors"
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
                  {/* Live-capture indicator: makes the traffic list feel live. */}
                  {current === '57' && (
                    <span className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-brand/10 ring-1 ring-brand/30 px-2.5 py-1 text-[9px] font-medium text-brand whitespace-nowrap">
                      <span className="relative flex h-1.5 w-1.5">
                        {animate && <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-75 animate-ping" />}
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                      </span>
                      Listening for traffic&hellip;
                    </span>
                  )}
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
        <div className="flex items-center gap-2 text-sm text-muted-c text-center px-2">
          <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-brand animate-pulse-glow" />
          {hasForward ? (
            <span>You&rsquo;re on <span className="text-base-c font-medium">{TITLE[current]}</span> - tap any button to open it</span>
          ) : hots.length > 0 ? (
            <span>On <span className="text-base-c font-medium">{TITLE[current]}</span> - tap Done, or the back button, to go back</span>
          ) : (
            <span><span className="text-base-c font-medium">{TITLE[current]}</span> - use the back button to go back</span>
          )}
        </div>
       </div>
      </div>
    </div>
  )
}
