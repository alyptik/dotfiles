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

var _constantsMarkers = require('../../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

var _wrappersSimpleWrapStatement = require('../../wrappers/simple/wrapStatement');

var _wrappersSimpleWrapStatement2 = _interopRequireDefault(_wrappersSimpleWrapStatement);

function printWhileStatement(print, node) {
  var wrap = function wrap(x) {
    return (0, _wrappersSimpleWrapStatement2['default'])(print, node, x);
  };
  return wrap([_constantsMarkers2['default'].hardBreak, 'while (', _constantsMarkers2['default'].openScope, _constantsMarkers2['default'].scopeIndent, _constantsMarkers2['default'].scopeBreak, print(node.test), _constantsMarkers2['default'].scopeBreak, _constantsMarkers2['default'].scopeDedent, _constantsMarkers2['default'].closeScope, ')', _constantsMarkers2['default'].space, print(node.body)]);
}

module.exports = printWhileStatement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3ByaW50ZXJzL3NpbXBsZS9wcmludFdoaWxlU3RhdGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztnQ0Fhb0IseUJBQXlCOzs7OzJDQUNuQixxQ0FBcUM7Ozs7QUFFL0QsU0FBUyxtQkFBbUIsQ0FBQyxLQUFZLEVBQUUsSUFBb0IsRUFBUztBQUN0RSxNQUFNLElBQUksR0FBRyxTQUFQLElBQUksQ0FBRyxDQUFDO1dBQUksOENBQWMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7R0FBQSxDQUFDO0FBQ2hELFNBQU8sSUFBSSxDQUFDLENBQ1YsOEJBQVEsU0FBUyxFQUNqQixTQUFTLEVBQ1QsOEJBQVEsU0FBUyxFQUNqQiw4QkFBUSxXQUFXLEVBQ25CLDhCQUFRLFVBQVUsRUFDbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDaEIsOEJBQVEsVUFBVSxFQUNsQiw4QkFBUSxXQUFXLEVBQ25CLDhCQUFRLFVBQVUsRUFDbEIsR0FBRyxFQUNILDhCQUFRLEtBQUssRUFDYixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNqQixDQUFDLENBQUM7Q0FDSjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDIiwiZmlsZSI6InByaW50V2hpbGVTdGF0ZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSB7TGluZXMsIFByaW50fSBmcm9tICcuLi8uLi90eXBlcy9jb21tb24nO1xuaW1wb3J0IHR5cGUge1doaWxlU3RhdGVtZW50fSBmcm9tICdhc3QtdHlwZXMtZmxvdyc7XG5cbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9tYXJrZXJzJztcbmltcG9ydCB3cmFwU3RhdGVtZW50IGZyb20gJy4uLy4uL3dyYXBwZXJzL3NpbXBsZS93cmFwU3RhdGVtZW50JztcblxuZnVuY3Rpb24gcHJpbnRXaGlsZVN0YXRlbWVudChwcmludDogUHJpbnQsIG5vZGU6IFdoaWxlU3RhdGVtZW50KTogTGluZXMge1xuICBjb25zdCB3cmFwID0geCA9PiB3cmFwU3RhdGVtZW50KHByaW50LCBub2RlLCB4KTtcbiAgcmV0dXJuIHdyYXAoW1xuICAgIG1hcmtlcnMuaGFyZEJyZWFrLFxuICAgICd3aGlsZSAoJyxcbiAgICBtYXJrZXJzLm9wZW5TY29wZSxcbiAgICBtYXJrZXJzLnNjb3BlSW5kZW50LFxuICAgIG1hcmtlcnMuc2NvcGVCcmVhayxcbiAgICBwcmludChub2RlLnRlc3QpLFxuICAgIG1hcmtlcnMuc2NvcGVCcmVhayxcbiAgICBtYXJrZXJzLnNjb3BlRGVkZW50LFxuICAgIG1hcmtlcnMuY2xvc2VTY29wZSxcbiAgICAnKScsXG4gICAgbWFya2Vycy5zcGFjZSxcbiAgICBwcmludChub2RlLmJvZHkpLFxuICBdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcmludFdoaWxlU3RhdGVtZW50O1xuIl19