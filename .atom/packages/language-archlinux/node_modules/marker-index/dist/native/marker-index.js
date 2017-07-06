'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _buildReleaseMarker_index = require('../../build/Release/marker_index');

var _buildReleaseMarker_index2 = _interopRequireDefault(_buildReleaseMarker_index);

_buildReleaseMarker_index2['default'].prototype.getRange = function (id) {
  return [this.getStart(id), this.getEnd(id)];
};

_buildReleaseMarker_index2['default'].prototype.findStartingAt = function (position) {
  return this.findStartingIn(position, position);
};

_buildReleaseMarker_index2['default'].prototype.findEndingAt = function (position) {
  return this.findEndingIn(position, position);
};

exports['default'] = _buildReleaseMarker_index2['default'];
module.exports = exports['default'];