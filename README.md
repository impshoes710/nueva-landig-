# Landing Lokal Big (editable)

Copia editable del landing [Lokal Big Blanco](https://lp.calzadoselite.co/oferta/lokal-big-blanco), en [Astro](https://astro.build/), con panel de administración para cambiar fotos, videos, textos, colores, precios y promociones.

## Desarrollo

```bash
npm install
npm run dev
```

- **Landing**: http://localhost:4321/
- **Editor**: http://localhost:4321/admin

## Editar contenido

1. Abre **/admin** en el navegador.
2. Cambia textos, colores (selector), URLs de imágenes/videos, precios de paquetes, FAQ, etc.
3. Pulsa **Guardar cambios** (en local escribe `src/data/lokal-big-blanco.json`).
4. Recarga la landing principal.

También puedes editar directamente el archivo `src/data/lokal-big-blanco.json` o usar **Descargar JSON** y subirlo al repositorio.

### Producción (Vercel)

El sistema de archivos en Vercel es de solo lectura. Para guardar desde `/admin` en producción:

1. Define la variable `LANDING_ADMIN_SECRET` en Vercel.
2. En el editor, abre la consola del navegador y ejecuta:  
   `localStorage.setItem('landing-admin-secret', 'tu-clave')`
3. Guarda desde el panel.

Si no usas el secreto, descarga el JSON desde el admin y reemplaza `src/data/lokal-big-blanco.json` antes de desplegar.

## Shopify — pedidos

Al pulsar **Pagar en casa**, se llama a `POST /api/create-order`. Configura en `.env`:

```env
SHOPIFY_STORE_DOMAIN=ba6703.myshopify.com
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxx
SHOPIFY_API_VERSION=2026-04
```

## Otras rutas

- `/cadense` — versión anterior (HTML estático JR_CADENSE)

## Build

```bash
npm run build
npm run preview
```
