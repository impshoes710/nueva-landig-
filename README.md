# lpcelite-astro (botones negros)

Copia del landing **Lokal Big Blanco** de [Calzados Elite](https://lp.calzadoselite.co/oferta/lokal-big-blanco), en [Astro](https://astro.build/), con botones negros y pedidos enviados a **Shopify** al completar el formulario.

## Desarrollo

1. Copia las variables de entorno:

```bash
cp .env.example .env
```

2. Las credenciales están en `src/config/shopify.ts`. Opcionalmente puedes sobrescribirlas con `.env`.

3. Inicia el servidor:

```bash
npm install
npm run dev
```

Abre http://localhost:4321

## Producción

```bash
npm run build
npm run preview
```

En hosting (Railway, Render, VPS, etc.) debes desplegar en **modo Node** (el proyecto usa `@astrojs/node` para la API).

## Shopify — configuración de la API

1. En **Shopify Admin** → **Configuración** → **Apps y canales de venta** → **Desarrollar apps** → crea una app personalizada.
2. Activa el scope **`write_orders`** (y `read_products` si lo pide).
3. Instala la app en la tienda y copia el **Admin API access token** (`shpat_...`).
4. En `.env`:

```env
SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxx
SHOPIFY_API_VERSION=2026-04
```

Al enviar el formulario **Pagar en casa**, el sitio llama a `POST /api/create-order`, que crea un pedido en Shopify con:

- Variante y talla seleccionadas en la página
- Cantidad según paquete (1 par / 2 pares)
- Dirección de envío y datos del cliente
- Estado de pago **pendiente** (pago contra entrega)
- Etiquetas: `landing-astro`, `pagar-en-casa`

## Nota

Las imágenes y videos se cargan desde `lp.calzadoselite.co` y el CDN de Shopify.
