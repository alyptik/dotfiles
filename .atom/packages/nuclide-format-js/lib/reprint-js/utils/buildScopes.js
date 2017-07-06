function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 */

var _constantsMarkers = require('../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

/**
 * Given an array of lines this will parse the scopes and return a mapping of
 * line number to unique scope ids. This mapping is returned in the form of an
 * array where arr[lineNumber] is the scopeID.
 */
function buildScopes(lines) {
  var scopes = [];
  var id = 0;
  var stack = [];
  for (var i = 0; i < lines.length; i++) {
    if (lines[i] === _constantsMarkers2['default'].openScope) {
      stack.push(id++);
    }
    if (stack.length > 0) {
      scopes.push(stack[stack.length - 1]);
    } else {
      scopes.push(null);
    }
    // Make sure to do this after saving in the scope map. The closeScope is
    // part of it's own scope, we don't want to pop too soon.
    if (lines[i] === _constantsMarkers2['default'].closeScope) {
      stack.pop();
    }
  }
  return scopes;
}

module.exports = buildScopes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3V0aWxzL2J1aWxkU2NvcGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztnQ0FVb0Isc0JBQXNCOzs7Ozs7Ozs7QUFPMUMsU0FBUyxXQUFXLENBQUMsS0FBaUIsRUFBa0I7QUFDdEQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNYLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNqQixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNyQyxRQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyw4QkFBUSxTQUFTLEVBQUU7QUFDbEMsV0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0QsUUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNwQixZQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEMsTUFBTTtBQUNMLFlBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkI7OztBQUdELFFBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLDhCQUFRLFVBQVUsRUFBRTtBQUNuQyxXQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDYjtHQUNGO0FBQ0QsU0FBTyxNQUFNLENBQUM7Q0FDZjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyIsImZpbGUiOiJidWlsZFNjb3Blcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uL2NvbnN0YW50cy9tYXJrZXJzJztcblxuLyoqXG4gKiBHaXZlbiBhbiBhcnJheSBvZiBsaW5lcyB0aGlzIHdpbGwgcGFyc2UgdGhlIHNjb3BlcyBhbmQgcmV0dXJuIGEgbWFwcGluZyBvZlxuICogbGluZSBudW1iZXIgdG8gdW5pcXVlIHNjb3BlIGlkcy4gVGhpcyBtYXBwaW5nIGlzIHJldHVybmVkIGluIHRoZSBmb3JtIG9mIGFuXG4gKiBhcnJheSB3aGVyZSBhcnJbbGluZU51bWJlcl0gaXMgdGhlIHNjb3BlSUQuXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkU2NvcGVzKGxpbmVzOiBBcnJheTxhbnk+KTogQXJyYXk8P251bWJlcj4ge1xuICBjb25zdCBzY29wZXMgPSBbXTtcbiAgbGV0IGlkID0gMDtcbiAgY29uc3Qgc3RhY2sgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChsaW5lc1tpXSA9PT0gbWFya2Vycy5vcGVuU2NvcGUpIHtcbiAgICAgIHN0YWNrLnB1c2goaWQrKyk7XG4gICAgfVxuICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICBzY29wZXMucHVzaChzdGFja1tzdGFjay5sZW5ndGggLSAxXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjb3Blcy5wdXNoKG51bGwpO1xuICAgIH1cbiAgICAvLyBNYWtlIHN1cmUgdG8gZG8gdGhpcyBhZnRlciBzYXZpbmcgaW4gdGhlIHNjb3BlIG1hcC4gVGhlIGNsb3NlU2NvcGUgaXNcbiAgICAvLyBwYXJ0IG9mIGl0J3Mgb3duIHNjb3BlLCB3ZSBkb24ndCB3YW50IHRvIHBvcCB0b28gc29vbi5cbiAgICBpZiAobGluZXNbaV0gPT09IG1hcmtlcnMuY2xvc2VTY29wZSkge1xuICAgICAgc3RhY2sucG9wKCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzY29wZXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGRTY29wZXM7XG4iXX0=