/**
 * Groq API key for Node only. Prefer GROQ_API_KEY in .env.
 * Falls back to VITE_API_GROQ_KEY so one line works in local dev.
 * Do not use import.meta.env.VITE_API_GROQ_KEY in React — that would bundle the key.
 */
export function getGroqApiKey(): string | undefined {
  const a = process.env.GROQ_API_KEY?.trim()
  const b = process.env.VITE_API_GROQ_KEY?.trim()
  return a || b || undefined
}
