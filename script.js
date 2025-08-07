const playerOneSymbol = 'X';
const playerTwoSymbol = 'O';

function Player(playerNumber, playerName) {
    const number = playerNumber;
    const name = playerName;
    const symbol = number === 1 ? playerOneSymbol : playerTwoSymbol;

    const getNumber = () => number;
    const getName = () => name;
    const getSymbol = () => symbol;
    
    return { getNumber, getName, getSymbol };
}

const gameController = (function GameController(
    playerOneName = "Player 1", 
    playerTwoName = "Player 2"
) {
    const board = (function Board() {
        const DIM = 3;
        const board = [];
    
        for (let i = 0; i < DIM; i++) {
            board[i] = [];
            for (let j = 0; j < DIM; j++) {
                board[i].push('-');
            }
        }

        const isCellEmpty = (row, col) => board[row][col] === '-';

        const getCell = (row, col) => board[row][col];

        const getBoard = () => board;
    
        const placeMove = (row, col, player) => {
            board[row][col] = player.getSymbol();
        }
    
        const printBoard = () => console.log(
            board.reduce(
                (acc, row) => 
                    acc 
                    + row.reduce((acc, cur) => acc + cur + " ", "") 
                    + "\n", ""));
    
        return { isCellEmpty, getCell, getBoard, placeMove, printBoard };
    })();

    const players = [Player(1, playerOneName), Player(2, playerTwoName)];

    let curPlayer = players[0];
    const getCurPlayer = () => curPlayer;

    const switchPlayer = () => curPlayer = getCurPlayer() === players[0] ? players[1] : players[0];

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getCurPlayer().getName()}'s turn`);
    }

    const playRound = (row, col) => {
        board.placeMove(row, col, getCurPlayer());
        const gameState = getGameState();
        if (gameState.state === "CONTINUE" ) {
            switchPlayer();
        } else {
            return;
        }
    }

    const getGameState = () => {
        if (board.getCell(0,0) === board.getCell(1,0) && 
            board.getCell(1,0) === board.getCell(2,0) &&
            !board.isCellEmpty(0,0)) 
            return { state: "WIN", winner: board.getCell(0,0)};
        if (board.getCell(0,1) === board.getCell(1,1) && 
            board.getCell(1,1) === board.getCell(2,1) &&
            !board.isCellEmpty(0,1)) 
            return { state: "WIN", winner: board.getCell(0,1)};
        if (board.getCell(0,2) === board.getCell(1,2) && 
            board.getCell(1,2) === board.getCell(2,2) &&
            !board.isCellEmpty(0,2)) 
            return { state: "WIN", winner: board.getCell(0,2)};

        if (board.getCell(0,0) === board.getCell(1,0) && 
            board.getCell(1,0) === board.getCell(2,0) &&
            !board.isCellEmpty(0,0)) 
            return { state: "WIN", winner: board.getCell(0,0)};
        if (board.getCell(0,1) === board.getCell(1,1) && 
            board.getCell(1,1) === board.getCell(2,1) &&
            !board.isCellEmpty(0,1)) 
            return { state: "WIN", winner: board.getCell(0,1)};
        if (board.getCell(0,2) === board.getCell(1,2) && 
            board.getCell(1,2) === board.getCell(2,2) &&
            !board.isCellEmpty(0,2)) 
            return { state: "WIN", winner: board.getCell(0,2)};

        if (board.getCell(0,0) === board.getCell(1,1) && 
            board.getCell(1,1) === board.getCell(2,2) &&
            !board.isCellEmpty(0,0)) 
            return { state: "WIN", winner: board.getCell(0,0) };
        if (board.getCell(2,0) === board.getCell(1,1) && 
            board.getCell(1,1) === board.getCell(0,2) &&
            !board.isCellEmpty(2,0)) 
            return { state: "WIN", winner: board.getCell(2,0) };

        if (!board.getBoard().reduce((acc, row) => acc || row.reduce((acc, cell) => acc || cell === '-', false), false))
            return { state: "TIE" };

        return { state: "CONTINUE"};
    }

    console.log(getGameState(board.getBoard()));

    return { getCurPlayer }
})();