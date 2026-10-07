# AtolyeKart

El yapımı ürün satan küçük bir atölyenin web sitesi (atölye adı: **Güner Doğaltaş**).
Eğitim projesi: BizCard'ın yanında yürüyen ikinci proje. Haftalık ödev serisi, toplam 6 hafta.

## Atölye bağlamı
- **Sektör:** El yapımı ürünler (zanaat / hediyelik)
- **Hedef kitle:** El emeği ürünleri seven, hediye arayan veya evine özel parçalar almak isteyen bireysel müşteriler
- **Ürün kategorileri:**
  - Seramik ürünler (fincan, tabak, vazo)
  - Takılar (doğal taşlı bileklik, kolye)
  - Doğal taş yontma süs eşyaları (mermer, oniks vb.)
- **Dil / ton:** Türkçe, sıcak ve samimi, kısa açıklamalar. Para birimi ₺.

## Teknik durum
- Vite + React. Sayfa bölümleri `src/components/` altında: `Header`, `Hero`, `TrustStrip`, `CategoryFilter`, `ProductList`, `ProductCard`, `ProductImage`, `Story`, `CatalogQR`, `MobileBar`
- Pencereler: `Modal` (ortak kabuk), `ProductDetail` (ürün detayı), `RequestForm` (stokta olana sipariş, tükenene stok bildirimi)
- Ürün verisi `src/data/products.js` içinde `products` dizisi (id, name, category, price, description, inStock, badge, image, specs)
- Ürün fotoğrafları `public/images/pN.jpg`. Fotoğrafı olmayan ürün kategori renginde emoji kutusu gösterir.
- WhatsApp: numarasız `wa.me/?text=...` bağlantısı (`src/lib/whatsapp.js`), kişi seçtirir, mesaj hazır gelir.
- Tasarım: toprak tonları, başlıkta Cormorant Garamond, gövdede Manrope, arka planda sabit taş damarı. Renkler `src/styles.css` başındaki değişkenlerde; karanlık mod destekli.

## Webhook veri sözleşmesi (Hafta 1)
- Sipariş: `event, name, productId, productName, phone, email, quantity, source`
- Stok bildirimi: `event, name, productId, productName, email, source`
- Test: doğrudan webhook.site. Secret koruma ve backend/API route Hafta 2'de.

## Kurallar
- Kart tasarımı değişirken ürün verisi bozulmaz.
- Büyük mimari değişikliklerden önce `/plan` kullan.
- Commit yalnızca istenince atılır.
