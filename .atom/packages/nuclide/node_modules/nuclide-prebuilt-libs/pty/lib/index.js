"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var Terminal;
if (os.platform() === 'win32') {
    Terminal = require('./windowsTerminal').WindowsTerminal;
}
else {
    Terminal = require('./unixTerminal').UnixTerminal;
}
function spawn(file, args, opt) {
    return new Terminal(file, args, opt);
}
exports.spawn = spawn;
;
function fork(file, args, opt) {
    return new Terminal(file, args, opt);
}
exports.fork = fork;
;
function createTerminal(file, args, opt) {
    return new Terminal(file, args, opt);
}
exports.createTerminal = createTerminal;
;
function open(options) {
    return Terminal.open(options);
}
exports.open = open;
//# sourceMappingURL=index.js.map