import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { listContacts, addContact } from './server/contactsStore.ts'

type NextFn = (err?: unknown) => void

function contactsApi(): Plugin {
  const handler = async (req: IncomingMessage, res: ServerResponse, next: NextFn) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    if (url.pathname !== '/api/contacts') {
      next()
      return
    }

    res.setHeader('Content-Type', 'application/json')

    if (req.method === 'GET') {
      res.statusCode = 200
      res.end(JSON.stringify(listContacts()))
      return
    }

    if (req.method === 'POST') {
      let body = ''
      for await (const chunk of req) {
        body += chunk
      }
      let input: unknown
      try {
        input = JSON.parse(body)
      } catch {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'Invalid JSON body.' }))
        return
      }
      const { fullName, phone, email, message } = (input ?? {}) as Record<string, unknown>
      const contact = addContact({
        fullName: typeof fullName === 'string' ? fullName : '',
        phone: typeof phone === 'string' ? phone : '',
        email: typeof email === 'string' ? email : '',
        message: typeof message === 'string' ? message : '',
      })
      res.statusCode = 200
      res.end(JSON.stringify(contact))
      return
    }

    res.statusCode = 405
    res.end(JSON.stringify({ error: 'Method not allowed.' }))
  }

  return {
    name: 'kbn-contacts-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      contactsApi(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
      strictPort: true,
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
    },
  }
})
