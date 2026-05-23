/**
 * Selector de paquetes (1 par / 2 pares) y totales del resumen.
 */
const DEFAULT_PACKAGES = [
  {
    key: '1',
    label: '1 par',
    quantity: 1,
    total: '$119,000',
    compare: '$210,000',
    discount: '$91,000',
    percent: '43',
  },
  {
    key: '2',
    label: '2 pares',
    quantity: 2,
    total: '$200,000',
    compare: '$420,000',
    discount: '$220,000',
    percent: '52',
  },
];

function getPackagesFromDOM() {
  const root = document.getElementById('landing-root');
  if (!root?.dataset.package1Total) return DEFAULT_PACKAGES;

  return [
    {
      key: '1',
      label: '1 par',
      quantity: 1,
      total: root.dataset.package1Total || '$119,000',
      compare: root.dataset.package1Compare || '$210,000',
      discount: root.dataset.package1Discount || '$91,000',
      percent: root.dataset.package1Percent || '43',
    },
    {
      key: '2',
      label: '2 pares',
      quantity: 2,
      total: root.dataset.package2Total || '$200,000',
      compare: root.dataset.package2Compare || '$420,000',
      discount: root.dataset.package2Discount || '$220,000',
      percent: root.dataset.package2Percent || '52',
    },
  ];
}

let PACKAGES = getPackagesFromDOM();

const CHECK_ICON = `<div class="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--premium-accent)]"><svg class="h-3 w-3 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></div>`;
const CIRCLE_ICON = `<svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`;

let selectedPackageIndex = 0;

function getPackageCards() {
  return Array.from(document.querySelectorAll('.package-card'));
}

function getIconContainer(card) {
  return card.querySelector('.package-icon') || card.querySelector('.flex.items-center.gap-4')?.firstElementChild || card.querySelector('.flex.items-center.gap-5')?.firstElementChild;
}

function markPackageSelected(index) {
  const cards = getPackageCards();
  if (!cards.length) return;

  selectedPackageIndex = index;
  const pkg = PACKAGES[index] || PACKAGES[0];

  cards.forEach((card, i) => {
    const iconSlot = getIconContainer(card);
    const selected = i === index;

    card.classList.toggle('border-[var(--landing-accent)]', selected);
    card.classList.toggle('border-[var(--premium-accent)]', selected);
    card.classList.toggle('bg-[var(--landing-accent)]/15', selected);
    card.classList.toggle('bg-[var(--premium-accent)]/10', selected);
    card.classList.toggle('border-neutral-300', !selected);
    card.classList.toggle('border-white/10', !selected);
    card.classList.toggle('bg-neutral-50', !selected);
    card.classList.toggle('bg-[var(--premium-surface)]', !selected);

    if (iconSlot) {
      iconSlot.innerHTML = selected ? CHECK_ICON : CIRCLE_ICON;
    }
  });

  updateCartSummary(pkg);
  window.dispatchEvent(new CustomEvent('package:change', { detail: pkg }));
}

function updateCartSummary(pkg) {
  const subtotal = document.getElementById('summary-subtotal');
  const discount = document.getElementById('summary-discount');
  const total = document.getElementById('summary-total');
  const percent = document.getElementById('summary-percent');

  if (subtotal) subtotal.textContent = pkg.compare;
  if (discount) discount.textContent = '-' + pkg.discount;
  if (total) total.textContent = pkg.total;
  if (percent) percent.textContent = pkg.percent + '%';

  const checkoutTotal = document.getElementById('checkout-modal-total');
  const checkoutSubmitTotal = document.getElementById('checkout-submit-total');
  if (checkoutTotal) checkoutTotal.textContent = pkg.total;
  if (checkoutSubmitTotal) checkoutSubmitTotal.textContent = pkg.total;
}

function initPackagePicker() {
  PACKAGES = getPackagesFromDOM();
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
  return PACKAGES[selectedPackageIndex] || PACKAGES[0];
}

export function getProductName() {
  return document.getElementById('landing-root')?.dataset.productName || 'Lokal Big';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPackagePicker);
} else {
  initPackagePicker();
}
