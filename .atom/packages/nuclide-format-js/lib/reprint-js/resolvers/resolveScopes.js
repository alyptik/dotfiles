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

var _utilsBuildScopes = require('../utils/buildScopes');

var _utilsBuildScopes2 = _interopRequireDefault(_utilsBuildScopes);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _utilsIsMarker = require('../utils/isMarker');

var _utilsIsMarker2 = _interopRequireDefault(_utilsIsMarker);

var _utilsIsScopeMarker = require('../utils/isScopeMarker');

var _utilsIsScopeMarker2 = _interopRequireDefault(_utilsIsScopeMarker);

var _constantsMarkers = require('../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

var _utilsTranslateScopeMarker = require('../utils/translateScopeMarker');

var _utilsTranslateScopeMarker2 = _interopRequireDefault(_utilsTranslateScopeMarker);

var MIN_RELEVANT_SCOPE_VALUE = 10;

function resolveScopes(lines_, options) {
  var lines = lines_;
  for (var i = 0; i < 5; i++) {
    lines = resolveScopesOnce(lines, options);
  }
  return lines;
}

/**
 * This breaks all scopes as necessary. There should be no remaining scopes
 * after this method.
 */
function resolveScopesOnce(lines_, options) {
  var lines = lines_;
  var indent = 0;
  // Screw you if you pick something less than 40...
  var getSpace = function getSpace() {
    return Math.max(options.maxLineLength - indent * options.tabWidth, 40);
  };

  var scopes = (0, _utilsBuildScopes2['default'])(lines);

  // Compute a value for each scope. Higher values mean it contains more things.
  var scopeValue = new Map();
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (scopes[i] != null) {
      if (!scopeValue.has(scopes[i])) {
        scopeValue.set(scopes[i], 0);
      }
      var value = (0, _utilsIsMarker2['default'])(line) || /^\s*$/.test(line) ? 0 : 1;
      scopeValue.set(scopes[i], scopeValue.get(scopes[i]) + value);
    }
  }

  // Compute the depth of each scope. Generally we prefer to break the lowest
  // depth scope.
  var depth = 0;
  var scopeDepth = new Map();
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line === _constantsMarkers2['default'].openScope) {
      depth++;
    }
    if (!scopeDepth.has(scopes[i])) {
      scopeDepth.set(scopes[i], depth);
    }
    var thisScopeDepth = scopeDepth.get(scopes[i]);
    if (thisScopeDepth) {
      scopeDepth.set(scopes[i], Math.min(thisScopeDepth, depth));
    }
    if (line === _constantsMarkers2['default'].closeScope) {
      depth--;
    }
  }

  var breakScopes = new Set();

  // Figure out what we want to break.

  var start = null;
  var space = null;
  var scopeToBreak = null;
  var len = 0;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    if (line === _constantsMarkers2['default'].indent) {
      indent++;
    } else if (line === _constantsMarkers2['default'].dedent) {
      indent--;
    }

    if (start == null) {
      start = i;
      // Compute the space at the start so any indents that don't cause a
      // reset will not mess things up.
      space = getSpace();
    }

    // We want to trim the last line when checking the length in case it
    // causes the break.
    var trimmedLength = len + trimRightLength(line);
    (0, _assert2['default'])(space, 'Space must be defined');
    if (trimmedLength > space && start != null && scopeToBreak == null) {
      var bestScope = null;
      for (var j = i; j >= start; j--) {
        if (scopes[j] != null) {
          // There isn't a best yet. Always use the current scope.
          if (bestScope == null) {
            bestScope = scopes[j];
            continue;
          }

          var bestScopeValue = scopeValue.get(bestScope);
          var thisScopeValue = scopeValue.get(scopes[j]);
          var bestScopeDepth = scopeDepth.get(bestScope);
          var thisScopeDepth = scopeDepth.get(scopes[j]);

          if (bestScopeValue != null && thisScopeValue != null && thisScopeValue > MIN_RELEVANT_SCOPE_VALUE && (bestScopeValue <= MIN_RELEVANT_SCOPE_VALUE || bestScopeDepth != null && thisScopeDepth != null && (thisScopeDepth < bestScopeDepth || thisScopeDepth === bestScopeDepth || thisScopeValue > bestScopeValue))) {
            bestScope = scopes[j];
          }
        }
      }
      if (bestScope != null) {
        scopeToBreak = bestScope;
      }
    }

    // But we increment the length without the trimming since the next time
    // we view the length any trailing whitespace will have been important.
    len += getLength(line);
    if (shouldReset(line)) {
      len = 0;
      start = null;
      space = null;
      if (scopeToBreak != null) {
        breakScopes.add(scopeToBreak);
        scopeToBreak = null;
      }
    }
  }

  // Break relevant lines.
  lines = lines.map(function (line, i) {
    if ((0, _utilsIsScopeMarker2['default'])(line) && breakScopes.has(scopes[i])) {
      return (0, _utilsTranslateScopeMarker2['default'])(line, true);
    }
    return line;
  });

  return lines;
}

function shouldReset(line) {
  var endsInNewLine = line && /\n$/.test(line);
  return endsInNewLine || line === _constantsMarkers2['default'].hardBreak || line === _constantsMarkers2['default'].multiHardBreak;
}

function trimRightLength(line) {
  if ((0, _utilsIsMarker2['default'])(line)) {
    // Only a comma marker retains any length when trimmed from the right.
    if (line === _constantsMarkers2['default'].comma) {
      return 1;
    } else {
      return 0;
    }
  } else if (line != null) {
    return line.replace(/\s*$/, '').length;
  } else {
    return 0;
  }
}

function getLength(line) {
  if ((0, _utilsIsMarker2['default'])(line)) {
    if (line === _constantsMarkers2['default'].scopeSpaceBreak) {
      return 1;
    } else if (line === _constantsMarkers2['default'].comma) {
      return 1;
    } else if (line === _constantsMarkers2['default'].space) {
      return 1;
    } else {
      return 0;
    }
  } else if (line != null) {
    return line.length;
  } else {
    return 0;
  }
}

module.exports = resolveScopes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3Jlc29sdmVycy9yZXNvbHZlU2NvcGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztnQ0FZd0Isc0JBQXNCOzs7O3NCQUN4QixRQUFROzs7OzZCQUNULG1CQUFtQjs7OztrQ0FDZCx3QkFBd0I7Ozs7Z0NBQzlCLHNCQUFzQjs7Ozt5Q0FDVCwrQkFBK0I7Ozs7QUFFaEUsSUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7O0FBRXBDLFNBQVMsYUFBYSxDQUFDLE1BQWtCLEVBQUUsT0FBZ0IsRUFBYztBQUN2RSxNQUFJLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDbkIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMxQixTQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0dBQzNDO0FBQ0QsU0FBTyxLQUFLLENBQUM7Q0FDZDs7Ozs7O0FBTUQsU0FBUyxpQkFBaUIsQ0FBQyxNQUFrQixFQUFFLE9BQWdCLEVBQWM7QUFDM0UsTUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQ25CLE1BQUksTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFZixNQUFNLFFBQVEsR0FBRyxTQUFYLFFBQVE7V0FBUyxJQUFJLENBQUMsR0FBRyxDQUM3QixPQUFPLENBQUMsYUFBYSxHQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxBQUFDLEVBQ25ELEVBQUUsQ0FDSDtHQUFBLENBQUM7O0FBRUYsTUFBTSxNQUFNLEdBQUcsbUNBQVksS0FBSyxDQUFDLENBQUM7OztBQUdsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzdCLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JDLFFBQU0sSUFBSSxH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LE1BQU07QUFDTCxXQUFPLENBQUMsQ0FBQztHQUNWO0NBQ0Y7O0FBRUQsU0FBUyxTQUFTLENBQUMsSUFBWSxFQUFVO0FBQ3ZDLE1BQUksZ0NBQVMsSUFBSSxDQUFDLEVBQUU7QUFDbEIsUUFBSSxJQUFJLEtBQUssOEJBQVEsZUFBZSxFQUFFO0FBQ3BDLGFBQU8sQ0FBQyxDQUFDO0tBQ1YsTUFBTSxJQUFJLElBQUksS0FBSyw4QkFBUSxLQUFLLEVBQUU7QUFDakMsYUFBTyxDQUFDLENBQUM7S0FDVixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLEtBQUssRUFBRTtBQUNqQyxhQUFPLENBQUMsQ0FBQztLQUNWLE1BQU07QUFDTCxhQUFPLENBQUMsQ0FBQztLQUNWO0dBQ0YsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDdkIsV0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0dBQ3BCLE1BQU07QUFDTCxXQUFPLENBQUMsQ0FBQztHQUNWO0NBQ0Y7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMiLCJmaWxlIjoicmVzb2x2ZVNjb3Blcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIE9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucy9PcHRpb25zJztcblxuaW1wb3J0IGJ1aWxkU2NvcGVzIGZyb20gJy4uL3V0aWxzL2J1aWxkU2NvcGVzJztcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBpc01hcmtlciBmcm9tICcuLi91dGlscy9pc01hcmtlcic7XG5pbXBvcnQgaXNTY29wZU1hcmtlciBmcm9tICcuLi91dGlscy9pc1Njb3BlTWFya2VyJztcbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uL2NvbnN0YW50cy9tYXJrZXJzJztcbmltcG9ydCB0cmFuc2xhdGVTY29wZU1hcmtlciBmcm9tICcuLi91dGlscy90cmFuc2xhdGVTY29wZU1hcmtlcic7XG5cbmNvbnN0IE1JTl9SRUxFVkFOVF9TQ09QRV9WQUxVRSA9IDEwO1xuXG5mdW5jdGlvbiByZXNvbHZlU2NvcGVzKGxpbmVzXzogQXJyYXk8YW55Piwgb3B0aW9uczogT3B0aW9ucyk6IEFycmF5PGFueT4ge1xuICBsZXQgbGluZXMgPSBsaW5lc187XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgbGluZXMgPSByZXNvbHZlU2NvcGVzT25jZShsaW5lcywgb3B0aW9ucyk7XG4gIH1cbiAgcmV0dXJuIGxpbmVzO1xufVxuXG4vKipcbiAqIFRoaXMgYnJlYWtzIGFsbCBzY29wZXMgYXMgbmVjZXNzYXJ5LiBUaGVyZSBzaG91bGQgYmUgbm8gcmVtYWluaW5nIHNjb3Blc1xuICogYWZ0ZXIgdGhpcyBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVTY29wZXNPbmNlKGxpbmVzXzogQXJyYXk8YW55Piwgb3B0aW9uczogT3B0aW9ucyk6IEFycmF5PGFueT4ge1xuICBsZXQgbGluZXMgPSBsaW5lc187XG4gIGxldCBpbmRlbnQgPSAwO1xuICAvLyBTY3JldyB5b3UgaWYgeW91IHBpY2sgc29tZXRoaW5nIGxlc3MgdGhhbiA0MC4uLlxuICBjb25zdCBnZXRTcGFjZSA9ICgpID0+IE1hdGgubWF4KFxuICAgIG9wdGlvbnMubWF4TGluZUxlbmd0aCAtIChpbmRlbnQgKiBvcHRpb25zLnRhYldpZHRoKSxcbiAgICA0MCxcbiAgKTtcblxuICBjb25zdCBzY29wZXMgPSBidWlsZFNjb3BlcyhsaW5lcyk7XG5cbiAgLy8gQ29tcHV0ZSBhIHZhbHVlIGZvciBlYWNoIHNjb3BlLiBIaWdoZXIgdmFsdWVzIG1lYW4gaXQgY29udGFpbnMgbW9yZSB0aGluZ3MuXG4gIGNvbnN0IHNjb3BlVmFsdWUgPSBuZXcgTWFwKCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsaW5lID0gbGluZXNbaV07XG4gICAgaWYgKHNjb3Blc1tpXSAhPSBudWxsKSB7XG4gICAgICBpZiAoIXNjb3BlVmFsdWUuaGFzKHNjb3Blc1tpXSkpIHtcbiAgICAgICAgc2NvcGVWYWx1ZS5zZXQoc2NvcGVzW2ldLCAwKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbHVlID0gKGlzTWFya2VyKGxpbmUpIHx8IC9eXFxzKiQvLnRlc3QobGluZSkpID8gMCA6IDE7XG4gICAgICBzY29wZVZhbHVlLnNldChzY29wZXNbaV0sIHNjb3BlVmFsdWUuZ2V0KHNjb3Blc1tpXSkgKyB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29tcHV0ZSB0aGUgZGVwdGggb2YgZWFjaCBzY29wZS4gR2VuZXJhbGx5IHdlIHByZWZlciB0byBicmVhayB0aGUgbG93ZXN0XG4gIC8vIGRlcHRoIHNjb3BlLlxuICBsZXQgZGVwdGggPSAwO1xuICBjb25zdCBzY29wZURlcHRoID0gbmV3IE1hcCgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbGluZSA9IGxpbmVzW2ldO1xuICAgIGlmIChsaW5lID09PSBtYXJrZXJzLm9wZW5TY29wZSkge1xuICAgICAgZGVwdGgrKztcbiAgICB9XG4gICAgaWYgKCFzY29wZURlcHRoLmhhcyhzY29wZXNbaV0pKSB7XG4gICAgICBzY29wZURlcHRoLnNldChzY29wZXNbaV0sIGRlcHRoKTtcbiAgICB9XG4gICAgY29uc3QgdGhpc1Njb3BlRGVwdGggPSBzY29wZURlcHRoLmdldChzY29wZXNbaV0pO1xuICAgIGlmICh0aGlzU2NvcGVEZXB0aCkge1xuICAgICAgc2NvcGVEZXB0aC5zZXQoc2NvcGVzW2ldLCBNYXRoLm1pbih0aGlzU2NvcGVEZXB0aCwgZGVwdGgpKTtcbiAgICB9XG4gICAgaWYgKGxpbmUgPT09IG1hcmtlcnMuY2xvc2VTY29wZSkge1xuICAgICAgZGVwdGgtLTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBicmVha1Njb3BlcyA9IG5ldyBTZXQoKTtcblxuICAvLyBGaWd1cmUgb3V0IHdoYXQgd2Ugd2FudCB0byBicmVhay5cblxuICBsZXQgc3RhcnQgPSBudWxsO1xuICBsZXQgc3BhY2UgPSBudWxsO1xuICBsZXQgc2NvcGVUb0JyZWFrID0gbnVsbDtcbiAgbGV0IGxlbiA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsaW5lID0gbGluZXNbaV07XG5cbiAgICBpZiAobGluZSA9PT0gbWFya2Vycy5pbmRlbnQpIHtcbiAgICAgIGluZGVudCsrO1xuICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5kZWRlbnQpIHtcbiAgICAgIGluZGVudC0tO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA9PSBudWxsKSB7XG4gICAgICBzdGFydCA9IGk7XG4gICAgICAvLyBDb21wdXRlIHRoZSBzcGFjZSBhdCB0aGUgc3RhcnQgc28gYW55IGluZGVudHMgdGhhdCBkb24ndCBjYXVzZSBhXG4gICAgICAvLyByZXNldCB3aWxsIG5vdCBtZXNzIHRoaW5ncyB1cC5cbiAgICAgIHNwYWNlID0gZ2V0U3BhY2UoKTtcbiAgICB9XG5cbiAgICAvLyBXZSB3YW50IHRvIHRyaW0gdGhlIGxhc3QgbGluZSB3aGVuIGNoZWNraW5nIHRoZSBsZW5ndGggaW4gY2FzZSBpdFxuICAgIC8vIGNhdXNlcyB0aGUgYnJlYWsuXG4gICAgY29uc3QgdHJpbW1lZExlbmd0aCA9IGxlbiArIHRyaW1SaWdodExlbmd0aChsaW5lKTtcbiAgICBpbnZhcmlhbnQoc3BhY2UsICdTcGFjZSBtdXN0IGJlIGRlZmluZWQnKTtcbiAgICBpZiAodHJpbW1lZExlbmd0aCA+IHNwYWNlICYmIHN0YXJ0ICE9IG51bGwgJiYgc2NvcGVUb0JyZWFrID09IG51bGwpIHtcbiAgICAgIGxldCBiZXN0U2NvcGUgPSBudWxsO1xuICAgICAgZm9yIChsZXQgaiA9IGk7IGogPj0gc3RhcnQ7IGotLSkge1xuICAgICAgICBpZiAoc2NvcGVzW2pdICE9IG51bGwpIHtcbiAgICAgICAgICAvLyBUaGVyZSBpc24ndCBhIGJlc3QgeWV0LiBBbHdheXMgdXNlIHRoZSBjdXJyZW50IHNjb3BlLlxuICAgICAgICAgIGlmIChiZXN0U2NvcGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgYmVzdFNjb3BlID0gc2NvcGVzW2pdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgYmVzdFNjb3BlVmFsdWUgPSBzY29wZVZhbHVlLmdldChiZXN0U2NvcGUpO1xuICAgICAgICAgIGNvbnN0IHRoaXNTY29wZVZhbHVlID0gc2NvcGVWYWx1ZS5nZXQoc2NvcGVzW2pdKTtcbiAgICAgICAgICBjb25zdCBiZXN0U2NvcGVEZXB0aCA9IHNjb3BlRGVwdGguZ2V0KGJlc3RTY29wZSk7XG4gICAgICAgICAgY29uc3QgdGhpc1Njb3BlRGVwdGggPSBzY29wZURlcHRoLmdldChzY29wZXNbal0pO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYmVzdFNjb3BlVmFsdWUgIT0gbnVsbCAmJlxuICAgICAgICAgICAgdGhpc1Njb3BlVmFsdWUgIT0gbnVsbCAmJlxuICAgICAgICAgICAgdGhpc1Njb3BlVmFsdWUgPiBNSU5fUkVMRVZBTlRfU0NPUEVfVkFMVUUgJiYgKFxuICAgICAgICAgICAgICBiZXN0U2NvcGVWYWx1ZSA8PSBNSU5fUkVMRVZBTlRfU0NPUEVfVkFMVUUgfHwgKFxuICAgICAgICAgICAgICAgIGJlc3RTY29wZURlcHRoICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICB0aGlzU2NvcGVEZXB0aCAhPSBudWxsICYmIChcbiAgICAgICAgICAgICAgICAgIHRoaXNTY29wZURlcHRoIDwgYmVzdFNjb3BlRGVwdGggfHwgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzU2NvcGVEZXB0aCA9PT0gYmVzdFNjb3BlRGVwdGggfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpc1Njb3BlVmFsdWUgPiBiZXN0U2NvcGVWYWx1ZVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgYmVzdFNjb3BlID0gc2NvcGVzW2pdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGJlc3RTY29wZSAhPSBudWxsKSB7XG4gICAgICAgIHNjb3BlVG9CcmVhayA9IGJlc3RTY29wZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCdXQgd2UgaW5jcmVtZW50IHRoZSBsZW5ndGggd2l0aG91dCB0aGUgdHJpbW1pbmcgc2luY2UgdGhlIG5leHQgdGltZVxuICAgIC8vIHdlIHZpZXcgdGhlIGxlbmd0aCBhbnkgdHJhaWxpbmcgd2hpdGVzcGFjZSB3aWxsIGhhdmUgYmVlbiBpbXBvcnRhbnQuXG4gICAgbGVuICs9IGdldExlbmd0aChsaW5lKTtcbiAgICBpZiAoc2hvdWxkUmVzZXQobGluZSkpIHtcbiAgICAgIGxlbiA9IDA7XG4gICAgICBzdGFydCA9IG51bGw7XG4gICAgICBzcGFjZSA9IG51bGw7XG4gICAgICBpZiAoc2NvcGVUb0JyZWFrICE9IG51bGwpIHtcbiAgICAgICAgYnJlYWtTY29wZXMuYWRkKHNjb3BlVG9CcmVhayk7XG4gICAgICAgIHNjb3BlVG9CcmVhayA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQnJlYWsgcmVsZXZhbnQgbGluZXMuXG4gIGxpbmVzID0gbGluZXMubWFwKChsaW5lLCBpKSA9PiB7XG4gICAgaWYgKGlzU2NvcGVNYXJrZXIobGluZSkgJiYgYnJlYWtTY29wZXMuaGFzKHNjb3Blc1tpXSkpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGVTY29wZU1hcmtlcihsaW5lLCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmU7XG4gIH0pO1xuXG4gIHJldHVybiBsaW5lcztcbn1cblxuZnVuY3Rpb24gc2hvdWxkUmVzZXQobGluZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGVuZHNJbk5ld0xpbmUgPSBsaW5lICYmIC9cXG4kLy50ZXN0KGxpbmUpO1xuICByZXR1cm4gKFxuICAgIGVuZHNJbk5ld0xpbmUgfHxcbiAgICBsaW5lID09PSBtYXJrZXJzLmhhcmRCcmVhayB8fFxuICAgIGxpbmUgPT09IG1hcmtlcnMubXVsdGlIYXJkQnJlYWtcbiAgKTtcbn1cblxuZnVuY3Rpb24gdHJpbVJpZ2h0TGVuZ3RoKGxpbmU6IHN0cmluZyk6IG51bWJlciB7XG4gIGlmIChpc01hcmtlcihsaW5lKSkge1xuICAgIC8vIE9ubHkgYSBjb21tYSBtYXJrZXIgcmV0YWlucyBhbnkgbGVuZ3RoIHdoZW4gdHJpbW1lZCBmcm9tIHRoZSByaWdodC5cbiAgICBpZiAobGluZSA9PT0gbWFya2Vycy5jb21tYSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfSBlbHNlIGlmIChsaW5lICE9IG51bGwpIHtcbiAgICByZXR1cm4gbGluZS5yZXBsYWNlKC9cXHMqJC8sICcnKS5sZW5ndGg7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TGVuZ3RoKGxpbmU6IHN0cmluZyk6IG51bWJlciB7XG4gIGlmIChpc01hcmtlcihsaW5lKSkge1xuICAgIGlmIChsaW5lID09PSBtYXJrZXJzLnNjb3BlU3BhY2VCcmVhaykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChsaW5lID09PSBtYXJrZXJzLmNvbW1hKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMuc3BhY2UpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH0gZWxzZSBpZiAobGluZSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGxpbmUubGVuZ3RoO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAwO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzb2x2ZVNjb3BlcztcbiJdfQ==