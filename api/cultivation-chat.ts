import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runCultivationChat } from '../server/cultivationChatCore.ts'

export const config = { maxDuration: 10 }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  const result = await runCultivationChat(req.body, 9500)
  res.status(result.statusCode).json(result.body)
}
