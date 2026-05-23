export function formatPrecio(valor: number, moneda = '$'): string {
  return moneda + valor.toLocaleString('es-CO');
}

export function calcularDescuento(precio: number, precioAnterior: number): string {
  if (!precioAnterior || precioAnterior <= precio) return '0%';
  const pct = Math.round(((precioAnterior - precio) / precioAnterior) * 100);
  return `${pct}%`;
}

export function packageDiscount(comparePrice: string, price: string): string {
  const num = (s: string) => Number(s.replace(/[^\d]/g, '')) || 0;
  const diff = num(comparePrice) - num(price);
  return '$' + diff.toLocaleString('es-CO');
}
