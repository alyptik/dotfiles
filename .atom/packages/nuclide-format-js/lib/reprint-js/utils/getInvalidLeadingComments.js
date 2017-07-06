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

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

/**
 * This traverses an entire ast and determines which trailing comments are
 * duplicates of other leading comments. Comments are invalidated based on
 * their starting position.
 */
function getInvalidLeadingComments(node) {
  var result = [];
  traverse(node, result);
  return _immutable2['default'].Set(result);
}

/**
 * A dumb traversal method. It will break if node contains any sort of
 * circular structure.
 */
function traverse(node, result) {
  if (!node) {
    return;
  }

  if (Object.prototype.toString.call(node) === '[object Object]') {
    if (typeof node.type === 'string') {
      Object.keys(node).forEach(function (key) {
        var value = node[key];

        // Leading comments are invalid trailing comments.
        if (key === 'innerComments' && value) {
          value.forEach(function (comment) {
            // Some sanity checks on the comments.
            if (comment && typeof comment.type === 'string' && comment.start != null) {
              result.push(comment.start);
            }
          });
        }

        traverse(value, result);
      });
    }
  }

  if (Array.isArray(node)) {
    node.forEach(function (value) {
      traverse(value, result);
    });
  }
}

module.exports = getInvalidLeadingComments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3V0aWxzL2dldEludmFsaWRMZWFkaW5nQ29tbWVudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3lCQVlzQixXQUFXOzs7Ozs7Ozs7QUFPakMsU0FBUyx5QkFBeUIsQ0FBQyxJQUFVLEVBQXlCO0FBQ3BFLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNsQixVQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZCLFNBQU8sdUJBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQzlCOzs7Ozs7QUFNRCxTQUFTLFFBQVEsQ0FBQyxJQUFTLEVBQUUsTUFBcUIsRUFBUTtBQUN4RCxNQUFJLENBQUMsSUFBSSxFQUFFO0FBQ1QsV0FBTztHQUNSOztBQUVELE1BQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLGlCQUFpQixFQUFFO0FBQzlELFFBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUNqQyxZQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUMvQixZQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7OztBQUd4QixZQUFJLEdBQUcsS0FBSyxlQUFlLElBQUksS0FBSyxFQUFFO0FBQ3BDLGVBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7O0FBRXZCLGdCQUNFLE9BQU8sSUFDUCxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUNoQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksRUFDckI7QUFDQSxvQkFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7V0FDRixDQUFDLENBQUM7U0FDSjs7QUFFRCxnQkFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztPQUN6QixDQUFDLENBQUM7S0FDSjtHQUNGOztBQUVELE1BQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN2QixRQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ3BCLGNBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDekIsQ0FBQyxDQUFDO0dBQ0o7Q0FDRjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDIiwiZmlsZSI6ImdldEludmFsaWRMZWFkaW5nQ29tbWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSB7Tm9kZX0gZnJvbSAnYXN0LXR5cGVzLWZsb3cnO1xuXG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5cbi8qKlxuICogVGhpcyB0cmF2ZXJzZXMgYW4gZW50aXJlIGFzdCBhbmQgZGV0ZXJtaW5lcyB3aGljaCB0cmFpbGluZyBjb21tZW50cyBhcmVcbiAqIGR1cGxpY2F0ZXMgb2Ygb3RoZXIgbGVhZGluZyBjb21tZW50cy4gQ29tbWVudHMgYXJlIGludmFsaWRhdGVkIGJhc2VkIG9uXG4gKiB0aGVpciBzdGFydGluZyBwb3NpdGlvbi5cbiAqL1xuZnVuY3Rpb24gZ2V0SW52YWxpZExlYWRpbmdDb21tZW50cyhub2RlOiBOb2RlKTogSW1tdXRhYmxlLlNldDxudW1iZXI+IHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIHRyYXZlcnNlKG5vZGUsIHJlc3VsdCk7XG4gIHJldHVybiBJbW11dGFibGUuU2V0KHJlc3VsdCk7XG59XG5cbi8qKlxuICogQSBkdW1iIHRyYXZlcnNhbCBtZXRob2QuIEl0IHdpbGwgYnJlYWsgaWYgbm9kZSBjb250YWlucyBhbnkgc29ydCBvZlxuICogY2lyY3VsYXIgc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZShub2RlOiBhbnksIHJlc3VsdDogQXJyYXk8bnVtYmVyPik6IHZvaWQge1xuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5vZGUpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIGlmICh0eXBlb2Ygbm9kZS50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgT2JqZWN0LmtleXMobm9kZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG5vZGVba2V5XTtcblxuICAgICAgICAvLyBMZWFkaW5nIGNvbW1lbnRzIGFyZSBpbnZhbGlkIHRyYWlsaW5nIGNvbW1lbnRzLlxuICAgICAgICBpZiAoa2V5ID09PSAnaW5uZXJDb21tZW50cycgJiYgdmFsdWUpIHtcbiAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGNvbW1lbnQgPT4ge1xuICAgICAgICAgICAgLy8gU29tZSBzYW5pdHkgY2hlY2tzIG9uIHRoZSBjb21tZW50cy5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY29tbWVudCAmJlxuICAgICAgICAgICAgICB0eXBlb2YgY29tbWVudC50eXBlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgICBjb21tZW50LnN0YXJ0ICE9IG51bGxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChjb21tZW50LnN0YXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyYXZlcnNlKHZhbHVlLCByZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBub2RlLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgdHJhdmVyc2UodmFsdWUsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJbnZhbGlkTGVhZGluZ0NvbW1lbnRzO1xuIl19