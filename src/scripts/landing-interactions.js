/**
 * Package picker interactions (1 par / 2 pares).
 * Reads from window.__PRODUCT_PACKAGES__ injected by the Astro component.
 */

let selectedPackageIndex = 0;

function getPackages() {
  return window.__PRODUCT_PACKAGES__ || [];
}

function getPackageCards() {
  return Array.from(document.querySelectorAll('[data-package-index]'));
}

function markPackageSelected(index) {
  const cards = getPackageCards();
  const packages = getPackages();
  if (!cards.length || !packages.length) return;

  selectedPackageIndex = index;
  const pkg = packages[index] || packages[0];

  cards.forEach((card, i) => {
    const selected = i === index;
    const iconContainer = card.querySelector('div > div:first-child');

    card.classList.toggle('border-accent', selected);
    card.classList.toggle('bg-accent/15', selected);
    card.classList.toggle('border-foreground/30', !selected);
    card.classList.toggle('bg-foreground/3', !selected);

    if (iconContainer) {
      if (selected) {
        iconContainer.innerHTML = '<div class="bg-accent flex h-5 w-5 items-center justify-center rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg></div>';
      } else {
        iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-foreground/30 h-5 w-5"><circle cx="12" cy="12" r="10"></circle></svg>';
      }
    }
  });

  // Update cart summary
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const totalEl = document.getElementById('cart-total');
  const checkoutTotal = document.getElementById('checkout-modal-total');
  const checkoutSubmitTotal = document.getElementById('checkout-submit-total');

  if (subtotalEl) subtotalEl.textContent = pkg.comparePrice;
  if (discountEl) discountEl.textContent = '-' + pkg.discount;
  if (totalEl) totalEl.textContent = pkg.price;
  if (checkoutTotal) checkoutTotal.textContent = pkg.price;
  if (checkoutSubmitTotal) checkoutSubmitTotal.textContent = pkg.price;

  window.dispatchEvent(new CustomEvent('package:change', { detail: pkg }));
}

function initPackagePicker() {
  const cards = getPackageCards();
  if (!cards.length) return;

  cards.forEach((card, index) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', () => markPackageSelected(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        markPackageSelected(index);
      }
    });
  });

  markPackageSelected(0);
}

export function getSelectedPackage() {
  const packages = getPackages();
  return packages[selectedPackageIndex] || packages[0] || { quantity: 1, price: '$119,000', label: '1 par' };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPackagePicker);
} else {
  initPackagePicker();
}
