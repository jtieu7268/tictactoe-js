function Player(playerNumber, playerName) {
    const number = playerNumber;
    const name = playerName;
    const symbol = number === 1 ? 'X' : 'O';

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
                board[i].push('X');
            }
        }
        
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
    
        return { getBoard, placeMove, printBoard };
    })();

    const playerOne = Player(1, playerOneName);
    const playerTwo = Player(2, playerTwoName);

    board.printBoard();
    console.log(playerOne.getName());
})();