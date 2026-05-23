## Cursor Cloud specific instructions

This is an Astro SSR landing page for a shoe retailer (Calzados Elite). See `README.md` for full setup and Shopify configuration details.

### Quick reference

- **Dev server**: `npm run dev` → http://localhost:4321
- **Content editor**: http://localhost:4321/admin (edits `src/data/lokal-big-blanco.json`)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

### Notes

- No lint, test, or format scripts are configured in `package.json`. The project relies on Astro's built-in TypeScript checking only.
- `astro check` requires installing `@astrojs/check` and `typescript` as extra devDependencies (not included by default).
- The Vercel adapter (`@astrojs/vercel`) is used for production deployment but `astro dev` handles SSR locally without issues.
- Shopify API credentials (`SHOPIFY_ADMIN_ACCESS_TOKEN`) are needed only for the order-creation flow (`POST /api/create-order`). The landing page renders without them.
- Images and videos load from external CDNs (`cdn.shopify.com`, `lp.calzadoselite.co`, `www.gabshoes.com`). Internet connectivity is required for full visual rendering.
- The `lpcelite-astro/` subdirectory is a simpler/earlier copy of the project (static-only, no Shopify integration). The root project is the primary one.
