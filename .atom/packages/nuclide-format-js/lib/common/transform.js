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

var _optionsOptions = require('./options/Options');

var _optionsOptions2 = _interopRequireDefault(_optionsOptions);

var _nuclideTransform = require('./nuclide/transform');

var _nuclideTransform2 = _interopRequireDefault(_nuclideTransform);

var _utilsPrintRoot = require('./utils/printRoot');

var _utilsPrintRoot2 = _interopRequireDefault(_utilsPrintRoot);

var _requiresTransform = require('./requires/transform');

var _requiresTransform2 = _interopRequireDefault(_requiresTransform);

function transform(source, options) {
  _optionsOptions2['default'].validateSourceOptions(options);

  // Parse the source code once, then reuse the root node
  var root = (0, _jscodeshift2['default'])(source);

  // Add use-strict
  // TODO: implement this, make it configurable

  // Requires
  (0, _requiresTransform2['default'])(root, options);

  var output = (0, _utilsPrintRoot2['default'])(root);

  // Transform that operates on the raw string output.
  output = (0, _nuclideTransform2['default'])(output, options);

  return output;
}

module.exports = transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vdHJhbnNmb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzsyQkFZaUIsYUFBYTs7Ozs4QkFFVixtQkFBbUI7Ozs7Z0NBQ1YscUJBQXFCOzs7OzhCQUM1QixtQkFBbUI7Ozs7aUNBQ1gsc0JBQXNCOzs7O0FBRXBELFNBQVMsU0FBUyxDQUFDLE1BQWMsRUFBRSxPQUFzQixFQUFVO0FBQ2pFLDhCQUFRLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7QUFHdkMsTUFBTSxJQUFJLEdBQUcsOEJBQUssTUFBTSxDQUFDLENBQUM7Ozs7OztBQU0xQixzQ0FBa0IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUVqQyxNQUFJLE1BQU0sR0FBRyxpQ0FBVSxJQUFJLENBQUMsQ0FBQzs7O0FBRzdCLFFBQU0sR0FBRyxtQ0FBaUIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUUzQyxTQUFPLE1BQU0sQ0FBQztDQUNmOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDIiwiZmlsZSI6InRyYW5zZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIHtTb3VyY2VPcHRpb25zfSBmcm9tICcuL29wdGlvbnMvU291cmNlT3B0aW9ucyc7XG5cbmltcG9ydCBqc2NzIGZyb20gJ2pzY29kZXNoaWZ0JztcblxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xuaW1wb3J0IG51Y2xpZGVUcmFuc2Zvcm0gZnJvbSAnLi9udWNsaWRlL3RyYW5zZm9ybSc7XG5pbXBvcnQgcHJpbnRSb290IGZyb20gJy4vdXRpbHMvcHJpbnRSb290JztcbmltcG9ydCByZXF1aXJlc1RyYW5zZm9ybSBmcm9tICcuL3JlcXVpcmVzL3RyYW5zZm9ybSc7XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybShzb3VyY2U6IHN0cmluZywgb3B0aW9uczogU291cmNlT3B0aW9ucyk6IHN0cmluZyB7XG4gIE9wdGlvbnMudmFsaWRhdGVTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xuXG4gIC8vIFBhcnNlIHRoZSBzb3VyY2UgY29kZSBvbmNlLCB0aGVuIHJldXNlIHRoZSByb290IG5vZGVcbiAgY29uc3Qgcm9vdCA9IGpzY3Moc291cmNlKTtcblxuICAvLyBBZGQgdXNlLXN0cmljdFxuICAvLyBUT0RPOiBpbXBsZW1lbnQgdGhpcywgbWFrZSBpdCBjb25maWd1cmFibGVcblxuICAvLyBSZXF1aXJlc1xuICByZXF1aXJlc1RyYW5zZm9ybShyb290LCBvcHRpb25zKTtcblxuICBsZXQgb3V0cHV0ID0gcHJpbnRSb290KHJvb3QpO1xuXG4gIC8vIFRyYW5zZm9ybSB0aGF0IG9wZXJhdGVzIG9uIHRoZSByYXcgc3RyaW5nIG91dHB1dC5cbiAgb3V0cHV0ID0gbnVjbGlkZVRyYW5zZm9ybShvdXRwdXQsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJhbnNmb3JtO1xuIl19