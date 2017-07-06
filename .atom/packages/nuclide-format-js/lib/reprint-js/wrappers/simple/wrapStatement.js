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

var _utilsFlatten = require('../../utils/flatten');

var _utilsFlatten2 = _interopRequireDefault(_utilsFlatten);

var _constantsMarkers = require('../../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

function wrapStatement(print, node, lines) {
  return (0, _utilsFlatten2['default'])([lines, _constantsMarkers2['default'].hardBreak]);
}

module.exports = wrapStatement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3dyYXBwZXJzL3NpbXBsZS93cmFwU3RhdGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs0QkFZb0IscUJBQXFCOzs7O2dDQUNyQix5QkFBeUI7Ozs7QUFFN0MsU0FBUyxhQUFhLENBQUMsS0FBWSxFQUFFLElBQVMsRUFBRSxLQUFZLEVBQVM7QUFDbkUsU0FBTywrQkFBUSxDQUNiLEtBQUssRUFDTCw4QkFBUSxTQUFTLENBQ2xCLENBQUMsQ0FBQztDQUNKOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDIiwiZmlsZSI6IndyYXBTdGF0ZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSB7TGluZXMsIFByaW50fSBmcm9tICcuLi8uLi90eXBlcy9jb21tb24nO1xuXG5pbXBvcnQgZmxhdHRlbiBmcm9tICcuLi8uLi91dGlscy9mbGF0dGVuJztcbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9tYXJrZXJzJztcblxuZnVuY3Rpb24gd3JhcFN0YXRlbWVudChwcmludDogUHJpbnQsIG5vZGU6IGFueSwgbGluZXM6IExpbmVzKTogTGluZXMge1xuICByZXR1cm4gZmxhdHRlbihbXG4gICAgbGluZXMsXG4gICAgbWFya2Vycy5oYXJkQnJlYWssXG4gIF0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBTdGF0ZW1lbnQ7XG4iXX0=