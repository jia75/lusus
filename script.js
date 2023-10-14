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
  // castling dir: 0 kingside 1 queenside
  constructor(fromSquare, toSquare, piecePromotion=undefined, enPassantSquare=undefined, castlingDirection = undefined) {
    this.from = fromSquare;
    this.to = toSquare;
    this.piecePromotion = piecePromotion;
    this.enPassantSquare = enPassantSquare;
    this.castlingDirection = castlingDirection;
  }
}

class Chessboard {
  //List: 0: a8, 1: b8 ...
  //Castling Availability: [whiteKingside,whiteQueenside,blackKingside,blackQueenside]
  constructor(pieceArray=Array(64), displayBoard = false, colorToPlay = 0, enPassantSquare = undefined, moveHistory = [], castlingAvailability = [true,true,true,true]) {
    this.board = pieceArray;
    this.toPlay = colorToPlay;
    this.moveHistory = moveHistory;
    this.displayBoard = displayBoard;
    this.enPassantSquare = enPassantSquare;
    this.castlingAvailability = castlingAvailability;
  }
  makeMove(moveToMake) {
    //console.log(this.board[52]);
    //console.log(moveToMake);
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
    //movehistory: [move made, overriden square contents, was en passant, was castling, castling availabilities changed]
    if (moveToMake.to == this.enPassantSquare && this.board[moveToMake.from].type == 5)
    {
      this.moveHistory.push([moveToMake, this.board[moveToMake.to - (8*((this.toPlay*2)-1))], true, false]);
      this.board[moveToMake.from].rank = indexToFileRank(moveToMake.to).rank;
      this.board[moveToMake.from].file = indexToFileRank(moveToMake.to).file;
      this.board.splice(moveToMake.to,1,this.board[moveToMake.from]);
      this.board.splice(moveToMake.from,1,undefined);
      this.board.splice(moveToMake.to - (8*((this.toPlay*2)-1)),1,undefined);
    } else if (moveToMake.castlingDirection == 0) {
      this.moveHistory.push([moveToMake, this.board[moveToMake.to], false, true]);
      this.board[moveToMake.from].rank = indexToFileRank(moveToMake.to).rank;
      this.board[moveToMake.from].file = indexToFileRank(moveToMake.to).file;
      this.board[moveToMake.from + 3].rank = indexToFileRank(moveToMake.to - 1).rank;
      this.board[moveToMake.from + 3].file = indexToFileRank(moveToMake.to - 1).file;
      this.board.splice(moveToMake.to,1,this.board[moveToMake.from]);
      this.board.splice(moveToMake.from,1,undefined);
      this.board.splice(moveToMake.to - 1,1,this.board[moveToMake.from + 3]);
      this.board.splice(moveToMake.from + 3,1,undefined);
    } else if (moveToMake.castlingDirection == 1) {
      this.moveHistory.push([moveToMake, this.board[moveToMake.to], false, true]);
      this.board[moveToMake.from].rank = indexToFileRank(moveToMake.to).rank;
      this.board[moveToMake.from].file = indexToFileRank(moveToMake.to).file;
      this.board[moveToMake.from - 4].rank = indexToFileRank(moveToMake.to + 1).rank;
      this.board[moveToMake.from - 4].file = indexToFileRank(moveToMake.to + 1).file;
      this.board.splice(moveToMake.to,1,this.board[moveToMake.from]);
      this.board.splice(moveToMake.from,1,undefined);
      this.board.splice(moveToMake.to + 1,1,this.board[moveToMake.from - 4]);
      this.board.splice(moveToMake.from - 4,1,undefined);
    } else {
    this.moveHistory.push([moveToMake, this.board[moveToMake.to], false, false]);
    this.board[moveToMake.from].rank = indexToFileRank(moveToMake.to).rank;
    this.board[moveToMake.from].file = indexToFileRank(moveToMake.to).file;
    this.board.splice(moveToMake.to,1,this.board[moveToMake.from]);
    this.board.splice(moveToMake.from,1,undefined);
    }
    if (this.castlingAvailability.includes(true)) {
      this.moveHistory[this.moveHistory.length-1].push(structuredClone(this.castlingAvailability));
      if (this.board[moveToMake.to].type == 0) {
        this.castlingAvailability[this.toPlay*2] = false;
        this.castlingAvailability[this.toPlay*2+1] = false;
      }
      let rookOriginSquarePerCastle = [63,56,7,0]
      if (rookOriginSquarePerCastle.includes(moveToMake.to)) {
        this.castlingAvailability[rookOriginSquarePerCastle.indexOf(moveToMake.to)] = false;
      }
      if (rookOriginSquarePerCastle.includes(moveToMake.from)) {
        this.castlingAvailability[rookOriginSquarePerCastle.indexOf(moveToMake.from)] = false;
      }
   }

    this.toPlay = (this.toPlay+1)%2;
    this.enPassantSquare = moveToMake.enPassantSquare;
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
    if (lastMove[2]) {
      this.board.splice(lastMove[0].to + (8*((this.toPlay*2)-1)),1,lastMove[1]);
      this.board.splice(lastMove[0].to,1,undefined);
      this.enPassantSquare = lastMove[0].to;
    } else if (lastMove[3]) {
      //Kingside Case
      if (indexToFileRank(lastMove[0].to).file == 6) {
        this.board[lastMove[0].to-1].rank = indexToFileRank(lastMove[0].to + 1).rank;
        this.board[lastMove[0].to-1].file = indexToFileRank(lastMove[0].to + 1).file;
        this.board.splice(lastMove[0].to+1,1,this.board[lastMove[0].to-1]);
        this.board.splice(lastMove[0].to-1,1,undefined);
        this.castlingAvailability[((this.toPlay+1)%2)*2] = true;
      }
      //Queenside Case
      if (indexToFileRank(lastMove[0].to).file == 2) {
        this.board[lastMove[0].to+1].rank = indexToFileRank(lastMove[0].to - 2).rank;
        this.board[lastMove[0].to+1].file = indexToFileRank(lastMove[0].to - 2).file;
        this.board.splice(lastMove[0].to - 2,1,this.board[lastMove[0].to + 1]);
        this.board.splice(lastMove[0].to + 1,1,undefined);
        this.castlingAvailability[((this.toPlay+1)%2)*2 + 1] = true;
      }
    } else {
    this.board.splice(lastMove[0].to,1,lastMove[1]);
    }
    this.toPlay = (this.toPlay+1)%2;
    this.castlingAvailability = this?.moveHistory[4] ?? [false,false,false,false];
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
  /*modes
  Standard (0)
  Make King Safety Check (1)
  [not yet implemented] [implement for optimization] Return only destination Squares without king safety check (2)
  */
  generateMoves(mode=0) {
    let enemyAttackSquares = [];
    if (mode == 1) {
      this.toPlay = (this.toPlay+1)%2;
      let rawEnemyAttackSquares = this.generateMoves(2);
      this.toPlay = (this.toPlay+1)%2;
      for (let moveToIndexIndex = 0; moveToIndexIndex < rawEnemyAttackSquares.length; moveToIndexIndex++) {
        enemyAttackSquares.push(rawEnemyAttackSquares[moveToIndexIndex].to);
      }
    }
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
      //King Moves
      if (this.board[originSquares[originSquareIndex]].type == 0) {
        let allowedKingDifferences = [-9,-8,-7,-1,1,7,8,9];
        for (let pieceMoveCheckerIndex = 0; pieceMoveCheckerIndex < 8; pieceMoveCheckerIndex++) {
          if (generalDestinationSquares.includes(originSquares[originSquareIndex] + allowedKingDifferences[pieceMoveCheckerIndex])
          && !enemyAttackSquares.includes(originSquares[originSquareIndex] + allowedKingDifferences[pieceMoveCheckerIndex])
          && Math.abs(indexToFileRank(originSquares[originSquareIndex]).file
          -indexToFileRank(originSquares[originSquareIndex] + allowedKingDifferences[pieceMoveCheckerIndex]).file)<2) {
            moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex] + allowedKingDifferences[pieceMoveCheckerIndex]));
          }
        }
        //Kingside Castle
        if (this.castlingAvailability[this.toPlay*2] && emptySquares.includes(originSquares[originSquareIndex] + 1)
        && emptySquares.includes(originSquares[originSquareIndex] + 2) && !enemyAttackSquares.includes(originSquares[originSquareIndex] +1)
        && !enemyAttackSquares.includes(originSquares[originSquareIndex] +2)) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex] + 2,undefined,undefined,0));
        }
        //Queenside Castle
        if (this.castlingAvailability[(this.toPlay*2)+1]
        && emptySquares.includes(originSquares[originSquareIndex] - 1)
        && emptySquares.includes(originSquares[originSquareIndex] - 2)
        && emptySquares.includes(originSquares[originSquareIndex] - 3)
        && !enemyAttackSquares.includes(originSquares[originSquareIndex] -1)
        && !enemyAttackSquares.includes(originSquares[originSquareIndex] -2)) {
          moveList.push(new Move(originSquares[originSquareIndex],originSquares[originSquareIndex] - 2,undefined,undefined,1));
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
    move.castlingDirection = matchingMove.castlingDirection;
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
  let colorToCode = ["w","b"];
  let temporaryChessboard = Array(64);
  let chessboardModifierIndex = 0;
  let possibleEmptySquareNumbers = ["1","2","3","4","5","6","7","8"]
  for (let fenStringIndex = 0; fenStringIndex < fen.split(" ")[0].length; fenStringIndex++) {
    if (possibleEmptySquareNumbers.includes(fen.split(" ")[0].split("")[fenStringIndex])) {
      chessboardModifierIndex += possibleEmptySquareNumbers.indexOf(fen.split(" ")[0].split("")[fenStringIndex])+1;
      continue;
    }
    if (fen.split(" ")[0].split("")[fenStringIndex] === "/") {
      continue;
    }
    temporaryChessboard[chessboardModifierIndex] = new Piece(pieceSymbolToCode.indexOf(fen.split("")[fenStringIndex])%6,
    Math.floor(pieceSymbolToCode.indexOf(fen.split(" ")[0].split("")[fenStringIndex])/6),chessboardModifierIndex);
    chessboardModifierIndex++;
  }
  if (fen.split(" ")[3] == "-") {
    return new Chessboard(temporaryChessboard, displayBoard, colorToCode.indexOf(fen.split(" ")[1]),undefined,[],
    [fen.split(" ")[2].split("").includes("K"),fen.split(" ")[2].split("").includes("Q"),fen.split(" ")[2].split("").includes("k"),fen.split(" ")[2].split("").includes("q")]);
  } else {
    return new Chessboard(temporaryChessboard, displayBoard, colorToCode.indexOf(fen.split(" ")[1]),coordsToIndex(fen.split(" ")[3]),[],
    [fen.split(" ")[2].split("").includes("K"),fen.split(" ")[2].split("").includes("Q"),fen.split(" ")[2].split("").includes("k"),fen.split(" ")[2].split("").includes("q")]);
  }
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

function timeRepeatedMoveGeneration(temporaryChessboard, repetitions = 1000) {
  let startTime = Date.now();
  for (let moveGenerationIndex = 0; moveGenerationIndex < repetitions; moveGenerationIndex++) {
    temporaryChessboard.generateMoves(true);
  }
  console.log("multiMoveGenTime: "+(Date.now()-startTime));
}

function squareClicked(temporaryChessboard,square) {
  if (highlightedSquare == undefined) {
  document.getElementById("square"+square).style.backgroundColor = "#ff000040";
  highlightedSquare = square;
  }
  else {
    if ((indexToFileRank(square).rank == 0 || indexToFileRank(square).rank == 7) && (temporaryChessboard.board[highlightedSquare] ?? {"type":0}).type == 5) {
      //!!! CHANGE (TEMPORARILY ONLY QUEEN PROMOTION) !!!
      var piecePromotionPiece = 1;
    } else {
      var piecePromotionPiece = undefined;
    }
    let clickedMove = new Move(highlightedSquare,square, piecePromotionPiece);
    let startTime = Date.now();
    if (validateMove(mainGeneratedMoves, clickedMove)) {
      temporaryChessboard.makeMove(clickedMove);
      secondaryChessboard.makeMove(clickedMove);
      temporaryChessboard.display();
      mainGeneratedMoves = chessboard.generateMoves(1);

    } else {
      document.getElementById("playerMoveFormError").innerHTML = "Invalid Move";
    }
    console.log("Time to verify move: "+(Date.now()-startTime)+"ms");
    document.getElementById("square"+highlightedSquare).style.backgroundColor = "#ff000000";
    highlightMoveList(mainGeneratedMoves);
    highlightedSquare = undefined;
  }
}

var highlightedSquare = undefined;
const startingLayoutFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq  0 1";
//const startingLayoutFEN = "1k6/qpp5/p2p1rr1/2P1p3/PP2P2p/4R1P1/3Q1P1P/5RK1 b - - 1 33";
var chessboard = fenToChessboard(startingLayoutFEN, true);
var secondaryChessboard = fenToChessboard(startingLayoutFEN, false);
