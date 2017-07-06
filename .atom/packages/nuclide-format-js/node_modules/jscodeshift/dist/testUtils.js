/**
 *  Copyright (c) 2016-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/* global expect, define, it */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.runTest = runTest;
exports.defineTest = defineTest;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

/**
 * Utility function to run a jscodeshift script within a unit test. This makes
 * several assumptions about the environment:
 *
 * - `dirName` contains the name of the directory the test is located in. This
 *   should normally be passed via __dirname.
 * - The test should be located in a subdirectory next to the transform itself.
 *   Commonly tests are located in a directory called __tests__.
 * - `transformName` contains the filename of the transform being tested,
 *   excluding the .js extension.
 * - `testFilePrefix` optionally contains the name of the file with the test
 *   data. If not specified, it defaults to the same value as `transformName`.
 *   This will be suffixed with ".input.js" for the input file and ".output.js"
 *   for the expected output. For example, if set to "foo", we will read the
 *   "foo.input.js" file, pass this to the transform, and expect its output to
 *   be equal to the contents of "foo.output.js".
 * - Test data should be located in a directory called __testfixtures__
 *   alongside the transform and __tests__ directory.
 */

function runTest(dirName, transformName, options, testFilePrefix) {
  if (!testFilePrefix) {
    testFilePrefix = transformName;
  }

  var fixtureDir = _path2['default'].join(dirName, '..', '__testfixtures__');
  var inputPath = _path2['default'].join(fixtureDir, testFilePrefix + '.input.js');
  var source = _fs2['default'].readFileSync(inputPath, 'utf8');
  var expectedOutput = _fs2['default'].readFileSync(_path2['default'].join(fixtureDir, testFilePrefix + '.output.js'), 'utf8');
  // Assumes transform is one level up from __tests__ directory
  var transform = require(_path2['default'].join(dirName, '..', transformName + '.js'));
  // Handle ES6 modules using default export for the transform
  if (transform['default']) {
    transform = transform['default'];
  }

  // Jest resets the module registry after each test, so we need to always get
  // a fresh copy of jscodeshift on every test run.
  var jscodeshift = require('./core');

  var output = transform({ path: inputPath, source: source }, { jscodeshift: jscodeshift }, options || {});
  expect((output || '').trim()).toEqual(expectedOutput.trim());
}

/**
 * Handles some boilerplate around defining a simple jest/Jasmine test for a
 * jscodeshift transform.
 */

function defineTest(dirName, transformName, options, testFilePrefix) {
  var testName = testFilePrefix ? 'transforms correctly using "' + testFilePrefix + '" data' : 'transforms correctly';
  describe(transformName, function () {
    it(testName, function () {
      runTest(dirName, transformName, options, testFilePrefix);
    });
  });
}