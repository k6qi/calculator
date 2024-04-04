let num1 = 0;
let num2= 0;
let operator = '';
let displayValue = '';

const buttons = document.querySelectorAll('.number-button');
const calculatorDisplay = document.querySelector('.calculator-display');

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1,num2){
    return num1 - num2;
}

function divide(num1,num2){
    return num1 - num2;
}

function multiply(num1,num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}




function operation(num1, num2, operator){
    if(operator === '+'){
        return add(num1, num2);
    }
    else if (operator === '-'){
        return subtract(num1, num2);
    }
    else if (operator === 'x'){
        return multiply(num1,num2);
    }
    else if (operator === '/'){
        return divide(num1,num2);
    }
};


buttons.forEach(button =>{
    button.addEventListener('click', ()=>{
        displayNumbers(button.value)
    })
})

function displayNumbers(num){
    displayValue += num;
    calculatorDisplay.textContent = displayValue;
}

