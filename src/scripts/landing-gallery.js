function initGallery() {
  const mainImg = document.getElementById('gallery-main-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      if (!src) return;
      mainImg.src = src;
      thumbs.forEach((t) => t.classList.remove('border-[var(--landing-accent)]'));
      thumbs.forEach((t) => t.classList.add('border-transparent'));
      btn.classList.remove('border-transparent');
      btn.classList.add('border-[var(--landing-accent)]');
    });
  });
}

function initColorOptions() {
  const mainImg = document.getElementById('gallery-main-img');
  const options = document.querySelectorAll('.color-option');
  if (!mainImg || !options.length) return;

  options.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-image');
      if (src) mainImg.src = src;
      options.forEach((o) => {
        o.classList.remove('border-[var(--landing-accent)]', 'bg-[var(--landing-accent)]/10');
        o.classList.add('border-neutral-200');
      });
      btn.classList.remove('border-neutral-200');
      btn.classList.add('border-[var(--landing-accent)]', 'bg-[var(--landing-accent)]/10');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initColorOptions();
  });
} else {
  initGallery();
  initColorOptions();
}
