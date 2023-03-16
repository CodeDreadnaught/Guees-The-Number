let remainingTrials = 5;

const mainUI = document.querySelector("main"),
mainWrapperUI = document.querySelector(".main-wrapper"),
gameUI = document.querySelector(".game-section"),
guessInputUI = document.querySelector("#guess-value"),
submitButton = document.querySelector("#submit-guess"),
minNumberUI = document.querySelector(".min-number"),
maxNumberUI = document.querySelector(".max-number"),
outputMessageUI = document.querySelector(".output-message");

(function loadAllEventListners() {
    submitButton.addEventListener("click", evaluateGuess);
    guessInputUI.addEventListener("keyup", clearAlphabets);
    gameUI.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("play-again")) {
            window.location.reload();
            localStorage.clear("username");
            localStorage.clear("minimum-number");
            localStorage.clear("maximum-number");
            localStorage.clear("actual-number");
        }
    });
    document.addEventListener("DOMContentLoaded", getUserInfo);
}) ();
function getUserInfo() {
    const userInfoUI = document.createElement("form"),
    userInfoHeading = document.createElement("h1"),
    userIHText = document.createTextNode("Username"),
    usernameUI = document.createElement("input"),
    submitUIText = document.createTextNode("OK"),
    submitUserInfo = document.createElement("button");

    userInfoUI.className = "user-info d-flex fd-c jc-c ai-c",
    userInfoHeading.className = "user-info-heading mb-15 mb-13-5",
    usernameUI.type = "text",
    usernameUI.id = "username", 
    usernameUI.className = "mb-15", 
    usernameUI.placeholder = "Enter your username",
    submitUserInfo.type = "submit",
    submitUserInfo.className = "submit-user-info";

    userInfoUI.appendChild(userInfoHeading),
    userInfoUI.appendChild(usernameUI),
    userInfoUI.appendChild(submitUserInfo),
    userInfoHeading.appendChild(userIHText),
    submitUserInfo.appendChild(submitUIText);

    mainUI.insertBefore(userInfoUI, mainWrapperUI),
    userInfoUI.addEventListener("submit", storeUserInfo);
    userInfoUI.addEventListener("submit", removeUsernameInterface);
    usernameUI.addEventListener("keyup", preventSpaceAsUsername);
}
function storeUserInfo(e) {
    e.preventDefault();

    const usernameUI = document.querySelector(".user-info > input"),
    username = usernameUI.value;
    
    localStorage.setItem("username", JSON.stringify(username));
}
function removeUsernameInterface() {
    const userInfoUI = document.querySelector("form"),
    usernameUI = document.querySelector(".user-info > input"),
    username = usernameUI.value;

    if (username === "") {
        displayError("You are yet to enter a username");
    } else {
        userInfoUI.remove();
        getGameInfo();
    }
}
function displayError(error) {
    const userInfoUI = document.querySelector(".user-info"),
    errorMessage = document.createElement("div"),
    errorText = document.createTextNode(error),
    userInfoHeading = document.querySelector(".user-info-heading");

    errorMessage.className = "error-message center";
    errorMessage.appendChild(errorText);

    userInfoUI.insertBefore(errorMessage, userInfoHeading);
    setTimeout(clearError, 1300);
}
function clearError() {
    document.querySelector(".error-message").remove();
}
function preventSpaceAsUsername(e) {
    if (e.target.value === " ") {
        e.target.value = "";
    }
}
function getGameInfo() {
    let user = JSON.parse(localStorage.getItem("username"));

    const gameInfoUI = document.createElement("form"),
    firstAppIntro = document.createElement("p"),
    firstAppIntroText = document.createTextNode(`Hello ${user}, welcome to the GTN game.`),
    secondAppIntro = document.createElement("section"),
    secondAppIntroHeading = document.createElement("h4"),
    secondAppIntroHeadingText = document.createTextNode("How to Play:"),
    playInstruction = document.createElement("ul"),
    firstListItem = document.createElement("li"),
    secondListItem = document.createElement("li"),
    thirdListItem = document.createElement("li"),
    secondListItemText = document.createTextNode("Within the range of values that you have chosen, I will pick a number."),
    thirdListItemText = document.createTextNode("You will be given 5 (five) trials to guess the number that I chose."),
    confirmationSection = document.createElement("p"),
    confirmationSectionText = document.createTextNode(`Ready for this challenge, ${user}?`),
    buttonWrapper = document.createElement("section"),
    playButton = document.createElement("button"),
    playButtonText = document.createTextNode("Play");

    gameInfoUI.className = "app-intro",
    firstAppIntro.className = "app-intro-first-text mb-15 mb-13-5",
    secondAppIntro.className = "app-intro-second-text",
    secondAppIntroHeading.className = "aist-heading mb-15 mb-13-5",
    playInstruction.className = "play-instruction",
    firstListItem.className = "pi-items mb-15 mb-13-5",
    secondListItem.className = "pi-items mb-15 mb-13-5",
    thirdListItem.className = "pi-items mb-15 mb-13-5",
    confirmationSection.className = "gaming-confirmation mb-15 mb-13-5",
    buttonWrapper.className = "button-wrapper center",
    playButton.className = "play-gtn",
    playButton.type = "submit";

    firstAppIntro.appendChild(firstAppIntroText),
    secondAppIntro.appendChild(secondAppIntroHeading),
    secondAppIntroHeading.appendChild(secondAppIntroHeadingText),
    secondAppIntro.appendChild(playInstruction),
    playInstruction.appendChild(firstListItem),
    playInstruction.appendChild(secondListItem),
    secondListItem.appendChild(secondListItemText),
    playInstruction.appendChild(thirdListItem),
    thirdListItem.appendChild(thirdListItemText),
    secondAppIntro.appendChild(confirmationSection),
    confirmationSection.appendChild(confirmationSectionText),
    secondAppIntro.appendChild(buttonWrapper),
    buttonWrapper.appendChild(playButton),
    playButton.appendChild(playButtonText),
    gameInfoUI.appendChild(firstAppIntro);
    gameInfoUI.appendChild(secondAppIntro);

    firstListItem.innerHTML = `You pick any two numbers, a minimum <span><input type="number" placeholder="min" id="minimum" step="any" required></span> and a maximum <span><input type="number" placeholder="max" id="maximum" step="any" required></span>.`;

    mainUI.insertBefore(gameInfoUI, mainWrapperUI);
    gameInfoUI.addEventListener("submit", storeGameInfo);
    gameInfoUI.addEventListener("submit", removeGameInfoInterface);

    const minimumNumberUI = document.querySelector("#minimum"),
    maximumNumberUI = document.querySelector("#maximum");

    minimumNumberUI.addEventListener("keyup", clearAlphabets);
    maximumNumberUI.addEventListener("keyup", clearAlphabets);
}
function storeGameInfo(e) {
    e.preventDefault();

    const minimumNumberUI = document.querySelector("#minimum"),
    maximumNumberUI = document.querySelector("#maximum"),
    minimumNumber = Number(minimumNumberUI.value),
    maximumNumber = Number(maximumNumberUI.value),
    actualNumber = obtainActualNumber(minimumNumber, maximumNumber);
    
    localStorage.setItem("minimum-number", JSON.stringify(minimumNumber)),
    localStorage.setItem("maximum-number", JSON.stringify(maximumNumber)),
    localStorage.setItem("actual-number", JSON.stringify(actualNumber));

    changeRangeUI(minimumNumber, maximumNumber);
}
function removeGameInfoInterface() {
    const gameInfoUI = document.querySelector("form"),
    minimumNumberUI = document.querySelector("#minimum"),
    maximumNumberUI = document.querySelector("#maximum"),
    min = Number(minimumNumberUI.value),
    max = Number(maximumNumberUI.value);

    let rangeDifference = max - min;
    
    if (rangeDifference < 0) {
        displayGameError("Your max value should be higher than your min value");
    } else if (rangeDifference >= 0 && rangeDifference <= 9) {
        displayGameError("The difference between your max and min should be at least 10");
    } else {
        gameInfoUI.remove();
    }
}
function displayGameError(error) {
    const gameInfoUI = document.querySelector("form"),
    errorMessage = document.createElement("div"),
    errorText = document.createTextNode(error),
    gameInfoHeading = document.querySelector(".app-intro-first-text");

    errorMessage.className = "game-error-message center";
    errorMessage.appendChild(errorText);

    gameInfoUI.insertBefore(errorMessage, gameInfoHeading);
    setTimeout(clearGameError, 2300);
}
function clearGameError() {
    document.querySelector(".game-error-message").remove();
}
function changeRangeUI(min, max) {
    minNumberUI.textContent = min,
    maxNumberUI.textContent = max;
}
function evaluateGuess() {
    const min = Number(JSON.parse(localStorage.getItem("minimum-number"))),
    max = Number(JSON.parse(localStorage.getItem("maximum-number"))),
    user = JSON.parse(localStorage.getItem("username")),
    actualNumber = Number(JSON.parse(localStorage.getItem("actual-number"))),
    guessInput = Number(guessInputUI.value);

    if (isNaN(guessInput) || guessInput < min || guessInput > max) {
        displayOutputMessage(`Enter a number between ${min} and ${max}`, "red");
    } else if (guessInput === actualNumber) {
        gameOutcome(true, `Congratulations ${user}, ${actualNumber} is the correct number.`);
    } else {
        remainingTrials -= 1;
        let attempts;
        if (remainingTrials > 1) {
            attempts = "attempts";
        } else {
            attempts = "attempt";
        }
        if (remainingTrials < 1) {
            gameOutcome(false, `You have exhausted your trials ${user}, ${actualNumber} is the winning number.`);
        } else {
            guessInputUI.value = "";
            guessInputUI.style.borderColor = "red";
            displayOutputMessage(`${guessInput} is wrong, you have ${remainingTrials} ${attempts} left.`, "red");
        }
    }
}
function displayOutputMessage(outputMessage, color) {
    outputMessageUI.textContent = outputMessage;
    outputMessageUI.style.color = color;
}
function gameOutcome(win, message) {
   let color, submitButtonText;
    win === true ? color = "green" : color = "red";
    win === true ? submitButtonText = "You Win!" : submitButtonText = "Game Over!";
        
    guessInputUI.disabled = true;
    guessInputUI.style.borderColor = color;
    submitButton.style.background = color;
    submitButton.textContent = submitButtonText;
    displayOutputMessage(message, color);

    setTimeout(() => {
        submitButton.textContent = "Play Again";
        submitButton.classList.add("play-again");
        submitButton.style.borderColor = "black";
        submitButton.style.background = "black";
        submitButton.removeEventListener("click", evaluateGuess);
    }, 1500);
}
function clearAlphabets(e) {
    if (e.target.value === "") {
        e.target.value = "";
    }
}
function obtainActualNumber(min, max) {
    return Math.floor(Math.random()*(max - min)) + min;
}
