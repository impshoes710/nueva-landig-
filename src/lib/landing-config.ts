import type { LandingConfig } from '../types/landing-config';
import defaultConfig from '../data/lokal-big-blanco.json';

const CONFIG_PATH = new URL('../data/lokal-big-blanco.json', import.meta.url);

export function getDefaultLandingConfig(): LandingConfig {
  return structuredClone(defaultConfig as LandingConfig);
}

export async function loadLandingConfig(): Promise<LandingConfig> {
  if (import.meta.env.DEV) {
    try {
      const mod = await import('../data/lokal-big-blanco.json');
      return structuredClone(mod.default as LandingConfig);
    } catch {
      return getDefaultLandingConfig();
    }
  }
  return getDefaultLandingConfig();
}

export function formatCop(price: number): string {
  return '$' + price.toLocaleString('es-CO');
}

export function packageDiscount(comparePrice: string, price: string): string {
  const num = (s: string) =>
    Number(s.replace(/[^\d]/g, '')) || 0;
  const diff = num(comparePrice) - num(price);
  return '$' + diff.toLocaleString('es-CO');
}

export { CONFIG_PATH };
