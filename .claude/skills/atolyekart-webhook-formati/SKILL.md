---
name: atolyekart-webhook-formati
description: AtolyeKart'ta sipariş ya da stok bildirimi webhook'u, `src/lib/webhook.js`, `RequestForm` ya da bir formun gönderdiği veriyle ilgili iş yaparken kullan. Veri sözleşmesini (alan adları, event adları), gönderim yöntemini, gizlilik kurallarını ve test yolunu içerir.
---

# AtolyeKart webhook formatı

Veri sözleşmesi (Hafta 1) `CLAUDE.md`'de de yazılı. İkisi birlikte güncellenir.

## Sözleşme

**Sipariş**: `event: "order_created"`
```json
{
  "event": "order_created",
  "name": "Ad Soyad",
  "productId": "p2",
  "productName": "İki Kişilik Çay Seti",
  "phone": "+90...",
  "email": "ornek@posta.com",
  "quantity": 1,
  "source": "atolyekart-web"
}
```

**Stok bildirimi**: `event: "stock_notification_requested"`
```json
{
  "event": "stock_notification_requested",
  "name": "Ad Soyad",
  "productId": "p3",
  "productName": "Dekoratif Vazo",
  "email": "ornek@posta.com",
  "source": "atolyekart-web"
}
```

- Alan listesi tam ve sabittir. **Alan eklemek, silmek ya da yeniden adlandırmak sözleşme değişikliğidir**: önce kullanıcıya sor, sonra `CLAUDE.md`'yi ve bu skill'i birlikte güncelle.
- `quantity` **sipariş adedi** ve sayıdır (`Number`). Ürün verisindeki `stock` ise **depodaki adet**tir. `stock` webhook'a **girmez**, ikisi karıştırılmaz.
- `source` değerini `sendWebhook` ekler (`atolyekart-web`), payload üreticileri eklemez.

## Kodda nerede
- Gönderim: `src/lib/webhook.js` içindeki `sendWebhook(payload)`.
- Payload üreticileri aynı dosyada: `orderPayload(product, form)`, `stockPayload(product, form)`.
- Formlar `RequestForm` bileşeninde. Stokta olan ürün sipariş formunu, tükenen ürün stok bildirimi formunu açar (`isInStock`).
- Bileşenler doğrudan `fetch` yapmaz, her zaman `sendWebhook` kullanır.

## Gönderim yöntemi ve sınırı
- İstek `mode: 'no-cors'` ve `Content-Type: text/plain` ile gider. Böyle olunca tarayıcı ön kontrol (preflight, `OPTIONS`) yapmaz.
  **Neden:** webhook.site JSON isteğinin ön kontrolüne izin vermedi, istek hiç gitmedi.
- Bedeli: yanıt okunamaz. Form "alındı" der ama webhook'un gerçekten kabul ettiğini bilemez, yalnızca ağ hatasında hata verir.
- Hafta 2'de backend/API route'a taşınınca bu kısıt kalkar, secret korunur. O zaman bu bölüm ve `webhook.js` güncellenir.

## Gizlilik
- Webhook adresi yalnızca `VITE_WEBHOOK_URL` ortam değişkeninden gelir.
- `.env` repoya girmez (`.gitignore`'da). `.env.example` **yalnızca yer tutucu** içerir.
- Gerçek webhook adresini kodda, commit'te, PR açıklamasında ya da yorumda **yazma**.

## Test
- Testte gerçek istek atma. Playwright'ta `page.route(/webhook\.site/, ...)` ile isteği yakala, gövdeyi `JSON.parse` et ve alan listesini sözleşmeyle karşılaştır:
  - sipariş: `email,event,name,phone,productId,productName,quantity,source`
  - stok bildirimi: `email,event,name,productId,productName,source`
- Gerçek uçtan uca kanıt için kullanıcı canlı sitede iki formu gönderir ve webhook.site'ta iki kaydı kendi görür. Kayıtlar yaklaşık 7 gün saklanır, ekran görüntüsü alınmalı.
