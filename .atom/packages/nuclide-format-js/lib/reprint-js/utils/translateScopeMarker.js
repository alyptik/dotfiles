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
 * This translates a scope marker into the appropriate marker based on if the
 * scope was broken or not.
 */
function translateScopeMarker(marker, broken) {
  if (broken) {
    if (marker === _constantsMarkers2['default'].openScope) {
      return _constantsMarkers2['default'].empty;
    } else if (marker === _constantsMarkers2['default'].scopeIndent) {
      return _constantsMarkers2['default'].indent;
    } else if (marker === _constantsMarkers2['default'].scopeBreak) {
      return _constantsMarkers2['default'].hardBreak;
    } else if (marker === _constantsMarkers2['default'].scopeSpaceBreak) {
      return _constantsMarkers2['default'].hardBreak;
    } else if (marker === _constantsMarkers2['default'].scopeComma) {
      return _constantsMarkers2['default'].comma;
    } else if (marker === _constantsMarkers2['default'].scopeDedent) {
      return _constantsMarkers2['default'].dedent;
    } else if (marker === _constantsMarkers2['default'].closeScope) {
      return _constantsMarkers2['default'].empty;
    }
  } else {
    if (marker === _constantsMarkers2['default'].openScope) {
      return _constantsMarkers2['default'].empty;
    } else if (marker === _constantsMarkers2['default'].scopeIndent) {
      return _constantsMarkers2['default'].empty;
    } else if (marker === _constantsMarkers2['default'].scopeBreak) {
      return _constantsMarkers2['default'].empty;
    } else if (marker === _constantsMarkers2['default'].scopeSpaceBreak) {
      return _constantsMarkers2['default'].space;
    } else if (marker === _constantsMarkers2['default'].scopeComma) {
      return _constantsMarkers2['default'].empty;
    } else if (marker === _constantsMarkers2['default'].scopeDedent) {
      return _constantsMarkers2['default'].empty;
    } else if (marker === _constantsMarkers2['default'].closeScope) {
      return _constantsMarkers2['default'].empty;
    }
  }

  // Fallback to itself.
  return marker;
}

module.exports = translateScopeMarker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3V0aWxzL3RyYW5zbGF0ZVNjb3BlTWFya2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztnQ0FVb0Isc0JBQXNCOzs7Ozs7OztBQU0xQyxTQUFTLG9CQUFvQixDQUFDLE1BQWMsRUFBRSxNQUFlLEVBQVU7QUFDckUsTUFBSSxNQUFNLEVBQUU7QUFDVixRQUFJLE1BQU0sS0FBSyw4QkFBUSxTQUFTLEVBQUU7QUFDaEMsYUFBTyw4QkFBUSxLQUFLLENBQUM7S0FDdEIsTUFBTSxJQUFJLE1BQU0sS0FBSyw4QkFBUSxXQUFXLEVBQUU7QUFDekMsYUFBTyw4QkFBUSxNQUFNLENBQUM7S0FDdkIsTUFBTSxJQUFJLE1BQU0sS0FBSyw4QkFBUSxVQUFVLEVBQUU7QUFDeEMsYUFBTyw4QkFBUSxTQUFTLENBQUM7S0FDMUIsTUFBTSxJQUFJLE1BQU0sS0FBSyw4QkFBUSxlQUFlLEVBQUU7QUFDN0MsYUFBTyw4QkFBUSxTQUFTLENBQUM7S0FDMUIsTUFBTSxJQUFJLE1BQU0sS0FBSyw4QkFBUSxVQUFVLEVBQUU7QUFDeEMsYUFBTyw4QkFBUSxLQUFLLENBQUM7S0FDdEIsTUFBTSxJQUFJLE1BQU0sS0FBSyw4QkFBUSxXQUFXLEVBQUU7QUFDekMsYUFBTyw4QkFBUSxNQUFNLENBQUM7S0FDdkIsTUFBTSxJQUFJLE1BQU0sS0FBSyw4QkFBUSxVQUFVLEVBQUU7QUFDeEMsYUFBTyw4QkFBUSxLQUFLLENBQUM7S0FDdEI7R0FDRixNQUFNO0FBQ0wsUUFBSSxNQUFNLEtBQUssOEJBQVEsU0FBUyxFQUFFO0FBQ2hDLGFBQU8sOEJBQVEsS0FBSyxDQUFDO0tBQ3RCLE1BQU0sSUFBSSxNQUFNLEtBQUssOEJBQVEsV0FBVyxFQUFFO0FBQ3pDLGFBQU8sOEJBQVEsS0FBSyxDQUFDO0tBQ3RCLE1BQU0sSUFBSSxNQUFNLEtBQUssOEJBQVEsVUFBVSxFQUFFO0FBQ3hDLGFBQU8sOEJBQVEsS0FBSyxDQUFDO0tBQ3RCLE1BQU0sSUFBSSxNQUFNLEtBQUssOEJBQVEsZUFBZSxFQUFFO0FBQzdDLGFBQU8sOEJBQVEsS0FBSyxDQUFDO0tBQ3RCLE1BQU0sSUFBSSxNQUFNLEtBQUssOEJBQVEsVUFBVSxFQUFFO0FBQ3hDLGFBQU8sOEJBQVEsS0FBSyxDQUFDO0tBQ3RCLE1BQU0sSUFBSSxNQUFNLEtBQUssOEJBQVEsV0FBVyxFQUFFO0FBQ3pDLGFBQU8sOEJBQVEsS0FBSyxDQUFDO0tBQ3RCLE1BQU0sSUFBSSxNQUFNLEtBQUssOEJBQVEsVUFBVSxFQUFFO0FBQ3hDLGFBQU8sOEJBQVEsS0FBSyxDQUFDO0tBQ3RCO0dBQ0Y7OztBQUdELFNBQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyIsImZpbGUiOiJ0cmFuc2xhdGVTY29wZU1hcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCBtYXJrZXJzIGZyb20gJy4uL2NvbnN0YW50cy9tYXJrZXJzJztcblxuLyoqXG4gKiBUaGlzIHRyYW5zbGF0ZXMgYSBzY29wZSBtYXJrZXIgaW50byB0aGUgYXBwcm9wcmlhdGUgbWFya2VyIGJhc2VkIG9uIGlmIHRoZVxuICogc2NvcGUgd2FzIGJyb2tlbiBvciBub3QuXG4gKi9cbmZ1bmN0aW9uIHRyYW5zbGF0ZVNjb3BlTWFya2VyKG1hcmtlcjogc3RyaW5nLCBicm9rZW46IGJvb2xlYW4pOiBzdHJpbmcge1xuICBpZiAoYnJva2VuKSB7XG4gICAgaWYgKG1hcmtlciA9PT0gbWFya2Vycy5vcGVuU2NvcGUpIHtcbiAgICAgIHJldHVybiBtYXJrZXJzLmVtcHR5O1xuICAgIH0gZWxzZSBpZiAobWFya2VyID09PSBtYXJrZXJzLnNjb3BlSW5kZW50KSB7XG4gICAgICByZXR1cm4gbWFya2Vycy5pbmRlbnQ7XG4gICAgfSBlbHNlIGlmIChtYXJrZXIgPT09IG1hcmtlcnMuc2NvcGVCcmVhaykge1xuICAgICAgcmV0dXJuIG1hcmtlcnMuaGFyZEJyZWFrO1xuICAgIH0gZWxzZSBpZiAobWFya2VyID09PSBtYXJrZXJzLnNjb3BlU3BhY2VCcmVhaykge1xuICAgICAgcmV0dXJuIG1hcmtlcnMuaGFyZEJyZWFrO1xuICAgIH0gZWxzZSBpZiAobWFya2VyID09PSBtYXJrZXJzLnNjb3BlQ29tbWEpIHtcbiAgICAgIHJldHVybiBtYXJrZXJzLmNvbW1hO1xuICAgIH0gZWxzZSBpZiAobWFya2VyID09PSBtYXJrZXJzLnNjb3BlRGVkZW50KSB7XG4gICAgICByZXR1cm4gbWFya2Vycy5kZWRlbnQ7XG4gICAgfSBlbHNlIGlmIChtYXJrZXIgPT09IG1hcmtlcnMuY2xvc2VTY29wZSkge1xuICAgICAgcmV0dXJuIG1hcmtlcnMuZW1wdHk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChtYXJrZXIgPT09IG1hcmtlcnMub3BlblNjb3BlKSB7XG4gICAgICByZXR1cm4gbWFya2Vycy5lbXB0eTtcbiAgICB9IGVsc2UgaWYgKG1hcmtlciA9PT0gbWFya2Vycy5zY29wZUluZGVudCkge1xuICAgICAgcmV0dXJuIG1hcmtlcnMuZW1wdHk7XG4gICAgfSBlbHNlIGlmIChtYXJrZXIgPT09IG1hcmtlcnMuc2NvcGVCcmVhaykge1xuICAgICAgcmV0dXJuIG1hcmtlcnMuZW1wdHk7XG4gICAgfSBlbHNlIGlmIChtYXJrZXIgPT09IG1hcmtlcnMuc2NvcGVTcGFjZUJyZWFrKSB7XG4gICAgICByZXR1cm4gbWFya2Vycy5zcGFjZTtcbiAgICB9IGVsc2UgaWYgKG1hcmtlciA9PT0gbWFya2Vycy5zY29wZUNvbW1hKSB7XG4gICAgICByZXR1cm4gbWFya2Vycy5lbXB0eTtcbiAgICB9IGVsc2UgaWYgKG1hcmtlciA9PT0gbWFya2Vycy5zY29wZURlZGVudCkge1xuICAgICAgcmV0dXJuIG1hcmtlcnMuZW1wdHk7XG4gICAgfSBlbHNlIGlmIChtYXJrZXIgPT09IG1hcmtlcnMuY2xvc2VTY29wZSkge1xuICAgICAgcmV0dXJuIG1hcmtlcnMuZW1wdHk7XG4gICAgfVxuICB9XG5cbiAgLy8gRmFsbGJhY2sgdG8gaXRzZWxmLlxuICByZXR1cm4gbWFya2VyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyYW5zbGF0ZVNjb3BlTWFya2VyO1xuIl19