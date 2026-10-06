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
- Hafta 1.1 tek dosya HTML idi (git geçmişinde); 1.2 ile React'e geçildi
- Vite + React: `src/components/` altında `ProductCard`, `ProductList`, `ProductImage`
- Ürün verisi `src/data/products.js` içinde `products` dizisi (id, name, category, price, description, inStock)

## Webhook veri sözleşmesi (Hafta 1)
- Sipariş: `event, name, productId, productName, phone, email, quantity, source`
- Stok bildirimi: `event, name, productId, productName, email, source`
- Test: doğrudan webhook.site. Secret koruma ve backend/API route Hafta 2'de.

## Kurallar
- Kart tasarımı değişirken ürün verisi bozulmaz.
- Büyük mimari değişikliklerden önce `/plan` kullan.
- Commit yalnızca istenince atılır.
