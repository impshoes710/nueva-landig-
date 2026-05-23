/**
 * ============================================================
 * CONFIGURACIÓN DE PRODUCTOS
 * ============================================================
 *
 * Cada producto es una landing page independiente.
 * Para crear un nuevo producto, copia un bloque y cambia los datos.
 *
 * ACCESO: tusitio.com/            → primer producto (default)
 *         tusitio.com/jr-cadense  → producto por slug
 *
 * INSTRUCCIONES POR SECCIÓN:
 *
 * 🎨 accentColor: El color principal de botones y acentos (hex)
 * 📸 colors[].images: Las 4 fotos del carrusel por cada color
 * 🎬 videos: Videos verticales de TikTok/Reels
 * 💰 packages: Precios por paquete (1 par, 2 pares, etc.)
 * 👟 sizes/variants: Tallas y IDs de Shopify
 * ============================================================
 */

export const products = [
  {
    // ─── IDENTIFICACIÓN ─────────────────────────────────
    slug: 'jr-cadense',
    title: 'JR_CADENSE',
    sneakerName: 'JR Cadense',
    shopifyProductId: 'gid://shopify/Product/9945929449762',

    // ─── ESTILO ──────────────────────────────────────────
    accentColor: '#000000',

    // ─── DESCUENTO Y BADGE ───────────────────────────────
    discountPercent: 35,
    badgeText: '35% OFF',

    // ─── CARACTERÍSTICAS (debajo del nombre) ─────────────
    features: [
      { icon: '⚡', text: 'Reflectivo' },
      { icon: '💎', text: 'Ultra ligeras (250g)' },
    ],

    // ─── PAQUETES / PRECIOS ──────────────────────────────
    packages: [
      {
        label: '1 par',
        quantity: 1,
        price: '$119,000',
        comparePrice: '$210,000',
        discount: '$91,000',
        discountPercent: '43',
      },
      {
        label: '2 pares',
        quantity: 2,
        price: '$200,000',
        comparePrice: '$420,000',
        discount: '$220,000',
        discountPercent: '52',
      },
    ],

    // ─── COLORES (cada uno con thumbnail + 4 imágenes) ───
    colors: [
      {
        name: 'Gris',
        colorCode: '#9CA3AF',
        thumbnail: 'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_ukfcmkukfcmkukfc_720x.png?v=1778768488',
        images: [
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_ukfcmkukfcmkukfc_720x.png?v=1778768488',
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_cken4zcken4zcken_720x.png?v=1778768488',
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_hh26bhhh26bhhh26_720x.png?v=1778768488',
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_h8so07h8so07h8so_1_720x.png?v=1778768488',
        ],
      },
      {
        name: 'Negro',
        colorCode: '#1F2937',
        thumbnail: 'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_h8so07h8so07h8so_1_720x.png?v=1778768488',
        images: [
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_h8so07h8so07h8so_1_720x.png?v=1778768488',
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_hh26bhhh26bhhh26_720x.png?v=1778768488',
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_cken4zcken4zcken_720x.png?v=1778768488',
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_ukfcmkukfcmkukfc_720x.png?v=1778768488',
        ],
      },
      {
        name: 'Azul',
        colorCode: '#1E3A5F',
        thumbnail: 'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_hh26bhhh26bhhh26_720x.png?v=1778768488',
        images: [
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_hh26bhhh26bhhh26_720x.png?v=1778768488',
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_ukfcmkukfcmkukfc_720x.png?v=1778768488',
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_h8so07h8so07h8so_1_720x.png?v=1778768488',
          'https://www.gabshoes.com/cdn/shop/files/Gemini_Generated_Image_cken4zcken4zcken_720x.png?v=1778768488',
        ],
      },
    ],

    // ─── VIDEOS VIRALES (TikTok/Reels) ──────────────────
    videos: [
      {
        url: 'https://cdn.shopify.com/videos/c/vp/930c168494704fc19b89b659e51ae942/930c168494704fc19b89b659e51ae942.SD-480p-0.9Mbps-59941993.mp4',
        poster: 'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/preview_images/930c168494704fc19b89b659e51ae942.thumbnail.0000000000.jpg',
        views: '2.5 mill.',
      },
      {
        url: 'https://cdn.shopify.com/videos/c/vp/190aca21927b48d2a4a17732d2f63be5/190aca21927b48d2a4a17732d2f63be5.SD-480p-0.9Mbps-59882250.mp4',
        poster: 'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/preview_images/190aca21927b48d2a4a17732d2f63be5.thumbnail.0000000000.jpg',
        views: '610.5 mil',
      },
    ],

    // ─── TALLAS Y VARIANTES SHOPIFY ─────────────────────
    sizes: ['35', '36', '37', '38', '39', '40', '41', '42', '43'],
    variants: [
      { size: '35', variantId: 'gid://shopify/ProductVariant/50600933490978' },
      { size: '36', variantId: 'gid://shopify/ProductVariant/50600933523746' },
      { size: '37', variantId: 'gid://shopify/ProductVariant/50600933556514' },
      { size: '38', variantId: 'gid://shopify/ProductVariant/50600933589282' },
      { size: '39', variantId: 'gid://shopify/ProductVariant/50600933622050' },
      { size: '40', variantId: 'gid://shopify/ProductVariant/50600933654818' },
      { size: '41', variantId: 'gid://shopify/ProductVariant/50600933687586' },
      { size: '42', variantId: 'gid://shopify/ProductVariant/50600933720354' },
      { size: '43', variantId: 'gid://shopify/ProductVariant/50600933753122' },
    ],

    // ─── BOTÓN CTA ──────────────────────────────────────
    ctaText: 'Pagar en casa',
  },
];

/** Devuelve un producto por su slug */
export function getProduct(slug) {
  return products.find((p) => p.slug === slug) || products[0];
}

/** Devuelve todos los slugs para generar rutas estáticas */
export function getAllSlugs() {
  return products.map((p) => p.slug);
}
