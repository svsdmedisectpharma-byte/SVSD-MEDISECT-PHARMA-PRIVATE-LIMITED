import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { handleOpenRouterChat } from './api/chat.js'

// Custom Vite plugin to handle /api/chat in development
function openRouterApiPlugin() {
  return {
    name: 'openrouter-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        // Ensure process.env is populated from Vite environment
        const env = loadEnv(server.config.mode, process.cwd(), '')
        process.env.OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || env.OPENROUTER_API_KEY
        handleOpenRouterChat(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), openRouterApiPlugin()],
})

