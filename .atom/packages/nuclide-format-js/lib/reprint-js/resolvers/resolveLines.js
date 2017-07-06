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

var _resolveAll = require('./resolveAll');

var _resolveAll2 = _interopRequireDefault(_resolveAll);

var _resolveDuplicates = require('./resolveDuplicates');

var _resolveDuplicates2 = _interopRequireDefault(_resolveDuplicates);

var _resolveForcedMarkers = require('./resolveForcedMarkers');

var _resolveForcedMarkers2 = _interopRequireDefault(_resolveForcedMarkers);

var _resolveForcedScopeBreaks = require('./resolveForcedScopeBreaks');

var _resolveForcedScopeBreaks2 = _interopRequireDefault(_resolveForcedScopeBreaks);

var _resolveNoBreaks = require('./resolveNoBreaks');

var _resolveNoBreaks2 = _interopRequireDefault(_resolveNoBreaks);

var _resolveScopes = require('./resolveScopes');

var _resolveScopes2 = _interopRequireDefault(_resolveScopes);

/**
 * After printing the AST parts and all appropriate markers this will join the
 * parts based on options and the markers that are available.
 */
function resolveLines(lines_, options) {
  var lines = lines_;
  lines = (0, _resolveNoBreaks2['default'])(lines);
  lines = (0, _resolveForcedScopeBreaks2['default'])(lines);
  lines = (0, _resolveDuplicates2['default'])(lines);

  // Now we will resolve some newlines where possible. This will affect
  // runs, whereas before we were careful to not affect runs of markers.
  lines = (0, _resolveForcedMarkers2['default'])(lines);
  lines = (0, _resolveScopes2['default'])(lines, options);
  return (0, _resolveAll2['default'])(lines, options);
}

module.exports = resolveLines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3Jlc29sdmVycy9yZXNvbHZlTGluZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzBCQWF1QixjQUFjOzs7O2lDQUNQLHFCQUFxQjs7OztvQ0FDbEIsd0JBQXdCOzs7O3dDQUNwQiw0QkFBNEI7Ozs7K0JBQ3JDLG1CQUFtQjs7Ozs2QkFDckIsaUJBQWlCOzs7Ozs7OztBQU0zQyxTQUFTLFlBQVksQ0FBQyxNQUFrQixFQUFFLE9BQWdCLEVBQVU7QUFDbEUsTUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQ25CLE9BQUssR0FBRyxrQ0FBZ0IsS0FBSyxDQUFDLENBQUM7QUFDL0IsT0FBSyxHQUFHLDJDQUF5QixLQUFLLENBQUMsQ0FBQztBQUN4QyxPQUFLLEdBQUcsb0NBQWtCLEtBQUssQ0FBQyxDQUFDOzs7O0FBSWpDLE9BQUssR0FBRyx1Q0FBcUIsS0FBSyxDQUFDLENBQUM7QUFDcEMsT0FBSyxHQUFHLGdDQUFjLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN0QyxTQUFPLDZCQUFXLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNuQzs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyIsImZpbGUiOiJyZXNvbHZlTGluZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSBPcHRpb25zIGZyb20gJy4uL29wdGlvbnMvT3B0aW9ucyc7XG5pbXBvcnQgdHlwZSB7T3V0cHV0fSBmcm9tICcuLi90eXBlcy9jb21tb24nO1xuXG5pbXBvcnQgcmVzb2x2ZUFsbCBmcm9tICcuL3Jlc29sdmVBbGwnO1xuaW1wb3J0IHJlc29sdmVEdXBsaWNhdGVzIGZyb20gJy4vcmVzb2x2ZUR1cGxpY2F0ZXMnO1xuaW1wb3J0IHJlc29sdmVGb3JjZWRNYXJrZXJzIGZyb20gJy4vcmVzb2x2ZUZvcmNlZE1hcmtlcnMnO1xuaW1wb3J0IHJlc29sdmVGb3JjZWRTY29wZUJyZWFrcyBmcm9tICcuL3Jlc29sdmVGb3JjZWRTY29wZUJyZWFrcyc7XG5pbXBvcnQgcmVzb2x2ZU5vQnJlYWtzIGZyb20gJy4vcmVzb2x2ZU5vQnJlYWtzJztcbmltcG9ydCByZXNvbHZlU2NvcGVzIGZyb20gJy4vcmVzb2x2ZVNjb3Blcyc7XG5cbi8qKlxuICogQWZ0ZXIgcHJpbnRpbmcgdGhlIEFTVCBwYXJ0cyBhbmQgYWxsIGFwcHJvcHJpYXRlIG1hcmtlcnMgdGhpcyB3aWxsIGpvaW4gdGhlXG4gKiBwYXJ0cyBiYXNlZCBvbiBvcHRpb25zIGFuZCB0aGUgbWFya2VycyB0aGF0IGFyZSBhdmFpbGFibGUuXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVMaW5lcyhsaW5lc186IEFycmF5PGFueT4sIG9wdGlvbnM6IE9wdGlvbnMpOiBPdXRwdXQge1xuICBsZXQgbGluZXMgPSBsaW5lc187XG4gIGxpbmVzID0gcmVzb2x2ZU5vQnJlYWtzKGxpbmVzKTtcbiAgbGluZXMgPSByZXNvbHZlRm9yY2VkU2NvcGVCcmVha3MobGluZXMpO1xuICBsaW5lcyA9IHJlc29sdmVEdXBsaWNhdGVzKGxpbmVzKTtcblxuICAvLyBOb3cgd2Ugd2lsbCByZXNvbHZlIHNvbWUgbmV3bGluZXMgd2hlcmUgcG9zc2libGUuIFRoaXMgd2lsbCBhZmZlY3RcbiAgLy8gcnVucywgd2hlcmVhcyBiZWZvcmUgd2Ugd2VyZSBjYXJlZnVsIHRvIG5vdCBhZmZlY3QgcnVucyBvZiBtYXJrZXJzLlxuICBsaW5lcyA9IHJlc29sdmVGb3JjZWRNYXJrZXJzKGxpbmVzKTtcbiAgbGluZXMgPSByZXNvbHZlU2NvcGVzKGxpbmVzLCBvcHRpb25zKTtcbiAgcmV0dXJuIHJlc29sdmVBbGwobGluZXMsIG9wdGlvbnMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc29sdmVMaW5lcztcbiJdfQ==