import { useState } from 'react';
import { sendWebhook } from '../lib/webhook.js';

// Sipariş ve stok bildirimi formlarının ortak iskeleti.
// fields: gösterilecek alanlar, buildPayload: webhook gövdesini üretir.
export default function RequestForm({ title, product, fields, buildPayload, submitLabel, successText, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', quantity: 1 });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendWebhook(buildPayload(product, form));
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Kapat">×</button>
        <h3>{title}</h3>
        <p className="modal-product">{product.name}</p>

        {status === 'done' ? (
          <>
            <p className="success">{successText}</p>
            <button className="btn" onClick={onClose}>Tamam</button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Ad Soyad
              <input required value={form.name} onChange={update('name')} />
            </label>
            {fields.includes('phone') && (
              <label>Telefon
                <input required type="tel" value={form.phone} onChange={update('phone')} />
              </label>
            )}
            <label>E-posta
              <input required type="email" value={form.email} onChange={update('email')} />
            </label>
            {fields.includes('quantity') && (
              <label>Adet
                <input required type="number" min="1" max="20" value={form.quantity} onChange={update('quantity')} />
              </label>
            )}
            {status === 'error' && <p className="error">Gönderilemedi: {error}</p>}
            <button className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Gönderiliyor…' : submitLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
