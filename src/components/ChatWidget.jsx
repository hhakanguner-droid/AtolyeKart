import { useEffect, useRef, useState } from 'react';
import '../chat.css';

const WELCOME = 'Merhaba! Ürünler, stok, kargo ve iade hakkında soru sorabilirsiniz.';

// Oturum numarası: bot önceki mesajları bununla hatırlar.
function getSessionId() {
  try {
    let id = sessionStorage.getItem('ak-chat-session');
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem('ak-chat-session', id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'bot', text: WELCOME }]);
  const sessionRef = useRef(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [msgs, busy]);

  async function send(e) {
    e.preventDefault();
    const message = text.trim();
    if (!message || busy) return;
    sessionRef.current ??= getSessionId();
    setMsgs((m) => [...m, { role: 'user', text: message }]);
    setText('');
    setBusy(true);
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId: sessionRef.current }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.reply) throw new Error(data.error || 'Yanıt alınamadı.');
      setMsgs((m) => [...m, { role: 'bot', text: data.reply, sources: data.sources }]);
    } catch (err) {
      setMsgs((m) => [...m, { role: 'bot', error: true, text: `${err.message} Lütfen biraz sonra tekrar deneyin.` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="chat" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      {open && (
        <section className="chat-panel" aria-label="Atölye asistanı">
          <header className="chat-head">
            <strong>Atölye Asistanı</strong>
            <button type="button" className="chat-x" onClick={() => setOpen(false)} aria-label="Sohbeti kapat">×</button>
          </header>
          <div className="chat-log" role="log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}${m.error ? ' err' : ''}`}>
                <p>{m.text}</p>
                {m.sources?.length > 0 && <small>Kaynak: {m.sources.join(', ')}</small>}
              </div>
            ))}
            {busy && <div className="chat-msg bot"><p>Yazıyor…</p></div>}
            <div ref={endRef} />
          </div>
          <form className="chat-form" onSubmit={send}>
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Sorunuzu yazın"
              aria-label="Mesajınız"
              maxLength={500}
            />
            <button type="submit" className="btn btn-primary" disabled={busy || !text.trim()}>Gönder</button>
          </form>
        </section>
      )}
      <button type="button" className="chat-fab btn btn-primary" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Kapat' : 'Asistana Sor'}
      </button>
    </div>
  );
}
