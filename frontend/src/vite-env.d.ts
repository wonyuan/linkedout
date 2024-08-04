/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string; 
    readonly VITE_MONGO_USERNAME: string;
    readonly VITE_MONGO_PASSWORD: string;
  }
  
  interface ImportMeta {
    url: string
    readonly env: ImportMetaEnv;
  }