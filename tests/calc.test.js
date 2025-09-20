const { compute } = require('../src/calc');

test('soma: 2 + 3 = 5', () => {
  const { error, result } = compute(2, '+', 3);
  expect(error).toBeNull();
  expect(result).toBe(5);
});

test('subtração: 10 - 4 = 6', () => {
  const { error, result } = compute(10, '-', 4);
  expect(error).toBeNull();
  expect(result).toBe(6);
});

test('multiplicação: 6 * 7 = 42', () => {
  const { error, result } = compute(6, '*', 7);
  expect(error).toBeNull();
  expect(result).toBe(42);
});

test('divisão: 20 / 4 = 5', () => {
  const { error, result } = compute(20, '/', 4);
  expect(error).toBeNull();
  expect(result).toBe(5);
});

test('divisão por zero gera erro', () => {
  const { error, result } = compute(10, '/', 0);
  expect(error).toBe('Divisão por zero');
  expect(result).toBeNull();
});
