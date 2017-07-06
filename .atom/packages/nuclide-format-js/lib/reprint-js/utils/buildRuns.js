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

var _isMarker = require('./isMarker');

var _isMarker2 = _interopRequireDefault(_isMarker);

/**
 * This returns a list of all the contiguous runs of markers within this set
 * of lines. Runs are [inclusive, exclusive).
 */
function buildRuns(lines) {
  var runs = [];
  var start = null;
  for (var i = 0; i < lines.length; i++) {
    if (!(0, _isMarker2['default'])(lines[i])) {
      if (start != null) {
        runs.push([start, i]);
        start = null;
      }
    } else {
      if (start == null) {
        start = i;
      }
    }
  }
  if (start != null) {
    runs.push([start, lines.length]);
  }
  return runs;
}

module.exports = buildRuns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3V0aWxzL2J1aWxkUnVucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7d0JBVXFCLFlBQVk7Ozs7Ozs7O0FBTWpDLFNBQVMsU0FBUyxDQUFDLEtBQWlCLEVBQTJCO0FBQzdELE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQixNQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsUUFBSSxDQUFDLDJCQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3ZCLFVBQUksS0FBSyxJQUFJLElBQUksRUFBRTtBQUNqQixZQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsYUFBSyxHQUFHLElBQUksQ0FBQztPQUNkO0tBQ0YsTUFBTTtBQUNMLFVBQUksS0FBSyxJQUFJLElBQUksRUFBRTtBQUNqQixhQUFLLEdBQUcsQ0FBQyxDQUFDO09BQ1g7S0FDRjtHQUNGO0FBQ0QsTUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ2pCLFFBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7R0FDbEM7QUFDRCxTQUFPLElBQUksQ0FBQztDQUNiOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDIiwiZmlsZSI6ImJ1aWxkUnVucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCBpc01hcmtlciBmcm9tICcuL2lzTWFya2VyJztcblxuLyoqXG4gKiBUaGlzIHJldHVybnMgYSBsaXN0IG9mIGFsbCB0aGUgY29udGlndW91cyBydW5zIG9mIG1hcmtlcnMgd2l0aGluIHRoaXMgc2V0XG4gKiBvZiBsaW5lcy4gUnVucyBhcmUgW2luY2x1c2l2ZSwgZXhjbHVzaXZlKS5cbiAqL1xuZnVuY3Rpb24gYnVpbGRSdW5zKGxpbmVzOiBBcnJheTxhbnk+KTogQXJyYXk8W251bWJlciwgbnVtYmVyXT4ge1xuICBjb25zdCBydW5zID0gW107XG4gIGxldCBzdGFydCA9IG51bGw7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWlzTWFya2VyKGxpbmVzW2ldKSkge1xuICAgICAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcbiAgICAgICAgcnVucy5wdXNoKFtzdGFydCwgaV0pO1xuICAgICAgICBzdGFydCA9IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGFydCA9PSBudWxsKSB7XG4gICAgICAgIHN0YXJ0ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHN0YXJ0ICE9IG51bGwpIHtcbiAgICBydW5zLnB1c2goW3N0YXJ0LCBsaW5lcy5sZW5ndGhdKTtcbiAgfVxuICByZXR1cm4gcnVucztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsZFJ1bnM7XG4iXX0=