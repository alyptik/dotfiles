'use strict';

var findBinary = require('../../find-binary');
var binding_path = findBinary(require.resolve('../package.json'));

module.exports = require(binding_path);
