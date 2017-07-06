/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/**
 * We have to use our own preprocessor because we're using babel5.
 */

const babel = require('babel-core');

module.exports = {
  process(src, filename) {
    return babel.transform(src, {
      filename,
      retainLines: true,
    }).code;
  },
};
