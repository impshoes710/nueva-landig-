/**
 * Auto-play videos when they scroll into view.
 */
function initVideoAutoplay() {
  const videos = document.querySelectorAll('video[data-autoplay-on-visible]');
  if (!videos.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.5 }
  );

  videos.forEach((video) => observer.observe(video));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideoAutoplay);
} else {
  initVideoAutoplay();
}
