let inputEquation = document.querySelector('.input-equation');
let input = document.querySelector('.calculator-input');
let buttons = document.querySelectorAll('.calculator-btn');
let operatorButtons = document.querySelectorAll('.operator-btn');
let inputHistorybutton = document.querySelector('.input-history-button');
let inputHistoryList = document.querySelector('.input-history-list');
let inputHistory = document.querySelector('.input-history');
let onCalculatoritemClick = function (event) {
  let target = event.target;
  let content = target.textContent;
  let parts = content.split('=');
  let equation = parts(0);
  let result = parts(1);
};
let calculateResult = function () {
  let inputValue = input.value;
  let result = '';

  try {
    result = eval(inputValue);
  } catch (e) {
    result = 'ERROR';
  }

  if (result === 'ERROR') {
    inputEquation.innerHTML = '';
  } else {
    inputEquation.innerHTML = inputValue;
    addItemToInputHistoryList(inputValue, result);
  }

  input.value = result;
  let div = document.createElement('div');
  let equation = inputValue;

  div.textContent = `${equation}=${result}`;
  div.addEventListener('click', onInputhistorybuttonclick);
  inputHistoryList.appendChild(div);
};
let clearInput = function () {
  input.value = '';
  inputEquation.innerHTML = '';
};
let deleteLastInput = function () {
  input.value = input.value.slice(0, -1);
};
let onCalculatorButtonClick = function (event) {
  let action = event.currentTarget.textContent;

  processCalculatorWithAction(action);
};

let processCalculatorWithAction = function (action) {
  if (action === '=') {
    calculateResult();
  } else if (action === 'AC') {
    clearInput();
  } else if (action === 'DEL') {
    deleteLastInput();
  } else {
    let inputValue = input.value;
    let newValue = inputValue + action;

    input.value = newValue;
  }

  let isOperator = isLastCharacterAnOperator(input.value);

  // If the last character is an operator like / *
  // we need to disable all the operator buttons
  if (isOperator) {
    for (let i = 0; i < operatorButtons.length; i++) {
      let button = operatorButtons[i];
      button.disabled = true;
    }
  } else {
    // otherwise all buttons need to be enabled again
    for (let i = 0; i < operatorButtons.length; i++) {
      let button = operatorButtons[i];
      button.disabled = false;
    }
  }
};

for (let i = 0; i < buttons.length; i++) {
  let currentButton = buttons[i];

  currentButton.addEventListener('click', onCalculatorButtonClick);
}

// ========================
// INPUT VALIDATION
// ========================
let operators = ['+', '-', '*', '/', '.'];

let setOperatorButtonsDisabled = function (disabled) {
  for (let i = 0; i < operatorButtons.length; i++) {
    let operatorButton = operatorButtons[i];

    operatorButton.disabled = disabled;
  }
};
let isLastCharacterAnOperator = function (inputValue) {
  let operators = ['+', '-', '*', '/', '.'];
  let lastCharacter = inputValue[inputValue.length - 1];

  return operators.includes(lastCharacter);
};

function isOperator(action) {
  return operators.includes(action);
}

// ========================
// KEYBOARD
// ========================
let onBodyKeyUp = function (event) {
  let key = event.key;
  let action;

  if (key === 'Enter') {
    action = '=';
  } else if (key === 'Escape') {
    action = 'AC';
  } else if (key === 'Backspace') {
    action = 'DEL';
  } else {
    action = key;
  }

  let acceptableActions = [];

  for (let i = 0; i < buttons.length; i++) {
    let currentButton = buttons[i];
    let buttonText = currentButton.textContent;

    acceptableActions.push(buttonText);
  }

  if (acceptableActions.includes(action)) {
    processCalculatorWithAction(action);
  }
};
document.body.addEventListener('keyup', onBodyKeyUp);
let onInputhistorybuttonclick = function (event) {
  if (inputHistory.classList.contains('open')) {
    inputHistory.classList.remove('open');
  } else {
    inputHistory.classList.add('open');
  }
};
inputHistorybutton.addEventListener('click', onInputhistorybuttonclick);
