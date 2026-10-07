export default function Header() {
  return (
    <header className="top">
      <span className="brand">Güner Doğaltaş</span>
      <nav className="top-actions" aria-label="Sayfa bölümleri">
        <a className="toplink" href="#urunler">Ürünler</a>
        <a className="toplink" href="#atolye">Atölyemiz</a>
      </nav>
    </header>
  );
}
