// Get the display
const display = document.getElementById("display");


// =========================
// APPEND NUMBER
// =========================

function appendNumber(number) {

    if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    }
}


// =========================
// APPEND OPERATOR
// =========================

function appendOperator(operator) {

    const lastCharacter =
        display.value.charAt(display.value.length - 1);

    // Prevent multiple operators
    if ("+-*/%".includes(lastCharacter)) {
        display.value =
            display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}


// =========================
// CLEAR DISPLAY
// =========================

function clearDisplay() {
    display.value = "0";
}


// =========================
// DELETE LAST CHARACTER
// =========================

function deleteLast() {

    if (display.value.length === 1) {
        display.value = "0";
    } else {
        display.value =
            display.value.slice(0, -1);
    }
}


// =========================
// CALCULATE RESULT
// =========================

function calculate() {

    try {

        let expression = display.value;

        // Prevent calculation if expression ends with an operator
        if ("+-*/%".includes(
            expression.charAt(expression.length - 1)
        )) {
            expression = expression.slice(0, -1);
        }

        // Calculate the expression
        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        display.value = result;

    } catch (error) {

        display.value = "Error";

    }
}


// =========================
// KEYBOARD SUPPORT
// =========================

document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    // Decimal
    else if (key === ".") {
        appendNumber(".");
    }

    // Operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {
        appendOperator(key);
    }

    // Enter or =
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape
    else if (key === "Escape") {
        clearDisplay();
    }

});