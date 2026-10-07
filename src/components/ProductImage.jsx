const looks = {
  Seramik: { emoji: '🏺', from: '#e8c9b0', to: '#c98f6b' },
  Takı: { emoji: '💎', from: '#d9c8ec', to: '#9a7cc4' },
  'Doğal Taş': { emoji: '🪨', from: '#d4d4d4', to: '#8d8d8d' },
};

// Fotoğraf varsa onu, yoksa kategori renginde emoji kutusu gösterir.
export default function ProductImage({ category, name, src }) {
  if (src) {
    return <img className="product-photo" src={src} alt={name} loading="lazy" width="1200" height="896" />;
  }
  const look = looks[category] ?? looks['Doğal Taş'];
  return (
    <div
      className="product-fallback"
      role="img"
      aria-label={name}
      style={{ background: `linear-gradient(135deg, ${look.from}, ${look.to})` }}
    >
      <span>{look.emoji}</span>
    </div>
  );
}
