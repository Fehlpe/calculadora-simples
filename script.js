const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.btn'));
const clearBtn = document.getElementById('clear');

let firstOperand = null;
let operator = null;
let awaitingSecond = false;
let activeOpBtn = null;

function setActiveOperatorButton(btn) {
  if (activeOpBtn) activeOpBtn.classList.remove('active');
  activeOpBtn = btn || null;
  if (activeOpBtn) activeOpBtn.classList.add('active');
}

function inputDigit(digit) {
  if (awaitingSecond) {
    display.value = digit;
    awaitingSecond = false;
  } else {
    display.value = display.value === '0' ? digit : display.value + digit;
  }
}

function inputDecimal() {
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
  const inputValue = parseFloat(display.value);

  if (operator && awaitingSecond) {
    operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    let result = firstOperand;
    if (operator === '+') {
      result = firstOperand + inputValue;
    } else if (operator === '-') {
      result = firstOperand - inputValue;
    } else if (operator === '*') {
      result = firstOperand * inputValue;
    } else if (operator === '/') {
      result = firstOperand / inputValue;
    }
    display.value = String(result);
    firstOperand = result;
  }

  awaitingSecond = true;
  operator = nextOperator;
}

function handleEquals() {
  const inputValue = parseFloat(display.value);
  if (operator == null || firstOperand == null || awaitingSecond) return;

  let result = firstOperand;
  if (operator === '+') {
    result = firstOperand + inputValue;
  } else if (operator === '-') {
    result = firstOperand - inputValue;
  } else if (operator === '*') {
    result = firstOperand * inputValue;
  } else if (operator === '/') {
    result = firstOperand / inputValue;
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
  module.exports = { inputDigit, inputDecimal, handleOperator, handleEquals, clearAll };
}
