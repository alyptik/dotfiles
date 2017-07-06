import _regeneratorRuntime from 'babel-runtime/regenerator';
import _Promise from 'babel-runtime/core-js/promise';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

/* global Element, Event */

import React from 'react';
import { findDOMNode } from 'react-dom';
import { render } from '../TestUtils';
import AutoSizer from './AutoSizer';

function ChildComponent(_ref) {
  var height = _ref.height,
      width = _ref.width,
      foo = _ref.foo,
      bar = _ref.bar;

  return React.createElement(
    'div',
    null,
    'width:' + width + ', height:' + height + ', foo:' + foo + ', bar:' + bar
  );
}

describe('AutoSizer', function () {
  var simulateResize = function () {
    var _ref4 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(_ref5) {
      var element = _ref5.element,
          height = _ref5.height,
          width = _ref5.width;
      var trigger;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Specific to the implementation of detectElementResize helper
              element.offsetHeight = height;
              element.offsetWidth = width;

              Element.prototype.getBoundingClientRect.mockReturnValue({
                width: width,
                height: height
              });

              // Trigger detectElementResize library by faking a scroll event
              // TestUtils Simulate doesn't work here in JSDom so we manually dispatch
              trigger = element.querySelector('.contract-trigger');

              trigger.dispatchEvent(new Event('scroll'));

              // Allow requestAnimationFrame to be invoked before continuing
              _context.next = 7;
              return new _Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function simulateResize(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  function getMarkup() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$bar = _ref2.bar,
        bar = _ref2$bar === undefined ? 123 : _ref2$bar,
        _ref2$disableHeight = _ref2.disableHeight,
        disableHeight = _ref2$disableHeight === undefined ? false : _ref2$disableHeight,
        _ref2$disableWidth = _ref2.disableWidth,
        disableWidth = _ref2$disableWidth === undefined ? false : _ref2$disableWidth,
        _ref2$foo = _ref2.foo,
        foo = _ref2$foo === undefined ? 456 : _ref2$foo,
        _ref2$height = _ref2.height,
        height = _ref2$height === undefined ? 100 : _ref2$height,
        _ref2$paddingBottom = _ref2.paddingBottom,
        paddingBottom = _ref2$paddingBottom === undefined ? 0 : _ref2$paddingBottom,
        _ref2$paddingLeft = _ref2.paddingLeft,
        paddingLeft = _ref2$paddingLeft === undefined ? 0 : _ref2$paddingLeft,
        _ref2$paddingRight = _ref2.paddingRight,
        paddingRight = _ref2$paddingRight === undefined ? 0 : _ref2$paddingRight,
        _ref2$paddingTop = _ref2.paddingTop,
        paddingTop = _ref2$paddingTop === undefined ? 0 : _ref2$paddingTop,
        _ref2$width = _ref2.width,
        width = _ref2$width === undefined ? 200 : _ref2$width;

    var style = {
      boxSizing: 'border-box',
      height: height,
      paddingBottom: paddingBottom,
      paddingLeft: paddingLeft,
      paddingRight: paddingRight,
      paddingTop: paddingTop,
      width: width
    };

    // AutoSizer uses getBoundingClientRect().
    // Jest runs in JSDom which doesn't support measurements APIs.
    Element.prototype.getBoundingClientRect = jest.fn(function () {
      return {
        width: width,
        height: height
      };
    });

    return React.createElement(
      'div',
      { style: style },
      React.createElement(
        AutoSizer,
        null,
        function (_ref3) {
          var height = _ref3.height,
              width = _ref3.width;
          return React.createElement(ChildComponent, {
            width: disableWidth ? undefined : width,
            height: disableHeight ? undefined : height,
            bar: bar,
            foo: foo
          });
        }
      )
    );
  }

  it('should relay properties to ChildComponent or React child', function () {
    var rendered = findDOMNode(render(getMarkup()));
    expect(rendered.textContent).toContain('foo:456');
    expect(rendered.textContent).toContain('bar:123');
  });

  it('should set the correct initial width and height of ChildComponent or React child', function () {
    var rendered = findDOMNode(render(getMarkup()));
    expect(rendered.textContent).toContain('height:100');
    expect(rendered.textContent).toContain('width:200');
  });

  it('should account for padding when calculating the available width and height', function () {
    var rendered = findDOMNode(render(getMarkup({
      paddingBottom: 10,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 15
    })));
    expect(rendered.textContent).toContain('height:75');
    expect(rendered.textContent).toContain('width:192');
  });

  it('should not update :width if :disableWidth is true', function () {
    var rendered = findDOMNode(render(getMarkup({ disableWidth: true })));
    expect(rendered.textContent).toContain('height:100');
    expect(rendered.textContent).toContain('width:undefined');
  });

  it('should not update :height if :disableHeight is true', function () {
    var rendered = findDOMNode(render(getMarkup({ disableHeight: true })));
    expect(rendered.textContent).toContain('height:undefined');
    expect(rendered.textContent).toContain('width:200');
  });

  it('should update :height after a resize event', function () {
    var _ref6 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(done) {
      var rendered;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              rendered = findDOMNode(render(getMarkup({
                height: 100,
                width: 200
              })));

              expect(rendered.textContent).toContain('height:100');
              expect(rendered.textContent).toContain('width:200');
              _context2.next = 5;
              return simulateResize({ element: rendered, height: 400, width: 300 });

            case 5:
              expect(rendered.textContent).toContain('height:400');
              expect(rendered.textContent).toContain('width:300');
              done();

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x3) {
      return _ref6.apply(this, arguments);
    };
  }());
});