import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runCultivationChat } from '../server/cultivationChatCore.ts'

export const config = { maxDuration: 10 }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  console.log('[API] cultivation-chat start')
  try {
    const result = await runCultivationChat(req.body, 8000)
    console.log(`[API] cultivation-chat end with status ${result.statusCode}`)
    res.status(result.statusCode).json(result.body)
  } catch (err) {
    console.error('[API] fatal error in handler:', err)
    res.status(500).json({ error: 'internal_server_error' })
  }
}
