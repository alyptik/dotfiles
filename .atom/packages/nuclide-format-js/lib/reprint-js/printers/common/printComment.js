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

function printComment(node) {
  if (node.type === 'CommentBlock') {
    return (0, _utilsFlatten2['default'])([('/*' + node.value + '*/').split('\n').map(function (part) {
      var trimmed = part.trim();
      return [trimmed.startsWith('*') ? ' ' + trimmed : trimmed, _constantsMarkers2['default'].hardBreak];
    })]);
  }

  if (node.type === 'CommentLine') {
    return ['//', node.value, _constantsMarkers2['default'].hardBreak];
  }

  return [];
}

module.exports = printComment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3ByaW50ZXJzL2NvbW1vbi9wcmludENvbW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzRCQVlvQixxQkFBcUI7Ozs7Z0NBQ3JCLHlCQUF5Qjs7OztBQUU3QyxTQUFTLFlBQVksQ0FBQyxJQUFTLEVBQVM7QUFDdEMsTUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtBQUNoQyxXQUFPLCtCQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUEsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2pFLFVBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixhQUFPLENBQ0wsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLE9BQU8sRUFDakQsOEJBQVEsU0FBUyxDQUNsQixDQUFDO0tBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNOOztBQUVELE1BQUksSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7QUFDL0IsV0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLDhCQUFRLFNBQVMsQ0FBQyxDQUFDO0dBQzlDOztBQUVELFNBQU8sRUFBRSxDQUFDO0NBQ1g7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMiLCJmaWxlIjoicHJpbnRDb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge0xpbmVzfSBmcm9tICcuLi8uLi90eXBlcy9jb21tb24nO1xuXG5pbXBvcnQgZmxhdHRlbiBmcm9tICcuLi8uLi91dGlscy9mbGF0dGVuJztcbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9tYXJrZXJzJztcblxuZnVuY3Rpb24gcHJpbnRDb21tZW50KG5vZGU6IGFueSk6IExpbmVzIHtcbiAgaWYgKG5vZGUudHlwZSA9PT0gJ0NvbW1lbnRCbG9jaycpIHtcbiAgICByZXR1cm4gZmxhdHRlbihbKCcvKicgKyBub2RlLnZhbHVlICsgJyovJykuc3BsaXQoJ1xcbicpLm1hcChwYXJ0ID0+IHtcbiAgICAgIGNvbnN0IHRyaW1tZWQgPSBwYXJ0LnRyaW0oKTtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRyaW1tZWQuc3RhcnRzV2l0aCgnKicpID8gJyAnICsgdHJpbW1lZCA6IHRyaW1tZWQsXG4gICAgICAgIG1hcmtlcnMuaGFyZEJyZWFrLFxuICAgICAgXTtcbiAgICB9KV0pO1xuICB9XG5cbiAgaWYgKG5vZGUudHlwZSA9PT0gJ0NvbW1lbnRMaW5lJykge1xuICAgIHJldHVybiBbJy8vJywgbm9kZS52YWx1ZSwgbWFya2Vycy5oYXJkQnJlYWtdO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByaW50Q29tbWVudDtcbiJdfQ==