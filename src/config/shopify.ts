/**
 * Configuración pública de Shopify (tienda GAB / ba6703).
 * El token está en shopify.secrets.ts (no se sube a GitHub).
 */
import { shopifySecrets } from './shopify.secrets';

export const shopifyConfig = {
  storeDomain: 'ba6703.myshopify.com',
  adminAccessToken: shopifySecrets.adminAccessToken,
  apiVersion: '2026-04',
} as const;
