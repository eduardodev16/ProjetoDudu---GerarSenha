const darkModeBtn = document.getElementById("dark-mode-btn");
const copyBtn = document.getElementById("copy-btn");

darkModeBtn.addEventListener("change", () => {
  if (darkModeBtn.checked) {
    document.body.classList.add("dark");
    copyBtn.src = "images/copywhite.png";
  } else {
    document.body.classList.remove("dark");
    copyBtn.src = "images/copy.png";
  }
});

const lengthInput = document.getElementById("length-input");
const lengthSlider = document.getElementById("length-slider");

lengthInput.addEventListener("input", () => {
  lengthSlider.value = lengthInput.value;
  generatePassword();
});

lengthSlider.addEventListener("input", () => {
  lengthInput.value = lengthSlider.value;
  generatePassword();
});

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const generateBtn = document.getElementById("generate-btn");
const passwordDisplay = document.getElementById("password-display");

uppercaseCheck.addEventListener("change", () => {
  generatePassword();
});
lowercaseCheck.addEventListener("change", () => {
  generatePassword();
});
numbersCheck.addEventListener("change", () => {
  generatePassword();
});
symbolsCheck.addEventListener("change", () => {
  generatePassword();
});

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
  const lower = lowercaseCheck.checked;
  const upper = uppercaseCheck.checked;
  const number = numbersCheck.checked;
  const symbol = symbolsCheck.checked;
  const length = lengthInput.value;

  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );


  if (typesCount === 0) {

    passwordDisplay.value = " Por favor, selecione uma opção abaixo...";
    return;
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);

  passwordDisplay.value = finalPassword;
}


generatePassword();


generateBtn.addEventListener("click", () => {
  generatePassword();
});


copyBtn.addEventListener("click", () => {
  const password = passwordDisplay.value;


  if (!password) {
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Senha copiada para a área de transferência");
});
