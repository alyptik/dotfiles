# display-index

This module is used by Atom's [text-buffer][text-buffer] module to implement efficient translation between screen and buffer coordinates via a balanced binary tree.

When a buffer's text is presented on screen via a display layer, it is transformed in various ways:

* Tabs are expanded from one character to multiple characters based on the distance to the next tab stop.
* Folds hide ranges of text.
* Lines are soft-wrapped.

These transformations create a non-linear mapping between positions on the screen and positions in the underlying buffer. This index is used to efficiently traverse this mapping in order to translate positions.

## DisplayIndex

### `splice (startRow, replacedCount, newScreenLines)`

Use this method to add to the index. Like `Array.prototype.splice`, it takes a start row and the number of rows you want to replace. The third arguments is an array of *screen lines*, which are objects that represent the spatial footprint of a single line on screen.

Each screen line has the following properties:

* `screenExtent` The length of the line on screen.
* `bufferExtent` The traversal distance to the start of the next screen line in the buffer.
* `tokens` An array of token objects, each with its own `screenExtent` and `bufferExtent` properties as well as an optional `metadata` property. Each token represents a certain number of columns on screen that spans a certain number of rows and columns in the buffer.
* `softWrappedAtStart` A boolean indicating whether this line continues from a previous line that ends in a soft line break.
* `softWrappedAtEnd` A boolean indicating whether this line ends with a soft line-break.

Here is an example of splicing into the display index:

```js
displayIndex.splice(0, 0, [
  {
    screenExtent: 11,
    bufferExtent: point(3, 0),
    tokens: [
      {screenExtent: 5, bufferExtent: point(0, 5), metadata: 'a'},
      // this token is a fold. it spans 1 column on screen but
      // spans 2 rows, 5 columns in the buffer.
      {screenExtent: 1, bufferExtent: point(2, 5), metadata: 'b'},
      {screenExtent: 5, bufferExtent: point(0, 5), metadata: 'c'}
    ],
    softWrappedAtStart: false,
    softWrappedAtEnd: false
  },
  {
    screenExtent: 10,
    // This line is soft-wrapped, so it has a buffer extent
    // of 0 rows, 10 columns.
    bufferExtent: point(0, 10),
    tokens: [
      {screenExtent: 5, bufferExtent: point(0, 5), metadata: 'd'},
      {screenExtent: 5, bufferExtent: point(0, 5), metadata: 'e'}
    ],
    softWrappedAtStart: false,
    softWrappedAtEnd: true
  },
  {
    screenExtent: 15,
    // This is the last line, so it also only extends 10 columns.
    bufferExtent: point(0, 10),
    tokens: [
      // This token expressed a "hanging indent", injecting 5 columns
      // on screen but consuming no space in the buffer.
      {screenExtent: 5, bufferExtent: point(0, 0), metadata: 'f'},
      {screenExtent: 5, bufferExtent: point(0, 5), metadata: 'g'},
      {screenExtent: 5, bufferExtent: point(0, 5), metadata: 'h'}
    ],
    softWrappedAtStart: true,
    softWrappedAtEnd: false
  }
])
```

As you can see above, the structure of the screen lines determines the shape of the mapping between buffer and screen, which this data structure indexes.

### `buildScreenLineIterator ()`

Constructs and returns a `ScreenLineIterator`, described below.

### `buildTokenIterator ()`

Constructs and returns a `TokenIterator`, described below.

### `getLastScreenRow ()`

Returns the last screen row in the index.

### `getScreenLineCount ()`

Returns the number of screen lines in the index.

### `lineLengthForScreenRow (screenRow)`

Returns the length of the line at the given screen row.

### `getScreenPositionWithMaxLineLength ()`

Returns a `{row, column}` object with the `row` containing the longest screen line and the `column` pointing to the length of that line.

### `getScreenLines ()`

Returns an array of all screen lines spliced into the index. Useful for debugging.

## ScreenLineIterator

This object represents a pointer to a screen line in the display index. Its position is no longer valid after `splice` is called on the index, and you'll need to use a seek method on the iterator after modifying the index to restore it to a valid location.

### `seekToScreenRow(screenRow)`

Seeks the iterator to the given screen row (an integer).

### `seekToBufferPosition(bufferPosition)`

Seeks the iterator to the line containing the given `{row, column}` buffer position. If soft wraps are present, multiple screen lines may contain the same buffer position. You can use `isSoftWrappedAtStart` and `isSoftWrappedAtEnd` to disambiguate.

### `moveToSuccessor()`

Move to the next screen line. Returns a boolean indicating whether there was a next line to move to. If there isn't a next line, stays on the last line.

### `moveToPredecessor()`

Move to the previous screen line. Returns a boolean indicating whether there was a previous line to move to. If there isn't a previous line, stays on the first line.

### `getScreenRow()`

Returns the current screen row (an integer).

### `getScreenLineLength()`

Returns the length of the current screen line as an integer.

### `getBufferStart()`

Returns the `{row, column}` position of the start of the current screen line.

### `getBufferEnd()`

Returns the `{row, column}` position of the end of the current screen line.

### `getTokens()`

Returns an array of tokens on the current line.

### `getId()`

Returns the unique integer id of the current line.

### `isSoftWrappedAtStart()`

Returns a boolean indicating whether the line continues from a soft-wrapped line. You must supply this information yourself during `splice` via the `softWrappedAtStart` property.

### `isSoftWrappedAtEnd()`

Returns a boolean indicating whether the line is soft wrapped (ends in a soft line break). You must supply this information yourself during `splice` via the `softWrappedAtEnd` property.

## TokenIterator

The token iterator is more fine-grained than the line iterator, allowing you to seek and iterate through individual tokens on screen lines.

### `seekToScreenPosition(screenPosition)`

Seeks the iterator to the rightmost token starting at or ending after the given `{row, column}` position on screen. If no token contains the given position, the nearest token is selected instead.

### `seekToBufferPosition(bufferPosition)`

Seeks the iterator to the rightmost token starting at or ending after the given `{row, column}` position in the buffer. If no token contains the given position, the nearest token is selected instead.

### `moveToSuccessor()`

Moves to the next token, returning a boolean to indicate whether a next token exists. This operation will move the iterator to the first token of the next line if it reaches the end of a line. If no next token exists, the iterator stays on the last token.

### `moveToPredecessor()`

Moves to the previous token, returning a boolean to indicate whether a previous token exists. This operation will move the iterator to the last token of the previous line if it reaches the start of a line. If no previous token exists, the iterator stays on the first token.

### `getScreenStart()`

Returns the `{row, column}` position of the start of the current token on screen.

### `getScreenEnd()`

Returns the `{row, column}` position of the end of the current token on screen.

### `getScreenExtent()`

Returns an integer indicating the length of the current token on screen.

### `getBufferStart()`

Returns the `{row, column}` position of the start of the current token in the buffer.

### `getBufferEnd()`

Returns the `{row, column}` position of the end of the current token in the buffer.

### `getBufferExtent()`

Returns the `{row, column}` extent of the current token in the buffer.

### `getMetadata()`

Returns the value supplied as the `metadata` field when populating the display index via `splice`.

### `translateBufferPosition()`

Returns the `{row, column}` screen position corresponding to the given `{row, column}` buffer position relative to the start of the token in the buffer. If the given position precedes the start of the token in the buffer, an exception is thrown. If the translated position would fall after the end of the token on screen, it is clipped to the end of the token.

### `translateScreenPosition()`

Returns the `{row, column}` buffer position corresponding to the given `{row, column}` screen position relative to the start of the token on screen. If the given position precedes the start of the token in on screen, an exception is thrown. If the translated position would fall after the end of the token in the buffer, it is clipped to the end of the token.

[text-buffer]: https://github.com/atom/text-buffer
