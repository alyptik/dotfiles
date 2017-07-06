(function() {
  var isCombinedCharacter, isCombiningCharacter, isHighSurrogate, isLowSurrogate, isSurrogatePair, isVariationSelector, isVariationSequence;

  module.exports = function(character1, character2) {
    var charCodeA, charCodeB;
    charCodeA = character1.charCodeAt(0);
    charCodeB = character2.charCodeAt(0);
    return isSurrogatePair(charCodeA, charCodeB) || isVariationSequence(charCodeA, charCodeB) || isCombinedCharacter(charCodeA, charCodeB);
  };

  isCombinedCharacter = function(charCodeA, charCodeB) {
    return !isCombiningCharacter(charCodeA) && isCombiningCharacter(charCodeB);
  };

  isSurrogatePair = function(charCodeA, charCodeB) {
    return isHighSurrogate(charCodeA) && isLowSurrogate(charCodeB);
  };

  isVariationSequence = function(charCodeA, charCodeB) {
    return !isVariationSelector(charCodeA) && isVariationSelector(charCodeB);
  };

  isHighSurrogate = function(charCode) {
    return (0xD800 <= charCode && charCode <= 0xDBFF);
  };

  isLowSurrogate = function(charCode) {
    return (0xDC00 <= charCode && charCode <= 0xDFFF);
  };

  isVariationSelector = function(charCode) {
    return (0xFE00 <= charCode && charCode <= 0xFE0F);
  };

  isCombiningCharacter = function(charCode) {
    return (0x0300 <= charCode && charCode <= 0x036F) || (0x1AB0 <= charCode && charCode <= 0x1AFF) || (0x1DC0 <= charCode && charCode <= 0x1DFF) || (0x20D0 <= charCode && charCode <= 0x20FF) || (0xFE20 <= charCode && charCode <= 0xFE2F);
  };

}).call(this);
