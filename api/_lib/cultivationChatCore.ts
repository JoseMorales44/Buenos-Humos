import { buildCatalogPromptBlock } from '../../src/data/catalogForPrompt'
import { getGroqApiKey } from './groqEnv'
import { SALINAS_ENGLISH_MODE_SUFFIX, SALINAS_SYSTEM_PROMPT_ES } from './salinasSystemPrompt'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

const MAX_CHAT_MESSAGES = 24
const MAX_ONE_MESSAGE_CHARS = 4000

type Role = 'user' | 'assistant'

function buildSystem(lang: 'es' | 'en'): string {
  const catalog = buildCatalogPromptBlock(lang)
  if (lang === 'en') {
    return `${SALINAS_SYSTEM_PROMPT_ES}\n\n${SALINAS_ENGLISH_MODE_SUFFIX}\n\n${catalog}`
  }
  return `${SALINAS_SYSTEM_PROMPT_ES}\n\n${catalog}`
}

function resolveTimeoutMs(override?: number): number {
  if (override != null && override > 0) return override
  const fromEnv = Number(process.env.CULTIVATION_CHAT_TIMEOUT_MS)
  if (Number.isFinite(fromEnv) && fromEnv > 0) return fromEnv
  return 45_000
}

function parseChatMessages(raw: unknown): { role: Role; content: string }[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_CHAT_MESSAGES) return null
  const out: { role: Role; content: string }[] = []
  for (const m of raw) {
    if (!m || typeof m !== 'object') return null
    const role = (m as { role?: unknown }).role
    const content = (m as { content?: unknown }).content
    if (role !== 'user' && role !== 'assistant') return null
    if (typeof content !== 'string') return null
    const c = content.trim()
    if (!c || c.length > MAX_ONE_MESSAGE_CHARS) return null
    out.push({ role, content: c })
  }
  if (out.length === 0 || out[out.length - 1].role !== 'user') return null
  return out
}

function resolveUserMessages(input: unknown): { role: Role; content: string }[] | null {
  if (!input || typeof input !== 'object') return null
  const obj = input as { messages?: unknown; question?: unknown }

  const fromMessages = parseChatMessages(obj.messages)
  if (fromMessages) return fromMessages

  if (typeof obj.question === 'string' && obj.question.trim()) {
    return [{ role: 'user', content: obj.question.trim().slice(0, MAX_ONE_MESSAGE_CHARS) }]
  }
  return null
}

/**
 * Shared Salinas → Groq flow for Express (local) and Netlify Functions.
 * Accepts legacy `{ question, lang }` or chat `{ messages: [{role, content},...], lang }` (last message must be user).
 * @param groqTimeoutMs - Netlify free tier ~10s wall clock; pass ~9500 in serverless.
 */
export async function runCultivationChat(
  input: unknown,
  groqTimeoutMs?: number,
): Promise<{ statusCode: number; body: Record<string, unknown> }> {
  const key = getGroqApiKey()
  if (!key) {
    console.error('[CHAT] GROQ_API_KEY is missing or empty')
    return { statusCode: 500, body: { error: 'server_misconfigured' } }
  }

  const langRaw =
    input && typeof input === 'object' && 'lang' in input ? (input as { lang?: unknown }).lang : undefined
  const lang: 'es' | 'en' = langRaw === 'en' ? 'en' : 'es'

  const userThread = resolveUserMessages(input)
  if (!userThread) {
    return { statusCode: 400, body: { error: 'invalid_question' } }
  }

  const system = buildSystem(lang)
  const timeoutMs = resolveTimeoutMs(groqTimeoutMs)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: system }, ...userThread],
        temperature: 0.65,
      }),
      signal: controller.signal,
    })

    if (!groqRes.ok) {
      console.error(`[CHAT] Groq API returned error: ${groqRes.status} ${groqRes.statusText}`)
      return { statusCode: 502, body: { error: 'upstream_error' } }
    }

    const data = (await groqRes.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const reply = data.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      return { statusCode: 502, body: { error: 'empty_reply' } }
    }

    return { statusCode: 200, body: { reply } }
  } catch (err) {
    console.error('[CHAT] Request to Groq failed:', err)
    return { statusCode: 502, body: { error: 'request_failed' } }
  } finally {
    clearTimeout(timer)
  }
}
