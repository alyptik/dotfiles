var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

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

var _utilsBuildRuns = require('../utils/buildRuns');

var _utilsBuildRuns2 = _interopRequireDefault(_utilsBuildRuns);

var _utilsBuildScopes = require('../utils/buildScopes');

var _utilsBuildScopes2 = _interopRequireDefault(_utilsBuildScopes);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _utilsIsScopeBreakMarker = require('../utils/isScopeBreakMarker');

var _utilsIsScopeBreakMarker2 = _interopRequireDefault(_utilsIsScopeBreakMarker);

var _utilsIsScopeMarker = require('../utils/isScopeMarker');

var _utilsIsScopeMarker2 = _interopRequireDefault(_utilsIsScopeMarker);

var _constantsMarkers = require('../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

var _utilsTranslateScopeMarker = require('../utils/translateScopeMarker');

var _utilsTranslateScopeMarker2 = _interopRequireDefault(_utilsTranslateScopeMarker);

/**
 * Sometimes a scope break may be adjacent to a hard break. If that's the case
 * go ahead and break the scope.
 *
 * This assumes noBreaks have already been removed and will not be encountered.
 */
function resolveForcedScopeBreaks(lines) {
  var scopes = (0, _utilsBuildScopes2['default'])(lines);
  var runs = (0, _utilsBuildRuns2['default'])(lines);
  var toBreak = new Set();

  for (var run of runs) {
    var _run = _slicedToArray(run, 2);

    var start = _run[0];
    var end = _run[1];

    var broken = false;
    for (var i = start; i < end; i++) {
      if (lines[i] === _constantsMarkers2['default'].hardBreak || lines[i] === _constantsMarkers2['default'].multiHardBreak) {
        broken = true;
        break;
      }
    }

    if (!broken) {
      continue;
    }

    for (var i = start; i < end; i++) {
      if ((0, _utilsIsScopeBreakMarker2['default'])(lines[i])) {
        (0, _assert2['default'])(scopes[i] != null, 'Scope markers must have a scope.');
        toBreak.add(scopes[i]);
      }
    }
  }

  return lines.map(function (line, i) {
    if ((0, _utilsIsScopeMarker2['default'])(line) && scopes[i] != null && toBreak.has(scopes[i])) {
      return (0, _utilsTranslateScopeMarker2['default'])(line, true);
    }
    return line;
  });
}

module.exports = resolveForcedScopeBreaks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3Jlc29sdmVycy9yZXNvbHZlRm9yY2VkU2NvcGVCcmVha3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OEJBVXNCLG9CQUFvQjs7OztnQ0FDbEIsc0JBQXNCOzs7O3NCQUN4QixRQUFROzs7O3VDQUNDLDZCQUE2Qjs7OztrQ0FDbEMsd0JBQXdCOzs7O2dDQUM5QixzQkFBc0I7Ozs7eUNBQ1QsK0JBQStCOzs7Ozs7Ozs7O0FBUWhFLFNBQVMsd0JBQXdCLENBQUMsS0FBaUIsRUFBYztBQUMvRCxNQUFNLE1BQU0sR0FBRyxtQ0FBWSxLQUFLLENBQUMsQ0FBQztBQUNsQyxNQUFNLElBQUksR0FBRyxpQ0FBVSxLQUFLLENBQUMsQ0FBQztBQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUUxQixPQUFLLElBQU0sR0FBRyxJQUFJLElBQUksRUFBRTs4QkFDRCxHQUFHOztRQUFqQixLQUFLO1FBQUUsR0FBRzs7QUFDakIsUUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFNBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEMsVUFDRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssOEJBQVEsU0FBUyxJQUM5QixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssOEJBQVEsY0FBYyxFQUNuQztBQUNBLGNBQU0sR0FBRyxJQUFJLENBQUM7QUFDZCxjQUFNO09BQ1A7S0FDRjs7QUFFRCxRQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1gsZUFBUztLQUNWOztBQUVELFNBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEMsVUFBSSwwQ0FBbUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEMsaUNBQVUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDO0FBQ2pFLGVBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDeEI7S0FDRjtHQUNGOztBQUVELFNBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDLEVBQUs7QUFDNUIsUUFDRSxxQ0FBYyxJQUFJLENBQUMsSUFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDdEI7QUFDQSxhQUFPLDRDQUFxQixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDekM7QUFDRCxXQUFPLElBQUksQ0FBQztHQUNiLENBQUMsQ0FBQztDQUNKOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUMiLCJmaWxlIjoicmVzb2x2ZUZvcmNlZFNjb3BlQnJlYWtzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IGJ1aWxkUnVucyBmcm9tICcuLi91dGlscy9idWlsZFJ1bnMnO1xuaW1wb3J0IGJ1aWxkU2NvcGVzIGZyb20gJy4uL3V0aWxzL2J1aWxkU2NvcGVzJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBpc1Njb3BlQnJlYWtNYXJrZXIgZnJvbSAnLi4vdXRpbHMvaXNTY29wZUJyZWFrTWFya2VyJztcbmltcG9ydCBpc1Njb3BlTWFya2VyIGZyb20gJy4uL3V0aWxzL2lzU2NvcGVNYXJrZXInO1xuaW1wb3J0IG1hcmtlcnMgZnJvbSAnLi4vY29uc3RhbnRzL21hcmtlcnMnO1xuaW1wb3J0IHRyYW5zbGF0ZVNjb3BlTWFya2VyIGZyb20gJy4uL3V0aWxzL3RyYW5zbGF0ZVNjb3BlTWFya2VyJztcblxuLyoqXG4gKiBTb21ldGltZXMgYSBzY29wZSBicmVhayBtYXkgYmUgYWRqYWNlbnQgdG8gYSBoYXJkIGJyZWFrLiBJZiB0aGF0J3MgdGhlIGNhc2VcbiAqIGdvIGFoZWFkIGFuZCBicmVhayB0aGUgc2NvcGUuXG4gKlxuICogVGhpcyBhc3N1bWVzIG5vQnJlYWtzIGhhdmUgYWxyZWFkeSBiZWVuIHJlbW92ZWQgYW5kIHdpbGwgbm90IGJlIGVuY291bnRlcmVkLlxuICovXG5mdW5jdGlvbiByZXNvbHZlRm9yY2VkU2NvcGVCcmVha3MobGluZXM6IEFycmF5PGFueT4pOiBBcnJheTxhbnk+IHtcbiAgY29uc3Qgc2NvcGVzID0gYnVpbGRTY29wZXMobGluZXMpO1xuICBjb25zdCBydW5zID0gYnVpbGRSdW5zKGxpbmVzKTtcbiAgY29uc3QgdG9CcmVhayA9IG5ldyBTZXQoKTtcblxuICBmb3IgKGNvbnN0IHJ1biBvZiBydW5zKSB7XG4gICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gcnVuO1xuICAgIGxldCBicm9rZW4gPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgaWYgKFxuICAgICAgICBsaW5lc1tpXSA9PT0gbWFya2Vycy5oYXJkQnJlYWsgfHxcbiAgICAgICAgbGluZXNbaV0gPT09IG1hcmtlcnMubXVsdGlIYXJkQnJlYWtcbiAgICAgICkge1xuICAgICAgICBicm9rZW4gPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWJyb2tlbikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGlmIChpc1Njb3BlQnJlYWtNYXJrZXIobGluZXNbaV0pKSB7XG4gICAgICAgIGludmFyaWFudChzY29wZXNbaV0gIT0gbnVsbCwgJ1Njb3BlIG1hcmtlcnMgbXVzdCBoYXZlIGEgc2NvcGUuJyk7XG4gICAgICAgIHRvQnJlYWsuYWRkKHNjb3Blc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxpbmVzLm1hcCgobGluZSwgaSkgPT4ge1xuICAgIGlmIChcbiAgICAgIGlzU2NvcGVNYXJrZXIobGluZSkgJiZcbiAgICAgIHNjb3Blc1tpXSAhPSBudWxsICYmXG4gICAgICB0b0JyZWFrLmhhcyhzY29wZXNbaV0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRlU2NvcGVNYXJrZXIobGluZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiBsaW5lO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXNvbHZlRm9yY2VkU2NvcGVCcmVha3M7XG4iXX0=