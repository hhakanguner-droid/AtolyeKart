// Numara yok: wa.me/?text=... kişi seçtirir, mesaj hazır gelir.
export const whatsappUrl = (text) => `https://wa.me/?text=${encodeURIComponent(text)}`;

export const GENERAL_MESSAGE = 'Merhaba, kataloğunuzdaki ürünler hakkında bilgi almak istiyorum.';
export const productMessage = (name) => `Merhaba, ${name} hakkında bilgi almak istiyorum.`;
