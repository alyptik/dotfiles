/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 */

/**
 * Figures out the row and column coordinates of a raw position within a source
 * string. This will undo the transform `getRawPosition` makes to position.
 */
function getPosition(source, rawPosition) {
  var row = 0;
  var column = 0;
  for (var i = 0; i < rawPosition && i < source.length; i++) {
    var char = source.charAt(i);
    if (char === '\n') {
      row++;
      column = 0;
    } else {
      column++;
    }
  }
  return { row: row, column: column };
}

module.exports = getPosition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91cGRhdGUtY3Vyc29yL2dldFBvc2l0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBY0EsU0FBUyxXQUFXLENBQ2xCLE1BQWMsRUFDZCxXQUFtQixFQUNZO0FBQy9CLE1BQUksR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNaLE1BQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNmLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekQsUUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixRQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7QUFDakIsU0FBRyxFQUFFLENBQUM7QUFDTixZQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQ1osTUFBTTtBQUNMLFlBQU0sRUFBRSxDQUFDO0tBQ1Y7R0FDRjtBQUNELFNBQU8sRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUMsQ0FBQztDQUN0Qjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyIsImZpbGUiOiJnZXRQb3NpdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbi8qKlxuICogRmlndXJlcyBvdXQgdGhlIHJvdyBhbmQgY29sdW1uIGNvb3JkaW5hdGVzIG9mIGEgcmF3IHBvc2l0aW9uIHdpdGhpbiBhIHNvdXJjZVxuICogc3RyaW5nLiBUaGlzIHdpbGwgdW5kbyB0aGUgdHJhbnNmb3JtIGBnZXRSYXdQb3NpdGlvbmAgbWFrZXMgdG8gcG9zaXRpb24uXG4gKi9cbmZ1bmN0aW9uIGdldFBvc2l0aW9uKFxuICBzb3VyY2U6IHN0cmluZyxcbiAgcmF3UG9zaXRpb246IG51bWJlcixcbik6IHtyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXJ9IHtcbiAgbGV0IHJvdyA9IDA7XG4gIGxldCBjb2x1bW4gPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJhd1Bvc2l0aW9uICYmIGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGFyID0gc291cmNlLmNoYXJBdChpKTtcbiAgICBpZiAoY2hhciA9PT0gJ1xcbicpIHtcbiAgICAgIHJvdysrO1xuICAgICAgY29sdW1uID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uKys7XG4gICAgfVxuICB9XG4gIHJldHVybiB7cm93LCBjb2x1bW59O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFBvc2l0aW9uO1xuIl19