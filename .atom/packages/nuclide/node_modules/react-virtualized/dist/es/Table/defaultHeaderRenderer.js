import React from 'react';
import SortIndicator from './SortIndicator';


/**
 * Default table header renderer.
 */
export default function defaultHeaderRenderer(_ref) {
  var columnData = _ref.columnData,
      dataKey = _ref.dataKey,
      disableSort = _ref.disableSort,
      label = _ref.label,
      sortBy = _ref.sortBy,
      sortDirection = _ref.sortDirection;

  var showSortIndicator = sortBy === dataKey;
  var children = [React.createElement(
    'span',
    {
      className: 'ReactVirtualized__Table__headerTruncatedText',
      key: 'label',
      title: label
    },
    label
  )];

  if (showSortIndicator) {
    children.push(React.createElement(SortIndicator, {
      key: 'SortIndicator',
      sortDirection: sortDirection
    }));
  }

  return children;
}