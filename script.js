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

function parsePGN(pgn) {
    let board = initializeBoard();
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
    return game;
}

function reenactGame(game) {
    let board = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    let lastGeneratedMoves;

    for (let move of game.moves) {
        properMove = algebraicToMove(move,board,(lastGeneratedMoves = generateMoves(board)));
        if (properMove == undefined) {
            displayBoard(board);
            console.log(generateMoves(board));
            throw new Error ('Invalid PGN');
        }
        makeMove(properMove, board, lastGeneratedMoves);
    }

    return board;
}

function moveToAlgebraic(move, legalMoves, board, isCheck, isCheckMate) {
    legalMoves.splice(legalMoves.indexOf(move), 1);
    let noPromotionMoves = removePromotionNotationFromMovelist(legalMoves, board);
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
    if (move == 'O-O' || move == '0-0') {
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
    let colorToPlay = board[120];
    let colorMultiplier = board[120] * -2 + 1;
    let emptySquares = Array();
    let occupiedSquares = Array();
    let friendlySquares = Array();
    let enemySquares = Array();
    let attackedSquares = [];
    let friendlyKingSquare = board.indexOf(6*colorToPlay+1);
    let checkingMoves = [];
    let squaresOfPinnedPieces = Array(8).fill(0);

    //Square Categorization let squareCategorizationIndex = 21; squareCategorizationIndex < 99; squareCategorizationIndex++
    for (let squareCategorizationIndex of standardBoardToBuffered) {
        if (board[squareCategorizationIndex] == 0) {
            emptySquares.push(squareCategorizationIndex);
            continue;
        }
        if (pieceToColor(board[squareCategorizationIndex]) == colorToPlay) {
            friendlySquares.push(squareCategorizationIndex);
            occupiedSquares.push(squareCategorizationIndex);
            continue;
        }
        enemySquares.push(squareCategorizationIndex);
        occupiedSquares.push(squareCategorizationIndex);
    }
   
    board[120] = -(colorToPlay-1);
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
    for (let pawnSquare of squaresToStartFrom.filter(square => board[square]%6==0)) {
        moveList = moveList.concat(findPawnMoves(pawnSquare, board, enemySquares, emptySquares));
        squaresToStartFrom.splice(squaresToStartFrom.indexOf(pawnSquare),1);
    }
    //Rook
    for (let rookSquare of squaresToStartFrom.filter(square => board[square]%6==3 || board[square]%6==2)) {
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,friendlySquares,enemySquares,10));
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,friendlySquares,enemySquares,1));
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,friendlySquares,enemySquares,-10));
        moveList = moveList.concat(exploreSlidingDirection(rookSquare,board,friendlySquares,enemySquares,-1));
        if (board[rookSquare]%6 == 3) {
            squaresToStartFrom.splice(squaresToStartFrom.indexOf(rookSquare),1);
        }
    }

    //Bishop
    for (let bishopSquare of squaresToStartFrom.filter(square => board[square]%6==4 || board[square]%6==2)) {
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,friendlySquares,enemySquares,11));
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,friendlySquares,enemySquares,-9));
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,friendlySquares,enemySquares,-11));
        moveList = moveList.concat(exploreSlidingDirection(bishopSquare,board,friendlySquares,enemySquares,9));
        squaresToStartFrom.splice(squaresToStartFrom.indexOf(bishopSquare),1);
    }

    //Knight
    for (let knightSquare of squaresToStartFrom.filter(square => board[square]%6==5)) {
        moveList = moveList.concat(findMappedMoves(knightSquare, friendlySquares, [21,19,12,-12,-19,-21,-8,8],[]));
        squaresToStartFrom.splice(squaresToStartFrom.indexOf(knightSquare),1);
    }

    //King
    moveList = moveList.concat(findMappedMoves(squaresToStartFrom[0], friendlySquares, directions, attackedSquares));

    

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
            if (interjectionSquares.includes(moveList[filteringIndex-1]%100)) {
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
    let occupiedSquares = Array();
    let friendlySquares = Array();
    let enemySquares = Array();
    let friendlyKingSquare = board.indexOf(6*colorToPlay+1);

    for (let squareCategorizationIndex of standardBoardToBuffered) {
        if (board[squareCategorizationIndex] == 0) {
            emptySquares.push(squareCategorizationIndex);
            continue;
        }
        if (pieceToColor(board[squareCategorizationIndex]) == colorToPlay) {
            friendlySquares.push(squareCategorizationIndex);
            occupiedSquares.push(squareCategorizationIndex);
            continue;
        }
        enemySquares.push(squareCategorizationIndex);
        occupiedSquares.push(squareCategorizationIndex);
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

function makeMove(move,board,legalMoves) {
    if (!legalMoves.includes(move)) {
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
    board[120] = -(board[120]-1);
    return [true,capturedPiece, previousEnPassantSquare];
}

function unmakeMove(move, board, capturedPiece, previousEnPassantSquare) {
    moveParts = move.toString().match(/\d{2}/g); 

    if (+moveParts[1] == previousEnPassantSquare && board[moveParts[1]] % 6 == 0) {
        board[moveParts[1] - 10 * (board[120] * -2 + 1)] = capturedPiece;
    }
    board[122] = previousEnPassantSquare;
    [board[moveParts[0]], board[moveParts[1]]] = [board[moveParts[1]], capturedPiece];
    board[120] = (board[120]+1)%2;
}

function squareClickEvent(square, board, promotionValue) {
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
    if (makeMove(clickedSquare*100+bufferedSquare,board,generateMoves(board))[0]) {
        let generatedMoves = generateMoves(board);
        let chosenMove = chooseMoveWithAlphaBeta(board, 4, generatedMoves, 4);
        makeMove(chosenMove.move, board, generatedMoves);
        document.getElementById('evaluation').innerHTML = chosenMove.evaluation.toString();
        clearInterfaceChessboard();
        highlightSquare(clickedSquare, "#00000000");
        highlightMoveList(removePromotionNotationFromMovelist(generateMoves(board),board));
        clickedSquare = 0;
        displayBoard(board);
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
        makeMove(moveToMake, temporaryBoard, [moveToMake]);
        newMoves = generatePossiblePositions(temporaryBoard, depth - 1);
        positions = positions.concat(newMoves);
        if (showPerMove) {
            console.log(bufferedIndexToCoordinates(Math.floor(moveToMake/100))+(bufferedIndexToCoordinates(promotionNotationToMove(moveToMake,board)%100)+": " + newMoves.length))
        }
    }
    
    return positions;
}
function perft(board, maxLayer, moreInfo= false) {
    let currentDepth = 0;
    while (currentDepth-1 < maxLayer) {
        let start = Date.now();
        console.log(currentDepth + ": " + generatePossiblePositions(board,currentDepth,moreInfo).length + "(in "+(-start+Date.now())+"ms)");
        currentDepth++;
    }
}

function evaluatePosition(board) {
    let colorToPlay = board[120];
    let colorMultiplier = board[120] * -2 + 1;
    const pieceValues = [100,0,900,500,300,280];
    let evaluation = {0: 0};
    let relativePieceValue;
    let pieceToCount;
    let adjustedSquare;

    //pieceSum
    evaluation.pieceSum = 0;
    for (let pieceCountingIndex = 20; pieceCountingIndex < 100; pieceCountingIndex++) {
        pieceToCount = board[pieceCountingIndex];
        if (pieceToCount == 0 || pieceToCount == 13) {
            continue;
        }
        relativePieceValue = pieceValues[pieceToCount % 6] * ( pieceToColor(pieceToCount) * -2 + 1 );

        evaluation.pieceSum += relativePieceValue;
    }
    evaluation[0] += evaluation.pieceSum;

    //piecePosition
    evaluation.piecePosition = 0;
    for (let pieceCountingIndex = 20; pieceCountingIndex < 100; pieceCountingIndex++) {
        pieceToCount = board[pieceCountingIndex];
        if (pieceToCount == 0 || pieceToCount == 13) {
            continue;
        }
        adjustedSquare = standardBoardToBuffered.indexOf(pieceCountingIndex);
        adjustedSquare = invertedBoardToStandard.indexOf(adjustedSquare);

        let pieceColor = pieceToColor(pieceToCount);

        relativePieceValue = positionValue[pieceToCount % 6][pieceCountingIndex, (-pieceColor+1)*adjustedSquare+(63-adjustedSquare)*(pieceColor)] * (pieceColor * -2 + 1 );

        evaluation.piecePosition += relativePieceValue;
    }
    evaluation[0] += evaluation.piecePosition;

    return evaluation;
}

function alphaBeta(board, depth, alpha, beta, legalMoves, captureChecksLeft) {
    if (depth == 0) {
        if (captureChecksLeft!=0 && (capturingMoves = legalMoves.filter(move => board[move%100] != 0)).length != 0) {
            return alphaBeta(board, 1, alpha, beta, capturingMoves, captureChecksLeft-1);
        }
        return evaluatePosition(board)[0];
    }

    if (board[120] == 0) {
        let value = -Infinity;
        for (let move of legalMoves) {
            let temporaryBoard = structuredClone(board);
            makeMove(move, temporaryBoard, [move]);
            let temporaryBoardLegalMoves = generateMoves(temporaryBoard);
            value = Math.max(value, alphaBeta(temporaryBoard, depth - 1, alpha, beta, temporaryBoardLegalMoves, captureChecksLeft));
            if (value > beta) {
                break;
            }
            alpha = Math.max(alpha, value);
        }
        return value;
    }
    else {
        let value = Infinity;
        for (let move of legalMoves) {
            let temporaryBoard = structuredClone(board);
            makeMove(move, temporaryBoard, [move]);
            let temporaryBoardLegalMoves = generateMoves(temporaryBoard);
            value = Math.min(value, alphaBeta(temporaryBoard, depth - 1, alpha, beta, temporaryBoardLegalMoves, captureChecksLeft));
            if (value < alpha) {
                break;
            }
            beta = Math.min(beta, value);
        }
        return value;
    }
}

function chooseMoveWithAlphaBeta(board, depth, legalMoves, maxCaptureChecks) {
    let bestMove = legalMoves[0];
    if (board[120] == 0) {
        let value = -Infinity;
        for (let move of legalMoves) {
            let temporaryBoard = structuredClone(board);
            makeMove(move, temporaryBoard, [move]);
            let temporaryBoardLegalMoves = generateMoves(temporaryBoard);
            let alphaBetaResult = alphaBeta(temporaryBoard, depth - 1, -Infinity, Infinity, temporaryBoardLegalMoves, maxCaptureChecks);
            console.log(Math.round(legalMoves.indexOf(move) / legalMoves.length * 100) + '%');
            if (value < alphaBetaResult) {
                value = alphaBetaResult;
                bestMove = move;
            }
        }
        return {evaluation: value, move: bestMove};
    }
    else {
        let value = Infinity;
        for (let move of legalMoves) {
            let temporaryBoard = structuredClone(board);
            makeMove(move, temporaryBoard, [move]);
            let temporaryBoardLegalMoves = generateMoves(temporaryBoard);
            let alphaBetaResult = alphaBeta(temporaryBoard, depth - 1, -Infinity, Infinity, temporaryBoardLegalMoves, maxCaptureChecks);
            console.log(Math.round(legalMoves.indexOf(move) / legalMoves.length * 100) + '%');
            if (value > alphaBetaResult) {
                value = alphaBetaResult;
                bestMove = move;
            }
        }
        return {evaluation: value, move: bestMove};
    }
}
function chooseMoveRecursively(board, depth, legalMoves) {
    if (depth == 0) {
        let chosenMove = chooseMove(board, legalMoves);
        if ((board[chosenMove[0]%100]??0 != 0) && chosenMove[0] != 0) {
            //console.log(chosenMove, board[chosenMove[0]%100]);
            let temporaryBoard = structuredClone(board);
            makeMove(chosenMove[0], temporaryBoard, legalMoves);
            let lastGeneratedMoves = generateMoves(temporaryBoard);
            return chooseMoveRecursively(temporaryBoard, 0, lastGeneratedMoves);
        }
        return [chosenMove[0], chosenMove[1], [chosenMove[0]]];
    }
    let bestMoveEvaluation = undefined;
    let bestMove = 0;
    let lastEvaluation;
    let colorMultiplier = -1*(board[120] * -2 + 1);
    let previousBestMove;
    let temporaryBoardLegalMoves;
    let bestMovePath;

    for (let moveToEvaluate of legalMoves) {
        temporaryBoard = structuredClone(board);
        makeMove(moveToEvaluate, temporaryBoard, legalMoves);

        temporaryBoardLegalMoves = generateMoves(temporaryBoard);

        bestMoveOnTemporaryBoard = chooseMoveRecursively(temporaryBoard, depth - 1, temporaryBoardLegalMoves);



        if ((lastEvaluation = colorMultiplier*bestMoveOnTemporaryBoard[1]) > bestMoveEvaluation || bestMoveEvaluation == undefined) {
            bestMove = moveToEvaluate;
            bestMoveEvaluation = lastEvaluation;
            bestMovePath = previousBestMove[2];
        }
        if (depth == 3) {
            console.log(Math.round(legalMoves.indexOf(moveToEvaluate) / legalMoves.length * 100) + '%');
            console.log(lastEvaluation, moveToEvaluate, bestMovePath);
        }
    }
    try {
    bestMovePath.unshift(bestMove);
    } catch(error) {
        console.log(bestMoveEvaluation);
    }
    return [bestMove, colorMultiplier*bestMoveEvaluation, bestMovePath];
}


var clickedSquare = 0;
var mainBoard = interpretFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
//mainBoard = interpretFEN('8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - -');
