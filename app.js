const numbers = document.querySelectorAll(".numbers p");
const screen = document.querySelector('.screen');

let result = false; // Flag to indicate if the result has been calculated
let operatorPressed = false; // Flag to track if an operator was pressed after a result

numbers.forEach(number => {
    number.addEventListener('click', e => {
        
        const numberToAdd = number.innerHTML.trim();
        const isOperator = ["C", "CE", "%", "/", "x", "-", "+", "="].includes(numberToAdd);

        // Clear the screen if the result has been calculated and the next input is not an operator
        if (result && !isOperator && !operatorPressed) {
            screen.innerHTML = "";  // Clear the screen
            result = false;         // Reset the result flag
        }

        // Reset operatorPressed flag if the input is a number
        if (!isOperator) {
            operatorPressed = false;
        }

        // Clear the screen with "C"
        if (numberToAdd === "C") {
            screen.textContent = "";
            result = false;
            operatorPressed = false;
            return;
        }

        // Delete the last character with "CE"
        if (numberToAdd === "CE") {
            screen.textContent = screen.textContent.slice(0, -1);
            return;
        }

        // Calculate the result with "="
        if (numberToAdd === "=") {
            let expression = screen.textContent.replace(/x/g, '*'); // Replace 'x' with '*'
            try {
                const operation = eval(expression);  // Evaluate the expression
                screen.textContent = operation;      // Display the result
                result = true;                       // Set the result flag to true
            } catch (error) {
                screen.textContent = "Error";        // Show error if the expression is invalid
                result = true;
            }
            return;
        }

        // If an operator is pressed after a result, do not clear the screen
        if (isOperator && result) {
            result = false; // Reset the result flag to continue the operation
            operatorPressed = true; // Mark that an operator was pressed
        }

        // Add numbers and operators to the screen
        screen.innerHTML += numberToAdd;
    });
});
