let expression = "";

function appendValue(val) {
  expression += val;
  document.getElementById("expression").innerText = expression;
}

function clearDisplay() {
  expression = "";
  document.getElementById("expression").innerText = "";
  document.getElementById("result").innerText = "";
}

function deleteLast() {
  expression = expression.slice(0, -1);
  document.getElementById("expression").innerText = expression;
}

function calculate() {
  try {
    const result = eval(expression);
    document.getElementById("result").innerText = result;
  } catch {
    document.getElementById("result").innerText = "Error";
  }
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  } else if (key === "=") {
    calculate();
  }
});
