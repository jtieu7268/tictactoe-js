const gameController = (function GameController(
    playerOneName = "Player 1", 
    playerTwoName = "Player 2",
    playerOneSymbol = 'X',
    playerTwoSymbol = 'O'
) {
    const board = (function Board() {
        const DIM = 3;
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
    
            return { mark, getSymbol, isEmpty };
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

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getCurPlayer().getName()}'s turn`);
    }

    const playRound = (row, col) => {
        if (getGameState().state !== "CONTINUE") {
            console.log("GAME OVER");
            return;
        }
        if (board.getCell(row, col).isEmpty()) {
            board.placeMark(row, col, getCurPlayer());
            if (getGameState().state === "CONTINUE" ) {
                switchPlayer();
                printNewRound()
            } else {
                board.printBoard();
                console.log(getGameState());
                return;
            }
        }
        else {
            console.log("That spot is taken, try again.");
        }
    }

    const getGameState = () => {
        // check rows
        if (board.getCell(0,0) === board.getCell(0,1) && 
            board.getCell(0,1) === board.getCell(0,2) &&
            !board.getCell(0,0).isEmpty()) 
            return { state: "WIN", winner: board.getCell(0,0)};
        if (board.getCell(1,0) === board.getCell(1,1) && 
            board.getCell(1,1) === board.getCell(1,2) &&
            !board.getCell(1,0).isEmpty()) 
            return { state: "WIN", winner: board.getCell(0,1)};
        if (board.getCell(2,0) === board.getCell(2,1) && 
            board.getCell(2,1) === board.getCell(2,2) &&
            !board.getCell(2,0).isEmpty()) 
            return { state: "WIN", winner: board.getCell(0,2)};


        // check cols
        if (board.getCell(0,0) === board.getCell(1,0) && 
            board.getCell(1,0) === board.getCell(2,0) &&
            !board.getCell(0,0).isEmpty()) 
            return { state: "WIN", winner: board.getCell(0,0)};
        if (board.getCell(0,1) === board.getCell(1,1) && 
            board.getCell(1,1) === board.getCell(2,1) &&
            !board.getCell(0,1).isEmpty()) 
            return { state: "WIN", winner: board.getCell(0,1)};
        if (board.getCell(0,2) === board.getCell(1,2) && 
            board.getCell(1,2) === board.getCell(2,2) &&
            !board.getCell(0,2).isEmpty()) 
            return { state: "WIN", winner: board.getCell(0,2)};

        // check diagonals
        if (board.getCell(0,0) === board.getCell(1,1) && 
            board.getCell(1,1) === board.getCell(2,2) &&
            !board.getCell(0,0).isEmpty()) 
            return { state: "WIN", winner: board.getCell(0,0) };
        if (board.getCell(2,0) === board.getCell(1,1) && 
            board.getCell(1,1) === board.getCell(0,2) &&
            !board.getCell(2,0).isEmpty()) 
            return { state: "WIN", winner: board.getCell(2,0) };

        // check tie (all spaces filled but no winner)
        if (board.getBoard()
            .map(row => row.map(cell => !cell.isEmpty()))
            .reduce((acc,row) => acc && row.reduce((acc,cellBool) => acc && cellBool, true), true)
        )
            return { state: "TIE" };

        return { state: "CONTINUE"};
    }

    printNewRound();
    // playRound(1,1);
    // playRound(0,2);
    // playRound(0,0);
    // playRound(0,0);
    // playRound(2,2);
    // playRound(1,2);
    // playRound(2,1);
    // playRound(1,0);
    // playRound(2,0);

    playRound(0,2);
    playRound(0,0);
    playRound(0,1);
    playRound(1,1);
    playRound(1,0);
    playRound(0,2);
    playRound(2,1);
    playRound(1,2);
    playRound(2,2);
    playRound(2,0);

    return { getCurPlayer, playRound }
})();