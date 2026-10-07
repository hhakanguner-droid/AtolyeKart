import ProductImage from './ProductImage.jsx';
import { formatPrice } from '../lib/format.js';

const BADGES = {
  new: { text: 'Yeni', className: 'badge new' },
  low: { text: 'Son 2 adet', className: 'badge low' },
};
const SOLD_OUT = { text: 'Tükendi', className: 'badge out' };

export default function ProductCard({ product, onOpenDetail, onRequest }) {
  const { name, category, price, description, inStock, badge, image } = product;
  const badgeInfo = inStock ? BADGES[badge] : SOLD_OUT;

  return (
    <article className={`card${inStock ? '' : ' soldout'}`}>
      <button type="button" className="card-photo" onClick={() => onOpenDetail(product)} aria-label={`${name} detayını aç`}>
        <ProductImage category={category} name={name} src={image} />
        {badgeInfo && <span className={badgeInfo.className}>{badgeInfo.text}</span>}
      </button>
      <div className="card-body">
        <span className="cat">{category}</span>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="card-foot">
          <span className={`price${inStock ? '' : ' dim'}`}>{formatPrice(price)}</span>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => onRequest(product)}>
            {inStock ? 'Sipariş Ver' : 'Stok Bildirimi İste'}
          </button>
        </div>
      </div>
    </article>
  );
}
