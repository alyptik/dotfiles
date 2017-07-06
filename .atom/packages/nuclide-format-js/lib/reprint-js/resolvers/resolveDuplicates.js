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

var _constantsMarkers = require('../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

/**
 * This squashes all duplicates that should not be kept.
 */
function resolveDuplicates(lines) {
  var runs = (0, _utilsBuildRuns2['default'])(lines);
  var kill = new Set();

  for (var run of runs) {
    var _run = _slicedToArray(run, 2);

    var start = _run[0];
    var end = _run[1];

    var hardBreak = 0;
    var multiHardBreak = 0;

    // Count how many of each break we have.
    for (var i = start; i < end; i++) {
      if (lines[i] === _constantsMarkers2['default'].hardBreak) {
        hardBreak++;
      } else if (lines[i] === _constantsMarkers2['default'].multiHardBreak) {
        multiHardBreak++;
      }
    }

    var hardBreaksRemaining = hardBreak;

    // Then kill the appropriate duplicates in the run.
    for (var i = start; i < end; i++) {
      if (lines[i] === _constantsMarkers2['default'].hardBreak) {
        if (hardBreaksRemaining > 1 || multiHardBreak > 0) {
          hardBreaksRemaining--;
          kill.add(i);
        }
      } else if (lines[i] === _constantsMarkers2['default'].multiHardBreak) {
        // Never remove a multiHardBreak.
      }
    }
  }

  // We always kill to empty here.
  return lines.map(function (line, i) {
    return kill.has(i) ? _constantsMarkers2['default'].empty : line;
  });
}

module.exports = resolveDuplicates;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3Jlc29sdmVycy9yZXNvbHZlRHVwbGljYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs4QkFVc0Isb0JBQW9COzs7O2dDQUN0QixzQkFBc0I7Ozs7Ozs7QUFLMUMsU0FBUyxpQkFBaUIsQ0FBQyxLQUFpQixFQUFjO0FBQ3hELE1BQU0sSUFBSSxHQUFHLGlDQUFVLEtBQUssQ0FBQyxDQUFDO0FBQzlCLE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRXZCLE9BQUssSUFBTSxHQUFHLElBQUksSUFBSSxFQUFFOzhCQUNELEdBQUc7O1FBQWpCLEtBQUs7UUFBRSxHQUFHOztBQUVqQixRQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDbEIsUUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDOzs7QUFHdkIsU0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoQyxVQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyw4QkFBUSxTQUFTLEVBQUU7QUFDbEMsaUJBQVMsRUFBRSxDQUFDO09BQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyw4QkFBUSxjQUFjLEVBQUU7QUFDOUMsc0JBQWMsRUFBRSxDQUFDO09BQ2xCO0tBQ0Y7O0FBRUQsUUFBSSxtQkFBbUIsR0FBRyxTQUFTLENBQUM7OztBQUdwQyxTQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2hDLFVBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLDhCQUFRLFNBQVMsRUFBRTtBQUNsQyxZQUNFLG1CQUFtQixHQUFHLENBQUMsSUFDdkIsY0FBYyxHQUFHLENBQUMsRUFDbEI7QUFDQSw2QkFBbUIsRUFBRSxDQUFDO0FBQ3RCLGNBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDYjtPQUNGLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssOEJBQVEsY0FBYyxFQUFFOztPQUUvQztLQUNGO0dBQ0Y7OztBQUdELFNBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDO1dBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyw4QkFBUSxLQUFLLEdBQUcsSUFBSTtHQUFDLENBQUMsQ0FBQztDQUNyRTs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDIiwiZmlsZSI6InJlc29sdmVEdXBsaWNhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IGJ1aWxkUnVucyBmcm9tICcuLi91dGlscy9idWlsZFJ1bnMnO1xuaW1wb3J0IG1hcmtlcnMgZnJvbSAnLi4vY29uc3RhbnRzL21hcmtlcnMnO1xuXG4vKipcbiAqIFRoaXMgc3F1YXNoZXMgYWxsIGR1cGxpY2F0ZXMgdGhhdCBzaG91bGQgbm90IGJlIGtlcHQuXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVEdXBsaWNhdGVzKGxpbmVzOiBBcnJheTxhbnk+KTogQXJyYXk8YW55PiB7XG4gIGNvbnN0IHJ1bnMgPSBidWlsZFJ1bnMobGluZXMpO1xuICBjb25zdCBraWxsID0gbmV3IFNldCgpO1xuXG4gIGZvciAoY29uc3QgcnVuIG9mIHJ1bnMpIHtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSBydW47XG5cbiAgICBsZXQgaGFyZEJyZWFrID0gMDtcbiAgICBsZXQgbXVsdGlIYXJkQnJlYWsgPSAwO1xuXG4gICAgLy8gQ291bnQgaG93IG1hbnkgb2YgZWFjaCBicmVhayB3ZSBoYXZlLlxuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICBpZiAobGluZXNbaV0gPT09IG1hcmtlcnMuaGFyZEJyZWFrKSB7XG4gICAgICAgIGhhcmRCcmVhaysrO1xuICAgICAgfSBlbHNlIGlmIChsaW5lc1tpXSA9PT0gbWFya2Vycy5tdWx0aUhhcmRCcmVhaykge1xuICAgICAgICBtdWx0aUhhcmRCcmVhaysrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBoYXJkQnJlYWtzUmVtYWluaW5nID0gaGFyZEJyZWFrO1xuXG4gICAgLy8gVGhlbiBraWxsIHRoZSBhcHByb3ByaWF0ZSBkdXBsaWNhdGVzIGluIHRoZSBydW4uXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGlmIChsaW5lc1tpXSA9PT0gbWFya2Vycy5oYXJkQnJlYWspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGhhcmRCcmVha3NSZW1haW5pbmcgPiAxIHx8XG4gICAgICAgICAgbXVsdGlIYXJkQnJlYWsgPiAwXG4gICAgICAgICkge1xuICAgICAgICAgIGhhcmRCcmVha3NSZW1haW5pbmctLTtcbiAgICAgICAgICBraWxsLmFkZChpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsaW5lc1tpXSA9PT0gbWFya2Vycy5tdWx0aUhhcmRCcmVhaykge1xuICAgICAgICAvLyBOZXZlciByZW1vdmUgYSBtdWx0aUhhcmRCcmVhay5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBXZSBhbHdheXMga2lsbCB0byBlbXB0eSBoZXJlLlxuICByZXR1cm4gbGluZXMubWFwKChsaW5lLCBpKSA9PiAoa2lsbC5oYXMoaSkgPyBtYXJrZXJzLmVtcHR5IDogbGluZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc29sdmVEdXBsaWNhdGVzO1xuIl19