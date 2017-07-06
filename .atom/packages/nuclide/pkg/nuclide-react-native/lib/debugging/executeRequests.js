'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeRequests = executeRequests;

var _featureConfig;

function _load_featureConfig() {
  return _featureConfig = _interopRequireDefault(require('nuclide-commons-atom/feature-config'));
}

var _process;

function _load_process() {
  return _process = require('../../../commons-node/process');
}

var _log4js;

function _load_log4js() {
  return _log4js = require('log4js');
}

var _nuclideUri;

function _load_nuclideUri() {
  return _nuclideUri = _interopRequireDefault(require('nuclide-commons/nuclideUri'));
}

var _rxjsBundlesRxMinJs = require('rxjs/bundles/Rx.min.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 * @format
 */

const logger = (0, (_log4js || _load_log4js()).getLogger)('nuclide-react-native');

/**
 * This function models the executor side of the debugging equation: it receives a stream of
 * instructions from the RN app, executes them, and emits a stream of results.
 */
function executeRequests(requests) {
  // Wait until we get the first request, then spawn a worker process for processing them.
  const workerProcess = requests.first().switchMap(createWorker).share();

  return workerProcess.switchMap(process => _rxjsBundlesRxMinJs.Observable.merge(_rxjsBundlesRxMinJs.Observable.of({ kind: 'pid', pid: process.pid }),
  // The messages we're receiving from the worker process.
  _rxjsBundlesRxMinJs.Observable.fromEvent(process, 'message'),
  // Send the incoming requests to the worker process for evaluation.
  requests.do(request => process.send(request)).ignoreElements(),
  // Pipe output from forked process. This just makes things easier to debug for us.
  (0, (_process || _load_process()).getOutputStream)(process, {
    /* TODO(T17353599) */isExitError: () => false
  }).do(message => {
    switch (message.kind) {
      case 'error':
        logger.error(message.error.message);
        return;
      case 'stderr':
      case 'stdout':
        logger.info(message.data.toString());
        return;
    }
  }).ignoreElements())).share();
}

function createWorker() {
  return (0, (_process || _load_process()).fork)(
  // TODO: The node location/path needs to be more configurable. We need to figure out a way to
  //   handle this across the board.
  (_nuclideUri || _load_nuclideUri()).default.join(__dirname, 'executor.js'), [], {
    execArgv: ['--debug-brk'],
    execPath: (_featureConfig || _load_featureConfig()).default.get('nuclide-react-native.pathToNode'),
    silent: true
  });
}