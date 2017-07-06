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

var _constantsMarkers = require('../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

/**
 * This resolves all markers. We are guaranteed to have a single remaining
 * string after this.
 */
function resolveAll(lines_, options) {
  var lines = lines_;
  // Resolve everything except for indents and cursor. Note that this expects
  // indentation to already have been taken into account when breaking, just not
  // resolved yet.
  lines = lines.map(function (line) {
    if (line === _constantsMarkers2['default'].hardBreak) {
      return '\n';
    } else if (line === _constantsMarkers2['default'].multiHardBreak) {
      return '\n';
    } else if (line === _constantsMarkers2['default'].noBreak) {
      return '';
    } else if (line === _constantsMarkers2['default'].openScope) {
      return '';
    } else if (line === _constantsMarkers2['default'].scopeIndent) {
      return '';
    } else if (line === _constantsMarkers2['default'].scopeBreak) {
      return '';
    } else if (line === _constantsMarkers2['default'].scopeSpaceBreak) {
      return ' ';
    } else if (line === _constantsMarkers2['default'].scopeComma) {
      return '';
    } else if (line === _constantsMarkers2['default'].scopeDedent) {
      return '';
    } else if (line === _constantsMarkers2['default'].closeScope) {
      return '';
    } else if (line === _constantsMarkers2['default'].comma) {
      return ',';
    } else if (line === _constantsMarkers2['default'].space) {
      return ' ';
    } else if (line === _constantsMarkers2['default'].empty) {
      return '';
    } else {
      return line;
    }
  }).filter(function (line) {
    return line !== '';
  });

  var indent = 0;
  var tabString = options.useSpaces ? ' '.repeat(options.tabWidth) : '\t';

  var result = [];
  for (var i = 0; i < lines.length; i++) {
    var end = result.length > 0 ? result[result.length - 1] : null;
    if (lines[i] === _constantsMarkers2['default'].indent) {
      indent++;
    } else if (lines[i] === _constantsMarkers2['default'].dedent) {
      indent--;
    } else if (end && /\n$/.test(end)) {
      result.push(tabString.repeat(indent) + lines[i]);
    } else {
      result.push(lines[i]);
    }
  }

  return {
    source: clean(result.join(''))
  };
}

/**
 * Consistent way to clean up the final source before returning. This removes
 * trailing whitespace and extra new lines.
 */
function clean(source_) {
  var source = source_;
  // Trim and add an extra new line
  source = source.trim() + '\n';

  // Remove any trailing whitespace on lines. I believe this is necessary due
  // to scopeSpaceBreaks or something. TODO: Make this not necessary...
  source = source.split('\n').map(function (line) {
    return line.replace(/\s*$/, '');
  }).join('\n');

  return source;
}

module.exports = resolveAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3Jlc29sdmVycy9yZXNvbHZlQWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztnQ0Fhb0Isc0JBQXNCOzs7Ozs7OztBQU0xQyxTQUFTLFVBQVUsQ0FBQyxNQUFrQixFQUFFLE9BQWdCLEVBQVU7QUFDaEUsTUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDOzs7O0FBSW5CLE9BQUssR0FBRyxLQUFLLENBQ1YsR0FBRyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ1gsUUFBSSxJQUFJLEtBQUssOEJBQVEsU0FBUyxFQUFFO0FBQzlCLGFBQU8sSUFBSSxDQUFDO0tBQ2IsTUFBTSxJQUFJLElBQUksS0FBSyw4QkFBUSxjQUFjLEVBQUU7QUFDMUMsYUFBTyxJQUFJLENBQUM7S0FDYixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLE9BQU8sRUFBRTtBQUNuQyxhQUFPLEVBQUUsQ0FBQztLQUNYLE1BQU0sSUFBSSxJQUFJLEtBQUssOEJBQVEsU0FBUyxFQUFFO0FBQ3JDLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTSxJQUFJLElBQUksS0FBSyw4QkFBUSxXQUFXLEVBQUU7QUFDdkMsYUFBTyxFQUFFLENBQUM7S0FDWCxNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLFVBQVUsRUFBRTtBQUN0QyxhQUFPLEVBQUUsQ0FBQztLQUNYLE1BQU0sSUFBSSxJQUFJLEtBQUssOEJBQVEsZUFBZSxFQUFFO0FBQzNDLGFBQU8sR0FBRyxDQUFDO0tBQ1osTUFBTSxJQUFJLElBQUksS0FBSyw4QkFBUSxVQUFVLEVBQUU7QUFDdEMsYUFBTyxFQUFFLENBQUM7S0FDWCxNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLFdBQVcsRUFBRTtBQUN2QyxhQUFPLEVBQUUsQ0FBQztLQUNYLE1BQU0sSUFBSSxJQUFJLEtBQUssOEJBQVEsVUFBVSxFQUFFO0FBQ3RDLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTSxJQUFJLElBQUksS0FBSyw4QkFBUSxLQUFLLEVBQUU7QUFDakMsYUFBTyxHQUFHLENBQUM7S0FDWixNQUFNLElBQUksSUFBSSxLQUFLLDhCQUFRLEtBQUssRUFBRTtBQUNqQyxhQUFPLEdBQUcsQ0FBQztLQUNaLE1BQU0sSUFBSSxJQUFJLEtBQUssOEJBQVEsS0FBSyxFQUFFO0FBQ2pDLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTTtBQUNMLGFBQU8sSUFBSSxDQUFDO0tBQ2I7R0FDRixDQUFDLENBQ0QsTUFBTSxDQUFDLFVBQUEsSUFBSTtXQUFJLElBQUksS0FBSyxFQUFFO0dBQUEsQ0FBQyxDQUFDOztBQUUvQixNQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQzs7QUFFMUUsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JDLFFBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNqRSxRQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyw4QkFBUSxNQUFNLEVBQUU7QUFDL0IsWUFBTSxFQUFFLENBQUM7S0FDVixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLDhCQUFRLE1BQU0sRUFBRTtBQUN0QyxZQUFNLEVBQUUsQ0FBQztLQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNqQyxZQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEQsTUFBTTtBQUNMLFlBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkI7R0FDRjs7QUFFRCxTQUFPO0FBQ0wsVUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQy9CLENBQUM7Q0FDSDs7Ozs7O0FBTUQsU0FBUyxLQUFLLENBQUMsT0FBZSxFQUFVO0FBQ3RDLE1BQUksTUFBTSxHQUFHLE9BQU8sQ0FBQzs7QUFFckIsUUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7Ozs7QUFJOUIsUUFBTSxHQUFHLE1BQU0sQ0FDWixLQUFLLENBQUMsSUFBSSxDQUFDLENBQ1gsR0FBRyxDQUFDLFVBQUEsSUFBSTtXQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVkLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMiLCJmaWxlIjoicmVzb2x2ZUFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIE9wdGlvbnMgZnJvbSAnLi4vb3B0aW9ucy9PcHRpb25zJztcbmltcG9ydCB0eXBlIHtPdXRwdXR9IGZyb20gJy4uL3R5cGVzL2NvbW1vbic7XG5cbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uL2NvbnN0YW50cy9tYXJrZXJzJztcblxuLyoqXG4gKiBUaGlzIHJlc29sdmVzIGFsbCBtYXJrZXJzLiBXZSBhcmUgZ3VhcmFudGVlZCB0byBoYXZlIGEgc2luZ2xlIHJlbWFpbmluZ1xuICogc3RyaW5nIGFmdGVyIHRoaXMuXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVBbGwobGluZXNfOiBBcnJheTxhbnk+LCBvcHRpb25zOiBPcHRpb25zKTogT3V0cHV0IHtcbiAgbGV0IGxpbmVzID0gbGluZXNfO1xuICAvLyBSZXNvbHZlIGV2ZXJ5dGhpbmcgZXhjZXB0IGZvciBpbmRlbnRzIGFuZCBjdXJzb3IuIE5vdGUgdGhhdCB0aGlzIGV4cGVjdHNcbiAgLy8gaW5kZW50YXRpb24gdG8gYWxyZWFkeSBoYXZlIGJlZW4gdGFrZW4gaW50byBhY2NvdW50IHdoZW4gYnJlYWtpbmcsIGp1c3Qgbm90XG4gIC8vIHJlc29sdmVkIHlldC5cbiAgbGluZXMgPSBsaW5lc1xuICAgIC5tYXAobGluZSA9PiB7XG4gICAgICBpZiAobGluZSA9PT0gbWFya2Vycy5oYXJkQnJlYWspIHtcbiAgICAgICAgcmV0dXJuICdcXG4nO1xuICAgICAgfSBlbHNlIGlmIChsaW5lID09PSBtYXJrZXJzLm11bHRpSGFyZEJyZWFrKSB7XG4gICAgICAgIHJldHVybiAnXFxuJztcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5ub0JyZWFrKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5vcGVuU2NvcGUpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIGlmIChsaW5lID09PSBtYXJrZXJzLnNjb3BlSW5kZW50KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5zY29wZUJyZWFrKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5zY29wZVNwYWNlQnJlYWspIHtcbiAgICAgICAgcmV0dXJuICcgJztcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5zY29wZUNvbW1hKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5zY29wZURlZGVudCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMuY2xvc2VTY29wZSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9IGVsc2UgaWYgKGxpbmUgPT09IG1hcmtlcnMuY29tbWEpIHtcbiAgICAgICAgcmV0dXJuICcsJztcbiAgICAgIH0gZWxzZSBpZiAobGluZSA9PT0gbWFya2Vycy5zcGFjZSkge1xuICAgICAgICByZXR1cm4gJyAnO1xuICAgICAgfSBlbHNlIGlmIChsaW5lID09PSBtYXJrZXJzLmVtcHR5KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsaW5lO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmZpbHRlcihsaW5lID0+IGxpbmUgIT09ICcnKTtcblxuICBsZXQgaW5kZW50ID0gMDtcbiAgY29uc3QgdGFiU3RyaW5nID0gb3B0aW9ucy51c2VTcGFjZXMgPyAnICcucmVwZWF0KG9wdGlvbnMudGFiV2lkdGgpIDogJ1xcdCc7XG5cbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbmQgPSByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gOiBudWxsO1xuICAgIGlmIChsaW5lc1tpXSA9PT0gbWFya2Vycy5pbmRlbnQpIHtcbiAgICAgIGluZGVudCsrO1xuICAgIH0gZWxzZSBpZiAobGluZXNbaV0gPT09IG1hcmtlcnMuZGVkZW50KSB7XG4gICAgICBpbmRlbnQtLTtcbiAgICB9IGVsc2UgaWYgKGVuZCAmJiAvXFxuJC8udGVzdChlbmQpKSB7XG4gICAgICByZXN1bHQucHVzaCh0YWJTdHJpbmcucmVwZWF0KGluZGVudCkgKyBsaW5lc1tpXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wdXNoKGxpbmVzW2ldKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNvdXJjZTogY2xlYW4ocmVzdWx0LmpvaW4oJycpKSxcbiAgfTtcbn1cblxuLyoqXG4gKiBDb25zaXN0ZW50IHdheSB0byBjbGVhbiB1cCB0aGUgZmluYWwgc291cmNlIGJlZm9yZSByZXR1cm5pbmcuIFRoaXMgcmVtb3Zlc1xuICogdHJhaWxpbmcgd2hpdGVzcGFjZSBhbmQgZXh0cmEgbmV3IGxpbmVzLlxuICovXG5mdW5jdGlvbiBjbGVhbihzb3VyY2VfOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsZXQgc291cmNlID0gc291cmNlXztcbiAgLy8gVHJpbSBhbmQgYWRkIGFuIGV4dHJhIG5ldyBsaW5lXG4gIHNvdXJjZSA9IHNvdXJjZS50cmltKCkgKyAnXFxuJztcblxuICAvLyBSZW1vdmUgYW55IHRyYWlsaW5nIHdoaXRlc3BhY2Ugb24gbGluZXMuIEkgYmVsaWV2ZSB0aGlzIGlzIG5lY2Vzc2FyeSBkdWVcbiAgLy8gdG8gc2NvcGVTcGFjZUJyZWFrcyBvciBzb21ldGhpbmcuIFRPRE86IE1ha2UgdGhpcyBub3QgbmVjZXNzYXJ5Li4uXG4gIHNvdXJjZSA9IHNvdXJjZVxuICAgIC5zcGxpdCgnXFxuJylcbiAgICAubWFwKGxpbmUgPT4gbGluZS5yZXBsYWNlKC9cXHMqJC8sICcnKSlcbiAgICAuam9pbignXFxuJyk7XG5cbiAgcmV0dXJuIHNvdXJjZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXNvbHZlQWxsO1xuIl19