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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _constantsMarkers = require('../../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

function printExportNamedDeclaration(print, node) {
  var parts = ['export', _constantsMarkers2['default'].noBreak, _constantsMarkers2['default'].space];

  if (node.declaration) {
    parts = parts.concat([print(node.declaration)]);
  } else if (node.exportKind === 'type') {
    // If there is a declaration and the kind is 'type', the declaration must
    // be a type alias of some sort which already includes the word 'type'.
    parts = parts.concat(['type', _constantsMarkers2['default'].noBreak, _constantsMarkers2['default'].space]);
  }

  if (node.specifiers.length > 0) {
    (function () {
      (0, _assert2['default'])(!node.declaration, 'Cannot have both declaration and specifiers');
      var open = false;
      var specifiers = node.specifiers.map(function (specifier, i, arr) {
        var subParts = [];

        // Check if we should open.
        if (!open && specifier.type === 'ExportSpecifier') {
          open = true;
          subParts = subParts.concat(['{']);
        }

        // Print the specifier.
        subParts = subParts.concat([_constantsMarkers2['default'].noBreak, print(specifier), _constantsMarkers2['default'].noBreak]);

        // Check if we should close. Note that it's important we be able to open
        // and then close within a single cycle of this loop.
        if (open && i === arr.length - 1) {
          open = false;
          subParts = subParts.concat(['}']);
        }

        // Check if we should add a comma and space.
        if (i < arr.length - 1) {
          subParts = subParts.concat([_constantsMarkers2['default'].comma, _constantsMarkers2['default'].space]);
        }

        return subParts;
      });
      (0, _assert2['default'])(!open, 'Export specifiers somehow left open');
      parts = parts.concat(specifiers);
    })();
  }

  if (node.source) {
    (0, _assert2['default'])(!node.declaration, 'Declarations cannot have a source');
    parts = parts.concat([_constantsMarkers2['default'].noBreak, _constantsMarkers2['default'].space, 'from', _constantsMarkers2['default'].noBreak, _constantsMarkers2['default'].space, print(node.source)]);
  }

  if (!node.declaration) {
    parts = parts.concat([_constantsMarkers2['default'].noBreak, ';']);
  }

  parts = parts.concat([_constantsMarkers2['default'].hardBreak]);

  return (0, _utilsFlatten2['default'])(parts);
}

module.exports = printExportNamedDeclaration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3ByaW50ZXJzL3NpbXBsZS9wcmludEV4cG9ydE5hbWVkRGVjbGFyYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzRCQWFvQixxQkFBcUI7Ozs7c0JBQ25CLFFBQVE7Ozs7Z0NBQ1YseUJBQXlCOzs7O0FBRTdDLFNBQVMsMkJBQTJCLENBQ2xDLEtBQVksRUFDWixJQUE0QixFQUNyQjtBQUNQLE1BQUksS0FBSyxHQUFHLENBQ1YsUUFBUSxFQUNSLDhCQUFRLE9BQU8sRUFDZiw4QkFBUSxLQUFLLENBQ2QsQ0FBQzs7QUFFRixNQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDcEIsU0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDeEIsQ0FBQyxDQUFDO0dBQ0osTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFOzs7QUFHckMsU0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDbkIsTUFBTSxFQUNOLDhCQUFRLE9BQU8sRUFDZiw4QkFBUSxLQUFLLENBQ2QsQ0FBQyxDQUFDO0dBQ0o7O0FBRUQsTUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O0FBQzlCLCtCQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSw2Q0FBNkMsQ0FBQyxDQUFDO0FBQzVFLFVBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNqQixVQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFLO0FBQzVELFlBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7O0FBR2xCLFlBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxpQkFBaUIsRUFBRTtBQUNqRCxjQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ1osa0JBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQ3pCLEdBQUcsQ0FDSixDQUFDLENBQUM7U0FDSjs7O0FBR0QsZ0JBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQ3pCLDhCQUFRLE9BQU8sRUFDZixLQUFLLENBQUMsU0FBUyxDQUFDLEVBQ2hCLDhCQUFRLE9BQU8sQ0FDaEIsQ0FBQyxDQUFDOzs7O0FBSUgsWUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2hDLGNBQUksR0FBRyxLQUFLLENBQUM7QUFDYixrQkFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FDekIsR0FBRyxDQUNKLENBQUMsQ0FBQztTQUNKOzs7QUFHRCxZQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN0QixrQkFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FDekIsOEJBQVEsS0FBSyxFQUNiLDhCQUFRLEtBQUssQ0FDZCxDQUFDLENBQUM7U0FDSjs7QUFFRCxlQUFPLFFBQVEsQ0FBQztPQUNqQixDQUFDLENBQUM7QUFDSCwrQkFBVSxDQUFDLElBQUksRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO0FBQ3hELFdBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztHQUNsQzs7QUFFRCxNQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZiw2QkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztBQUNsRSxTQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUNuQiw4QkFBUSxPQUFPLEVBQ2YsOEJBQVEsS0FBSyxFQUNiLE1BQU0sRUFDTiw4QkFBUSxPQUFPLEVBQ2YsOEJBQVEsS0FBSyxFQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQ25CLENBQUMsQ0FBQztHQUNKOztBQUVELE1BQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ3JCLFNBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQ25CLDhCQUFRLE9BQU8sRUFDZixHQUFHLENBQ0osQ0FBQyxDQUFDO0dBQ0o7O0FBRUQsT0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDbkIsOEJBQVEsU0FBUyxDQUNsQixDQUFDLENBQUM7O0FBRUgsU0FBTywrQkFBUSxLQUFLLENBQUMsQ0FBQztDQUN2Qjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDIiwiZmlsZSI6InByaW50RXhwb3J0TmFtZWREZWNsYXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIHtFeHBvcnROYW1lZERlY2xhcmF0aW9ufSBmcm9tICdhc3QtdHlwZXMtZmxvdyc7XG5pbXBvcnQgdHlwZSB7TGluZXMsIFByaW50fSBmcm9tICcuLi8uLi90eXBlcy9jb21tb24nO1xuXG5pbXBvcnQgZmxhdHRlbiBmcm9tICcuLi8uLi91dGlscy9mbGF0dGVuJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9tYXJrZXJzJztcblxuZnVuY3Rpb24gcHJpbnRFeHBvcnROYW1lZERlY2xhcmF0aW9uKFxuICBwcmludDogUHJpbnQsXG4gIG5vZGU6IEV4cG9ydE5hbWVkRGVjbGFyYXRpb24sXG4pOiBMaW5lcyB7XG4gIGxldCBwYXJ0cyA9IFtcbiAgICAnZXhwb3J0JyxcbiAgICBtYXJrZXJzLm5vQnJlYWssXG4gICAgbWFya2Vycy5zcGFjZSxcbiAgXTtcblxuICBpZiAobm9kZS5kZWNsYXJhdGlvbikge1xuICAgIHBhcnRzID0gcGFydHMuY29uY2F0KFtcbiAgICAgIHByaW50KG5vZGUuZGVjbGFyYXRpb24pLFxuICAgIF0pO1xuICB9IGVsc2UgaWYgKG5vZGUuZXhwb3J0S2luZCA9PT0gJ3R5cGUnKSB7XG4gICAgLy8gSWYgdGhlcmUgaXMgYSBkZWNsYXJhdGlvbiBhbmQgdGhlIGtpbmQgaXMgJ3R5cGUnLCB0aGUgZGVjbGFyYXRpb24gbXVzdFxuICAgIC8vIGJlIGEgdHlwZSBhbGlhcyBvZiBzb21lIHNvcnQgd2hpY2ggYWxyZWFkeSBpbmNsdWRlcyB0aGUgd29yZCAndHlwZScuXG4gICAgcGFydHMgPSBwYXJ0cy5jb25jYXQoW1xuICAgICAgJ3R5cGUnLFxuICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgICAgbWFya2Vycy5zcGFjZSxcbiAgICBdKTtcbiAgfVxuXG4gIGlmIChub2RlLnNwZWNpZmllcnMubGVuZ3RoID4gMCkge1xuICAgIGludmFyaWFudCghbm9kZS5kZWNsYXJhdGlvbiwgJ0Nhbm5vdCBoYXZlIGJvdGggZGVjbGFyYXRpb24gYW5kIHNwZWNpZmllcnMnKTtcbiAgICBsZXQgb3BlbiA9IGZhbHNlO1xuICAgIGNvbnN0IHNwZWNpZmllcnMgPSBub2RlLnNwZWNpZmllcnMubWFwKChzcGVjaWZpZXIsIGksIGFycikgPT4ge1xuICAgICAgbGV0IHN1YlBhcnRzID0gW107XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIHNob3VsZCBvcGVuLlxuICAgICAgaWYgKCFvcGVuICYmIHNwZWNpZmllci50eXBlID09PSAnRXhwb3J0U3BlY2lmaWVyJykge1xuICAgICAgICBvcGVuID0gdHJ1ZTtcbiAgICAgICAgc3ViUGFydHMgPSBzdWJQYXJ0cy5jb25jYXQoW1xuICAgICAgICAgICd7JyxcbiAgICAgICAgXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByaW50IHRoZSBzcGVjaWZpZXIuXG4gICAgICBzdWJQYXJ0cyA9IHN1YlBhcnRzLmNvbmNhdChbXG4gICAgICAgIG1hcmtlcnMubm9CcmVhayxcbiAgICAgICAgcHJpbnQoc3BlY2lmaWVyKSxcbiAgICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgICAgXSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIHNob3VsZCBjbG9zZS4gTm90ZSB0aGF0IGl0J3MgaW1wb3J0YW50IHdlIGJlIGFibGUgdG8gb3BlblxuICAgICAgLy8gYW5kIHRoZW4gY2xvc2Ugd2l0aGluIGEgc2luZ2xlIGN5Y2xlIG9mIHRoaXMgbG9vcC5cbiAgICAgIGlmIChvcGVuICYmIGkgPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgIG9wZW4gPSBmYWxzZTtcbiAgICAgICAgc3ViUGFydHMgPSBzdWJQYXJ0cy5jb25jYXQoW1xuICAgICAgICAgICd9JyxcbiAgICAgICAgXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIHNob3VsZCBhZGQgYSBjb21tYSBhbmQgc3BhY2UuXG4gICAgICBpZiAoaSA8IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgIHN1YlBhcnRzID0gc3ViUGFydHMuY29uY2F0KFtcbiAgICAgICAgICBtYXJrZXJzLmNvbW1hLFxuICAgICAgICAgIG1hcmtlcnMuc3BhY2UsXG4gICAgICAgIF0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3ViUGFydHM7XG4gICAgfSk7XG4gICAgaW52YXJpYW50KCFvcGVuLCAnRXhwb3J0IHNwZWNpZmllcnMgc29tZWhvdyBsZWZ0IG9wZW4nKTtcbiAgICBwYXJ0cyA9IHBhcnRzLmNvbmNhdChzcGVjaWZpZXJzKTtcbiAgfVxuXG4gIGlmIChub2RlLnNvdXJjZSkge1xuICAgIGludmFyaWFudCghbm9kZS5kZWNsYXJhdGlvbiwgJ0RlY2xhcmF0aW9ucyBjYW5ub3QgaGF2ZSBhIHNvdXJjZScpO1xuICAgIHBhcnRzID0gcGFydHMuY29uY2F0KFtcbiAgICAgIG1hcmtlcnMubm9CcmVhayxcbiAgICAgIG1hcmtlcnMuc3BhY2UsXG4gICAgICAnZnJvbScsXG4gICAgICBtYXJrZXJzLm5vQnJlYWssXG4gICAgICBtYXJrZXJzLnNwYWNlLFxuICAgICAgcHJpbnQobm9kZS5zb3VyY2UpLFxuICAgIF0pO1xuICB9XG5cbiAgaWYgKCFub2RlLmRlY2xhcmF0aW9uKSB7XG4gICAgcGFydHMgPSBwYXJ0cy5jb25jYXQoW1xuICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgICAgJzsnLFxuICAgIF0pO1xuICB9XG5cbiAgcGFydHMgPSBwYXJ0cy5jb25jYXQoW1xuICAgIG1hcmtlcnMuaGFyZEJyZWFrLFxuICBdKTtcblxuICByZXR1cm4gZmxhdHRlbihwYXJ0cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJpbnRFeHBvcnROYW1lZERlY2xhcmF0aW9uO1xuIl19