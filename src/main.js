import './style.css';
import QRCodeStyling from 'qr-code-styling';
import html2canvas from 'html2canvas';
import { REVIEW_URL } from './config.js';

const T = {
  es: {
    headline: '¿Te gustó rodar con nosotros?',
    subtitle:
      'Tu opinión hace que nuestra creatividad siga girando. ¡Toma solo 30 segundos dejarnos tu reseña en Google!',
    starHint: 'Toca las estrellas para calificar',
    qrCaption: 'Escanea para calificar',
    ctaLabel: 'Dejar mi Reseña en Google',
    themeToDark: 'Vinilo Oscuro',
    themeToLight: 'Modo Claro',
    presentLabel: 'Mostrar QR',
    exitPresentLabel: 'Salir',
    toastStarOpening: 'Abriendo Google Reviews...',
    downloadLabel: 'Descargar PNG',
    downloadingLabel: 'Generando...',
    shareLabel: 'Compartir',
    copyLabel: 'Copiar Link',
    shareTitle: 'Rese?a en Google ? Rueda La Rola Media',
    shareText: '?Cu?ntanos tu experiencia con Rueda La Rola Media en Google!',
    toastCopied: 'Link copiado al portapapeles',
    toastDownloaded: 'Imagen PNG guardada',
    toastDownloadError: 'No se pudo generar la imagen. Intenta de nuevo.',
    whatsappMessage: (url) => `?Hola! ??? Gracias por confiar en *Rueda La Rola Media*. ?Te gust? trabajar con nosotros? Tu rese?a en Google nos ayuda much?simo a seguir girando. ?Solo toma 30 segundos! ?????\n\n?? ${url}`,
  },
  en: {
    headline: 'Loved rolling with us?',
    subtitle:
      'Your feedback keeps our creative momentum spinning. Take 30 seconds to share your experience on Google!',
    starHint: 'Tap the stars to rate',
    qrCaption: 'Scan to review',
    ctaLabel: 'Leave a Google Review',
    themeToDark: 'Dark Vinyl',
    themeToLight: 'Light Clean',
    presentLabel: 'Show QR',
    exitPresentLabel: 'Exit',
    toastStarOpening: 'Opening Google Reviews...',
    downloadLabel: 'Download PNG',
    downloadingLabel: 'Exporting...',
    shareLabel: 'Share',
    copyLabel: 'Copy Link',
    shareTitle: 'Google Review ? Rueda La Rola Media',
    shareText: 'Tell us about your experience with Rueda La Rola Media on Google!',
    toastCopied: 'Link copied to clipboard',
    toastDownloaded: 'PNG image saved',
    toastDownloadError: 'Could not generate the image. Try again.',
    whatsappMessage: (url) => `Hi! ??? Thanks for trusting *Rueda La Rola Media*. Did you enjoy working with us? Your Google review helps us a lot. It only takes 30 seconds! ?????\n\n?? ${url}`,
  },
};

const state = { lang: 'es', theme: 'light', present: false, toastTimer: null };
const $ = (id) => document.getElementById(id);
const el = {
  body: $('app-body'),
  orb1: $('ambient-orb-1'),
  orb2: $('ambient-orb-2'),
  topToolbar: $('top-toolbar'),
  langPill: $('lang-pill-wrap'),
  btnEs: $('btn-lang-es'),
  btnEn: $('btn-lang-en'),
  btnTheme: $('btn-theme-toggle'),
  themeIcon: $('theme-icon'),
  themeLabel: $('theme-label'),
  btnPresent: $('btn-present-mode'),
  presentLabel: $('present-label'),
  btnExit: $('btn-exit-present'),
  exitLabel: $('exit-present-label'),
  card: $('review-card'),
  vinylBg: $('vinyl-bg-pattern'),
  logoRing: $('logo-badge-ring'),
  brandName: $('card-brand-name'),
  locPill: $('card-location-pill'),
  headline: $('card-headline'),
  subtitle: $('card-subtitle'),
  stars: document.querySelectorAll('.star-btn'),
  starHint: $('star-hint'),
  qrFrame: $('qr-outer-frame'),
  qr: $('qr-code-container'),
  qrCaption: $('qr-caption'),
  cta: $('card-cta-btn'),
  ctaLabel: $('cta-label'),
  footer: $('card-footer'),
  services: $('card-services'),
  website: $('card-website-link'),
  actionToolbar: $('action-toolbar'),
  btnWhatsapp: $('btn-whatsapp'),
  btnDownload: $('btn-download-png'),
  downloadLabel: $('download-label'),
  btnShare: $('btn-share'),
  shareLabel: $('share-label'),
  btnCopy: $('btn-copy-link'),
  copyLabel: $('copy-label'),
  secBtns: document.querySelectorAll('.action-secondary-btn'),
  toast: $('toast-container'),
  toastMsg: $('toast-message'),
};

function showToast(msg) {
  clearTimeout(state.toastTimer);
  el.toastMsg.textContent = msg;
  el.toast.classList.remove('opacity-0', 'translate-y-3');
  state.toastTimer = setTimeout(() => el.toast.classList.add('opacity-0', 'translate-y-3'), 2800);
}

function renderQr() {
  el.qr.innerHTML = '';
  const qr = new QRCodeStyling({
    width: 440,
    height: 440,
    type: 'canvas',
    data: REVIEW_URL,
    margin: 6,
    qrOptions: { errorCorrectionLevel: 'M' },
    dotsOptions: {
      type: 'dots',
      gradient: {
        type: 'linear',
        rotation: Math.PI / 4,
        colorStops: [
          { offset: 0, color: '#8A00C4' },
          { offset: 1, color: '#8E0B7B' },
        ],
      },
    },
    cornersSquareOptions: { type: 'extra-rounded', color: '#8E0B7B' },
    cornersDotOptions: { type: 'dot', color: '#8A00C4' },
    backgroundOptions: { color: '#FFFFFF' },
  });
  qr.append(el.qr);
}

function updateLanguage() {
  const t = T[state.lang];
  document.documentElement.lang = state.lang;
  const active = ['bg-gradient-to-r', 'from-[#362676]', 'to-[#D60E7B]', 'text-white', 'shadow-sm'];
  const inactive =
    state.theme === 'dark' ? ['text-slate-400', 'hover:text-white'] : ['text-slate-500', 'hover:text-[#362676]'];
  [el.btnEs, el.btnEn].forEach((b) => {
    b.classList.remove(...active, 'text-slate-500', 'hover:text-[#362676]', 'text-slate-400', 'hover:text-white');
    b.setAttribute('aria-pressed', 'false');
  });
  const on = state.lang === 'es' ? el.btnEs : el.btnEn;
  const off = state.lang === 'es' ? el.btnEn : el.btnEs;
  on.classList.add(...active);
  on.setAttribute('aria-pressed', 'true');
  off.classList.add(...inactive);

  el.headline.textContent = t.headline;
  el.subtitle.textContent = t.subtitle;
  el.starHint.textContent = t.starHint;
  el.qrCaption.textContent = t.qrCaption;
  el.ctaLabel.textContent = t.ctaLabel;
  el.themeLabel.textContent = state.theme === 'light' ? t.themeToDark : t.themeToLight;
  el.presentLabel.textContent = t.presentLabel;
  el.exitLabel.textContent = t.exitPresentLabel;
  el.downloadLabel.textContent = t.downloadLabel;
  el.shareLabel.textContent = t.shareLabel;
  el.copyLabel.textContent = t.copyLabel;
}

const PILL_LIGHT =
  'inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-white/90 px-3 py-2 text-xs font-semibold shadow-sm backdrop-blur-md transition-all active:scale-95';
const PILL_DARK =
  'inline-flex items-center gap-1.5 rounded-full border border-purple-500/25 bg-[#19132B]/90 px-3 py-2 text-xs font-semibold text-purple-100 shadow-sm backdrop-blur-md transition-all hover:border-[#D60E7B]/50 hover:text-white active:scale-95';

const SEC_LIGHT =
  'action-secondary-btn flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-purple-200/90 bg-white px-3.5 py-2.5 text-xs font-bold text-[#362676] shadow-sm transition-all hover:border-[#7B1FA2]/50 hover:bg-purple-50/70 hover:-translate-y-0.5 active:scale-[0.98]';
const SEC_DARK =
  'action-secondary-btn flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-purple-500/25 bg-[#19132B] px-3.5 py-2.5 text-xs font-bold text-purple-100 shadow-sm transition-all hover:border-[#D60E7B]/50 hover:bg-[#221A3A] active:scale-[0.98]';

function updateTheme() {
  const dark = state.theme === 'dark';
  const base = 'min-h-[100dvh] w-full overflow-x-hidden font-sans antialiased transition-colors duration-300 ';
  if (dark) {
    el.body.className = base + 'bg-[#0B0914] text-slate-100 selection:bg-[#D60E7B]/30 selection:text-white';
    el.orb1.className = 'absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#362676]/35 blur-3xl';
    el.orb2.className = 'absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#D60E7B]/25 blur-3xl';
    el.langPill.className =
      'inline-flex items-center rounded-full border border-purple-500/25 bg-[#19132B]/90 p-1 shadow-sm backdrop-blur-md';
    el.btnTheme.className = PILL_DARK;
    el.btnPresent.className = PILL_DARK;
    el.themeIcon.innerHTML =
      '<svg class="h-3.5 w-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
    el.secBtns.forEach((b) => (b.className = SEC_DARK));
    el.card.className =
      'relative w-full max-w-[400px] overflow-hidden rounded-3xl border border-purple-500/25 bg-[#141022] shadow-card-dark transition-all duration-300';
    el.vinylBg.classList.remove('text-[#362676]', 'opacity-[0.045]');
    el.vinylBg.classList.add('text-purple-300', 'opacity-[0.09]');
    el.logoRing.className =
      'mb-3 flex h-[96px] w-[96px] items-center justify-center rounded-full border border-purple-400/30 bg-white p-1.5 shadow-[0_0_24px_rgba(214,14,123,0.28)] ring-4 ring-purple-500/20';
    el.brandName.className = 'text-xl font-extrabold tracking-tight text-white';
    el.locPill.className =
      'mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-purple-400/25 bg-purple-950/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-purple-100';
    el.headline.className = 'text-[22px] font-extrabold leading-tight tracking-tight text-white';
    el.subtitle.className = 'mt-2 text-[13.5px] leading-relaxed text-purple-200/80';
    el.starHint.className = 'mt-1 text-[11px] font-medium text-purple-300/70';
    el.footer.className = 'mt-5 w-full border-t border-purple-500/20 pt-3.5';
    el.services.className = 'text-[11px] font-semibold tracking-wider text-purple-200/65 uppercase';
    el.website.className = 'mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#F062AD] transition-colors hover:text-white';
  } else {
    el.body.className =
      base +
      'bg-gradient-to-br from-[#F7F5FC] via-[#FDFBFF] to-[#FDF2F8] text-slate-900 selection:bg-[#D60E7B]/20 selection:text-[#362676]';
    el.orb1.className = 'absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#362676]/10 blur-3xl';
    el.orb2.className = 'absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#D60E7B]/10 blur-3xl';
    el.langPill.className =
      'inline-flex items-center rounded-full border border-purple-200/80 bg-white/90 p-1 shadow-sm backdrop-blur-md';
    el.btnTheme.className = PILL_LIGHT + ' text-slate-700 hover:border-[#7B1FA2]/40 hover:text-[#362676]';
    el.btnPresent.className = PILL_LIGHT + ' text-[#362676] hover:border-[#D60E7B]/50 hover:bg-purple-50/70';
    el.themeIcon.innerHTML =
      '<svg class="h-3.5 w-3.5 text-[#7B1FA2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>';
    el.secBtns.forEach((b) => (b.className = SEC_LIGHT));
    el.card.className =
      'relative w-full max-w-[400px] overflow-hidden rounded-3xl border border-purple-100/90 bg-white shadow-card-light transition-all duration-300';
    el.vinylBg.classList.remove('text-purple-300', 'opacity-[0.09]');
    el.vinylBg.classList.add('text-[#362676]', 'opacity-[0.045]');
    el.logoRing.className =
      'mb-3 flex h-[96px] w-[96px] items-center justify-center rounded-full border border-purple-100 bg-white p-1.5 shadow-md ring-4 ring-purple-50/80';
    el.brandName.className = 'text-xl font-extrabold tracking-tight text-[#1E1442]';
    el.locPill.className =
      'mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-purple-200/70 bg-purple-50/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#362676]';
    el.headline.className = 'text-[22px] font-extrabold leading-tight tracking-tight text-slate-900';
    el.subtitle.className = 'mt-2 text-[13.5px] leading-relaxed text-slate-600';
    el.starHint.className = 'mt-1 text-[11px] font-medium text-slate-500';
    el.footer.className = 'mt-5 w-full border-t border-purple-100/90 pt-3.5';
    el.services.className = 'text-[11px] font-semibold tracking-wider text-slate-500 uppercase';
    el.website.className = 'mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#7B1FA2] transition-colors hover:text-[#D60E7B]';
  }
  updateLanguage();
}

function setPresent(on) {
  state.present = on;
  el.topToolbar.classList.toggle('hidden', on);
  el.actionToolbar.classList.toggle('hidden', on);
  el.btnExit.classList.toggle('hidden', !on);
  el.btnExit.classList.toggle('inline-flex', on);
}

el.btnEs.addEventListener('click', () => ((state.lang = 'es'), updateLanguage()));
el.btnEn.addEventListener('click', () => ((state.lang = 'en'), updateLanguage()));
el.btnTheme.addEventListener('click', () => ((state.theme = state.theme === 'light' ? 'dark' : 'light'), updateTheme()));
el.btnPresent.addEventListener('click', () => setPresent(true));
el.btnExit.addEventListener('click', () => setPresent(false));
document.addEventListener('keydown', (e) => e.key === 'Escape' && state.present && setPresent(false));

el.stars.forEach((btn, idx) => {
  btn.addEventListener('mouseenter', () => el.stars.forEach((s, i) => s.classList.toggle('scale-110', i <= idx)));
  btn.addEventListener('mouseleave', () => el.stars.forEach((s) => s.classList.remove('scale-110')));
  btn.addEventListener('click', () => {
    el.stars.forEach((s, i) => {
      if (i <= idx) {
        s.classList.add('animate-star-pop');
        setTimeout(() => s.classList.remove('animate-star-pop'), 380);
      }
    });
    showToast(T[state.lang].toastStarOpening);
    setTimeout(() => window.open(REVIEW_URL, '_blank', 'noopener,noreferrer'), 220);
  });
});

el.cta.href = REVIEW_URL;
renderQr();
updateTheme();

// ---------- Acciones: WhatsApp, Descargar, Compartir, Copiar ----------
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

el.btnWhatsapp.addEventListener('click', () => {
  const msg = T[state.lang].whatsappMessage(REVIEW_URL);
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
});

el.btnShare.addEventListener('click', async () => {
  const t = T[state.lang];
  if (navigator.share) {
    try {
      await navigator.share({ title: t.shareTitle, text: t.shareText, url: REVIEW_URL });
      return;
    } catch (err) {
      if (err && err.name === 'AbortError') return;
    }
  }
  await copyText(REVIEW_URL);
  showToast(t.toastCopied);
});

el.btnCopy.addEventListener('click', async () => {
  await copyText(REVIEW_URL);
  showToast(T[state.lang].toastCopied);
});

// Rasteriza el logo SVG (texto curvo) para que html2canvas lo dibuje bien
function svgToCanvas(svg, size) {
  return new Promise((resolve) => {
    let str = new XMLSerializer().serializeToString(svg);
    if (!str.includes('xmlns="http://www.w3.org/2000/svg"')) str = str.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    const url = URL.createObjectURL(new Blob([str], { type: 'image/svg+xml;charset=utf-8' }));
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      c.getContext('2d').drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(c);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

el.btnDownload.addEventListener('click', async () => {
  const t = T[state.lang];
  const svg = $('brand-svg-logo');
  let tmp = null;
  el.btnDownload.disabled = true;
  el.downloadLabel.textContent = t.downloadingLabel;
  try {
    tmp = await svgToCanvas(svg, 480);
    if (tmp) {
      tmp.className = 'h-full w-full rounded-full';
      svg.classList.add('hidden');
      el.logoRing.appendChild(tmp);
    }
    // Solo imagen, textos, estrellas y QR: el bot?n CTA se excluye (data-export-ignore)
    const canvas = await html2canvas(el.card, {
      scale: 3,
      backgroundColor: null,
      logging: false,
      ignoreElements: (node) => node.hasAttribute && node.hasAttribute('data-export-ignore'),
    });
    const a = document.createElement('a');
    a.download = 'rueda-la-rola-review-card.png';
    a.href = canvas.toDataURL('image/png');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(t.toastDownloaded);
  } catch (err) {
    console.error(err);
    showToast(t.toastDownloadError);
  } finally {
    if (tmp && tmp.parentNode) tmp.parentNode.removeChild(tmp);
    svg.classList.remove('hidden');
    el.btnDownload.disabled = false;
    el.downloadLabel.textContent = T[state.lang].downloadLabel;
  }
});
