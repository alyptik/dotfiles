'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function findBinary(packageJsonPath) {
  var pack = JSON.parse(fs.readFileSync(packageJsonPath));

  // ABI versions 49, 50, 53 are only for Electron.
  // https://github.com/electron/electron/issues/5851
  var nodeAbi;
  switch (process.versions.modules) {
    case '49':
      nodeAbi = 'electron-v1.3';
      break;
    case '50':
      nodeAbi = 'electron-v1.4';
      break;
    case '53':
      nodeAbi = 'electron-v1.6';
      break;
    default:
      nodeAbi = 'node-v' + process.versions.modules;
  }

  var modulePath = pack.binary.module_path
    .replace('{module_name}', pack.binary.module_name)
    .replace('{version}', pack.version)
    .replace('{node_abi}', nodeAbi)
    .replace('{platform}', process.platform)
    .replace('{arch}', process.arch);

  var resolvedPath = path.join(
    path.dirname(packageJsonPath),
    modulePath,
    pack.binary.module_name + '.node'
  );

  return resolvedPath;
};
