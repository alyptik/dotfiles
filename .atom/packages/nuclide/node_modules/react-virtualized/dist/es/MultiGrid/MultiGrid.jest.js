import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { render } from '../TestUtils';
import MultiGrid from './MultiGrid';

// These tests only focus on what MultiGrid does specifically.
// The inner Grid component is tested in depth elsewhere.
describe('MultiGrid', function () {
  function defaultCellRenderer(_ref) {
    var columnIndex = _ref.columnIndex,
        key = _ref.key,
        rowIndex = _ref.rowIndex,
        style = _ref.style;

    return React.createElement(
      'div',
      {
        className: 'gridItem',
        key: key,
        style: style
      },
      'row:' + rowIndex + ', column:' + columnIndex
    );
  }

  function getMarkup() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return React.createElement(MultiGrid, _extends({
      cellRenderer: defaultCellRenderer,
      columnCount: 50,
      columnWidth: 50,
      fixedColumnCount: 2,
      fixedRowCount: 1,
      height: 300,
      overscanColumnCount: 0,
      overscanRowCount: 0,
      autoHeight: false,
      rowHeight: 20,
      rowCount: 100,
      width: 400
    }, props));
  }

  describe('fixed columns and rows', function () {
    it('should render 4 Grids when configured for fixed columns and rows', function () {
      var rendered = findDOMNode(render(getMarkup({
        fixedColumnCount: 1,
        fixedRowCount: 1
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(4);

      var _grids = _slicedToArray(grids, 4),
          topLeft = _grids[0],
          topRight = _grids[1],
          bottomLeft = _grids[2],
          bottomRight = _grids[3];

      expect(topLeft.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(topLeft.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(topRight.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(topRight.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(bottomLeft.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(bottomLeft.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(bottomRight.style.getPropertyValue('overflow-x')).toEqual('auto');
      expect(bottomRight.style.getPropertyValue('overflow-y')).toEqual('auto');
    });

    it('should render 2 Grids when configured for fixed columns only', function () {
      var rendered = findDOMNode(render(getMarkup({
        fixedColumnCount: 1,
        fixedRowCount: 0
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(2);

      var _grids2 = _slicedToArray(grids, 2),
          bottomLeft = _grids2[0],
          bottomRight = _grids2[1];

      expect(bottomLeft.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(bottomLeft.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(bottomRight.style.getPropertyValue('overflow-x')).toEqual('auto');
      expect(bottomRight.style.getPropertyValue('overflow-y')).toEqual('auto');
    });

    it('should render 2 Grids when configured for fixed rows only', function () {
      var rendered = findDOMNode(render(getMarkup({
        fixedColumnCount: 0,
        fixedRowCount: 1
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(2);

      var _grids3 = _slicedToArray(grids, 2),
          topRight = _grids3[0],
          bottomRight = _grids3[1];

      expect(topRight.style.getPropertyValue('overflow-x')).toEqual('hidden');
      expect(topRight.style.getPropertyValue('overflow-y')).toEqual('hidden');
      expect(bottomRight.style.getPropertyValue('overflow-x')).toEqual('auto');
      expect(bottomRight.style.getPropertyValue('overflow-y')).toEqual('auto');
    });

    it('should render 1 Grid when configured for neither fixed columns and rows', function () {
      var rendered = findDOMNode(render(getMarkup({
        fixedColumnCount: 0,
        fixedRowCount: 0
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(1);

      var _grids4 = _slicedToArray(grids, 1),
          bottomRight = _grids4[0];

      expect(bottomRight.style.getPropertyValue('overflow-x')).toEqual('auto');
      expect(bottomRight.style.getPropertyValue('overflow-y')).toEqual('auto');
    });

    it('should adjust the number of Grids when fixed column or row counts change', function () {
      var rendered = findDOMNode(render(getMarkup({
        fixedColumnCount: 2,
        fixedRowCount: 1
      })));
      expect(rendered.querySelectorAll('.ReactVirtualized__Grid').length).toEqual(4);
      rendered = findDOMNode(render(getMarkup({
        fixedColumnCount: 0,
        fixedRowCount: 0
      })));
      expect(rendered.querySelectorAll('.ReactVirtualized__Grid').length).toEqual(1);
      rendered = findDOMNode(render(getMarkup({
        fixedColumnCount: 0,
        fixedRowCount: 2
      })));
      expect(rendered.querySelectorAll('.ReactVirtualized__Grid').length).toEqual(2);
    });
  });

  describe('#recomputeGridSize', function () {
    it('should clear calculated cached styles in recomputeGridSize', function () {
      var fixedRowHeight = 75;
      var fixedColumnWidth = 100;

      function variableRowHeight(_ref2) {
        var index = _ref2.index;

        if (index === 0) {
          return fixedRowHeight;
        }
        return 20;
      }
      function variableColumnWidth(_ref3) {
        var index = _ref3.index;

        if (index === 0) {
          return fixedColumnWidth;
        }
        return 50;
      }

      var multiGrid = void 0;
      var rendered = findDOMNode(render(getMarkup({
        fixedColumnCount: 1,
        fixedRowCount: 1,
        rowHeight: variableRowHeight,
        columnWidth: variableColumnWidth,
        ref: function ref(_ref4) {
          multiGrid = _ref4;
        }
      })));

      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(grids.length).toEqual(4);

      var _grids5 = _slicedToArray(grids, 4),
          topLeft = _grids5[0],
          topRight = _grids5[1],
          bottomLeft = _grids5[2],
          bottomRight = _grids5[3];

      expect(topLeft.style.getPropertyValue('height')).toEqual('75px');
      expect(topRight.style.getPropertyValue('height')).toEqual('75px');
      expect(bottomLeft.style.getPropertyValue('height')).toEqual('225px');
      expect(bottomRight.style.getPropertyValue('height')).toEqual('225px');

      expect(topLeft.style.getPropertyValue('width')).toEqual('100px');
      expect(topRight.style.getPropertyValue('width')).toEqual('300px');
      expect(bottomLeft.style.getPropertyValue('width')).toEqual('100px');
      expect(bottomRight.style.getPropertyValue('width')).toEqual('300px');

      expect(multiGrid._topGridHeight).toEqual(75);
      expect(multiGrid._leftGridWidth).toEqual(100);

      fixedRowHeight = 125;
      fixedColumnWidth = 75;
      multiGrid.recomputeGridSize();
      expect(multiGrid._topGridHeight).toEqual(125);
      expect(multiGrid._leftGridWidth).toEqual(75);

      multiGrid.forceUpdate();

      var gridsAfter = rendered.querySelectorAll('.ReactVirtualized__Grid');
      expect(gridsAfter.length).toEqual(4);

      var _gridsAfter = _slicedToArray(gridsAfter, 4),
          topLeftAfter = _gridsAfter[0],
          topRightAfter = _gridsAfter[1],
          bottomLeftAfter = _gridsAfter[2],
          bottomRightAfter = _gridsAfter[3];

      expect(topLeftAfter.style.getPropertyValue('height')).toEqual('125px');
      expect(topRightAfter.style.getPropertyValue('height')).toEqual('125px');
      expect(bottomLeftAfter.style.getPropertyValue('height')).toEqual('175px');
      expect(bottomRightAfter.style.getPropertyValue('height')).toEqual('175px');

      expect(topLeftAfter.style.getPropertyValue('width')).toEqual('75px');
      expect(topRightAfter.style.getPropertyValue('width')).toEqual('325px');
      expect(bottomLeftAfter.style.getPropertyValue('width')).toEqual('75px');
      expect(bottomRightAfter.style.getPropertyValue('width')).toEqual('325px');
    });
  });

  describe('scrollToColumn and scrollToRow', function () {
    it('should adjust :scrollLeft for the main Grid when scrollToColumn is used', function () {
      var rendered = findDOMNode(render(getMarkup({
        columnWidth: 50,
        fixedColumnCount: 2,
        scrollToAlignment: 'start',
        scrollToColumn: 19
      })));
      // Bottom-right Grid is the last Grid
      var grid = rendered.querySelectorAll('.ReactVirtualized__Grid')[3];
      // 20th column, less 2 for the fixed-column Grid, 50px column width
      expect(grid.scrollLeft).toEqual(850);
    });

    it('should adjust :scrollTop for the main Grid when scrollToRow is used', function () {
      var rendered = findDOMNode(render(getMarkup({
        fixedRowCount: 1,
        rowHeight: 50,
        scrollToAlignment: 'start',
        scrollToRow: 19
      })));
      // Bottom-right Grid is the last Grid
      var grid = rendered.querySelectorAll('.ReactVirtualized__Grid')[3];
      // 20th row, less 1 for the fixed-row Grid, 50px row width
      expect(grid.scrollTop).toEqual(900);
    });
  });

  describe('#forceUpdateGrids', function () {
    it('should call forceUpdate() on inner Grids', function () {
      var cellRenderer = jest.fn();
      cellRenderer.mockImplementation(function (_ref5) {
        var key = _ref5.key;
        return React.createElement('div', { key: key, style: {} });
      });

      var rendered = render(getMarkup({
        cellRenderer: cellRenderer,
        columnCount: 2,
        fixedColumnCount: 1,
        fixedRowCount: 1,
        rowCount: 2
      }));

      expect(cellRenderer.mock.calls).toHaveLength(4);

      cellRenderer.mockReset();
      rendered.forceUpdateGrids();

      expect(cellRenderer.mock.calls).toHaveLength(4);
    });
  });

  describe('styles', function () {
    it('should support custom style for the outer MultiGrid wrapper element', function () {
      var rendered = findDOMNode(render(getMarkup({
        style: { backgroundColor: 'black' }
      })));
      expect(rendered.style.backgroundColor).toEqual('black');
    });

    it('should support custom styles for each Grid', function () {
      var rendered = findDOMNode(render(getMarkup({
        fixedColumnCount: 2,
        fixedRowCount: 1,
        styleBottomLeftGrid: { backgroundColor: 'green' },
        styleBottomRightGrid: { backgroundColor: 'red' },
        styleTopLeftGrid: { backgroundColor: 'blue' },
        styleTopRightGrid: { backgroundColor: 'purple' }
      })));
      var grids = rendered.querySelectorAll('.ReactVirtualized__Grid');
      var topLeftGrid = grids[0];
      var topRightGrid = grids[1];
      var bottomLeftGrid = grids[2];
      var bottomRightGrid = grids[3];
      expect(topLeftGrid.style.backgroundColor).toEqual('blue');
      expect(topRightGrid.style.backgroundColor).toEqual('purple');
      expect(bottomLeftGrid.style.backgroundColor).toEqual('green');
      expect(bottomRightGrid.style.backgroundColor).toEqual('red');
    });
  });
});