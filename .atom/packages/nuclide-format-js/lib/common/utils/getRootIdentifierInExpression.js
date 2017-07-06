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

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var match = _jscodeshift2['default'].match;

/**
 * This traverses a node to find the first identifier in nested expressions.
 */
function getRootIdentifierInExpression(_x) {
  var _again = true;

  _function: while (_again) {
    var node = _x;
    _again = false;

    if (!node) {
      return null;
    }
    if (match(node, { type: 'ExpressionStatement' })) {
      _x = node.expression;
      _again = true;
      continue _function;
    }
    if (match(node, { type: 'CallExpression' })) {
      _x = node.callee;
      _again = true;
      continue _function;
    }
    if (match(node, { type: 'MemberExpression' })) {
      _x = node.object;
      _again = true;
      continue _function;
    }
    if (match(node, { type: 'Identifier' })) {
      return node;
    }
    return null;
  }
}

module.exports = getRootIdentifierInExpression;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvZ2V0Um9vdElkZW50aWZpZXJJbkV4cHJlc3Npb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzJCQVlpQixhQUFhOzs7O0lBRXZCLEtBQUssNEJBQUwsS0FBSzs7Ozs7QUFLWixTQUFTLDZCQUE2Qjs7OzRCQUFxQjtRQUFwQixJQUFXOzs7QUFDaEQsUUFBSSxDQUFDLElBQUksRUFBRTtBQUNULGFBQU8sSUFBSSxDQUFDO0tBQ2I7QUFDRCxRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUMsQ0FBQyxFQUFFO1dBQ1QsSUFBSSxDQUFDLFVBQVU7OztLQUNyRDtBQUNELFFBQUksS0FBSyxDQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLEVBQUU7V0FDSixJQUFJLENBQUMsTUFBTTs7O0tBQ2pEO0FBQ0QsUUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFDLENBQUMsRUFBRTtXQUNOLElBQUksQ0FBQyxNQUFNOzs7S0FDakQ7QUFDRCxRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFDLENBQUMsRUFBRTtBQUNyQyxhQUFPLElBQUksQ0FBQztLQUNiO0FBQ0QsV0FBTyxJQUFJLENBQUM7R0FDYjtDQUFBOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUMiLCJmaWxlIjoiZ2V0Um9vdElkZW50aWZpZXJJbkV4cHJlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSB7Tm9kZX0gZnJvbSAnLi4vdHlwZXMvYXN0JztcblxuaW1wb3J0IGpzY3MgZnJvbSAnanNjb2Rlc2hpZnQnO1xuXG5jb25zdCB7bWF0Y2h9ID0ganNjcztcblxuLyoqXG4gKiBUaGlzIHRyYXZlcnNlcyBhIG5vZGUgdG8gZmluZCB0aGUgZmlyc3QgaWRlbnRpZmllciBpbiBuZXN0ZWQgZXhwcmVzc2lvbnMuXG4gKi9cbmZ1bmN0aW9uIGdldFJvb3RJZGVudGlmaWVySW5FeHByZXNzaW9uKG5vZGU6ID9Ob2RlKTogP05vZGUge1xuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAobWF0Y2gobm9kZSwge3R5cGU6ICdFeHByZXNzaW9uU3RhdGVtZW50J30pKSB7XG4gICAgcmV0dXJuIGdldFJvb3RJZGVudGlmaWVySW5FeHByZXNzaW9uKG5vZGUuZXhwcmVzc2lvbik7XG4gIH1cbiAgaWYgKG1hdGNoKG5vZGUsIHt0eXBlOiAnQ2FsbEV4cHJlc3Npb24nfSkpIHtcbiAgICByZXR1cm4gZ2V0Um9vdElkZW50aWZpZXJJbkV4cHJlc3Npb24obm9kZS5jYWxsZWUpO1xuICB9XG4gIGlmIChtYXRjaChub2RlLCB7dHlwZTogJ01lbWJlckV4cHJlc3Npb24nfSkpIHtcbiAgICByZXR1cm4gZ2V0Um9vdElkZW50aWZpZXJJbkV4cHJlc3Npb24obm9kZS5vYmplY3QpO1xuICB9XG4gIGlmIChtYXRjaChub2RlLCB7dHlwZTogJ0lkZW50aWZpZXInfSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSb290SWRlbnRpZmllckluRXhwcmVzc2lvbjtcbiJdfQ==