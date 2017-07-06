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

var _flatten = require('./flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _isMarker = require('./isMarker');

var _isMarker2 = _interopRequireDefault(_isMarker);

/**
 * This utility unwraps contiguous leading and trailing markers from lines and
 * then inserts pre and post before adding the markers back.
 */
function unwrapMarkers(pre, lines, post) {
  var leading = [];
  for (var i = 0; i < lines.length && (0, _isMarker2['default'])(lines[i]); i++) {
    leading.push(lines[i]);
  }
  var trailing = [];
  for (var i = lines.length - 1; i >= 0 && (0, _isMarker2['default'])(lines[i]); i--) {
    trailing.unshift(lines[i]);
  }
  var middle = [];

  // Everything is a marker... how is that possible?
  if (lines.length === leading.length) {
    leading = [];
    middle = lines;
    trailing = [];
  } else {
    middle = lines.slice(leading.length, lines.length - trailing.length);
  }

  return (0, _flatten2['default'])([leading, pre, middle, post, trailing]);
}

module.exports = unwrapMarkers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3V0aWxzL3Vud3JhcE1hcmtlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3VCQVlvQixXQUFXOzs7O3dCQUNWLFlBQVk7Ozs7Ozs7O0FBTWpDLFNBQVMsYUFBYSxDQUFDLEdBQVUsRUFBRSxLQUFZLEVBQUUsSUFBVyxFQUFTO0FBQ25FLE1BQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSwyQkFBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzRCxXQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3hCO0FBQ0QsTUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE9BQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSwyQkFBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRSxZQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQzVCO0FBQ0QsTUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7QUFHaEIsTUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDbkMsV0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNiLFVBQU0sR0FBRyxLQUFLLENBQUM7QUFDZixZQUFRLEdBQUcsRUFBRSxDQUFDO0dBQ2YsTUFBTTtBQUNMLFVBQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDdEU7O0FBRUQsU0FBTywwQkFBUSxDQUNiLE9BQU8sRUFDUCxHQUFHLEVBQ0gsTUFBTSxFQUNOLElBQUksRUFDSixRQUFRLENBQ1QsQ0FBQyxDQUFDO0NBQ0o7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMiLCJmaWxlIjoidW53cmFwTWFya2Vycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIHtMaW5lc30gZnJvbSAnLi4vdHlwZXMvY29tbW9uJztcblxuaW1wb3J0IGZsYXR0ZW4gZnJvbSAnLi9mbGF0dGVuJztcbmltcG9ydCBpc01hcmtlciBmcm9tICcuL2lzTWFya2VyJztcblxuLyoqXG4gKiBUaGlzIHV0aWxpdHkgdW53cmFwcyBjb250aWd1b3VzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIG1hcmtlcnMgZnJvbSBsaW5lcyBhbmRcbiAqIHRoZW4gaW5zZXJ0cyBwcmUgYW5kIHBvc3QgYmVmb3JlIGFkZGluZyB0aGUgbWFya2VycyBiYWNrLlxuICovXG5mdW5jdGlvbiB1bndyYXBNYXJrZXJzKHByZTogTGluZXMsIGxpbmVzOiBMaW5lcywgcG9zdDogTGluZXMpOiBMaW5lcyB7XG4gIGxldCBsZWFkaW5nID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoICYmIGlzTWFya2VyKGxpbmVzW2ldKTsgaSsrKSB7XG4gICAgbGVhZGluZy5wdXNoKGxpbmVzW2ldKTtcbiAgfVxuICBsZXQgdHJhaWxpbmcgPSBbXTtcbiAgZm9yIChsZXQgaSA9IGxpbmVzLmxlbmd0aCAtIDE7IGkgPj0gMCAmJiBpc01hcmtlcihsaW5lc1tpXSk7IGktLSkge1xuICAgIHRyYWlsaW5nLnVuc2hpZnQobGluZXNbaV0pO1xuICB9XG4gIGxldCBtaWRkbGUgPSBbXTtcblxuICAvLyBFdmVyeXRoaW5nIGlzIGEgbWFya2VyLi4uIGhvdyBpcyB0aGF0IHBvc3NpYmxlP1xuICBpZiAobGluZXMubGVuZ3RoID09PSBsZWFkaW5nLmxlbmd0aCkge1xuICAgIGxlYWRpbmcgPSBbXTtcbiAgICBtaWRkbGUgPSBsaW5lcztcbiAgICB0cmFpbGluZyA9IFtdO1xuICB9IGVsc2Uge1xuICAgIG1pZGRsZSA9IGxpbmVzLnNsaWNlKGxlYWRpbmcubGVuZ3RoLCBsaW5lcy5sZW5ndGggLSB0cmFpbGluZy5sZW5ndGgpO1xuICB9XG5cbiAgcmV0dXJuIGZsYXR0ZW4oW1xuICAgIGxlYWRpbmcsXG4gICAgcHJlLFxuICAgIG1pZGRsZSxcbiAgICBwb3N0LFxuICAgIHRyYWlsaW5nLFxuICBdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bndyYXBNYXJrZXJzO1xuIl19