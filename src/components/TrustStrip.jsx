const items = [
  {
    title: 'El yapımı',
    text: 'Her parça tek tek üretilir',
    icon: <path d="M12 21s-7-4.6-9.3-9A5.2 5.2 0 0 1 12 6.5 5.2 5.2 0 0 1 21.3 12C19 16.4 12 21 12 21z" />,
  },
  {
    title: 'Hediye paketi',
    text: 'İsteğe bağlı, not kartıyla',
    icon: (
      <>
        <rect x="3" y="8" width="18" height="13" rx="1" />
        <path d="M12 8v13M3 12h18M12 8c-2-4-6-3-5 0 .6 1.6 3 1 5 0zM12 8c2-4 6-3 5 0-.6 1.6-3 1-5 0z" />
      </>
    ),
  },
  {
    title: 'Hızlı kargo',
    text: 'Hazır ürünler 1-2 günde yolda',
    icon: (
      <>
        <path d="M2 6h12v10H2zM14 10h4l3 3v3h-7" />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17" cy="17.5" r="1.8" />
      </>
    ),
  },
];

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Neden bizi seçmelisiniz">
      {items.map((item) => (
        <div className="trust-item" key={item.title}>
          <div className="trust-ico">
            <svg viewBox="0 0 24 24" aria-hidden="true">{item.icon}</svg>
          </div>
          <div>
            <b>{item.title}</b>
            <span>{item.text}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
