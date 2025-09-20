// Módulo sem DOM com a função compute usada pela calculadora
function compute(a, op, b) {
  if (op === '+') return { error: null, result: a + b };
  if (op === '-') return { error: null, result: a - b };
  if (op === '*') return { error: null, result: a * b };
  if (op === '/') {
    if (b === 0) return { error: 'Divisão por zero', result: null };
    return { error: null, result: a / b };
  }
  return { error: 'Operador inválido', result: null };
}

module.exports = { compute };
