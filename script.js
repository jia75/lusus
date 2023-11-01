const standardBoardToBuffered = [21,22,23,24,25,26,27,28,
                                 31,32,33,34,35,36,37,38,
                                 41,42,43,44,45,46,47,48,
                                 51,52,53,54,55,56,57,58,
                                 61,62,63,64,65,66,67,68,
                                 71,72,73,74,75,76,77,78,
                                 81,82,83,84,85,86,87,88,
                                 91,92,93,94,95,96,97,98];
const invertedBoardToStandard = [56,57,58,59,60,61,62,63,
                                 48,49,50,51,52,53,54,55,
                                 40,41,42,43,44,45,46,47,
                                 32,33,34,35,36,37,38,39,
                                 24,25,26,27,28,29,30,31,
                                 16,17,18,19,20,21,22,23,
                                  8, 9,10,11,12,13,14,15,
                                  0, 1, 2, 3, 4, 5, 6, 7];
const pieceNames = ["Empty","WhiteKing","WhiteQueen","WhiteRook","WhiteBishop","WhiteKnight","WhitePawn",
"BlackKing","BlackQueen","BlackRook","BlackBishop","BlackKnight","BlackPawn","Border"];
const pieceSymbolToCode = ["K","Q","R","B","N","P","k","q","r","b","n","p"];
const colorToCode = ["w","b"];
const possibleEmptySquareNumbers = ["/","1","2","3","4","5","6","7","8"];
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
function initializeBoard() {
    let boardArray = [];
    for (let boardArrayInitializationIndex = 0; boardArrayInitializationIndex < 120; boardArrayInitializationIndex++) {
        if (standardBoardToBuffered.includes(boardArrayInitializationIndex)) {
            boardArray.push(0);
            continue;
        }
        boardArray.push(13);
    }
    boardArray.push(0);
    boardArray.push(0);
    boardArray.push(0);
    boardArray.push(0);
    return boardArray;
}
function interpretFEN(FENString) {
    let FENStringParts = FENString.split(" ");
    let boardModificationIndex = 0;
    let FENStringCharacters = FENStringParts[0].split("");
    boardToReturn = initializeBoard();
    for (let FENStringAnalysisIndex = 0; FENStringAnalysisIndex < FENStringCharacters.length; FENStringAnalysisIndex++) {
        if (pieceSymbolToCode.includes(FENStringCharacters[FENStringAnalysisIndex])) {
            boardToReturn[standardBoardToBuffered[invertedBoardToStandard[boardModificationIndex]]] = pieceSymbolToCode.indexOf(FENStringCharacters[FENStringAnalysisIndex]) + 1;
            boardModificationIndex++;
            continue;
        }
        if (possibleEmptySquareNumbers.includes(FENStringCharacters[FENStringAnalysisIndex])) {
            boardModificationIndex += possibleEmptySquareNumbers.indexOf(FENStringCharacters[FENStringAnalysisIndex]);
            continue;
        }
        //if invalid character: return empty board
        return initializeBoard();
    }
    boardToReturn[120] = colorToCode.indexOf(FENStringParts[1]);
    return boardToReturn;
}

var mainBoard = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");