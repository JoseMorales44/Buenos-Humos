import 'dotenv/config'

import express from 'express'

import { runCultivationChat } from './cultivationChatCore'

const PORT = Number(process.env.PORT) || 8787

const app = express()
app.use(express.json({ limit: '128kb' }))

app.post('/api/cultivation-chat', async (req, res) => {
  const result = await runCultivationChat(req.body)
  res.status(result.statusCode).json(result.body)
})

app.listen(PORT, () => {
  console.log(`[cultivation-api] http://127.0.0.1:${PORT}`)
})
