/**
 * Simple carousel/swiper for product images (no external library needed).
 */
function initSwiper() {
  document.querySelectorAll('.product-swiper-mobile').forEach((container) => {
    const wrapper = container.querySelector('.swiper-wrapper');
    const slides = container.querySelectorAll('.swiper-slide');
    if (!wrapper || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    // Create pagination
    let pagination = container.querySelector('.swiper-pagination');
    if (!pagination) {
      pagination = document.createElement('div');
      pagination.className = 'swiper-pagination';
      container.appendChild(pagination);
    }

    function renderPagination() {
      pagination.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const bullet = document.createElement('span');
        bullet.className = `swiper-pagination-bullet${i === current ? ' swiper-pagination-bullet-active' : ''}`;
        bullet.addEventListener('click', () => goTo(i));
        pagination.appendChild(bullet);
      }
    }

    function goTo(index) {
      current = Math.max(0, Math.min(index, total - 1));
      wrapper.style.transform = `translateX(-${current * 100}%)`;
      renderPagination();
    }

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && current < total - 1) goTo(current + 1);
        if (diff < 0 && current > 0) goTo(current - 1);
      }
    }, { passive: true });

    // Mouse drag support (desktop)
    container.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && current < total - 1) goTo(current + 1);
        if (diff < 0 && current > 0) goTo(current - 1);
      }
    });

    // Init
    wrapper.style.transition = 'transform 0.3s ease';
    renderPagination();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwiper);
} else {
  initSwiper();
}
