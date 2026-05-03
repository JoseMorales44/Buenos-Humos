import 'dotenv/config'

const BASE = process.env.WP_BASE_URL
const USER = process.env.WP_USER
const PASS = process.env.WP_PASSWORD ?? process.env.WP_APP_PASSWORD

if (!BASE || !USER || !PASS) {
  console.error('Missing WP_BASE_URL, WP_USER, or WP_PASSWORD in .env.local')
  process.exit(1)
}

export const WP_BASE = BASE
export const WP_USER = USER

let cachedToken: string | null = null

export async function getJwtToken(): Promise<string> {
  if (cachedToken) return cachedToken
  const res = await fetch(`${BASE}/wp-json/jwt-auth/v1/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ username: USER, password: PASS }),
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`JWT login failed (${res.status}): ${text.slice(0, 300)}`)
  }
  const data = JSON.parse(text) as { token: string }
  if (!data.token) {
    throw new Error(`JWT login returned no token: ${text.slice(0, 300)}`)
  }
  cachedToken = data.token
  return data.token
}

export async function wpFetch<T>(method: string, path: string, body?: unknown): Promise<T> {
  const token = await getJwtToken()
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 300)}`)
  }
  return JSON.parse(text) as T
}
