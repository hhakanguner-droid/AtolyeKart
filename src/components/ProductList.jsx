import ProductCard from './ProductCard.jsx';

export default function ProductList({ products }) {
  return (
    <main className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}
