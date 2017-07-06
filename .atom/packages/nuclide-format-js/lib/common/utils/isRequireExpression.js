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

var _getRootIdentifierInExpression = require('./getRootIdentifierInExpression');

var _getRootIdentifierInExpression2 = _interopRequireDefault(_getRootIdentifierInExpression);

function isRequireExpression(node) {
  var root = (0, _getRootIdentifierInExpression2['default'])(node);
  return Boolean(root && root.name === 'require');
}

module.exports = isRequireExpression;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvaXNSZXF1aXJlRXhwcmVzc2lvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NkNBWTBDLGlDQUFpQzs7OztBQUUzRSxTQUFTLG1CQUFtQixDQUFDLElBQVUsRUFBVztBQUNoRCxNQUFNLElBQUksR0FBRyxnREFBOEIsSUFBSSxDQUFDLENBQUM7QUFDakQsU0FBTyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUM7Q0FDakQ7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyIsImZpbGUiOiJpc1JlcXVpcmVFeHByZXNzaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge05vZGV9IGZyb20gJy4uL3R5cGVzL2FzdCc7XG5cbmltcG9ydCBnZXRSb290SWRlbnRpZmllckluRXhwcmVzc2lvbiBmcm9tICcuL2dldFJvb3RJZGVudGlmaWVySW5FeHByZXNzaW9uJztcblxuZnVuY3Rpb24gaXNSZXF1aXJlRXhwcmVzc2lvbihub2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJvb3QgPSBnZXRSb290SWRlbnRpZmllckluRXhwcmVzc2lvbihub2RlKTtcbiAgcmV0dXJuIEJvb2xlYW4ocm9vdCAmJiByb290Lm5hbWUgPT09ICdyZXF1aXJlJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNSZXF1aXJlRXhwcmVzc2lvbjtcbiJdfQ==