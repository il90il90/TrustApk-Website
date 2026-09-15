import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset URLs relative so the same build works both at the
// GitHub project-pages path (/TrustApk-Website/) and at a future custom-domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
})
