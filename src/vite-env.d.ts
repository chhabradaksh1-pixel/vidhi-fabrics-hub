/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 measurement ID ("G-XXXXXXX"). Optional; GA4 is off when unset. */
  readonly VITE_GA4_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
