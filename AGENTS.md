# AGENTS.md — Buenos Humos Club

## Project Identity

React SPA for a cannabis accessories retail club. Products catalog sourced from WordPress (Hostinger), not a local database. No Supabase, no auth, no ORM.

## Critical Commands

```
pnpm dev           # Vite + Express concurrently (port 5173 / 8787)
pnpm dev:vite      # Vite only (no API)
pnpm build         # Vite build → dist/
pnpm preview       # Preview built dist/
```

**All scripts require `--env-file=.env.local`:**
```
pnpm seed:wp       # Seed WP catalog from PRODUCTOS.xlsx
pnpm upload:images # Upload product images to WP
pnpm verify:wp     # Verify WP connection
```

## Architecture

### Three Layers

1. **Frontend SPA** (Vercel) — React + Vite, deployed as static files from `dist/`
2. **API server** (separate deployment) — Express on port 8787, single endpoint `POST /api/cultivation-chat` (GROQ/LLaMA 3.3-70b)
3. **WordPress CMS** (Hostinger) — Product catalog via REST API at `gold-meerkat-677072.hostingersite.com`

### Proxy / Rewrites

| Prefix | Dev target | Production |
|--------|-----------|------------|
| `/api` | `127.0.0.1:8787` | Vercel serverless function (`api/cultivation-chat.ts`, maxDuration 10s) |
| `/wp-api` | WordPress host | Vercel rewrite to same host, rewrites to `/wp-json` |

`vercel.json` catches `/*` → `/index.html` for SPA routing.

## Key Conventions

- **Package manager**: `pnpm` 9.15.4. Do NOT use npm/yarn for install.
- **Env files**: `.env.local` for scripts. `.env.example` is committed. Never commit real keys.
- **TypeScript**: `moduleResolution: "bundler"`, `allowImportingTsExtensions`. Server files use `.ts` extensions in imports.
- **i18n**: ES/EN throughout. `lang` prop from `AppContext`. All user-facing strings are bilingual dicts.
- **Style**: Neo-brutalism (thick borders, solid offset shadows, pink/black/white). Tailwind with `darkMode: 'class'`. Fonts: Inter (sans), JetBrains Mono (mono).

## State Management

- **`cartStore`** (Zustand + `persist`): Carries `items` in `localStorage` under key `bh-cart`. Items are `FlatProduct` from `wpCatalog.ts`.
- **`categoryCatalogStore`** (Zustand): UI state only — search, sort, filter. No persistence.
- **`TanStack Query`**: Used for WP catalog fetches. Retry=1, no refetch on focus.

## Catalog Data Flow

1. Frontend fetches from `/wp-api/wp-json/` → normalized by `src/lib/wpCatalog.ts`
2. WordPress products use ACF fields (`name_es`, `name_en`, `description_es`, etc.)
3. Local `src/data/categories.ts` provides fallback/override data — local data wins when WP lacks fields
4. `CATEGORIES` array is also used in the AI chat system prompt (`catalogForPrompt.ts`)

## Deployment Gotchas

- **Vercel**: Uses `api/cultivation-chat.ts` as serverless function (timeout 10s, GROQ timeout ~9500ms)
- **Netlify**: Configured but secondary. Functions in `netlify/functions/`. `netlify.toml` redirects `/api/cultivation-chat` to function.
- **Express server** is for local dev only. In production the chat endpoint runs as serverless.
- GROQ timeout: 45s default locally, ~9500ms in serverless (free tier limit)

## No Tests

No test framework configured. Verify changes manually via `pnpm dev` or `pnpm preview` after build.

---

## SOLID Principles

Apply these principios en todo código nuevo o refactorizado del proyecto:

- **S — Single Responsibility**: Cada componente, hook o módulo tiene una sola razón para cambiar. Ejemplos concretos:
  - `wpCatalog.ts` solo normaliza datos de WP — no renderiza ni maneja estado.
  - Un componente `ProductCard` solo muestra un producto — no fetcha ni filtra.
  - Los hooks `useCart`, `useCatalog` encapsulan lógica — los componentes solo los consumen.

- **O — Open/Closed**: Extender sin modificar. Usar props, composición y variantes en vez de condiciones dentro de componentes ya estables.
  - Preferir `<Button variant="ghost" />` sobre agregar `if (isGhost)` dentro de `Button`.
  - Nuevas categorías o filtros se agregan en `categories.ts`, no tocando el componente de filtro.

- **L — Liskov Substitution**: Los componentes hijo deben poder reemplazar al padre sin romper la UI. Props opcionales con defaults sensatos. No asumir forma del dato — validar con TypeScript.

- **I — Interface Segregation**: No pasar props que el componente no usa. Si un componente recibe un objeto `Product` completo pero solo usa `name` e `image`, crear un tipo más pequeño o destructurar explícitamente.

- **D — Dependency Inversion**: Los componentes de UI dependen de abstracciones (hooks, stores, tipos), no de implementaciones concretas (fetch directo, localStorage crudo).
  - Correcto: `const { items } = useCartStore()`.
  - Incorrecto: `const items = JSON.parse(localStorage.getItem('bh-cart'))` dentro de un componente.

---

## Code Explanation Format

Cuando el agente explique código existente o cambios realizados, la respuesta debe seguir este formato compacto:

**¿Qué hace?**
- Bullet de máximo una línea por concepto clave.

**¿Por qué así?**
- Bullet con la razón de diseño o constraint del proyecto que justifica la decisión.

**Archivos tocados:**
- `ruta/archivo.ts` — qué cambió y por qué.

No incluir bloques de código completos en la explicación salvo que el cambio sea de 5 líneas o menos. Para cambios mayores, referenciar el archivo y la línea.

---

## Feature & Issue Workflow

Para cada nueva feature o bug fix, trabajar en tres etapas obligatorias. No saltar etapas.

### Etapa 1 — Planificación

Antes de escribir código, responder en bullets:

- **Problema / objetivo**: qué se quiere lograr o qué falla.
- **Archivos afectados**: lista de archivos que se van a crear o modificar.
- **Dependencias**: ¿requiere cambios en WP, en el store, en tipos compartidos?
- **Riesgos**: ¿puede romper algo existente? ¿hay side effects en el carrito, i18n, o el build?
- **Decisión de diseño**: ¿nuevo componente, nuevo hook, extensión de existente?

No continuar a Implementación sin tener este bloque claro.

### Etapa 2 — Implementación

- Aplicar los principios SOLID definidos arriba.
- Hacer cambios atómicos: un commit lógico por responsabilidad (no mezclar refactor + feature).
- Si se toca `wpCatalog.ts` o `categories.ts`, verificar que los tipos exportados no rompan consumidores existentes.
- Si se modifica el sistema prompt del chat, documentar el cambio en un comentario inline.
- Al finalizar, listar en bullets qué se hizo (usar el formato de Code Explanation Format).

### Etapa 3 — Testeo

Sin framework de tests, verificar manualmente estos puntos según el área tocada:

**Catálogo / WP:**
- [ ] `pnpm dev` levanta sin errores de consola.
- [ ] Los productos cargan desde `/wp-api`.
- [ ] Filtros y búsqueda funcionan con los nuevos cambios.

**Carrito:**
- [ ] Agregar, quitar y vaciar el carrito persiste en `localStorage`.
- [ ] El badge de cantidad se actualiza en tiempo real.

**Chat:**
- [ ] `POST /api/cultivation-chat` responde en menos de 10s en dev.
- [ ] El fallback de timeout muestra mensaje de error amigable.

**i18n:**
- [ ] Alternar ES/EN no rompe la UI ni deja keys sin traducir visibles.

**Build:**
- [ ] `pnpm build` completa sin errores de TypeScript ni Vite.
- [ ] `pnpm preview` muestra la app correctamente en `/`.

Si algún punto falla, volver a Implementación con el hallazgo documentado.