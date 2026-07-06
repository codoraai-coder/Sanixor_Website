/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the Sanixor backend API, e.g. https://api.sanixor.space */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
