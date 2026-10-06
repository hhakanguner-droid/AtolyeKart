import ProductImage from './ProductImage.jsx';

export default function ProductCard({ product }) {
  const { name, category, price, description, inStock } = product;
  return (
    <article className={`card${inStock ? '' : ' card--soldout'}`}>
      <ProductImage category={category} name={name} />
      <div className="card-body">
        <span className="tag">{category}</span>
        <h2>{name}</h2>
        <p>{description}</p>
        <div className="card-footer">
          <span className="price">{price} ₺</span>
          {!inStock && <span className="soldout">Tükendi</span>}
        </div>
      </div>
    </article>
  );
}
