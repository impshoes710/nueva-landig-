import type { APIRoute } from 'astro';
import {
  createShopifyOrder,
  normalizeLineItemPrice,
  type CheckoutCustomer,
} from '../../lib/shopify';

export const prerender = false;

interface OrderRequestBody {
  customer?: CheckoutCustomer;
  variantId?: number | string;
  quantity?: number;
  total?: string;
  size?: string;
  packageLabel?: string;
}

function jsonResponse(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as OrderRequestBody;
    const customer = body.customer;

    if (!customer) {
      return jsonResponse({ error: 'Datos del cliente requeridos' }, 400);
    }

    const required: (keyof CheckoutCustomer)[] = [
      'nombre',
      'apellidos',
      'celular',
      'direccion',
      'barrio',
      'departamento',
      'ciudad',
    ];

    for (const field of required) {
      if (!customer[field]?.trim()) {
        return jsonResponse({ error: `El campo ${field} es obligatorio` }, 400);
      }
    }

    const variantId = Number(body.variantId);
    const quantity = Number(body.quantity) || 1;
    const total = body.total?.trim();

    if (!variantId || Number.isNaN(variantId)) {
      return jsonResponse({ error: 'Variante de producto no válida' }, 400);
    }

    if (!total) {
      return jsonResponse({ error: 'Total del pedido requerido' }, 400);
    }

    const unitPrice = normalizeLineItemPrice(total, quantity);
    const sizeLabel = body.size ? `Talla ${body.size}` : '';
    const packageLabel = body.packageLabel || '';
    const lineTitle = ['Lokal Big | Blanco', sizeLabel, packageLabel]
      .filter(Boolean)
      .join(' — ');

    const result = await createShopifyOrder({
      customer,
      total,
      lineItems: [
        {
          variantId,
          quantity,
          price: unitPrice,
          title: lineTitle,
        },
      ],
      note: [
        'Pago en casa (contra entrega)',
        packageLabel && `Paquete: ${packageLabel}`,
        sizeLabel && sizeLabel,
        `Total landing: ${total}`,
      ]
        .filter(Boolean)
        .join(' | '),
    });

    return jsonResponse({
      success: true,
      orderId: result.orderId,
      orderName: result.orderName,
      orderNumber: result.orderNumber,
    });
  } catch (error) {
    console.error('Error creando pedido en Shopify:', error);
    const message =
      error instanceof Error ? error.message : 'Error interno del servidor';
    return jsonResponse({ error: message }, 500);
  }
};
