// operation functions
function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}
function divide(num1, num2)
{
    if (num2 == 0)
    {
        return "ERROR";
    }
    return (num1) / (num2);
}
// calculate answer
function operate(num1, num2, operator)
{
    let n1 = parseFloat(num1);
    let n2 = parseFloat(num2);
    console.log("Number1: " + n1);
    console.log("Number2: " + n2);

    if (operator == " + ")
    {
        return add(n1, n2);
    }
    else if (operator == " - ")
    {
        return subtract(n1, n2)
    }
    else if (operator == " * " || operator == " x ")
    {
        return multiply(n1, n2)
    }
    else if (operator == " / ")
    {
        return divide(n1, n2)
    }
}
// checks if the display conatiner an operator with or without a number after it
function containsOp(string)
{
    if (string.includes("+") || string.includes("/") || string.includes("-") || string.includes("x"))
    {
        return true;
    }
    return false;
}

// checks if the display contains another operator with no number after it
function containsOtherOperator(string)
{
    // .length -2 becuase ooperator sits at 2 indexes before the length of the string
    let char = string.substring(string.length-2, string.length-1);
    if (char == "+" || char == "-" || char == "/" || char == "x")
    {
        console.log("contains other operator: true");
        return true;
    }
    console.log("contains other operator: false");
    return false;
}


let display = document.querySelector(".display-text");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");

let num1 = "";
let num2 = "";
let operator = "";
let hitEquals = false;

// display final answer
function finalAnswer()
{
    // gets the entire operation shown in the display
    let totalOperation = display.textContent;
    // finds the index of the operator
    let indexOfOp = totalOperation.indexOf(operator);

    // gets the first number
    num1 = totalOperation.substring(0, indexOfOp);
    // gets the second number, 2 indexes after the operator
    num2 = totalOperation.substring(indexOfOp + 2, totalOperation.length);
    // displays the final answer
    display.textContent = operate(num1, num2, operator);
    num2 = "";
}

// display for numbers
for (let i = 0; i < 10; i++)
{
    numbers[i].addEventListener("click", () => {
        if (display.textContent == "Display" || hitEquals)
        {
            display.textContent = numbers[i].textContent;
            // reset hit equals to false, so display appends instead of replacing
            hitEquals = false;
        }
        else
        {
            display.textContent += numbers[i].textContent;
        }
    })
}

// tracks how many operators the user has hit
let numOfOps = 0;
// display for operators
for (let i = 1; i < operators.length - 1; i++)
{
    operators[i].addEventListener("click", () => {
        // makes sure the user doesn't do an operations with no numbers
        if (display.textContent !== "Display")
        {
            let currentDisplay = display.textContent;
            let cdLength = currentDisplay.length;
            // if the same operator isn't the current operator in the display or there is a number after the operator (checks if the last index is empty or has a number)
            if (!currentDisplay.includes(operators[i].textContent) || (currentDisplay.substring(cdLength-1, cdLength) != " "))
            {
                // if there is already a different operator in the display, replace the old one with the new one
                if (containsOtherOperator(display.textContent))
                {
                    operator = operators[i].textContent;
                    // .length - 3 because space before old operator sits 3 indexes before length of string
                    // the substring is the number already entered
                    display.textContent = currentDisplay.substring(0, cdLength - 3) + operator;
                }
                else // if there isn't an operator in the display: just a number
                {
                    // if the number of operations is already 1 or greater, calculate and display the final answer first, then move on to the next calculation
                    if (numOfOps >= 1){
                        finalAnswer();
                    }
                    operator = operators[i].textContent;
                    display.textContent += operator;
                    numOfOps++;
                }
                hitEquals = false;
            }
        }
    })
}

// clear display, clear data
let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
    display.textContent = "Display";
    operator = "";
    num1 = "";
    num2 = "";
    numOfOps = 0;
})

// when user hits =, display final answer and reset the number of ops to 0 and ste hitequals to true
let equalBtn = document.getElementById("equals");
equalBtn.addEventListener("click", () => {
    let currentDisplay = display.textContent;
    // if user hits equals too early, reset data and revert to default display
    if (currentDisplay == "Display" || currentDisplay.substring(currentDisplay.length-1, currentDisplay.length) == " " || !containsOp(currentDisplay))
    {
        display.textContent = "Display";
        operator = "";
        num1 = "";
        num2 = "";
        hitEquals = false;
    }
    else
    {
        finalAnswer();
        hitEquals = true;
    }
    numOfOps = 0;
})

