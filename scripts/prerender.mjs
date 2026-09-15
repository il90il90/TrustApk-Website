// Post-build prerender: renders the SPA to static HTML and injects it into
// dist/index.html, so crawlers and first paint get real content before JS runs.
// Also generates the FAQ JSON-LD from the single faqData source and syncs the
// SoftwareApplication version from constants, preventing metadata drift.
// Runs in Node via Vite SSR - no browser, so it works in CI.
import { createServer } from 'vite'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distIndex = resolve(root, 'dist/index.html')

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const vite = await createServer({
  root,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { render } = await vite.ssrLoadModule('/src/prerender-entry.jsx')
  const { appHtml, faqs, version } = render()

  let html = readFileSync(distIndex, 'utf8')

  // 1) Inject the rendered app into the root container.
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  // 2) Build FAQ JSON-LD from the single source of truth.
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const faqScript =
    `<script type="application/ld+json">\n${JSON.stringify(faqLd, null, 2)}\n</script>`
  html = html.replace('<!--FAQ_JSONLD-->', faqScript)

  // 3) Keep the SoftwareApplication version in lockstep with constants.
  html = html.replace(
    /("softwareVersion":\s*)"[^"]*"/,
    `$1"${esc(version)}"`
  )

  writeFileSync(distIndex, html)
  console.log(`prerender: injected ${appHtml.length} bytes of app HTML, ${faqs.length} FAQ entries, version ${version}`)
} finally {
  await vite.close()
}
