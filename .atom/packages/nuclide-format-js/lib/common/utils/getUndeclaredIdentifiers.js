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

var _getDeclaredIdentifiers = require('./getDeclaredIdentifiers');

var _getDeclaredIdentifiers2 = _interopRequireDefault(_getDeclaredIdentifiers);

var _getNonDeclarationIdentifiers = require('./getNonDeclarationIdentifiers');

var _getNonDeclarationIdentifiers2 = _interopRequireDefault(_getNonDeclarationIdentifiers);

/**
 * This will get a list of all identifiers that are used but undeclared.
 */
function getUndeclaredIdentifiers(root, options) {
  var declared = (0, _getDeclaredIdentifiers2['default'])(root, options);
  var undeclared = (0, _getNonDeclarationIdentifiers2['default'])(root);
  // now remove anything that was declared
  for (var _name of declared) {
    undeclared['delete'](_name);
  }
  return undeclared;
}

module.exports = getUndeclaredIdentifiers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvZ2V0VW5kZWNsYXJlZElkZW50aWZpZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQ0FhbUMsMEJBQTBCOzs7OzRDQUNwQixnQ0FBZ0M7Ozs7Ozs7QUFLekUsU0FBUyx3QkFBd0IsQ0FDL0IsSUFBZ0IsRUFDaEIsT0FBc0IsRUFDVDtBQUNiLE1BQU0sUUFBUSxHQUFHLHlDQUF1QixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdkQsTUFBTSxVQUFVLEdBQUcsK0NBQTZCLElBQUksQ0FBQyxDQUFDOztBQUV0RCxPQUFLLElBQU0sS0FBSSxJQUFJLFFBQVEsRUFBRTtBQUMzQixjQUFVLFVBQU8sQ0FBQyxLQUFJLENBQUMsQ0FBQztHQUN6QjtBQUNELFNBQU8sVUFBVSxDQUFDO0NBQ25COztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUMiLCJmaWxlIjoiZ2V0VW5kZWNsYXJlZElkZW50aWZpZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge0NvbGxlY3Rpb259IGZyb20gJy4uL3R5cGVzL2FzdCc7XG5pbXBvcnQgdHlwZSB7U291cmNlT3B0aW9uc30gZnJvbSAnLi4vb3B0aW9ucy9Tb3VyY2VPcHRpb25zJztcblxuaW1wb3J0IGdldERlY2xhcmVkSWRlbnRpZmllcnMgZnJvbSAnLi9nZXREZWNsYXJlZElkZW50aWZpZXJzJztcbmltcG9ydCBnZXROb25EZWNsYXJhdGlvbklkZW50aWZpZXJzIGZyb20gJy4vZ2V0Tm9uRGVjbGFyYXRpb25JZGVudGlmaWVycyc7XG5cbi8qKlxuICogVGhpcyB3aWxsIGdldCBhIGxpc3Qgb2YgYWxsIGlkZW50aWZpZXJzIHRoYXQgYXJlIHVzZWQgYnV0IHVuZGVjbGFyZWQuXG4gKi9cbmZ1bmN0aW9uIGdldFVuZGVjbGFyZWRJZGVudGlmaWVycyhcbiAgcm9vdDogQ29sbGVjdGlvbixcbiAgb3B0aW9uczogU291cmNlT3B0aW9ucyxcbik6IFNldDxzdHJpbmc+IHtcbiAgY29uc3QgZGVjbGFyZWQgPSBnZXREZWNsYXJlZElkZW50aWZpZXJzKHJvb3QsIG9wdGlvbnMpO1xuICBjb25zdCB1bmRlY2xhcmVkID0gZ2V0Tm9uRGVjbGFyYXRpb25JZGVudGlmaWVycyhyb290KTtcbiAgLy8gbm93IHJlbW92ZSBhbnl0aGluZyB0aGF0IHdhcyBkZWNsYXJlZFxuICBmb3IgKGNvbnN0IG5hbWUgb2YgZGVjbGFyZWQpIHtcbiAgICB1bmRlY2xhcmVkLmRlbGV0ZShuYW1lKTtcbiAgfVxuICByZXR1cm4gdW5kZWNsYXJlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRVbmRlY2xhcmVkSWRlbnRpZmllcnM7XG4iXX0=