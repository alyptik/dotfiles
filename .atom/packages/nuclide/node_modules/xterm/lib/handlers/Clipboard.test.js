"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Clipboard = require("./Clipboard");
describe('evaluateCopiedTextProcessing', function () {
    it('should strip trailing whitespaces and replace nbsps with spaces', function () {
        var nonBreakingSpace = String.fromCharCode(160), copiedText = 'echo' + nonBreakingSpace + 'hello' + nonBreakingSpace, processedText = Clipboard.prepareTextForClipboard(copiedText);
        chai_1.assert.equal(processedText.match(/\s+$/), null);
        chai_1.assert.equal(processedText.indexOf(nonBreakingSpace), -1);
    });
});

//# sourceMappingURL=Clipboard.test.js.map
