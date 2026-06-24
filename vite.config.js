import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Vite plugin to inject doctor surgeries count into index.html during build
function injectMetaSurgeries() {
  return {
    name: 'inject-meta-surgeries',
    transformIndexHtml(html) {
      try {
        const doctorsFile = fs.readFileSync(path.resolve(__dirname, './src/data/doctors.js'), 'utf8');
        // Extract surgeries value from the doctors array string
        const match = doctorsFile.match(/"surgeries":\s*"([^"]+)"/);
        if (match && match[1]) {
          const surgeries = match[1];
          // Replace hardcoded '8,000+' in index.html with the actual surgeries count
          return html.replace(/8,000\+/g, surgeries);
        }
      } catch (e) {
        console.error('Failed to inject dynamic surgeries count in index.html:', e);
      }
      return html;
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectMetaSurgeries()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})

