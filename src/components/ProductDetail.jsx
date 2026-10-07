import ProductImage from './ProductImage.jsx';
import { formatPrice } from '../lib/format.js';
import { whatsappUrl, productMessage } from '../lib/whatsapp.js';

export default function ProductDetail({ product, onRequest }) {
  const { name, category, price, description, inStock, image, specs } = product;
  const rows = [...specs, ['Hazırlık', inStock ? 'Hazır, 1-2 günde kargoda' : 'Şu an stokta yok']];

  return (
    <div className="detail">
      <div className="detail-photo">
        <ProductImage category={category} name={name} src={image} />
      </div>
      <div className="detail-body">
        <span className="cat">{category}</span>
        <h3>{name}</h3>
        <span className="price">{formatPrice(price)}</span>
        <p className="detail-desc">{description}</p>
        <ul className="specs">
          {rows.map(([label, value]) => (
            <li key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </li>
          ))}
        </ul>
        <div className="detail-actions">
          <button type="button" className="btn btn-primary" onClick={() => onRequest(product)}>
            {inStock ? 'Sipariş Ver' : 'Stok Bildirimi İste'}
          </button>
          <a className="btn btn-ghost" href={whatsappUrl(productMessage(name))} target="_blank" rel="noopener noreferrer">
            WhatsApp'tan Sor
          </a>
        </div>
      </div>
    </div>
  );
}
