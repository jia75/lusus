class Piece {
  // types: 0:King, 1:Queen, 2:Rook, 3:Bishop, 4:Knight, 5:Pawn
  // colors: 0:White, 1:Black
  constructor(type, color) {
      this.type = type;
      this.color = color;
      this.pieceCode = (color*6) + type;
  }
}

class Chessboard {
  //List: 0: a8, 1: b8 ...
  constructor(pieceArray=Array(64), colorToPlay = 0) {
    this.board = pieceArray;
    this.toPlay = colorToPlay;
  }
  makeMove(fromSquare, toSquare) {
    this.board.splice(toSquare,1,this.board[fromSquare]);
    this.board.splice(fromSquare,1,undefined); 
    this.toPlay = (this.toPlay+1)%2;
    console.log(this.toPlay);
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
}

function validateMove(temporaryChessboard, fromSquare, toSquare) {
  let fromPiece = temporaryChessboard.board[fromSquare];
  let toPiece = temporaryChessboard.board[toSquare];
  //no piece
  if (fromPiece == undefined) {
    return false;
  }
  //wrong color
  if (fromPiece.color != temporaryChessboard.toPlay) {
    return false;
  }
  //cant take same color
  if (toPiece != undefined) {
  if (fromPiece.color == toPiece.color) {
    return false;
  }}
  //king rules
  if (fromPiece.type == 0) {
    allowedKingDifferences = [-9,-8,-7,-1,1,7,8,9];
    if (allowedKingDifferences.includes(toSquare-fromSquare)) {
      return true;
    } 
    return false;
  }
  //rook rules
  if (fromPiece.type == 2) {
    allowedKingDifferences = [-9,-8,-7,-1,1,7,8,9];
    if (allowedKingDifferences.includes(toSquare-fromSquare) && toSquare) {
      return true;
    } 
    return false;
  }
  return true;
}

function fenToChessboard(fen) {
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
    Math.floor(pieceSymbolToCode.indexOf(fen.split("")[fenStringIndex])/6));
    chessboardModifierIndex++;
  }
  return new Chessboard(temporaryChessboard);
}

function coordsToIndex(coords) {
  let files = ["a","b","c","d","e","f","g","h"]
  return files.indexOf(coords.split("")[0])+(8*(8-parseInt(coords.split("")[1])));
}

function parseMove(temporaryChessboard) {
  let inputtedMove = document.getElementById("moveTextbox").value;

  if (validateMove(temporaryChessboard,coordsToIndex(inputtedMove.split("-")[0]),coordsToIndex(inputtedMove.split("-")[1]))){
  temporaryChessboard.makeMove(coordsToIndex(inputtedMove.split("-")[0]),coordsToIndex(inputtedMove.split("-")[1]));
  } else {
    document.getElementById("playerMoveFormError").innerHTML = "Invalid Move";
  }

  temporaryChessboard.display();
  document.getElementById("moveTextbox").value = "";
}


var chessboard = fenToChessboard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
