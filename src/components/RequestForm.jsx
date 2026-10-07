import { useState } from 'react';
import { sendWebhook, orderPayload, stockPayload } from '../lib/webhook.js';
import { isInStock, maxOrderQuantity } from '../lib/stock.js';

// Stokta olan ürün için sipariş, tükenen ürün için stok bildirimi formu.
const MODES = {
  order: {
    title: 'Sipariş Ver',
    fields: ['phone', 'quantity'],
    buildPayload: orderPayload,
    submitLabel: 'Siparişi Gönder',
    successText: 'Siparişin alındı, seninle iletişime geçeceğiz. Teşekkürler!',
  },
  stock: {
    title: 'Stok Bildirimi İste',
    fields: [],
    buildPayload: stockPayload,
    submitLabel: 'Beni Haberdar Et',
    successText: 'Ürün tekrar stoğa girince e-postayla haber vereceğiz.',
  },
};

export default function RequestForm({ product, onClose }) {
  const mode = MODES[isInStock(product) ? 'order' : 'stock'];
  const [form, setForm] = useState({ name: '', phone: '', email: '', quantity: 1 });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendWebhook(mode.buildPayload(product, form));
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="form-box">
        <h3>{mode.title}</h3>
        <p className="ok">{mode.successText}</p>
        <button type="button" className="btn btn-ghost btn-block" onClick={onClose}>Tamam</button>
      </div>
    );
  }

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <h3>{mode.title}</h3>
      <p className="sub">{product.name}</p>
      <label>Ad Soyad
        <input required value={form.name} onChange={update('name')} autoComplete="name" />
      </label>
      {mode.fields.includes('phone') && (
        <label>Telefon
          <input required type="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" />
        </label>
      )}
      <label>E-posta
        <input required type="email" value={form.email} onChange={update('email')} autoComplete="email" />
      </label>
      {mode.fields.includes('quantity') && (
        <label>Adet
          <input required type="number" min="1" max={maxOrderQuantity(product)} value={form.quantity} onChange={update('quantity')} />
        </label>
      )}
      {status === 'error' && <p className="error">Gönderilemedi: {error}</p>}
      <button className="btn btn-primary btn-block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Gönderiliyor…' : mode.submitLabel}
      </button>
    </form>
  );
}
