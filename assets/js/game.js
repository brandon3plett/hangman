//Alphabet array
let alphabet = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L",
    "Z", "X", "C", "V", "B", "N", "M"
];

//Game word list
let wordList = ["sonic", "tails", "emeralds", "robotnik", "eggman", "zone", "act", "rings", "shield", "mobius", "amy",
    "shadow", "knuckles", "silver", "rouge"];

//Game counters
let wins = 0;
let losses = 0;
let guessesRemaining = 9;

//Other global variables
let wordToGuess = "";
let lettersInWord = []; //Empty array to hold the letters in word
let numOfBlanks = []; //Empty array that has the number of blanks
let underscores = document.getElementById("underscores"); //Grabbing underscores id and setting to variable
let underScores = []; //Array that holds the undescores
let guessesremaining = document.getElementById("guesses-remaining"); //Grabbing guesses-remaining id and setting to variable
let wrongguesses = document.getElementById("wrong-guesses"); //Grabbing wrong-guesses id and setting to variable
let wrongGuesses = []; //Array for holding wrong guesses


//Function to dynamically create keys to page
createKeys = () => {
    alphabet.slice(0, 10).forEach((letter) => {
        let key = document.createElement("button");
        key.className = "key";
        document.getElementById("first-row").appendChild(key).textContent = letter;
        key.addEventListener("click", () => {
            //console.log(letter)
            let lettersGuessed = key.textContent.toLowerCase();
            checkLetters(lettersGuessed);
            roundOver();
        });
    });

    alphabet.slice(10, 19).forEach((letter) => {
        let key = document.createElement("button");
        key.className = "key";
        document.getElementById("second-row").appendChild(key).textContent = letter;
        key.addEventListener("click", () => {
            //console.log(letter)
            let lettersGuessed = key.textContent.toLowerCase();
            checkLetters(lettersGuessed);
            roundOver();
        });
    });

    alphabet.slice(19, 26).forEach((letter) => {
        let key = document.createElement("button");
        key.className = "key";
        document.getElementById("third-row").appendChild(key).textContent = letter;
        key.addEventListener("click", () => {
            //console.log(letter)
            let lettersGuessed = key.textContent.toLowerCase();
            checkLetters(lettersGuessed);
            roundOver();
        });
    });
};

//Function for starting the game
startGame = () => {

    //Determines which word will be randomly guessed from the word list array
    let random = Math.floor(Math.random() * wordList.length);
    wordToGuess = wordList[random];

    lettersInWord = wordToGuess.split("");
    numOfBlanks = lettersInWord.length;

    guessesRemaining = 10;
    wrongGuesses = [];
    underScores = [];

    for (let l = 0; l < wordToGuess.length; l++) {
        underScores.push("_");
    }

    underscores.textContent = underScores.join(" ");
    guessesremaining.textContent = guessesRemaining;
    document.getElementById("wins").textContent = wins;
};

//Function for checking the letters
checkLetters = (letter) => {

    let correctLetter = false;

    for (let l = 0; l < numOfBlanks; l++) {
        if (wordToGuess[l] === letter) {
            correctLetter = true;
        }
    }

    if (correctLetter) {
        for (let j = 0; j < numOfBlanks; j++) {
            if (wordToGuess[j] === letter) {
                underScores[j] = letter;
            }
        }
    } else if (!correctLetter && wrongGuesses.includes(letter)) {
        console.log("Been here all along")
    } else {
        wrongGuesses.push(letter);
        guessesRemaining--
    }
};

//Function for selecting a letter with the keyboard
keyUp = () => {
    document.onkeyup = (event) => {
        let lettersGuessed = event.which;
        if (event.which >= 65 && event.which <= 90) {
            lettersGuessed = event.key;
            checkLetters(lettersGuessed);
        } else {
            console.log("Not a letter.  Guess again")
        }
        roundOver();
    };
};

//Function for handling the end of the round
roundOver = () => {

    let modal = document.getElementById("modal");

    guessesremaining.textContent = guessesRemaining;
    underscores.textContent = underScores.join(" ");
    wrongguesses.textContent = wrongGuesses.join(" ");


    //If the users wins...
    if (lettersInWord.toString() == underScores.toString()) {
        wins++;
        document.getElementById("wins").textContent = wins;
        modal.style.display = "block";
        document.getElementById("modal-text").textContent =
            "Way past cool!  You guessed \"" + wordToGuess.toUpperCase() + "\" correctly!  Go again?";
        document.onkeyup = null; //Prevents keys from being pressed after round is over
        playAgain();
    }

    //If the user loses...
    else if (guessesRemaining == 0) {
        losses++;
        document.getElementById("losses").textContent = losses;
        modal.style.display = "block";
        document.getElementById("modal-text").textContent =
            "Not cool! You're out of guesses!  The word was \"" + wordToGuess.toUpperCase() + "\". Try again?";
        document.onkeyup = null; //Prevents keys from being pressed after round is over
        playAgain();
    }
};

//Function for moving to next round
playAgain = () => {
    let yes = document.getElementById("yes");
    let no = document.getElementById("no");

    selectYes = yes.addEventListener("click", () => {
        modal.style.display = "none";
        startGame();
        wrongguesses.textContent = ""
        keyUp();
    })

    selectNo = no.addEventListener("click", () => {
        modal.style.display = "none";
        document.onkeyup = null; //Prevents keys from being pressed after selecting no
        document.getElementById("keys").style.display = "none";
    });
}

//Function calls
createKeys();
startGame();
keyUp();
