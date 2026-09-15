// Build-time entry: renders the app to static HTML and exposes the data needed
// to generate structured metadata. Runs in Node via Vite SSR (no browser).
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { faqs } from './lib/faqData.js'
import { VERSION } from './lib/constants.js'

export function render() {
  const appHtml = renderToString(<App />)
  return { appHtml, faqs, version: VERSION }
}
