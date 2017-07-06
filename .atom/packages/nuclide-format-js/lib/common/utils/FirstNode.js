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

var _NewLine = require('./NewLine');

var _NewLine2 = _interopRequireDefault(_NewLine);

var _getRootIdentifierInExpression = require('./getRootIdentifierInExpression');

var _getRootIdentifierInExpression2 = _interopRequireDefault(_getRootIdentifierInExpression);

var _isGlobal = require('./isGlobal');

var _isGlobal2 = _interopRequireDefault(_isGlobal);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var match = _jscodeshift2['default'].match;

var FirstNode = {
  /**
   * Gets the first node that it's safe to insert before on.
   *
   * Note: We never need to add a first node. If a first node doesn't exist
   * then there isn't ever code that would result in a require being changed.
   */
  get: function get(root) {
    var first = undefined;
    root.find(_jscodeshift2['default'].Node).filter(function (path) {
      return (0, _isGlobal2['default'])(path);
    }).forEach(function (path) {
      if (!first && FirstNode.isValidFirstNode(path)) {
        first = path;
      }
    });
    return first;
  },

  /**
   * Filter to see if a node is a valid first node.
   */
  isValidFirstNode: function isValidFirstNode(path) {
    // A new line literal is okay.
    if (match(path, { expression: { value: _NewLine2['default'].literal } })) {
      return true;
    }
    // Any other literal is not.
    if (match(path, { expression: { type: 'Literal' } })) {
      return false;
    }
    var firstObject = (0, _getRootIdentifierInExpression2['default'])(path.node);
    if (firstObject && match(firstObject, { name: 'jest' })) {
      return false;
    }
    return true;
  }
};

module.exports = FirstNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvRmlyc3ROb2RlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFZb0IsV0FBVzs7Ozs2Q0FDVyxpQ0FBaUM7Ozs7d0JBQ3RELFlBQVk7Ozs7MkJBQ2hCLGFBQWE7Ozs7SUFFdkIsS0FBSyw0QkFBTCxLQUFLOztBQUVaLElBQU0sU0FBUyxHQUFHOzs7Ozs7O0FBT2hCLEtBQUcsRUFBQSxhQUFDLElBQWdCLEVBQWE7QUFDL0IsUUFBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLFFBQUksQ0FDRCxJQUFJLENBQUMseUJBQUssSUFBSSxDQUFDLENBQ2YsTUFBTSxDQUFDLFVBQUEsSUFBSTthQUFJLDJCQUFTLElBQUksQ0FBQztLQUFBLENBQUMsQ0FDOUIsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2YsVUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDOUMsYUFBSyxHQUFHLElBQUksQ0FBQztPQUNkO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsV0FBTyxLQUFLLENBQUM7R0FDZDs7Ozs7QUFLRCxrQkFBZ0IsRUFBQSwwQkFBQyxJQUFjLEVBQVc7O0FBRXhDLFFBQUksS0FBSyxDQUFDLElBQUksRUFBRSxFQUFDLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxxQkFBUSxPQUFPLEVBQUMsRUFBQyxDQUFDLEVBQUU7QUFDdkQsYUFBTyxJQUFJLENBQUM7S0FDYjs7QUFFRCxRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBQyxVQUFVLEVBQUUsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUMsQ0FBQyxFQUFFO0FBQ2hELGFBQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDRCxRQUFNLFdBQVcsR0FBRyxnREFBOEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdELFFBQUksV0FBVyxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsRUFBRTtBQUNyRCxhQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0QsV0FBTyxJQUFJLENBQUM7R0FDYjtDQUNGLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMiLCJmaWxlIjoiRmlyc3ROb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge0NvbGxlY3Rpb24sIE5vZGVQYXRofSBmcm9tICcuLi90eXBlcy9hc3QnO1xuXG5pbXBvcnQgTmV3TGluZSBmcm9tICcuL05ld0xpbmUnO1xuaW1wb3J0IGdldFJvb3RJZGVudGlmaWVySW5FeHByZXNzaW9uIGZyb20gJy4vZ2V0Um9vdElkZW50aWZpZXJJbkV4cHJlc3Npb24nO1xuaW1wb3J0IGlzR2xvYmFsIGZyb20gJy4vaXNHbG9iYWwnO1xuaW1wb3J0IGpzY3MgZnJvbSAnanNjb2Rlc2hpZnQnO1xuXG5jb25zdCB7bWF0Y2h9ID0ganNjcztcblxuY29uc3QgRmlyc3ROb2RlID0ge1xuICAvKipcbiAgICogR2V0cyB0aGUgZmlyc3Qgbm9kZSB0aGF0IGl0J3Mgc2FmZSB0byBpbnNlcnQgYmVmb3JlIG9uLlxuICAgKlxuICAgKiBOb3RlOiBXZSBuZXZlciBuZWVkIHRvIGFkZCBhIGZpcnN0IG5vZGUuIElmIGEgZmlyc3Qgbm9kZSBkb2Vzbid0IGV4aXN0XG4gICAqIHRoZW4gdGhlcmUgaXNuJ3QgZXZlciBjb2RlIHRoYXQgd291bGQgcmVzdWx0IGluIGEgcmVxdWlyZSBiZWluZyBjaGFuZ2VkLlxuICAgKi9cbiAgZ2V0KHJvb3Q6IENvbGxlY3Rpb24pOiA/Tm9kZVBhdGgge1xuICAgIGxldCBmaXJzdDtcbiAgICByb290XG4gICAgICAuZmluZChqc2NzLk5vZGUpXG4gICAgICAuZmlsdGVyKHBhdGggPT4gaXNHbG9iYWwocGF0aCkpXG4gICAgICAuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgaWYgKCFmaXJzdCAmJiBGaXJzdE5vZGUuaXNWYWxpZEZpcnN0Tm9kZShwYXRoKSkge1xuICAgICAgICAgIGZpcnN0ID0gcGF0aDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIGZpcnN0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaWx0ZXIgdG8gc2VlIGlmIGEgbm9kZSBpcyBhIHZhbGlkIGZpcnN0IG5vZGUuXG4gICAqL1xuICBpc1ZhbGlkRmlyc3ROb2RlKHBhdGg6IE5vZGVQYXRoKTogYm9vbGVhbiB7XG4gICAgLy8gQSBuZXcgbGluZSBsaXRlcmFsIGlzIG9rYXkuXG4gICAgaWYgKG1hdGNoKHBhdGgsIHtleHByZXNzaW9uOiB7dmFsdWU6IE5ld0xpbmUubGl0ZXJhbH19KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIEFueSBvdGhlciBsaXRlcmFsIGlzIG5vdC5cbiAgICBpZiAobWF0Y2gocGF0aCwge2V4cHJlc3Npb246IHt0eXBlOiAnTGl0ZXJhbCd9fSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZmlyc3RPYmplY3QgPSBnZXRSb290SWRlbnRpZmllckluRXhwcmVzc2lvbihwYXRoLm5vZGUpO1xuICAgIGlmIChmaXJzdE9iamVjdCAmJiBtYXRjaChmaXJzdE9iamVjdCwge25hbWU6ICdqZXN0J30pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaXJzdE5vZGU7XG4iXX0=