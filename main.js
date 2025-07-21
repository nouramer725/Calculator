let expression = "";
let history = [];

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

    // Add to history
    history.unshift(`${expression} = ${result}`);
    updateHistory();

    expression = result.toString(); // Allow chained calculations
  } catch {
    document.getElementById("result").innerText = "Error";
  }
}

function updateHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  history.slice(0, 10).forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function toggleHistory() {
  const container = document.getElementById("historyContainer");
  container.style.display =
    container.style.display === "none" ? "block" : "none";
}

function clearHistory() {
  history = [];
  document.getElementById("historyList").innerHTML = "";
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

function applyFunction(func) {
  let current = parseFloat(
    document.getElementById("result").innerText || expression
  );
  if (isNaN(current)) {
    alert("Please calculate a value first.");
    return;
  }

  let result;
  switch (func) {
    case "sin":
      result = Math.sin(current);
      break;
    case "cos":
      result = Math.cos(current);
      break;
    case "tan":
      result = Math.tan(current);
      break;
    case "sqrt":
      result = Math.sqrt(current);
      break;
    case "square":
      result = Math.pow(current, 2);
      break;
    case "inverse":
      result = 1 / current;
      break;
    case "log":
      result = Math.log10(current);
      break;
    case "ln":
      result = Math.log(current);
      break;
    default:
      return;
  }

  document.getElementById("expression").innerText = `${func}(${current})`;
  document.getElementById("result").innerText = result;

  history.unshift(`${func}(${current}) = ${result}`);
  updateHistory();
}
