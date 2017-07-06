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

/**
 * This is a hack to force an ObjectPattern node to be printed on one line
 */
function oneLineObjectPattern(node) {
  if (!_jscodeshift2['default'].ObjectPattern.check(node)) {
    return node;
  }

  var props = node.properties;
  if (!props.every(function (prop) {
    return prop.shorthand && _jscodeshift2['default'].Identifier.check(prop.key);
  })) {
    return node;
  }

  var mySource = 'var {' + props.map(function (prop) {
    return prop.key.name;
  }).join(', ') + '} = _;';
  var myAst = (0, _jscodeshift2['default'])(mySource);
  return myAst.find(_jscodeshift2['default'].ObjectPattern).nodes()[0];
}

module.exports = oneLineObjectPattern;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvb25lTGluZU9iamVjdFBhdHRlcm4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzJCQVlpQixhQUFhOzs7Ozs7O0FBSzlCLFNBQVMsb0JBQW9CLENBQUMsSUFBVSxFQUFRO0FBQzlDLE1BQUksQ0FBQyx5QkFBSyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ25DLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUM5QixNQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFBLElBQUk7V0FBSSxJQUFJLENBQUMsU0FBUyxJQUFJLHlCQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztHQUFBLENBQUMsRUFBRTtBQUMzRSxXQUFPLElBQUksQ0FBQztHQUNiOztBQUVELE1BQU0sUUFBUSxHQUNaLE9BQU8sR0FDUCxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSTtXQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSTtHQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQzNDLFFBQVEsQ0FBQztBQUNYLE1BQU0sS0FBSyxHQUFHLDhCQUFLLFFBQVEsQ0FBQyxDQUFDO0FBQzdCLFNBQU8sS0FBSyxDQUFDLElBQUksQ0FBQyx5QkFBSyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNsRDs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDIiwiZmlsZSI6Im9uZUxpbmVPYmplY3RQYXR0ZXJuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge05vZGV9IGZyb20gJy4uL3R5cGVzL2FzdCc7XG5cbmltcG9ydCBqc2NzIGZyb20gJ2pzY29kZXNoaWZ0JztcblxuLyoqXG4gKiBUaGlzIGlzIGEgaGFjayB0byBmb3JjZSBhbiBPYmplY3RQYXR0ZXJuIG5vZGUgdG8gYmUgcHJpbnRlZCBvbiBvbmUgbGluZVxuICovXG5mdW5jdGlvbiBvbmVMaW5lT2JqZWN0UGF0dGVybihub2RlOiBOb2RlKTogTm9kZSB7XG4gIGlmICghanNjcy5PYmplY3RQYXR0ZXJuLmNoZWNrKG5vZGUpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjb25zdCBwcm9wcyA9IG5vZGUucHJvcGVydGllcztcbiAgaWYgKCFwcm9wcy5ldmVyeShwcm9wID0+IHByb3Auc2hvcnRoYW5kICYmIGpzY3MuSWRlbnRpZmllci5jaGVjayhwcm9wLmtleSkpKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjb25zdCBteVNvdXJjZSA9XG4gICAgJ3ZhciB7JyArXG4gICAgcHJvcHMubWFwKHByb3AgPT4gcHJvcC5rZXkubmFtZSkuam9pbignLCAnKSArXG4gICAgJ30gPSBfOyc7XG4gIGNvbnN0IG15QXN0ID0ganNjcyhteVNvdXJjZSk7XG4gIHJldHVybiBteUFzdC5maW5kKGpzY3MuT2JqZWN0UGF0dGVybikubm9kZXMoKVswXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvbmVMaW5lT2JqZWN0UGF0dGVybjtcbiJdfQ==