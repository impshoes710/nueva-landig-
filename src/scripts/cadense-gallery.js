/**
 * Galería JR_CADENSE: cambio de imágenes grandes al elegir color + subida por slot.
 */
const STORAGE_KEY = 'cadense-gallery-overrides-v1';
const SLOT_COUNT = 4;

const CHECK_OVERLAY_HTML = `<div class="absolute left-0 top-0 grid h-full w-full place-content-center bg-black/40 cadense-color-check"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="remixicon size-8 text-white"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"></path></svg></div>`;

/** @type {{ colors: Record<string, { thumb: string, gallery: string[] }>, defaultColor: string }} */
let baseConfig = { colors: {}, defaultColor: 'Blanco' };

/** @type {Record<string, string[]>} */
let overrides = {};

/** @type {string} */
let selectedColor = 'Blanco';

function loadBaseConfig() {
  const el = document.getElementById('cadense-gallery-config');
  if (!el?.textContent?.trim()) return;
  try {
    baseConfig = JSON.parse(el.textContent);
  } catch {
    console.warn('[cadense-gallery] Config JSON inválido');
  }
}

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    overrides = raw ? JSON.parse(raw) : {};
  } catch {
    overrides = {};
  }
}

function saveOverrides() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.warn('[cadense-gallery] No se pudo guardar en localStorage', e);
  }
}

function getGalleryUrls(colorName) {
  const base = baseConfig.colors[colorName]?.gallery?.slice(0, SLOT_COUNT) || [];
  const custom = overrides[colorName];
  const urls = [];
  for (let i = 0; i < SLOT_COUNT; i++) {
    urls.push(custom?.[i] || base[i] || baseConfig.colors[colorName]?.thumb || '');
  }
  return urls;
}

function getLeftColumn() {
  return document.querySelector('#landing-root .no-scrollbar.md\\:h-screen');
}

function getColorSlides() {
  const root = document.getElementById('landing-root');
  if (!root) return [];
  const picker = root.querySelector('.overflow-hidden.gutter-sm.mb-7 .swiper-wrapper');
  if (!picker) return [];
  return [...picker.querySelectorAll('.swiper-slide.w-28')];
}

function getDesktopGalleryImgs() {
  const col = getLeftColumn();
  const grid = col?.querySelector('.hidden.grid-cols-1.md\\:grid');
  return grid ? [...grid.querySelectorAll('img')] : [];
}

function getMobileGalleryImgs() {
  const col = getLeftColumn();
  const swiper = col?.querySelector('.swiper.md\\:hidden\\!');
  return swiper ? [...swiper.querySelectorAll('.swiper-slide img')] : [];
}

function getLightboxGalleryImgs() {
  const col = getLeftColumn();
  const modal = col?.querySelector('.invisible.fixed.inset-0');
  if (!modal) return [];
  return [...modal.querySelectorAll('.swiper-slide img')];
}

function setImgSrc(img, src) {
  if (!img || !src) return;
  img.src = src;
  img.removeAttribute('srcset');
}

function applyGalleryImages(urls) {
  const desktop = getDesktopGalleryImgs();
  const mobile = getMobileGalleryImgs();
  const lightbox = getLightboxGalleryImgs();

  urls.forEach((url, i) => {
    if (desktop[i]) setImgSrc(desktop[i], url);
    if (mobile[i]) setImgSrc(mobile[i], url);
    if (lightbox[i]) setImgSrc(lightbox[i], url);
  });

  window.dispatchEvent(
    new CustomEvent('cadense:gallery-change', { detail: { color: selectedColor, urls } })
  );
}

function markColorSlideActive(slides, activeIndex) {
  slides.forEach((slide, i) => {
    slide.classList.add('cadense-color-slide');
    slide.classList.toggle('cadense-color-slide--active', i === activeIndex);
    slide.querySelectorAll('.cadense-color-check').forEach((el) => el.remove());
    if (i === activeIndex) {
      slide.insertAdjacentHTML('beforeend', CHECK_OVERLAY_HTML);
    }
  });
}

function selectColor(colorName, slideIndex, slides) {
  if (!baseConfig.colors[colorName]) return;
  selectedColor = colorName;
  markColorSlideActive(slides, slideIndex);
  applyGalleryImages(getGalleryUrls(colorName));
  const root = document.getElementById('landing-root');
  if (root) root.dataset.selectedColor = colorName;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function compressImage(file, maxWidth = 1200) {
  const dataUrl = await readFileAsDataUrl(file);
  if (!file.type.startsWith('image/')) return dataUrl;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      const quality = file.size > 800000 ? 0.82 : 0.9;
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function ensureFileInput() {
  let input = document.getElementById('cadense-gallery-file-input');
  if (input) return /** @type {HTMLInputElement} */ (input);

  input = document.createElement('input');
  input.id = 'cadense-gallery-file-input';
  input.type = 'file';
  input.accept = 'image/*';
  input.hidden = true;
  document.body.appendChild(input);
  return input;
}

function attachUploadToSlot(img, slotIndex, input) {
  const parent = img.closest('.swiper-slide') || img.parentElement;
  if (!parent || parent.dataset.cadenseUploadBound === '1') return;

  parent.dataset.cadenseUploadBound = '1';
  parent.classList.add('cadense-gallery-slot');

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'cadense-upload-btn';
  btn.textContent = `Subir foto ${slotIndex + 1}`;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    input.dataset.pendingSlot = String(slotIndex);
    input.click();
  });
  parent.appendChild(btn);
}

function setupUploadButtons() {
  const desktop = getDesktopGalleryImgs();
  const mobile = getMobileGalleryImgs();
  const targets = desktop.length ? desktop : mobile;
  if (!targets.length) return;

  const input = ensureFileInput();

  if (!input.dataset.changeBound) {
    input.dataset.changeBound = '1';
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      input.value = '';
      if (!file) return;

      const slotIndex = Number(input.dataset.pendingSlot || 0);

      try {
        const dataUrl = await compressImage(file);
        if (!overrides[selectedColor]) {
          overrides[selectedColor] = getGalleryUrls(selectedColor).slice();
        }
        overrides[selectedColor][slotIndex] = dataUrl;
        saveOverrides();
        applyGalleryImages(getGalleryUrls(selectedColor));
      } catch (e) {
        console.error('[cadense-gallery] Error al subir', e);
        alert('No se pudo cargar la imagen. Intenta con otro archivo.');
      }
    });
  }

  desktop.forEach((img, i) => attachUploadToSlot(img, i, input));
  if (!desktop.length) {
    mobile.forEach((img, i) => attachUploadToSlot(img, i, input));
  }
}

function setupColorPicker() {
  const slides = getColorSlides();
  if (!slides.length) return;

  slides.forEach((slide, index) => {
    const colorName = slide.querySelector('img')?.getAttribute('alt')?.trim();
    if (!colorName) return;

    slide.setAttribute('data-cadense-color', colorName);
    slide.setAttribute('role', 'button');
    slide.setAttribute('tabindex', '0');

    const activate = () => selectColor(colorName, index, slides);

    slide.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        activate();
      },
      true
    );
    slide.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  const defaultColor =
    baseConfig.defaultColor ||
    slides[0]?.querySelector('img')?.getAttribute('alt')?.trim() ||
    'Blanco';
  const startIndex = slides.findIndex(
    (s) => s.getAttribute('data-cadense-color') === defaultColor
  );
  selectColor(defaultColor, startIndex >= 0 ? startIndex : 0, slides);
}

function injectGalleryHint() {
  const col = getLeftColumn();
  const grid = col?.querySelector('.hidden.grid-cols-1.md\\:grid');
  if (!grid || document.querySelector('.cadense-gallery-hint')) return;

  const hint = document.createElement('p');
  hint.className = 'cadense-gallery-hint hidden md:block';
  hint.textContent =
    'Elige un color arriba para ver sus fotos. En cada imagen grande, usa «Subir foto» para cambiarla (se guarda en este navegador).';
  grid.insertAdjacentElement('afterend', hint);
}

let initialized = false;

function initCadenseGallery() {
  const root = document.getElementById('landing-root');
  if (root?.dataset.landing !== 'cadense') return;

  loadBaseConfig();
  loadOverrides();
  injectGalleryHint();

  requestAnimationFrame(() => {
    setupUploadButtons();
    setupColorPicker();
    initialized = true;
  });
}

function boot() {
  initCadenseGallery();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

window.addEventListener('astro:load', () => {
  if (document.getElementById('landing-root')?.dataset.landing === 'cadense') {
    initialized = false;
    document.querySelectorAll('[data-cadense-upload-bound]').forEach((el) => {
      el.removeAttribute('data-cadense-upload-bound');
      el.querySelectorAll('.cadense-upload-btn').forEach((btn) => btn.remove());
    });
    initCadenseGallery();
  }
});

export function getSelectedColor() {
  return selectedColor;
}
