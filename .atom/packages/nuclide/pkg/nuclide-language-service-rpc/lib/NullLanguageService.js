'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NullLanguageService = undefined;

var _rxjsBundlesRxMinJs = require('rxjs/bundles/Rx.min.js');

// An implementation of LanguageService which always returns no results.
// Useful for implementing aggregate language services.
class NullLanguageService {
  getDiagnostics(fileVersion) {
    return Promise.resolve(null);
  }

  observeDiagnostics() {
    return _rxjsBundlesRxMinJs.Observable.empty().publish();
  }

  getAutocompleteSuggestions(fileVersion, position, activatedManually, prefix) {
    return Promise.resolve(null);
  }

  getDefinition(fileVersion, position) {
    return Promise.resolve(null);
  }

  getDefinitionById(file, id) {
    return Promise.resolve(null);
  }

  findReferences(fileVersion, position) {
    return Promise.resolve(null);
  }

  getCoverage(filePath) {
    return Promise.resolve(null);
  }

  getOutline(fileVersion) {
    return Promise.resolve(null);
  }

  typeHint(fileVersion, position) {
    return Promise.resolve(null);
  }

  highlight(fileVersion, position) {
    return Promise.resolve(null);
  }

  formatSource(fileVersion, range) {
    return Promise.resolve(null);
  }

  formatEntireFile(fileVersion, range) {
    return Promise.resolve(null);
  }

  formatAtPosition(fileVersion, position, triggerCharacter) {
    return Promise.resolve(null);
  }

  getEvaluationExpression(fileVersion, position) {
    return Promise.resolve(null);
  }

  supportsSymbolSearch(directories) {
    return Promise.resolve(false);
  }

  symbolSearch(query, directories) {
    return Promise.resolve(null);
  }

  getProjectRoot(fileUri) {
    return Promise.resolve(null);
  }

  isFileInProject(fileUri) {
    return Promise.resolve(false);
  }

  dispose() {}
}
exports.NullLanguageService = NullLanguageService; /**
                                                    * Copyright (c) 2015-present, Facebook, Inc.
                                                    * All rights reserved.
                                                    *
                                                    * This source code is licensed under the license found in the LICENSE file in
                                                    * the root directory of this source tree.
                                                    *
                                                    * 
                                                    * @format
                                                    */