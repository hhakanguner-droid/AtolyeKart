import { whatsappUrl, GENERAL_MESSAGE } from '../lib/whatsapp.js';

// Yalnızca dar ekranda (CSS ile) görünen sabit WhatsApp çubuğu.
export default function MobileBar() {
  return (
    <div className="mbar">
      <a className="btn btn-primary btn-block" href={whatsappUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
        WhatsApp'tan Sor
      </a>
    </div>
  );
}
