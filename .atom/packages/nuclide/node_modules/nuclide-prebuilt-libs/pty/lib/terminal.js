"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var Terminal = (function () {
    function Terminal() {
        this._internalee = new events_1.EventEmitter();
    }
    Terminal.prototype.end = function (data) {
        this.socket.end(data);
    };
    Terminal.prototype.pipe = function (dest, options) {
        return this.socket.pipe(dest, options);
    };
    Terminal.prototype.pause = function () {
        return this.socket.pause();
    };
    Terminal.prototype.resume = function () {
        return this.socket.resume();
    };
    Terminal.prototype.setEncoding = function (encoding) {
        if (this.socket._decoder) {
            delete this.socket._decoder;
        }
        if (encoding) {
            this.socket.setEncoding(encoding);
        }
    };
    Terminal.prototype.addListener = function (type, listener) { this.on(type, listener); };
    Terminal.prototype.on = function (type, listener) {
        if (type === 'close') {
            this._internalee.on('close', listener);
            return;
        }
        this.socket.on(type, listener);
    };
    Terminal.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (event === 'close') {
            return this._internalee.emit.apply(this._internalee, arguments);
        }
        return this.socket.emit.apply(this.socket, arguments);
    };
    Terminal.prototype.listeners = function (type) {
        return this.socket.listeners(type);
    };
    Terminal.prototype.removeListener = function (type, listener) {
        this.socket.removeListener(type, listener);
    };
    Terminal.prototype.removeAllListeners = function (type) {
        this.socket.removeAllListeners(type);
    };
    Terminal.prototype.once = function (type, listener) {
        this.socket.once(type, listener);
    };
    Terminal.prototype.redraw = function () {
        var _this = this;
        var cols = this.cols;
        var rows = this.rows;
        this.resize(cols + 1, rows + 1);
        setTimeout(function () { return _this.resize(cols, rows); }, 30);
    };
    Terminal.prototype._close = function () {
        this.socket.writable = false;
        this.socket.readable = false;
        this.write = function () { };
        this.end = function () { };
        this.writable = false;
        this.readable = false;
    };
    Terminal.prototype._parseEnv = function (env) {
        var keys = Object.keys(env || {});
        var pairs = [];
        for (var i = 0; i < keys.length; i++) {
            pairs.push(keys[i] + '=' + env[keys[i]]);
        }
        return pairs;
    };
    return Terminal;
}());
Terminal.DEFAULT_COLS = 80;
Terminal.DEFAULT_ROWS = 24;
exports.Terminal = Terminal;
//# sourceMappingURL=terminal.js.map