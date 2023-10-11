class Piece {
  // types: 0:King, 1:Queen, 2:Rook, 3:Bishop, 4:Knight, 5:Pawn
  // colors: 0:White, 1:Black
  constructor(type, color, positionIndex=undefined) {
      this.type = type;
      this.color = color;
      this.pieceCode = (color*6) + type;
      this.rank = indexToFileRank(positionIndex).rank;
      this.file = indexToFileRank(positionIndex).file;
  }
}

class Move {
  constructor(fromSquare, toSquare, piecePromotion=undefined, enPassantSquare=undefined) {
    this.from = fromSquare;
    this.to = toSquare;
    this.piecePromotion = piecePromotion;
    this.enPassantSquare = enPassantSquare;
  }
}

class Chessboard {
  //List: 0: a8, 1: b8 ...
  constructor(pieceArray=Array(64), displayBoard = false, colorToPlay = 0, enPassantSquare = undefined, moveHistory = []) {
    this.board = pieceArray;
    this.toPlay = colorToPlay;
    this.moveHistory = moveHistory;
    this.displayBoard = displayBoard;
    this.enPassantSquare = enPassantSquare;
  }
  makeMove(moveToMake) {
    //console.log(this.board[52]);
    console.log(moveToMake);
    if (this.displayBoard) {
      document.getElementById("playerMoveFormError").innerHTML = "";
    if (this.toPlay == 0) {
      document.getElementById("moveList").insertAdjacentHTML("beforeend", "<br>"+((this.moveHistory.length/2)+1).toString()+". "+moveToAlgebraicNotation(this, moveToMake))
    } else {
      document.getElementById("moveList").insertAdjacentHTML("beforeend", " "+moveToAlgebraicNotation(this, moveToMake))
    }
    }
    if (moveToMake.piecePromotion != undefined) {
      this.board[moveToMake.from].type = moveToMake.piecePromotion;
      this.board[moveToMake.from].pieceCode -= (5-moveToMake.piecePromotion);
    }
    //movehistory: [move made, overriden square contents, was en passant]
    //to add : when taking on a square that is the en passant square, capture the piece that would be captured
    if (moveToMake.to == this.enPassantSquare && this.board[moveToMake.from].type == 5)
    {
      this.moveHistory.push([moveToMake, this.board[moveToMake.to - (8*((this.toPlay*2)-1))], true]);
      this.board[moveToMake.from].rank = indexToFileRank(moveToMake.to).rank;
      this.board[moveToMake.from].file = indexToFileRank(moveToMake.to).file;
      this.board.splice(moveToMake.to,1,this.board[moveToMake.from]);
      this.board.splice(moveToMake.from,1,undefined); 
      this.board.splice(moveToMake.to - (8*((this.toPlay*2)-1)),1,undefined); 
    } else {
    this.moveHistory.push([moveToMake, this.board[moveToMake.to], false]);
    this.board[moveToMake.from].rank = indexToFileRank(moveToMake.to).rank;
    this.board[moveToMake.from].file = indexToFileRank(moveToMake.to).file;
    this.board.splice(moveToMake.to,1,this.board[moveToMake.from]);
    this.board.splice(moveToMake.from,1,undefined); 
    }
    this.toPlay = (this.toPlay+1)%2;
    this.enPassantSquare = undefined;
    if (moveToMake.enPassantSquare != undefined) {
      this.enPassantSquare = moveToMake.enPassantSquare;
    }
  }
  undoLastMove() {
    let lastMove = this.moveHistory.pop();
    if (lastMove[0].piecePromotion != undefined) {
      this.board[lastMove[0].to].type = 5;
      this.board[lastMove[0].to].pieceCode += (5-lastMove[0].piecePromotion);
    }
    this.board[lastMove[0].to].rank = indexToFileRank(lastMove[0].from).rank;
    this.board[lastMove[0].to].file = indexToFileRank(lastMove[0].from).file;
    this.board.splice(lastMove[0].from,1,this.board[lastMove[0].to]);
    this.board.splice(lastMove[0].to,1,lastMove[1]);
    this.toPlay = (this.toPlay+1)%2;
  }
  getDisplayString() {
    let pieceToFileArray = ["whiteKing","whiteQueen","whiteRook","whiteBishop","whiteKnight","whitePawn",
    "blackKing","blackQueen","blackRook","blackBishop","blackKnight","blackPawn"];
    let chessPieceImageString = ""
    for(let chessboardInterfaceIndex = 0; chessboardInterfaceIndex < 64; chessboardInterfaceIndex++) {
      if (this.board[chessboardInterfaceIndex] != undefined) {
        chessPieceImageString += "<img class ='chessPieceImage' src='pieces/"+pieceToFileArray[this.board[chessboardInterfaceIndex].pieceCode].toString()+
        ".svg' style='top:"+(Math.floor(chessboardInterfaceIndex/8)*10.625).toString()+"vh; left: "+((chessboardInterfaceIndex%8)*10.625).toString()+"vh;'></img>"  
      }
    }
    return chessPieceImageString;
  }
  display() {
    document.getElementById('chessPieceImageContainer').innerHTML=this.getDisplayString();
  }
  generateMoves() {
    let moveList = [];
    let originSquares = [];
    let emptySquares = [];
    let enemySquares = [];
    let generalDestinationSquares = [];

    for (let chessboardCheckIndex = 0; chessboardCheckIndex < 64; chessboardCheckIndex++) {
      if (this.board[chessboardCheckIndex] != undefined) {
        if (this.board[chessboardCheckIndex].color == this.toPlay) {
          originSquares.push(chessboardCheckIndex);
        } else {
          enemySquares.push(chessboardCheckIndex);
          generalDestinationSquares.push(chessboardCheckIndex);
        }
      } else {
        emptySquares.push(chessboardCheckIndex);
        generalDestinationSquares.push(chessboardCheckIndex);
      }
    }

    for (let originSquareIndex = 0; originSquareIndex < originSquares.length; originSquareIndex++) {
      //White Pawn
      if (this.board[originSquares[originSquareIndex]].pieceCode == 5) {
        if (this.board[originSquares[originSquareIndex]].rank == 6) {
          if (emptySquares.includes(originSquares[originSquareIndex]-8)) {
            for (let moveGeneratorIndex = 1; moveGeneratorIndex<5;moveGeneratorIndex++) {
              moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-8,moveGeneratorIndex));}
          } if (enemySquares.includes((originSquares[originSquareIndex]-7)) && this.board[originSquares[originSquareIndex]].file != 7) {
            for (let moveGeneratorIndex = 1; moveGeneratorIndex<5;moveGeneratorIndex++) {
              moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-7,moveGeneratorIndex));}
          } if (enemySquares.includes((originSquares[originSquareIndex]-9)) && this.board[originSquares[originSquareIndex]].file != 0) {
            for (let moveGeneratorIndex = 1; moveGeneratorIndex<5;moveGeneratorIndex++) {
              moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-9,moveGeneratorIndex));}
          }
        } else {
        if (this.board[originSquares[originSquareIndex]].rank == 1) {
          if (emptySquares.includes(originSquares[originSquareIndex]-8) && emptySquares.includes(originSquares[originSquareIndex]-16)) {
            moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-16,undefined,originSquares[originSquareIndex]-8));
          }
        }
        if (emptySquares.includes(originSquares[originSquareIndex]-8)) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-8));
        } if (enemySquares.concat([this.enPassantSquare]).includes((originSquares[originSquareIndex]-7)) && this.board[originSquares[originSquareIndex]].file != 7) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-7));
        } if (enemySquares.concat([this.enPassantSquare]).includes((originSquares[originSquareIndex]-9)) && this.board[originSquares[originSquareIndex]].file != 0) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-9));
        }}
      }
      //Black Pawn
      if (this.board[originSquares[originSquareIndex]].pieceCode == 11) {
        if (this.board[originSquares[originSquareIndex]].rank == 1) {
          if (emptySquares.includes(originSquares[originSquareIndex]+8)) {
            for (let moveGeneratorIndex = 1; moveGeneratorIndex<5;moveGeneratorIndex++) {
              moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+8,moveGeneratorIndex));}
          } if (enemySquares.includes((originSquares[originSquareIndex]+7)) && this.board[originSquares[originSquareIndex]].file != 0) {
            for (let moveGeneratorIndex = 1; moveGeneratorIndex<5;moveGeneratorIndex++) {
              moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+7,moveGeneratorIndex));}
          } if (enemySquares.includes((originSquares[originSquareIndex]+9)) && this.board[originSquares[originSquareIndex]].file != 7) {
            for (let moveGeneratorIndex = 1; moveGeneratorIndex<5;moveGeneratorIndex++) {
              moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+9,moveGeneratorIndex));}
          }
        } else {
        if (this.board[originSquares[originSquareIndex]].rank == 6) {
          if (emptySquares.includes(originSquares[originSquareIndex]+8) && emptySquares.includes(originSquares[originSquareIndex]+16)) {
            moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+16,undefined,originSquares[originSquareIndex]+8));
          }
        }
        if (emptySquares.includes(originSquares[originSquareIndex]+8)) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+8));
        } if (enemySquares.concat([this.enPassantSquare]).includes((originSquares[originSquareIndex]+7)) && this.board[originSquares[originSquareIndex]].file != 0) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+7));
        } if (enemySquares.concat([this.enPassantSquare]).includes((originSquares[originSquareIndex]+9)) && this.board[originSquares[originSquareIndex]].file != 7) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+9));
        } }
      }
      //Knight
      if (this.board[originSquares[originSquareIndex]].type == 4) {
        if (generalDestinationSquares.includes((originSquares[originSquareIndex]+10)) 
        && this.board[originSquares[originSquareIndex]].file < 6 
        && this.board[originSquares[originSquareIndex]].rank > 0) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+10));
        }
        if (generalDestinationSquares.includes((originSquares[originSquareIndex]+17)) 
        && this.board[originSquares[originSquareIndex]].file < 7 
        && this.board[originSquares[originSquareIndex]].rank > 1) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+17));
        }
        if (generalDestinationSquares.includes((originSquares[originSquareIndex]+6)) 
        && this.board[originSquares[originSquareIndex]].file > 0 
        && this.board[originSquares[originSquareIndex]].rank > 1) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+6));
        }
        if (generalDestinationSquares.includes((originSquares[originSquareIndex]+15)) 
        && this.board[originSquares[originSquareIndex]].file > 0 
        && this.board[originSquares[originSquareIndex]].rank > 1) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]+15));
        }
        if (generalDestinationSquares.includes((originSquares[originSquareIndex]-10)) 
        && this.board[originSquares[originSquareIndex]].file > 1 
        && this.board[originSquares[originSquareIndex]].rank < 7) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-10));
        }
        if (generalDestinationSquares.includes((originSquares[originSquareIndex]-6)) 
        && this.board[originSquares[originSquareIndex]].file < 6 
        && this.board[originSquares[originSquareIndex]].rank < 7) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-6));
        }
        if (generalDestinationSquares.includes((originSquares[originSquareIndex]-17)) 
        && this.board[originSquares[originSquareIndex]].file > 0 
        && this.board[originSquares[originSquareIndex]].rank < 6) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-17));
        }
        if (generalDestinationSquares.includes((originSquares[originSquareIndex]-15)) 
        && this.board[originSquares[originSquareIndex]].file < 7 
        && this.board[originSquares[originSquareIndex]].rank < 6) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex]-15));
        }
      }
      //Rook Moves
      if (this.board[originSquares[originSquareIndex]].type == 2 || this.board[originSquares[originSquareIndex]].type == 1) {
        //Moving left
        for (let DestinationSquareIndex = originSquares[originSquareIndex] - 1;
          indexToFileRank(DestinationSquareIndex+1).file > 0;
          DestinationSquareIndex -= 1) {
            if (emptySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              continue;
            }
            if (enemySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              break;
            }
            break;
          }
        //Moving right
        for (let DestinationSquareIndex = originSquares[originSquareIndex] + 1;
          indexToFileRank(DestinationSquareIndex -1).file < 7;
          DestinationSquareIndex += 1) {
            if (emptySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              continue;
            }
            if (enemySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              break;
            }
            break;
          }
          //Moving up
        for (let DestinationSquareIndex = originSquares[originSquareIndex] - 8;
          indexToFileRank(DestinationSquareIndex+8).rank < 7;
          DestinationSquareIndex -= 8) {
            if (emptySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              continue;
            }
            if (enemySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              break;
            }
            break;
          }
          //Moving down
        for (let DestinationSquareIndex = originSquares[originSquareIndex] + 8;
          indexToFileRank(DestinationSquareIndex-8).rank > 0;
          DestinationSquareIndex += 8) {
            if (emptySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              continue;
            }
            if (enemySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              break;
            }
            break;
          }
      }
      //Bishop Moves
      if (this.board[originSquares[originSquareIndex]].type == 3 || this.board[originSquares[originSquareIndex]].type == 1) {
        for (let DestinationSquareIndex = originSquares[originSquareIndex] - 9;
          indexToFileRank(DestinationSquareIndex+9).file > 0 && indexToFileRank(DestinationSquareIndex+9).rank < 7;
          DestinationSquareIndex -= 9) {
            if (emptySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              continue;
            }
            if (enemySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              break;
            }
            break;
          }
        for (let DestinationSquareIndex = originSquares[originSquareIndex] - 7;
          indexToFileRank(DestinationSquareIndex+7).file < 7 && indexToFileRank(DestinationSquareIndex+7).rank < 7;
          DestinationSquareIndex -= 7) {
            if (emptySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              continue;
            }
            if (enemySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              break;
            }
            break;
          }
        for (let DestinationSquareIndex = originSquares[originSquareIndex] + 7;
          indexToFileRank(DestinationSquareIndex-7).file > 0 && indexToFileRank(DestinationSquareIndex-7).rank > 0;
          DestinationSquareIndex += 7) {
            if (emptySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              continue;
            }
            if (enemySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              break;
            }
            break;
          }
        for (let DestinationSquareIndex = originSquares[originSquareIndex] + 9;
          indexToFileRank(DestinationSquareIndex-9).file < 7 && indexToFileRank(DestinationSquareIndex-9).rank > 0;
          DestinationSquareIndex += 9) {
            if (emptySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              continue;
            }
            if (enemySquares.includes(DestinationSquareIndex)) {
              moveList.push(new Move(originSquares[originSquareIndex],DestinationSquareIndex));
              break;
            }
            break;
          }
      }
      if (this.board[originSquares[originSquareIndex]].type == 0) {
        let allowedKingDifferences = [-9,-8,-7,-1,1,7,8,9];
        for (let pieceMoveCheckerIndex = 0; pieceMoveCheckerIndex < 8; pieceMoveCheckerIndex++) {
          if (generalDestinationSquares.includes(originSquares[originSquareIndex] + allowedKingDifferences[pieceMoveCheckerIndex]) 
          && Math.abs(indexToFileRank(originSquares[originSquareIndex]).file
          -indexToFileRank(originSquares[originSquareIndex] + allowedKingDifferences[pieceMoveCheckerIndex]).file)<2) {
            moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex] + allowedKingDifferences[pieceMoveCheckerIndex]));
          }
        }
      }
    }
    if (this.displayBoard) {
    clearInterfaceChessboard();
    highlightMoveList(moveList);
    }
    return moveList;
  }
}

function clearInterfaceChessboard() {
  for (let colorClearIndex = 0; colorClearIndex < 64; colorClearIndex++) {
    document.getElementById("square"+colorClearIndex).style.backgroundColor = "#00000000";
  }
}
function highlightMoveList(moveList) {
  for (let highlightingIndex in moveList) {
    document.getElementById("square"+moveList[highlightingIndex].to).style.backgroundColor = "#0000ff40";
  }
}

function validateMove(generatedMoves, move) {
  let matchingMove = generatedMoves.find(generatedMovesIndex => generatedMovesIndex.from == move.from 
    && generatedMovesIndex.to == move.to 
    && generatedMovesIndex.piecePromotion == move.piecePromotion);
  if (matchingMove != undefined) {
    move.enPassantSquare = matchingMove.enPassantSquare;
    //king safety check
    secondaryChessboard.makeMove(move);
    let kingCode = ((secondaryChessboard.toPlay+1)%2)*6;
    let kingSpot = secondaryChessboard.board.indexOf(secondaryChessboard.board.find(arraySearchIndexPiece => arraySearchIndexPiece != undefined 
      && arraySearchIndexPiece.pieceCode == kingCode));
    if (secondaryChessboard.generateMoves().some(generatedMovesIndex => generatedMovesIndex.from != move.from 
      && generatedMovesIndex.to == kingSpot)) {
        secondaryChessboard.undoLastMove();
        return false;
      }
    secondaryChessboard.undoLastMove();
    return true;
  }
  return false;
}

function fenToChessboard(fen, displayBoard) {
  let pieceSymbolToCode = ["K","Q","R","B","N","P","k","q","r","b","n","p"];
  let temporaryChessboard = Array(64);
  let chessboardModifierIndex = 0;
  let possibleEmptySquareNumbers = ["1","2","3","4","5","6","7","8"]
  for (let fenStringIndex = 0; fenStringIndex < fen.length; fenStringIndex++) {
    if (possibleEmptySquareNumbers.includes(fen.split("")[fenStringIndex])) {
      chessboardModifierIndex += possibleEmptySquareNumbers.indexOf(fen.split("")[fenStringIndex])+1;
      continue;
    }
    if (fen.split("")[fenStringIndex] === "/") {
      continue;
    }
    temporaryChessboard[chessboardModifierIndex] = new Piece(pieceSymbolToCode.indexOf(fen.split("")[fenStringIndex])%6,
    Math.floor(pieceSymbolToCode.indexOf(fen.split("")[fenStringIndex])/6),chessboardModifierIndex);
    chessboardModifierIndex++;
  }
  return new Chessboard(temporaryChessboard, displayBoard);
}

function coordsToIndex(coords) {
  let files = ["a","b","c","d","e","f","g","h"]
  return files.indexOf(coords.split("")[0])+(8*(8-parseInt(coords.split("")[1])));
}

function indexToCoords(index) {
  let files = ["a","b","c","d","e","f","g","h"]
  return files[index%8]+(8-Math.floor(index/8)).toString();
}

function moveToAlgebraicNotation(temporaryChessboard,move) {
  let pieceSymbols = ["K","Q","R","B","N",""];
  return pieceSymbols[temporaryChessboard.board[move.from].type]+indexToCoords(move.to);
}

function indexToFileRank(index) {
  if (index == undefined) {return {"file":undefined, "rank":undefined}}
  return {"file":index%8, "rank":7-Math.floor(index/8)}
}

function squareClicked(temporaryChessboard,square) {
  if (highlightedSquare == undefined) {
  document.getElementById("square"+square).style.backgroundColor = "#ff000040";
  highlightedSquare = square;
  } 
  else {
    if ((indexToFileRank(square).rank == 0 || indexToFileRank(square).rank == 7) && temporaryChessboard.board[highlightedSquare].type == 5) {
      //!!! CHANGE (TEMPORARILY ONLY QUEEN PROMOTION) !!!
      var piecePromotionPiece = 1;
    } else {
      var piecePromotionPiece = undefined;
    }
    var clickedMove = new Move(highlightedSquare,square, piecePromotionPiece);
    if (validateMove(mainGeneratedMoves, clickedMove)) {
      temporaryChessboard.makeMove(clickedMove);
      secondaryChessboard.makeMove(clickedMove);
      temporaryChessboard.display();
      mainGeneratedMoves = chessboard.generateMoves();
      if (mainGeneratedMoves.length == 0) {
        alert("Stalemate!\nDraw");
      }
    } else {
      document.getElementById("playerMoveFormError").innerHTML = "Invalid Move";
    }
    document.getElementById("square"+highlightedSquare).style.backgroundColor = "#ff000000";
    highlightMoveList(mainGeneratedMoves);
    highlightedSquare = undefined;
  }
}

var highlightedSquare = undefined;
var chessboard = fenToChessboard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", true);
var secondaryChessboard = fenToChessboard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR", false);
