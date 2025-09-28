//Logic
const characters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "a","b","c","d","e","f","g","h","i","j","k","l","m",
  "n","o","p","q","r","s","t","u","v","w","x","y","z",
  "0","1","2","3","4","5","6","7","8","9",
  "!","@","#","$","%","^","&","*","(",")",
  "-","_","=","+","[","]","{","}","|",";",
  ":","'",'"',",",".","<",">","/","?","`","~","\\"
];
const numOfPasswordCharacters = 15;
let randomPasswordCharacters = [];
let randomPassword = [];


//DOM Elements
const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const generateBtn = document.getElementById("generate-password");
const lengthRange = document.getElementById("length");
const lengthDisplay = document.getElementById("password-length");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const copiedMessage = document.getElementById("copied-message");
const strengthIndicator = document.getElementById("strength-indicator");
const clearBtn = document.getElementById("clear-btn");

// Initialize everything when DOM is loaded
function initializeApp() {

    // --- ADD LOCAL STORAGE ---
    if (localStorage.getItem("length")) {
        lengthRange.value = localStorage.getItem("length");
    }
    if (localStorage.getItem("uppercase")) uppercaseCheckbox.checked = (localStorage.getItem("uppercase") === "true");
    if (localStorage.getItem("lowercase")) lowercaseCheckbox.checked = (localStorage.getItem("lowercase") === "true");
    if (localStorage.getItem("numbers")) numbersCheckbox.checked = (localStorage.getItem("numbers") === "true");
    if (localStorage.getItem("symbols")) symbolsCheckbox.checked = (localStorage.getItem("symbols") === "true");
    if (localStorage.getItem("password")) {
        passwordInput.value = localStorage.getItem("password");
        updateStrengthIndicator(passwordInput.value);
    }

    // Initialize display and slider background
    lengthDisplay.textContent = lengthRange.value;
    updateSliderBackground();
    
    // Initialize strength indicator
    if (passwordInput.value === "") {
        resetStrengthIndicator();
    } else {
        updateStrengthIndicator(passwordInput.value);
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

//Character Length
lengthRange.addEventListener("input", function() {
    lengthDisplay.textContent = lengthRange.value;
    updateSliderBackground();
    //generatePassword(); 
});

//Character Sets
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~\\";

//Event Listeners
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
clearBtn.addEventListener("click", clearPassword);

//Update Slider Background Function
function updateSliderBackground() {
    // Ensure the range element exists and has valid values
    if (!lengthRange || !lengthRange.min || !lengthRange.max || !lengthRange.value) {
        // If elements aren't ready, try again in a moment
        setTimeout(updateSliderBackground, 10);
        return;
    }
    
    const min = parseInt(lengthRange.min) || 6;
    const max = parseInt(lengthRange.max) || 20;
    const val = parseInt(lengthRange.value) || 6;

    const percent = ((val - min) / (max - min)) * 100;

    lengthRange.style.background = `linear-gradient(90deg, #A4FFAF ${percent}%, #18171F ${percent}%)`;
}

//Generate Password Function
function generatePassword(e) {
if (e) e.preventDefault();

//Clear Out Input
randomPasswordCharacters = [];
randomPassword = [];

//Get Desired Password Length
const numOfPasswordCharacters = parseInt(lengthRange.value);

//Build Character Set Based on Checkboxes
let characterSet = "";
if (uppercaseCheckbox && uppercaseCheckbox.checked) characterSet += uppercase;
if (lowercaseCheckbox && lowercaseCheckbox.checked) characterSet += lowercase;
if (numbersCheckbox && numbersCheckbox.checked) characterSet += numbers;
if (symbolsCheckbox && symbolsCheckbox.checked) characterSet += symbols;


//If No Boxes Checked, Clear Password
if (characterSet === "") {
    passwordInput.value = "";
    alert("Please select a box");
    return;
}

//For Loop
for (let i = 0; i < numOfPasswordCharacters; i++) {

let randomIndex = Math.floor(Math.random() * characterSet.length);

randomPasswordCharacters.push(randomIndex);
randomPassword.push(characterSet[randomIndex]);
}
passwordInput.value = randomPassword.join("");
updateStrengthIndicator(passwordInput.value);

// Save password and settings to localStorage
localStorage.setItem("password", passwordInput.value);
localStorage.setItem("length", lengthRange.value);
localStorage.setItem("uppercase", uppercaseCheckbox.checked);
localStorage.setItem("lowercase", lowercaseCheckbox.checked);
localStorage.setItem("numbers", numbersCheckbox.checked);
localStorage.setItem("symbols", symbolsCheckbox.checked);
}

//Copy Button Function
function copyPassword () {

passwordInput.select();
document.execCommand("copy");

copiedMessage.classList.add("show");

//Hide after 1 second
setTimeout(() => {
    copiedMessage.classList.remove("show");
}, 2000);
}


//Strength Indicator Function
function updateStrengthIndicator(password) {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (password.length >= 12) strength++;
// Strength colors and text
const strengthColors = ["#ff4d4d", "#ff944d", "#ffe44d", "#a4ffaf", "#4da6ff"];
const strengthText = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];

// Update strength text (left of bars)
const strengthTextElem = document.querySelector(".strength");
if (strengthTextElem) {
strengthTextElem.textContent = `Strength: ${strengthText[strength] || "Very Weak"}`;
strengthTextElem.style.color = strengthColors[strength] || "#ff4d4d";
}

// Update the str bars
const bars = document.querySelectorAll(".meter-boxes .str");
bars.forEach((bar, idx) => {
bar.style.background = idx < strength ? strengthColors[strength] : "#18171F";
bar.style.transition = "background 0.3s";
});
}
//Reset Strength Indicator
function resetStrengthIndicator() {
    const strengthTextElem = document.querySelector(".strength");
    if (strengthTextElem) {
        strengthTextElem.textContent = "Strength:";
        strengthTextElem.style.color = "#817D92"; // default color
    }
    const bars = document.querySelectorAll(".meter-boxes .str");
    bars.forEach(bar => {
        bar.style.background = "#18171F"; // default bar color
        bar.style.transition = "background 0.3s";
    });
}

//Clear Button Function
function clearPassword() {
    passwordInput.value = "";
    resetStrengthIndicator();
    localStorage.setItem("password", "");
}