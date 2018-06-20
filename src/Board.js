// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
      // console.log(this, this.attributes);
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
      this.hasRowConflictAt(rowIndex) ||
      this.hasColConflictAt(colIndex) ||
      this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
      this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
      0 <= rowIndex && rowIndex < this.get('n') &&
      0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // console.log(this.attributes[rowIndex]);
      let hasConflict = false;
      let row = this.attributes[rowIndex];
      let sum = _.reduce(row, function(accum, num) { return accum + num; }, 0);
      if (sum > 1) {
        hasConflict = true;
      }
      
      return hasConflict; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      let hasConflict = false;
      let board = this.attributes;  
      for (let arr in board) {
        if (Array.isArray(board[arr]) && this.hasRowConflictAt(arr)) {
          hasConflict = true;             
        }
      }       
      return hasConflict; // fixme
    },

    /*
    inputs: 
    outputs:
    constraints:
    edge cases:
    This fn should:
    Relationship btwn inputs and outputs:
    */

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let hasConflict = false;
      let lattice = this.attributes;
      let sum = 0;
      for (let key in lattice) {
        if (Array.isArray(lattice[key])) {
          sum += lattice[key][colIndex];
        }
      }
      if (sum > 1) {
        hasConflict = true;
      }
      return hasConflict;
    },
    /*
    inputs: number
    outputs: boolean
    constraints:
    edge cases:
    This fn should: takes the index. Checks if there are more than one
      '1' at that index in all array.
    Relationship btwn inputs and outputs: 

    set bool F
    iterate attributes - for-in
    sum values at row(arg-index) (index is not for loop 'i')
    if sum is more than one
       set bool T
    return bool
    */

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // console.log(this.attributes)
      let n = this.attributes.n;
      let hasConflict = false;
      for (let i = 0; i < n; i++ ) {
        if (this.hasColConflictAt(i)) {
          hasConflict = true;
        }
      }
      return hasConflict;
    },
    /*
    inputs: none
    outputs: boolean
    constraints: none
    edge cases:
    This fn should: 
    Relationship btwn inputs and outputs: 
    
    set bool F
    call col conflict 0 -> n-1
    if any call returns true
    set bool T
    return bool
    */



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

var makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

}());
