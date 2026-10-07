import { useCallback, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TrustStrip from './components/TrustStrip.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import ProductList from './components/ProductList.jsx';
import Story from './components/Story.jsx';
import CatalogQR from './components/CatalogQR.jsx';
import MobileBar from './components/MobileBar.jsx';
import Modal from './components/Modal.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import RequestForm from './components/RequestForm.jsx';
import { products, categories, ALL_CATEGORIES } from './data/products.js';
import { isInStock } from './lib/stock.js';

// Ekran okuyucuya söylenen pencere adı
const modalLabel = ({ type, product }) =>
  type === 'detail'
    ? `${product.name} ürün detayı`
    : `${isInStock(product) ?'Sipariş Ver' : 'Stok Bildirimi İste'}: ${product.name}`;

export default function App() {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [modal, setModal] = useState(null); // { type: 'detail' | 'request', product }

  const visible = category === ALL_CATEGORIES ? products : products.filter((p) => p.category === category);
  const close = useCallback(() => setModal(null), []);
  const openDetail = (product) => setModal({ type: 'detail', product });
  const openRequest = (product) => setModal({ type: 'request', product });

  return (
    <>
      <div className="bgfx" aria-hidden="true" />
      <div className="wrap">
        <Header />
        <main>
          <Hero />
          <TrustStrip />

          <section id="urunler">
            <div className="shop-head">
              <h2>Vitrin</h2>
              <span className="count" aria-live="polite">{visible.length} ürün</span>
            </div>
            <CategoryFilter categories={categories} active={category} onChange={setCategory} />
            <ProductList products={visible} onOpenDetail={openDetail} onRequest={openRequest} />
          </section>

          <Story />
        </main>
        <CatalogQR />
        <p className="foot-note">Güner Doğaltaş · Eğitim projesi. Ürün bilgileri örnektir.</p>
      </div>

      <MobileBar />

      {modal && (
        <Modal key={modal.type} onClose={close} label={modalLabel(modal)} narrow={modal.type === 'request'}>
          {modal.type === 'detail' ? (
            <ProductDetail product={modal.product} onRequest={openRequest} />
          ) : (
            <RequestForm product={modal.product} onClose={close} />
          )}
        </Modal>
      )}
    </>
  );
}
