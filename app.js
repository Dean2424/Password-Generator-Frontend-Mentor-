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

// Chrome-specific form reset function
function chromeFormReset() {
    // Chrome sometimes persists form state, force reset
    lengthRange.value = 6;
    lengthRange.setAttribute('value', '6');
    uppercaseCheckbox.checked = false;
    uppercaseCheckbox.removeAttribute('checked');
    lowercaseCheckbox.checked = false;
    lowercaseCheckbox.removeAttribute('checked');
    numbersCheckbox.checked = false;
    numbersCheckbox.removeAttribute('checked');
    symbolsCheckbox.checked = false;
    symbolsCheckbox.removeAttribute('checked');
    passwordInput.value = "";
}

// Initialize everything when DOM is loaded
function initializeApp() {

    // Clear localStorage for testing (remove this line after testing)
    //localStorage.clear();
    
    // Chrome-specific: Force form reset first
    chromeFormReset();
    
    // Force trigger change events to ensure UI updates
    lengthRange.dispatchEvent(new Event('input', { bubbles: true }));
    
    // --- THEN ADD LOCAL STORAGE OVERRIDES ---
    if (localStorage.getItem("length")) {
        lengthRange.value = localStorage.getItem("length");
        lengthRange.setAttribute('value', localStorage.getItem("length"));
    }
    
    // Set checkboxes based on localStorage (will remain false if no localStorage data)
    if (localStorage.getItem("uppercase") === "true") {
        uppercaseCheckbox.checked = true;
        uppercaseCheckbox.setAttribute('checked', 'checked');
    }
    if (localStorage.getItem("lowercase") === "true") {
        lowercaseCheckbox.checked = true;
        lowercaseCheckbox.setAttribute('checked', 'checked');
    }
    if (localStorage.getItem("numbers") === "true") {
        numbersCheckbox.checked = true;
        numbersCheckbox.setAttribute('checked', 'checked');
    }
    if (localStorage.getItem("symbols") === "true") {
        symbolsCheckbox.checked = true;
        symbolsCheckbox.setAttribute('checked', 'checked');
    }
    
    // Debug: Log localStorage values
    console.log("localStorage values:");
    console.log("uppercase:", localStorage.getItem("uppercase"));
    console.log("lowercase:", localStorage.getItem("lowercase"));
    console.log("numbers:", localStorage.getItem("numbers"));
    console.log("symbols:", localStorage.getItem("symbols"));
    console.log("length:", localStorage.getItem("length"));
    
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

// Additional safety net for GitHub Pages - force initialization on window load
window.addEventListener('load', function() {
    setTimeout(() => {
        // Chrome-specific: Force form reset again on window load
        if (!localStorage.getItem("length") || localStorage.getItem("length") === null) {
            lengthRange.value = 6;
            lengthRange.setAttribute('value', '6');
            lengthDisplay.textContent = '6';
            updateSliderBackground();
        }
        
        // Chrome-specific: Ensure checkboxes are correct with attribute manipulation
        if (!localStorage.getItem("uppercase") || localStorage.getItem("uppercase") !== "true") {
            uppercaseCheckbox.checked = false;
            uppercaseCheckbox.removeAttribute('checked');
        }
        if (!localStorage.getItem("lowercase") || localStorage.getItem("lowercase") !== "true") {
            lowercaseCheckbox.checked = false;
            lowercaseCheckbox.removeAttribute('checked');
        }
        if (!localStorage.getItem("numbers") || localStorage.getItem("numbers") !== "true") {
            numbersCheckbox.checked = false;
            numbersCheckbox.removeAttribute('checked');
        }
        if (!localStorage.getItem("symbols") || localStorage.getItem("symbols") !== "true") {
            symbolsCheckbox.checked = false;
            symbolsCheckbox.removeAttribute('checked');
        }
        
        console.log("Chrome-specific backup initialization completed");
        console.log("Final slider value:", lengthRange.value);
        console.log("Final checkbox states:", {
            uppercase: uppercaseCheckbox.checked,
            lowercase: lowercaseCheckbox.checked,
            numbers: numbersCheckbox.checked,
            symbols: symbolsCheckbox.checked
        });
    }, 150);
    
    // Additional Chrome fix - force another update after a longer delay
    setTimeout(() => {
        if (!localStorage.getItem("length")) {
            chromeFormReset();
            lengthDisplay.textContent = lengthRange.value;
            updateSliderBackground();
            console.log("Chrome secondary reset completed");
        }
    }, 500);
});

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
    
    // Clear all localStorage data
    localStorage.clear();
    
    // Reset all checkboxes to unchecked
    uppercaseCheckbox.checked = false;
    lowercaseCheckbox.checked = false;
    numbersCheckbox.checked = false;
    symbolsCheckbox.checked = false;
    
    // Reset slider to default value
    lengthRange.value = 6;
    lengthDisplay.textContent = lengthRange.value;
    updateSliderBackground();
}