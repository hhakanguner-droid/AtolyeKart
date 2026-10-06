import { QRCodeSVG } from 'qrcode.react';

// Katalog sayfasının kendi adresini QR olarak gösterir; telefonla okutan siteye girer.
export default function CatalogQR() {
  return (
    <footer className="qr">
      <QRCodeSVG value={window.location.origin} size={120} fgColor="#3b2f2a" bgColor="#ffffff" />
      <p>Kataloğu telefonunda aç: kodu okut</p>
    </footer>
  );
}
