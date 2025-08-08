const displayController = (function DisplayController() {
    
    const DIM = 3;
    let p1Name = "Player 1";
    let p2Name = "Player 2";

    const initializeDisplay = () => {
        const turnElem = document.querySelector(".turn");
        turnElem.textContent = "Tic-Tac-Toe";

        const boardElem = document.querySelector(".board");
        for (let i = 0; i < DIM; i++) {
            for (let j = 0; j < DIM; j++) {
                const placeholder = document.createElement("div");
                placeholder.classList.add("cell");
                boardElem.appendChild(placeholder);
            }
        }
    };
    initializeDisplay();

    const setUpStart = () => {
        const startBtn = document.querySelector(".start");
        const namesDialog = document.querySelector("dialog");
        const formElem = document.querySelector("form");
        formElem.querySelector("#p1name").value = p1Name;
        formElem.querySelector("#p2name").value = p2Name;
        startBtn.addEventListener('click', () => {
            namesDialog.showModal();
        })
        const submitBtn = namesDialog.querySelector("#submit");
        submitBtn.addEventListener('click', (event) => {
            if (!formElem.checkValidity()) {
                formElem.reportValidity();
            } else {
                event.preventDefault();
                p1Name = formElem.querySelector("#p1name").value;
                p2Name = formElem.querySelector("#p2name").value;
                namesDialog.close(
                    formElem.querySelector("#p1name").value, 
                    formElem.querySelector("#p2name").value
                );
            }
        });
        namesDialog.addEventListener('close', () => {
            startBtn.textContent = "RESTART";
            playGame();
        });
    };
    setUpStart();

    const playGame = () => {
        const gameController = (function GameController(
            playerOneName = p1Name, 
            playerTwoName = p2Name,
            playerOneSymbol = 'X',
            playerTwoSymbol = 'O'
        ) {
            const board = (function Board() {
                const board = [];
            
                for (let i = 0; i < DIM; i++) {
                    board[i] = [];
                    for (let j = 0; j < DIM; j++) {
                        board[i].push(Cell());
                    }
                }
                const getCell = (row, col) => board[row][col];
                const getBoard = () => board;
                const placeMark = (row, col, player) => board[row][col].mark(player);
                const printBoard = () => console.log(
                    board
                    .map(row => row.map(cell => cell.getSymbol()))
                    .reduce(
                        (acc, row) => 
                            acc 
                            + row.reduce((acc, cell) => acc + cell + " ", "") 
                            + "\n", "")
                    );

                function Cell() {
                    let owner = '-';
                    const mark = (player) => owner = player;
                    const isEmpty = () => owner === '-';
                    const getSymbol = () => isEmpty() ? owner : owner.getSymbol();
                    const getPlayer = () => owner;
                    return { mark, getSymbol, isEmpty, getPlayer };
                }
            
                return { getCell, getBoard, placeMark, printBoard };
            })();

            function Player(playerNumber, playerName) {
                const number = playerNumber;
                const name = playerName;
                const symbol = number === 1 ? playerOneSymbol : playerTwoSymbol;

                const getNumber = () => number;
                const getName = () => name;
                const getSymbol = () => symbol;
                
                return { getNumber, getName, getSymbol };
            }

            const players = [Player(1, playerOneName), Player(2, playerTwoName)];

            let curPlayer = players[0];
            const getCurPlayer = () => curPlayer;

            const switchPlayer = () => curPlayer = getCurPlayer() === players[0] ? players[1] : players[0];

            const playRound = (row, col) => {
                let gameState = getGameState();
                if (gameState.state === "CONTINUE") {
                    if (board.getCell(row, col).isEmpty()) {
                        board.placeMark(row, col, getCurPlayer());
                        gameState = getGameState();
                        if (gameState.state === "CONTINUE") {
                            switchPlayer();
                        }
                        return gameState;
                    }
                    else {
                        return { state: "REDO" };
                    }
                }
                return gameState;
            }

            const getGameState = () => {
                // check rows
                if (board.getCell(0,0).getSymbol() === board.getCell(0,1).getSymbol() && 
                    board.getCell(0,1).getSymbol() === board.getCell(0,2).getSymbol() &&
                    !board.getCell(0,0).isEmpty()) 
                    return { state: "WIN", winner: board.getCell(0,0).getPlayer() };
                if (board.getCell(1,0).getSymbol() === board.getCell(1,1).getSymbol() && 
                    board.getCell(1,1).getSymbol() === board.getCell(1,2).getSymbol() &&
                    !board.getCell(1,0).isEmpty()) 
                    return { state: "WIN", winner: board.getCell(1,0).getPlayer() };
                if (board.getCell(2,0).getSymbol() === board.getCell(2,1).getSymbol() && 
                    board.getCell(2,1).getSymbol() === board.getCell(2,2).getSymbol() &&
                    !board.getCell(2,0).isEmpty()) 
                    return { state: "WIN", winner: board.getCell(2,0).getPlayer() };


                // check cols
                if (board.getCell(0,0).getSymbol() === board.getCell(1,0).getSymbol() && 
                    board.getCell(1,0).getSymbol() === board.getCell(2,0).getSymbol() &&
                    !board.getCell(0,0).isEmpty()) 
                    return { state: "WIN", winner: board.getCell(0,0).getPlayer() };
                if (board.getCell(0,1).getSymbol() === board.getCell(1,1).getSymbol() && 
                    board.getCell(1,1).getSymbol() === board.getCell(2,1).getSymbol() &&
                    !board.getCell(0,1).isEmpty()) 
                    return { state: "WIN", winner: board.getCell(0,1).getPlayer() };
                if (board.getCell(0,2).getSymbol() === board.getCell(1,2).getSymbol() && 
                    board.getCell(1,2).getSymbol() === board.getCell(2,2).getSymbol() &&
                    !board.getCell(0,2).isEmpty()) 
                    return { state: "WIN", winner: board.getCell(0,2).getPlayer() };

                // check diagonals
                if (board.getCell(0,0).getSymbol() === board.getCell(1,1).getSymbol() && 
                    board.getCell(1,1).getSymbol() === board.getCell(2,2).getSymbol() &&
                    !board.getCell(0,0).isEmpty()) 
                    return { state: "WIN", winner: board.getCell(0,0).getPlayer() };
                if (board.getCell(2,0).getSymbol() === board.getCell(1,1).getSymbol() && 
                    board.getCell(1,1).getSymbol() === board.getCell(0,2).getSymbol() &&
                    !board.getCell(2,0).isEmpty()) 
                    return { state: "WIN", winner: board.getCell(2,0).getPlayer() };

                // check tie (all spaces filled but no winner)
                if (board.getBoard()
                    .map(row => row.map(cell => !cell.isEmpty()))
                    .reduce((acc,row) => acc && row.reduce((acc,cellBool) => acc && cellBool, true), true)
                )
                    return { state: "TIE" };

                return { state: "CONTINUE"};
            }

            return { getCurPlayer, playRound, getBoard: board.getBoard }
        })(p1Name, p2Name);

        const boardElem = document.querySelector(".board");
        const turnElem = document.querySelector(".turn");
        const messageElem = document.querySelector(".message");

        const updateGameDisplay = (gameState) => {
            boardElem.textContent = "";
            messageElem.textContent = "";

            const board = gameController.getBoard();
            const curPlayer = gameController.getCurPlayer();

            for (const [nrow, row] of Object.entries(board)) {
                for (const [ncol, cell] of Object.entries(row)) {
                    const cellBtn = document.createElement("button");
                    cellBtn.classList.add("cell");
                    cellBtn.dataset.row = nrow;
                    cellBtn.dataset.col = ncol;
                    cellBtn.textContent = cell.getSymbol();
                    boardElem.appendChild(cellBtn);
                }
            }

            if (gameState !== undefined && gameState.state !== "CONTINUE") {
                if (gameState.winner !== undefined) {
                    turnElem.textContent = `${gameState.winner.getName()} won!`
                } else if (gameState.state === "TIE") {
                    turnElem.textContent = "It's a tie!";
                } else {
                    messageElem.textContent = "That spot is taken, please try again";
                }
            } else {
                turnElem.textContent = `${curPlayer.getName()}'s turn`;
            }
        }

        boardElem.addEventListener('click', event => {
            selectedRow = event.target.dataset.row;
            selectedCol = event.target.dataset.col;

            if (!selectedRow || !selectedCol) return;

            let gameState = gameController.playRound(selectedRow, selectedCol);
            updateGameDisplay(gameState);
        })

        updateGameDisplay();
    }

})();