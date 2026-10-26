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
            // if the number of operations is already 1 or greater, calculate and display the final answer first
            // then move on to the next calculation
            if (numOfOps >= 1){
                finalAnswer();
            }
            numOfOps++;
            num1 = display.textContent;
            display.textContent += operators[i].textContent;
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
