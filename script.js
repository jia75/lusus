const standardBoardToBuffered = [21,22,23,24,25,26,27,28,
                                 31,32,33,34,35,36,37,38,
                                 41,42,43,44,45,46,47,48,
                                 51,52,53,54,55,56,57,58,
                                 61,62,63,64,65,66,67,68,
                                 71,72,73,74,75,76,77,78,
                                 81,82,83,84,85,86,87,88,
                                 91,92,93,94,95,96,97,98,];
const pieceNames = ["Empty","WhiteKing","WhiteQueen","WhiteRook","WhiteBishop","WhiteKnight","WhitePawn",
"BlackKing","BlackQueen","BlackRook","BlackBishop","BlackKnight","BlackPawn","Border"];
function boardIndexToFile(index) {
    return index%10 - 1;
}
function boardIndexToRank(index) {
    return Math.floor(index/10) - 2;
}
function getBoardDisplayString(board) {
    let chessPieceImageString = "";
    for (let outputBoardIndex = 21; outputBoardIndex < 99; outputBoardIndex++) {
        if (![1,2,3,4,5,6,7,8,9,10,11,12].includes(board[outputBoardIndex])) {
            continue;
        }
        chessPieceImageString += "<img class ='chessPieceImage' src='pieces/"
        +pieceNames[board[outputBoardIndex]]+".svg' style='bottom:"
        +(boardIndexToRank(outputBoardIndex)*10.625).toString()+"vh; left: "
        +(boardIndexToFile(outputBoardIndex)*10.625).toString()+"vh;'></img>";
    }
    return chessPieceImageString;
}
function displayBoard(board) {
    document.getElementById('chessPieceImageContainer').innerHTML=getBoardDisplayString(board);
}
function initializeArray() {
    let array = [];
    for (let arrayInitializationIndex = 0; arrayInitializationIndex < 120; arrayInitializationIndex++) {
        if (standardBoardToBuffered.includes(arrayInitializationIndex)) {
            array.push(0);
            continue;
        }
        array.push(13);
    }
    return array;
}


mainBoard = initializeArray();