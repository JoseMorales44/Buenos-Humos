/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_GA4_MEASUREMENT_ID?: string
  readonly VITE_GSC_VERIFICATION_CODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
