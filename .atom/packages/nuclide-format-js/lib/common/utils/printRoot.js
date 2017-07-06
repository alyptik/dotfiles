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

var _NewLine = require('./NewLine');

var _NewLine2 = _interopRequireDefault(_NewLine);

function printRoot(root) {
  // Print the new source.
  var output = root.toSource({ quote: 'single', trailingComma: true });

  // Remove all new lines between require fences that are not explicitly added
  // by the NewLine module.
  var lines = output.split('\n');
  var first = lines.length - 1;
  var last = 0;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf(_NewLine2['default'].literal) !== -1) {
      first = Math.min(first, i);
      last = Math.max(last, i);
    }
  }

  // Filter out the empty lines that are between NewLine markers.
  output = lines.filter(function (line, index) {
    return line || index < first || index > last;
  }).join('\n');

  // Remove the NewLine markers.
  output = _NewLine2['default'].replace(output);

  // Remove new lines at the start.
  output = output.replace(/^\n{1,}/, '');

  // Make sure there is a new line at the end.
  if (!/^[\w\W]*\n$/.test(output)) {
    output += '\n';
  }

  return output;
}

module.exports = printRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvcHJpbnRSb290LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozt1QkFZb0IsV0FBVzs7OztBQUUvQixTQUFTLFNBQVMsQ0FBQyxJQUFnQixFQUFVOztBQUUzQyxNQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzs7OztBQUluRSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLE1BQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLE1BQUksSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNiLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JDLFFBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBUSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUM1QyxXQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDM0IsVUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzFCO0dBQ0Y7OztBQUdELFFBQU0sR0FBRyxLQUFLLENBQ1gsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7V0FBSyxJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLEdBQUcsSUFBSTtHQUFBLENBQUMsQ0FDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHZCxRQUFNLEdBQUcscUJBQVEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHakMsUUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7QUFHdkMsTUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDL0IsVUFBTSxJQUFJLElBQUksQ0FBQztHQUNoQjs7QUFFRCxTQUFPLE1BQU0sQ0FBQztDQUNmOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDIiwiZmlsZSI6InByaW50Um9vdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIHtDb2xsZWN0aW9ufSBmcm9tICcuLi90eXBlcy9hc3QnO1xuXG5pbXBvcnQgTmV3TGluZSBmcm9tICcuL05ld0xpbmUnO1xuXG5mdW5jdGlvbiBwcmludFJvb3Qocm9vdDogQ29sbGVjdGlvbik6IHN0cmluZyB7XG4gIC8vIFByaW50IHRoZSBuZXcgc291cmNlLlxuICBsZXQgb3V0cHV0ID0gcm9vdC50b1NvdXJjZSh7cXVvdGU6ICdzaW5nbGUnLCB0cmFpbGluZ0NvbW1hOiB0cnVlfSk7XG5cbiAgLy8gUmVtb3ZlIGFsbCBuZXcgbGluZXMgYmV0d2VlbiByZXF1aXJlIGZlbmNlcyB0aGF0IGFyZSBub3QgZXhwbGljaXRseSBhZGRlZFxuICAvLyBieSB0aGUgTmV3TGluZSBtb2R1bGUuXG4gIGNvbnN0IGxpbmVzID0gb3V0cHV0LnNwbGl0KCdcXG4nKTtcbiAgbGV0IGZpcnN0ID0gbGluZXMubGVuZ3RoIC0gMTtcbiAgbGV0IGxhc3QgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGxpbmVzW2ldLmluZGV4T2YoTmV3TGluZS5saXRlcmFsKSAhPT0gLTEpIHtcbiAgICAgIGZpcnN0ID0gTWF0aC5taW4oZmlyc3QsIGkpO1xuICAgICAgbGFzdCA9IE1hdGgubWF4KGxhc3QsIGkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbHRlciBvdXQgdGhlIGVtcHR5IGxpbmVzIHRoYXQgYXJlIGJldHdlZW4gTmV3TGluZSBtYXJrZXJzLlxuICBvdXRwdXQgPSBsaW5lc1xuICAgIC5maWx0ZXIoKGxpbmUsIGluZGV4KSA9PiBsaW5lIHx8IGluZGV4IDwgZmlyc3QgfHwgaW5kZXggPiBsYXN0KVxuICAgIC5qb2luKCdcXG4nKTtcblxuICAvLyBSZW1vdmUgdGhlIE5ld0xpbmUgbWFya2Vycy5cbiAgb3V0cHV0ID0gTmV3TGluZS5yZXBsYWNlKG91dHB1dCk7XG5cbiAgLy8gUmVtb3ZlIG5ldyBsaW5lcyBhdCB0aGUgc3RhcnQuXG4gIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9eXFxuezEsfS8sICcnKTtcblxuICAvLyBNYWtlIHN1cmUgdGhlcmUgaXMgYSBuZXcgbGluZSBhdCB0aGUgZW5kLlxuICBpZiAoIS9eW1xcd1xcV10qXFxuJC8udGVzdChvdXRwdXQpKSB7XG4gICAgb3V0cHV0ICs9ICdcXG4nO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcmludFJvb3Q7XG4iXX0=