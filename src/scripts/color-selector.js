/**
 * Color selector + image switcher for the landing page.
 * Reads configuration from window.__PRODUCT_COLORS__ (injected by Astro).
 */

function initColorSelector() {
  const containers = [
    document.getElementById('color-selector'),
    document.getElementById('color-selector-desktop'),
  ].filter(Boolean);
  
  if (!containers.length) return;

  const colors = window.__PRODUCT_COLORS__;
  if (!colors || !colors.length) return;

  let selectedIndex = 0;

  function renderSelector() {
    containers.forEach((container) => {
      container.innerHTML = '';
      colors.forEach((color, index) => {
        const btn = document.createElement('button');
        btn.className = `relative rounded-lg overflow-hidden border-2 transition-all w-16 h-16 md:w-20 md:h-20 flex-shrink-0 ${
          index === selectedIndex
            ? 'border-accent ring-2 ring-accent/30'
            : 'border-gray-200 hover:border-gray-400'
        }`;
        btn.setAttribute('aria-label', `Color: ${color.name}`);
        btn.title = color.name;

        const img = document.createElement('img');
        img.src = color.thumbnail;
        img.alt = color.name;
        img.className = 'w-full h-full object-cover';
        img.loading = 'lazy';
        btn.appendChild(img);

        if (index === selectedIndex) {
          const check = document.createElement('div');
          check.className =
            'absolute bottom-1 right-1 bg-accent rounded-full w-5 h-5 flex items-center justify-center';
          check.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>';
          btn.appendChild(check);
        }

        btn.addEventListener('click', () => selectColor(index));
        container.appendChild(btn);
      });
    });
  }

  function selectColor(index) {
    if (index === selectedIndex) return;
    selectedIndex = index;
    renderSelector();
    updateImages(colors[index]);
  }

  function updateImages(color) {
    const images = color.images;

    // Update mobile swiper
    const mobileSwiper = document.querySelector('.product-swiper-mobile');
    if (mobileSwiper) {
      const slides = mobileSwiper.querySelectorAll('.swiper-slide img');
      slides.forEach((img, i) => {
        if (images[i]) img.src = images[i];
      });
    }

    // Update desktop grid
    const desktopGrid = document.querySelector('.product-grid-desktop');
    if (desktopGrid) {
      const imgs = desktopGrid.querySelectorAll('img');
      imgs.forEach((img, i) => {
        if (images[i]) img.src = images[i];
      });
    }

    window.dispatchEvent(
      new CustomEvent('color:change', { detail: { color, index: selectedIndex } })
    );
  }

  renderSelector();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initColorSelector);
} else {
  initColorSelector();
}
