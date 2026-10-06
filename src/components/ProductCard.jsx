import { useState } from 'react';
import ProductImage from './ProductImage.jsx';
import RequestForm from './RequestForm.jsx';
import { orderPayload, stockPayload } from '../lib/webhook.js';

export default function ProductCard({ product }) {
  const { name, category, price, description, inStock, image } = product;
  const [open, setOpen] = useState(false);

  return (
    <article className={`card${inStock ? '' : ' card--soldout'}`}>
      <ProductImage category={category} name={name} src={image} />
      <div className="card-body">
        <span className="tag">{category}</span>
        <h2>{name}</h2>
        <p>{description}</p>
        <div className="card-footer">
          <span className="price">{price} ₺</span>
          {!inStock && <span className="soldout">Tükendi</span>}
        </div>
        <button className="btn" onClick={() => setOpen(true)}>
          {inStock ? 'Sipariş Ver' : 'Stok Bildirimi İste'}
        </button>
      </div>

      {open && inStock && (
        <RequestForm
          title="Sipariş Ver"
          product={product}
          fields={['phone', 'quantity']}
          buildPayload={orderPayload}
          submitLabel="Siparişi Gönder"
          successText="Siparişin alındı, seninle iletişime geçeceğiz. Teşekkürler!"
          onClose={() => setOpen(false)}
        />
      )}
      {open && !inStock && (
        <RequestForm
          title="Stok Bildirimi İste"
          product={product}
          fields={[]}
          buildPayload={stockPayload}
          submitLabel="Beni Haberdar Et"
          successText="Ürün tekrar stoğa girince e-postayla haber vereceğiz."
          onClose={() => setOpen(false)}
        />
      )}
    </article>
  );
}
