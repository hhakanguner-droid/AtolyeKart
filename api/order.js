// Vercel sunucu fonksiyonu (serverless function): siteden gelen siparişi n8n'e iletir.
// n8n adresi tarayıcıya sızmasın diye ORDER_WEBHOOK_URL ortam değişkeninde tutulur.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST' });
  }
  const url = process.env.ORDER_WEBHOOK_URL;
  if (!url) {
    return res.status(500).json({ error: 'ORDER_WEBHOOK_URL tanımlı değil' });
  }
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const clean = (v, n = 200) => String(v ?? '').slice(0, n);
  const payload = {
    event: 'order_created',
    name: clean(b.name, 100),
    productId: clean(b.productId, 50),
    productName: clean(b.productName, 150),
    phone: clean(b.phone, 30),
    email: clean(b.email, 150),
    quantity: Math.max(1, Math.min(999, Number(b.quantity) || 1)),
    source: 'atolyekart-web',
    time: new Date().toISOString(),
  };
  if (!payload.name || !payload.productName) {
    return res.status(400).json({ error: 'Ad ve ürün zorunlu' });
  }
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
  } catch {
    return res.status(502).json({ ok: false });
  }
}
