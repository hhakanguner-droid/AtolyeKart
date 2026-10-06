const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
const SOURCE = 'atolyekart-web';

export async function sendWebhook(payload) {
  if (!WEBHOOK_URL) {
    throw new Error('VITE_WEBHOOK_URL tanımlı değil (.env dosyasına bak).');
  }
  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, source: SOURCE }),
  });
  if (!res.ok) {
    throw new Error(`Webhook ${res.status} döndürdü.`);
  }
}

export const orderPayload = (product, form) => ({
  event: 'order_created',
  name: form.name,
  productId: product.id,
  productName: product.name,
  phone: form.phone,
  email: form.email,
  quantity: Number(form.quantity),
});

export const stockPayload = (product, form) => ({
  event: 'stock_notification_requested',
  name: form.name,
  productId: product.id,
  productName: product.name,
  email: form.email,
});
