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
function getInvalidTrailingComments(node) {
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
        if (key === 'leadingComments' && value) {
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

module.exports = getInvalidTrailingComments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3V0aWxzL2dldEludmFsaWRUcmFpbGluZ0NvbW1lbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt5QkFZc0IsV0FBVzs7Ozs7Ozs7O0FBT2pDLFNBQVMsMEJBQTBCLENBQUMsSUFBVSxFQUF5QjtBQUNyRSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbEIsVUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2QixTQUFPLHVCQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUM5Qjs7Ozs7O0FBTUQsU0FBUyxRQUFRLENBQUMsSUFBUyxFQUFFLE1BQXFCLEVBQVE7QUFDeEQsTUFBSSxDQUFDLElBQUksRUFBRTtBQUNULFdBQU87R0FDUjs7QUFFRCxNQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtBQUM5RCxRQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDakMsWUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLEVBQUk7QUFDL0IsWUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7QUFHeEIsWUFBSSxHQUFHLEtBQUssaUJBQWlCLElBQUksS0FBSyxFQUFFO0FBQ3RDLGVBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7O0FBRXZCLGdCQUNFLE9BQU8sSUFDUCxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUNoQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksRUFDckI7QUFDQSxvQkFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7V0FDRixDQUFDLENBQUM7U0FDSjs7QUFFRCxnQkFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztPQUN6QixDQUFDLENBQUM7S0FDSjtHQUNGOztBQUVELE1BQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN2QixRQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQ3BCLGNBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDekIsQ0FBQyxDQUFDO0dBQ0o7Q0FDRjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDIiwiZmlsZSI6ImdldEludmFsaWRUcmFpbGluZ0NvbW1lbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge05vZGV9IGZyb20gJ2FzdC10eXBlcy1mbG93JztcblxuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG4vKipcbiAqIFRoaXMgdHJhdmVyc2VzIGFuIGVudGlyZSBhc3QgYW5kIGRldGVybWluZXMgd2hpY2ggdHJhaWxpbmcgY29tbWVudHMgYXJlXG4gKiBkdXBsaWNhdGVzIG9mIG90aGVyIGxlYWRpbmcgY29tbWVudHMuIENvbW1lbnRzIGFyZSBpbnZhbGlkYXRlZCBiYXNlZCBvblxuICogdGhlaXIgc3RhcnRpbmcgcG9zaXRpb24uXG4gKi9cbmZ1bmN0aW9uIGdldEludmFsaWRUcmFpbGluZ0NvbW1lbnRzKG5vZGU6IE5vZGUpOiBJbW11dGFibGUuU2V0PG51bWJlcj4ge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgdHJhdmVyc2Uobm9kZSwgcmVzdWx0KTtcbiAgcmV0dXJuIEltbXV0YWJsZS5TZXQocmVzdWx0KTtcbn1cblxuLyoqXG4gKiBBIGR1bWIgdHJhdmVyc2FsIG1ldGhvZC4gSXQgd2lsbCBicmVhayBpZiBub2RlIGNvbnRhaW5zIGFueSBzb3J0IG9mXG4gKiBjaXJjdWxhciBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlKG5vZGU6IGFueSwgcmVzdWx0OiBBcnJheTxudW1iZXI+KTogdm9pZCB7XG4gIGlmICghbm9kZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobm9kZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgaWYgKHR5cGVvZiBub2RlLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBPYmplY3Qua2V5cyhub2RlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gbm9kZVtrZXldO1xuXG4gICAgICAgIC8vIExlYWRpbmcgY29tbWVudHMgYXJlIGludmFsaWQgdHJhaWxpbmcgY29tbWVudHMuXG4gICAgICAgIGlmIChrZXkgPT09ICdsZWFkaW5nQ29tbWVudHMnICYmIHZhbHVlKSB7XG4gICAgICAgICAgdmFsdWUuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICAgICAgICAgIC8vIFNvbWUgc2FuaXR5IGNoZWNrcyBvbiB0aGUgY29tbWVudHMuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNvbW1lbnQgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIGNvbW1lbnQudHlwZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgICAgY29tbWVudC5zdGFydCAhPSBudWxsXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY29tbWVudC5zdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0cmF2ZXJzZSh2YWx1ZSwgcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgbm9kZS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIHRyYXZlcnNlKHZhbHVlLCByZXN1bHQpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SW52YWxpZFRyYWlsaW5nQ29tbWVudHM7XG4iXX0=