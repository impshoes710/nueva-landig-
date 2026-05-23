import type { APIRoute } from 'astro';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { LandingConfig } from '../../types/landing-config';
import { getDefaultLandingConfig } from '../../lib/landing-config';

const configFile = fileURLToPath(new URL('../../data/lokal-big-blanco.json', import.meta.url));

export const GET: APIRoute = async () => {
  try {
    const raw = await readFile(configFile, 'utf-8');
    const config = JSON.parse(raw) as LandingConfig;
    return new Response(JSON.stringify(config), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify(getDefaultLandingConfig()), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  const secret = import.meta.env.LANDING_ADMIN_SECRET;
  const isDev = import.meta.env.DEV;

  if (!isDev && (!secret || request.headers.get('x-landing-secret') !== secret)) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const body = (await request.json()) as LandingConfig;
    await writeFile(configFile, JSON.stringify(body, null, 2) + '\n', 'utf-8');
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al guardar';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};
