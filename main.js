const result = document.getElementById("result");
const lenghtstart = document.getElementById("lenght");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

const randompass = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboard.addEventListener("click",()=>{
    const textarea = document.createElement("textarea");
    const password = result.innerText;
    if(!password) {return;}
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});

generate.addEventListener("click", () => {
	const length = +lenghtstart.value;
	const lower = lowercase.checked;
	const upper = uppercase.checked;
	const number = numbers.checked;
	const symbol = symbols.checked;
	result.innerText = generatePassword(lower, upper, number, symbol, length);
});

function generatePassword(lower, upper, number, symbol, lenght){
    let generatedPassword = "";
    const types = [{lower}, {upper}, {number}, {symbol}].filter(item=>Object.values(item) [0]);
    typesNum = lower + upper + number + symbol;
    if (typesNum === 0){
        return"";    
    }
    for(let i=0; i<lenght; i += typesNum){
        types.forEach(type =>{
            const funcName = Object.keys(type)[0];
            generatedPassword += randompass [funcName]();
        });
    }
	return generatedPassword;

}

function getRandomLower(){
    const lower = "abcdefghijklmnopqrstuvwxyz"
    return lower[Math.floor(Math.random() * lower.length)];
}
function getRandomUpper(){
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return upper[Math.floor(Math.random() * upper.length)];
}
function getRandomNumber(){
    const numbers = "0123456789"
    return numbers[Math.floor(Math.random() * numbers.length)];
}
function getRandomSymbol(){
    const symbols = "!@#$%^&*(){}[]=<>/,."
    return symbols[Math.floor(Math.random() * symbols.length)];
}