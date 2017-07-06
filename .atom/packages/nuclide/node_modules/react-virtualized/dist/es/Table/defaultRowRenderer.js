import _extends from 'babel-runtime/helpers/extends';
import React from 'react';


/**
 * Default row renderer for Table.
 */
export default function defaultRowRenderer(_ref) {
  var className = _ref.className,
      columns = _ref.columns,
      index = _ref.index,
      isScrolling = _ref.isScrolling,
      key = _ref.key,
      onRowClick = _ref.onRowClick,
      onRowDoubleClick = _ref.onRowDoubleClick,
      onRowMouseOver = _ref.onRowMouseOver,
      onRowMouseOut = _ref.onRowMouseOut,
      rowData = _ref.rowData,
      style = _ref.style;

  var a11yProps = {};

  if (onRowClick || onRowDoubleClick || onRowMouseOver || onRowMouseOut) {
    a11yProps['aria-label'] = 'row';
    a11yProps.role = 'row';
    a11yProps.tabIndex = 0;

    if (onRowClick) {
      a11yProps.onClick = function () {
        return onRowClick({ index: index, rowData: rowData });
      };
    }
    if (onRowDoubleClick) {
      a11yProps.onDoubleClick = function () {
        return onRowDoubleClick({ index: index, rowData: rowData });
      };
    }
    if (onRowMouseOut) {
      a11yProps.onMouseOut = function () {
        return onRowMouseOut({ index: index, rowData: rowData });
      };
    }
    if (onRowMouseOver) {
      a11yProps.onMouseOver = function () {
        return onRowMouseOver({ index: index, rowData: rowData });
      };
    }
  }

  return React.createElement(
    'div',
    _extends({}, a11yProps, {
      className: className,
      key: key,
      style: style
    }),
    columns
  );
}