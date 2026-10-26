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
    return (num1) / (num);
}
// calculate answer
function operate(num1, num2, operator)
{
    let n1 = parseFloat(num1);
    let n2 = parseFloat(num2);

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

// BUG: need to fix logic: the operator will not always be 3 indexes backwards from the end index
function containsOperator(string)
{
    let char = string.substring(string.length-3, string.length-1);
    if (char == "+" || char == "-" || char == "/" || char == "*")
    {
        return true;
    }
    return false;
}


let display = document.querySelector(".display-text");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");

let num1;
let num2;
let operator;
let hitEquals = false;

// display final answer
function finalAnswer()
{
    // gets the entire operation shown in the display
    let totalOperation = display.textContent;
    // finds the index of the operator
    let indexOfOp = totalOperation.indexOf(operator);
    // gets the second number, 2 indexes after the operator
    num2 = totalOperation.substring(indexOfOp + 2, totalOperation.length);
    // displays the final answer
    display.textContent = operate(num1, num2, operator);
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
            operator = operators[i].textContent;
            let currentDisplay = display.textContent;
            // if the same operator isn't the current operator in the display
            if (!currentDisplay.includes(operator))
            {
                // if there is already a different operator in the display, replace the old one with the new one
                // BUG: need to fix logic: the index where the operator is will not always be 3 indexes backwards
                if (containsOperator(display.textContent))
                {
                    display.textContent = currentDisplay.substring(0, currentDisplay - 3) + operator;
                }
                else 
                {
                    num1 = currentDisplay;
                    display.textContent += operator;
                }
                // if the number of operations is already 1 or greater, calculate and display the final answer first
                // then move on to the next calculation
                if (numOfOps >= 1){
                    finalAnswer();
                }
                numOfOps++;
            }
        }
    })
}

// clear display, clear data
let clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
    display.textContent = "Display";
    operator = "";
    num1 = "0";
    num2 = "0";
})

// when user hits =, display final answer and reset the number of ops to 0 and ste hitequals to true
let equalBtn = document.getElementById("equals");
equalBtn.addEventListener("click", () => {
    finalAnswer();
    numOfOps = 0;
    hitEquals = true;
})
