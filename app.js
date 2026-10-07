'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
const sampleGallery = document.getElementById('sample-gallery');
for (let i = 1; i <= 5; i++) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = `assets/antigo-${i}.webp`; img.alt = `Exemplo ${i} de atividade sobre o Antigo Testamento`;
  img.loading = 'lazy'; img.width = 800; img.height = 1000;
  figure.append(img); sampleGallery.append(figure);
}
const config = window.OFFER_CONFIG || {};
const dialog = document.getElementById('checkout-pending');
document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelectorAll('.checkout').forEach(button => button.addEventListener('click', () => {
  const raw = button.dataset.plan === 'basic' ? config.checkoutBasic : config.checkoutComplete;
  if (!raw) { dialog.showModal(); return; }
  let checkout;
  try { checkout = new URL(raw); if (checkout.protocol !== 'https:') throw new Error('HTTPS necessário'); }
  catch { dialog.showModal(); return; }
  const params = new URLSearchParams(location.search);
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].forEach(key => {
    if (params.has(key)) checkout.searchParams.set(key, params.get(key));
  });
  if (typeof window.fbq === 'function') window.fbq('track', 'InitiateCheckout', {
    content_name: 'Libras com Cristo', content_ids: [button.dataset.plan],
    currency: 'BRL', value: button.dataset.plan === 'basic' ? 10 : 27.90
  });
  location.assign(checkout.href);
}));
if (/^\d{8,20}$/.test(String(config.pixelId || ''))) {
  const fbq = window.fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
  window._fbq = fbq; fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
  const script = document.createElement('script'); script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'; document.head.append(script);
  fbq('init', String(config.pixelId)); fbq('track', 'PageView');
  fbq('track', 'ViewContent', { content_name: 'Libras com Cristo', currency: 'BRL', value: 27.90 });
}
