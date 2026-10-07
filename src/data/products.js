// stock: depodaki adet (0 = tükendi). Stok sayıları örnektir, gerçek takip için backend gerekir.
// badge: 'new' (elle işaretlenir). "Son N adet" ve "Tükendi" rozetleri stoktan hesaplanır, bkz. lib/stock.js.
export const products = [
  { id: 'p1', name: 'El Yapımı Kahve Fincanı', category: 'Seramik', price: 450, description: 'Mat sırlı, toprak tonlarında, 200 ml. Her biri tek tek şekillendirilir.', stock: 6, badge: 'new', image: '/images/p1.jpg', specs: [['Malzeme', 'Taş seramik, mat sır'], ['Ölçü', 'Ø 9 cm · 200 ml']] },
  { id: 'p2', name: 'İki Kişilik Çay Seti', category: 'Seramik', price: 890, description: 'Demlik ve iki fincandan oluşan, el boyaması set.', stock: 4, image: '/images/p2.jpg', specs: [['Malzeme', 'Taş seramik, el boyaması'], ['Ölçü', 'Demlik 600 ml · 2 fincan']] },
  { id: 'p3', name: 'Dekoratif Vazo', category: 'Seramik', price: 540, description: 'Kabartma desenli, kuru çiçekler için ince boyunlu vazo.', stock: 0, image: '/images/p3.jpg', specs: [['Malzeme', 'Kabartma desenli seramik'], ['Ölçü', 'Yükseklik 24 cm']] },
  { id: 'p4', name: 'Doğal Taş Bileklik', category: 'Takı', price: 320, description: 'Ametist ve kuvars boncuklardan, ayarlanabilir ipli bileklik.', stock: 2, image: '/images/p4.jpg', specs: [['Malzeme', 'Ametist, kuvars, pamuklu ip'], ['Ölçü', 'Ayarlanabilir 16-21 cm']] },
  { id: 'p5', name: 'Oniks Kolye', category: 'Takı', price: 410, description: 'Elde parlatılmış damla oniks, gümüş renkli zincirli.', stock: 5, image: '/images/p5.jpg', specs: [['Malzeme', 'Oniks, gümüş kaplama zincir'], ['Ölçü', 'Zincir 45 cm']] },
  { id: 'p6', name: 'Ametist Küpe', category: 'Takı', price: 260, description: 'Ham ametist parçalarından, hafif ve sallanan küpe.', stock: 0, image: '/images/p6.jpg', specs: [['Malzeme', 'Ham ametist, altın kaplama'], ['Ölçü', 'Uzunluk 5 cm']] },
  { id: 'p7', name: 'Yontma Mermer Kalemlik', category: 'Doğal Taş', price: 680, description: 'Elde yontulmuş mermer, masaüstü için küçük bir süs eşyası.', stock: 3, image: '/images/p7.jpg', specs: [['Malzeme', 'Beyaz mermer'], ['Ölçü', 'Yükseklik 10 cm · Ø 8 cm']] },
  { id: 'p8', name: 'Oniks Tütsülük', category: 'Doğal Taş', price: 380, description: 'Koni ve çubuk tütsüler için oyma oniks tütsülük.', stock: 8, image: '/images/p8.jpg', specs: [['Malzeme', 'Siyah oniks'], ['Ölçü', '12 × 7 cm']] },
  { id: 'p9', name: 'Ametist Kristal Küme', category: 'Doğal Taş', price: 750, description: 'Doğal ametist kümesi, raf ve komodin için.', stock: 3, image: '/images/p9.jpg', specs: [['Malzeme', 'Doğal ametist'], ['Ölçü', 'Yükseklik 14 cm']] },
];

export const ALL_CATEGORIES = 'Hepsi';
export const categories = [ALL_CATEGORIES, ...new Set(products.map((p) => p.category))];
