const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.btn'));
const clearBtn = document.getElementById('clear');

let firstOperand = null;
let operator = null;
let awaitingSecond = false;
let activeOpBtn = null;
let errorState = false; // bloqueia entradas quando ocorrer erro (ex.: divisão por zero)

function setActiveOperatorButton(btn) {
  if (activeOpBtn) activeOpBtn.classList.remove('active');
  activeOpBtn = btn || null;
  if (activeOpBtn) activeOpBtn.classList.add('active');
}

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

function inputDigit(digit) {
  if (errorState) return; //
  if (awaitingSecond) {
    display.value = digit;
    awaitingSecond = false;
  } else {
    display.value = display.value === '0' ? digit : display.value + digit;
  }
}

function inputDecimal() {
  if (errorState) return;
  if (awaitingSecond) {
    display.value = '0.';
    awaitingSecond = false;
    return;
  }
  if (!display.value.includes('.')) {
    display.value += '.';
  }
}

function handleOperator(nextOperator) {
  if (errorState) return;
  const inputValue = parseFloat(display.value);

  if (operator && awaitingSecond) {
    operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    const { error, result } = compute(firstOperand, operator, inputValue);
    if (error) {
      display.value = 'Erro: ' + error;
      errorState = true;
      setActiveOperatorButton(null);
      return;
    }
    display.value = String(result);
    firstOperand = result;
  }

  awaitingSecond = true;
  operator = nextOperator;
}

function handleEquals() {
  if (errorState) return;
  const inputValue = parseFloat(display.value);
  if (operator == null || firstOperand == null || awaitingSecond) return;

  const { error, result } = compute(firstOperand, operator, inputValue);
  if (error) {
    display.value = 'Erro: ' + error;
    errorState = true;
    setActiveOperatorButton(null);
    return;
  }

  display.value = String(result);
  firstOperand = null;
  operator = null;
  awaitingSecond = false;

  setActiveOperatorButton(null);
}

function clearAll() {
  display.value = '0';
  firstOperand = null;
  operator = null;
  awaitingSecond = false;
  errorState = false;
  setActiveOperatorButton(null);
}

buttons.forEach(btn => {
  const val = btn.dataset.value;

  if (btn.classList.contains('op')) {
    btn.addEventListener('click', () => {
      handleOperator(btn.dataset.value);
      setActiveOperatorButton(btn);
    });
  } else if (val === '=') {
    btn.addEventListener('click', handleEquals);
  } else if (val === '.') {
    btn.addEventListener('click', inputDecimal);
  } else if (val === 'C' || btn.classList.contains('clear')) {
  } else {
    btn.addEventListener('click', () => {
      inputDigit(val);
    });
  }
});

clearBtn.addEventListener('click', clearAll);

if (typeof module !== 'undefined') {
  module.exports = { inputDigit, inputDecimal, handleOperator, handleEquals, clearAll, compute };
}
