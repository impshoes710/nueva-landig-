/** @typedef {import('../types/landing-config').LandingConfig} LandingConfig */

function get(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : ''), obj);
}

function set(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!cur[keys[i]]) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

function linesToArray(text) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function arrayToLines(arr) {
  return (arr || []).join('\n');
}

function formToConfig(form) {
  /** @type {LandingConfig} */
  const config = structuredClone(window.__LANDING_CONFIG__);

  form.querySelectorAll('[name]').forEach((el) => {
    const name = el.getAttribute('name');
    if (!name) return;

    if (name === 'product.features') {
      config.product.features = linesToArray(el.value);
      return;
    }
    if (name === 'product.gallery') {
      config.product.gallery = linesToArray(el.value);
      return;
    }
    if (name === 'product.sizes') {
      config.product.sizes = el.value.split(',').map((s) => s.trim()).filter(Boolean);
      return;
    }
    if (name === 'product.colorOptions') {
      config.product.colorOptions = JSON.parse(el.value || '[]');
      return;
    }
    if (name === 'packages') {
      config.packages = JSON.parse(el.value || '[]');
      return;
    }
    if (name === 'tiktok.videos') {
      config.tiktok.videos = JSON.parse(el.value || '[]');
      return;
    }
    if (name === 'trust') {
      config.trust = JSON.parse(el.value || '[]');
      return;
    }
    if (name === 'benefits') {
      config.benefits = JSON.parse(el.value || '[]');
      return;
    }
    if (name === 'testimonials.images') {
      config.testimonials.images = linesToArray(el.value);
      return;
    }
    if (name === 'faq.items') {
      config.faq.items = JSON.parse(el.value || '[]');
      return;
    }
    if (name === 'related.products') {
      config.related.products = JSON.parse(el.value || '[]');
      return;
    }
    if (name === 'promotion.showCountdown') {
      config.promotion.showCountdown = el.checked;
      return;
    }
    if (name === 'promotion.countdownHours') {
      config.promotion.countdownHours = Number(el.value) || 24;
      return;
    }

    if (el.type === 'checkbox') {
      set(config, name, el.checked);
    } else {
      set(config, name, el.value);
    }
  });

  return config;
}

function configToForm(config, form) {
  form.querySelectorAll('[name]').forEach((el) => {
    const name = el.getAttribute('name');
    if (!name) return;

    if (name === 'product.features') {
      el.value = arrayToLines(config.product.features);
      return;
    }
    if (name === 'product.gallery') {
      el.value = arrayToLines(config.product.gallery);
      return;
    }
    if (name === 'product.sizes') {
      el.value = (config.product.sizes || []).join(', ');
      return;
    }
    if (name === 'product.colorOptions') {
      el.value = JSON.stringify(config.product.colorOptions, null, 2);
      return;
    }
    if (name === 'packages') {
      el.value = JSON.stringify(config.packages, null, 2);
      return;
    }
    if (name === 'tiktok.videos') {
      el.value = JSON.stringify(config.tiktok.videos, null, 2);
      return;
    }
    if (name === 'trust') {
      el.value = JSON.stringify(config.trust, null, 2);
      return;
    }
    if (name === 'benefits') {
      el.value = JSON.stringify(config.benefits, null, 2);
      return;
    }
    if (name === 'testimonials.images') {
      el.value = arrayToLines(config.testimonials.images);
      return;
    }
    if (name === 'faq.items') {
      el.value = JSON.stringify(config.faq.items, null, 2);
      return;
    }
    if (name === 'related.products') {
      el.value = JSON.stringify(config.related.products, null, 2);
      return;
    }
    if (name === 'promotion.showCountdown') {
      el.checked = config.promotion.showCountdown;
      return;
    }

    const val = get(config, name);
    if (el.type === 'color' && typeof val === 'string' && val.startsWith('#')) {
      el.value = val;
    } else if (el.type !== 'checkbox') {
      el.value = val ?? '';
    }
  });
}

function setStatus(msg, isError = false) {
  const el = document.getElementById('admin-status');
  if (!el) return;
  el.textContent = msg;
  el.className = 'admin-status ' + (isError ? 'text-red-600' : 'text-green-700');
}

async function saveConfig(config) {
  const secret = localStorage.getItem('landing-admin-secret');
  const headers = { 'Content-Type': 'application/json' };
  if (secret) headers['x-landing-secret'] = secret;

  const res = await fetch('/api/landing-config', {
    method: 'PUT',
    headers,
    body: JSON.stringify(config),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'No se pudo guardar en el servidor');
  }
  window.__LANDING_CONFIG__ = config;
}

function downloadConfig(config) {
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lokal-big-blanco.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function init() {
  const form = document.getElementById('admin-form');
  if (!form || !window.__LANDING_CONFIG__) return;

  configToForm(window.__LANDING_CONFIG__, form);

  document.getElementById('btn-save')?.addEventListener('click', async () => {
    try {
      const config = formToConfig(form);
      await saveConfig(config);
      setStatus('Guardado correctamente. Recarga la landing para ver los cambios.');
    } catch (err) {
      setStatus(err.message || 'Error al guardar', true);
      if (String(err.message).includes('No autorizado')) {
        setStatus(
          'En producción: descarga el JSON y reemplaza src/data/lokal-big-blanco.json, o define LANDING_ADMIN_SECRET.',
          true
        );
      }
    }
  });

  document.getElementById('btn-download')?.addEventListener('click', () => {
    try {
      const config = formToConfig(form);
      downloadConfig(config);
      setStatus('JSON descargado.');
    } catch (err) {
      setStatus('Revisa el formato JSON en los campos.', true);
    }
  });

  document.getElementById('btn-preview')?.addEventListener('click', async () => {
    try {
      const config = formToConfig(form);
      try {
        await saveConfig(config);
      } catch {
        sessionStorage.setItem('landing-draft-notice', '1');
      }
      window.open('/', '_blank');
      setStatus('Abriendo vista previa…');
    } catch (err) {
      setStatus('Revisa los campos antes de previsualizar.', true);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
