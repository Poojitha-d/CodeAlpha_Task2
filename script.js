const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let expression = '';

function updateDisplay() {
  display.value = expression || '0';
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === 'C') {
      expression = '';
    } else if (value === 'Back') {
      expression = expression.slice(0, -1);
    } else if (value === '=') {
      try {
        expression = eval(expression).toString();
      } catch {
        expression = 'Error';
      }
    } else {
      if (expression === 'Error') expression = '';
      expression += value;
    }

    updateDisplay();
  });
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || "+-*/.".includes(e.key)) {
    if (expression === 'Error') expression = '';
    expression += e.key;
  } else if (e.key === 'Enter') {
    try {
      expression = eval(expression).toString();
    } catch {
      expression = 'Error';
    }
  } else if (e.key === 'Backspace') {
    expression = expression.slice(0, -1);
  } else if (e.key === 'Escape') {
    expression = '';
  }

  updateDisplay();
});

updateDisplay();
