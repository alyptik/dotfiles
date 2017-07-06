"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prepareTextForClipboard(text) {
    var space = String.fromCharCode(32), nonBreakingSpace = String.fromCharCode(160), allNonBreakingSpaces = new RegExp(nonBreakingSpace, 'g'), processedText = text.split('\n').map(function (line) {
        var processedLine = line.replace(/\s+$/g, '').replace(allNonBreakingSpaces, space);
        return processedLine;
    }).join('\n');
    return processedText;
}
exports.prepareTextForClipboard = prepareTextForClipboard;
function copyHandler(ev, term) {
    var copiedText = window.getSelection().toString(), text = prepareTextForClipboard(copiedText);
    if (term.browser.isMSIE) {
        window.clipboardData.setData('Text', text);
    }
    else {
        ev.clipboardData.setData('text/plain', text);
    }
    ev.preventDefault();
}
exports.copyHandler = copyHandler;
function pasteHandler(ev, term) {
    ev.stopPropagation();
    var text;
    var dispatchPaste = function (text) {
        term.handler(text);
        term.textarea.value = '';
        return term.cancel(ev);
    };
    if (term.browser.isMSIE) {
        if (window.clipboardData) {
            text = window.clipboardData.getData('Text');
            dispatchPaste(text);
        }
    }
    else {
        if (ev.clipboardData) {
            text = ev.clipboardData.getData('text/plain');
            dispatchPaste(text);
        }
    }
}
exports.pasteHandler = pasteHandler;
function rightClickHandler(ev, term) {
    var s = document.getSelection(), selectedText = prepareTextForClipboard(s.toString()), clickIsOnSelection = false, x = ev.clientX, y = ev.clientY;
    if (s.rangeCount) {
        var r = s.getRangeAt(0), cr = r.getClientRects();
        for (var i = 0; i < cr.length; i++) {
            var rect = cr[i];
            clickIsOnSelection = ((x > rect.left) && (x < rect.right) &&
                (y > rect.top) && (y < rect.bottom));
            if (clickIsOnSelection) {
                break;
            }
        }
        if (selectedText.match(/^\s$/) || !selectedText.length) {
            clickIsOnSelection = false;
        }
    }
    if (!clickIsOnSelection) {
        term.textarea.style.position = 'fixed';
        term.textarea.style.width = '20px';
        term.textarea.style.height = '20px';
        term.textarea.style.left = (x - 10) + 'px';
        term.textarea.style.top = (y - 10) + 'px';
        term.textarea.style.zIndex = '1000';
        term.textarea.focus();
        setTimeout(function () {
            term.textarea.style.position = null;
            term.textarea.style.width = null;
            term.textarea.style.height = null;
            term.textarea.style.left = null;
            term.textarea.style.top = null;
            term.textarea.style.zIndex = null;
        }, 4);
    }
}
exports.rightClickHandler = rightClickHandler;

//# sourceMappingURL=Clipboard.js.map
