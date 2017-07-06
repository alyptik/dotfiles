"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var terminal_1 = require("./terminal");
var windowsPtyAgent_1 = require("./windowsPtyAgent");
var utils_1 = require("./utils");
var DEFAULT_FILE = 'cmd.exe';
var DEFAULT_NAME = 'Windows Shell';
var WindowsTerminal = (function (_super) {
    __extends(WindowsTerminal, _super);
    function WindowsTerminal(file, args, opt) {
        var _this = _super.call(this) || this;
        args = args || [];
        file = file || DEFAULT_FILE;
        opt = opt || {};
        opt.env = opt.env || process.env;
        var env = utils_1.assign({}, opt.env);
        var cols = opt.cols || terminal_1.Terminal.DEFAULT_COLS;
        var rows = opt.rows || terminal_1.Terminal.DEFAULT_ROWS;
        var cwd = opt.cwd || process.cwd();
        var name = opt.name || env.TERM || DEFAULT_NAME;
        var parsedEnv = _this._parseEnv(env);
        _this.isReady = false;
        _this.deferreds = [];
        _this.agent = new windowsPtyAgent_1.WindowsPtyAgent(file, args, parsedEnv, cwd, cols, rows, false);
        _this.socket = _this.agent.outSocket;
        _this.pid = _this.agent.pid;
        _this.fd = _this.agent.fd;
        _this.pty = _this.agent.pty;
        _this.socket.on('ready_datapipe', function () {
            ['connect', 'data', 'end', 'timeout', 'drain'].forEach(function (event) {
                _this.socket.on(event, function (data) {
                    if (!_this.isReady && event === 'data') {
                        _this.isReady = true;
                        _this.deferreds.forEach(function (fn) {
                            fn.run();
                        });
                        _this.deferreds = [];
                    }
                });
            });
            _this.socket.resume();
            _this.socket.on('error', function (err) {
                _this._close();
                if (err.code) {
                    if (~err.code.indexOf('errno 5') || ~err.code.indexOf('EIO'))
                        return;
                }
                if (_this.listeners('error').length < 2) {
                    throw err;
                }
            });
            _this.socket.on('close', function () {
                _this.emit('exit', null);
                _this._close();
            });
        });
        _this.file = file;
        _this.name = name;
        _this.readable = true;
        _this.writable = true;
        return _this;
    }
    WindowsTerminal.open = function (options) {
        throw new Error('open() not supported on windows, use Fork() instead.');
    };
    WindowsTerminal.prototype.write = function (data) {
        var _this = this;
        this._defer(function () {
            _this.agent.inSocket.write(data);
        });
    };
    WindowsTerminal.prototype.resize = function (cols, rows) {
        var _this = this;
        this._defer(function () {
            _this.agent.resize(cols, rows);
        });
    };
    WindowsTerminal.prototype.destroy = function () {
        var _this = this;
        this._defer(function () {
            _this.kill();
        });
    };
    WindowsTerminal.prototype.kill = function (signal) {
        var _this = this;
        this._defer(function () {
            if (signal) {
                throw new Error('Signals not supported on windows.');
            }
            _this._close();
            _this.agent.kill();
        });
    };
    WindowsTerminal.prototype._defer = function (deferredFn) {
        var _this = this;
        if (!(this instanceof WindowsTerminal)) {
            throw new Error('Must be instanceof WindowsTerminal');
        }
        if (this.isReady) {
            deferredFn.apply(this, null);
            return;
        }
        this.deferreds.push({
            run: function () { return deferredFn.apply(_this, null); }
        });
    };
    Object.defineProperty(WindowsTerminal.prototype, "process", {
        get: function () { return this.name; },
        enumerable: true,
        configurable: true
    });
    return WindowsTerminal;
}(terminal_1.Terminal));
exports.WindowsTerminal = WindowsTerminal;
//# sourceMappingURL=windowsTerminal.js.map