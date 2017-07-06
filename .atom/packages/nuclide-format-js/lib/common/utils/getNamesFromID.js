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

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

function getNamesFromID(node) {
  var ids = new Set();
  if (_jscodeshift2['default'].Identifier.check(node)) {
    ids.add(node.name);
  } else if (_jscodeshift2['default'].RestElement.check(node) || _jscodeshift2['default'].SpreadElement.check(node) || _jscodeshift2['default'].SpreadProperty.check(node)) {
    for (var id of getNamesFromID(node.argument)) {
      ids.add(id);
    }
  } else if (_jscodeshift2['default'].ObjectPattern.check(node)) {
    node.properties.forEach(function (prop) {
      // Generally props have a value, if it is a spread property it doesn't.
      for (var id of getNamesFromID(prop.value || prop)) {
        ids.add(id);
      }
    });
  } else if (_jscodeshift2['default'].ArrayPattern.check(node)) {
    node.elements.forEach(function (element) {
      for (var id of getNamesFromID(element)) {
        ids.add(id);
      }
    });
  }
  return ids;
}

module.exports = getNamesFromID;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvZ2V0TmFtZXNGcm9tSUQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OzJCQVlpQixhQUFhOzs7O0FBRTlCLFNBQVMsY0FBYyxDQUFDLElBQVUsRUFBZTtBQUMvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQUkseUJBQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMvQixPQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNwQixNQUFNLElBQ0wseUJBQUssV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFDNUIseUJBQUssYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFDOUIseUJBQUssY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFDL0I7QUFDQSxTQUFLLElBQU0sRUFBRSxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDOUMsU0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNiO0dBQ0YsTUFBTSxJQUFJLHlCQUFLLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDekMsUUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLEVBQUk7O0FBRTlCLFdBQUssSUFBTSxFQUFFLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQUU7QUFDbkQsV0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUNiO0tBQ0YsQ0FBQyxDQUFDO0dBQ0osTUFBTSxJQUFJLHlCQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDeEMsUUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDL0IsV0FBSyxJQUFNLEVBQUUsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDeEMsV0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUNiO0tBQ0YsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxTQUFPLEdBQUcsQ0FBQztDQUNaOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDIiwiZmlsZSI6ImdldE5hbWVzRnJvbUlELmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge05vZGV9IGZyb20gJy4uL3R5cGVzL2FzdCc7XG5cbmltcG9ydCBqc2NzIGZyb20gJ2pzY29kZXNoaWZ0JztcblxuZnVuY3Rpb24gZ2V0TmFtZXNGcm9tSUQobm9kZTogTm9kZSk6IFNldDxzdHJpbmc+IHtcbiAgY29uc3QgaWRzID0gbmV3IFNldCgpO1xuICBpZiAoanNjcy5JZGVudGlmaWVyLmNoZWNrKG5vZGUpKSB7XG4gICAgaWRzLmFkZChub2RlLm5hbWUpO1xuICB9IGVsc2UgaWYgKFxuICAgIGpzY3MuUmVzdEVsZW1lbnQuY2hlY2sobm9kZSkgfHxcbiAgICBqc2NzLlNwcmVhZEVsZW1lbnQuY2hlY2sobm9kZSkgfHxcbiAgICBqc2NzLlNwcmVhZFByb3BlcnR5LmNoZWNrKG5vZGUpXG4gICkge1xuICAgIGZvciAoY29uc3QgaWQgb2YgZ2V0TmFtZXNGcm9tSUQobm9kZS5hcmd1bWVudCkpIHtcbiAgICAgIGlkcy5hZGQoaWQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChqc2NzLk9iamVjdFBhdHRlcm4uY2hlY2sobm9kZSkpIHtcbiAgICBub2RlLnByb3BlcnRpZXMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIC8vIEdlbmVyYWxseSBwcm9wcyBoYXZlIGEgdmFsdWUsIGlmIGl0IGlzIGEgc3ByZWFkIHByb3BlcnR5IGl0IGRvZXNuJ3QuXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIGdldE5hbWVzRnJvbUlEKHByb3AudmFsdWUgfHwgcHJvcCkpIHtcbiAgICAgICAgaWRzLmFkZChpZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoanNjcy5BcnJheVBhdHRlcm4uY2hlY2sobm9kZSkpIHtcbiAgICBub2RlLmVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIGdldE5hbWVzRnJvbUlEKGVsZW1lbnQpKSB7XG4gICAgICAgIGlkcy5hZGQoaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBpZHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmFtZXNGcm9tSUQ7XG4iXX0=