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

var _constantsMarkers = require('../../constants/markers');

var _constantsMarkers2 = _interopRequireDefault(_constantsMarkers);

var _printersCommonPrintComment = require('../../printers/common/printComment');

var _printersCommonPrintComment2 = _interopRequireDefault(_printersCommonPrintComment);

var _utilsUnwrapMarkers = require('../../utils/unwrapMarkers');

var _utilsUnwrapMarkers2 = _interopRequireDefault(_utilsUnwrapMarkers);

function wrapWithComments(print, node, context, lines) {
  var invalidTrailingComments = context.invalidTrailingComments;
  var invalidLeadingComments = context.invalidLeadingComments;
  var leadingComments = node.leadingComments;

  var leadingLines = [];
  var last = context.path.last();
  if (last && last.type === 'ImportSpecifier') {
    // TODO: https://github.com/babel/babel/issues/2600
    // Leading comments are screwed up in ImportSpecifiers. Ignore them.
  } else if (Array.isArray(leadingComments)) {
      leadingLines = leadingComments.map(function (comment, i, arr) {
        // Some leading comments may be invalid.
        if (invalidLeadingComments.has(comment.start)) {
          return [];
        }

        var parts = [(0, _printersCommonPrintComment2['default'])(comment)];
        var next = i === arr.length - 1 ? node : arr[i + 1];
        var min = comment.loc.end.line;
        var max = next.loc.start.line;

        for (var j = 0; j < max - min; j++) {
          parts.push(_constantsMarkers2['default'].multiHardBreak);
        }

        return parts;
      });
    }

  var trailingComments = node.trailingComments;

  var trailingLines = [];

  if (Array.isArray(trailingComments)) {
    trailingLines = trailingComments.map(function (comment, i, arr) {
      // Some trailing comments may be invalid.
      if (invalidTrailingComments.has(comment.start)) {
        return [];
      }

      var prev = i === 0 ? node : arr[i - 1];
      var min = prev.loc.end.line;
      var max = comment.loc.start.line;
      var parts = [];

      for (var j = 0; j < max - min; j++) {
        parts.push(_constantsMarkers2['default'].multiHardBreak);
      }

      return parts.concat((0, _printersCommonPrintComment2['default'])(comment));
    });
  }

  return (0, _utilsUnwrapMarkers2['default'])(leadingLines, lines, trailingLines);
}

module.exports = wrapWithComments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXByaW50LWpzL3dyYXBwZXJzL2NvbXBsZXgvd3JhcFdpdGhDb21tZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Z0NBWW9CLHlCQUF5Qjs7OzswQ0FDcEIsb0NBQW9DOzs7O2tDQUNuQywyQkFBMkI7Ozs7QUFFckQsU0FBUyxnQkFBZ0IsQ0FDdkIsS0FBWSxFQUNaLElBQVMsRUFDVCxPQUFnQixFQUNoQixLQUFZLEVBQ0w7TUFDQSx1QkFBdUIsR0FBNEIsT0FBTyxDQUExRCx1QkFBdUI7TUFBRSxzQkFBc0IsR0FBSSxPQUFPLENBQWpDLHNCQUFzQjtNQUMvQyxlQUFlLEdBQUksSUFBSSxDQUF2QixlQUFlOztBQUN0QixNQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQyxNQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFOzs7R0FHNUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7QUFDekMsa0JBQVksR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUs7O0FBRXRELFlBQUksc0JBQXNCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM3QyxpQkFBTyxFQUFFLENBQUM7U0FDWDs7QUFFRCxZQUFNLEtBQUssR0FBRyxDQUFDLDZDQUFhLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdEMsWUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFlBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUNqQyxZQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7O0FBRWhDLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xDLGVBQUssQ0FBQyxJQUFJLENBQUMsOEJBQVEsY0FBYyxDQUFDLENBQUM7U0FDcEM7O0FBRUQsZUFBTyxLQUFLLENBQUM7T0FDZCxDQUFDLENBQUM7S0FDSjs7TUFFTSxnQkFBZ0IsR0FBSSxJQUFJLENBQXhCLGdCQUFnQjs7QUFDdkIsTUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDOztBQUV2QixNQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtBQUNuQyxpQkFBYSxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFLOztBQUV4RCxVQUFJLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDOUMsZUFBTyxFQUFFLENBQUM7T0FDWDs7QUFFRCxVQUFNLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLFVBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUM5QixVQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDbkMsVUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDOztBQUVqQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNsQyxhQUFLLENBQUMsSUFBSSxDQUFDLDhCQUFRLGNBQWMsQ0FBQyxDQUFDO09BQ3BDOztBQUVELGFBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyw2Q0FBYSxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQzVDLENBQUMsQ0FBQztHQUNKOztBQUVELFNBQU8scUNBQWMsWUFBWSxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztDQUMxRDs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDIiwiZmlsZSI6IndyYXBXaXRoQ29tbWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSB7Q29udGV4dCwgTGluZXMsIFByaW50fSBmcm9tICcuLi8uLi90eXBlcy9jb21tb24nO1xuXG5pbXBvcnQgbWFya2VycyBmcm9tICcuLi8uLi9jb25zdGFudHMvbWFya2Vycyc7XG5pbXBvcnQgcHJpbnRDb21tZW50IGZyb20gJy4uLy4uL3ByaW50ZXJzL2NvbW1vbi9wcmludENvbW1lbnQnO1xuaW1wb3J0IHVud3JhcE1hcmtlcnMgZnJvbSAnLi4vLi4vdXRpbHMvdW53cmFwTWFya2Vycyc7XG5cbmZ1bmN0aW9uIHdyYXBXaXRoQ29tbWVudHMoXG4gIHByaW50OiBQcmludCxcbiAgbm9kZTogYW55LFxuICBjb250ZXh0OiBDb250ZXh0LFxuICBsaW5lczogTGluZXMsXG4pOiBMaW5lcyB7XG4gIGNvbnN0IHtpbnZhbGlkVHJhaWxpbmdDb21tZW50cywgaW52YWxpZExlYWRpbmdDb21tZW50c30gPSBjb250ZXh0O1xuICBjb25zdCB7bGVhZGluZ0NvbW1lbnRzfSA9IG5vZGU7XG4gIGxldCBsZWFkaW5nTGluZXMgPSBbXTtcbiAgY29uc3QgbGFzdCA9IGNvbnRleHQucGF0aC5sYXN0KCk7XG4gIGlmIChsYXN0ICYmIGxhc3QudHlwZSA9PT0gJ0ltcG9ydFNwZWNpZmllcicpIHtcbiAgICAvLyBUT0RPOiBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvaXNzdWVzLzI2MDBcbiAgICAvLyBMZWFkaW5nIGNvbW1lbnRzIGFyZSBzY3Jld2VkIHVwIGluIEltcG9ydFNwZWNpZmllcnMuIElnbm9yZSB0aGVtLlxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobGVhZGluZ0NvbW1lbnRzKSkge1xuICAgIGxlYWRpbmdMaW5lcyA9IGxlYWRpbmdDb21tZW50cy5tYXAoKGNvbW1lbnQsIGksIGFycikgPT4ge1xuICAgICAgLy8gU29tZSBsZWFkaW5nIGNvbW1lbnRzIG1heSBiZSBpbnZhbGlkLlxuICAgICAgaWYgKGludmFsaWRMZWFkaW5nQ29tbWVudHMuaGFzKGNvbW1lbnQuc3RhcnQpKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFydHMgPSBbcHJpbnRDb21tZW50KGNvbW1lbnQpXTtcbiAgICAgIGNvbnN0IG5leHQgPSBpID09PSBhcnIubGVuZ3RoIC0gMSA/IG5vZGUgOiBhcnJbaSArIDFdO1xuICAgICAgY29uc3QgbWluID0gY29tbWVudC5sb2MuZW5kLmxpbmU7XG4gICAgICBjb25zdCBtYXggPSBuZXh0LmxvYy5zdGFydC5saW5lO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1heCAtIG1pbjsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2gobWFya2Vycy5tdWx0aUhhcmRCcmVhayk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJ0cztcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHt0cmFpbGluZ0NvbW1lbnRzfSA9IG5vZGU7XG4gIGxldCB0cmFpbGluZ0xpbmVzID0gW107XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodHJhaWxpbmdDb21tZW50cykpIHtcbiAgICB0cmFpbGluZ0xpbmVzID0gdHJhaWxpbmdDb21tZW50cy5tYXAoKGNvbW1lbnQsIGksIGFycikgPT4ge1xuICAgICAgLy8gU29tZSB0cmFpbGluZyBjb21tZW50cyBtYXkgYmUgaW52YWxpZC5cbiAgICAgIGlmIChpbnZhbGlkVHJhaWxpbmdDb21tZW50cy5oYXMoY29tbWVudC5zdGFydCkpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2ID0gaSA9PT0gMCA/IG5vZGUgOiBhcnJbaSAtIDFdO1xuICAgICAgY29uc3QgbWluID0gcHJldi5sb2MuZW5kLmxpbmU7XG4gICAgICBjb25zdCBtYXggPSBjb21tZW50LmxvYy5zdGFydC5saW5lO1xuICAgICAgY29uc3QgcGFydHMgPSBbXTtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXggLSBtaW47IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKG1hcmtlcnMubXVsdGlIYXJkQnJlYWspO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFydHMuY29uY2F0KHByaW50Q29tbWVudChjb21tZW50KSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdW53cmFwTWFya2VycyhsZWFkaW5nTGluZXMsIGxpbmVzLCB0cmFpbGluZ0xpbmVzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3cmFwV2l0aENvbW1lbnRzO1xuIl19