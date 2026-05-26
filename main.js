const intro_Game = document.querySelector(".intro_game");
const start_Game = document.querySelector(".play_game");
const container_Game = document.querySelector(".container");
const hangmanImage = document.querySelector(".hangman-box img");
const correctWord = document.querySelector(".content b");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const game_modal = document.querySelector(".game-modal");
const play_Again = document.querySelector(".play-again");
let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuess = 6;

start_Game.addEventListener("click", ()=>{
    intro_Game.classList.add("hidden");
    container_Game.classList.add("show");
    getRandomWord();
})

// 5) After User Clicks on Button (Play Again), Calling This Function
const resetGame = () => {
    // Resetting All Game Variables And UI Elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuess}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letters"></li>`).join("");
    game_modal.classList.remove("show");
}

// 1) Get Random Word
const getRandomWord = () => {
    // Selecting a Random Word And Hint From The WordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentWord = word;
    document.querySelector(".hint-text b").innerHTML = hint;
    if(currentWord.length>3&& currentWord.length<=5){document.querySelector(".level b").innerHTML = `Easy`;}
    else if(currentWord.length>5 && currentWord.length<=9){document.querySelector(".level b").innerHTML = `Medium`;}
    else if(currentWord.length>=10){document.querySelector(".level b").innerHTML = `Hard`;}
    resetGame();
}

// 4) Calling This Function If Any Of These Condition Meets
const gameOver = (isVictory)=>{
    // After 600ms of game complete.. showing modal with relevant details
    setTimeout(()=>{
        const modalText = isVictory ? `You Found The Word:` : `The Correct Word Was`;
        game_modal.querySelector("img").src = `images/${isVictory ? "victory" : "lost"}.gif`;
        game_modal.querySelector("h4").innerText = `${isVictory ? "Great Job" : "Game Over"}`;
        game_modal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        game_modal.classList.add("show");
    }, 600) 
}

// ClickedLetter => (This Is Letter That user Click It)
// 3) Checking the button After Clicking It
const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)){
        console.log(clickedLetter + " is exist on the word");
        // Showing All Correct Letters On The Word Display
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        // if clicked letter doesn`t exist then update the wrongGuessCount and hangman Image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuess}`;
    button.disabled = true;
    // Calling gameOver Function If Any Of These Condition Meets
    if(wrongGuessCount === maxGuess) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

// 2) Creating Keyboard Buttons And Adding Event Listeners
for(let i=97; i<=122; i++){
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e=> initGame(e.target, String.fromCharCode(i)));
}

// getRandomWord();
play_Again.addEventListener("click", getRandomWord);