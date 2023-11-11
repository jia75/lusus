## Chessboard format
120-element array:  
[21] is a1  
[28] is h1  
[91] is a8  
[98] is h8  
0-119: square data  
120: color to play (0: white, 1: black)  
121: castling status (0-15, in binary ABCD: A is white kingside, B is white queenside, etc.)  
122: buffered index of en passant target square (0 if none)
123: number of half-moves since last capture or pawn advance (if this reaches 100, draw by 50-move rule)
124: total full moves played (starts at 0) (increment after black plays)

## Piece format
0: no piece  
1 through 6: White pieces, King to Pawn (K Q R B N P)  
7 through 12: Black pieces, King to Pawn (k q r b n p)  
13: border square  

## Move format
4 digit number:  
ABCD  
AB: starting square  
CD: destination square

FOR PROMOTIONS:
AB: Origin Square
C: Move Type (0 for left capture, 1 for move forwards, 2 for left capture)
D: Promotion Piece (q r b n) -> (2 3 4 5)

## Function documentation

### initializeBoard()

Creates new chessboard array. Sets buffers, and all squares and parameters as 0.

### makeMove()

Returns array: [moveWasLegal, pieceCaptured]