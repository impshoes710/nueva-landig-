import { getSelectedPackage } from './landing-interactions.js';

const modal = document.getElementById('checkout-modal');
const form = document.getElementById('checkout-form');
const totalEl = document.getElementById('checkout-modal-total');
const submitTotalEl = document.getElementById('checkout-submit-total');
const submitBtn = document.getElementById('checkout-submit-btn');
const errorEl = document.getElementById('checkout-error');

function getSizeSelect() {
  return (
    document.querySelector('select option[value*="ProductVariant"]')?.closest('select') ||
    document.querySelector('select')
  );
}

function getOrderContext() {
  const select = getSizeSelect();
  const variantGid = select?.value || '';
  const variantIdMatch = variantGid.match(/ProductVariant\/(\d+)/);
  const variantId = variantIdMatch ? Number(variantIdMatch[1]) : 0;
  const size = select?.selectedOptions?.[0]?.textContent?.trim() || '';
  const pkg = getSelectedPackage();
  const total = totalEl?.textContent?.trim() || pkg.total;

  return {
    variantId,
    quantity: pkg.quantity,
    total,
    size,
    packageLabel: pkg.label,
  };
}

function showError(message) {
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.hidden = !message;
}

function openModal() {
  if (!modal) return;
  const pkg = getSelectedPackage();
  if (totalEl) totalEl.textContent = pkg.total;
  if (submitTotalEl) submitTotalEl.textContent = pkg.total;
  showError('');
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('checkout-modal-open');
  const firstInput = form?.querySelector('input, select');
  if (firstInput) firstInput.focus();
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('checkout-modal-open');
}

function isPayAtHomeButton(button) {
  return /pagar\s+en\s+casa/i.test(button.textContent || '');
}

function initPayButtons() {
  document.querySelectorAll('button').forEach((button) => {
    if (!isPayAtHomeButton(button)) return;
    button.type = 'button';
    button.dataset.openCheckout = 'true';
  });
}

function initCheckout() {
  if (!modal || !form) return;

  initPayButtons();

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest('button[data-open-checkout], button');
    if (!button || !isPayAtHomeButton(button)) return;

    event.preventDefault();
    event.stopPropagation();
    openModal();
  });

  modal.querySelectorAll('[data-checkout-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showError('');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const customer = {
      nombre: String(formData.get('nombre') || ''),
      apellidos: String(formData.get('apellidos') || ''),
      celular: String(formData.get('celular') || ''),
      direccion: String(formData.get('direccion') || ''),
      barrio: String(formData.get('barrio') || ''),
      departamento: String(formData.get('departamento') || ''),
      ciudad: String(formData.get('ciudad') || ''),
      email: String(formData.get('email') || ''),
    };

    const orderContext = getOrderContext();
    if (!orderContext.variantId) {
      showError('Selecciona una talla antes de completar el pedido.');
      return;
    }

    const total = totalEl?.textContent?.trim() || orderContext.total;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'ENVIANDO PEDIDO...';
    }

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          variantId: orderContext.variantId,
          quantity: orderContext.quantity,
          total,
          size: orderContext.size,
          packageLabel: orderContext.packageLabel,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'No se pudo crear el pedido');
      }

      alert(
        '¡Pedido registrado en Shopify!\n\nNúmero: ' +
          (result.orderName || result.orderNumber) +
          '\nTotal: ' +
          total +
          '\nTe contactaremos por WhatsApp al ' +
          customer.celular +
          ' para confirmar la entrega.'
      );
      form.reset();
      closeModal();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al enviar el pedido';
      showError(message);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          'COMPLETAR PEDIDO - <span id="checkout-submit-total">' + total + '</span>';
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCheckout);
} else {
  initCheckout();
}
