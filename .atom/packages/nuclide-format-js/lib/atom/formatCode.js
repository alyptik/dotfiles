var formatCode = _asyncToGenerator(function* (options, editor_) {
  var editor = editor_;
  editor = editor || atom.workspace.getActiveTextEditor();
  if (!editor) {
    // eslint-disable-next-line no-console
    console.log('- format-js: No active text editor');
    return;
  }

  // Save things
  var buffer = editor.getBuffer();
  var oldSource = buffer.getText();
  var source = oldSource;

  // Reprint transform.
  if (atom.config.get('nuclide-format-js.reprint')) {
    var reprint = require('../reprint-js');
    // $FlowFixMe(kad) -- this seems to conflate an class instance with an ordinary object.
    var reprintResult = reprint(source, {
      maxLineLength: 80,
      useSpaces: true,
      tabWidth: 2
    });
    source = reprintResult.source;
  }

  // Auto-require transform.
  // TODO: Add a limit so the transform is not run on files over a certain size.

  var _require = require('../common');

  var transform = _require.transform;

  source = transform(source, options);

  // Update the source and position after all transforms are done. Do nothing
  // if the source did not change at all.
  if (source === oldSource) {
    return;
  }

  var range = buffer.getRange();
  var position = editor.getCursorBufferPosition();
  editor.setTextInBufferRange(range, source);

  var _updateCursor = (0, _updateCursor3['default'])(oldSource, position, source);

  var row = _updateCursor.row;
  var column = _updateCursor.column;

  editor.setCursorBufferPosition([row, column]);

  // Save the file if that option is specified.
  if (atom.config.get('nuclide-format-js.saveAfterRun')) {
    editor.save();
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 */

/* globals atom */

var _updateCursor2 = require('../update-cursor');

var _updateCursor3 = _interopRequireDefault(_updateCursor2);

module.exports = formatCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdG9tL2Zvcm1hdENvZGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IklBZ0JlLFVBQVUscUJBQXpCLFdBQTBCLE9BQXNCLEVBQUUsT0FBb0IsRUFBaUI7QUFDckYsTUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQ3JCLFFBQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0FBQ3hELE1BQUksQ0FBQyxNQUFNLEVBQUU7O0FBRVgsV0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ2xELFdBQU87R0FDUjs7O0FBR0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2xDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQyxNQUFJLE1BQU0sR0FBRyxTQUFTLENBQUM7OztBQUd2QixNQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLEVBQUU7QUFDaEQsUUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUV6QyxRQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFO0FBQ3BDLG1CQUFhLEVBQUUsRUFBRTtBQUNqQixlQUFTLEVBQUUsSUFBSTtBQUNmLGNBQVEsRUFBRSxDQUFDO0tBQ1osQ0FBQyxDQUFDO0FBQ0gsVUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7R0FDL0I7Ozs7O2lCQUltQixPQUFPLENBQUMsV0FBVyxDQUFDOztNQUFqQyxTQUFTLFlBQVQsU0FBUzs7QUFDaEIsUUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7QUFJcEMsTUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQ3hCLFdBQU87R0FDUjs7QUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDaEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLHVCQUF1QixFQUFFLENBQUM7QUFDbEQsUUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzs7c0JBQ3JCLCtCQUFhLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDOztNQUF4RCxHQUFHLGlCQUFILEdBQUc7TUFBRSxNQUFNLGlCQUFOLE1BQU07O0FBQ2xCLFFBQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7QUFHOUMsTUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFO0FBQ3JELFVBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNmO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFqRHdCLGtCQUFrQjs7OztBQW1EM0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMiLCJmaWxlIjoiZm9ybWF0Q29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbi8qIGdsb2JhbHMgYXRvbSAqL1xuXG5pbXBvcnQgdHlwZSB7U291cmNlT3B0aW9uc30gZnJvbSAnLi4vY29tbW9uL29wdGlvbnMvU291cmNlT3B0aW9ucyc7XG5cbmltcG9ydCB1cGRhdGVDdXJzb3IgZnJvbSAnLi4vdXBkYXRlLWN1cnNvcic7XG5cbmFzeW5jIGZ1bmN0aW9uIGZvcm1hdENvZGUob3B0aW9uczogU291cmNlT3B0aW9ucywgZWRpdG9yXzogP1RleHRFZGl0b3IpOiBQcm9taXNlPHZvaWQ+IHtcbiAgbGV0IGVkaXRvciA9IGVkaXRvcl87XG4gIGVkaXRvciA9IGVkaXRvciB8fCBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCk7XG4gIGlmICghZWRpdG9yKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmxvZygnLSBmb3JtYXQtanM6IE5vIGFjdGl2ZSB0ZXh0IGVkaXRvcicpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFNhdmUgdGhpbmdzXG4gIGNvbnN0IGJ1ZmZlciA9IGVkaXRvci5nZXRCdWZmZXIoKTtcbiAgY29uc3Qgb2xkU291cmNlID0gYnVmZmVyLmdldFRleHQoKTtcbiAgbGV0IHNvdXJjZSA9IG9sZFNvdXJjZTtcblxuICAvLyBSZXByaW50IHRyYW5zZm9ybS5cbiAgaWYgKGF0b20uY29uZmlnLmdldCgnbnVjbGlkZS1mb3JtYXQtanMucmVwcmludCcpKSB7XG4gICAgY29uc3QgcmVwcmludCA9IHJlcXVpcmUoJy4uL3JlcHJpbnQtanMnKTtcbiAgICAvLyAkRmxvd0ZpeE1lKGthZCkgLS0gdGhpcyBzZWVtcyB0byBjb25mbGF0ZSBhbiBjbGFzcyBpbnN0YW5jZSB3aXRoIGFuIG9yZGluYXJ5IG9iamVjdC5cbiAgICBjb25zdCByZXByaW50UmVzdWx0ID0gcmVwcmludChzb3VyY2UsIHtcbiAgICAgIG1heExpbmVMZW5ndGg6IDgwLFxuICAgICAgdXNlU3BhY2VzOiB0cnVlLFxuICAgICAgdGFiV2lkdGg6IDIsXG4gICAgfSk7XG4gICAgc291cmNlID0gcmVwcmludFJlc3VsdC5zb3VyY2U7XG4gIH1cblxuICAvLyBBdXRvLXJlcXVpcmUgdHJhbnNmb3JtLlxuICAvLyBUT0RPOiBBZGQgYSBsaW1pdCBzbyB0aGUgdHJhbnNmb3JtIGlzIG5vdCBydW4gb24gZmlsZXMgb3ZlciBhIGNlcnRhaW4gc2l6ZS5cbiAgY29uc3Qge3RyYW5zZm9ybX0gPSByZXF1aXJlKCcuLi9jb21tb24nKTtcbiAgc291cmNlID0gdHJhbnNmb3JtKHNvdXJjZSwgb3B0aW9ucyk7XG5cbiAgLy8gVXBkYXRlIHRoZSBzb3VyY2UgYW5kIHBvc2l0aW9uIGFmdGVyIGFsbCB0cmFuc2Zvcm1zIGFyZSBkb25lLiBEbyBub3RoaW5nXG4gIC8vIGlmIHRoZSBzb3VyY2UgZGlkIG5vdCBjaGFuZ2UgYXQgYWxsLlxuICBpZiAoc291cmNlID09PSBvbGRTb3VyY2UpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByYW5nZSA9IGJ1ZmZlci5nZXRSYW5nZSgpO1xuICBjb25zdCBwb3NpdGlvbiA9IGVkaXRvci5nZXRDdXJzb3JCdWZmZXJQb3NpdGlvbigpO1xuICBlZGl0b3Iuc2V0VGV4dEluQnVmZmVyUmFuZ2UocmFuZ2UsIHNvdXJjZSk7XG4gIGNvbnN0IHtyb3csIGNvbHVtbn0gPSB1cGRhdGVDdXJzb3Iob2xkU291cmNlLCBwb3NpdGlvbiwgc291cmNlKTtcbiAgZWRpdG9yLnNldEN1cnNvckJ1ZmZlclBvc2l0aW9uKFtyb3csIGNvbHVtbl0pO1xuXG4gIC8vIFNhdmUgdGhlIGZpbGUgaWYgdGhhdCBvcHRpb24gaXMgc3BlY2lmaWVkLlxuICBpZiAoYXRvbS5jb25maWcuZ2V0KCdudWNsaWRlLWZvcm1hdC1qcy5zYXZlQWZ0ZXJSdW4nKSkge1xuICAgIGVkaXRvci5zYXZlKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmb3JtYXRDb2RlO1xuIl19