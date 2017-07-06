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
 * This removes all but the first cursor. Since cursors are added at the end of
 * nodes this will keep the most valid cursor that appears deepest in the tree.
 */
function resolveDuplicateCursors(lines) {
  var seenCursor = false;
  return lines.map(function (line) {
    // $FlowFixMe(kad, t9954160)
    if (line === _constantsMarkers2['default'].cursor) {
      if (seenCursor) {
        return _constantsMarkers2['default'].empty;
      }
      seenCursor = true;
    }
    return line;
  });
}

module.exports = resolveDuplicateCursors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3Jlc29sdmVycy9yZXNvbHZlRHVwbGljYXRlQ3Vyc29ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0NBVW9CLHNCQUFzQjs7Ozs7Ozs7QUFNMUMsU0FBUyx1QkFBdUIsQ0FBQyxLQUFpQixFQUFjO0FBQzlELE1BQUksVUFBVSxHQUFHLEtBQUssQ0FBQztBQUN2QixTQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLEVBQUk7O0FBRXZCLFFBQUksSUFBSSxLQUFLLDhCQUFRLE1BQU0sRUFBRTtBQUMzQixVQUFJLFVBQVUsRUFBRTtBQUNkLGVBQU8sOEJBQVEsS0FBSyxDQUFDO09BQ3RCO0FBQ0QsZ0JBQVUsR0FBRyxJQUFJLENBQUM7S0FDbkI7QUFDRCxXQUFPLElBQUksQ0FBQztHQUNiLENBQUMsQ0FBQztDQUNKOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUMiLCJmaWxlIjoicmVzb2x2ZUR1cGxpY2F0ZUN1cnNvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgbWFya2VycyBmcm9tICcuLi9jb25zdGFudHMvbWFya2Vycyc7XG5cbi8qKlxuICogVGhpcyByZW1vdmVzIGFsbCBidXQgdGhlIGZpcnN0IGN1cnNvci4gU2luY2UgY3Vyc29ycyBhcmUgYWRkZWQgYXQgdGhlIGVuZCBvZlxuICogbm9kZXMgdGhpcyB3aWxsIGtlZXAgdGhlIG1vc3QgdmFsaWQgY3Vyc29yIHRoYXQgYXBwZWFycyBkZWVwZXN0IGluIHRoZSB0cmVlLlxuICovXG5mdW5jdGlvbiByZXNvbHZlRHVwbGljYXRlQ3Vyc29ycyhsaW5lczogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xuICBsZXQgc2VlbkN1cnNvciA9IGZhbHNlO1xuICByZXR1cm4gbGluZXMubWFwKGxpbmUgPT4ge1xuICAgIC8vICRGbG93Rml4TWUoa2FkLCB0OTk1NDE2MClcbiAgICBpZiAobGluZSA9PT0gbWFya2Vycy5jdXJzb3IpIHtcbiAgICAgIGlmIChzZWVuQ3Vyc29yKSB7XG4gICAgICAgIHJldHVybiBtYXJrZXJzLmVtcHR5O1xuICAgICAgfVxuICAgICAgc2VlbkN1cnNvciA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBsaW5lO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXNvbHZlRHVwbGljYXRlQ3Vyc29ycztcbiJdfQ==