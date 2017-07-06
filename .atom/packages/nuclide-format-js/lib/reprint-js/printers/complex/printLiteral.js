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

var _utilsEscapeStringLiteral = require('../../utils/escapeStringLiteral');

var _utilsEscapeStringLiteral2 = _interopRequireDefault(_utilsEscapeStringLiteral);

var _utilsFlatten = require('../../utils/flatten');

var _utilsFlatten2 = _interopRequireDefault(_utilsFlatten);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _constantsMarkers = require('../../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

function printLiteral(print, node, context) {
  var last = context.path.last();

  // JSXAttributes should always use double quotes.
  if (last && last.type === 'JSXAttribute') {
    (0, _assert2['default'])(typeof node.value === 'string', 'Literals within a JSXAttribute should always be a string');
    return [(0, _utilsEscapeStringLiteral2['default'])(node.value, { quotes: 'double' })];
  }

  // JSXElements don't need quotes, so we need special handling.
  if (last && last.type === 'JSXElement') {
    var _ret = (function () {
      (0, _assert2['default'])(typeof node.value === 'string', 'Literals within a JSXElement should always be a string');
      var lines = node.value.split('\n');
      var spaceNeeded = true;
      return {
        v: (0, _utilsFlatten2['default'])(lines.map(function (line, i) {
          // Note: Scope is already opened in the JSXElement.
          // We have to check in order to avoid consecutive spaces when the scope
          // is not broken.
          var breakMarker = spaceNeeded ? _constantsMarkers2['default'].scopeSpaceBreak : _constantsMarkers2['default'].scopeBreak;
          if (/^\s*$/.test(line)) {
            spaceNeeded = false;
          } else {
            spaceNeeded = true;
          }
          // $FlowFixMe(kad)
          return [i > 0 ? breakMarker : _constantsMarkers2['default'].empty, line];
        }))
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }

  return [literalToString(node)];
}

function literalToString(node) {
  if (typeof node.value === 'string') {
    return (0, _utilsEscapeStringLiteral2['default'])(node.value, { quotes: 'single' });
  }
  // It's not safe to use value for number literals that would lose precision.
  if (node.raw != null) {
    return node.raw;
  }
  return _constantsMarkers2['default'].empty;
}

module.exports = printLiteral;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3ByaW50ZXJzL2NvbXBsZXgvcHJpbnRMaXRlcmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt3Q0FhZ0MsaUNBQWlDOzs7OzRCQUM3QyxxQkFBcUI7Ozs7c0JBQ25CLFFBQVE7Ozs7Z0NBQ1YseUJBQXlCOzs7O0FBRTdDLFNBQVMsWUFBWSxDQUFDLEtBQVksRUFBRSxJQUFhLEVBQUUsT0FBZ0IsRUFBUztBQUMxRSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7QUFHakMsTUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7QUFDeEMsNkJBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDOUIsMERBQTBELENBQzNELENBQUM7QUFDRixXQUFPLENBQUMsMkNBQW9CLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDO0dBQzlEOzs7QUFHRCxNQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTs7QUFDdEMsK0JBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDOUIsd0RBQXdELENBQ3pELENBQUM7QUFDRixVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxVQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDdkI7V0FBTywrQkFBUSxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUMsRUFBSzs7OztBQUlwQyxjQUFNLFdBQVcsR0FBRyxXQUFXLEdBQzNCLDhCQUFRLGVBQWUsR0FDdkIsOEJBQVEsVUFBVSxDQUFDO0FBQ3ZCLGNBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN0Qix1QkFBVyxHQUFHLEtBQUssQ0FBQztXQUNyQixNQUFNO0FBQ0wsdUJBQVcsR0FBRyxJQUFJLENBQUM7V0FDcEI7O0FBRUQsaUJBQU8sQ0FDTCxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsR0FBRyw4QkFBUSxLQUFLLEVBQ25DLElBQUksQ0FDTCxDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBQUM7Ozs7R0FDTDs7QUFFRCxTQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDaEM7O0FBRUQsU0FBUyxlQUFlLENBQUMsSUFBYSxFQUFVO0FBQzlDLE1BQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUNsQyxXQUFPLDJDQUFvQixJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7R0FDNUQ7O0FBRUQsTUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUNwQixXQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7R0FDakI7QUFDRCxTQUFPLDhCQUFRLEtBQUssQ0FBQztDQUN0Qjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyIsImZpbGUiOiJwcmludExpdGVyYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSB7Q29udGV4dCwgTGluZXMsIFByaW50fSBmcm9tICcuLi8uLi90eXBlcy9jb21tb24nO1xuaW1wb3J0IHR5cGUge0xpdGVyYWx9IGZyb20gJ2FzdC10eXBlcy1mbG93JztcblxuaW1wb3J0IGVzY2FwZVN0cmluZ0xpdGVyYWwgZnJvbSAnLi4vLi4vdXRpbHMvZXNjYXBlU3RyaW5nTGl0ZXJhbCc7XG5pbXBvcnQgZmxhdHRlbiBmcm9tICcuLi8uLi91dGlscy9mbGF0dGVuJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uLy4uL2NvbnN0YW50cy9tYXJrZXJzJztcblxuZnVuY3Rpb24gcHJpbnRMaXRlcmFsKHByaW50OiBQcmludCwgbm9kZTogTGl0ZXJhbCwgY29udGV4dDogQ29udGV4dCk6IExpbmVzIHtcbiAgY29uc3QgbGFzdCA9IGNvbnRleHQucGF0aC5sYXN0KCk7XG5cbiAgLy8gSlNYQXR0cmlidXRlcyBzaG91bGQgYWx3YXlzIHVzZSBkb3VibGUgcXVvdGVzLlxuICBpZiAobGFzdCAmJiBsYXN0LnR5cGUgPT09ICdKU1hBdHRyaWJ1dGUnKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgdHlwZW9mIG5vZGUudmFsdWUgPT09ICdzdHJpbmcnLFxuICAgICAgJ0xpdGVyYWxzIHdpdGhpbiBhIEpTWEF0dHJpYnV0ZSBzaG91bGQgYWx3YXlzIGJlIGEgc3RyaW5nJyxcbiAgICApO1xuICAgIHJldHVybiBbZXNjYXBlU3RyaW5nTGl0ZXJhbChub2RlLnZhbHVlLCB7cXVvdGVzOiAnZG91YmxlJ30pXTtcbiAgfVxuXG4gIC8vIEpTWEVsZW1lbnRzIGRvbid0IG5lZWQgcXVvdGVzLCBzbyB3ZSBuZWVkIHNwZWNpYWwgaGFuZGxpbmcuXG4gIGlmIChsYXN0ICYmIGxhc3QudHlwZSA9PT0gJ0pTWEVsZW1lbnQnKSB7XG4gICAgaW52YXJpYW50KFxuICAgICAgdHlwZW9mIG5vZGUudmFsdWUgPT09ICdzdHJpbmcnLFxuICAgICAgJ0xpdGVyYWxzIHdpdGhpbiBhIEpTWEVsZW1lbnQgc2hvdWxkIGFsd2F5cyBiZSBhIHN0cmluZycsXG4gICAgKTtcbiAgICBjb25zdCBsaW5lcyA9IG5vZGUudmFsdWUuc3BsaXQoJ1xcbicpO1xuICAgIGxldCBzcGFjZU5lZWRlZCA9IHRydWU7XG4gICAgcmV0dXJuIGZsYXR0ZW4obGluZXMubWFwKChsaW5lLCBpKSA9PiB7XG4gICAgICAvLyBOb3RlOiBTY29wZSBpcyBhbHJlYWR5IG9wZW5lZCBpbiB0aGUgSlNYRWxlbWVudC5cbiAgICAgIC8vIFdlIGhhdmUgdG8gY2hlY2sgaW4gb3JkZXIgdG8gYXZvaWQgY29uc2VjdXRpdmUgc3BhY2VzIHdoZW4gdGhlIHNjb3BlXG4gICAgICAvLyBpcyBub3QgYnJva2VuLlxuICAgICAgY29uc3QgYnJlYWtNYXJrZXIgPSBzcGFjZU5lZWRlZFxuICAgICAgICA/IG1hcmtlcnMuc2NvcGVTcGFjZUJyZWFrXG4gICAgICAgIDogbWFya2Vycy5zY29wZUJyZWFrO1xuICAgICAgaWYgKC9eXFxzKiQvLnRlc3QobGluZSkpIHtcbiAgICAgICAgc3BhY2VOZWVkZWQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwYWNlTmVlZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vICRGbG93Rml4TWUoa2FkKVxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgaSA+IDAgPyBicmVha01hcmtlciA6IG1hcmtlcnMuZW1wdHksXG4gICAgICAgIGxpbmUsXG4gICAgICBdO1xuICAgIH0pKTtcbiAgfVxuXG4gIHJldHVybiBbbGl0ZXJhbFRvU3RyaW5nKG5vZGUpXTtcbn1cblxuZnVuY3Rpb24gbGl0ZXJhbFRvU3RyaW5nKG5vZGU6IExpdGVyYWwpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIG5vZGUudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGVzY2FwZVN0cmluZ0xpdGVyYWwobm9kZS52YWx1ZSwge3F1b3RlczogJ3NpbmdsZSd9KTtcbiAgfVxuICAvLyBJdCdzIG5vdCBzYWZlIHRvIHVzZSB2YWx1ZSBmb3IgbnVtYmVyIGxpdGVyYWxzIHRoYXQgd291bGQgbG9zZSBwcmVjaXNpb24uXG4gIGlmIChub2RlLnJhdyAhPSBudWxsKSB7XG4gICAgcmV0dXJuIG5vZGUucmF3O1xuICB9XG4gIHJldHVybiBtYXJrZXJzLmVtcHR5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByaW50TGl0ZXJhbDtcbiJdfQ==