// "Stokta var mı?" sorusunun tek cevap yeri. Ürün verisinde yalnızca `stock` (depodaki adet) tutulur.
export const LOW_STOCK_THRESHOLD = 2; // bu adet ve altı "Son N adet" rozeti gösterir
export const MAX_PER_ORDER = 20; // tek siparişte en fazla adet

export const isInStock = (product) => product.stock > 0;
export const isLowStock = (product) => product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD;
// Sipariş adedi kutusunun üst sınırı: stoktan fazla istenemez.
export const maxOrderQuantity = (product) => Math.min(product.stock, MAX_PER_ORDER);
