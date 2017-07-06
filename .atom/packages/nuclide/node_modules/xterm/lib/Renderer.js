"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_REFRESH_FRAME_SKIP = 5;
var FLAGS;
(function (FLAGS) {
    FLAGS[FLAGS["BOLD"] = 1] = "BOLD";
    FLAGS[FLAGS["UNDERLINE"] = 2] = "UNDERLINE";
    FLAGS[FLAGS["BLINK"] = 4] = "BLINK";
    FLAGS[FLAGS["INVERSE"] = 8] = "INVERSE";
    FLAGS[FLAGS["INVISIBLE"] = 16] = "INVISIBLE";
})(FLAGS || (FLAGS = {}));
;
var brokenBold = null;
var Renderer = (function () {
    function Renderer(_terminal) {
        this._terminal = _terminal;
        this._refreshRowsQueue = [];
        this._refreshFramesSkipped = 0;
        this._refreshAnimationFrame = null;
        if (brokenBold === null) {
            brokenBold = checkBoldBroken(this._terminal.element);
        }
    }
    Renderer.prototype.queueRefresh = function (start, end) {
        this._refreshRowsQueue.push({ start: start, end: end });
        if (!this._refreshAnimationFrame) {
            this._refreshAnimationFrame = window.requestAnimationFrame(this._refreshLoop.bind(this));
        }
    };
    Renderer.prototype._refreshLoop = function () {
        var skipFrame = this._terminal.writeBuffer.length > 0 && this._refreshFramesSkipped++ <= MAX_REFRESH_FRAME_SKIP;
        if (skipFrame) {
            this._refreshAnimationFrame = window.requestAnimationFrame(this._refreshLoop.bind(this));
            return;
        }
        this._refreshFramesSkipped = 0;
        var start;
        var end;
        if (this._refreshRowsQueue.length > 4) {
            start = 0;
            end = this._terminal.rows - 1;
        }
        else {
            start = this._refreshRowsQueue[0].start;
            end = this._refreshRowsQueue[0].end;
            for (var i = 1; i < this._refreshRowsQueue.length; i++) {
                if (this._refreshRowsQueue[i].start < start) {
                    start = this._refreshRowsQueue[i].start;
                }
                if (this._refreshRowsQueue[i].end > end) {
                    end = this._refreshRowsQueue[i].end;
                }
            }
        }
        this._refreshRowsQueue = [];
        this._refreshAnimationFrame = null;
        this._refresh(start, end);
    };
    Renderer.prototype._refresh = function (start, end) {
        var x, y, i, line, out, ch, ch_width, width, data, attr, bg, fg, flags, row, parent, focused = document.activeElement;
        if (end - start >= this._terminal.rows / 2) {
            parent = this._terminal.element.parentNode;
            if (parent) {
                this._terminal.element.removeChild(this._terminal.rowContainer);
            }
        }
        width = this._terminal.cols;
        y = start;
        if (end >= this._terminal.rows) {
            this._terminal.log('`end` is too large. Most likely a bad CSR.');
            end = this._terminal.rows - 1;
        }
        for (; y <= end; y++) {
            row = y + this._terminal.ydisp;
            line = this._terminal.lines.get(row);
            if (!line || !this._terminal.children[y]) {
                continue;
            }
            out = '';
            if (this._terminal.y === y - (this._terminal.ybase - this._terminal.ydisp)
                && this._terminal.cursorState
                && !this._terminal.cursorHidden) {
                x = this._terminal.x;
            }
            else {
                x = -1;
            }
            attr = this._terminal.defAttr;
            i = 0;
            for (; i < width; i++) {
                if (!line[i]) {
                    continue;
                }
                data = line[i][0];
                ch = line[i][1];
                ch_width = line[i][2];
                if (!ch_width)
                    continue;
                if (i === x)
                    data = -1;
                if (data !== attr) {
                    if (attr !== this._terminal.defAttr) {
                        out += '</span>';
                    }
                    if (data !== this._terminal.defAttr) {
                        if (data === -1) {
                            out += '<span class="reverse-video terminal-cursor">';
                        }
                        else {
                            var classNames = [];
                            bg = data & 0x1ff;
                            fg = (data >> 9) & 0x1ff;
                            flags = data >> 18;
                            if (flags & FLAGS.BOLD) {
                                if (!brokenBold) {
                                    classNames.push('xterm-bold');
                                }
                                if (fg < 8)
                                    fg += 8;
                            }
                            if (flags & FLAGS.UNDERLINE) {
                                classNames.push('xterm-underline');
                            }
                            if (flags & FLAGS.BLINK) {
                                classNames.push('xterm-blink');
                            }
                            if (flags & FLAGS.INVERSE) {
                                bg = [fg, fg = bg][0];
                                if ((flags & 1) && fg < 8)
                                    fg += 8;
                            }
                            if (flags & FLAGS.INVISIBLE) {
                                classNames.push('xterm-hidden');
                            }
                            if (flags & FLAGS.INVERSE) {
                                if (bg === 257) {
                                    bg = 15;
                                }
                                if (fg === 256) {
                                    fg = 0;
                                }
                            }
                            if (bg < 256) {
                                classNames.push('xterm-bg-color-' + bg);
                            }
                            if (fg < 256) {
                                classNames.push('xterm-color-' + fg);
                            }
                            out += '<span';
                            if (classNames.length) {
                                out += ' class="' + classNames.join(' ') + '"';
                            }
                            out += '>';
                        }
                    }
                }
                if (ch_width === 2) {
                    out += '<span class="xterm-wide-char">';
                }
                switch (ch) {
                    case '&':
                        out += '&amp;';
                        break;
                    case '<':
                        out += '&lt;';
                        break;
                    case '>':
                        out += '&gt;';
                        break;
                    default:
                        if (ch <= ' ') {
                            out += '&nbsp;';
                        }
                        else {
                            out += ch;
                        }
                        break;
                }
                if (ch_width === 2) {
                    out += '</span>';
                }
                attr = data;
            }
            if (attr !== this._terminal.defAttr) {
                out += '</span>';
            }
            this._terminal.children[y].innerHTML = out;
        }
        if (parent) {
            this._terminal.element.appendChild(this._terminal.rowContainer);
        }
        this._terminal.emit('refresh', { element: this._terminal.element, start: start, end: end });
    };
    ;
    return Renderer;
}());
exports.Renderer = Renderer;
function checkBoldBroken(terminal) {
    var document = terminal.ownerDocument;
    var el = document.createElement('span');
    el.innerHTML = 'hello world';
    terminal.appendChild(el);
    var w1 = el.offsetWidth;
    var h1 = el.offsetHeight;
    el.style.fontWeight = 'bold';
    var w2 = el.offsetWidth;
    var h2 = el.offsetHeight;
    terminal.removeChild(el);
    return w1 !== w2 || h1 !== h2;
}

//# sourceMappingURL=Renderer.js.map
