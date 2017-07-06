'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _randomSeed = require('random-seed');

var _randomSeed2 = _interopRequireDefault(_randomSeed);

var _iterator = require('./iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _helpers = require('./helpers');

var _pointHelpers = require('./point-helpers');

var MAX_PRIORITY = 2147483647; // max 32 bit signed int (unboxed in v8)

var MarkerIndex = (function () {
  function MarkerIndex(seed) {
    _classCallCheck(this, MarkerIndex);

    this.random = new _randomSeed2['default'](seed);
    this.root = null;
    this.startNodesById = {};
    this.endNodesById = {};
    this.iterator = new _iterator2['default'](this);
    this.exclusiveMarkers = new Set();
    this.nodePositionCache = new Map();
  }

  _createClass(MarkerIndex, [{
    key: 'dump',
    value: function dump() {
      return this.iterator.dump();
    }
  }, {
    key: 'getRange',
    value: function getRange(markerId) {
      return [this.getStart(markerId), this.getEnd(markerId)];
    }
  }, {
    key: 'getStart',
    value: function getStart(markerId) {
      return this.getNodePosition(this.startNodesById[markerId]);
    }
  }, {
    key: 'getEnd',
    value: function getEnd(markerId) {
      return this.getNodePosition(this.endNodesById[markerId]);
    }
  }, {
    key: 'compare',
    value: function compare(markerId1, markerId2) {
      switch ((0, _pointHelpers.compare)(this.getStart(markerId1), this.getStart(markerId2))) {
        case -1:
          return -1;
        case 1:
          return 1;
        default:
          return (0, _pointHelpers.compare)(this.getEnd(markerId2), this.getEnd(markerId1));
      }
    }
  }, {
    key: 'insert',
    value: function insert(markerId, start, end) {
      var startNode = this.iterator.insertMarkerStart(markerId, start, end);
      var endNode = this.iterator.insertMarkerEnd(markerId, start, end);

      this.nodePositionCache.set(startNode, start);
      this.nodePositionCache.set(endNode, end);

      startNode.startMarkerIds.add(markerId);
      endNode.endMarkerIds.add(markerId);

      startNode.priority = this.random(MAX_PRIORITY);
      this.bubbleNodeUp(startNode);

      endNode.priority = this.random(MAX_PRIORITY);
      this.bubbleNodeUp(endNode);

      this.startNodesById[markerId] = startNode;
      this.endNodesById[markerId] = endNode;
    }
  }, {
    key: 'setExclusive',
    value: function setExclusive(markerId, exclusive) {
      if (exclusive) {
        this.exclusiveMarkers.add(markerId);
      } else {
        this.exclusiveMarkers['delete'](markerId);
      }
    }
  }, {
    key: 'isExclusive',
    value: function isExclusive(markerId) {
      return this.exclusiveMarkers.has(markerId);
    }
  }, {
    key: 'delete',
    value: function _delete(markerId) {
      var startNode = this.startNodesById[markerId];
      var endNode = this.endNodesById[markerId];

      var node = startNode;
      while (node) {
        node.rightMarkerIds['delete'](markerId);
        node = node.parent;
      }

      node = endNode;
      while (node) {
        node.leftMarkerIds['delete'](markerId);
        node = node.parent;
      }

      startNode.startMarkerIds['delete'](markerId);
      endNode.endMarkerIds['delete'](markerId);

      if (!startNode.isMarkerEndpoint()) {
        this.deleteNode(startNode);
      }

      if (endNode !== startNode && !endNode.isMarkerEndpoint()) {
        this.deleteNode(endNode);
      }

      delete this.startNodesById[markerId];
      delete this.endNodesById[markerId];
    }
  }, {
    key: 'splice',
    value: function splice(start, oldExtent, newExtent) {
      var _this = this;

      this.nodePositionCache.clear();

      var invalidated = {
        touch: new Set(),
        inside: new Set(),
        overlap: new Set(),
        surround: new Set()
      };

      if (!this.root || (0, _pointHelpers.isZero)(oldExtent) && (0, _pointHelpers.isZero)(newExtent)) return invalidated;

      var isInsertion = (0, _pointHelpers.isZero)(oldExtent);
      var startNode = this.iterator.insertSpliceBoundary(start, false);
      var endNode = this.iterator.insertSpliceBoundary((0, _pointHelpers.traverse)(start, oldExtent), isInsertion);

      startNode.priority = -1;
      this.bubbleNodeUp(startNode);
      endNode.priority = -2;
      this.bubbleNodeUp(endNode);

      var startingInsideSplice = new Set();
      var endingInsideSplice = new Set();

      if (isInsertion) {
        startNode.startMarkerIds.forEach(function (markerId) {
          if (_this.isExclusive(markerId)) {
            startNode.startMarkerIds['delete'](markerId);
            startNode.rightMarkerIds['delete'](markerId);
            endNode.startMarkerIds.add(markerId);
            _this.startNodesById[markerId] = endNode;
          }
        });

        startNode.endMarkerIds.forEach(function (markerId) {
          if (!_this.isExclusive(markerId) || endNode.startMarkerIds.has(markerId)) {
            startNode.endMarkerIds['delete'](markerId);
            if (!endNode.startMarkerIds.has(markerId)) {
              startNode.rightMarkerIds.add(markerId);
            }
            endNode.endMarkerIds.add(markerId);
            _this.endNodesById[markerId] = endNode;
          }
        });
      } else {
        this.getStartingAndEndingMarkersWithinSubtree(startNode.right, startingInsideSplice, endingInsideSplice);

        endingInsideSplice.forEach(function (markerId) {
          endNode.endMarkerIds.add(markerId);
          if (!startingInsideSplice.has(markerId)) {
            startNode.rightMarkerIds.add(markerId);
          }
          _this.endNodesById[markerId] = endNode;
        });

        endNode.endMarkerIds.forEach(function (markerId) {
          if (_this.isExclusive(markerId) && !endNode.startMarkerIds.has(markerId)) {
            endingInsideSplice.add(markerId);
          }
        });

        startingInsideSplice.forEach(function (markerId) {
          endNode.startMarkerIds.add(markerId);
          _this.startNodesById[markerId] = endNode;
        });

        startNode.startMarkerIds.forEach(function (markerId) {
          if (_this.isExclusive(markerId) && !startNode.endMarkerIds.has(markerId)) {
            startNode.startMarkerIds['delete'](markerId);
            startNode.rightMarkerIds['delete'](markerId);
            endNode.startMarkerIds.add(markerId);
            _this.startNodesById[markerId] = endNode;
            startingInsideSplice.add(markerId);
          }
        });
      }

      this.populateSpliceInvalidationSets(invalidated, startNode, endNode, startingInsideSplice, endingInsideSplice);

      startNode.right = null;
      endNode.leftExtent = (0, _pointHelpers.traverse)(start, newExtent);

      if ((0, _pointHelpers.compare)(startNode.leftExtent, endNode.leftExtent) === 0) {
        endNode.startMarkerIds.forEach(function (markerId) {
          startNode.startMarkerIds.add(markerId);
          startNode.rightMarkerIds.add(markerId);
          _this.startNodesById[markerId] = startNode;
        });
        endNode.endMarkerIds.forEach(function (markerId) {
          startNode.endMarkerIds.add(markerId);
          if (endNode.leftMarkerIds.has(markerId)) {
            startNode.leftMarkerIds.add(markerId);
            endNode.leftMarkerIds['delete'](markerId);
          }
          _this.endNodesById[markerId] = startNode;
        });
        this.deleteNode(endNode);
      } else if (endNode.isMarkerEndpoint()) {
        endNode.priority = this.random(MAX_PRIORITY);
        this.bubbleNodeDown(endNode);
      } else {
        this.deleteNode(endNode);
      }

      if (startNode.isMarkerEndpoint()) {
        startNode.priority = this.random(MAX_PRIORITY);
        this.bubbleNodeDown(startNode);
      } else {
        this.deleteNode(startNode);
      }

      return invalidated;
    }
  }, {
    key: 'findIntersecting',
    value: function findIntersecting(start) {
      var end = arguments.length <= 1 || arguments[1] === undefined ? start : arguments[1];
      return (function () {
        var intersecting = new Set();
        this.iterator.findIntersecting(start, end, intersecting);
        return intersecting;
      }).apply(this, arguments);
    }
  }, {
    key: 'findContaining',
    value: function findContaining(start) {
      var end = arguments.length <= 1 || arguments[1] === undefined ? start : arguments[1];
      return (function () {
        var _this2 = this;

        var containing = new Set();
        this.iterator.findContaining(start, containing);
        if ((0, _pointHelpers.compare)(end, start) !== 0) {
          (function () {
            var containingEnd = new Set();
            _this2.iterator.findContaining(end, containingEnd);
            containing.forEach(function (markerId) {
              if (!containingEnd.has(markerId)) containing['delete'](markerId);
            });
          })();
        }
        return containing;
      }).apply(this, arguments);
    }
  }, {
    key: 'findContainedIn',
    value: function findContainedIn(start, end) {
      var containedIn = new Set();
      this.iterator.findContainedIn(start, end, containedIn);
      return containedIn;
    }
  }, {
    key: 'findStartingIn',
    value: function findStartingIn(start, end) {
      var startingIn = new Set();
      this.iterator.findStartingIn(start, end, startingIn);
      return startingIn;
    }
  }, {
    key: 'findEndingIn',
    value: function findEndingIn(start, end) {
      var endingIn = new Set();
      this.iterator.findEndingIn(start, end, endingIn);
      return endingIn;
    }
  }, {
    key: 'findStartingAt',
    value: function findStartingAt(position) {
      return this.findStartingIn(position, position);
    }
  }, {
    key: 'findEndingAt',
    value: function findEndingAt(position) {
      return this.findEndingIn(position, position);
    }
  }, {
    key: 'getNodePosition',
    value: function getNodePosition(node) {
      var position = this.nodePositionCache.get(node);
      if (!position) {
        position = node.leftExtent;
        var currentNode = node;
        while (currentNode.parent) {
          if (currentNode.parent.right === currentNode) {
            position = (0, _pointHelpers.traverse)(currentNode.parent.leftExtent, position);
          }
          currentNode = currentNode.parent;
        }
        this.nodePositionCache.set(node, position);
      }
      return position;
    }
  }, {
    key: 'deleteNode',
    value: function deleteNode(node) {
      this.nodePositionCache['delete'](node);
      node.priority = Infinity;
      this.bubbleNodeDown(node);
      if (node.parent) {
        if (node.parent.left === node) {
          node.parent.left = null;
        } else {
          node.parent.right = null;
        }
      } else {
        this.root = null;
      }
    }
  }, {
    key: 'bubbleNodeUp',
    value: function bubbleNodeUp(node) {
      while (node.parent && node.priority < node.parent.priority) {
        if (node === node.parent.left) {
          this.rotateNodeRight(node);
        } else {
          this.rotateNodeLeft(node);
        }
      }
    }
  }, {
    key: 'bubbleNodeDown',
    value: function bubbleNodeDown(node) {
      while (true) {
        var leftChildPriority = node.left ? node.left.priority : Infinity;
        var rightChildPriority = node.right ? node.right.priority : Infinity;

        if (leftChildPriority < rightChildPriority && leftChildPriority < node.priority) {
          this.rotateNodeRight(node.left);
        } else if (rightChildPriority < node.priority) {
          this.rotateNodeLeft(node.right);
        } else {
          break;
        }
      }
    }
  }, {
    key: 'rotateNodeLeft',
    value: function rotateNodeLeft(pivot) {
      var root = pivot.parent;

      if (root.parent) {
        if (root.parent.left === root) {
          root.parent.left = pivot;
        } else {
          root.parent.right = pivot;
        }
      } else {
        this.root = pivot;
      }
      pivot.parent = root.parent;

      root.right = pivot.left;
      if (root.right) {
        root.right.parent = root;
      }

      pivot.left = root;
      pivot.left.parent = pivot;

      pivot.leftExtent = (0, _pointHelpers.traverse)(root.leftExtent, pivot.leftExtent);

      (0, _helpers.addToSet)(pivot.rightMarkerIds, root.rightMarkerIds);

      pivot.leftMarkerIds.forEach(function (markerId) {
        if (root.leftMarkerIds.has(markerId)) {
          root.leftMarkerIds['delete'](markerId);
        } else {
          pivot.leftMarkerIds['delete'](markerId);
          root.rightMarkerIds.add(markerId);
        }
      });
    }
  }, {
    key: 'rotateNodeRight',
    value: function rotateNodeRight(pivot) {
      var root = pivot.parent;

      if (root.parent) {
        if (root.parent.left === root) {
          root.parent.left = pivot;
        } else {
          root.parent.right = pivot;
        }
      } else {
        this.root = pivot;
      }
      pivot.parent = root.parent;

      root.left = pivot.right;
      if (root.left) {
        root.left.parent = root;
      }

      pivot.right = root;
      pivot.right.parent = pivot;

      root.leftExtent = (0, _pointHelpers.traversal)(root.leftExtent, pivot.leftExtent);

      root.leftMarkerIds.forEach(function (markerId) {
        if (!pivot.startMarkerIds.has(markerId)) {
          // don't do this when pivot is at position 0
          pivot.leftMarkerIds.add(markerId);
        }
      });

      pivot.rightMarkerIds.forEach(function (markerId) {
        if (root.rightMarkerIds.has(markerId)) {
          root.rightMarkerIds['delete'](markerId);
        } else {
          pivot.rightMarkerIds['delete'](markerId);
          root.leftMarkerIds.add(markerId);
        }
      });
    }
  }, {
    key: 'getStartingAndEndingMarkersWithinSubtree',
    value: function getStartingAndEndingMarkersWithinSubtree(node, startMarkerIds, endMarkerIds) {
      if (node == null) return;

      this.getStartingAndEndingMarkersWithinSubtree(node.left, startMarkerIds, endMarkerIds);
      (0, _helpers.addToSet)(startMarkerIds, node.startMarkerIds);
      (0, _helpers.addToSet)(endMarkerIds, node.endMarkerIds);
      this.getStartingAndEndingMarkersWithinSubtree(node.right, startMarkerIds, endMarkerIds);
    }
  }, {
    key: 'populateSpliceInvalidationSets',
    value: function populateSpliceInvalidationSets(invalidated, startNode, endNode, startingInsideSplice, endingInsideSplice) {
      (0, _helpers.addToSet)(invalidated.touch, startNode.endMarkerIds);
      (0, _helpers.addToSet)(invalidated.touch, endNode.startMarkerIds);
      startNode.rightMarkerIds.forEach(function (markerId) {
        invalidated.touch.add(markerId);
        invalidated.inside.add(markerId);
      });
      endNode.leftMarkerIds.forEach(function (markerId) {
        invalidated.touch.add(markerId);
        invalidated.inside.add(markerId);
      });
      startingInsideSplice.forEach(function (markerId) {
        invalidated.touch.add(markerId);
        invalidated.inside.add(markerId);
        invalidated.overlap.add(markerId);
        if (endingInsideSplice.has(markerId)) invalidated.surround.add(markerId);
      });
      endingInsideSplice.forEach(function (markerId) {
        invalidated.touch.add(markerId);
        invalidated.inside.add(markerId);
        invalidated.overlap.add(markerId);
      });
    }
  }]);

  return MarkerIndex;
})();

exports['default'] = MarkerIndex;
module.exports = exports['default'];