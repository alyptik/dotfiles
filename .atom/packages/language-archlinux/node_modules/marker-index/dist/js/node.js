"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = (function () {
  function Node(parent, leftExtent) {
    _classCallCheck(this, Node);

    this.parent = parent;
    this.left = null;
    this.right = null;
    this.leftExtent = leftExtent;
    this.leftMarkerIds = new Set();
    this.rightMarkerIds = new Set();
    this.startMarkerIds = new Set();
    this.endMarkerIds = new Set();
    this.priority = null;
    this.id = this.constructor.idCounter++;
  }

  _createClass(Node, [{
    key: "isMarkerEndpoint",
    value: function isMarkerEndpoint() {
      return this.startMarkerIds.size + this.endMarkerIds.size > 0;
    }
  }]);

  return Node;
})();

exports["default"] = Node;

Node.idCounter = 1;
module.exports = exports["default"];