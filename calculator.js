const calculatorContainer = document.querySelector('#calculator-container');
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator')
const clearButton = document.querySelector('[data-value="clear"]');
const equalButton = document.querySelector('[data-value="="]');
const decimalButton = document.querySelector('[data-value="."]')
const invertButton = document.querySelector('[data-value="plus-minus"]');
const backspaceButton = document.querySelector('[data-value="backspace"]');

let secondNumber = "0";
let firstNumber = "0";
let currentOperator = "";
let displayNumber = "0";
let isOperatorPressed = false;
let isEqualPressed = false;

const operations = {
    "+": function(num1, num2){
        return parseFloat(num1) + parseFloat(num2);        
    },
    "-": function(num1, num2){
        return parseFloat(num1) - parseFloat(num2);
    },
    "*": function(num1, num2){
        return parseFloat(num1) * parseFloat(num2);
    },
    "/": function(num1,num2){
        return parseFloat(num1) / parseFloat(num2);
    }
};

function calculate(num1, num2, operator){
    switch(operator){
        case "+":
        case "-":
        case "*":
        case "/":
            return operations[operator](num1,num2).toString();
    }    
};

function updateDisplay(){
    display.textContent = displayNumber;
};

const operators = ["+", "-", "/", "*"];


document.addEventListener("keydown", (event) =>{
    if(event.key >= 0 && event.key <= 9 )  {
        handleNumberInput(event.key);
    }
    if(operators.includes(event.key.toString())){
        handleOperatorInput(event.key.toString())
    };
    if(event.key.toString() === "=" || event.key.toString() === "Enter"){
        handleEqualInput();
    };
    if(event.key.toString() === "Backspace"){
        handleBackspace();
    }
    if(event.key.toString() === "Escape"){
        handleClear();
    }
})

function handleNumberInput(clickedNumber){
    if(isEqualPressed){
        firstNumber = "0";
        secondNumber = "0";
        isOperatorPressed = false;
        isEqualPressed = false;
        displayNumber = clickedNumber;
        updateDisplay();
    }
    if(!isOperatorPressed){ // no operator pressed, handling first input
        if(firstNumber === "0"){ // handle inital zero
            firstNumber = clickedNumber;
            displayNumber = firstNumber;
            updateDisplay();
        } else { // append to firstNumber if firstNumber is not 0
            firstNumber += clickedNumber;
            displayNumber = firstNumber;
            updateDisplay();
        }
    }
     else if(isOperatorPressed && secondNumber === "0"){ // operator pressed, handle inital input for second number
        secondNumber = clickedNumber;
        displayNumber = secondNumber;
        updateDisplay();
     }
    else { //if  second number is any number but 0, append any clicked number to it
        secondNumber += clickedNumber;
        displayNumber = secondNumber; 
        updateDisplay();
    }
}

function handleOperatorInput(selectedOperator){
    currentOperator = selectedOperator;

    isEqualPressed = false;
    isOperatorPressed = true;
    if(isOperatorPressed && firstNumber === "0"){
        isOperatorPressed = false;
    }
    if(isOperatorPressed && firstNumber !=="0" && secondNumber !== "0"){
    const result = calculate(firstNumber,secondNumber,selectedOperator);
    firstNumber = result;
    displayNumber = result;
    secondNumber = "0";
    updateDisplay();
} 
};

function handleEqualInput(){
    if(firstNumber === "0" && secondNumber === "0" && currentOperator === "/"){
        displayNumber = "lmfao nice try"
        updateDisplay();
    }
    if(firstNumber !== "0" && secondNumber !== "0" && currentOperator !==""){
        const result = calculate(firstNumber,secondNumber, currentOperator);
        firstNumber = result;
        displayNumber = result;
        currentOperator = "";
        secondNumber = "0";
        updateDisplay();
    }
    isEqualPressed = true;
};

function handleBackspace(){
    if(!isOperatorPressed || isEqualPressed){// handle first number
        if(firstNumber.length === 1 || (firstNumber.length === 2 && firstNumber.includes("-")) || firstNumber === ""){ // if backspace and one digit left, make the number 0, update display
            firstNumber ="0";
            displayNumber = firstNumber;
            updateDisplay();
        }else{
            firstNumber = firstNumber.slice(0,-1);
            displayNumber = firstNumber;
            updateDisplay();
        }

    }else if(secondNumber.length === 1 || (secondNumber.length === 2 && secondNumber.includes("-")) || secondNumber === "" ){
        secondNumber = "0";
        displayNumber = secondNumber;
        updateDisplay()
    } else{
        secondNumber = secondNumber.slice(0,-1);
        displayNumber = secondNumber;
        updateDisplay();
    }
}

function handleClear(){
    currentOperator = "";
    firstNumber = "0";
    secondNumber = "0";
    displayNumber = "0";
    isEqualPressed = false;
    updateDisplay();
}

numberButtons.forEach(number =>{
    number.addEventListener('click', (event) =>{
        clickedNumber = event.target.textContent.trim();
        handleNumberInput(clickedNumber);
    })
});

operatorButtons.forEach((operator =>{
    operator.addEventListener("click", (event) =>{ 
      clickedOperator = event.target.textContent.trim();
      handleOperatorInput(clickedOperator);

    })
}));

equalButton.addEventListener("click", () =>{
   handleEqualInput()
});

clearButton.addEventListener("click", () =>{
    handleClear();
});

decimalButton.addEventListener("click", () =>{
    if(!isOperatorPressed){ // handling first number
        if(!firstNumber.includes(".")){ // prevent multiple decimals
            firstNumber += ".";
            displayNumber = firstNumber;
            updateDisplay();
        } 
    }else{
        if(!secondNumber.includes("."))
        secondNumber += ".";
        displayNumber = secondNumber;
        updateDisplay();
    }
});

invertButton.addEventListener("click", () =>{
    if(!isOperatorPressed || secondNumber === "0"){ // handle first number if operator is not pressed
        firstNumber = parseFloat(firstNumber * -1).toString();
        displayNumber = firstNumber;
        updateDisplay();
    } else{ 
        secondNumber = parseFloat(secondNumber * -1).toString();
        displayNumber = secondNumber;
        updateDisplay();
    }
});


backspaceButton.addEventListener("click", () =>{
   handleBackspace()
});
