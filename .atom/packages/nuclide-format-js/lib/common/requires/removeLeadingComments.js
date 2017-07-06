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

var _utilsFirstNode = require('../utils/FirstNode');

var _utilsFirstNode2 = _interopRequireDefault(_utilsFirstNode);

/**
 * Removes the leading comments from the first node. Leading comments are
 * defined as:
 *
 *   - let N be the number of leading comments numbered 0 to N-1
 *   - if there is space betwee comment N-1 and first, comments 0 to N-1
 *   - else comments 0 to N-2
 */
function removeLeadingComments(root) {
  var firstPath = _utilsFirstNode2['default'].get(root);
  if (!firstPath) {
    return [];
  }
  var first = firstPath.node;
  if (!first || !first.comments) {
    return [];
  }

  // Check if the last comment ends exactly where the first node starts.
  var transferLastcomment = false;
  var lastComment = first.comments.reduce(function (curr, next) {
    return next.leading ? next : curr;
  }, null);
  if (lastComment && first.start != null && lastComment.end != null) {
    var difference = Math.abs(first.start - lastComment.end);
    if (difference > 1) {
      transferLastcomment = true;
    }
  }

  // Count how many comments we need to transfer, treat negative counts as 0.
  var transferCount = first.comments.reduce(function (count, next) {
    return next.leading ? count + 1 : count;
  }, transferLastcomment ? 0 : -1);
  if (transferCount <= 0) {
    return [];
  }

  // Make the transfer.
  var transfer = [];
  var keep = [];
  first.comments.forEach(function (comment) {
    if (transfer.length < transferCount && comment.leading) {
      transfer.push(comment);
    } else {
      keep.push(comment);
    }
  });

  first.comments = keep;
  firstPath.replace(first);
  return transfer;
}

module.exports = removeLeadingComments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vcmVxdWlyZXMvcmVtb3ZlTGVhZGluZ0NvbW1lbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs4QkFZc0Isb0JBQW9COzs7Ozs7Ozs7Ozs7QUFVMUMsU0FBUyxxQkFBcUIsQ0FBQyxJQUFnQixFQUFlO0FBQzVELE1BQU0sU0FBUyxHQUFHLDRCQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxNQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2QsV0FBTyxFQUFFLENBQUM7R0FDWDtBQUNELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDN0IsTUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFDN0IsV0FBTyxFQUFFLENBQUM7R0FDWDs7O0FBR0QsTUFBSSxtQkFBbUIsR0FBRyxLQUFLLENBQUM7QUFDaEMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ3ZDLFVBQUMsSUFBSSxFQUFFLElBQUk7V0FBTSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJO0dBQUMsRUFDNUMsSUFBSSxDQUNMLENBQUM7QUFDRixNQUFJLFdBQVcsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxXQUFXLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUNqRSxRQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNELFFBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtBQUNsQix5QkFBbUIsR0FBRyxJQUFJLENBQUM7S0FDNUI7R0FDRjs7O0FBR0QsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ3pDLFVBQUMsS0FBSyxFQUFFLElBQUk7V0FBTSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSztHQUFDLEVBQ25ELG1CQUFtQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FDN0IsQ0FBQztBQUNGLE1BQUksYUFBYSxJQUFJLENBQUMsRUFBRTtBQUN0QixXQUFPLEVBQUUsQ0FBQztHQUNYOzs7QUFHRCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDcEIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLE9BQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO0FBQ2hDLFFBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxhQUFhLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUN0RCxjQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hCLE1BQU07QUFDTCxVQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3BCO0dBQ0YsQ0FBQyxDQUFDOztBQUVILE9BQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFdBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsU0FBTyxRQUFRLENBQUM7Q0FDakI7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyIsImZpbGUiOiJyZW1vdmVMZWFkaW5nQ29tbWVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSB7Q29sbGVjdGlvbiwgTm9kZX0gZnJvbSAnLi4vdHlwZXMvYXN0JztcblxuaW1wb3J0IEZpcnN0Tm9kZSBmcm9tICcuLi91dGlscy9GaXJzdE5vZGUnO1xuXG4vKipcbiAqIFJlbW92ZXMgdGhlIGxlYWRpbmcgY29tbWVudHMgZnJvbSB0aGUgZmlyc3Qgbm9kZS4gTGVhZGluZyBjb21tZW50cyBhcmVcbiAqIGRlZmluZWQgYXM6XG4gKlxuICogICAtIGxldCBOIGJlIHRoZSBudW1iZXIgb2YgbGVhZGluZyBjb21tZW50cyBudW1iZXJlZCAwIHRvIE4tMVxuICogICAtIGlmIHRoZXJlIGlzIHNwYWNlIGJldHdlZSBjb21tZW50IE4tMSBhbmQgZmlyc3QsIGNvbW1lbnRzIDAgdG8gTi0xXG4gKiAgIC0gZWxzZSBjb21tZW50cyAwIHRvIE4tMlxuICovXG5mdW5jdGlvbiByZW1vdmVMZWFkaW5nQ29tbWVudHMocm9vdDogQ29sbGVjdGlvbik6IEFycmF5PE5vZGU+IHtcbiAgY29uc3QgZmlyc3RQYXRoID0gRmlyc3ROb2RlLmdldChyb290KTtcbiAgaWYgKCFmaXJzdFBhdGgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgY29uc3QgZmlyc3QgPSBmaXJzdFBhdGgubm9kZTtcbiAgaWYgKCFmaXJzdCB8fCAhZmlyc3QuY29tbWVudHMpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGUgbGFzdCBjb21tZW50IGVuZHMgZXhhY3RseSB3aGVyZSB0aGUgZmlyc3Qgbm9kZSBzdGFydHMuXG4gIGxldCB0cmFuc2Zlckxhc3Rjb21tZW50ID0gZmFsc2U7XG4gIGNvbnN0IGxhc3RDb21tZW50ID0gZmlyc3QuY29tbWVudHMucmVkdWNlKFxuICAgIChjdXJyLCBuZXh0KSA9PiAobmV4dC5sZWFkaW5nID8gbmV4dCA6IGN1cnIpLFxuICAgIG51bGwsXG4gICk7XG4gIGlmIChsYXN0Q29tbWVudCAmJiBmaXJzdC5zdGFydCAhPSBudWxsICYmIGxhc3RDb21tZW50LmVuZCAhPSBudWxsKSB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IE1hdGguYWJzKGZpcnN0LnN0YXJ0IC0gbGFzdENvbW1lbnQuZW5kKTtcbiAgICBpZiAoZGlmZmVyZW5jZSA+IDEpIHtcbiAgICAgIHRyYW5zZmVyTGFzdGNvbW1lbnQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIENvdW50IGhvdyBtYW55IGNvbW1lbnRzIHdlIG5lZWQgdG8gdHJhbnNmZXIsIHRyZWF0IG5lZ2F0aXZlIGNvdW50cyBhcyAwLlxuICBjb25zdCB0cmFuc2ZlckNvdW50ID0gZmlyc3QuY29tbWVudHMucmVkdWNlKFxuICAgIChjb3VudCwgbmV4dCkgPT4gKG5leHQubGVhZGluZyA/IGNvdW50ICsgMSA6IGNvdW50KSxcbiAgICB0cmFuc2Zlckxhc3Rjb21tZW50ID8gMCA6IC0xLFxuICApO1xuICBpZiAodHJhbnNmZXJDb3VudCA8PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLy8gTWFrZSB0aGUgdHJhbnNmZXIuXG4gIGNvbnN0IHRyYW5zZmVyID0gW107XG4gIGNvbnN0IGtlZXAgPSBbXTtcbiAgZmlyc3QuY29tbWVudHMuZm9yRWFjaChjb21tZW50ID0+IHtcbiAgICBpZiAodHJhbnNmZXIubGVuZ3RoIDwgdHJhbnNmZXJDb3VudCAmJiBjb21tZW50LmxlYWRpbmcpIHtcbiAgICAgIHRyYW5zZmVyLnB1c2goY29tbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtlZXAucHVzaChjb21tZW50KTtcbiAgICB9XG4gIH0pO1xuXG4gIGZpcnN0LmNvbW1lbnRzID0ga2VlcDtcbiAgZmlyc3RQYXRoLnJlcGxhY2UoZmlyc3QpO1xuICByZXR1cm4gdHJhbnNmZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlTGVhZGluZ0NvbW1lbnRzO1xuIl19