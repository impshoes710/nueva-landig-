function initCountdown() {
  const root = document.getElementById('landing-root');
  const display = document.getElementById('countdown-display');
  if (!root || !display) return;

  const hours = Number(root.dataset.countdownHours) || 24;
  const storageKey = 'landing-countdown-end';

  let end = Number(sessionStorage.getItem(storageKey));
  if (!end || end < Date.now()) {
    end = Date.now() + hours * 60 * 60 * 1000;
    sessionStorage.setItem(storageKey, String(end));
  }

  function tick() {
    const diff = Math.max(0, end - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    display.textContent = `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  }

  tick();
  setInterval(tick, 1000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCountdown);
} else {
  initCountdown();
}
