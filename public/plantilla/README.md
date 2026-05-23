# Plantilla premium calzado

## Editar el producto

Abre **`src/config/product-data.ts`** y modifica el objeto `productData`:

- `imagenes`, `videos`, `colores`, `tallas`
- `precio`, `precioAnterior`, `badgeDescuento`
- `beneficios`, `testimonios`, `faq`, `urgencia`
- `tema` (colores de la marca)
- `cta`, `whatsapp`, `paquetes`

## Desarrollo

```bash
npm run dev
```

- Landing: http://localhost:4321/
- Editor visual legacy: http://localhost:4321/admin

## Duplicar para otro producto

1. Copia `product-data.ts` → `product-data-otro.ts`
2. Crea una página Astro que importe ese archivo
3. Despliega

## Shopify

Configura `shopifyVariantes` con IDs de variante por talla, o conecta tu flujo en `POST /api/create-order`.
