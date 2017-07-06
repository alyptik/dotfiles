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

function printProperty(print, node) {
  var parts = [];

  if (node.kind === 'get') {
    parts = parts.concat(['get', _constantsMarkers2['default'].noBreak, _constantsMarkers2['default'].space]);
  } else if (node.kind === 'set') {
    parts = parts.concat(['set', _constantsMarkers2['default'].noBreak, _constantsMarkers2['default'].space]);
  }

  if (node.value && node.value.async) {
    parts = parts.concat(['async', _constantsMarkers2['default'].noBreak, _constantsMarkers2['default'].space]);
  }

  if (node.value && node.value.generator) {
    parts = parts.concat(['*', _constantsMarkers2['default'].noBreak]);
  }

  if (node.computed) {
    parts = parts.concat(['[', _constantsMarkers2['default'].noBreak, print(node.key), _constantsMarkers2['default'].noBreak, ']', _constantsMarkers2['default'].noBreak]);
  } else {
    parts = parts.concat([print(node.key), _constantsMarkers2['default'].noBreak]);
  }

  // TODO: Force the scope to break when a property is a method. Or if the
  // value is a function expression.
  if (node.method) {
    parts = parts.concat([_constantsMarkers2['default'].noBreak, print(node.value)]);
  } else if (!node.shorthand) {
    parts = parts.concat([':', _constantsMarkers2['default'].noBreak, _constantsMarkers2['default'].space, print(node.value)]);
  } else if (node.key.type !== node.value.type) {
    // This is a very strange case in the AST where we are in a shorthand
    // property but key and value do not have the same type. This can happen
    // when using defaults in an object pattern. E.g:
    //
    //   var {x = 4} = a;
    //
    // x is shorthand but its value is an assignment expression. In this case
    // we will just print the value.
    parts = [print(node.value)];
  }

  return (0, _utilsFlatten2['default'])(parts);
}

module.exports = printProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3ByaW50ZXJzL3NpbXBsZS9wcmludFByb3BlcnR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs0QkFhb0IscUJBQXFCOzs7O2dDQUNyQix5QkFBeUI7Ozs7QUFFN0MsU0FBUyxhQUFhLENBQUMsS0FBWSxFQUFFLElBQWMsRUFBUztBQUMxRCxNQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRWYsTUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtBQUN2QixTQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUNuQixLQUFLLEVBQ0wsOEJBQVEsT0FBTyxFQUNmLDhCQUFRLEtBQUssQ0FDZCxDQUFDLENBQUM7R0FDSixNQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7QUFDOUIsU0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDbkIsS0FBSyxFQUNMLDhCQUFRLE9BQU8sRUFDZiw4QkFBUSxLQUFLLENBQ2QsQ0FBQyxDQUFDO0dBQ0o7O0FBRUQsTUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ2xDLFNBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQ25CLE9BQU8sRUFDUCw4QkFBUSxPQUFPLEVBQ2YsOEJBQVEsS0FBSyxDQUNkLENBQUMsQ0FBQztHQUNKOztBQUVELE1BQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUN0QyxTQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUNuQixHQUFHLEVBQ0gsOEJBQVEsT0FBTyxDQUNoQixDQUFDLENBQUM7R0FDSjs7QUFFRCxNQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDakIsU0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDbkIsR0FBRyxFQUNILDhCQUFRLE9BQU8sRUFDZixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNmLDhCQUFRLE9BQU8sRUFDZixHQUFHLEVBQ0gsOEJBQVEsT0FBTyxDQUNoQixDQUFDLENBQUM7R0FDSixNQUFNO0FBQ0wsU0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDbkIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDZiw4QkFBUSxPQUFPLENBQ2hCLENBQUMsQ0FBQztHQUNKOzs7O0FBSUQsTUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2YsU0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDbkIsOEJBQVEsT0FBTyxFQUNmLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2xCLENBQUMsQ0FBQztHQUNKLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDMUIsU0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FDbkIsR0FBRyxFQUNILDhCQUFRLE9BQU8sRUFDZiw4QkFBUSxLQUFLLEVBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDbEIsQ0FBQyxDQUFDO0dBQ0osTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFOzs7Ozs7Ozs7QUFTNUMsU0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0dBQzdCOztBQUVELFNBQU8sK0JBQVEsS0FBSyxDQUFDLENBQUM7Q0FDdkI7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMiLCJmaWxlIjoicHJpbnRQcm9wZXJ0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIHtMaW5lcywgUHJpbnR9IGZyb20gJy4uLy4uL3R5cGVzL2NvbW1vbic7XG5pbXBvcnQgdHlwZSB7UHJvcGVydHl9IGZyb20gJ2FzdC10eXBlcy1mbG93JztcblxuaW1wb3J0IGZsYXR0ZW4gZnJvbSAnLi4vLi4vdXRpbHMvZmxhdHRlbic7XG5pbXBvcnQgbWFya2VycyBmcm9tICcuLi8uLi9jb25zdGFudHMvbWFya2Vycyc7XG5cbmZ1bmN0aW9uIHByaW50UHJvcGVydHkocHJpbnQ6IFByaW50LCBub2RlOiBQcm9wZXJ0eSk6IExpbmVzIHtcbiAgbGV0IHBhcnRzID0gW107XG5cbiAgaWYgKG5vZGUua2luZCA9PT0gJ2dldCcpIHtcbiAgICBwYXJ0cyA9IHBhcnRzLmNvbmNhdChbXG4gICAgICAnZ2V0JyxcbiAgICAgIG1hcmtlcnMubm9CcmVhayxcbiAgICAgIG1hcmtlcnMuc3BhY2UsXG4gICAgXSk7XG4gIH0gZWxzZSBpZiAobm9kZS5raW5kID09PSAnc2V0Jykge1xuICAgIHBhcnRzID0gcGFydHMuY29uY2F0KFtcbiAgICAgICdzZXQnLFxuICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgICAgbWFya2Vycy5zcGFjZSxcbiAgICBdKTtcbiAgfVxuXG4gIGlmIChub2RlLnZhbHVlICYmIG5vZGUudmFsdWUuYXN5bmMpIHtcbiAgICBwYXJ0cyA9IHBhcnRzLmNvbmNhdChbXG4gICAgICAnYXN5bmMnLFxuICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgICAgbWFya2Vycy5zcGFjZSxcbiAgICBdKTtcbiAgfVxuXG4gIGlmIChub2RlLnZhbHVlICYmIG5vZGUudmFsdWUuZ2VuZXJhdG9yKSB7XG4gICAgcGFydHMgPSBwYXJ0cy5jb25jYXQoW1xuICAgICAgJyonLFxuICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgIF0pO1xuICB9XG5cbiAgaWYgKG5vZGUuY29tcHV0ZWQpIHtcbiAgICBwYXJ0cyA9IHBhcnRzLmNvbmNhdChbXG4gICAgICAnWycsXG4gICAgICBtYXJrZXJzLm5vQnJlYWssXG4gICAgICBwcmludChub2RlLmtleSksXG4gICAgICBtYXJrZXJzLm5vQnJlYWssXG4gICAgICAnXScsXG4gICAgICBtYXJrZXJzLm5vQnJlYWssXG4gICAgXSk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHMgPSBwYXJ0cy5jb25jYXQoW1xuICAgICAgcHJpbnQobm9kZS5rZXkpLFxuICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgIF0pO1xuICB9XG5cbiAgLy8gVE9ETzogRm9yY2UgdGhlIHNjb3BlIHRvIGJyZWFrIHdoZW4gYSBwcm9wZXJ0eSBpcyBhIG1ldGhvZC4gT3IgaWYgdGhlXG4gIC8vIHZhbHVlIGlzIGEgZnVuY3Rpb24gZXhwcmVzc2lvbi5cbiAgaWYgKG5vZGUubWV0aG9kKSB7XG4gICAgcGFydHMgPSBwYXJ0cy5jb25jYXQoW1xuICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgICAgcHJpbnQobm9kZS52YWx1ZSksXG4gICAgXSk7XG4gIH0gZWxzZSBpZiAoIW5vZGUuc2hvcnRoYW5kKSB7XG4gICAgcGFydHMgPSBwYXJ0cy5jb25jYXQoW1xuICAgICAgJzonLFxuICAgICAgbWFya2Vycy5ub0JyZWFrLFxuICAgICAgbWFya2Vycy5zcGFjZSxcbiAgICAgIHByaW50KG5vZGUudmFsdWUpLFxuICAgIF0pO1xuICB9IGVsc2UgaWYgKG5vZGUua2V5LnR5cGUgIT09IG5vZGUudmFsdWUudHlwZSkge1xuICAgIC8vIFRoaXMgaXMgYSB2ZXJ5IHN0cmFuZ2UgY2FzZSBpbiB0aGUgQVNUIHdoZXJlIHdlIGFyZSBpbiBhIHNob3J0aGFuZFxuICAgIC8vIHByb3BlcnR5IGJ1dCBrZXkgYW5kIHZhbHVlIGRvIG5vdCBoYXZlIHRoZSBzYW1lIHR5cGUuIFRoaXMgY2FuIGhhcHBlblxuICAgIC8vIHdoZW4gdXNpbmcgZGVmYXVsdHMgaW4gYW4gb2JqZWN0IHBhdHRlcm4uIEUuZzpcbiAgICAvL1xuICAgIC8vICAgdmFyIHt4ID0gNH0gPSBhO1xuICAgIC8vXG4gICAgLy8geCBpcyBzaG9ydGhhbmQgYnV0IGl0cyB2YWx1ZSBpcyBhbiBhc3NpZ25tZW50IGV4cHJlc3Npb24uIEluIHRoaXMgY2FzZVxuICAgIC8vIHdlIHdpbGwganVzdCBwcmludCB0aGUgdmFsdWUuXG4gICAgcGFydHMgPSBbcHJpbnQobm9kZS52YWx1ZSldO1xuICB9XG5cbiAgcmV0dXJuIGZsYXR0ZW4ocGFydHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByaW50UHJvcGVydHk7XG4iXX0=