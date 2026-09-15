# TrustAPK — Website

Marketing + interactive-demo landing site for **[TrustAPK](https://github.com/il90il90/trust-apk)**,
a fully on-device Android APK patcher for HTTPS inspection, app analysis and reverse-engineering.

Built with **React + Vite + Tailwind**, deployed for free to **GitHub Pages**. Dark by default with
a light-mode toggle. English / LTR. No backend — the "live demo" is a front-end walkthrough of the
real app screens.

## Develop locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Project layout

```
public/                 # static assets served as-is
  screenshots/          # real app screenshots (from the trust-apk repo docs)
  favicon.svg           # shield/lock mark
  og-image.png          # 1200x630 social-share banner
  robots.txt, sitemap.xml, .nojekyll
src/
  App.jsx               # section composition
  components/           # Header, Hero, Demo, Features, Screenshots, ... , Footer
  lib/constants.js      # product facts & links (version, download URL, contact)
  lib/useTheme.js       # dark/light toggle (localStorage + prefers-color-scheme)
.github/workflows/deploy.yml   # build + deploy to GitHub Pages
```

Product facts and links live in **`src/lib/constants.js`** — update the version and download URL
there when a new TrustAPK release ships. The download button points at the stable
`.../trust-apk-releases/releases/latest/download/trustapk-client.apk` redirect, so it always serves
the newest signed APK without code changes.

## Deploy to GitHub Pages (one-time setup)

This site deploys automatically via GitHub Actions, but Pages needs to be turned on first.

1. **Make this repository public.** Free GitHub Pages requires a public repo.
   `Settings → General → Danger Zone → Change repository visibility → Public`.
   (The app's own source stays private in `il90il90/trust-apk`; this repo is only marketing content.)
2. **Enable Pages with the Actions source.**
   `Settings → Pages → Build and deployment → Source → GitHub Actions`.
3. **Push to the default branch** (or run the workflow manually from the Actions tab).
   The workflow builds `dist/` and publishes it. The live URL will be:
   `https://il90il90.github.io/TrustApk-Website/`

The workflow triggers on pushes to `main` and to `claude/adoring-brown-t5azpu`. If you develop on a
different branch, add it under `on.push.branches` in `.github/workflows/deploy.yml`, or set that
branch as the repo's default.

## Custom domain — `trustapk.app`

The build uses a relative asset base (`base: './'` in `vite.config.js`), so it works both at the
project-pages path and at the root custom domain. `public/CNAME` already contains `trustapk.app`,
and the absolute URLs in `index.html`, `public/robots.txt` and `public/sitemap.xml` point at it.

**DNS (Cloudflare — set every record to “DNS only” / grey cloud):**

| Type  | Name  | Value               |
|-------|-------|---------------------|
| A     | `@`   | `185.199.108.153`   |
| A     | `@`   | `185.199.109.153`   |
| A     | `@`   | `185.199.110.153`   |
| A     | `@`   | `185.199.111.153`   |
| CNAME | `www` | `il90il90.github.io`|

Grey cloud (unproxied) matters: `.app` is HSTS-preloaded, so GitHub must see the domain directly to
issue its Let's Encrypt certificate — a proxied (orange) record blocks that. You can switch to
proxied later with SSL/TLS mode **Full**.

**GitHub:** `Settings → Pages → Custom domain` → `trustapk.app` → Save, then tick **Enforce HTTPS**
once the certificate is issued (can take a few minutes to ~24h).

## Contact form

The contact form has **no backend**. By default it opens the visitor's email app (`mailto:`).
To receive messages automatically, create a free [Formspree](https://formspree.io) form and paste
its endpoint into `FORMSPREE_ENDPOINT` in `src/lib/constants.js`.

---

Made with ❤️ from Israel · by [t.me/IsraelCohen](https://t.me/IsraelCohen)
