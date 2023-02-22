const words = ['johnnybravo', 'spongebob', 'donaldduck', 'rickandmorty', 'scoobydoo', 'mickeymouse', 'tomandjerry', 'bugsbunny', 'popeye', 'peppapig'];

function Hangman(words, fullGuesses) {

    //properties
    this.words = words;
    this.fullGuesses = fullGuesses;
    this.guessesRemaining = fullGuesses;
    this.wins = 0;
    this.gamesPlayed = 0;

    //method to adjust wins
    this.updateWins = (wins, gamesPlayed) => {
        this.wins += wins;
        this.gamesPlayed += gamesPlayed;

        const winString = `${this.gamesPlayed} game(s) won of ${this.wins} played.`

        document.querySelector(".container__wins").textContent = winString
    }
    //Update remaining guesses
    this.updateGuessesRemaining = () => {
        document.querySelector('.container__guessesRemaining').innerHTML = `Guesses Remaining: ${this.guessesRemaining}`

        if (this.guessesRemaining === 0) {
            this.updateWins(1, 0);
            alert('Game Over. You Lost. New game started.');
            this.startNewGame();
        }
    }
    
    this.updateLettersGuessed = (letter) => {
        {
            const para = document.createElement("p")
            para.innerHTML = letter;
            para.setAttribute('class', 'lettersGuessed__element')
            document.querySelector('.container__lettersGuessed').append(para);
        }
    }

    this.startNewGame = () => {
        //New guesses
        this.guessesRemaining = this.fullGuesses;
        this.updateGuessesRemaining();

        //Update to 0 games played and 0 games won
        this.updateWins(0, 0);

        //Choose a random word form array
       this.randomWord = this.words[Math.floor(Math.random() * words.length)];
       this.letters = this.randomWord.split("");
       this.lettersRemaining = this.letters.length;
       this.guessedLetters = [];

        const containerSlots = document.querySelector('.container__slots');
        const containerLettersGuessed = document.querySelector('.container__lettersGuessed');

        //Remove any already existing slots
        while (containerSlots.lastChild) {
            containerSlots.removeChild(containerSlots.lastChild)
        }

        //Remove all guessed letters
        while (containerLettersGuessed.lastChild) {
            containerLettersGuessed.removeChild(containerLettersGuessed.lastChild)
        }

        //Blank spaces
        this.letters.map(letter => {
            const para = document.createElement("p")
            para.setAttribute('class', 'container__slotsElement')
            para.innerHTML = "_"
            document.querySelector('.container__slots').appendChild(para)
        });
    }



this.processGuess = event => {
    const guess = event.key;

    if (!guess.match('^[a-z]$')) {
        //Unexpected inputs
        alert('Not a letter');
    } else if (this.guessedLetters.includes(guess)) {
        alert('You already guessed that letter!')
    } else if (!this.letters.includes(guess)) {
        this.guessesRemaining--;
        this.updateLettersGuessed(guess);
        this.updateGuessesRemaining();
        this.guessedLetters.push(guess);

    } else if (this.letters.includes(guess)) {
        this.updateLettersGuessed(guess);
        this.guessedLetters.push(guess);

        //Correct guesses
        [...document.querySelectorAll('.container__slotsElement')].map((x, i) => {
            if (this.letters[i] == guess) {
                x.innerHTML = guess;
                this.lettersRemaining--;
            }
        })

        // if you've guessed all the letters you won the game.
        if (this.lettersRemaining === 0) {
            this.updateWins(1, 1);
            alert("Game over. You won! New game started.");
            this.startNewGame();
        }

    } else {
        throw ('System Error')
    }
}

//initialize new game
this.startNewGame();
}

let hangman = new Hangman(words, 11);

document.body.onkeyup = event => hangman.processGuess(event);
