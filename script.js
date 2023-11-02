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
const pieceNames = ["Empty","whiteKing","whiteQueen","whiteRook","whiteBishop","whiteKnight","whitePawn",
"blackKing","blackQueen","blackRook","blackBishop","blackKnight","blackPawn","Border"];
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
        moveList = moveList.concat(exploreSlidingDirection(squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,10));
        moveList = moveList.concat(exploreSlidingDirection(squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,-10));
        moveList = moveList.concat(exploreSlidingDirection(squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,1));
        moveList = moveList.concat(exploreSlidingDirection(squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,-1));
        if (board[squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares]] == 3 + colorToPlay*6) {
            delete squaresToStartFrom[rookMoveGenerationIndexInFriendlySquares];
            rookMoveGenerationIndexInFriendlySquares--;
        }
    }

    //Bishop
    for (let bishopMoveGenerationIndexInFriendlySquares = 0; bishopMoveGenerationIndexInFriendlySquares < squaresToStartFrom.length; bishopMoveGenerationIndexInFriendlySquares++) {
        if (board[squaresToStartFrom[bishopMoveGenerationIndexInFriendlySquares]] != 4 + colorToPlay*6 
            && board[squaresToStartFrom[bishopMoveGenerationIndexInFriendlySquares]] != 2 + colorToPlay*6 ) {
            continue;
        }
        moveList = moveList.concat(exploreSlidingDirection(squaresToStartFrom[bishopMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,11));
        moveList = moveList.concat(exploreSlidingDirection(squaresToStartFrom[bishopMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,-11));
        moveList = moveList.concat(exploreSlidingDirection(squaresToStartFrom[bishopMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,9));
        moveList = moveList.concat(exploreSlidingDirection(squaresToStartFrom[bishopMoveGenerationIndexInFriendlySquares],board,friendlySquares,enemySquares,-9));
        delete squaresToStartFrom[bishopMoveGenerationIndexInFriendlySquares];
        bishopMoveGenerationIndexInFriendlySquares--;
    }

    //Knight
    for (let knightMoveGenerationIndexInFriendlySquares = 0; knightMoveGenerationIndexInFriendlySquares < squaresToStartFrom.length; knightMoveGenerationIndexInFriendlySquares++) {
        if (board[squaresToStartFrom[knightMoveGenerationIndexInFriendlySquares]] != 5 + colorToPlay*6 ) {
            continue;
        }
        moveList = moveList.concat(findKnightMoves(squaresToStartFrom[knightMoveGenerationIndexInFriendlySquares], friendlySquares));
        delete squaresToStartFrom[knightMoveGenerationIndexInFriendlySquares];
        knightMoveGenerationIndexInFriendlySquares--;
    }

    //Pawn
    for (let pawnMoveGenerationIndexInFriendlySquares = 0; pawnMoveGenerationIndexInFriendlySquares < squaresToStartFrom.length; pawnMoveGenerationIndexInFriendlySquares++) {
        if (board[squaresToStartFrom[pawnMoveGenerationIndexInFriendlySquares]] != 6 + colorToPlay*6 ) {
            continue;
        }
        moveList = moveList.concat(findPawnMoves(squaresToStartFrom[pawnMoveGenerationIndexInFriendlySquares], board, enemySquares, emptySquares));
        delete squaresToStartFrom[pawnMoveGenerationIndexInFriendlySquares];
        pawnMoveGenerationIndexInFriendlySquares--;
    }

    return moveList;
}

function exploreSlidingDirection(startSquare, board, friendlySquares, enemySquares, squareDifference) {
    let slideMoves = [];
    for (let slideExplorationIndex = startSquare + squareDifference; 
        board[slideExplorationIndex] != 13 && !friendlySquares.includes(slideExplorationIndex); slideExplorationIndex += squareDifference) {
            if (enemySquares.includes(slideExplorationIndex)) {
                slideMoves.push(startSquare*100 + slideExplorationIndex);
                break;
            }
            slideMoves.push(startSquare*100 + slideExplorationIndex);
    }
    return slideMoves;
}
function findKnightMoves(startSquare, friendlySquares) {
    let knightDestinations = [21,19,12,-12,-19,-21,-8,8];
    let knightMoves = [];
    for (let knightDestinationIndex = 0; knightDestinationIndex < 8; knightDestinationIndex++) {
        if (!standardBoardToBuffered.includes(startSquare + knightDestinations[knightDestinationIndex])
        || friendlySquares.includes(startSquare + knightDestinations[knightDestinationIndex])) {
            continue;
        }
        knightMoves.push(startSquare*100+startSquare + knightDestinations[knightDestinationIndex]);
    }
    return knightMoves;
}
function findPawnMoves(startSquare, board, enemySquares, emptySquares) {
    let pawnMoves = [];
    //0 -> 1
    //1 -> -1
    let colorMultiplier = board[120] * -2 + 1;
    let enPassantTarget = board[122];
    enemySquares.push(enPassantTarget);
    if (enemySquares.includes(startSquare + 9*colorMultiplier)) {
        pawnMoves.push(startSquare*100+startSquare + 9*colorMultiplier);
    }
    if (enemySquares.includes(startSquare + 11*colorMultiplier)) {
        pawnMoves.push(startSquare*100+startSquare + 11*colorMultiplier);
    }
    enemySquares.pop();
    if (emptySquares.includes(startSquare + 10*colorMultiplier)) {
        pawnMoves.push(startSquare*100+startSquare + 10*colorMultiplier);
    } else {
        return pawnMoves;
    }
    if (emptySquares.includes(startSquare + 20*colorMultiplier) && boardIndexToRank(startSquare) == board[120]*5+1) {
        pawnMoves.push(startSquare*100+startSquare + 20*colorMultiplier);
    }
    return pawnMoves;
}
var mainBoard = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");