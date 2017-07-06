'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _helpers = require('./helpers');

var _pointHelpers = require('./point-helpers');

var Iterator = (function () {
  function Iterator(markerIndex) {
    _classCallCheck(this, Iterator);

    this.markerIndex = markerIndex;
  }

  _createClass(Iterator, [{
    key: 'reset',
    value: function reset() {
      this.currentNode = this.markerIndex.root;
      this.currentNodePosition = this.currentNode ? this.currentNode.leftExtent : null;
      this.leftAncestorPosition = { row: 0, column: 0 };
      this.rightAncestorPosition = { row: Infinity, column: Infinity };
      this.leftAncestorPositionStack = [];
      this.rightAncestorPositionStack = [];
    }
  }, {
    key: 'insertMarkerStart',
    value: function insertMarkerStart(markerId, startPosition, endPosition) {
      this.reset();

      if (!this.currentNode) {
        var node = new _node2['default'](null, startPosition);
        this.markerIndex.root = node;
        return node;
      }

      while (true) {
        var comparison = (0, _pointHelpers.compare)(startPosition, this.currentNodePosition);
        if (comparison === 0) {
          this.markRight(markerId, startPosition, endPosition);
          return this.currentNode;
        } else if (comparison < 0) {
          this.markRight(markerId, startPosition, endPosition);
          if (this.currentNode.left) {
            this.descendLeft();
          } else {
            this.insertLeftChild(startPosition);
            this.descendLeft();
            this.markRight(markerId, startPosition, endPosition);
            return this.currentNode;
          }
        } else {
          // startPosition > this.currentNodePosition
          if (this.currentNode.right) {
            this.descendRight();
          } else {
            this.insertRightChild(startPosition);
            this.descendRight();
            this.markRight(markerId, startPosition, endPosition);
            return this.currentNode;
          }
        }
      }
    }
  }, {
    key: 'insertMarkerEnd',
    value: function insertMarkerEnd(markerId, startPosition, endPosition) {
      this.reset();

      if (!this.currentNode) {
        var node = new _node2['default'](null, endPosition);
        this.markerIndex.root = node;
        return node;
      }

      while (true) {
        var comparison = (0, _pointHelpers.compare)(endPosition, this.currentNodePosition);
        if (comparison === 0) {
          this.markLeft(markerId, startPosition, endPosition);
          return this.currentNode;
        } else if (comparison < 0) {
          if (this.currentNode.left) {
            this.descendLeft();
          } else {
            this.insertLeftChild(endPosition);
            this.descendLeft();
            this.markLeft(markerId, startPosition, endPosition);
            return this.currentNode;
          }
        } else {
          // endPosition > this.currentNodePosition
          this.markLeft(markerId, startPosition, endPosition);
          if (this.currentNode.right) {
            this.descendRight();
          } else {
            this.insertRightChild(endPosition);
            this.descendRight();
            this.markLeft(markerId, startPosition, endPosition);
            return this.currentNode;
          }
        }
      }
    }
  }, {
    key: 'insertSpliceBoundary',
    value: function insertSpliceBoundary(position, isInsertionEnd) {
      this.reset();

      while (true) {
        var comparison = (0, _pointHelpers.compare)(position, this.currentNodePosition);
        if (comparison === 0 && !isInsertionEnd) {
          return this.currentNode;
        } else if (comparison < 0) {
          if (this.currentNode.left) {
            this.descendLeft();
          } else {
            this.insertLeftChild(position);
            return this.currentNode.left;
          }
        } else {
          // position > this.currentNodePosition
          if (this.currentNode.right) {
            this.descendRight();
          } else {
            this.insertRightChild(position);
            return this.currentNode.right;
          }
        }
      }
    }
  }, {
    key: 'findIntersecting',
    value: function findIntersecting(start, end, resultSet) {
      this.reset();
      if (!this.currentNode) return;

      while (true) {
        this.cacheNodePosition();
        if ((0, _pointHelpers.compare)(start, this.currentNodePosition) < 0) {
          if (this.currentNode.left) {
            this.checkIntersection(start, end, resultSet);
            this.descendLeft();
          } else {
            break;
          }
        } else {
          if (this.currentNode.right) {
            this.checkIntersection(start, end, resultSet);
            this.descendRight();
          } else {
            break;
          }
        }
      }

      do {
        this.checkIntersection(start, end, resultSet);
        this.moveToSuccessor();
        this.cacheNodePosition();
      } while (this.currentNode && (0, _pointHelpers.compare)(this.currentNodePosition, end) <= 0);
    }
  }, {
    key: 'findContaining',
    value: function findContaining(position, resultSet) {
      this.reset();
      if (!this.currentNode) return;

      while (true) {
        this.checkIntersection(position, position, resultSet);
        this.cacheNodePosition();

        if ((0, _pointHelpers.compare)(position, this.currentNodePosition) < 0) {
          if (this.currentNode.left) {
            this.descendLeft();
          } else {
            break;
          }
        } else {
          if (this.currentNode.right) {
            this.descendRight();
          } else {
            break;
          }
        }
      }
    }
  }, {
    key: 'findContainedIn',
    value: function findContainedIn(start, end, resultSet) {
      this.reset();
      if (!this.currentNode) return;

      this.seekToFirstNodeGreaterThanOrEqualTo(start);

      var started = new Set();
      while (this.currentNode && (0, _pointHelpers.compare)(this.currentNodePosition, end) <= 0) {
        (0, _helpers.addToSet)(started, this.currentNode.startMarkerIds);
        this.currentNode.endMarkerIds.forEach(function (markerId) {
          if (started.has(markerId)) {
            resultSet.add(markerId);
          }
        });
        this.cacheNodePosition();
        this.moveToSuccessor();
      }
    }
  }, {
    key: 'findStartingIn',
    value: function findStartingIn(start, end, resultSet) {
      this.reset();
      if (!this.currentNode) return;

      this.seekToFirstNodeGreaterThanOrEqualTo(start);

      while (this.currentNode && (0, _pointHelpers.compare)(this.currentNodePosition, end) <= 0) {
        (0, _helpers.addToSet)(resultSet, this.currentNode.startMarkerIds);
        this.cacheNodePosition();
        this.moveToSuccessor();
      }
    }
  }, {
    key: 'findEndingIn',
    value: function findEndingIn(start, end, resultSet) {
      this.reset();
      if (!this.currentNode) return;

      this.seekToFirstNodeGreaterThanOrEqualTo(start);

      while (this.currentNode && (0, _pointHelpers.compare)(this.currentNodePosition, end) <= 0) {
        (0, _helpers.addToSet)(resultSet, this.currentNode.endMarkerIds);
        this.cacheNodePosition();
        this.moveToSuccessor();
      }
    }
  }, {
    key: 'dump',
    value: function dump() {
      var _this = this;

      this.reset();

      while (this.currentNode && this.currentNode.left) {
        this.cacheNodePosition();
        this.descendLeft();
      }

      var snapshot = {};

      while (this.currentNode) {
        this.currentNode.startMarkerIds.forEach(function (markerId) {
          snapshot[markerId] = { start: _this.currentNodePosition, end: null };
        });

        this.currentNode.endMarkerIds.forEach(function (markerId) {
          snapshot[markerId].end = _this.currentNodePosition;
        });

        this.cacheNodePosition();
        this.moveToSuccessor();
      }

      return snapshot;
    }
  }, {
    key: 'seekToFirstNodeGreaterThanOrEqualTo',
    value: function seekToFirstNodeGreaterThanOrEqualTo(position) {
      while (true) {
        var comparison = (0, _pointHelpers.compare)(position, this.currentNodePosition);

        this.cacheNodePosition();
        if (comparison === 0) {
          break;
        } else if (comparison < 0) {
          if (this.currentNode.left) {
            this.descendLeft();
          } else {
            break;
          }
        } else {
          if (this.currentNode.right) {
            this.descendRight();
          } else {
            break;
          }
        }
      }

      if ((0, _pointHelpers.compare)(this.currentNodePosition, position) < 0) this.moveToSuccessor();
    }
  }, {
    key: 'markLeft',
    value: function markLeft(markerId, startPosition, endPosition) {
      if (!(0, _pointHelpers.isZero)(this.currentNodePosition) && (0, _pointHelpers.compare)(startPosition, this.leftAncestorPosition) <= 0 && (0, _pointHelpers.compare)(this.currentNodePosition, endPosition) <= 0) {
        this.currentNode.leftMarkerIds.add(markerId);
      }
    }
  }, {
    key: 'markRight',
    value: function markRight(markerId, startPosition, endPosition) {
      if ((0, _pointHelpers.compare)(this.leftAncestorPosition, startPosition) < 0 && (0, _pointHelpers.compare)(startPosition, this.currentNodePosition) <= 0 && (0, _pointHelpers.compare)(this.rightAncestorPosition, endPosition) <= 0) {
        this.currentNode.rightMarkerIds.add(markerId);
      }
    }
  }, {
    key: 'ascend',
    value: function ascend() {
      if (this.currentNode.parent) {
        if (this.currentNode.parent.left === this.currentNode) {
          this.currentNodePosition = this.rightAncestorPosition;
        } else {
          this.currentNodePosition = this.leftAncestorPosition;
        }
        this.leftAncestorPosition = this.leftAncestorPositionStack.pop();
        this.rightAncestorPosition = this.rightAncestorPositionStack.pop();
        this.currentNode = this.currentNode.parent;
      } else {
        this.currentNode = null;
        this.currentNodePosition = null;
        this.leftAncestorPosition = { row: 0, column: 0 };
        this.rightAncestorPosition = { row: Infinity, column: Infinity };
      }
    }
  }, {
    key: 'descendLeft',
    value: function descendLeft() {
      this.leftAncestorPositionStack.push(this.leftAncestorPosition);
      this.rightAncestorPositionStack.push(this.rightAncestorPosition);

      this.rightAncestorPosition = this.currentNodePosition;
      this.currentNode = this.currentNode.left;
      this.currentNodePosition = (0, _pointHelpers.traverse)(this.leftAncestorPosition, this.currentNode.leftExtent);
    }
  }, {
    key: 'descendRight',
    value: function descendRight() {
      this.leftAncestorPositionStack.push(this.leftAncestorPosition);
      this.rightAncestorPositionStack.push(this.rightAncestorPosition);

      this.leftAncestorPosition = this.currentNodePosition;
      this.currentNode = this.currentNode.right;
      this.currentNodePosition = (0, _pointHelpers.traverse)(this.leftAncestorPosition, this.currentNode.leftExtent);
    }
  }, {
    key: 'moveToSuccessor',
    value: function moveToSuccessor() {
      if (!this.currentNode) return;

      if (this.currentNode.right) {
        this.descendRight();
        while (this.currentNode.left) {
          this.descendLeft();
        }
      } else {
        while (this.currentNode.parent && this.currentNode.parent.right === this.currentNode) {
          this.ascend();
        }
        this.ascend();
      }
    }
  }, {
    key: 'insertLeftChild',
    value: function insertLeftChild(position) {
      this.currentNode.left = new _node2['default'](this.currentNode, (0, _pointHelpers.traversal)(position, this.leftAncestorPosition));
    }
  }, {
    key: 'insertRightChild',
    value: function insertRightChild(position) {
      this.currentNode.right = new _node2['default'](this.currentNode, (0, _pointHelpers.traversal)(position, this.currentNodePosition));
    }
  }, {
    key: 'cacheNodePosition',
    value: function cacheNodePosition() {
      this.markerIndex.nodePositionCache.set(this.currentNode, this.currentNodePosition);
    }
  }, {
    key: 'checkIntersection',
    value: function checkIntersection(start, end, resultSet) {
      if ((0, _pointHelpers.compare)(this.leftAncestorPosition, end) <= 0 && (0, _pointHelpers.compare)(start, this.currentNodePosition) <= 0) {
        (0, _helpers.addToSet)(resultSet, this.currentNode.leftMarkerIds);
      }

      if ((0, _pointHelpers.compare)(start, this.currentNodePosition) <= 0 && (0, _pointHelpers.compare)(this.currentNodePosition, end) <= 0) {
        (0, _helpers.addToSet)(resultSet, this.currentNode.startMarkerIds);
        (0, _helpers.addToSet)(resultSet, this.currentNode.endMarkerIds);
      }

      if ((0, _pointHelpers.compare)(this.currentNodePosition, end) <= 0 && (0, _pointHelpers.compare)(start, this.rightAncestorPosition) <= 0) {
        (0, _helpers.addToSet)(resultSet, this.currentNode.rightMarkerIds);
      }
    }
  }]);

  return Iterator;
})();

exports['default'] = Iterator;
module.exports = exports['default'];