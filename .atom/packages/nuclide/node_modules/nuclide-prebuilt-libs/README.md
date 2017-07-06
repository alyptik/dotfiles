# nuclide-prebuilt-libs

[![Build Status](https://travis-ci.org/facebooknuclide/nuclide-prebuilt-libs.svg?branch=master)](https://travis-ci.org/facebooknuclide/nuclide-prebuilt-libs)

This repo exists to build Nuclide's binary dependencies for various architectures.

## Usage in application code

```js
const ctags = require('nuclide-prebuilt-libs/ctags');
const fuzzyNative = require('nuclide-prebuilt-libs/fuzzy-native');
const ptyjs = require('nuclide-prebuilt-libs/pty');
```

## Publishing `nuclide-prebuilt-libs`

1. Bump the `version` in the sub-package you modified. (This is only for bookkeeping purposes).
2. Run `npm version patch`.
3. Push the base package version bump and release tag with `git push --follow-tags`.
4. Wait for travis to build and upload the release artifacts.
5. To test your npm release: Run `./prepublish && npm pack`
6. Run `npm publish`.

## Things to know about sub-packages

* They're _semi_ independent in that you can run `npm install` inside any of them to do work on one of them.
* The empty `.npmignore` in the sub-packages and the `"files"` field in the root package are super important.
* Be careful not to fall into https://github.com/atom/atom/blob/128f661/src/package.coffee#L486-L503.
* The `"dependencies"` in the sub-packages **DO NOT** get installed when someone installs `nuclide-prebuilt-libs`.
