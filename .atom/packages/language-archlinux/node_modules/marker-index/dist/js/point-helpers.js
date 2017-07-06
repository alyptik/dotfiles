"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverse = traverse;
exports.traversal = traversal;
exports.compare = compare;
exports.max = max;
exports.isZero = isZero;
exports.format = format;

function traverse(start, traversal) {
  if (traversal.row === 0) {
    return {
      row: start.row,
      column: start.column + traversal.column
    };
  } else {
    return {
      row: start.row + traversal.row,
      column: traversal.column
    };
  }
}

function traversal(end, start) {
  if (end.row === start.row) {
    return { row: 0, column: end.column - start.column };
  } else {
    return { row: end.row - start.row, column: end.column };
  }
}

function compare(a, b) {
  if (a.row < b.row) {
    return -1;
  } else if (a.row > b.row) {
    return 1;
  } else {
    if (a.column < b.column) {
      return -1;
    } else if (a.column > b.column) {
      return 1;
    } else {
      return 0;
    }
  }
}

function max(a, b) {
  if (compare(a, b) > 0) {
    return a;
  } else {
    return b;
  }
}

function isZero(point) {
  return point.row === 0 && point.column === 0;
}

function format(point) {
  return "(" + point.row + ", " + point.column + ")";
}