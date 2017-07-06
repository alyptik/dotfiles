'use strict';

Object.defineProperty(exports, '__esModule', {value: true});

exports.default = function nullthrows(x) {
  if (x != null) {
    return x;
  }
  throw new Error('Got unexpected null or undefined');
};
