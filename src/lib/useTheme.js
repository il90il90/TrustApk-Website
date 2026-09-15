import { useEffect, useState, useCallback } from 'react'

const KEY = 'trustapk-theme'

function readInitial() {
  // The inline no-flash script in index.html already resolved stored pref or
  // prefers-color-scheme onto <html>, so trust the class as the source of truth.
  if (typeof document !== 'undefined') {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }
  try {
    const stored = localStorage.getItem(KEY)
    if (stored) return stored
  } catch (e) { /* ignore */ }
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme !== 'light')
    try {
      localStorage.setItem(KEY, theme)
    } catch (e) { /* ignore */ }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggle }
}
