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

/**
 * This squashes all no break markers and any nearby breaks.
 */
function resolveNoBreaks(lines) {
  var scopes = (0, _utilsBuildScopes2['default'])(lines);
  var runs = (0, _utilsBuildRuns2['default'])(lines);

  var kill = new Set();
  var killScopes = new Set();

  for (var run of runs) {
    var _run = _slicedToArray(run, 2);

    var start = _run[0];
    var end = _run[1];

    var hasNoBreak = false;

    // Check for the noBreak.
    for (var i = start; i < end; i++) {
      if (lines[i] === _constantsMarkers2['default'].noBreak) {
        hasNoBreak = true;
        break;
      }
    }

    if (!hasNoBreak) {
      continue;
    }

    // Then test what we need to kill.
    for (var i = start; i < end; i++) {
      if ((0, _utilsIsScopeBreakMarker2['default'])(lines[i])) {
        (0, _assert2['default'])(scopes[i] != null, 'Scope markers must have a scope.');
        killScopes.add(scopes[i]);
      } else if (lines[i] === _constantsMarkers2['default'].noBreak || lines[i] === _constantsMarkers2['default'].hardBreak || lines[i] === _constantsMarkers2['default'].multiHardBreak) {
        kill.add(i);
      }
    }
  }

  // Kill the appropriate scope markers.
  for (var i = 0; i < lines.length; i++) {
    if ((0, _utilsIsScopeMarker2['default'])(lines[i]) && killScopes.has(scopes[i])) {
      kill.add(i);
    }
  }

  // Now do the killing.
  return lines.map(function (line, i) {
    if (kill.has(i)) {
      if (line === _constantsMarkers2['default'].hardBreak) {
        return _constantsMarkers2['default'].empty;
      } else if (line === _constantsMarkers2['default'].multiHardBreak) {
        return _constantsMarkers2['default'].empty;
      } else if (line === _constantsMarkers2['default'].noBreak) {
        return _constantsMarkers2['default'].empty;
      } else if (line === _constantsMarkers2['default'].openScope) {
        return _constantsMarkers2['default'].empty;
      } else if (line === _constantsMarkers2['default'].scopeIndent) {
        return _constantsMarkers2['default'].empty;
      } else if (line === _constantsMarkers2['default'].scopeBreak) {
        return _constantsMarkers2['default'].empty;
      } else if (line === _constantsMarkers2['default'].scopeSpaceBreak) {
        return _constantsMarkers2['default'].space;
      } else if (line === _constantsMarkers2['default'].scopeComma) {
        return _constantsMarkers2['default'].empty;
      } else if (line === _constantsMarkers2['default'].scopeDedent) {
        return _constantsMarkers2['default'].empty;
      } else if (line === _constantsMarkers2['default'].closeScope) {
        return _constantsMarkers2['default'].empty;
      }
    }
    return line;
  });
}

module.exports = resolveNoBreaks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3Jlc29sdmVycy9yZXNvbHZlTm9CcmVha3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OEJBVXNCLG9CQUFvQjs7OztnQ0FDbEIsc0JBQXNCOzs7O3NCQUN4QixRQUFROzs7O3VDQUNDLDZCQUE2Qjs7OztrQ0FDbEMsd0JBQXdCOzs7O2dDQUM5QixzQkFBc0I7Ozs7Ozs7QUFLMUMsU0FBUyxlQUFlLENBQUMsS0FBaUIsRUFBYztBQUN0RCxNQUFNLE1BQU0sR0FBRyxtQ0FBWSxLQUFLLENBQUMsQ0FBQztBQUNsQyxNQUFNLElBQUksR0FBRyxpQ0FBVSxLQUFLLENBQUMsQ0FBQzs7QUFFOUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN2QixNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUU3QixPQUFLLElBQU0sR0FBRyxJQUFJLElBQUksRUFBRTs4QkFDRCxHQUFHOztRQUFqQixLQUFLO1FBQUUsR0FBRzs7QUFDakIsUUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDOzs7QUFHdkIsU0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoQyxVQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyw4QkFBUSxPQUFPLEVBQUU7QUFDaEMsa0JBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsY0FBTTtPQUNQO0tBQ0Y7O0FBRUQsUUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNmLGVBQVM7S0FDVjs7O0FBR0QsU0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoQyxVQUFJLDBDQUFtQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNoQyxpQ0FBVSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7QUFDakUsa0JBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDM0IsTUFBTSxJQUNMLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyw4QkFBUSxPQUFPLElBQzVCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyw4QkFBUSxTQUFTLElBQzlCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyw4QkFBUSxjQUFjLEVBQ25DO0FBQ0EsWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUNiO0tBQ0Y7R0FDRjs7O0FBR0QsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsUUFBSSxxQ0FBYyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3hELFVBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDYjtHQUNGOzs7QUFHRCxTQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFLO0FBQzVCLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNmLFVBQUksSUFBSSxLQUFLLDhCQUFRLFNBQVMsRUFBRTtBQUM5QixlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLGNBQWMsRUFBRTtBQUMxQyxlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLE9BQU8sRUFBRTtBQUNuQyxlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLFNBQVMsRUFBRTtBQUNyQyxlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLFdBQVcsRUFBRTtBQUN2QyxlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLFVBQVUsRUFBRTtBQUN0QyxlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLGVBQWUsRUFBRTtBQUMzQyxlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLFVBQVUsRUFBRTtBQUN0QyxlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLFdBQVcsRUFBRTtBQUN2QyxlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLFVBQVUsRUFBRTtBQUN0QyxlQUFPLDhCQUFRLEtBQUssQ0FBQztPQUN0QjtLQUNGO0FBQ0QsV0FBTyxJQUFJLENBQUM7R0FDYixDQUFDLENBQUM7Q0FDSjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyIsImZpbGUiOiJyZXNvbHZlTm9CcmVha3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgYnVpbGRSdW5zIGZyb20gJy4uL3V0aWxzL2J1aWxkUnVucyc7XG5pbXBvcnQgYnVpbGRTY29wZXMgZnJvbSAnLi4vdXRpbHMvYnVpbGRTY29wZXMnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IGlzU2NvcGVCcmVha01hcmtlciBmcm9tICcuLi91dGlscy9pc1Njb3BlQnJlYWtNYXJrZXInO1xuaW1wb3J0IGlzU2NvcGVNYXJrZXIgZnJvbSAnLi4vdXRpbHMvaXNTY29wZU1hcmtlcic7XG5pbXBvcnQgbWFya2VycyBmcm9tICcuLi9jb25zdGFudHMvbWFya2Vycyc7XG5cbi8qKlxuICogVGhpcyBzcXVhc2hlcyBhbGwgbm8gYnJlYWsgbWFya2VycyBhbmQgYW55IG5lYXJieSBicmVha3MuXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVOb0JyZWFrcyhsaW5lczogQXJyYXk8YW55Pik6IEFycmF5PGFueT4ge1xuICBjb25zdCBzY29wZXMgPSBidWlsZFNjb3BlcyhsaW5lcyk7XG4gIGNvbnN0IHJ1bnMgPSBidWlsZFJ1bnMobGluZXMpO1xuXG4gIGNvbnN0IGtpbGwgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IGtpbGxTY29wZXMgPSBuZXcgU2V0KCk7XG5cbiAgZm9yIChjb25zdCBydW4gb2YgcnVucykge1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHJ1bjtcbiAgICBsZXQgaGFzTm9CcmVhayA9IGZhbHNlO1xuXG4gICAgLy8gQ2hlY2sgZm9yIHRoZSBub0JyZWFrLlxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICBpZiAobGluZXNbaV0gPT09IG1hcmtlcnMubm9CcmVhaykge1xuICAgICAgICBoYXNOb0JyZWFrID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFoYXNOb0JyZWFrKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBUaGVuIHRlc3Qgd2hhdCB3ZSBuZWVkIHRvIGtpbGwuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGlmIChpc1Njb3BlQnJlYWtNYXJrZXIobGluZXNbaV0pKSB7XG4gICAgICAgIGludmFyaWFudChzY29wZXNbaV0gIT0gbnVsbCwgJ1Njb3BlIG1hcmtlcnMgbXVzdCBoYXZlIGEgc2NvcGUuJyk7XG4gICAgICAgIGtpbGxTY29wZXMuYWRkKHNjb3Blc1tpXSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBsaW5lc1tpXSA9PT0gbWFya2Vycy5ub0JyZWFrIHx8XG4gICAgICAgIGxpbmVzW2ldID09PSBtYXJrZXJzLmhhcmRCcmVhayB8fFxuICAgICAgICBsaW5lc1tpXSA9PT0gbWFya2Vycy5tdWx0aUhhcmRCcmVha1xuICAgICAgKSB7XG4gICAgICAgIGtpbGwuYWRkKGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEtpbGwgdGhlIGFwcHJvcHJpYXRlIHNjb3BlIG1hcmtlcnMuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaXNTY29wZU1hcmtlcihsaW5lc1tpXSkgJiYga2lsbFNjb3Blcy5oYXMoc2NvcGVzW2ldKSkge1xuICAgICAga2lsbC5hZGQoaSk7XG4gICAgfVxuICB9XG5cbiAgLy8gTm93IGRvIHRoZSBraWxsaW5nLlxuICByZXR1cm4gbGluZXMubWFwKChsaW5lLCBpKSA9PiB7XG4gICAgaWYgKGtpbGwuaGFzKGkpKSB7XG4gICAgICBpZiAobGluZSA9PT0gbWFya2Vycy5oYXJkQnJlYWspIHtcbiAgICAgICAgcmV0dXJuIG1hcmtlcnMuZW1wdHk7XG4gICAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMubXVsdGlIYXJkQnJlYWspIHtcbiAgICAgICAgcmV0dXJuIG1hcmtlcnMuZW1wdHk7XG4gICAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMubm9CcmVhaykge1xuICAgICAgICByZXR1cm4gbWFya2Vycy5lbXB0eTtcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5vcGVuU2NvcGUpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtlcnMuZW1wdHk7XG4gICAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMuc2NvcGVJbmRlbnQpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtlcnMuZW1wdHk7XG4gICAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMuc2NvcGVCcmVhaykge1xuICAgICAgICByZXR1cm4gbWFya2Vycy5lbXB0eTtcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5zY29wZVNwYWNlQnJlYWspIHtcbiAgICAgICAgcmV0dXJuIG1hcmtlcnMuc3BhY2U7XG4gICAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMuc2NvcGVDb21tYSkge1xuICAgICAgICByZXR1cm4gbWFya2Vycy5lbXB0eTtcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5zY29wZURlZGVudCkge1xuICAgICAgICByZXR1cm4gbWFya2Vycy5lbXB0eTtcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5jbG9zZVNjb3BlKSB7XG4gICAgICAgIHJldHVybiBtYXJrZXJzLmVtcHR5O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGluZTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzb2x2ZU5vQnJlYWtzO1xuIl19