# lpcelite-astro (botones negros)

Copia del landing **Lokal Big Blanco** de [Calzados Elite](https://lp.calzadoselite.co/oferta/lokal-big-blanco), migrado a [Astro](https://astro.build/) con los botones y acentos en **negro** (`#000000`) en lugar del rojo original (`#ff1a47`).

Basado en el repositorio de referencia `Detlove/lpcelite-astro` (no público en GitHub al momento de esta copia); el contenido proviene de la landing publicada en `lp.calzadoselite.co`.

## Cambios respecto al original

- `--color-accent` y clases `bg-accent` / `text-accent` usan **negro** en lugar de rosa/rojo.
- El resto del diseño, textos y enlaces se mantienen igual.

## Desarrollo

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

## Nota

Las imágenes, videos y fuentes se cargan desde el sitio original (`lp.calzadoselite.co` y CDN de Shopify). Para producción propia, sustituye esas URLs por assets locales.
