'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _helpers = require('./helpers');

var _fuzzaldrin = require('fuzzaldrin');

var _atom = require('atom');

var _atomLinter = require('atom-linter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = { config: { pathToFlowExecutable: { type: 'string',
      default: 'flow'
    }
  },
  activate: function activate() {
    var _this = this;

    console.log('activating autocomplete-flow');

    // getting custom value
    this.lastConfigError = {};
    this.subscriptions = new _atom.CompositeDisposable();
    this.cmdString = 'flow';
    this.subscriptions.add(atom.config.observe('autocomplete-flow.pathToFlowExecutable', function (pathToFlow) {
      _this.cmdString = pathToFlow || 'flow';
    }));
    if (atom.inDevMode()) {
      console.log('activating... autocomplete-flow');
    }
  },
  deactivate: function deactivate() {
    if (atom.inDevMode()) {
      console.log('deactivating... autocomplete-flow');
    }
    (0, _atomLinter.exec)(this.cmdString, ['stop'], {}).catch(function () {
      return null;
    });
    this.subscriptions.dispose();
  },
  getCompletionProvider: function getCompletionProvider() {
    var that = this;
    var provider = { selector: '.source.js, .source.js.jsx, .source.jsx',
      disableForSelector: '.source.js .comment, source.js .keyword',
      inclusionPriority: 1,
      excludeLowerPriority: true,
      getSuggestions: function getSuggestions(_ref) {
        var _this2 = this;

        var editor = _ref.editor;
        var bufferPosition = _ref.bufferPosition;
        var prefix = _ref.prefix;
        return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
          var file, currentContents, cursor, line, col, flowConfig, options, args, _ret, errorM;

          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (prefix) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt('return', []);

                case 2:
                  file = editor.getPath();
                  currentContents = editor.getText();
                  cursor = editor.getLastCursor();
                  line = cursor.getBufferRow();
                  col = cursor.getBufferColumn();
                  flowConfig = (0, _atomLinter.find)(file, '.flowconfig');

                  if (flowConfig) {
                    _context2.next = 11;
                    break;
                  }

                  if (!that.lastConfigError[file] || that.lastConfigError[file] + 5 * 60 * 1000 < Date.now()) {
                    atom.notifications.addWarning('[Autocomplete-Flow] Missing .flowconfig file.', { detail: 'To get started with Flow, run `flow init`.',
                      dismissable: true
                    });
                    that.lastConfigError[file] = Date.now();
                  }
                  return _context2.abrupt('return', []);

                case 11:
                  options = {};
                  args = ['autocomplete', '--json', file];

                  // const [cwd] = atom.project.relativizePath(file)

                  options.cwd = _path2.default.dirname(file); //cwd

                  _context2.prev = 14;
                  return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                    var stringWithACToken, result, replacementPrefix, candidates;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            stringWithACToken = (0, _helpers.insertAutocompleteToken)(currentContents, line, col);
                            _context.next = 3;
                            return (0, _helpers.promisedExec)(that.cmdString, args, options, stringWithACToken);

                          case 3:
                            result = _context.sent;

                            if (!(!result || !result.length)) {
                              _context.next = 6;
                              break;
                            }

                            return _context.abrupt('return', {
                              v: []
                            });

                          case 6:
                            // If it is just whitespace and punctuation, ignore it (this keeps us
                            // from eating leading dots).
                            replacementPrefix = /^[\s.]*$/.test(prefix) ? '' : prefix;
                            candidates = result.map(function (item) {
                              return (0, _helpers.processAutocompleteItem)(replacementPrefix, item);
                            });

                            // return candidates

                            return _context.abrupt('return', {
                              v: (0, _fuzzaldrin.filter)(candidates, replacementPrefix, { key: 'displayText' })
                            });

                          case 9:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this2);
                  })(), 't0', 16);

                case 16:
                  _ret = _context2.t0;

                  if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
                    _context2.next = 19;
                    break;
                  }

                  return _context2.abrupt('return', _ret.v);

                case 19:
                  _context2.next = 28;
                  break;

                case 21:
                  _context2.prev = 21;
                  _context2.t1 = _context2['catch'](14);
                  errorM = String(_context2.t1).toLowerCase();

                  if (!(errorM.includes('rechecking') || errorM.includes('launching') || errorM.includes('processing') || errorM.includes('starting') || errorM.includes('spawned') || errorM.includes('logs') || errorM.includes('initializing'))) {
                    _context2.next = 26;
                    break;
                  }

                  return _context2.abrupt('return', []);

                case 26:
                  console.log('[autocomplete-flow] ERROR:', _context2.t1);
                  return _context2.abrupt('return', []);

                case 28:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2, [[14, 21]]);
        }))();
      }
    };

    return provider;
  }
};