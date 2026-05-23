/**
 * Galería, zoom, video, contador, barra sticky — plantilla premium.
 */

function initGallery() {
  const wrap = document.getElementById('gallery-zoom-wrap');
  const mainSlot = document.getElementById('gallery-main-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (!wrap || !mainSlot || !thumbs.length) return;

  wrap.addEventListener('click', (e) => {
    if (e.target.closest('.gallery-thumb')) return;
    wrap.classList.toggle('is-zoomed');
  });

  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const type = btn.getAttribute('data-type');
      const poster = btn.getAttribute('data-poster');
      if (!src) return;

      wrap.classList.remove('is-zoomed');

      if (type === 'video') {
        let video = wrap.querySelector('video#gallery-main-img');
        if (!video) {
          const img = wrap.querySelector('img#gallery-main-img');
          if (img) img.remove();
          video = document.createElement('video');
          video.id = 'gallery-main-img';
          video.className = 'h-full w-full object-contain';
          video.controls = true;
          video.playsInline = true;
          wrap.appendChild(video);
        }
        video.src = src;
        if (poster) video.poster = poster;
        video.play().catch(() => {});
      } else {
        let img = wrap.querySelector('img#gallery-main-img');
        const video = wrap.querySelector('video#gallery-main-img');
        if (video) {
          video.pause();
          video.remove();
        }
        if (!img) {
          img = document.createElement('img');
          img.id = 'gallery-main-img';
          img.className = 'h-full w-full object-contain p-4';
          img.alt = '';
          wrap.appendChild(img);
        }
        img.src = src;
      }

      thumbs.forEach((t) => {
        t.classList.remove('border-[var(--premium-accent)]', 'opacity-100');
        t.classList.add('border-white/10', 'opacity-70');
      });
      btn.classList.add('border-[var(--premium-accent)]', 'opacity-100');
      btn.classList.remove('border-white/10', 'opacity-70');
    });
  });
}

function initColorOptions() {
  const wrap = document.getElementById('gallery-zoom-wrap');
  const options = document.querySelectorAll('.color-option');
  if (!wrap || !options.length) return;

  options.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-image');
      if (!src) return;

      let img = wrap.querySelector('img#gallery-main-img');
      const video = wrap.querySelector('video#gallery-main-img');
      if (video) {
        video.pause();
        video.remove();
      }
      if (!img) {
        img = document.createElement('img');
        img.id = 'gallery-main-img';
        img.className = 'h-full w-full object-contain p-4';
        wrap.appendChild(img);
      }
      img.src = src;

      options.forEach((o) => {
        o.classList.remove('border-[var(--premium-accent)]', 'bg-[var(--premium-accent)]/10');
        o.classList.add('border-white/10');
      });
      btn.classList.add('border-[var(--premium-accent)]', 'bg-[var(--premium-accent)]/10');
      btn.classList.remove('border-white/10');
    });
  });
}

function initCountdown() {
  const root = document.getElementById('landing-root');
  const display = document.getElementById('countdown-display');
  if (!root || !display) return;

  const hours = Number(root.dataset.countdownHours) || 24;
  const key = 'premium-countdown-end';
  let end = Number(sessionStorage.getItem(key));
  if (!end || end < Date.now()) {
    end = Date.now() + hours * 3600000;
    sessionStorage.setItem(key, String(end));
  }

  function tick() {
    const diff = Math.max(0, end - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    display.textContent = [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
  }
  tick();
  setInterval(tick, 1000);
}

function initStickyBar() {
  const bar = document.getElementById('sticky-bar');
  const hero = document.getElementById('hero');
  if (!bar || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      bar.classList.toggle('is-visible', !entry.isIntersecting);
    },
    { threshold: 0.05 }
  );
  observer.observe(hero);
}

function initReveal() {
  const nodes = document.querySelectorAll('.premium-animate-in');
  if (!nodes.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  nodes.forEach((el) => {
    el.style.opacity = '0';
    io.observe(el);
  });
}

function boot() {
  initGallery();
  initColorOptions();
  initCountdown();
  initStickyBar();
  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
