// src/utils/helpers.js
export const calculateTotal = (gastos) => {
  if (!Array.isArray(gastos) || gastos.length === 0) {
    return 0; // Retorna 0 si no hay gastos o si el parámetro no es un arreglo válido.
  }

  const total = gastos.reduce((total, gasto) => {
    // Verifica si el monto es un número válido y positivo
    if (typeof gasto.monto === 'number' && gasto.monto > 0) {
      return total + gasto.monto;
    }
    // Si el monto no es válido, simplemente lo ignoramos
    return total;
  }, 0);

  // Redondea el total a 2 decimales para mostrar una cifra más legible
  return Math.round(total * 100) / 100;
};
