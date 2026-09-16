// Inline stroke icons (currentColor). Kept minimal so both themes work.
const base = {
  width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
  // Icons are decorative; labels live on the parent control/text. Callers can
  // still override by spreading aria-hidden={false} after {...base}.
  'aria-hidden': true, focusable: 'false',
}

export const Shield = (p) => (<svg {...base} {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>)
export const Certificate = (p) => (<svg {...base} {...p}><circle cx="12" cy="9" r="5"/><path d="M9 13.5L8 21l4-2 4 2-1-7.5"/></svg>)
export const Unlock = (p) => (<svg {...base} {...p}><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/></svg>)
export const KeyPerm = (p) => (<svg {...base} {...p}><path d="M4 6h10M4 12h16M4 18h7"/><circle cx="18" cy="6" r="2"/><circle cx="15" cy="18" r="2"/></svg>)
export const Search = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>)
export const Code = (p) => (<svg {...base} {...p}><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12"/></svg>)
export const Logs = (p) => (<svg {...base} {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h6M8 17h4"/></svg>)
export const Webhook = (p) => (<svg {...base} {...p}><circle cx="7" cy="7" r="3"/><circle cx="17" cy="17" r="3"/><path d="M9 9l4.5 5M14 8l3 6"/></svg>)
export const Stethoscope = (p) => (<svg {...base} {...p}><path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M10 12v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="10" r="2"/></svg>)
export const Sliders = (p) => (<svg {...base} {...p}><path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h13M21 18h-1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="19" cy="18" r="2"/></svg>)
export const NoAds = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>)
export const Install = (p) => (<svg {...base} {...p}><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 6v7m0 0l-2.5-2.5M12 13l2.5-2.5"/><path d="M10 19h4"/></svg>)
export const Phone = (p) => (<svg {...base} {...p}><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10 5h4"/></svg>)
export const Github = (p) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>)
export const Telegram = (p) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}><path d="M21.9 4.3l-3.3 15.6c-.24 1.1-.9 1.36-1.83.85l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1 .5l.36-5.14L18 6.03c.4-.36-.09-.56-.62-.2L6.9 12.7l-4.93-1.54c-1.07-.34-1.1-1.07.23-1.58l19.28-7.43c.9-.33 1.68.2 1.42 1.15z"/></svg>)
export const Sun = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>)
export const Moon = (p) => (<svg {...base} {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>)
export const Download = (p) => (<svg {...base} {...p}><path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>)
export const ArrowDown = (p) => (<svg {...base} {...p}><path d="M12 5v14m0 0l-6-6m6 6l6-6"/></svg>)
export const Check = (p) => (<svg {...base} {...p}><path d="M4 12l5 5L20 6"/></svg>)
export const Cloud = (p) => (<svg {...base} {...p}><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.3A3.5 3.5 0 0 1 17 18H7z"/></svg>)
export const Lock = (p) => (<svg {...base} {...p}><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>)
export const Cpu = (p) => (<svg {...base} {...p}><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3"/></svg>)
export const Menu = (p) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>)
export const Close = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>)
export const Traffic = (p) => (<svg {...base} {...p}><path d="M8 21V3M8 3L5 6M8 3l3 3M16 3v18M16 21l-3-3M16 21l3-3"/></svg>)
export const Sparkle = (p) => (<svg {...base} {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></svg>)
export const Warning = (p) => (<svg {...base} {...p}><path d="M12 3l9 16H3l9-16z"/><path d="M12 10v4M12 17h.01"/></svg>)
export const Doc = (p) => (<svg {...base} {...p}><path d="M6 2h7l5 5v15H6z"/><path d="M13 2v5h5"/><path d="M9 13h6M9 17h4"/></svg>)
export const Folder = (p) => (<svg {...base} {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>)
export const Grid = (p) => (<svg {...base} {...p}><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>)
