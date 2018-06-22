/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// findNRooksSolution(): returns a single solution to the n-rooks problem
window.findNRooksSolution = function(n) {

  var solution; 
   
  var board = new Board({n:n});
      
  var solve = function(row) {
    if(row === n) {
      return board.rows();
      // solution = board.attributes;
      // solutionCount++;
    } else {
      for(var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if(!board.hasAnyRooksConflicts()) {
         return solve(row + 1);
        } 
         board.togglePiece(row, i);      
      }
    }
  }
  solution = solve(0);
  return solution;
};
    /*
    inputs: n (size of nxn board)
    outputs: board where rooks are all safe 
    constraints: n cannot be negative or zero, cannot be too big (bc of runtime)
    edge cases: 
    This fn should: find one solution where n rooks on a n x n board are safe from each other
    Relationship btwn inputs and outputs: n rooks, n is the grid of board
    
    array solutions
    function should be inner-recursive (current board, number of rooks placed on board so far)
    base case: number of rooks = n    
          push in board to solutions array
    if(placing rook does not have a rook conflict)
      place a rook on empty unit
    run recursive function(current board, number of rooks++) 
     */
// countNRooksSolutions(): returns a count of the total number of solutions to the n-rooks problem

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0; 
   
  var board = new Board({n:n});
      
  var solve = function(row) {
    if(row === n) {
      solutionCount++;
      return;
    } else {
      for(var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if(!board.hasAnyRooksConflicts()) {
          solve(row + 1);
        } 
         board.togglePiece(row, i);      
      }
    }
  }
  solve(0);
  return solutionCount;
};


// findNQueensSolution(): returns a single solution to the n-queens problem
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};
//countNQueensSolutions(): returns a count of the total number of solutions to the n-queens problem
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0; 
   
  var board = new Board({n:n});
      
  var solve = function(row) {
    if(row === n) {
      solutionCount++;
      return;
    } else {
      for(var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if(!board.hasAnyQueensConflicts()) {
          solve(row + 1);
        } 
         board.togglePiece(row, i);      
      }
    }
  }
  solve(0);
  return solutionCount;
};







/*
    inputs: 
    outputs: 
    constraints: 
    edge cases:
    This fn should: 
    Relationship btwn inputs and outputs: 
    
    
    */