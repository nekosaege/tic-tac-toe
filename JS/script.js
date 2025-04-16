class TicTacToe {
    constructor() {
        this.cells = document.querySelectorAll('.cell');
        this.statusText = document.querySelector('#statusText');
        this.resetButton = document.getElementById('resetButton');

        this.winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        this.options = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = "X";
        this.running = false;

        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.setAttribute('cellIndex', index);
            cell.addEventListener('click', () => this.cellClicked(cell));
        });

        this.resetButton.addEventListener('click', () => this.resetGame());
        this.statusText.textContent = `${this.currentPlayer} の番です`;
        this.running = true;
        
    }

    cellClicked(cell) {
        const cellIndex = cell.getAttribute('cellIndex');
        console.log(`Clicked cell index: ${cellIndex}`);
        console.log(`Current player: ${this.currentPlayer}`);
        console.log(cell);
        if (this.options[cellIndex] !== "" || !this.running) return;

        this.updateCell(cell, cellIndex);
        this.checkWinner();
    }
    

    updateCell(cell, index) {
        this.options[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
    }

    changePlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.statusText.textContent = `${this.currentPlayer} の番です`;
    }

    checkWinner() {
        let roundWon = false;

        for (let i = 0; i < this.winConditions.length; i++) {
            const [aIdx, bIdx, cIdx] = this.winConditions[i];
            const a = this.options[aIdx];
            const b = this.options[bIdx];
            const c = this.options[cIdx];

            if (a === "" || b === "" || c === "") continue;

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            this.statusText.textContent = `${this.currentPlayer} の勝ち！`;
            this.running = false;
        } else if (!this.options.includes("")) {
            this.statusText.textContent = `引き分け！`;
            this.running = false;
        } else {
            this.changePlayer();
        }
    }

    resetGame() {
        this.options = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = "X";
        this.statusText.textContent = `${this.currentPlayer} の番です`;
        this.cells.forEach(cell => cell.textContent = "");
        this.running = true;
    }
}

const game = new TicTacToe();