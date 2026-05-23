/**
 * ============================================================
 * CONFIGURACIÓN DEL SITIO
 * ============================================================
 * Aquí defines los elementos compartidos de todas las landings.
 */

export const site = {
  /** Texto del banner superior (cintillo) */
  headerBanner: 'En liquidación | Termina en',
  /** Mostrar contador regresivo en el header */
  showCountdown: true,

  /** Imágenes de reseñas de la tienda */
  reviews: [
    'https://lp.calzadoselite.co/store_reviews/1.png',
    'https://lp.calzadoselite.co/store_reviews/2.png',
    'https://lp.calzadoselite.co/store_reviews/3.png',
    'https://lp.calzadoselite.co/store_reviews/4.png',
    'https://lp.calzadoselite.co/store_reviews/5.png',
    'https://lp.calzadoselite.co/store_reviews/6.png',
    'https://lp.calzadoselite.co/store_reviews/7.png',
    'https://lp.calzadoselite.co/store_reviews/8.png',
  ],

  /** Logo de la tienda */
  logo: 'https://lp.calzadoselite.co/dark_ins_logo.png',

  /** Textos de beneficios (iconos + texto debajo del carrusel) */
  benefits: [
    { icon: '🚚', title: 'Entrega en 3-5 días', subtitle: 'Envío gratis a todo Colombia' },
    { icon: '🛡️', title: 'Garantía 3 meses', subtitle: 'Producto 100% original' },
    { icon: '🔄', title: 'Cambio de talla gratis', subtitle: 'Sin costo adicional' },
  ],

  /** TikTok Pixels adicionales (opcional) */
  extraTiktokPixels: [
    'D36RPIBC77UFRPGCR4IG',
    'D3IRKGBC77U3D7OGJQA0',
    'D3PTG9JC77U5DNB8SCTG',
    'D49M1OBC77U6M9K6RE30',
  ],
};
