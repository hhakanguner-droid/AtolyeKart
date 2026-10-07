import ProductCard from './ProductCard.jsx';

export default function ProductList({ products, onOpenDetail, onRequest }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpenDetail={onOpenDetail} onRequest={onRequest} />
      ))}
    </div>
  );
}
