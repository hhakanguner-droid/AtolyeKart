import ProductList from './components/ProductList.jsx';
import { products } from './data/products.js';

export default function App() {
  return (
    <>
      <header className="header">
        <h1>Güner Doğaltaş</h1>
        <p>El yapımı seramik, takı ve doğal taş süs eşyaları</p>
      </header>
      <ProductList products={products} />
    </>
  );
}
