/**
 * Interactividad de la landing: selector 1 par / 2 pares y totales.
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
      total: root.dataset.package1Total || '$130,000',
      compare: root.dataset.package1Compare || '$200,000',
      discount: root.dataset.package1Discount || '$70,000',
      percent: root.dataset.package1Percent || '35',
    },
    {
      key: '2',
      label: '2 pares',
      quantity: 2,
      total: root.dataset.package2Total || '$240,000',
      compare: root.dataset.package2Compare || '$400,000',
      discount: root.dataset.package2Discount || '$160,000',
      percent: root.dataset.package2Percent || '40',
    },
  ];
}

let PACKAGES = getPackagesFromDOM();

const CHECK_ICON = `<div class="bg-accent flex h-5 w-5 items-center justify-center rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check h-3 w-3 text-white" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg></div>`;

const CIRCLE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle text-foreground/30 h-5 w-5" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle></svg>`;

let selectedPackageIndex = 0;

function getPackageCards() {
  const cards = [];
  document.querySelectorAll('.cursor-pointer.overflow-hidden.rounded-lg.border').forEach((el) => {
    const label = el.querySelector('.font-semibold.text-md')?.textContent?.trim();
    if (label === '1 par' || label === '2 pares') cards.push(el);
  });
  return cards;
}

function getIconContainer(card) {
  return card.querySelector('.flex.items-center.gap-5')?.firstElementChild;
}

function markPackageSelected(index) {
  const cards = getPackageCards();
  if (!cards.length) return;

  selectedPackageIndex = index;

  cards.forEach((card, i) => {
    const iconSlot = getIconContainer(card);
    const selected = i === index;

    card.classList.toggle('border-accent', selected);
    card.classList.toggle('bg-accent/15', selected);
    card.classList.toggle('border-foreground/30', !selected);
    card.classList.toggle('bg-foreground/3', !selected);

    if (iconSlot) {
      iconSlot.innerHTML = selected ? CHECK_ICON : CIRCLE_ICON;
    }
  });

  updateCartSummary(PACKAGES[index] || PACKAGES[0]);
  window.dispatchEvent(
    new CustomEvent('package:change', { detail: PACKAGES[index] || PACKAGES[0] })
  );
}

function updateCartSummary(pkg) {
  const rows = document.querySelectorAll('.gutter-md .space-y-3.pb-4 .flex.items-center.justify-between');
  rows.forEach((row) => {
    const label = row.querySelector('p')?.textContent?.trim();
    const valueEl = row.querySelector('.font-semibold');
    if (!valueEl) return;
    if (label === 'Subtotal') valueEl.textContent = pkg.compare;
    if (label === 'Descuento') valueEl.textContent = '-' + pkg.discount;
  });

  const percentBadge = document.querySelector('.gutter-md .bg-accent.rounded-md');
  if (percentBadge) percentBadge.textContent = pkg.percent + '%';

  const totalEl = document.querySelector('.gutter-md .text-lg.font-bold');
  if (totalEl) totalEl.textContent = pkg.total;

  const checkoutTotal = document.getElementById('checkout-modal-total');
  const checkoutSubmitTotal = document.getElementById('checkout-submit-total');
  if (checkoutTotal) checkoutTotal.textContent = pkg.total;
  if (checkoutSubmitTotal) checkoutSubmitTotal.textContent = pkg.total;
}

function initPackagePicker() {
  PACKAGES = getPackagesFromDOM();
  const cards = getPackageCards();
  if (!cards.length) return;

  let initialIndex = cards.findIndex((card) =>
    card.classList.contains('border-accent')
  );
  if (initialIndex < 0) initialIndex = 0;

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

  markPackageSelected(initialIndex);
}

export function getSelectedPackage() {
  return PACKAGES[selectedPackageIndex] || PACKAGES[0];
}

export function getProductName() {
  return document.getElementById('landing-root')?.dataset.productName || 'Cadense';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPackagePicker);
} else {
  initPackagePicker();
}
