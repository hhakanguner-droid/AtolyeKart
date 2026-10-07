import { useEffect, useRef } from 'react';

// Ortak pencere: Escape ile ya da dışına tıklayınca kapanır, kapanınca odak geri döner.
export default function Modal({ onClose, narrow = false, children }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal${narrow ? ' narrow' : ''}`} role="dialog" aria-modal="true">
        <button type="button" className="modal-x" ref={closeRef} onClick={onClose} aria-label="Kapat">×</button>
        {children}
      </div>
    </div>
  );
}
