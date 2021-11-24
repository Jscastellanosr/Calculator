
let firstOp = '';
let secondOp = '';
let currentOp = null;
let ShouldReset = false;



const button = document.querySelectorAll('button');            //all buttons
const displ = document.querySelector('.screen');               //main screen
const histo = document.querySelector('.history');              //history screen
const numb = document.querySelectorAll('.numbers .key');       //numbers
const operator = document.querySelectorAll(".operators .key"); //operators
const equal = document.querySelector(".equal")                   //=
const clean = document.querySelector(".c");                  //C
const del = document.querySelector(".del");                  //del
const point = document.querySelector(".point");              //point

window.addEventListener('keydown', keyboardInput);
equal.addEventListener('click', evaluate);
clean.addEventListener('click', clear);
del.addEventListener('click', delNumber);
point.addEventListener('click', appendPoint);

numb.forEach(numb => {
    numb.addEventListener('click', () => appendNum(numb.textContent));
})

operator.forEach(button => {
    button.addEventListener('click', () => setOp(button.textContent));
})


window.addEventListener('keyup', (e) => {
    const key = document.querySelector(`.key[key-id="${e.keyCode}"]`)
    key.classList.remove("pressed");
})

button.forEach(button => button.addEventListener('mousedown', () => {
    button.classList.add('pressed')
}));

button.forEach(button => button.addEventListener('transitionend', () => button.classList.remove('pressed')));


function keyboardInput(e) {
    console.log(e.key);
    const key = document.querySelector(`[key-id="${e.keyCode}"]`)
    key.classList.add("key");
    key.classList.add("pressed");
    if(e.key >= 0 && e.key <= 9) appendNum(e.key)
    if(e.key === ".") appendPoint()
    if(e.key === "=" || e.key === 'Enter') evaluate()
    if(e.key === "Backspace") delNumber();
    if(e.key === "Delete") clear()
    if(e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*"){
        setOp(convertOp(e.key));
    }

}


function appendNum(numb) {
    if(displ.textContent === "0" || ShouldReset)
        ResetScreen();
    displ.textContent += numb;
}

function appendPoint() {
    if(ShouldReset = true) ResetScreen();
    if(displ.textContent === "") displ.textContent = 0;
    if(displ.textContent.includes(".")) return;
    displ.textContent += ".";
}

function evaluate() {
    if(currentOp === null || ShouldReset) return;
    if(currentOp === "/" && displ.textContent === "0"){
        alert('u cant divide by 0');
        return;
    }
    secondOp = displ.textContent;
    displ.textContent = roundR(operate(firstOp, currentOp, secondOp));
    histo.textContent = `${firstOp} ${currentOp} ${secondOp} =`
    currentOp = null;
}   

function delNumber() {
    displ.textContent = displ.textContent
        .toString()
        .slice(0, -1)
}

function clear() {
    displ.textContent = '0';
    histo.textContent = '';
    firstOp = '';
    secondOp = '';
    currentOp = null;
}

function setOp(op) {
    if(displ.textContent !== null) evaluate();
    firstOp = displ.textContent;
    currentOp = op;
    ShouldReset = true;
}

function convertOp(operator) {
    if(operator === '+') return '+';
    if(operator === '-') return '-';
    if(operator === '/') return '/';
    if(operator === '*') return '*';
}




function ResetScreen() {
    displ.textContent = "";
    ShouldReset = false;
}

function roundR(value){
    return Math.round(value*1000) / 1000;
};

function operate(a, op, b) {
    a = Number(a);
    b = Number(b);
    switch(op) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            if(b === '0') return null;
            else return divide(a, b);
        default:
            return null;
    }
};

function add(a, b) {
    return a + b;
};
function substract(a, b) {
    return a - b;
};
function multiply(a, b) {
    return a * b;
};
function divide(a, b) {
    return a / b;
};
