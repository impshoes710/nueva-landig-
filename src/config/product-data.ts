/**
 * ═══════════════════════════════════════════════════════════════════
 *  PLANTILLA PREMIUM — EDITA SOLO ESTE ARCHIVO PARA CADA PRODUCTO
 * ═══════════════════════════════════════════════════════════════════
 *
 * Duplica el proyecto, cambia los valores abajo y despliega.
 * Compatible con Shopify (checkout vía /api/create-order).
 */

export const productData = {
  // ─── SEO ─────────────────────────────────────────────────────────
  meta: {
    titulo: 'Lokal Big | Blanco | Calzados Elite',
    descripcion:
      'Tenis Lokal Big Blanco: reflectivos, ultra ligeros. Oferta limitada, envío gratis y pago contra entrega en Colombia.',
    keywords: 'tenis, lokal big, calzados, streetwear, oferta',
    imagenOg:
      'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_b_4.png?width=1200&format=webp',
  },

  // ─── TEMA VISUAL ─────────────────────────────────────────────────
  tema: {
    acento: '#ff1a47',
    acentoTexto: '#ffffff',
    fondo: '#070707',
    superficie: '#141414',
    texto: '#f5f5f5',
    textoSuave: '#a3a3a3',
  },

  // ─── HERO ────────────────────────────────────────────────────────
  nombre: 'Lokal Big',
  subtitulo: 'El tenis viral que viste en TikTok — ahora en tu talla',
  etiqueta: 'Edición Blanco · Nuevo stock',
  badgeDescuento: '30% OFF',
  precio: 119000,
  precioAnterior: 210000,
  moneda: '$',

  cta: {
    principal: 'Comprar ahora',
    secundario: 'Pagar en casa',
  },

  /** Galería principal (URLs). La primera es la imagen por defecto. */
  imagenes: [
    'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_b_3.png?width=900&quality=70&format=webp',
    'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_b_2.png?width=900&quality=70&format=webp',
    'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_b_1.png?width=900&quality=70&format=webp',
    'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_b_4.png?width=900&quality=70&format=webp',
  ],

  /** Video opcional en hero (dejar "" para desactivar) */
  videoPrincipal: '',

  /** Miniaturas de video en galería */
  videos: [
    {
      url: 'https://cdn.shopify.com/videos/c/vp/930c168494704fc19b89b659e51ae942/930c168494704fc19b89b659e51ae942.SD-480p-0.9Mbps-59941993.mp4',
      poster:
        'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/preview_images/930c168494704fc19b89b659e51ae942.thumbnail.0000000000.jpg?width=400&format=webp',
      etiqueta: '2.5M vistas',
    },
  ],

  colores: [
    { nombre: 'Blanco', hex: '#f5f5f5', imagen: 'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_b_4.png?width=900&format=webp' },
    { nombre: 'Camuflado', hex: '#9ca3af', imagen: 'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_bc_4.png?width=900&format=webp' },
    { nombre: 'Negro Morado', hex: '#4c1d95', imagen: 'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_nm_4.png?width=900&format=webp' },
    { nombre: 'Rojo', hex: '#dc2626', imagen: 'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_r_4.png?width=900&format=webp' },
  ],

  tallas: ['35', '36', '37', '38', '39', '40', '41', '42', '43'],

  // ─── BENEFICIOS (cards con ícono) ───────────────────────────────
  beneficios: [
    { icono: '🚚', titulo: 'Envío gratis', texto: 'A todo Colombia en compras de la landing.' },
    { icono: '🏠', titulo: 'Pago en casa', texto: 'Paga al recibir. Sin tarjeta, sin riesgo.' },
    { icono: '↩️', titulo: 'Cambio de talla', texto: 'Si no te queda, cambiamos gratis.' },
    { icono: '🛡️', titulo: '3 meses garantía', texto: 'Contra defectos de fábrica.' },
  ],

  // ─── LIFESTYLE / STREETWEAR ─────────────────────────────────────
  lifestyle: {
    titulo: 'Hecho para la calle',
    texto: 'Diseño oversized, acabado reflectivo y comodidad todo el día. El mismo estilo que arrasa en TikTok Shop.',
    imagen:
      'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_b_1.png?width=1200&format=webp',
    imagenSecundaria:
      'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_b_2.png?width=800&format=webp',
    badge: 'Streetwear · Premium',
  },

  // ─── CARACTERÍSTICAS (stats) ────────────────────────────────────
  caracteristicas: [
    { label: 'Peso', valor: '250', unidad: 'g' },
    { label: 'Suela', valor: 'EVA', unidad: '+' },
    { label: 'Material', valor: 'Mesh', unidad: '+' },
    { label: 'Uso', valor: 'Urbano', unidad: '' },
  ],

  detallesProducto: [
    'Capa reflectiva visible con flash',
    'Plantilla acolchada de alta densidad',
    'Malla transpirable — ideal para clima cálido',
    'Estilo chunky / dad shoe en tendencia',
  ],

  // ─── URGENCIA Y OFERTA ──────────────────────────────────────────
  urgencia: {
    activo: true,
    titulo: 'Oferta por tiempo limitado',
    horasContador: 24,
    stockRestante: 14,
    stockTotal: 50,
    mensajes: [
      '🔥 Más de 50 pedidos hoy',
      '⚠️ Stock bajo en tu talla',
      '⏳ El precio sube cuando termine el contador',
    ],
  },

  paquetes: [
    {
      label: '1 par',
      subtitle: 'Envío gratis incluido',
      comparePrice: '$210,000',
      price: '$119,000',
      quantity: 1,
      percent: '43',
    },
    {
      label: '2 pares',
      subtitle: 'Cada par a $100,000',
      comparePrice: '$420,000',
      price: '$200,000',
      quantity: 2,
      percent: '52',
    },
  ],

  // ─── TIKTOK / VIRAL ─────────────────────────────────────────────
  tiktok: {
    titulo: 'Los más virales de TikTok',
    subtitulo: '¿Ya tienes los tuyos?',
    videos: [
      {
        url: 'https://cdn.shopify.com/videos/c/vp/930c168494704fc19b89b659e51ae942/930c168494704fc19b89b659e51ae942.SD-480p-0.9Mbps-59941993.mp4',
        views: '2.5 mill.',
      },
      {
        url: 'https://cdn.shopify.com/videos/c/vp/190aca21927b48d2a4a17732d2f63be5/190aca21927b48d2a4a17732d2f63be5.SD-480p-0.9Mbps-59882250.mp4',
        views: '610.5 mil',
      },
    ],
    caption: '12M+ de vistas combinadas — la gente está obsesionada con estos tenis',
  },

  // ─── GARANTÍAS / CONFIANZA ──────────────────────────────────────
  garantias: [
    {
      titulo: 'Entrega 2–5 días',
      texto: 'Pídelos hoy y paga al recibir. Seguimiento por WhatsApp.',
      video: 'https://lp.calzadoselite.co/shipping.mp4',
    },
    {
      titulo: '3 meses de garantía',
      texto: 'Defectos de fábrica cubiertos sin costo.',
      video: 'https://lp.calzadoselite.co/support.mp4',
    },
  ],

  // ─── TESTIMONIOS ────────────────────────────────────────────────
  testimonios: {
    titulo: 'Ellos ya los tienen puestos',
    items: [
      {
        nombre: 'Laura M.',
        ciudad: 'Medellín',
        estrellas: 5,
        texto: 'Llegaron rapidísimo y son idénticos a los del video. Talla perfecta.',
        foto: 'https://lp.calzadoselite.co/store_reviews/1.png',
      },
      {
        nombre: 'Andrés R.',
        ciudad: 'Bogotá',
        estrellas: 5,
        texto: 'Calidad premium, se ven caros. El reflectivo en fotos es brutal.',
        foto: 'https://lp.calzadoselite.co/store_reviews/3.png',
      },
      {
        nombre: 'Valentina S.',
        ciudad: 'Cali',
        estrellas: 5,
        texto: 'Pedí 2 pares, negocié con mi hermana. 100% recomendados.',
        foto: 'https://lp.calzadoselite.co/store_reviews/5.png',
      },
    ],
    /** Carrusel solo imágenes (UGC) */
    imagenes: [
      'https://lp.calzadoselite.co/store_reviews/1.png',
      'https://lp.calzadoselite.co/store_reviews/2.png',
      'https://lp.calzadoselite.co/store_reviews/3.png',
      'https://lp.calzadoselite.co/store_reviews/4.png',
      'https://lp.calzadoselite.co/store_reviews/5.png',
      'https://lp.calzadoselite.co/store_reviews/6.png',
    ],
  },

  // ─── FAQ ────────────────────────────────────────────────────────
  faq: {
    titulo: 'Preguntas frecuentes',
    items: [
      {
        pregunta: '¿Qué pasa si pido la talla equivocada?',
        respuesta:
          'Cambio de talla gratis. Escríbenos por WhatsApp y te guiamos sin costo.',
      },
      {
        pregunta: '¿Cuánto tarda el envío?',
        respuesta: 'Entre 2 y 5 días hábiles según tu ciudad. Te avisamos en cada paso.',
      },
      {
        pregunta: '¿Puedo pagar al recibir?',
        respuesta: 'Sí. Elige "Pagar en casa" y cancelas cuando recibas el pedido.',
      },
    ],
  },

  // ─── CTA FINAL ──────────────────────────────────────────────────
  ctaFinal: {
    titulo: 'No dejes pasar esta oferta',
    subtitulo: 'Stock limitado · Envío gratis · Pago contra entrega',
    boton: 'Pagar en casa',
  },

  // ─── FOOTER ─────────────────────────────────────────────────────
  footer: {
    marca: 'Calzados Elite',
    metodosPago: ['💵 Efectivo', '🏠 Contra entrega', '📱 Nequi', '💳 Datáfono'],
    enlaces: [
      { label: 'Términos', url: '#' },
      { label: 'Privacidad', url: '#' },
      { label: 'Catálogo', url: 'https://calzadoselite.co' },
    ],
    credito: 'Hecho con ❤️ para vender en redes',
  },

  whatsapp: {
    numero: '573001234567',
    mensaje: 'Hola, quiero información sobre los Lokal Big',
    textoBoton: 'WhatsApp',
    flotante: true,
  },

  /** Productos relacionados (grid opcional) */
  relacionados: {
    titulo: 'También te puede gustar',
    productos: [
      {
        nombre: 'Lokal Big Camuflado',
        precio: 149000,
        precioAnterior: 210000,
        imagen:
          'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/s2_lb_bc_4.png?width=600&format=webp',
        url: '#',
      },
      {
        nombre: 'Lokal Preto Negro',
        precio: 149000,
        precioAnterior: 210000,
        imagen:
          'https://cdn.shopify.com/s/files/1/0948/6296/7074/files/prt_nb_2.png?width=600&format=webp',
        url: '#',
      },
    ],
  },

  /** Shopify: ID numérico de variante por talla (opcional). Sin esto el checkout pide talla pero no envía variantId. */
  shopifyVariantes: {} as Record<string, number>,
};

export type ProductData = typeof productData;
