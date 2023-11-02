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
const castlingAvailabilityStringToCode = ["-","K","Q","KQ","k","Kk","Qk","KQk","q","Kq","Qq","KQq","kq","Kkq","Qkq","KQkq"]
const pieceSymbolToCode = ["K","Q","R","B","N","P","k","q","r","b","n","p"];
const colorToCode = ["w","b"];
const possibleEmptySquareNumbers = ["/","1","2","3","4","5","6","7","8"];
const fileNames = ["a","b","c","d","e","f","g","h"];
 
function pieceToColor(pieceCode) {
    if (0 < pieceCode && pieceCode < 7) {return 0;}
    if (6 < pieceCode && pieceCode < 13) {return 1;}
}

function boardIndexToFile(index) {
    return index%10 - 1;
}
function boardIndexToRank(index) {
    return Math.floor(index/10) - 2;
}

function bufferedIndexToCoordinates(index) {
    return fileNames[boardIndexToFile(index)] + (boardIndexToRank(index)+1);
}
function coordinatesToStandardIndex(index) {
    indexCharacters = index.split("");
    return fileNames.indexOf(indexCharacters[0]) + ((+indexCharacters[1])-1)*8;
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
    boardArray.push(0,0,0,0,0);
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
    boardToReturn[121] = castlingAvailabilityStringToCode.indexOf(FENStringParts[2]);
    boardToReturn[122] = standardBoardToBuffered[coordinatesToStandardIndex(FENStringParts[3])] ?? 0;
    boardToReturn[123] = +FENStringParts[4];
    boardToReturn[124] = (+FENStringParts[5]) - 1;
    return boardToReturn;
}

function generateMoves(board) {
    let moveList = [];
    let colorToPlay = board[120];
    let emptySquares = Array();
    let occupiedSquares = Array();
    let friendlySquares = Array();
    let enemySquares = Array();
    for (let squareCategorizationIndex = 21; squareCategorizationIndex < 99; squareCategorizationIndex++) {
        if (!standardBoardToBuffered.includes(squareCategorizationIndex)) {
            continue;
        }
        if (board[squareCategorizationIndex] == 0) {
            emptySquares.push(squareCategorizationIndex);
            continue;
        }
        if (pieceToColor(board[squareCategorizationIndex]) === colorToPlay) {
            friendlySquares.push(squareCategorizationIndex);
            occupiedSquares.push(squareCategorizationIndex);
            continue;
        }
        enemySquares.push(squareCategorizationIndex);
        occupiedSquares.push(squareCategorizationIndex);
    }
    let squaresToStartFrom = structuredClone(friendlySquares);
    //Rook
    for (let rookMoveGenerationIndexInFriendlySquares = 0; rookMoveGenerationIndexInFriendlySquares < squaresToStartFrom.length; rookMoveGenerationIndexInFriendlySquares++) {
        if (board[squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares]] != 3 + colorToPlay*6 
            && board[squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares]] != 2 + colorToPlay*6 ) {
            continue;
        }
        moveList = moveList.concat(exploreRookDirection(squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,10));
        moveList = moveList.concat(exploreRookDirection(squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,-10));
        moveList = moveList.concat(exploreRookDirection(squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,1));
        moveList = moveList.concat(exploreRookDirection(squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,-1));
        if (board[squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares]] == 3 + colorToPlay*6) {
            delete squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares];
            rookMoveGenerationIndexInFriendlySquares--;
        }
    }

    return moveList;
}

function exploreRookDirection(startSquare, board, friendlySquares, enemySquares, squareDifference) {
    let RookMoves = [];
    for (let rookExplorationIndex = startSquare + squareDifference; 
        board[rookExplorationIndex] != 13 && !friendlySquares.includes(rookExplorationIndex); rookExplorationIndex += squareDifference) {
            if (enemySquares.includes(rookExplorationIndex)) {
                RookMoves.push(startSquare*100 + rookExplorationIndex);
                break;
            }
            RookMoves.push(startSquare*100 + rookExplorationIndex);
    }
    return RookMoves;
}

var mainBoard = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");