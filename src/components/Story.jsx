import { whatsappUrl, GENERAL_MESSAGE } from '../lib/whatsapp.js';

export default function Story() {
  return (
    <section className="story" id="atolye">
      <h2>Atölyeden, doğrudan size.</h2>
      <div>
        <p>
          Fincanlar bizim fırınımızda pişer, taşlar elde yontulur, boncuklar tek tek dizilir. Aynı modelin iki parçası bile
          birbirinin aynısı olmaz.
        </p>
        <p>Bir ürünle ilgili sorunuz mu var? WhatsApp'tan yazın, fotoğraf ve ölçü gönderelim.</p>
        <a className="btn btn-ghost" href={whatsappUrl(GENERAL_MESSAGE)} target="_blank" rel="noopener noreferrer">
          WhatsApp'tan Yaz
        </a>
      </div>
    </section>
  );
}
