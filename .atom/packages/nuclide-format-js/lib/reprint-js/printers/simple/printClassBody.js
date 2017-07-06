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

var _commonPrintArrayOfStatements = require('../common/printArrayOfStatements');

var _commonPrintArrayOfStatements2 = _interopRequireDefault(_commonPrintArrayOfStatements);

var _commonPrintComments = require('../common/printComments');

var _commonPrintComments2 = _interopRequireDefault(_commonPrintComments);

function printClassBody(print, node) {
  // Can't put extra new lines in here like BlockStatement since it may be
  // used in a ClassExpression.
  return (0, _utilsFlatten2['default'])(['{',
  // We want to override the extra space within the first node of a class
  // body, so we do one hard break and then throw in a no break. The empty
  // string is necessary to reset the run of markers.
  _constantsMarkers2['default'].hardBreak, _constantsMarkers2['default'].indent, '', _constantsMarkers2['default'].noBreak, (0, _commonPrintComments2['default'])(node.innerComments), (0, _commonPrintArrayOfStatements2['default'])(print, node.body), _constantsMarkers2['default'].dedent, _constantsMarkers2['default'].hardBreak, '}']);
}

module.exports = printClassBody;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3ByaW50ZXJzL3NpbXBsZS9wcmludENsYXNzQm9keS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7NEJBYW9CLHFCQUFxQjs7OztnQ0FDckIseUJBQXlCOzs7OzRDQUNWLGtDQUFrQzs7OzttQ0FDM0MseUJBQXlCOzs7O0FBRW5ELFNBQVMsY0FBYyxDQUFDLEtBQVksRUFBRSxJQUFlLEVBQVM7OztBQUc1RCxTQUFPLCtCQUFRLENBQ2IsR0FBRzs7OztBQUlILGdDQUFRLFNBQVMsRUFDakIsOEJBQVEsTUFBTSxFQUNkLEVBQUUsRUFDRiw4QkFBUSxPQUFPLEVBQ2Ysc0NBQWMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUNqQywrQ0FBdUIsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDeEMsOEJBQVEsTUFBTSxFQUNkLDhCQUFRLFNBQVMsRUFDakIsR0FBRyxDQUNKLENBQUMsQ0FBQztDQUNKOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDIiwiZmlsZSI6InByaW50Q2xhc3NCb2R5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge0NsYXNzQm9keX0gZnJvbSAnYXN0LXR5cGVzLWZsb3cnO1xuaW1wb3J0IHR5cGUge0xpbmVzLCBQcmludH0gZnJvbSAnLi4vLi4vdHlwZXMvY29tbW9uJztcblxuaW1wb3J0IGZsYXR0ZW4gZnJvbSAnLi4vLi4vdXRpbHMvZmxhdHRlbic7XG5pbXBvcnQgbWFya2VycyBmcm9tICcuLi8uLi9jb25zdGFudHMvbWFya2Vycyc7XG5pbXBvcnQgcHJpbnRBcnJheU9mU3RhdGVtZW50cyBmcm9tICcuLi9jb21tb24vcHJpbnRBcnJheU9mU3RhdGVtZW50cyc7XG5pbXBvcnQgcHJpbnRDb21tZW50cyBmcm9tICcuLi9jb21tb24vcHJpbnRDb21tZW50cyc7XG5cbmZ1bmN0aW9uIHByaW50Q2xhc3NCb2R5KHByaW50OiBQcmludCwgbm9kZTogQ2xhc3NCb2R5KTogTGluZXMge1xuICAvLyBDYW4ndCBwdXQgZXh0cmEgbmV3IGxpbmVzIGluIGhlcmUgbGlrZSBCbG9ja1N0YXRlbWVudCBzaW5jZSBpdCBtYXkgYmVcbiAgLy8gdXNlZCBpbiBhIENsYXNzRXhwcmVzc2lvbi5cbiAgcmV0dXJuIGZsYXR0ZW4oW1xuICAgICd7JyxcbiAgICAvLyBXZSB3YW50IHRvIG92ZXJyaWRlIHRoZSBleHRyYSBzcGFjZSB3aXRoaW4gdGhlIGZpcnN0IG5vZGUgb2YgYSBjbGFzc1xuICAgIC8vIGJvZHksIHNvIHdlIGRvIG9uZSBoYXJkIGJyZWFrIGFuZCB0aGVuIHRocm93IGluIGEgbm8gYnJlYWsuIFRoZSBlbXB0eVxuICAgIC8vIHN0cmluZyBpcyBuZWNlc3NhcnkgdG8gcmVzZXQgdGhlIHJ1biBvZiBtYXJrZXJzLlxuICAgIG1hcmtlcnMuaGFyZEJyZWFrLFxuICAgIG1hcmtlcnMuaW5kZW50LFxuICAgICcnLFxuICAgIG1hcmtlcnMubm9CcmVhayxcbiAgICBwcmludENvbW1lbnRzKG5vZGUuaW5uZXJDb21tZW50cyksXG4gICAgcHJpbnRBcnJheU9mU3RhdGVtZW50cyhwcmludCwgbm9kZS5ib2R5KSxcbiAgICBtYXJrZXJzLmRlZGVudCxcbiAgICBtYXJrZXJzLmhhcmRCcmVhayxcbiAgICAnfScsXG4gIF0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByaW50Q2xhc3NCb2R5O1xuIl19