(function() {
  var NEWLINE_REG_EXP, Point, compareNumbers;

  Point = require('./point');

  exports.compare = function(a, b) {
    if (a.row === b.row) {
      return compareNumbers(a.column, b.column);
    } else {
      return compareNumbers(a.row, b.row);
    }
  };

  compareNumbers = function(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  };

  exports.isEqual = function(a, b) {
    return a.row === b.row && a.column === b.column;
  };

  exports.traverse = function(start, distance) {
    if (distance.row === 0) {
      return Point(start.row, start.column + distance.column);
    } else {
      return Point(start.row + distance.row, distance.column);
    }
  };

  exports.traversal = function(end, start) {
    if (end.row === start.row) {
      return Point(0, end.column - start.column);
    } else {
      return Point(end.row - start.row, end.column);
    }
  };

  NEWLINE_REG_EXP = /\n/g;

  exports.characterIndexForPoint = function(text, point) {
    var column, row;
    row = point.row;
    column = point.column;
    NEWLINE_REG_EXP.lastIndex = 0;
    while (row-- > 0) {
      if (!NEWLINE_REG_EXP.exec(text)) {
        return text.length;
      }
    }
    return NEWLINE_REG_EXP.lastIndex + column;
  };

  exports.clipNegativePoint = function(point) {
    if (point.row < 0) {
      return Point(0, 0);
    } else if (point.column < 0) {
      return Point(point.row, 0);
    } else {
      return point;
    }
  };

  exports.max = function(a, b) {
    if (exports.compare(a, b) >= 0) {
      return a;
    } else {
      return b;
    }
  };

  exports.min = function(a, b) {
    if (exports.compare(a, b) <= 0) {
      return a;
    } else {
      return b;
    }
  };

}).call(this);
