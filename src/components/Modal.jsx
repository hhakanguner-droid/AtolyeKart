import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Ortak pencere: Escape ile ya da dışına tıklayınca kapanır, odak pencerede kalır,
// kapanınca odak geri döner. `label` ekran okuyucuya söylenen pencere adıdır.
export default function Modal({ onClose, label, narrow = false, children }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    // Pencere açıkken arkadaki sayfa odaklanamaz ve ekran okuyucuya görünmez.
    const background = [...overlayRef.current.parentElement.children].filter((el) => el !== overlayRef.current);
    background.forEach((el) => el.setAttribute('inert', ''));
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      // Form durum değiştirince (gönderiliyor, tamam) kontroller değişir; liste her Tab'de yeniden alınır.
      const dialog = dialogRef.current;
      const items = [...dialog.querySelectorAll(FOCUSABLE)];
      if (items.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!dialog.contains(active) || active === dialog) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      background.forEach((el) => el.removeAttribute('inert'));
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="overlay" ref={overlayRef} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`modal${narrow ? ' narrow' : ''}`}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        <button type="button" className="modal-x" ref={closeRef} onClick={onClose} aria-label="Kapat">×</button>
        {children}
      </div>
    </div>
  );
}
