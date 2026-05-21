export interface CheckoutLineItem {
  variantId: number;
  quantity: number;
  price: string;
  title?: string;
}

export interface CheckoutCustomer {
  nombre: string;
  apellidos: string;
  celular: string;
  direccion: string;
  barrio: string;
  departamento: string;
  ciudad: string;
  email?: string;
}

export interface CreateShopifyOrderInput {
  customer: CheckoutCustomer;
  lineItems: CheckoutLineItem[];
  total: string;
  note?: string;
}

export interface CreateShopifyOrderResult {
  orderId: number;
  orderName: string;
  orderNumber: number;
}

function getShopifyConfig() {
  const storeDomain = import.meta.env.SHOPIFY_STORE_DOMAIN;
  const accessToken = import.meta.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  const apiVersion = import.meta.env.SHOPIFY_API_VERSION || '2024-10';

  if (!storeDomain || !accessToken) {
    throw new Error(
      'Faltan variables de entorno SHOPIFY_STORE_DOMAIN y SHOPIFY_ADMIN_ACCESS_TOKEN'
    );
  }

  const domain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return { domain, accessToken, apiVersion };
}

function parsePriceToNumber(price: string): number {
  const digits = price.replace(/[^\d]/g, '');
  return Number(digits) || 0;
}

function formatShopifyPrice(price: string): string {
  const amount = parsePriceToNumber(price);
  return amount.toFixed(2);
}

export async function createShopifyOrder(
  input: CreateShopifyOrderInput
): Promise<CreateShopifyOrderResult> {
  const { domain, accessToken, apiVersion } = getShopifyConfig();
  const { customer, lineItems, note } = input;

  const orderPayload = {
    order: {
      line_items: lineItems.map((item) => ({
        variant_id: item.variantId,
        quantity: item.quantity,
        price: item.price,
        title: item.title,
      })),
      financial_status: 'pending',
      send_receipt: true,
      send_fulfillment_receipt: false,
      inventory_behaviour: 'decrement_ignoring_policy',
      tags: 'landing-astro,pagar-en-casa',
      note:
        note ||
        'Pedido desde landing Astro — Pago en casa (contra entrega).',
      phone: customer.celular,
      email: customer.email || undefined,
      shipping_lines: [
        {
          title: 'Envío gratis',
          price: '0.00',
          code: 'FREE',
        },
      ],
      shipping_address: {
        first_name: customer.nombre.trim(),
        last_name: customer.apellidos.trim(),
        address1: `${customer.direccion.trim()} — Barrio: ${customer.barrio.trim()}`,
        city: customer.ciudad.trim(),
        province: customer.departamento.trim(),
        country: 'Colombia',
        country_code: 'CO',
        phone: customer.celular.trim(),
        zip: '000000',
      },
      transactions: [],
    },
  };

  const response = await fetch(
    `https://${domain}/admin/api/${apiVersion}/orders.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify(orderPayload),
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const shopifyError =
      data?.errors ||
      data?.error ||
      data?.message ||
      `Shopify respondió con estado ${response.status}`;
    throw new Error(
      typeof shopifyError === 'string'
        ? shopifyError
        : JSON.stringify(shopifyError)
    );
  }

  const order = data.order;
  if (!order?.id) {
    throw new Error('Shopify no devolvió un pedido válido');
  }

  return {
    orderId: order.id,
    orderName: order.name,
    orderNumber: order.order_number,
  };
}

export function normalizeLineItemPrice(total: string, quantity: number): string {
  const totalAmount = parsePriceToNumber(total);
  const unitAmount = totalAmount / Math.max(quantity, 1);
  return unitAmount.toFixed(2);
}
