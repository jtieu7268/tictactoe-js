function Board() {
    const DIM = 3;
    const board = [];

    for (let i = 0; i < DIM; i++) {
        board[i] = [];
        for (let j = 0; j < DIM; j++) {
            board[i].push('');
        }
    }
    
    const getBoard = () => board;

    const printBoard = () => console.log(board);

    return { getBoard, printBoard };
}

const board = Board()
board.printBoard();