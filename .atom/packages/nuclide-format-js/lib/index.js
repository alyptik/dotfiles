var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 */

/* globals atom */

if (typeof atom !== 'undefined' && typeof atom.getCurrentWindow === 'function') {
  module.exports = require('./atom');
} else {
  module.exports = _extends({}, require('./common'), {
    reprint: require('./reprint-js')
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVlBLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixLQUFLLFVBQVUsRUFBRTtBQUM5RSxRQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNwQyxNQUFNO0FBQ0wsUUFBTSxDQUFDLE9BQU8sZ0JBQ1QsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUN0QixXQUFPLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUNqQyxDQUFDO0NBQ0giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG4vKiBnbG9iYWxzIGF0b20gKi9cblxuaWYgKHR5cGVvZiBhdG9tICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgYXRvbS5nZXRDdXJyZW50V2luZG93ID09PSAnZnVuY3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9hdG9tJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAuLi5yZXF1aXJlKCcuL2NvbW1vbicpLFxuICAgIHJlcHJpbnQ6IHJlcXVpcmUoJy4vcmVwcmludC1qcycpLFxuICB9O1xufVxuIl19