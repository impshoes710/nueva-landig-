# Plantilla landing premium — calzado / streetwear

Landing de alta conversión para **Meta Ads** y **TikTok Ads**, optimizada para móvil y Shopify.

## Editar todo desde un solo archivo

**`src/config/product-data.ts`** — objeto `productData` con:

| Sección | Qué editas |
|---------|------------|
| `meta` | SEO, título, OG image |
| `tema` | Colores (acento, fondo, texto) |
| `nombre`, `subtitulo`, `precio`, `precioAnterior` | Hero y precios |
| `imagenes`, `videos`, `videoPrincipal` | Galería |
| `colores`, `tallas` | Selectores |
| `cta` | Textos de botones |
| `beneficios` | Cards con íconos |
| `lifestyle` | Sección streetwear |
| `caracteristicas`, `detallesProducto` | Stats del producto |
| `urgencia`, `paquetes` | Contador, stock, ofertas |
| `tiktok` | Videos virales |
| `garantias` | Confianza + videos |
| `testimonios` | Reviews con estrellas |
| `faq`, `whatsapp` | FAQ y botón flotante |
| `ctaFinal`, `footer` | Cierre y pie |

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

- **Landing**: `/`
- **Editor JSON (legacy)**: `/admin`
- **Guía plantilla**: `/plantilla/README.md`

## Shopify

Pedidos con **Pagar en casa** → `POST /api/create-order`. Variables en `.env`:

```env
SHOPIFY_STORE_DOMAIN=ba6703.myshopify.com
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxx
SHOPIFY_API_VERSION=2026-04
```

Opcional: `shopifyVariantes: { "40": 50600933654818 }` en `product-data.ts` para mapear tallas a variantes.

## Duplicar para otro producto

1. Copia `src/config/product-data.ts`
2. Cambia valores
3. (Opcional) Nueva ruta Astro que importe otro config

## Stack

- Astro + HTML semántico
- Tailwind CSS v4
- JavaScript modular (`premium-landing.js`, `landing-interactions.js`)
- Diseño premium oscuro, glassmorphism, sticky CTA móvil
