---
name: atolyekart-bilesen-standartlari
description: AtolyeKart'ta bir React bileşeni, sayfa bölümü, pencere ya da stil eklerken veya değiştirirken kullan. Veri/görünüm ayrımı, renk değişkenleri, erişilebilirlik, metin tonu ve bitirmeden önce yapılacak kontrolleri içerir.
---

# AtolyeKart bileşen standartları

Bu kurallar projede yaşanan gerçek hatalardan çıktı. Her kuralın yanında nedeni var.

## 1. Veri ve görünüm ayrı
- Ürün bilgisi yalnızca `src/data/products.js` içinde durur. Bileşen veriyi prop olarak alır, içine ürün bilgisi yazmaz.
- "Stokta var mı / az mı" gibi kararlar `src/lib/stock.js` yardımcılarıyla verilir (`isInStock`, `isLowStock`, `maxOrderQuantity`). Bileşende `product.stock` doğrudan karşılaştırılmaz.
- Aynı mantık iki bileşende geçiyorsa `src/lib/` altına yardımcı olarak taşı.
- Bir ürün alanını eklerken ya da silerken önce `CLAUDE.md`'deki alan listesini güncelle. Silinen alan için `grep` yap ve hiçbir yerde okunmadığını doğrula.
  **Neden:** `inStock` kaldırılırken unutulan tek bir okuma hata vermez, ürünü sessizce "tükendi" gösterir.

## 2. Renk ve yazı tipi değişkenlerden gelir
- Renk değerini bileşene ya da CSS kuralına yazma. `src/styles.css` başındaki değişkenleri kullan: `--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`, `--good`, `--warn`, `--danger`.
- Yeni renk gerekirse hem açık hem karanlık değeri tanımla. Metin için kontrast en az 4,5:1 olmalı.
  **Neden:** sabit yazılan hata kırmızısı karanlık modda 3:1'de kaldı ve okunmuyordu.
- Başlıklar `var(--display)` (Cormorant Garamond), gövde `var(--body)` (Manrope).

## 3. Erişilebilirlik
- **Pencere:** Yeni pencere yazma, `Modal` bileşenini kullan ve `label` ver. Odak tuzağı, Escape, arka planı `inert` yapma ve odağı geri verme orada hazır.
- **Tıklanan şey `<button>` olur**, tıklanabilir `<div>` olmaz. Link ise `<a href>`.
- Resimde `alt`, süs olan ikonda `aria-hidden="true"`.
- Sayfanın ana içeriği `App.jsx`'teki `<main>` içinde kalır. Landmark'ları (header, main, footer) bozma.
- Her form kutusu bir `<label>` içinde olur. Hata mesajı `.error` sınıfıyla gösterilir.
- Animasyon ekliyorsan `prefers-reduced-motion: reduce` altında kapat. Kapatma kuralının seçicisi taban kuralla **aynı özgüllükte** olsun, yoksa kaybeder.
  **Neden:** bunların hepsi Codex ve Copilot incelemelerinde bulgu olarak çıktı.

## 4. Metin ve içerik
- Türkçe, sıcak, kısa. Buton metni eylem fiilidir: "Sipariş Ver", "Beni Haberdar Et".
- Fiyat her zaman `formatPrice` ile yazılır (`450 ₺`).
- Ürün fotoğrafı `public/images/pN.jpg`. Bileşen `ProductImage` kullanır, fotoğraf yoksa kategori renginde emoji kutusu çıkar.
- Rozet önceliği: Tükendi, sonra Son N adet, sonra Yeni. "Son N adet" yazısı stoktan hesaplanır, sabit yazılmaz.

## 5. Bitirmeden önce
1. `npm run build` temiz geçmeli.
2. Tarayıcıda (Playwright) masaüstü 1280 ve mobil 390 genişlikte bak: yatay taşma yok, konsolda uygulama hatası yok.
3. Görünümü değiştirmemesi gereken bir iş (taşıma, sadeleştirme) için eski ve yeni sürümün tam sayfa ekran görüntüsünü **aynı portta** karşılaştır. Önce sunucunun gerçekten yeni sürümü sunduğunu doğrula: sayfadaki `assets/index-*.js` adı `dist/assets` içindekiyle aynı olmalı.
   **Neden:** eski sunucu kapanmamış, testler eski koda karşı koşmuş ve "geçti" demiştik.
4. Test sunucusunu `pkill -f` ile kapatma (kendi kabuğunu da öldürür), PID dosyasıyla kapat.
5. Değişikliği doğrudan `main`'e değil dal + PR ile gönder. Codex ve Copilot incelemeleri bitmeden merge etme. Kullanıcı merge izni vermediyse PR'ı hazır bırakıp sor.

## Dokunma
Webhook alanları ve gönderimi başka bir skill'in konusu: `atolyekart-webhook-formati`.
