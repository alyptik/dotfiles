var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 */

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var OptionsRecord = _immutable2['default'].Record({

  // Line length settings.

  /**
   * This is the length with which reprint will try to keep each line within.
   *
   * Note: It's not guaranteed to keep lines within this length, but it will
   * do its best.
   */
  maxLineLength: 80,

  // Tab Settings.

  /**
   * The width of a tab. If using spaces this is how many spaces will be
   * inserted. If using tab charcters this is how many spaces a single tab
   * is expected to be displayed as.
   */
  tabWidth: 2,
  /**
   * If true spaces will be used for indentation, otherwise tabs will be used.
   */
  useSpaces: true

});

/**
 * Set up a class to get strong type checking.
 */

var Options = (function (_OptionsRecord) {
  _inherits(Options, _OptionsRecord);

  function Options(init) {
    _classCallCheck(this, Options);

    _get(Object.getPrototypeOf(Options.prototype), 'constructor', this).call(this, init);
  }

  return Options;
})(OptionsRecord);

module.exports = Options;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXByaW50LWpzL29wdGlvbnMvT3B0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBVXNCLFdBQVc7Ozs7QUFFakMsSUFBTSxhQUFhLEdBQUcsdUJBQVUsTUFBTSxDQUFDOzs7Ozs7Ozs7O0FBVXJDLGVBQWEsRUFBRSxFQUFFOzs7Ozs7Ozs7QUFTakIsVUFBUSxFQUFFLENBQUM7Ozs7QUFJWCxXQUFTLEVBQUUsSUFBSTs7Q0FFaEIsQ0FBQyxDQUFDOzs7Ozs7SUFLRyxPQUFPO1lBQVAsT0FBTzs7QUFNQSxXQU5QLE9BQU8sQ0FNQyxJQUlYLEVBQUU7MEJBVkMsT0FBTzs7QUFXVCwrQkFYRSxPQUFPLDZDQVdILElBQUksRUFBRTtHQUNiOztTQVpHLE9BQU87R0FBUyxhQUFhOztBQWVuQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiJPcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBPcHRpb25zUmVjb3JkID0gSW1tdXRhYmxlLlJlY29yZCh7XG5cbiAgLy8gTGluZSBsZW5ndGggc2V0dGluZ3MuXG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIGxlbmd0aCB3aXRoIHdoaWNoIHJlcHJpbnQgd2lsbCB0cnkgdG8ga2VlcCBlYWNoIGxpbmUgd2l0aGluLlxuICAgKlxuICAgKiBOb3RlOiBJdCdzIG5vdCBndWFyYW50ZWVkIHRvIGtlZXAgbGluZXMgd2l0aGluIHRoaXMgbGVuZ3RoLCBidXQgaXQgd2lsbFxuICAgKiBkbyBpdHMgYmVzdC5cbiAgICovXG4gIG1heExpbmVMZW5ndGg6IDgwLFxuXG4gIC8vIFRhYiBTZXR0aW5ncy5cblxuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIGEgdGFiLiBJZiB1c2luZyBzcGFjZXMgdGhpcyBpcyBob3cgbWFueSBzcGFjZXMgd2lsbCBiZVxuICAgKiBpbnNlcnRlZC4gSWYgdXNpbmcgdGFiIGNoYXJjdGVycyB0aGlzIGlzIGhvdyBtYW55IHNwYWNlcyBhIHNpbmdsZSB0YWJcbiAgICogaXMgZXhwZWN0ZWQgdG8gYmUgZGlzcGxheWVkIGFzLlxuICAgKi9cbiAgdGFiV2lkdGg6IDIsXG4gIC8qKlxuICAgKiBJZiB0cnVlIHNwYWNlcyB3aWxsIGJlIHVzZWQgZm9yIGluZGVudGF0aW9uLCBvdGhlcndpc2UgdGFicyB3aWxsIGJlIHVzZWQuXG4gICAqL1xuICB1c2VTcGFjZXM6IHRydWUsXG5cbn0pO1xuXG4vKipcbiAqIFNldCB1cCBhIGNsYXNzIHRvIGdldCBzdHJvbmcgdHlwZSBjaGVja2luZy5cbiAqL1xuY2xhc3MgT3B0aW9ucyBleHRlbmRzIE9wdGlvbnNSZWNvcmQge1xuXG4gIG1heExpbmVMZW5ndGg6IG51bWJlcjtcbiAgdGFiV2lkdGg6IG51bWJlcjtcbiAgdXNlU3BhY2VzOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGluaXQ/OiB7XG4gICAgbWF4TGluZUxlbmd0aD86IG51bWJlcixcbiAgICB0YWJXaWR0aD86IG51bWJlcixcbiAgICB1c2VTcGFjZXM/OiBib29sZWFuLFxuICB9KSB7XG4gICAgc3VwZXIoaW5pdCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPcHRpb25zO1xuIl19