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

function printSwitchCase(print, node) {
  var consequentParts = (0, _utilsFlatten2['default'])(node.consequent.map(function (nodePart) {
    return print(nodePart);
  }));
  if (node.consequent.length > 0) {
    // We want a new line separating cases if they had a consequent.
    consequentParts.push(_constantsMarkers2['default'].multiHardBreak);
    consequentParts.push(_constantsMarkers2['default'].multiHardBreak);
  }
  if (!node.test) {
    return (0, _utilsFlatten2['default'])(['default:', _constantsMarkers2['default'].hardBreak, _constantsMarkers2['default'].indent, consequentParts, _constantsMarkers2['default'].dedent]);
  } else {
    var test = node.test;
    return (0, _utilsFlatten2['default'])(['case', _constantsMarkers2['default'].space, print(test), ':', _constantsMarkers2['default'].hardBreak, _constantsMarkers2['default'].indent, consequentParts, _constantsMarkers2['default'].dedent]);
  }
}

module.exports = printSwitchCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3ByaW50ZXJzL3NpbXBsZS9wcmludFN3aXRjaENhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzRCQWFvQixxQkFBcUI7Ozs7Z0NBQ3JCLHlCQUF5Qjs7OztBQUU3QyxTQUFTLGVBQWUsQ0FBQyxLQUFZLEVBQUUsSUFBZ0IsRUFBUztBQUM5RCxNQUFNLGVBQWUsR0FBRywrQkFBUSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FDakQsVUFBQSxRQUFRO1dBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQztHQUFBLENBQzVCLENBQUMsQ0FBQztBQUNILE1BQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztBQUU5QixtQkFBZSxDQUFDLElBQUksQ0FBQyw4QkFBUSxjQUFjLENBQUMsQ0FBQztBQUM3QyxtQkFBZSxDQUFDLElBQUksQ0FBQyw4QkFBUSxjQUFjLENBQUMsQ0FBQztHQUM5QztBQUNELE1BQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2QsV0FBTywrQkFBUSxDQUNiLFVBQVUsRUFDViw4QkFBUSxTQUFTLEVBQ2pCLDhCQUFRLE1BQU0sRUFDZCxlQUFlLEVBQ2YsOEJBQVEsTUFBTSxDQUNmLENBQUMsQ0FBQztHQUNKLE1BQU07QUFDTCxRQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3ZCLFdBQU8sK0JBQVEsQ0FDYixNQUFNLEVBQ04sOEJBQVEsS0FBSyxFQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFDWCxHQUFHLEVBQ0gsOEJBQVEsU0FBUyxFQUNqQiw4QkFBUSxNQUFNLEVBQ2QsZUFBZSxFQUNmLDhCQUFRLE1BQU0sQ0FDZixDQUFDLENBQUM7R0FDSjtDQUNGOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDIiwiZmlsZSI6InByaW50U3dpdGNoQ2FzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIHtMaW5lcywgUHJpbnR9IGZyb20gJy4uLy4uL3R5cGVzL2NvbW1vbic7XG5pbXBvcnQgdHlwZSB7U3dpdGNoQ2FzZX0gZnJvbSAnYXN0LXR5cGVzLWZsb3cnO1xuXG5pbXBvcnQgZmxhdHRlbiBmcm9tICcuLi8uLi91dGlscy9mbGF0dGVuJztcbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9tYXJrZXJzJztcblxuZnVuY3Rpb24gcHJpbnRTd2l0Y2hDYXNlKHByaW50OiBQcmludCwgbm9kZTogU3dpdGNoQ2FzZSk6IExpbmVzIHtcbiAgY29uc3QgY29uc2VxdWVudFBhcnRzID0gZmxhdHRlbihub2RlLmNvbnNlcXVlbnQubWFwKFxuICAgIG5vZGVQYXJ0ID0+IHByaW50KG5vZGVQYXJ0KSxcbiAgKSk7XG4gIGlmIChub2RlLmNvbnNlcXVlbnQubGVuZ3RoID4gMCkge1xuICAgIC8vIFdlIHdhbnQgYSBuZXcgbGluZSBzZXBhcmF0aW5nIGNhc2VzIGlmIHRoZXkgaGFkIGEgY29uc2VxdWVudC5cbiAgICBjb25zZXF1ZW50UGFydHMucHVzaChtYXJrZXJzLm11bHRpSGFyZEJyZWFrKTtcbiAgICBjb25zZXF1ZW50UGFydHMucHVzaChtYXJrZXJzLm11bHRpSGFyZEJyZWFrKTtcbiAgfVxuICBpZiAoIW5vZGUudGVzdCkge1xuICAgIHJldHVybiBmbGF0dGVuKFtcbiAgICAgICdkZWZhdWx0OicsXG4gICAgICBtYXJrZXJzLmhhcmRCcmVhayxcbiAgICAgIG1hcmtlcnMuaW5kZW50LFxuICAgICAgY29uc2VxdWVudFBhcnRzLFxuICAgICAgbWFya2Vycy5kZWRlbnQsXG4gICAgXSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdGVzdCA9IG5vZGUudGVzdDtcbiAgICByZXR1cm4gZmxhdHRlbihbXG4gICAgICAnY2FzZScsXG4gICAgICBtYXJrZXJzLnNwYWNlLFxuICAgICAgcHJpbnQodGVzdCksXG4gICAgICAnOicsXG4gICAgICBtYXJrZXJzLmhhcmRCcmVhayxcbiAgICAgIG1hcmtlcnMuaW5kZW50LFxuICAgICAgY29uc2VxdWVudFBhcnRzLFxuICAgICAgbWFya2Vycy5kZWRlbnQsXG4gICAgXSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcmludFN3aXRjaENhc2U7XG4iXX0=