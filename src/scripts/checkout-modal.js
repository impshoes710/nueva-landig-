const modal = document.getElementById('checkout-modal');
  const form = document.getElementById('checkout-form');
  const totalEl = document.getElementById('checkout-modal-total');
  const submitTotalEl = document.getElementById('checkout-submit-total');
  const submitBtn = document.getElementById('checkout-submit-btn');
  const errorEl = document.getElementById('checkout-error');

  function findTotalFromButton(button) {
    let node = button;
    for (let depth = 0; depth < 12 && node; depth++) {
      const text = node.textContent || '';
      const totalMatch = text.match(/Total[\s\S]{0,80}(\$[\d,]+)/i);
      if (totalMatch && totalMatch[1]) return totalMatch[1];
      const boldTotal = node.querySelector('.text-lg.font-bold');
      if (boldTotal && /^\$[\d,]+$/.test(boldTotal.textContent.trim())) {
        return boldTotal.textContent.trim();
      }
      node = node.parentElement;
    }
    return '$149,000';
  }

  function setTotal(price) {
    if (totalEl) totalEl.textContent = price;
    if (submitTotalEl) submitTotalEl.textContent = price;
  }

  function getSizeSelect() {
    return document.querySelector('select option[value*="ProductVariant"]')?.closest('select')
      || document.querySelector('select');
  }

  function getSelectedPackage() {
    const packages = document.querySelectorAll('.cursor-pointer.overflow-hidden.rounded-lg.border');
    for (const pkg of packages) {
      const isSelected =
        pkg.classList.contains('border-accent') || pkg.querySelector('.lucide-check');
      if (!isSelected) continue;
      const label = pkg.querySelector('.font-semibold.text-md')?.textContent?.trim() || '';
      const priceEl = pkg.querySelector('.flex.flex-col.items-end .font-semibold');
      const price = priceEl?.textContent?.trim() || '';
      const quantity = label.toLowerCase().includes('2') ? 2 : 1;
      return { label, price, quantity };
    }
    return { label: '1 par', price: '$119,000', quantity: 1 };
  }

  function getOrderContext() {
    const select = getSizeSelect();
    const variantGid = select?.value || '';
    const variantIdMatch = variantGid.match(/ProductVariant\/(\d+)/);
    const variantId = variantIdMatch ? Number(variantIdMatch[1]) : 0;
    const sizeOption = select?.selectedOptions?.[0];
    const size = sizeOption?.textContent?.trim() || '';
    const pkg = getSelectedPackage();
    const total = pkg.price || totalEl?.textContent || '$149,000';

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

  function openModal(trigger) {
    if (!modal) return;
    const pkg = getSelectedPackage();
    setTotal(pkg.price || findTotalFromButton(trigger));
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

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest('button');
    if (!button || !button.textContent.includes('Pagar en casa')) return;
    event.preventDefault();
    event.stopPropagation();
    openModal(button);
  });

  if (modal) {
    modal.querySelectorAll('[data-checkout-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  if (form) {
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

      const total = totalEl?.textContent || orderContext.total;

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
          '¡Pedido registrado en Shopify!\\n\\nNúmero: ' +
            (result.orderName || result.orderNumber) +
            '\\nTotal: ' +
            total +
            '\\nTe contactaremos por WhatsApp al ' +
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
</script>ar el envío.`
    );
    form.reset();
    closeModal();
  });
