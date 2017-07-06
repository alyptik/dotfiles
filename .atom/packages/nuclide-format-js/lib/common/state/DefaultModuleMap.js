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

var _ModuleMap = require('./ModuleMap');

var _ModuleMap2 = _interopRequireDefault(_ModuleMap);

var DefaultModuleMap = new _ModuleMap2['default']({
  paths: [],
  pathsToRelativize: [],
  aliases: require('../constants/commonAliases'),
  aliasesToRelativize: new Map(),
  builtIns: require('../constants/builtIns'),
  builtInTypes: require('../constants/builtInTypes')
});

module.exports = DefaultModuleMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3RhdGUvRGVmYXVsdE1vZHVsZU1hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7eUJBVXNCLGFBQWE7Ozs7QUFFbkMsSUFBTSxnQkFBZ0IsR0FBRywyQkFBYztBQUNyQyxPQUFLLEVBQUUsRUFBRTtBQUNULG1CQUFpQixFQUFFLEVBQUU7QUFDckIsU0FBTyxFQUFFLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQztBQUM5QyxxQkFBbUIsRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUM5QixVQUFRLEVBQUUsT0FBTyxDQUFDLHVCQUF1QixDQUFDO0FBQzFDLGNBQVksRUFBRSxPQUFPLENBQUMsMkJBQTJCLENBQUM7Q0FDbkQsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMiLCJmaWxlIjoiRGVmYXVsdE1vZHVsZU1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCBNb2R1bGVNYXAgZnJvbSAnLi9Nb2R1bGVNYXAnO1xuXG5jb25zdCBEZWZhdWx0TW9kdWxlTWFwID0gbmV3IE1vZHVsZU1hcCh7XG4gIHBhdGhzOiBbXSxcbiAgcGF0aHNUb1JlbGF0aXZpemU6IFtdLFxuICBhbGlhc2VzOiByZXF1aXJlKCcuLi9jb25zdGFudHMvY29tbW9uQWxpYXNlcycpLFxuICBhbGlhc2VzVG9SZWxhdGl2aXplOiBuZXcgTWFwKCksXG4gIGJ1aWx0SW5zOiByZXF1aXJlKCcuLi9jb25zdGFudHMvYnVpbHRJbnMnKSxcbiAgYnVpbHRJblR5cGVzOiByZXF1aXJlKCcuLi9jb25zdGFudHMvYnVpbHRJblR5cGVzJyksXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEZWZhdWx0TW9kdWxlTWFwO1xuIl19