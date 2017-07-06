"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToSet = addToSet;

function addToSet(target, source) {
  source.forEach(target.add, target);
}