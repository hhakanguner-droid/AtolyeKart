// Sohbet asistanı aracısı (proxy): tarayıcı -> /api/chat -> n8n Webhook.
// Neden: n8n adresi tarayıcıya açılmaz ve CORS sorunu çıkmaz.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Sadece POST' });
  const url = process.env.ASISTAN_WEBHOOK_URL;
  if (!url) return res.status(500).json({ error: 'ASISTAN_WEBHOOK_URL tanımlı değil' });

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const clean = (v, n) => String(v ?? '').trim().slice(0, n);
  const message = clean(b.message, 500);
  const sessionId = clean(b.sessionId, 64).replace(/[^a-zA-Z0-9-]/g, '');
  if (!message || !sessionId) return res.status(400).json({ error: 'Mesaj ve oturum zorunlu' });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25000);
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message, source: 'atolyekart-web', time: new Date().toISOString() }),
      signal: ctrl.signal,
    });
    if (!r.ok) return res.status(502).json({ error: 'Asistan şu an yanıt veremiyor.' });
    const data = await r.json().catch(() => ({}));
    const reply = data.reply ?? data.cevap ?? data.output ?? data.text ?? '';
    const sources = Array.isArray(data.sources ?? data.kaynaklar) ? (data.sources ?? data.kaynaklar) : [];
    if (!reply) return res.status(502).json({ error: 'Asistan boş yanıt verdi.' });
    return res.status(200).json({ reply: clean(reply, 2000), sources: sources.slice(0, 5).map((s) => clean(s, 100)) });
  } catch {
    return res.status(504).json({ error: 'Asistan zamanında yanıt vermedi.' });
  } finally {
    clearTimeout(timer);
  }
}
