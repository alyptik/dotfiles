'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_SCROLLING_TIMEOUT = exports.WindowScroller = exports.default = undefined;

var _onScroll = require('./utils/onScroll');

Object.defineProperty(exports, 'IS_SCROLLING_TIMEOUT', {
  enumerable: true,
  get: function get() {
    return _onScroll.IS_SCROLLING_TIMEOUT;
  }
});

var _WindowScroller2 = require('./WindowScroller');

var _WindowScroller3 = _interopRequireDefault(_WindowScroller2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _WindowScroller3.default;
exports.WindowScroller = _WindowScroller3.default;