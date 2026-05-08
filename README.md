# Buenos Humos Club 🚀

Smoke & Grow Shop — SPA para catálogo de accesorios de cannabis. React + Vite + Tailwind, con catálogo desde WordPress (Hostinger) y chat IA integrado.

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18, Vite 6, TypeScript |
| Estilos | Tailwind CSS 3, neo-brutalism |
| Estado | Zustand + persist (carrito), TanStack Query (WP catalog) |
| Backend API | Express (local), Vercel Serverless / Netlify Functions (prod) |
| CMS | WordPress REST API (Hostinger) |
| Chat IA | GROQ + LLaMA 3.3-70b |
| Analytics | Google Analytics 4, Google Search Console |

## Requisitos

- Node.js >= 18
- pnpm 9.15.4

## Instalación

```bash
pnpm install
```

Copiar `.env.example` a `.env.local` y llenar credenciales:

```bash
cp .env.example .env.local
```

Variables requeridas en `.env.local`:

| Variable | Descripción |
|----------|------------|
| `WP_BASE_URL` | URL del WordPress (Hostinger) |
| `WP_USER` | Usuario WP para scripts de seeding |
| `WP_PASSWORD` | Contraseña WP |
| `GROQ_API_KEY` | API key de GROQ para el chat |
| `VITE_GA4_MEASUREMENT_ID` | ID de Google Analytics (opcional) |
| `VITE_GSC_VERIFICATION_CODE` | Código de Google Search Console (opcional) |

## Scripts

### Desarrollo

```bash
pnpm dev        # Frontend (Vite) + API (Express) concurrente
pnpm dev:vite   # Solo frontend (sin API)
pnpm dev:api    # Solo API (Express, puerto 8787)
```

### Build

```bash
pnpm build      # Build de producción → dist/
pnpm preview    # Vista previa del build
```

### WordPress Catalog (requieren `--env-file=.env.local`)

```bash
pnpm seed:wp         # Sembrar catálogo desde PRODUCTOS.xlsx
pnpm upload:images   # Subir imágenes de productos a WP
pnpm verify:wp       # Verificar conexión con WP
pnpm fetch:images    # Descargar imágenes desde WP
pnpm fill:descriptions  # Rellenar descripciones desde Excel
pnpm clean:packs     # Limpiar productos tipo pack
```

## Arquitectura

### Three Layers

1. **Frontend SPA** (Vercel) — React + Vite, static files desde `dist/`
2. **API server** (Vercel Serverless / Netlify Functions) — `POST /api/cultivation-chat` (GROQ)
3. **WordPress CMS** (Hostinger) — Catálogo vía REST API

### Proxy / Rewrites

| Prefix | Dev target | Production |
|--------|-----------|------------|
| `/api` | `127.0.0.1:8787` | Vercel serverless function |
| `/wp-api` | WordPress host | Rewrite a `/wp-json` |

### Estructura del proyecto

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Root component (single page)
├── context/
│   └── AppContext.tsx           # Theme + lang (ES/EN)
├── components/                 # UI components
│   ├── Header.tsx, Hero.tsx, About.tsx ...
│   ├── CategoryGrid.tsx        # Catálogo de productos
│   ├── Locations.tsx           # Sedes físicas
│   ├── ChatWidget.tsx          # Chat IA (Juancho)
│   └── CartButton.tsx          # Carrito flotante
├── data/                       # Datos estáticos / fallback
├── hooks/                      # Custom hooks
├── lib/                        # Utilidades (wpCatalog.ts)
└── stores/                     # Zustand stores
    ├── cartStore.ts
    ├── categoryCatalogStore.ts
    └── chatStore.ts
```

## Estado

- **cartStore** (Zustand + persist): Carrito en localStorage (`bh-cart`)
- **categoryCatalogStore** (Zustand): UI state (búsqueda, filtros)
- **TanStack Query**: Fetch de catálogo WP (retry=1, sin refetch on focus)

## i18n

ES/EN con diccionarios bilingües inline. `lang` desde `AppContext`.

## Estados de UI

Cada componente maneja los estados: **loading**, **error**, **empty** y **success**.

## SEO

- Meta tags estáticos en `index.html`
- JSON-LD con Schema.org para las dos sedes (Norte y Sur)
- Google Analytics 4 (gtag.js)
- Google Search Console (meta tag de verificación)

## Convenciones

- Package manager: **pnpm** (no npm/yarn)
- `--env-file=.env.local` para scripts de WP
- TypeScript con `moduleResolution: "bundler"`
- Principios SOLID en componentes
- No hay test framework — verificación manual vía `pnpm dev` / `pnpm preview`
