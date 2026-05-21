interface ImportMetaEnv {
  readonly SHOPIFY_STORE_DOMAIN: string;
  readonly SHOPIFY_ADMIN_ACCESS_TOKEN: string;
  readonly SHOPIFY_API_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
