

/**
 * Default cell renderer that displays an attribute as a simple string
 * You should override the column's cellRenderer if your data is some other type of object.
 */
export default function defaultCellRenderer(_ref) {
  var cellData = _ref.cellData,
      cellDataKey = _ref.cellDataKey,
      columnData = _ref.columnData,
      rowData = _ref.rowData,
      rowIndex = _ref.rowIndex;

  if (cellData == null) {
    return '';
  } else {
    return String(cellData);
  }
}