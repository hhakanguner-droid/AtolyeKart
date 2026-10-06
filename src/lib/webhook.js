const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
const SOURCE = 'atolyekart-web';

export async function sendWebhook(payload) {
  if (!WEBHOOK_URL) {
    throw new Error('VITE_WEBHOOK_URL tanımlı değil (.env dosyasına bak).');
  }
  // text/plain + no-cors: tarayıcı OPTIONS ön kontrolü (preflight) yapmadan
  // doğrudan POST atar. Yanıt okunamaz; ağ hatası olursa fetch yine hata fırlatır.
  // Hafta 2'de backend/API route'a taşınınca bu kısıt kalkacak.
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify({ ...payload, source: SOURCE }),
  });
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
