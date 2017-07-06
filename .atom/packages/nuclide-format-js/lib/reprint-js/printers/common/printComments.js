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

var _printComment = require('./printComment');

var _printComment2 = _interopRequireDefault(_printComment);

function printComments(nodes) {
  if (!Array.isArray(nodes)) {
    return [];
  }
  return (0, _utilsFlatten2['default'])(nodes.map(function (n) {
    return (0, _printComment2['default'])(n);
  }));
}

module.exports = printComments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3ByaW50ZXJzL2NvbW1vbi9wcmludENvbW1lbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs0QkFZb0IscUJBQXFCOzs7OzRCQUNoQixnQkFBZ0I7Ozs7QUFFekMsU0FBUyxhQUFhLENBQUMsS0FBa0IsRUFBUztBQUNoRCxNQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN6QixXQUFPLEVBQUUsQ0FBQztHQUNYO0FBQ0QsU0FBTywrQkFBUSxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztXQUFJLCtCQUFhLENBQUMsQ0FBQztHQUFBLENBQUMsQ0FBQyxDQUFDO0NBQ2pEOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDIiwiZmlsZSI6InByaW50Q29tbWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSB7TGluZXN9IGZyb20gJy4uLy4uL3R5cGVzL2NvbW1vbic7XG5cbmltcG9ydCBmbGF0dGVuIGZyb20gJy4uLy4uL3V0aWxzL2ZsYXR0ZW4nO1xuaW1wb3J0IHByaW50Q29tbWVudCBmcm9tICcuL3ByaW50Q29tbWVudCc7XG5cbmZ1bmN0aW9uIHByaW50Q29tbWVudHMobm9kZXM6ID9BcnJheTxhbnk+KTogTGluZXMge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobm9kZXMpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBmbGF0dGVuKG5vZGVzLm1hcChuID0+IHByaW50Q29tbWVudChuKSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByaW50Q29tbWVudHM7XG4iXX0=