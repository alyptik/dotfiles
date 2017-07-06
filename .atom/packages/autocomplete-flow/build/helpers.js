'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.insertAutocompleteToken = insertAutocompleteToken;
exports.promisedExec = promisedExec;
exports.processAutocompleteItem = processAutocompleteItem;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _atomLinter = require('atom-linter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function insertAutocompleteToken(contents, line, col) {
  var lines = contents.split('\n');
  var theLine = lines[line];
  theLine = theLine.substring(0, col) + 'AUTO332' + theLine.substring(col);
  lines[line] = theLine;
  return lines.join('\n');
}

function promisedExec(cmdString, args, options, file) {
  return (0, _atomLinter.exec)(cmdString, args, (0, _assign2.default)({}, options, { stdin: file })).then(JSON.parse).then(function (obj) {
    return Array.isArray(obj) ? obj : obj.result;
  });
}

function processAutocompleteItem(replacementPrefix, flowItem) {
  var result = { description: flowItem['type'],
    displayText: flowItem['name'],
    replacementPrefix: replacementPrefix
  };
  var funcDetails = flowItem['func_details'];
  if (funcDetails) {
    // The parameters turned into snippet strings.
    var snippetParamStrings = funcDetails['params'].map(function (param, i) {
      return '${' + (i + 1) + ':' + param['name'] + '}';
    });
    // The parameters in human-readable form for use on the right label.
    var rightParamStrings = funcDetails['params'].map(function (param) {
      return param['name'] + ': ' + param['type'];
    });
    result = (0, _extends3.default)({}, result, { leftLabel: funcDetails['return_type'],
      rightLabel: '(' + rightParamStrings.join(', ') + ')',
      snippet: flowItem['name'] + '(' + snippetParamStrings.join(', ') + ')',
      type: 'function'
    });
  } else {
    result = (0, _extends3.default)({}, result, { rightLabel: flowItem['type'],
      text: flowItem['name']
    });
  }
  return result;
}