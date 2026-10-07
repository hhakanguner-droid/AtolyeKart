import ProductImage from './ProductImage.jsx';
import { formatPrice } from '../lib/format.js';
import { isInStock, isLowStock } from '../lib/stock.js';

const NEW_BADGE = { text: 'Yeni', className: 'badge new' };
const SOLD_OUT = { text: 'Tükendi', className: 'badge out' };
const lowBadge = (stock) => ({ text: `Son ${stock} adet`, className: 'badge low' });

// Rozet önceliği: tükendi > az kaldı > yeni
function badgeFor(product) {
  if (!isInStock(product)) return SOLD_OUT;
  if (isLowStock(product)) return lowBadge(product.stock);
  return product.badge === 'new' ? NEW_BADGE : null;
}

export default function ProductCard({ product, onOpenDetail, onRequest }) {
  const { name, category, price, description, image } = product;
  const inStock = isInStock(product);
  const badgeInfo = badgeFor(product);

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
