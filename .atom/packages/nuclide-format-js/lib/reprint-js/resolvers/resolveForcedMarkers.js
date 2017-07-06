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
 * This actualizes the forced markers we already have. It's not guaranteed to
 * remove all markers.
 */
function resolveForcedMarkers(lines) {
  return lines.map(function (line) {
    if (line === _constantsMarkers2['default'].hardBreak) {
      return '\n';
    } else if (line === _constantsMarkers2['default'].multiHardBreak) {
      return '\n';
    } else if (line === _constantsMarkers2['default'].comma) {
      return ',';
    } else if (line === _constantsMarkers2['default'].space) {
      return ' ';
    } else if (line === _constantsMarkers2['default'].empty) {
      return '';
    } else {
      return line;
    }
  }).filter(function (line) {
    return line !== '';
  });
}

module.exports = resolveForcedMarkers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3Jlc29sdmVycy9yZXNvbHZlRm9yY2VkTWFya2Vycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0NBVW9CLHNCQUFzQjs7Ozs7Ozs7QUFNMUMsU0FBUyxvQkFBb0IsQ0FBQyxLQUFpQixFQUFjO0FBQzNELFNBQU8sS0FBSyxDQUNULEdBQUcsQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNYLFFBQUksSUFBSSxLQUFLLDhCQUFRLFNBQVMsRUFBRTtBQUM5QixhQUFPLElBQUksQ0FBQztLQUNiLE1BQU0sSUFBSSxJQUFJLEtBQUssOEJBQVEsY0FBYyxFQUFFO0FBQzFDLGFBQU8sSUFBSSxDQUFDO0tBQ2IsTUFBTSxJQUFJLElBQUksS0FBSyw4QkFBUSxLQUFLLEVBQUU7QUFDakMsYUFBTyxHQUFHLENBQUM7S0FDWixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLEtBQUssRUFBRTtBQUNqQyxhQUFPLEdBQUcsQ0FBQztLQUNaLE1BQU0sSUFBSSxJQUFJLEtBQUssOEJBQVEsS0FBSyxFQUFFO0FBQ2pDLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTTtBQUNMLGFBQU8sSUFBSSxDQUFDO0tBQ2I7R0FDRixDQUFDLENBQ0QsTUFBTSxDQUFDLFVBQUEsSUFBSTtXQUFJLElBQUksS0FBSyxFQUFFO0dBQUEsQ0FBQyxDQUFDO0NBQ2hDOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUMiLCJmaWxlIjoicmVzb2x2ZUZvcmNlZE1hcmtlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgbWFya2VycyBmcm9tICcuLi9jb25zdGFudHMvbWFya2Vycyc7XG5cbi8qKlxuICogVGhpcyBhY3R1YWxpemVzIHRoZSBmb3JjZWQgbWFya2VycyB3ZSBhbHJlYWR5IGhhdmUuIEl0J3Mgbm90IGd1YXJhbnRlZWQgdG9cbiAqIHJlbW92ZSBhbGwgbWFya2Vycy5cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZUZvcmNlZE1hcmtlcnMobGluZXM6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgcmV0dXJuIGxpbmVzXG4gICAgLm1hcChsaW5lID0+IHtcbiAgICAgIGlmIChsaW5lID09PSBtYXJrZXJzLmhhcmRCcmVhaykge1xuICAgICAgICByZXR1cm4gJ1xcbic7XG4gICAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMubXVsdGlIYXJkQnJlYWspIHtcbiAgICAgICAgcmV0dXJuICdcXG4nO1xuICAgICAgfSBlbHNlIGlmIChsaW5lID09PSBtYXJrZXJzLmNvbW1hKSB7XG4gICAgICAgIHJldHVybiAnLCc7XG4gICAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMuc3BhY2UpIHtcbiAgICAgICAgcmV0dXJuICcgJztcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5lbXB0eSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5maWx0ZXIobGluZSA9PiBsaW5lICE9PSAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzb2x2ZUZvcmNlZE1hcmtlcnM7XG4iXX0=