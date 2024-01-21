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
const positionValue = [[
     0, 0, 0, 0, 0, 0, 0, 0,
    10,10,10,10,10,10,10,10,
     1, 1, 2, 2, 2, 2, 1, 1,
     1, 2, 2, 3, 3, 2, 2, 1,
     2, 2, 4, 6, 6, 4, 2, 2,
     2, 2, 3, 4, 4, 3, 2, 2,
     4, 4, 3, 2, 2, 3, 4, 4,
     0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 2, 2, 0, 0, 0,
        1, 2, 3, 2, 2, 3, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 3, 2, 2, 3, 2, 1,
        0, 0, 3, 2, 2, 3, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 2, 2, 0, 0, 0,
        1, 2, 3, 2, 2, 3, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 3, 2, 2, 3, 2, 1,
        0, 0, 3, 2, 2, 3, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 2, 2, 0, 0, 0,
        1, 2, 3, 2, 2, 3, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 3, 2, 2, 3, 2, 1,
        0, 0, 3, 2, 2, 3, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 2, 2, 0, 0, 0,
        1, 2, 3, 2, 2, 3, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 3, 2, 2, 3, 2, 1,
        0, 0, 3, 2, 2, 3, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 2, 2, 0, 0, 0,
        1, 2, 3, 2, 2, 3, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 4, 5, 5, 4, 2, 1,
        1, 2, 3, 2, 2, 3, 2, 1,
        0, 0, 3, 2, 2, 3, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0
    ]
]
const pieceNames = ["Empty","whiteKing","whiteQueen","whiteRook","whiteBishop","whiteKnight","whitePawn",
"blackKing","blackQueen","blackRook","blackBishop","blackKnight","blackPawn","Border"];
const castlingAvailabilityStringToCode = ["-","K","Q","KQ","k","Kk","Qk","KQk","q","Kq","Qq","KQq","kq","Kkq","Qkq","KQkq"];
const pieceSymbolToCode = ["K","Q","R","B","N","P","k","q","r","b","n","p"];
const colorToCode = ["w","b"];
const possibleEmptySquareNumbers = ["/","1","2","3","4","5","6","7","8"];
const fileNames = ["a","b","c","d","e","f","g","h"];
const directions = [10,11,1,-9,-10,-11,-1,9];
const codeToAlgebraicSymbol = ["","K","Q","R","B","N"];

// definitions
const white = 0;
const black = 1;

const switchColorMap = [black, white];
const colorMultiplierMap = [1, -1];
const pieceToColorMap = [undefined, 
    white, white, white, white, white, white, 
    black, black, black, black, black, black]

function addToPageConsole() {
    for (let string of arguments){
        document.getElementById('console-output').insertAdjacentHTML('afterbegin',string+'<div>');
    }
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

function parsePGN(pgn) {
    const removeCommentRegex = /{[^}]*}/g;
    const metadataRegEx = /\[([^\]"]+)"([^"]+)"\]/g;
    const moveRegEx = /\d+\.+\s*([\da-hNBRKQ=+#xO\-]+)\s+([\da-hNBRKQ=+#xO\-]+)?/g;
    const game = { tags: {}, moves: [] };

    pgn = pgn.replace(removeCommentRegex, "");
    pgn = pgn.replace(/\d+\.\.\./g, "");
    pgn = pgn.replace(/[\d/-]+\s*$/, "");

    let match;
    while ((match = metadataRegEx.exec(pgn)) != null) {
        game.tags[match[1]] = match[2];
    }

    pgn = pgn.replace(metadataRegEx, "");

    while ((match = moveRegEx.exec(pgn)) != null) {
        game.moves.push(match[1],match[2]);
    }

    if (game.moves[game.moves.length-1] == undefined) {
        game.moves.pop();
    }

    pgn = pgn.replace(moveRegEx, "");
    gameToMoves(game);
    return game;
}

function reenactGame(game) {
    let board = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    let lastGeneratedMoves;

    for (let move of game.moves) {
        properMove = move;
        if (properMove == undefined) {
            displayBoard(board);
            console.log(generateMoves(board));
            throw new Error ('Invalid PGN');
        }
        addToMoveList(board, properMove, lastGeneratedMoves = generateMoves(board));
        makeMove(properMove, board);
    }

    return board;
}

function gameToMoves(game) {
    let board = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    let lastGeneratedMoves;

    for (let moveIndex = 0; moveIndex < game.moves.length; moveIndex++) {
        game.moves[moveIndex] = algebraicToMove(game.moves[moveIndex],board,(lastGeneratedMoves = generateMoves(board)));
        makeMove(game.moves[moveIndex], board);
    }

    return game;
}

function moveToAlgebraic(move, legalMoves, board, isCheck, isCheckMate) {
    let legalMovesExcept = structuredClone(legalMoves);
    legalMovesExcept.splice(legalMovesExcept.indexOf(move), 1);
    let noPromotionMoves = removePromotionNotationFromMovelist(legalMovesExcept, board);
    let moveParts = [Math.floor(move/100), move%100, promotionNotationToMove(move, board)%100];
    let returnString = "";
    returnString += codeToAlgebraicSymbol[board[moveParts[0]]%6];
    if ((board[moveParts[0]]%6 == 0 && board[moveParts[2]] != 0) || (noPromotionMoves.find(move => boardIndexToRank(move%100) == boardIndexToRank(moveParts[2]) && move%100 == moveParts[2] && board[Math.floor(move/100)] == board[moveParts[0]] && Math.floor(move/100)!=moveParts[0]) ?? 0 )!= 0) {
        returnString += fileNames[boardIndexToFile(moveParts[0])];
    }
    if (noPromotionMoves.find(move => boardIndexToFile(move%100) == boardIndexToFile(moveParts[2]) && move%100 == moveParts[2] && board[Math.floor(move/100)] == board[moveParts[0]] && Math.floor(move/100)!=moveParts[0]) ?? 0 != 0) {
        returnString += boardIndexToRank(moveParts[0])+1;
    }
    if (board[moveParts[2]] != 0) {
        returnString += 'x';
    }
    returnString += bufferedIndexToCoordinates(moveParts[2]);
    if (moveParts[2] != moveParts[1]) {
        returnString += "=";
        returnString += codeToAlgebraicSymbol[moveParts[1]%10];
    }
    if (isCheck || isCheckMate) {
        if (isCheckMate) {
            returnString += "#";
        } else {
            returnString += "+";
        }
    }
    
    return returnString;
}

function algebraicToMove(move, board, legalMoves) {
    if (move == 'O-O' || move == '0-0') {
        return [2527, 9597][board[120]];
    }
    if (move == 'O-O-O' || move == '0-0-0') {
        return [2523, 9593][board[120]];
    }
    const moveParts = move.match(/([KQRNB])?([a-h])?([1-8])?x?([a-h][1-8])(=([QRNB]))?([+#])?/);
    return legalMoves.find(moveToFilter => promotionNotationToMove(moveToFilter, board)%100 == standardBoardToBuffered[coordinatesToStandardIndex(moveParts[4])] 
    && board[Math.floor(promotionNotationToMove(moveToFilter, board)/100)]%6 == codeToAlgebraicSymbol.indexOf(moveParts[1] ?? '') 
    && fileNames[boardIndexToFile(Math.floor(promotionNotationToMove(moveToFilter, board)/100))] == (moveParts[2] ?? fileNames[boardIndexToFile(Math.floor(promotionNotationToMove(moveToFilter, board)/100))])
    && boardIndexToRank(Math.floor(promotionNotationToMove(moveToFilter, board)/100))+1 == (+(moveParts[3] ?? boardIndexToRank(Math.floor(promotionNotationToMove(moveToFilter, board)/100))+1))
    && (moveParts[6] ?? codeToAlgebraicSymbol[moveToFilter%10]) == codeToAlgebraicSymbol[moveToFilter%10]);
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
function promotionNotationToMove(move, board) {
    move = +move;
    let moveParts = Array(2);
    moveParts[0] = Math.floor(move/100);
    moveParts[1] = move%100;
    let colorMultiplier = board[120] * -2 + 1;
    if (boardIndexToRank(moveParts[0]) == [6,1][board[120]] && board[moveParts[0]] == [6,12][board[120]]) {
        moveParts[1] = moveParts[0] + colorMultiplier*([9,10,11][Math.floor(moveParts[1]/10)]);
    }
    return moveParts[0]*100+moveParts[1];
}   
function removePromotionNotationFromMovelist(moveList, board) {
    let returnArray = [];
    for(move of moveList) {
        returnArray.push(promotionNotationToMove(move, board));
    }
    return returnArray;
}
function castlingCodeToArray(code) {
    return [code%2, Math.floor(code/2)%2, Math.floor(code/4)%2, Math.floor(code/8)];
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
    const colorToPlay = board[120];
    let colorMultiplier = colorMultiplierMap[colorToPlay];
    let emptySquares = [];
    let friendlySquares = [];
    let enemySquares = [];
    
    let checkingMoves = [];
    let squaresOfPinnedPieces = [0,0,0,0,0,0,0,0];

    let pawnSquares = [], rookSquares = [], queenSquares = [], bishopSquares = [], knightSquares = [], kingSquares = [];

    //Square Categorization let squareCategorizationIndex = 21; squareCategorizationIndex < 99; squareCategorizationIndex++
    let currentPiece;
    for (let squareCategorizationIndex of standardBoardToBuffered) {
        currentPiece = board[squareCategorizationIndex];
        if (currentPiece == 0) {
            emptySquares.push(squareCategorizationIndex);
            continue;
        }
        if (pieceToColorMap[currentPiece] == colorToPlay) {
            friendlySquares.push(squareCategorizationIndex);
            continue;
        }
        enemySquares.push(squareCategorizationIndex);
    }
    
    const pieceCodeColorOffset = colorToPlay*6;
    for (let squareCategorizationIndex of friendlySquares) {
        if (board[squareCategorizationIndex] == 6+pieceCodeColorOffset) {
            pawnSquares.push(squareCategorizationIndex);
            continue;
        }
        if (board[squareCategorizationIndex] == 4+pieceCodeColorOffset) {
            bishopSquares.push(squareCategorizationIndex);
            continue;
        }
        if (board[squareCategorizationIndex] == 3+pieceCodeColorOffset) {
            rookSquares.push(squareCategorizationIndex);
            continue;
        }
        if (board[squareCategorizationIndex] == 5+pieceCodeColorOffset) {
            knightSquares.push(squareCategorizationIndex);
            continue;
        }
        if (board[squareCategorizationIndex] == 2+pieceCodeColorOffset) {
            queenSquares.push(squareCategorizationIndex);
            continue;
        }
        if (board[squareCategorizationIndex] == 1+pieceCodeColorOffset) {
            kingSquares.push(squareCategorizationIndex);
            continue;
        }
    }
    let friendlyKingSquare = kingSquares[0];

    let attackedSquares = [];
    board[120] = switchColorMap[colorToPlay];
    let rawNextMoves = generateAttackedMap(board);
    board[120] = colorToPlay;
    for (let attackedSquare of rawNextMoves) {
        attackedSquares.push(attackedSquare%100);
        if (attackedSquare%100 == friendlyKingSquare) {
            //King is under attack
            checkingMoves.push(attackedSquare);
        }
    }
    //Pinned piece locator
    for (let pinnedPieceSearchDirectionIndex = 0; pinnedPieceSearchDirectionIndex < 8; pinnedPieceSearchDirectionIndex++) {
        for (let moveIndexer = friendlyKingSquare + directions[pinnedPieceSearchDirectionIndex];
            board[moveIndexer] != 13 && !enemySquares.includes(moveIndexer); moveIndexer += directions[pinnedPieceSearchDirectionIndex]) {
            if (friendlySquares.includes(moveIndexer)){
                let pieceToBePinned = moveIndexer;
                moveIndexer += directions[pinnedPieceSearchDirectionIndex];
                while (board[moveIndexer] != 13 && !friendlySquares.includes(moveIndexer)) {
                    // [2,3,8,9] if vertical check
                    if ([2,3 + pinnedPieceSearchDirectionIndex%2,8,9 + pinnedPieceSearchDirectionIndex%2].includes(board[moveIndexer])) {
                        squaresOfPinnedPieces[pinnedPieceSearchDirectionIndex] = pieceToBePinned;
                        break;
                    }
                    if (enemySquares.includes(moveIndexer)) {
                        break;
                    }
                    moveIndexer += directions[pinnedPieceSearchDirectionIndex];
                } 
                break;
            }
        }
    }

    let squaresToStartFrom = structuredClone(friendlySquares);
    //Pawn
    for (let pawnSquare of pawnSquares) {
        moveList = moveList.concat(findPawnMoves(pawnSquare, board, enemySquares, emptySquares));
    }
    //Rook
    for (let rookSquare of rookSquares) {
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,friendlySquares,enemySquares,10));
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,friendlySquares,enemySquares,1));
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,friendlySquares,enemySquares,-10));
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,friendlySquares,enemySquares,-1));
    }

    //Bishop
    for (let bishopSquare of bishopSquares) {
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,friendlySquares,enemySquares,11));
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,friendlySquares,enemySquares,-9));
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,friendlySquares,enemySquares,-11));
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,friendlySquares,enemySquares,9));
    }

    //Knight
    for (let knightSquare of knightSquares) {
        moveList = moveList.concat(findMappedMoves(knightSquare, friendlySquares, [21,19,12,-12,-19,-21,-8,8],[]));
    }
    //Queen
    for (let queenSquare of queenSquares) {
        moveList = moveList.concat(exploreSlidingDirection(queenSquare,board,friendlySquares,enemySquares,10));
        moveList = moveList.concat(exploreSlidingDirection(queenSquare,board,friendlySquares,enemySquares,1));
        moveList = moveList.concat(exploreSlidingDirection(queenSquare,board,friendlySquares,enemySquares,-10));
        moveList = moveList.concat(exploreSlidingDirection(queenSquare,board,friendlySquares,enemySquares,-1));
        moveList = moveList.concat(exploreSlidingDirection(queenSquare,board,friendlySquares,enemySquares,11));
        moveList = moveList.concat(exploreSlidingDirection(queenSquare,board,friendlySquares,enemySquares,-9));
        moveList = moveList.concat(exploreSlidingDirection(queenSquare,board,friendlySquares,enemySquares,-11));
        moveList = moveList.concat(exploreSlidingDirection(queenSquare,board,friendlySquares,enemySquares,9));
    }

    //King
    moveList = moveList.concat(findMappedMoves(kingSquares[0], friendlySquares, directions, attackedSquares));


    //Castling
    let castlingAvailability = castlingCodeToArray(board[121]);
    let intermediateSquareIsOk  = (board[friendlyKingSquare+1] == 0 && !attackedSquares.includes(friendlyKingSquare+1));
    let destinationSquareIsOk = (board[friendlyKingSquare+2] == 0 && !attackedSquares.includes(friendlyKingSquare+2));
    //Kingside
    if (castlingAvailability[colorToPlay*2] == 1
    && intermediateSquareIsOk && destinationSquareIsOk && checkingMoves.length == 0) {
        moveList.push(friendlyKingSquare*100+friendlyKingSquare+2);
    }
    //QueenSide
    intermediateSquareIsOk = (board[friendlyKingSquare-1] == 0 && !attackedSquares.includes(friendlyKingSquare-1) && board[friendlyKingSquare-3] == 0);
    destinationSquareIsOk = (board[friendlyKingSquare-2] == 0 && !attackedSquares.includes(friendlyKingSquare-2));
    if (castlingAvailability[colorToPlay*2 + 1] == 1
        && intermediateSquareIsOk && destinationSquareIsOk && checkingMoves.length == 0) {
            moveList.push(friendlyKingSquare*100+friendlyKingSquare-2);
        }

    for (let pinnedPieceSearchDirectionIndex = 0; pinnedPieceSearchDirectionIndex < 8; pinnedPieceSearchDirectionIndex++) {
        for (let filteringIndex = 0; filteringIndex < moveList.length; filteringIndex++) {
            if (Math.floor(moveList[filteringIndex]/100) != squaresOfPinnedPieces[pinnedPieceSearchDirectionIndex]) {
                continue;
            } 
            let squareDifference = (Math.abs(Math.floor(moveList[filteringIndex]/100) - promotionNotationToMove(moveList[filteringIndex],board)%100));
            if (squareDifference%(directions[pinnedPieceSearchDirectionIndex]) == 0) {
                if (Math.abs(directions[pinnedPieceSearchDirectionIndex]) == 1 && boardIndexToRank(Math.floor(moveList[filteringIndex]/100)) != boardIndexToRank(moveList[filteringIndex]%100)) {
                    moveList.splice(filteringIndex,1);
                    filteringIndex--;
                }
                continue;
            }
            moveList.splice(filteringIndex,1);
            filteringIndex--;
        }
    }

    for (let checkingMoveIndex = 0; checkingMoveIndex < checkingMoves.length; checkingMoveIndex ++) {
        let checkOriginSquare = Math.floor(checkingMoves[checkingMoveIndex]/100);
        let interjectionSquares = [];
        if (1 < board[checkOriginSquare]%6 < 5) {
            //vertical move filewise
            if (checkOriginSquare%10 == friendlyKingSquare%10) {
                findInterjections(friendlyKingSquare, checkOriginSquare, board, interjectionSquares, 10)
            }
            //vertical move rankwise
            if (Math.floor(checkOriginSquare/10) == Math.floor(friendlyKingSquare/10)) {
                findInterjections(friendlyKingSquare, checkOriginSquare, board, interjectionSquares, 1)
            }
            //diagonal 11
            if ((checkOriginSquare-friendlyKingSquare)%11 == 0) {
                findInterjections(friendlyKingSquare, checkOriginSquare, board, interjectionSquares, 11)
            }
            //diagonal 9
            if ((checkOriginSquare-friendlyKingSquare)%9 == 0) {
                findInterjections(friendlyKingSquare, checkOriginSquare, board, interjectionSquares, 9)
            }
        }
        for (let filteringIndex = 1; filteringIndex-1 < moveList.length; filteringIndex++) {
            //king escape
            if (Math.floor(moveList[filteringIndex-1]/100) == friendlyKingSquare) {
                continue;
            }
            //capturing
            if (moveList[filteringIndex-1]%100 == checkOriginSquare) {
                continue;
            }
            //interjection
            if (interjectionSquares.includes(promotionNotationToMove(moveList[filteringIndex-1], board)%100)) {
                continue;
            }
            moveList.splice(filteringIndex-1,1);
            filteringIndex--;
        }
    }

    return moveList;
}

function exploreSlidingDirection(startSquare, board, friendlySquares, enemySquares, squareDifference) {
    let slideMoves = [];
    for (let slideExplorationIndex = startSquare + squareDifference; 
        board[slideExplorationIndex] != 13 && !friendlySquares.includes(slideExplorationIndex); slideExplorationIndex += squareDifference) {

            slideMoves.push(startSquare*100 + slideExplorationIndex);
            if (enemySquares.includes(slideExplorationIndex)) {
                break;
            }
    }
    return slideMoves;
}

function generateAttackedMap(board) {
    let moveList = [];
    let colorToPlay = board[120];
    let emptySquares = Array();
    let friendlySquares = Array();
    let enemySquares = Array();
    let friendlyKingSquare = board.indexOf(6*colorToPlay+1);

    for (let squareCategorizationIndex of standardBoardToBuffered) {
        if (board[squareCategorizationIndex] == 0) {
            emptySquares.push(squareCategorizationIndex);
            continue;
        }
        if (pieceToColorMap[board[squareCategorizationIndex]] == colorToPlay) {
            friendlySquares.push(squareCategorizationIndex);
            continue;
        }
        enemySquares.push(squareCategorizationIndex);
    }

    let squaresToStartFrom = structuredClone(friendlySquares);
    enemySquares.splice(enemySquares.indexOf(board.indexOf(6*((colorToPlay+1)%2)+1)),1);
    enemySquares = enemySquares.concat(friendlySquares);
    friendlySquares = [];

    //Pawn
    for (let pawnSquare of squaresToStartFrom.filter(square => board[square]%6==0)) {
        moveList = moveList.concat(findPawnAttackMap(board, pawnSquare));
        squaresToStartFrom.splice(squaresToStartFrom.indexOf(pawnSquare),1);
    }

    //Rook
    for (let rookSquare of squaresToStartFrom.filter(square => board[square]%6==3 || board[square]%6==2)) {
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,[],enemySquares,10));
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,[],enemySquares,1));
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,[],enemySquares,-10));
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,[],enemySquares,-1));
        if (board[rookSquare]%6 == 3) {
            squaresToStartFrom.splice(squaresToStartFrom.indexOf(rookSquare),1);
        }
    }

    //Bishop
    for (let bishopSquare of squaresToStartFrom.filter(square => board[square]%6==4 || board[square]%6==2)) {
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,[],enemySquares,11));
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,[],enemySquares,-9));
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,[],enemySquares,-11));
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,[],enemySquares,9));
        squaresToStartFrom.splice(squaresToStartFrom.indexOf(bishopSquare),1);
    }

    //Knight
    for (let knightSquare of squaresToStartFrom.filter(square => board[square]%6==5)) {
        moveList = moveList.concat(findMappedMoves(knightSquare, [], [21,19,12,-12,-19,-21,-8,8],[]));
        squaresToStartFrom.splice(squaresToStartFrom.indexOf(knightSquare),1);
    }

    //King
    moveList = moveList.concat(findMappedMoves(squaresToStartFrom[0], [], directions, []));

    return moveList;
}

function findMappedMoves(startSquare, friendlySquares, destinationDifferences,attackedSquares) {
    let mappedDestinations = destinationDifferences;
    let mappedMoves = [];
    for (let mappedDestinationIndex = 0; mappedDestinationIndex < 8; mappedDestinationIndex++) {
        if (!standardBoardToBuffered.includes(startSquare + mappedDestinations[mappedDestinationIndex])
        || friendlySquares.includes(startSquare + mappedDestinations[mappedDestinationIndex])
        || attackedSquares.includes(startSquare + mappedDestinations[mappedDestinationIndex])) {
            continue;
        }
        mappedMoves.push(startSquare*100+startSquare + mappedDestinations[mappedDestinationIndex]);
    }
    return mappedMoves;
}

function findPawnMoves(startSquare, board, enemySquares, emptySquares) {
    let pawnMoves = [];
    //0 -> 1
    //1 -> -1
    let colorMultiplier = board[120] * -2 + 1;
    let enPassantTarget = board[122];
    if (enPassantTarget != 0) {
    enemySquares.push(enPassantTarget);
    }
    //PROMOTION
    if (boardIndexToRank(startSquare) == [6,1][board[120]]) {
        if (enemySquares.includes(startSquare + 9*colorMultiplier)) {
            pawnMoves.push(startSquare*100+2);
            pawnMoves.push(startSquare*100+3);
            pawnMoves.push(startSquare*100+4);
            pawnMoves.push(startSquare*100+5);
        }
        if (enemySquares.includes(startSquare + 11*colorMultiplier)) {
            pawnMoves.push(startSquare*100+22);
            pawnMoves.push(startSquare*100+23);
            pawnMoves.push(startSquare*100+24);
            pawnMoves.push(startSquare*100+25);
        }
        if (emptySquares.includes(startSquare + 10*colorMultiplier)) {
            pawnMoves.push(startSquare*100+12);
            pawnMoves.push(startSquare*100+13);
            pawnMoves.push(startSquare*100+14);
            pawnMoves.push(startSquare*100+15);
        }
        return pawnMoves;
    }

    if (enemySquares.includes(startSquare + 9*colorMultiplier)) {
        pawnMoves.push(startSquare*100+startSquare + 9*colorMultiplier);
    }
    if (enemySquares.includes(startSquare + 11*colorMultiplier)) {
        pawnMoves.push(startSquare*100+startSquare + 11*colorMultiplier);
    }
    if (enPassantTarget != 0) {
        enemySquares.pop();
    }

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

function findPawnAttackMap(board, startSquare) {
    let pawnMoves = [];
    let colorMultiplier = board[120] * -2 + 1;
    if (standardBoardToBuffered.includes(startSquare + 9*colorMultiplier)) {
        pawnMoves.push(startSquare*100+startSquare + 9*colorMultiplier);
    }
    if (standardBoardToBuffered.includes(startSquare + 11*colorMultiplier)) {
        pawnMoves.push(startSquare*100+startSquare + 11*colorMultiplier);
    }
    return pawnMoves;
}

function findInterjections(friendlyKingSquare, checkOriginSquare, board, interjectionSquares, squareDifference) {
    if (friendlyKingSquare > checkOriginSquare) {
        for (let moveIndexer = checkOriginSquare + squareDifference; moveIndexer != friendlyKingSquare && board[moveIndexer] != 13; moveIndexer += squareDifference) {
            interjectionSquares.push(moveIndexer);
        }
    }
    if (friendlyKingSquare < checkOriginSquare) {
        for (let moveIndexer = checkOriginSquare - squareDifference; moveIndexer != friendlyKingSquare && board[moveIndexer] != 13; moveIndexer -= squareDifference) {
            interjectionSquares.push(moveIndexer);
        }
    }
}

function makeMove(move, board, game=undefined, legalMoves=undefined) {
    if (!(legalMoves ?? [move]).includes(move)) {
        return [false];
    }
    let capturedPiece = 0;
    let previousEnPassantSquare = board[122];
    let colorMultiplier = board[120] * -2 + 1;
    let castlingAvailability = castlingCodeToArray(board[121]);
    moveParts = move.toString().match(/\d{2}/g);
    //en passant case
    if (+moveParts[1] == board[122] && board[moveParts[0]] % 6 == 0) {
        capturedPiece = board[moveParts[1] - 10 * colorMultiplier];
        board[moveParts[1] - 10 * colorMultiplier] = 0;
    }
    board[122] = 0;
    //double pawn push
    if (Math.abs(moveParts[0]-moveParts[1]) == 20 && board[moveParts[0]] % 6 == 0) {
        board[122] = moveParts[1] - 10 * colorMultiplier;
    }
    //promotion
    if (boardIndexToRank(moveParts[0]) == [6,1][board[120]] && board[moveParts[0]]%6 == 0) {
        board[moveParts[0]] = moveParts[1]%10 + board[120]*6;
        moveParts[1] = +moveParts[0] + colorMultiplier*[9,10,11][Math.floor(moveParts[1]/10)];
    }
    //capturing
    capturedPiece = board[moveParts[1]];
    //castling
    if (board[moveParts[0]]%6 == 1) {
        //kingside
        if (moveParts[1]-moveParts[0] == 2) {
            [board[+moveParts[0]+1], board[+moveParts[1]+1]] = [board[+moveParts[1]+1], 0];
        }
        //queenside
        if (moveParts[1]-moveParts[0] == -2) {
            [board[+moveParts[0]-1], board[+moveParts[1]-2]] = [board[+moveParts[1]-2], 0];
        }

    }
    //remove castling rights after king move
    if (board[moveParts[0]]%6 == 1) {
        castlingAvailability[board[120]*2] = 0;
        castlingAvailability[board[120]*2+1] = 0;
    }
    //remove right on rook capture
    if ([28,21,98,91].includes(+moveParts[1])) {
        castlingAvailability[[28,21,98,91].indexOf(+moveParts[1])] = ([28,21,98,91].includes(+moveParts[1])*-1+2);
    }
    //remove right on rook move
    if ([28,21,98,91].includes(+moveParts[0])) {
        castlingAvailability[[28,21,98,91].indexOf(+moveParts[0])] = 0;
    }
    board[moveParts[1]] = +board[+moveParts[0]].toString();
    board[moveParts[0]] = 0;
    board[121] = castlingAvailability[0]+castlingAvailability[1]*2+castlingAvailability[2]*4+castlingAvailability[3]*8;
    if (board[120] == 1) {
        board[124]++;
    }
    if (game != undefined) {
        try {
            game.moves.push(move);
        } catch (error) {
            console.error('Invalid game object passed to makeMove(): '+game);
        }
    }
    board[120] = -(board[120]-1);
    return [true,capturedPiece, previousEnPassantSquare];
}

function squareClickEvent(square, board, promotionValue, game) {
    let bufferedSquare = standardBoardToBuffered[invertedBoardToStandard[square]];
    let generatedMoves;

    if (clickedSquare == 0) {
        clickedSquare = bufferedSquare;
        highlightSquare(clickedSquare, "#ff000040");
        return;
    }
    if (bufferedSquare == clickedSquare) {
        highlightSquare(clickedSquare, "#00000000");
        clickedSquare = 0;
        return;
    }
    if (board[clickedSquare]%6 == 0 && boardIndexToRank(bufferedSquare) == [7,0][board[120]]) {
        if (![9,10,11,-9,-10,-11].includes(bufferedSquare-clickedSquare)) {
            return;
        }
        bufferedSquare = +promotionValue+([9,10,11,-9,-10,-11].indexOf(bufferedSquare-clickedSquare)%3)*10;
    }
    if ((generatedMoves = generateMoves(board)).includes(clickedSquare*100+bufferedSquare)) {
        addToMoveList(board, clickedSquare*100+bufferedSquare, generatedMoves);
        
        makeMove(clickedSquare*100+bufferedSquare,board,game,generatedMoves)
        generatedMoves = generateMoves(board);
        displayBoard(board);
        clearInterfaceChessboard();
        highlightSquare(clickedSquare, "#00000000");
        highlightMoveList(removePromotionNotationFromMovelist(generatedMoves,board));
        clickedSquare = 0;
        if (document.getElementById("enginePlaySetting").checked) {
            let chosenMove = chooseMoveWithAlphaBeta(board, document.getElementById('depthInput').value, generatedMoves, document.getElementById('captureDepthInput').value);
            addToMoveList(board, chosenMove.move, generatedMoves);
            makeMove(chosenMove.move, board, game, generatedMoves);
            generatedMoves = generateMoves(board);
            displayBoard(board);
        }   
    } else {
        highlightSquare(clickedSquare, "#00000000");
        clickedSquare = standardBoardToBuffered[invertedBoardToStandard[square]];
        bufferedSquare = 0;
        highlightSquare(clickedSquare, "#ff000040");
    }
}

function clearInterfaceChessboard() {
    for (let colorClearIndex = 0; colorClearIndex < 64; colorClearIndex++) {
        highlightSquare(standardBoardToBuffered[colorClearIndex], "#00000000");
    }
}
function highlightMoveList(moveList) {
    for (let highlightingIndex in moveList) {
        highlightSquare(moveList[highlightingIndex]%100,"#0000ff40");
    }
}
function highlightSquare(bufferedSquare, colorForHighlight) {
    document.getElementById("square"+invertedBoardToStandard.indexOf(standardBoardToBuffered.indexOf(bufferedSquare))).style.backgroundColor = colorForHighlight;
}

function generatePossiblePositions(board, depth, showPerMove=false) {
    if (depth == 0) {
        return [board];
    }
    let moves = generateMoves(board);
    moves.sort((a,b)=>a-b);
    let positions = [];
    for (let moveToMake of moves) {
        let temporaryBoard = structuredClone(board);
        makeMove(moveToMake, temporaryBoard);
        newMoves = generatePossiblePositions(temporaryBoard, depth - 1);
        positions = positions.concat(newMoves);
        if (showPerMove) {
            addToPageConsole(`${bufferedIndexToCoordinates(Math.floor(moveToMake/100))}${bufferedIndexToCoordinates(promotionNotationToMove(moveToMake,board)%100)}: ${newMoves.length}`);
        }
    }
    
    return positions;
}
function perft(board, maxLayer, moreInfo= false, iterations = 1) {
    let currentDepth = 0;
    let num;
    let totalNum = 0;
    let timeTaken;
    let totalTime = 0;
    for (let i of Array(iterations)) {
        currentDepth = 0;
        while (currentDepth-1 < maxLayer) {
            let start = Date.now();
            addToPageConsole(currentDepth + ": " + (num = generatePossiblePositions(board,currentDepth,moreInfo).length) + "(in "+(timeTaken = (-start+Date.now()))+"ms)");
            addToPageConsole(num/(timeTaken/1000));
            totalNum += num;
            totalTime += timeTaken;
            currentDepth++;
        }
        }
    addToPageConsole(totalNum, totalTime, totalNum/(totalTime/1000));
    return num;
}

function isInCheckmate(board) {
    board[120] = switchColorMap[board[120]];
    let attackedSquares = generateAttackedMap(board).map((x) => x%100);
    board[120] = switchColorMap[board[120]];
    let friendlySquares = [];
    for (let squareCategorizationIndex of standardBoardToBuffered) {
        if (pieceToColorMap[board[squareCategorizationIndex]] == board[120]) {
            friendlySquares.push(squareCategorizationIndex);
        }
    }
    return findMappedMoves(board.indexOf(1+6*board[120]), friendlySquares, directions, attackedSquares).length == 0;
}

function evaluatePosition(board) {
    const pieceValues = [100,0,900,500,300,280];
    const pieceSumWeight = 1;
    const piecePositionWeight = 1;
    let evaluation = {sum: 0};
    let relativePieceValue;
    let pieceToCount;
    let adjustedSquare;
    let amountOfPieces = 64;
    let whiteKingSquare = board.indexOf(1);
    let blackKingSquare = board.indexOf(7);    

    //pieceSum
    evaluation.pieceSum = 0;
    for (let pieceCountingIndex of standardBoardToBuffered) {
        pieceToCount = board[pieceCountingIndex];
        if (pieceToCount == 0 || pieceToCount == 13) {
            amountOfPieces--;
            continue;
        }
        relativePieceValue = pieceValues[pieceToCount % 6] * (pieceToColorMap[pieceToCount] * -2 + 1 );

        evaluation.pieceSum += relativePieceValue;
    }
    evaluation.sum += evaluation.pieceSum;

    //piecePosition
    evaluation.piecePosition = 0;
    for (let pieceCountingIndex of standardBoardToBuffered) {
        

        pieceToCount = board[pieceCountingIndex];
        if (pieceToCount == 0 || pieceToCount == 13) {
            continue;
        }
        adjustedSquare = standardBoardToBuffered.indexOf(pieceCountingIndex);
        adjustedSquare = invertedBoardToStandard.indexOf(adjustedSquare);

        let pieceColor = pieceToColorMap[pieceToCount];

        relativePieceValue = positionValue[pieceToCount % 6][pieceCountingIndex, (-pieceColor+1)*adjustedSquare+(63-adjustedSquare)*(pieceColor)] * (pieceColor * -2 + 1 );

        evaluation.piecePosition += relativePieceValue;
    }
    evaluation.sum += evaluation.piecePosition;

    return evaluation;
}

function alphaBeta(board, depth, alpha, beta, legalMoves, captureChecksLeft) {
    if (depth == 0) {
        if ((captureChecksLeft > 0) && ((capturingMoves = legalMoves.filter(move => board[move%100] != 0)).length > 0)) {
            let colorMultiplier = board[120] * -2 + 1;
            let alphaBetaResult = alphaBeta(board, 1, alpha, beta, capturingMoves, captureChecksLeft-1);
            let evaluationResult = evaluatePosition(board);
            if (evaluationResult.sum*colorMultiplier > alphaBetaResult.sum*colorMultiplier) {
                return evaluationResult;
            }
            return alphaBetaResult;
        }
        return evaluatePosition(board);
    }
    
    if (legalMoves.length == 0) {
        if (isInCheckmate(board)) {
            return {sum: Infinity*-(board[120]*2+1)};
        }
        return {sum: 0};
    }

    if (board[120] == 0) {
        let bestEvaluation = {sum:-Infinity};
        let lastEvaluation;
        for (let move of legalMoves) {
            let temporaryBoard = structuredClone(board);
            makeMove(move, temporaryBoard);
            let temporaryBoardLegalMoves = generateMoves(temporaryBoard);
            lastEvaluation = alphaBeta(temporaryBoard, depth - 1, alpha, beta, temporaryBoardLegalMoves, captureChecksLeft)
            if (bestEvaluation.sum < lastEvaluation.sum) {
                bestEvaluation = lastEvaluation;
            }
            if (bestEvaluation.sum > beta) {
                break;
            }
            alpha = Math.max(alpha, bestEvaluation.sum);
        }
        return bestEvaluation;
    }
    else {
        let bestEvaluation = {sum:Infinity};
        let lastEvaluation;
        for (let move of legalMoves) {
            let temporaryBoard = structuredClone(board);
            makeMove(move, temporaryBoard);
            let temporaryBoardLegalMoves = generateMoves(temporaryBoard);
            lastEvaluation = alphaBeta(temporaryBoard, depth - 1, alpha, beta, temporaryBoardLegalMoves, captureChecksLeft);
            if (bestEvaluation.sum > lastEvaluation.sum) {
                bestEvaluation = lastEvaluation;
            }
            if (bestEvaluation.sum < alpha) {
                break;
            }
            beta = Math.min(beta, bestEvaluation.sum);
        }
        return bestEvaluation;
    }
}

function chooseMoveWithAlphaBeta(board, depth, legalMoves, maxCaptureChecks) {
    let bestMove = legalMoves[0];
    if (board[120] == 0) {
        let bestEvaluation = {sum:-Infinity};
        for (let move of legalMoves) {
            let temporaryBoard = structuredClone(board);
            makeMove(move, temporaryBoard);
            let temporaryBoardLegalMoves = generateMoves(temporaryBoard);
            let alphaBetaResult = alphaBeta(temporaryBoard, depth - 1, -Infinity, Infinity, temporaryBoardLegalMoves, maxCaptureChecks);
            addToPageConsole(`info calculatedPercentage ${Math.round(legalMoves.indexOf(move) / legalMoves.length * 100)}`);
            if (bestEvaluation.sum < alphaBetaResult.sum) {
                bestEvaluation = alphaBetaResult;
                bestMove = move;
            }
        }
        return {evaluation: bestEvaluation, move: bestMove};
    }
    else {
        let bestEvaluation = {sum:Infinity};
        for (let move of legalMoves) {
            let temporaryBoard = structuredClone(board);
            makeMove(move, temporaryBoard);
            let temporaryBoardLegalMoves = generateMoves(temporaryBoard);
            let alphaBetaResult = alphaBeta(temporaryBoard, depth - 1, -Infinity, Infinity, temporaryBoardLegalMoves, maxCaptureChecks);
            addToPageConsole(`info calculatedPercentage ${Math.round(legalMoves.indexOf(move) / legalMoves.length * 100)}`);
            if (bestEvaluation.sum > alphaBetaResult.sum) {
                bestEvaluation = alphaBetaResult;
                bestMove = move;
            }
        }

        return {evaluation: bestEvaluation, move: bestMove};
    }
}

function evaluateMove(move,board,depth,captureDepth,bestMoveEval = undefined) {
    bestMoveEval = bestMoveEval ?? chooseMoveWithAlphaBeta(board, depth, generateMoves(board),captureDepth);
    let bestEval = bestMoveEval.evaluation;
    let bestMove = bestMoveEval.move;
    if (move == bestMove) {
        return 0;
    }
    let temporaryBoard = structuredClone(board);
    makeMove(move,temporaryBoard);
    let madeMoveEval=alphaBeta(temporaryBoard, depth-1, -Infinity, Infinity, generateMoves(temporaryBoard), captureDepth);
    return (board[120]*-2+1)*(madeMoveEval.sum-bestEval.sum)
}

function addToMoveList(board, move, legalMoves) {
    let moveList = document.getElementById('moveList').innerHTML;
    if (board[120] == 0) {
        document.getElementById('moveList').innerHTML = moveList + `<br>${(board[124] + 1)}. <span onclick='elaborateMove(${move}, [${board}])'>${moveToAlgebraic(move, legalMoves, board, false, false)}</span>`;
    } else {
        document.getElementById('moveList').innerHTML = moveList + ` <span onclick='elaborateMove(${move}, [${board}])'>`+moveToAlgebraic(move, legalMoves, board, false, false);
    }
}

function elaborateMove(move, board) {
    const moveEvaluation = evaluateMove(move, board, document.getElementById('depthInput').value, document.getElementById('captureDepthInput').value);
    let moveName = '';
    if (moveEvaluation > 0) {
        moveName = 'a brilliant move';
    }
    if (moveEvaluation == 0) {
        moveName = 'the best move';
    }
    if (moveEvaluation < 0) {
        moveName = 'a good move';
    }
    if (moveEvaluation < -75) {
        moveName = 'a mistake';
    }
    if (moveEvaluation < -250) {
        moveName = 'a blunder';
    }
    alert(
`The move ${move} is ${moveName}.
The move lost ${Math.round(-moveEvaluation)} centipawns.`
    )
}

function evaluateGame(game) {
    let board = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    let lastGeneratedMoves;
    let moveEvaluationSum = [0,0];
    let movesEvaluated = [0,0];
    let depth = document.getElementById('depthInput').value;
    let captureDepth = document.getElementById('captureDepthInput').value;

    for (let move of game.moves) {
        moveEvaluationSum[board[120]] += evaluateMove(move, board, depth, captureDepth);
        movesEvaluated[board[120]]++;
        makeMove(move, board);
    }
    console.log(moveEvaluationSum, movesEvaluated);
    return [moveEvaluationSum[0]/movesEvaluated[0], moveEvaluationSum[1]/movesEvaluated[1]];
}

function setAppAesthetic(darkColor, lightColor, boardLightColor) {
    const element = document.documentElement;
    element.style.setProperty("--main-color-dark", darkColor);
    element.style.setProperty("--main-color-light", lightColor);
    element.style.setProperty('--board-color-light', boardLightColor);
}

function test() {
    let board = interpretFEN('r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq -');
    console.log('MoveGen: '+(perft(board, 3) == 97862));
}

function uciInterpret(input) {
    input = input.replace(/\s+/, ' ');
    let splitInput = input.split(' ');
    const commands = [
        ['uci', () => {addToPageConsole('id name lususEngine', 'id author jia75','uciok');}],
        ['isready', () => {addToPageConsole('readyok');}],
        ['position', (command) => {
            if (command[1] != 'startpos') {
                let fenString = command[1];
                let fenIndex = 1;
                while (command[fenIndex+1] ?? 'moves' != 'moves') {
                    fenIndex++;
                    fenString += command[fenIndex];
                }
                mainBoard = interpretFEN(fenString);
            } else {
                mainBoard = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
            }
            let nextMoveIndex = command.indexOf('moves') + 1;
            while ((command[nextMoveIndex] ?? 0) != 0) {
                addToMoveList(mainBoard, command[nextMoveIndex], generateMoves(mainBoard));
                makeMove(command[nextMoveIndex], mainBoard, mainGame);
                nextMoveIndex++;
            }
        }],
        ['go', (command) => {}]
    ];
    try {
        commands.find(x => x[0] == splitInput[0])[1](splitInput);
    } catch (error) {}
    displayBoard(mainBoard);
}

var clickedSquare = 0;
var mainBoard = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
let mainGame = {moves:[], tags:[]};
//mainBoard = interpretFEN('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - -');