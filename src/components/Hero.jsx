import { whatsappUrl, GENERAL_MESSAGE } from '../lib/whatsapp.js';

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Seramik · Takı · Doğal taş</p>
        <h1>Her parça elde şekillenir.</h1>
        <p className="lead">
          Atölyemizde toprak, ametist ve mermer tek tek işlenir. Evinize ya da sevdiğinize özel, benzeri olmayan parçalar.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#urunler">Ürünleri Keşfet</a>
          <a className="btn btn-ghost" href={whatsappUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
            WhatsApp'tan Sor
          </a>
        </div>
      </div>
      <figure className="hero-photo">
        <img src="/images/p2.jpg" alt="El boyaması seramik çay seti" width="1200" height="896" />
      </figure>
    </section>
  );
}
