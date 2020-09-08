/* Tic-Tac-Toe functions */
var TicTacToe = {
    /* initialize the Tic-Tac-Toe variables */
    init: function() {
        this.symbols = ["X", "O"];
        this.squares = Array.from(document.querySelectorAll(".square"));
        this.turnIndicator = document.querySelector(".turnIndicator");
        this.button = document.querySelector(".newGame");
        this.board = document.querySelector(".board");
        // square positions in which you can get 3-in-a-row
        this.winningSets = [
            // horizontal sets
            [0,1,2], [3,4,5], [6,7,8],
            // vertical sets
            [0,3,6], [1,4,7], [2,5,8],
            // diagonal sets
            [0,4,8], [2,4,6]
        ];
        // add click event listeners to squares and button
        this.addEventListeners();
        // reset the game
        this.newGame();
    },

    // add click event listeners to squares and button
    addEventListeners: function() {
        var ttt = this;
        // for each square, add a click listener which will call "play()"
        this.squares.forEach(function(x) {
            x.addEventListener("click",function() {
                ttt.play(this);
            }, false)
        })
        // when the new game button is clicked, call "newGame()"
        this.button.addEventListener("click", function() {
            ttt.newGame();
        }, false);
    },

    // reset the game
    newGame: function() {
        // set player to first player (X)
        this.activePlayer = 0;
        // reset the game over variable
        this.gameOver = false;
        // remove all X and O classes from every square
        this.squares.forEach(function (x) {
            x.classList.remove(TicTacToe.symbols[0]);
            x.classList.remove(TicTacToe.symbols[1]);
        })
        // remove gameOver class from board if it exists
        this.board.classList.remove("gameOver");
        // set the turn indicator (X's turn)
        this.setTurnIndicator();
    },

    // set the turn indicator to indicate whose turn it is
    setTurnIndicator: function() {
        this.turnIndicator.innerText = this.symbols[this.activePlayer] + "'s turn."
    },

    play: function(el) {
        // make sure that the square is not filled
        if (!this.gameOver && el.classList.length == 1) {
            // set the contents to your player's symbol
            el.classList.add(this.symbols[this.activePlayer]);
            // check if you won
            if (this.checkWin()) {
                // set the game text to display the winner
                this.turnIndicator.innerText = this.symbols[this.activePlayer] + " wins!";
                // call the game over function
                this.endGame();
            }
            // check if there is a draw
            else if (this.checkDraw()) {
                // set the game text to say it is a draw
                this.turnIndicator.innerText = "It's a draw!";
                // call the game over function
                this.endGame();
            }
            // go to the next player's turn
            else {
                // change the turn (0 -> 1 or 1 -> 0)
                this.activePlayer = 1 - this.activePlayer;
                // set the turn indicator text
                this.setTurnIndicator();
            }
        }
    },

    // check if current player won
    checkWin: function() {
        var ttt = this;
        // if for any of the winning sets,
        // every square in the set is filled with
        // the current player's symbol, return true
        // otherwise, return false
        return this.winningSets.some(function (x) {
            return x.every(function(i) {
                return Array.from(ttt.squares[i].classList).indexOf(ttt.symbols[ttt.activePlayer]) > -1;
            })
        })
    },

    // check if there is a draw
    checkDraw: function() {
        // return true if every square
        // has more than 1 class (is filled)
        // otherwise, return false
        return this.squares.every(function (x) {
            return x.classList.length > 1;
        })
    },

    // set the game over variable and board class when the game ends
    endGame: function() {
        this.gameOver = true;
        this.board.classList.add("gameOver");
    }
}

// call the init() function of TicTacToe when the page loads
TicTacToe.init();