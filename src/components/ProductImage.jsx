const looks = {
  Seramik: { emoji: '🏺', from: '#e8c9b0', to: '#c98f6b' },
  Takı: { emoji: '💎', from: '#d9c8ec', to: '#9a7cc4' },
  'Doğal Taş': { emoji: '🪨', from: '#d4d4d4', to: '#8d8d8d' },
};

export default function ProductImage({ category, name }) {
  const look = looks[category] ?? looks['Doğal Taş'];
  return (
    <div
      className="product-image"
      role="img"
      aria-label={name}
      style={{ background: `linear-gradient(135deg, ${look.from}, ${look.to})` }}
    >
      <span>{look.emoji}</span>
    </div>
  );
}
