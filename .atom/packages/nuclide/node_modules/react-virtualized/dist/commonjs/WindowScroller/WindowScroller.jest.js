'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _TestUtils = require('../TestUtils');

var _onScroll = require('./utils/onScroll');

var _WindowScroller = require('./WindowScroller');

var _WindowScroller2 = _interopRequireDefault(_WindowScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* global Element */

function ChildComponent(_ref) {
  var scrollTop = _ref.scrollTop,
      isScrolling = _ref.isScrolling,
      height = _ref.height;

  return _react2.default.createElement(
    'div',
    null,
    'scrollTop:' + scrollTop + ', isScrolling:' + isScrolling + ', height:' + height
  );
}

function mockGetBoundingClientRectForHeader(_ref2) {
  var _ref2$documentOffset = _ref2.documentOffset,
      documentOffset = _ref2$documentOffset === undefined ? 0 : _ref2$documentOffset,
      height = _ref2.height;

  // Mock the WindowScroller element and window separately
  // The only way to mock the former (before its created) is globally
  Element.prototype.getBoundingClientRect = jest.fn(function () {
    return {
      top: height
    };
  });
  document.documentElement.getBoundingClientRect = jest.fn(function () {
    return {
      top: documentOffset
    };
  });
}

function getMarkup() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      headerElements = _ref3.headerElements,
      documentOffset = _ref3.documentOffset,
      props = _objectWithoutProperties(_ref3, ['headerElements', 'documentOffset']);

  var windowScroller = _react2.default.createElement(
    _WindowScroller2.default,
    props,
    function (_ref4) {
      var height = _ref4.height,
          isScrolling = _ref4.isScrolling,
          scrollTop = _ref4.scrollTop;
      return _react2.default.createElement(ChildComponent, {
        height: height,
        isScrolling: isScrolling,
        scrollTop: scrollTop
      });
    }
  );

  // JSDome doesn't implement a working getBoundingClientRect()
  // But WindowScroller requires it
  mockGetBoundingClientRectForHeader({
    documentOffset: documentOffset,
    height: headerElements ? headerElements.props.style.height : 0
  });

  if (headerElements) {
    return _react2.default.createElement(
      'div',
      null,
      headerElements,
      windowScroller
    );
  } else {
    return windowScroller;
  }
}

function simulateWindowScroll(_ref5) {
  var _ref5$scrollY = _ref5.scrollY,
      scrollY = _ref5$scrollY === undefined ? 0 : _ref5$scrollY;

  document.body.style.height = '10000px';
  window.scrollY = scrollY;
  document.dispatchEvent(new window.Event('scroll', { bubbles: true }));
  document.body.style.height = '';
}

function simulateWindowResize(_ref6) {
  var _ref6$height = _ref6.height,
      height = _ref6$height === undefined ? 0 : _ref6$height;

  window.innerHeight = height;
  document.dispatchEvent(new window.Event('resize', { bubbles: true }));
}

describe('WindowScroller', function () {
  // Set default window height and scroll position between tests
  beforeEach(function () {
    window.scrollY = 0;
    window.innerHeight = 500;
  });

  // Starts updating scrollTop only when the top position is reached
  it('should have correct top property to be defined on :_positionFromTop', function () {
    var component = (0, _TestUtils.render)(getMarkup());
    var rendered = (0, _reactDom.findDOMNode)(component);
    var top = rendered.getBoundingClientRect().top;
    expect(component._positionFromTop).toEqual(top);
  });

  // Test edge-case reported in bvaughn/react-virtualized/pull/346
  it('should have correct top property to be defined on :_positionFromTop if documentElement is scrolled', function () {
    _TestUtils.render.unmount();

    // Simulate scrolled documentElement
    var component = (0, _TestUtils.render)(getMarkup({
      documentOffset: -100
    }));
    var rendered = (0, _reactDom.findDOMNode)(component);
    var top = rendered.getBoundingClientRect().top;
    expect(component._positionFromTop).toEqual(top + 100);
    // Reset override
    delete document.documentElement.getBoundingClientRect;
  });

  it('inherits the window height and passes it to child component', function () {
    var component = (0, _TestUtils.render)(getMarkup());
    var rendered = (0, _reactDom.findDOMNode)(component);

    expect(component.state.height).toEqual(window.innerHeight);
    expect(component.state.height).toEqual(500);
    expect(rendered.textContent).toContain('height:500');
  });

  it('should restore pointerEvents on body after IS_SCROLLING_TIMEOUT', function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(done) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (0, _TestUtils.render)(getMarkup());
              document.body.style.pointerEvents = 'all';
              simulateWindowScroll({ scrollY: 5000 });
              expect(document.body.style.pointerEvents).toEqual('none');
              _context.next = 6;
              return new Promise(function (resolve) {
                return setTimeout(resolve, _onScroll.IS_SCROLLING_TIMEOUT);
              });

            case 6:
              expect(document.body.style.pointerEvents).toEqual('all');
              done();

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x2) {
      return _ref7.apply(this, arguments);
    };
  }());

  it('should restore pointerEvents on body after unmount', function () {
    (0, _TestUtils.render)(getMarkup());
    document.body.style.pointerEvents = 'all';
    simulateWindowScroll({ scrollY: 5000 });
    expect(document.body.style.pointerEvents).toEqual('none');
    _TestUtils.render.unmount();
    expect(document.body.style.pointerEvents).toEqual('all');
  });

  describe('onScroll', function () {
    it('should trigger callback when window scrolls', function () {
      var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(done) {
        var onScrollCalls;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                onScrollCalls = [];

                (0, _TestUtils.render)(getMarkup({
                  onScroll: function onScroll(params) {
                    return onScrollCalls.push(params);
                  }
                }));

                simulateWindowScroll({ scrollY: 5000 });

                // Allow scrolling timeout to complete so that the component computes state
                _context2.next = 5;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 150);
                });

              case 5:

                expect(onScrollCalls.length).toEqual(1);
                expect(onScrollCalls[0]).toEqual({
                  scrollTop: 5000
                });

                done();

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      return function (_x3) {
        return _ref8.apply(this, arguments);
      };
    }());

    it('should update :scrollTop when window is scrolled', function () {
      var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(done) {
        var component, rendered, componentScrollTop;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                component = (0, _TestUtils.render)(getMarkup());
                rendered = (0, _reactDom.findDOMNode)(component);

                // Initial load of the component should have 0 scrollTop

                expect(rendered.textContent).toContain('scrollTop:0');

                simulateWindowScroll({ scrollY: 5000 });

                // Allow scrolling timeout to complete so that the component computes state
                _context3.next = 6;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 150);
                });

              case 6:
                componentScrollTop = window.scrollY - component._positionFromTop;

                expect(component.state.scrollTop).toEqual(componentScrollTop);
                expect(rendered.textContent).toContain('scrollTop:' + componentScrollTop);

                done();

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      return function (_x4) {
        return _ref9.apply(this, arguments);
      };
    }());

    it('should specify :isScrolling when scrolling and reset after scrolling', function () {
      var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(done) {
        var component, rendered;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                component = (0, _TestUtils.render)(getMarkup());
                rendered = (0, _reactDom.findDOMNode)(component);


                simulateWindowScroll({ scrollY: 5000 });

                expect(rendered.textContent).toContain('isScrolling:true');

                _context4.next = 6;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 250);
                });

              case 6:

                expect(rendered.textContent).toContain('isScrolling:false');

                done();

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      return function (_x5) {
        return _ref10.apply(this, arguments);
      };
    }());
  });

  describe('onResize', function () {
    it('should trigger callback when window resizes', function () {
      var onResizeCalls = [];
      (0, _TestUtils.render)(getMarkup({
        onResize: function onResize(params) {
          return onResizeCalls.push(params);
        }
      }));

      simulateWindowResize({ height: 1000 });

      expect(onResizeCalls.length).toEqual(1);
      expect(onResizeCalls[0]).toEqual({
        height: 1000
      });
    });

    it('should update height when window resizes', function () {
      var component = (0, _TestUtils.render)(getMarkup());
      var rendered = (0, _reactDom.findDOMNode)(component);

      // Initial load of the component should have the same window height = 500
      expect(component.state.height).toEqual(window.innerHeight);
      expect(component.state.height).toEqual(500);
      expect(rendered.textContent).toContain('height:500');

      simulateWindowResize({ height: 1000 });

      expect(component.state.height).toEqual(window.innerHeight);
      expect(component.state.height).toEqual(1000);
      expect(rendered.textContent).toContain('height:1000');
    });
  });

  describe('updatePosition', function () {
    it('should calculate the initial offset from the top of the page when mounted', function () {
      var windowScroller = void 0;

      (0, _TestUtils.render)(getMarkup({
        headerElements: _react2.default.createElement('div', { style: { height: 100 } }),
        ref: function ref(_ref11) {
          windowScroller = _ref11;
        }
      }));

      expect(windowScroller._positionFromTop).toBe(100);
    });

    it('should recalculate the offset from the top when the window resizes', function () {
      var windowScroller = void 0;

      (0, _TestUtils.render)(getMarkup({
        headerElements: _react2.default.createElement('div', { id: 'header', style: { height: 100 } }),
        ref: function ref(_ref12) {
          windowScroller = _ref12;
        }
      }));

      expect(windowScroller._positionFromTop).toBe(100);

      mockGetBoundingClientRectForHeader({
        height: 200
      });

      expect(windowScroller._positionFromTop).toBe(100);

      simulateWindowResize({ height: 1000 });

      expect(windowScroller._positionFromTop).toBe(200);
    });

    it('should recalculate the offset from the top if called externally', function () {
      var windowScroller = void 0;

      (0, _TestUtils.render)(getMarkup({
        headerElements: _react2.default.createElement('div', { id: 'header', style: { height: 100 } }),
        ref: function ref(_ref13) {
          windowScroller = _ref13;
        }
      }));

      expect(windowScroller._positionFromTop).toBe(100);

      mockGetBoundingClientRectForHeader({
        height: 200
      });

      windowScroller.updatePosition();

      expect(windowScroller._positionFromTop).toBe(200);
    });
  });
});