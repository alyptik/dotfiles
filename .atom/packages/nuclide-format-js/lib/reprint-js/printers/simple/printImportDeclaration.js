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

function printImportDeclaration(print, node) {
  var open = false;
  var specifiers = node.specifiers.map(function (specifier, i, arr) {
    var parts = [];

    // Check if we should open.
    if (!open && specifier.type === 'ImportSpecifier') {
      open = true;
      parts = parts.concat(['{']);
    }

    // Print the specifier.
    parts = parts.concat([_constantsMarkers2['default'].noBreak, print(specifier), _constantsMarkers2['default'].noBreak]);

    // Check if we should close. Note that it's important we be able to open
    // and then close within a single cycle of this loop.
    if (open && i === arr.length - 1) {
      open = false;
      parts = parts.concat(['}']);
    }

    // Check if we should add a comma and space.
    if (i < arr.length - 1) {
      parts = parts.concat([_constantsMarkers2['default'].comma, _constantsMarkers2['default'].space]);
    }

    return parts;
  });
  (0, _assert2['default'])(!open, 'Import declaration left open somehow.');
  return (0, _utilsFlatten2['default'])(['import', _constantsMarkers2['default'].space,
  // $FlowFixMe(kad): add importKind to ast-types-flow
  node.importKind === 'type' ? ['type', _constantsMarkers2['default'].space] : _constantsMarkers2['default'].empty, specifiers, _constantsMarkers2['default'].space, 'from', _constantsMarkers2['default'].noBreak, _constantsMarkers2['default'].space, print(node.source), _constantsMarkers2['default'].noBreak, ';', _constantsMarkers2['default'].hardBreak]);
}

module.exports = printImportDeclaration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3ByaW50ZXJzL3NpbXBsZS9wcmludEltcG9ydERlY2xhcmF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs0QkFhb0IscUJBQXFCOzs7O3NCQUNuQixRQUFROzs7O2dDQUNWLHlCQUF5Qjs7OztBQUU3QyxTQUFTLHNCQUFzQixDQUFDLEtBQVksRUFBRSxJQUF1QixFQUFTO0FBQzVFLE1BQUksSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNqQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFLO0FBQzVELFFBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7O0FBR2YsUUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFO0FBQ2pELFVBQUksR0FBRyxJQUFJLENBQUM7QUFDWixXQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUNuQixHQUFHLENBQ0osQ0FBQyxDQUFDO0tBQ0o7OztBQUdELFNBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQ25CLDhCQUFRLE9BQU8sRUFDZixLQUFLLENBQUMsU0FBUyxDQUFDLEVBQ2hCLDhCQUFRLE9BQU8sQ0FDaEIsQ0FBQyxDQUFDOzs7O0FBSUgsUUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2hDLFVBQUksR0FBRyxLQUFLLENBQUM7QUFDYixXQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUNuQixHQUFHLENBQ0osQ0FBQyxDQUFDO0tBQ0o7OztBQUdELFFBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFdBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQ25CLDhCQUFRLEtBQUssRUFDYiw4QkFBUSxLQUFLLENBQ2QsQ0FBQyxDQUFDO0tBQ0o7O0FBRUQsV0FBTyxLQUFLLENBQUM7R0FDZCxDQUFDLENBQUM7QUFDSCwyQkFBVSxDQUFDLElBQUksRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDO0FBQzFELFNBQU8sK0JBQVEsQ0FDYixRQUFRLEVBQ1IsOEJBQVEsS0FBSzs7QUFFYixNQUFJLENBQUMsVUFBVSxLQUFLLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSw4QkFBUSxLQUFLLENBQUMsR0FBRyw4QkFBUSxLQUFLLEVBQ3BFLFVBQVUsRUFDViw4QkFBUSxLQUFLLEVBQ2IsTUFBTSxFQUNOLDhCQUFRLE9BQU8sRUFDZiw4QkFBUSxLQUFLLEVBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFDbEIsOEJBQVEsT0FBTyxFQUNmLEdBQUcsRUFDSCw4QkFBUSxTQUFTLENBQ2xCLENBQUMsQ0FBQztDQUNKOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUMiLCJmaWxlIjoicHJpbnRJbXBvcnREZWNsYXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIHtJbXBvcnREZWNsYXJhdGlvbn0gZnJvbSAnYXN0LXR5cGVzLWZsb3cnO1xuaW1wb3J0IHR5cGUge0xpbmVzLCBQcmludH0gZnJvbSAnLi4vLi4vdHlwZXMvY29tbW9uJztcblxuaW1wb3J0IGZsYXR0ZW4gZnJvbSAnLi4vLi4vdXRpbHMvZmxhdHRlbic7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgbWFya2VycyBmcm9tICcuLi8uLi9jb25zdGFudHMvbWFya2Vycyc7XG5cbmZ1bmN0aW9uIHByaW50SW1wb3J0RGVjbGFyYXRpb24ocHJpbnQ6IFByaW50LCBub2RlOiBJbXBvcnREZWNsYXJhdGlvbik6IExpbmVzIHtcbiAgbGV0IG9wZW4gPSBmYWxzZTtcbiAgY29uc3Qgc3BlY2lmaWVycyA9IG5vZGUuc3BlY2lmaWVycy5tYXAoKHNwZWNpZmllciwgaSwgYXJyKSA9PiB7XG4gICAgbGV0IHBhcnRzID0gW107XG5cbiAgICAvLyBDaGVjayBpZiB3ZSBzaG91bGQgb3Blbi5cbiAgICBpZiAoIW9wZW4gJiYgc3BlY2lmaWVyLnR5cGUgPT09ICdJbXBvcnRTcGVjaWZpZXInKSB7XG4gICAgICBvcGVuID0gdHJ1ZTtcbiAgICAgIHBhcnRzID0gcGFydHMuY29uY2F0KFtcbiAgICAgICAgJ3snLFxuICAgICAgXSk7XG4gICAgfVxuXG4gICAgLy8gUHJpbnQgdGhlIHNwZWNpZmllci5cbiAgICBwYXJ0cyA9IHBhcnRzLmNvbmNhdChbXG4gICAgICBtYXJrZXJzLm5vQnJlYWssXG4gICAgICBwcmludChzcGVjaWZpZXIpLFxuICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgIF0pO1xuXG4gICAgLy8gQ2hlY2sgaWYgd2Ugc2hvdWxkIGNsb3NlLiBOb3RlIHRoYXQgaXQncyBpbXBvcnRhbnQgd2UgYmUgYWJsZSB0byBvcGVuXG4gICAgLy8gYW5kIHRoZW4gY2xvc2Ugd2l0aGluIGEgc2luZ2xlIGN5Y2xlIG9mIHRoaXMgbG9vcC5cbiAgICBpZiAob3BlbiAmJiBpID09PSBhcnIubGVuZ3RoIC0gMSkge1xuICAgICAgb3BlbiA9IGZhbHNlO1xuICAgICAgcGFydHMgPSBwYXJ0cy5jb25jYXQoW1xuICAgICAgICAnfScsXG4gICAgICBdKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB3ZSBzaG91bGQgYWRkIGEgY29tbWEgYW5kIHNwYWNlLlxuICAgIGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgIHBhcnRzID0gcGFydHMuY29uY2F0KFtcbiAgICAgICAgbWFya2Vycy5jb21tYSxcbiAgICAgICAgbWFya2Vycy5zcGFjZSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJ0cztcbiAgfSk7XG4gIGludmFyaWFudCghb3BlbiwgJ0ltcG9ydCBkZWNsYXJhdGlvbiBsZWZ0IG9wZW4gc29tZWhvdy4nKTtcbiAgcmV0dXJuIGZsYXR0ZW4oW1xuICAgICdpbXBvcnQnLFxuICAgIG1hcmtlcnMuc3BhY2UsXG4gICAgLy8gJEZsb3dGaXhNZShrYWQpOiBhZGQgaW1wb3J0S2luZCB0byBhc3QtdHlwZXMtZmxvd1xuICAgIG5vZGUuaW1wb3J0S2luZCA9PT0gJ3R5cGUnID8gWyd0eXBlJywgbWFya2Vycy5zcGFjZV0gOiBtYXJrZXJzLmVtcHR5LFxuICAgIHNwZWNpZmllcnMsXG4gICAgbWFya2Vycy5zcGFjZSxcbiAgICAnZnJvbScsXG4gICAgbWFya2Vycy5ub0JyZWFrLFxuICAgIG1hcmtlcnMuc3BhY2UsXG4gICAgcHJpbnQobm9kZS5zb3VyY2UpLFxuICAgIG1hcmtlcnMubm9CcmVhayxcbiAgICAnOycsXG4gICAgbWFya2Vycy5oYXJkQnJlYWssXG4gIF0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByaW50SW1wb3J0RGVjbGFyYXRpb247XG4iXX0=