
var board;
var game = new Chess();
var whiteSquareGrey = '#a9a9a9';
var blackSquareGrey = '#696969';

function removeGreySquares() {
  document.querySelectorAll('#myBoard .square-55d63').forEach(square => {
    square.style.background = '';
  });
}

function greySquare(square) {
  var square = document.querySelector('#myBoard .square-' + square);

  var background = whiteSquareGrey;
  if (square.classList.contains('black-b7cb6')) {
    background = blackSquareGrey;
  }

  square.style.background = background;
}

function onDragStart(e) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  // or if it's not that side's turn
  if ((game.turn() === 'w' && e.piece.startsWith('b')) ||
    (game.turn() === 'b' && e.piece.startsWith('w'))) {
    return false;
  }
}

function onDrop(e) {
  removeGreySquares();
  
  // see if the move is legal
  var move = game.move({
    from: e.source,
    to: e.target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) return 'snapback';
}

function onMouseoverSquare(square, piece) {
  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
}

function onMouseoutSquare(square, piece) {
  removeGreySquares();
}

function onSnapEnd() {
  board.position(game.fen());
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd
};

board = Chessboard2('myBoard', config);
