'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
const config = window.OFFER_CONFIG || {};
const dialog = document.getElementById('checkout-pending');
document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelectorAll('.checkout').forEach(button => button.addEventListener('click', event => {
  event.preventDefault();
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

// Deixa os destinos explícitos nos links e mantém os parâmetros já rastreados.
for (const link of document.querySelectorAll('.checkout')) {
  const raw = link.dataset.plan === 'basic' ? config.checkoutBasic : config.checkoutComplete;
  try {
    const destination = new URL(raw);
    if (destination.protocol !== 'https:') continue;
    const parameters = new URLSearchParams(location.search);
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']) {
      if (parameters.has(key)) destination.searchParams.set(key, parameters.get(key));
    }
    link.href = destination.href;
  } catch { /* O diálogo existente trata configuração indisponível no clique. */ }
}

const preview = document.getElementById('sample-preview');
const previewImage = document.getElementById('sample-preview-image');
const previewTitle = document.getElementById('preview-title');
let previewTrigger = null;
function closePreview() { preview.close(); }
for (const button of document.querySelectorAll('[data-preview]')) {
  button.addEventListener('click', () => {
    previewTrigger = button;
    previewImage.src = button.dataset.preview;
    previewImage.alt = button.querySelector('img').alt;
    previewTitle.textContent = button.getAttribute('aria-label').replace(/^Ampliar /, '');
    preview.showModal();
    document.body.classList.add('preview-open');
    updateBar();
  });
}
preview.querySelector('.close-preview').addEventListener('click', closePreview);
preview.addEventListener('click', event => {
  if (event.target !== preview) return;
  const box = preview.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closePreview();
});
preview.addEventListener('close', () => {
  document.body.classList.remove('preview-open');
  if (previewTrigger) previewTrigger.focus({ preventScroll: true });
  updateBar();
});

const mobileBar = document.querySelector('.mobile-bar');
const initialCTA = document.getElementById('hero-cta');
const hiddenNear = ['planos', 'duvidas', 'rodape'].map(id => document.getElementById(id));
hiddenNear.push(document.querySelector('.final'));
function intersectsViewport(element) {
  const bounds = element.getBoundingClientRect();
  return bounds.bottom > 0 && bounds.top < innerHeight;
}
function updateBar() {
  const show = matchMedia('(max-width: 700px)').matches
    && initialCTA.getBoundingClientRect().bottom <= 44
    && !hiddenNear.some(intersectsViewport)
    && !preview.open && !dialog.open;
  mobileBar.hidden = !show;
  document.body.classList.toggle('bar-visible', show);
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(updateBar, { threshold: [0, 1] });
  [initialCTA, ...hiddenNear].forEach(element => observer.observe(element));
}
let barScheduled = false;
addEventListener('scroll', () => {
  if (barScheduled) return;
  barScheduled = true;
  requestAnimationFrame(() => { barScheduled = false; updateBar(); });
}, { passive: true });
addEventListener('resize', updateBar);
updateBar();
