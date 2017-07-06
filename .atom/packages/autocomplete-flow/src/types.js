/* @flow */

export type IPoint = {
	row: number;
	column: number;

	copy(): IPoint;
	freeze(): IPoint;

	translate(delta: IPoint): IPoint;
	translate(delta: Array<number>): IPoint;
	translate(delta: {row: number, column: number}): IPoint;

	add(other: IPoint): IPoint;
	add(other: Array<number>): IPoint;
	add(other: {row: number; column: number;}): IPoint;

	splitAt(column: number): Array<IPoint>;
	compare(other: IPoint): number;
	isEqual(other: IPoint): boolean;
	isLessThan(other: IPoint): boolean;
	isLessThanOrEqual(other: IPoint): boolean;
	isGreaterThan(other: IPoint): boolean;
	isGreaterThanOrEqual(other: IPoint): boolean;
	toArray(): Array<number>;
	serialize(): Array<number>;
}

export type IRange = {
		start: IPoint;
		end: IPoint;
		serialize(): Array<Array<number>>;
		copy(): IRange;
		freeze(): IRange;
		isEqual(other: IRange): boolean;
		isEqual(other: IPoint[]): boolean;

		compare(object: IPoint[]): number;

		compare(object: {start: IPoint; end: IPoint}): number;
		compare(object: {start: Array<number>, end: IPoint}): number;
		compare(object: {start: {row: number, column: number}, end: IPoint}): number;

		compare(object:{start: IPoint, end: number[]}): number;
		compare(object:{start: Array<number>, end: number[]}): number;
		compare(object:{start: {row: number, column: number}, end: number[]}): number;

		compare(object:{start: IPoint; end: {row:number; column:number;}}): number;
		compare(object:{start: Array<number>, end: {row:number; column:number;}}): number;
		compare(object:{start: {row: number, column: number}, end: {row:number, column: number}}): number;

		isSingleLine():boolean;
		coversSameRows(other:IRange):boolean;

		add(object:IPoint[]):IRange;

		add(object:{start: IPoint; end: IPoint}):IRange;
		add(object:{start: number[]; end: IPoint}):IRange;
		add(object:{start: {row:number; column:number;}; end: IPoint}):IRange;

		add(object:{start: IPoint; end: number[]}):IRange;
		add(object:{start: number[]; end: number[]}):IRange;
		add(object:{start: {row:number; column:number;}; end: number[]}):IRange;

		add(object:{start: IPoint; end: {row:number; column:number;}}):IRange;
		add(object:{start: number[]; end: {row:number; column:number;}}):IRange;
		add(object:{start: {row:number; column:number;}; end: {row:number; column:number;}}):IRange;

		translate(startPoint:IPoint, endPoint:IPoint):IRange;
		translate(startPoint:IPoint):IRange;

		intersectsWith(otherRange:IRange):boolean;
		containsRange(otherRange:IRange, exclusive:boolean):boolean;

		containsPoint(point:IPoint, exclusive:boolean):boolean;
		containsPoint(point:number[], exclusive:boolean):boolean;
		containsPoint(point:{row:number; column:number;}, exclusive:boolean):boolean;

		intersectsRow(row:number):boolean;
		intersectsRowRange(startRow:number, endRow:number):boolean;
		union(otherRange:IRange):IRange;
		isEmpty():boolean;
		toDelta():IPoint;
		getRowCount():number;
		getRows():number[];
	}

export type TextBuffer =
  { cachedText: string
  , stoppedChangingDelay: number
  , stoppedChangingTimeout: any
  , cachedDiskContents: string
  , conflict: boolean
  , file: any // pathwatcher.IFile
  , refcount: number
  , lines: Array<string> // </>
  , lineEndings: Array<string> // </>
  , offsetIndex: any // span-skip-list.SpanSkipList
  , history: Object
  , markers: Object
  , loaded: boolean
  , digestWhenLastPersisted: string
  , modifiedWhenLastPersisted: boolean
  , useSerializedText: boolean

  , deserializeParams(params: any): any
  , serializeParams(): any

  , getText(): string
  , getLines(): string
  , isEmpty(): boolean
  , getLineCount(): number
  , getLastRow(): number
  , lineForRow(row: number): string
  , getLastLine(): string
  , lineEndingForRow(row: number): string
  , lineLengthForRow(row: number): number
  , setText(text: string): IRange
  , setTextViaDiff(text: any): any[]
  , setTextInRange(range: IRange, text: string, normalizeLineEndings?: boolean): IRange
  , insert(position: IPoint, text: string, normalizeLineEndings?: boolean): IRange
  , append(text: string, normalizeLineEndings?: boolean): IRange
  , delete(range: IRange): IRange
  , deleteRow(row: number): IRange
  , deleteRows(startRow: number, endRow: number): IRange
  , buildPatch(oldRange: IRange, newText: string, normalizeLineEndings?: boolean): Object
  , applyPatch(patch: Object): any
  , getTextInRange(range: IRange): string
  , clipRange(range: IRange): IRange
  , clipPosition(position: IPoint): IPoint
  , getFirstPosition(): IPoint
  , getEndPosition(): IPoint
  , getRange(): IRange
  , rangeForRow(row: number, includeNewline?: boolean): IRange
  , characterIndexForPosition(position: IPoint): number
  , positionForCharacterIndex(offset: number): IPoint
  , getMaxCharacterIndex(): number
  , loadSync(): TextBuffer
  , load(): Promise<TextBuffer>
  , finishLoading(): TextBuffer
  , handleTextChange(event: any): any
  , destroy(): any
  , isAlive(): boolean
  , isDestroyed(): boolean
  , isRetained(): boolean
  , retain(): TextBuffer
  , release(): TextBuffer
  , subscribeToFile(): any
  , hasMultipleEditors(): boolean
  , reload(): any
  , updateCachedDiskContentsSync(): string
  , updateCachedDiskContents(): Promise<string>
  , getBaseName(): string
  , getPath(): string
  , getUri(): string
  , setPath(filePath: string): any
  , save(): void
  , saveAs(filePath: string): any
  , isModified(): boolean
  , isInConflict(): boolean
  , destroyMarker(id: any): any
  , matchesInCharacterRange(regex: any, startIndex: any, endIndex: any): any[]
  , scan(regex: any, iterator: any): any
  , backwardsScan(regex: any, iterator: any): any
  , replace(regex: any, replacementText: any): any
  , scanInRange(regex: any, range: any, iterator: any, reverse: any): any
  , backwardsScanInRange(regex: any, range: any, iterator: any): any
  , isRowBlank(row: number): boolean
  , previousNonBlankRow(startRow: number): number
  , nextNonBlankRow(startRow: number): number
  , usesSoftTabs(): boolean
  , cancelStoppedChangingTimeout(): any
  , scheduleModifiedEvents(): any
  , emitModifiedStatusChanged(modifiedStatus: any): any
  , logLines(start: number, end: number): void

  // delegate to history property
  , undo(): any
  , redo(): any
  , transact(fn: Function): any
  , beginTransaction(): any
  , commitTransaction(): any
  , abortTransaction(): any
  , clearUndoStack(): any

  // delegate to markers property
  , markRange(range: any, properties: any): any
  , markPosition(range: any, properties: any): any
  , getMarker(id: number): Object
  , getMarkers(): Array<Object>
  , getMarkerCount(): number
  }

export type TextEditor =
  { deserializing: boolean
  , callDisplayBufferCreatedHook: boolean
  , registerEditor:boolean
  , buffer: TextBuffer
  , languageMode: any
  , cursors: Array<Object> // </>
  , selections: Array<Object> //</>
  , suppressSelectionMerging: boolean
  , updateBatchDepth: number
  , selectionFlashDuration: number
  , softTabs: boolean
  , displayBuffer: Object

  , id: number
  , behaviors: any
  , declaredPropertyValues: any
  , eventHandlersByEventName: any
  , eventHandlersByNamespace: any
  , lastOpened: number
  , subscriptionCounts: any
  , subscriptionsByObject: WeakMap
  , subscriptions: Array<Object> //</>

  , mini: any

  , serializeParams(): {id: number, softTabs: boolean, scrollTop: number, scrollLeft: number, displayBuffer: any}
  , deserializeParams(params: any): any
  , subscribeToBuffer(): void
  , subscribeToDisplayBuffer(): void
  , getViewClass(): any // return type are EditorView
  , destroyed(): void
  , isDestroyed(): boolean
  , copy(): TextEditor
  , getTitle(): string
  , getLongTitle(): string
  , setVisible(visible: boolean): void
  , setMini(mini: any): void
  , setScrollTop(scrollTop: any): void
  , getScrollTop(): number
  , setScrollLeft(scrollLeft: any): void
  , getScrollLeft(): number
  , setEditorWidthInChars(editorWidthInChars: any): void
  , getSoftWrapColumn(): number
  , getSoftTabs(): boolean
  , setSoftTabs(softTabs: boolean): void
  , getSoftWrap(): boolean
  , setSoftWrap(softWrap: any): void
  , getTabText(): string
  , getTabLength(): number
  , setTabLength(tabLength: any): void
  , usesSoftTabs(): boolean
  , clipBufferPosition(bufferPosition: any): void
  , clipBufferRange(range: any): void
  , indentationForBufferRow(bufferRow: any): void
  , setIndentationForBufferRow(bufferRow: any, newLevel: any, _arg: any): void
  , indentLevelForLine(line: any): number
  , buildIndentString(number: any): string
  , save(): void
  , saveAs(filePath: any): void
  , copyPathToClipboard(): void
  , getPath(): string
  , getText(): string
  , setText(text: any): void
  , getTextInRange(range: any): any
  , getLineCount(): number
  , getBuffer(): TextBuffer
  , getURI(): string
  , isBufferRowBlank(bufferRow: any): boolean
  , isBufferRowCommented(bufferRow: any): void
  , nextNonBlankBufferRow(bufferRow: any): void
  , getEofBufferPosition(): IPoint
  , getLastBufferRow(): number
  , bufferRangeForBufferRow(row: any, options: any): IRange
  , lineForBufferRow(row: number): string
  , lineLengthForBufferRow(row: number): number
  , scan(): any
  , scanInBufferRange(): any
  , backwardsScanInBufferRange(): any
  , isModified(): boolean
  , isEmpty(): boolean
  , shouldPromptToSave(): boolean
  , screenPositionForBufferPosition(bufferPosition: any, options?: any): IPoint
  , bufferPositionForScreenPosition(screenPosition: any, options?: any): IPoint
  , screenRangeForBufferRange(bufferRange:any): IRange
  , bufferRangeForScreenRange(screenRange:any): IRange
  , clipScreenPosition(screenPosition: any, options: any): IRange
  , lineForScreenRow(row: any): Object
  , linesForScreenRows(start?: any, end?: any): Array<Object> //</>
  , getScreenLineCount(): number
  , getMaxScreenLineLength(): number
  , getLastScreenRow(): number
  , bufferRowsForScreenRows(startRow: any, endRow: any): Array<any>
  , bufferRowForScreenRow(row: any): number
  , scopesForBufferPosition(bufferPosition: any): Array<string>
  , bufferRangeForScopeAtCursor(selector: string): any
  , tokenForBufferPosition(bufferPosition: any): Object
  , getCursorScopes(): Array<string>
  , logCursorScope(): void
  , insertText(text: string, options?: any): Array<IRange>
  , insertNewline(): Array<IRange>
  , insertNewlineBelow(): Array<IRange>
  , insertNewlineAbove(): any
  , indent(options?: any): any
  , backspace(): Array<any>
  // deprecated backspaceToBeginningOfWord():any[]
  // deprecated backspaceToBeginningOfLine():any[]
  , deleteToBeginningOfWord(): Array<any>
  , deleteToBeginningOfLine(): Array<any>
  , delete(): Array<any>
  , deleteToEndOfLine(): Array<any>
  , deleteToEndOfWord(): Array<any>
  , deleteLine(): Array<IRange>
  , indentSelectedRows(): Array<Array<IRange>>
  , outdentSelectedRows(): Array<Array<IRange>>
  , toggleLineCommentsInSelection(): Array<IRange>
  , autoIndentSelectedRows(): Array<Array<IRange>>
  , normalizeTabsInBufferRange(bufferRange: any): any
  , cutToEndOfLine(): boolean[]
  , cutSelectedText(): boolean[]
  , copySelectedText(): boolean[]
  , pasteText(options?: any): Array<IRange>
  , undo(): Array<any>
  , redo(): Array<any>
  , foldCurrentRow(): any
  , unfoldCurrentRow(): Array<any>
  , foldSelectedLines(): Array<any>
  , foldAll(): Array<any>
  , unfoldAll(): Array<any>
  , foldAllAtIndentLevel(level: any): any
  , foldBufferRow(bufferRow: any): any
  , unfoldBufferRow(bufferRow: any): any
  , isFoldableAtBufferRow(bufferRow: any): boolean
  , isFoldableAtScreenRow(screenRow: any): boolean
  , createFold(startRow: any, endRow: any): any
  , destroyFoldWithId(id: any): any
  , destroyFoldsIntersectingBufferRange(bufferRange: any): any
  , toggleFoldAtBufferRow(bufferRow: any): any
  , isFoldedAtCursorRow(): boolean
  , isFoldedAtBufferRow(bufferRow: any): boolean
  , isFoldedAtScreenRow(screenRow: any): boolean
  , largestFoldContainingBufferRow(bufferRow: any): boolean
  , largestFoldStartingAtScreenRow(screenRow: any): any
  , outermostFoldsInBufferRowRange(startRow: any, endRow: any): any[]
  , moveLineUp(): Array<any>
  , moveLineDown(): Array<any>
  , duplicateLines(): Array<Array<any>>
  // duprecated duplicateLine():any[][]
  , mutateSelectedText(fn: (selection: Object) => any): any
  , replaceSelectedText(options:any, fn:(selection:string)=>any):any
  , decorationsForScreenRowRange(startScreenRow:any, endScreenRow:any):{[id:number]: Array<any>}
  , decorateMarker(marker:any, decorationParams: {type:string, class: string}): any
  , decorationForId(id:number):any
  , getMarker(id:number):any
  , getMarkers(): Array<any>
  , findMarkers(...args: Array<any>): Array<any>
  , markScreenRange(...args: Array<any>):any
  , markBufferRange(...args: Array<any>):any
  , markScreenPosition(...args: Array<any>):any
  , markBufferPosition(...args: Array<any>):any
  , destroyMarker(...args: Array<any>):boolean
  , getMarkerCount():number
  , hasMultipleCursors():boolean
  , getCursors(): Array<any>
  , getCursor():any
  , addCursorAtScreenPosition(screenPosition:any):any
  , addCursorAtBufferPosition(bufferPosition:any):any
  , addCursor(marker:any):any
  , removeCursor(cursor:any):any[]
  , addSelection(marker:any, options:any):any
  , addSelectionForBufferRange(bufferRange:any, options:any):any
  , setSelectedBufferRange(bufferRange:any, options:any):any
  , setSelectedBufferRanges(bufferRanges:any, options:any):any
  , removeSelection(selection:any):any
  , clearSelections():boolean
  , consolidateSelections():boolean
  , selectionScreenRangeChanged(selection:any):void
  , getSelections():any[]
  , getSelection(index?:number): any
  , getLastSelection():any
  , getSelectionsOrderedByBufferPosition():any[]
  , getLastSelectionInBuffer():any
  , selectionIntersectsBufferRange(bufferRange:any):any
  , setCursorScreenPosition(position: IPoint, options?:any):any
  , getCursorScreenPosition(): IPoint
  , getCursorScreenRow():number
  , setCursorBufferPosition(position:any, options?:any):any
  , getCursorBufferPosition(): IPoint
  , getSelectedScreenRange():IRange
  , getSelectedBufferRange():IRange
  , getSelectedBufferRanges():IRange[]
  , getSelectedText():string
  , getTextInBufferRange(range:IRange):string
  , setTextInBufferRange(range:IRange | any[], text:string):any
  , getCurrentParagraphBufferRange():IRange
  , getWordUnderCursor(options?:any):string
  , moveCursorUp(lineCount?:number):void
  , moveCursorDown(lineCount?:number):void
  , moveCursorLeft():void
  , moveCursorRight():void
  , moveCursorToTop():void
  , moveCursorToBottom():void
  , moveCursorToBeginningOfScreenLine():void
  , moveCursorToBeginningOfLine():void
  , moveCursorToFirstCharacterOfLine():void
  , moveCursorToEndOfScreenLine():void
  , moveCursorToEndOfLine():void
  , moveCursorToBeginningOfWord():void
  , moveCursorToEndOfWord():void
  , moveCursorToBeginningOfNextWord():void
  , moveCursorToPreviousWordBoundary():void
  , moveCursorToNextWordBoundary():void
  , moveCursorToBeginningOfNextParagraph():void
  , moveCursorToBeginningOfPreviousParagraph():void
  , scrollToCursorPosition(options:any):any
  , pageUp():void
  , pageDown():void
  , selectPageUp():void
  , selectPageDown():void
  , getRowsPerPage():number
  , moveCursors(fn:(cursor:any)=>any):any
  , cursorMoved(event:any):void
  , selectToScreenPosition(position: IPoint):any
  , selectRight():any[]
  , selectLeft():any[]
  , selectUp(rowCount?:number):any[]
  , selectDown(rowCount?:number):any[]
  , selectToTop():any[]
  , selectAll():any[]
  , selectToBottom():any[]
  , selectToBeginningOfLine():any[]
  , selectToFirstCharacterOfLine():any[]
  , selectToEndOfLine():any[]
  , selectToPreviousWordBoundary():any[]
  , selectToNextWordBoundary():any[]
  , selectLine():any[]
  , selectLinesContainingCursors():any[]
  , addSelectionBelow():any[]
  , addSelectionAbove():any[]
  , splitSelectionsIntoLines():any[]
  , transpose():IRange[]
  , upperCase():boolean[]
  , lowerCase():boolean[]
  , joinLines():any[]
  , selectToBeginningOfWord():any[]
  , selectToEndOfWord():any[]
  , selectToBeginningOfNextWord():any[]
  , selectWord():any[]
  , selectToBeginningOfNextParagraph():any[]
  , selectToBeginningOfPreviousParagraph():any[]
  , selectMarker(marker:any):any
  , mergeCursors():number[]
  , expandSelectionsForward():any
  , expandSelectionsBackward(fn:(selection:any)=>any):any[]
  , finalizeSelections():boolean[]
  , mergeIntersectingSelections():any
  , preserveCursorPositionOnBufferReload():any
  , getGrammar(): any
  , setGrammar(grammer:any):void
  , reloadGrammar():any
  , shouldAutoIndent():boolean
  , shouldShowInvisibles():boolean
  , updateInvisibles():void
  , transact(fn:Function):any
  , beginTransaction():any
  , commitTransaction():any
  , abortTransaction():any[]
  , inspect():string
  , logScreenLines(start:number, end:number):any[]
  , handleTokenization():void
  , handleGrammarChange():void
  , handleMarkerCreated(marker:any):any
  , getSelectionMarkerAttributes():{type: string, editorId: number, invalidate: string }
  , getVerticalScrollMargin():number
  , setVerticalScrollMargin(verticalScrollMargin:number):void
  , getHorizontalScrollMargin():number
  , setHorizontalScrollMargin(horizontalScrollMargin:number):void
  , getLineHeightInPixels():number
  , setLineHeightInPixels(lineHeightInPixels:number):void
  , batchCharacterMeasurement(fn:Function):void
  , getScopedCharWidth(scopeNames:any, char:any):any
  , setScopedCharWidth(scopeNames:any, char:any, width:any):any
  , getScopedCharWidths(scopeNames:any):any
  , clearScopedCharWidths():any
  , getDefaultCharWidth():number
  , setDefaultCharWidth(defaultCharWidth:number):void
  , setHeight(height:number):void
  , getHeight():number
  , getClientHeight():number
  , setWidth(width:number):void
  , getWidth():number
  , getScrollTop():number
  , setScrollTop(scrollTop:number):void
  , getScrollBottom():number
  , setScrollBottom(scrollBottom:number):void
  , getScrollLeft():number
  , setScrollLeft(scrollLeft:number):void
  , getScrollRight():number
  , setScrollRight(scrollRight:number):void
  , getScrollHeight():number
  , getScrollWidth():number
  , getVisibleRowRange():number
  , intersectsVisibleRowRange(startRow:any, endRow:any):any
  , selectionIntersectsVisibleRowRange(selection:any):any
  , pixelPositionForScreenPosition(screenPosition:any):any
  , pixelPositionForBufferPosition(bufferPosition:any):any
  , screenPositionForPixelPosition(pixelPosition:any):any
  , pixelRectForScreenRange(screenRange:any):any
  , scrollToScreenRange(screenRange:any, options:any):any
  , scrollToScreenPosition(screenPosition:any, options:any):any
  , scrollToBufferPosition(bufferPosition:any, options:any):any
  , horizontallyScrollable():any
  , verticallyScrollable():any
  , getHorizontalScrollbarHeight():any
  , setHorizontalScrollbarHeight(height:any):any
  , getVerticalScrollbarWidth():any
  , setVerticalScrollbarWidth(width:any):any
  // deprecated joinLine():any

  , onDidChange(callback: Function): any
  , onDidDestroy(callback: Function): any
  , onDidStopChanging(callback: Function): any
  , onDidChangeCursorPosition(callback: Function): any
  , onDidSave(callback: (event: { path: string }) => void): any

  , decorateMarker(marker: any, options: any): any
  , getLastCursor(): any
  }

export type Suggestion = {
  text: string;
  displayText?: string;
  replacementPrefix?: string;
  type? : 'variable'
        | 'constant'
        | 'property'
        | 'value'
        | 'method'
        | 'function'
        | 'class'
        | 'type'
        | 'keyword'
        | 'tag'
        | 'snippet'
        | 'import'
        | 'require';
  leftLabel?: string;
  leftLabelHTML?: string;
  rightLabel?: string;
  rightLabelHTML?: string;
  className?: string;
  iconHTML?: string;
  description?: string;
  descriptionMoreURL?: string;
} | {
  snippet: string;
  displayText?: string;
  replacementPrefix?: string;
  type? : 'variable'
        | 'constant'
        | 'property'
        | 'value'
        | 'method'
        | 'function'
        | 'class'
        | 'type'
        | 'keyword'
        | 'tag'
        | 'snippet'
        | 'import'
        | 'require';
  leftLabel?: string;
  leftLabelHTML?: string;
  rightLabel?: string;
  rightLabelHTML?: string;
  className?: string;
  iconHTML?: string;
  description?: string;
  descriptionMoreURL?: string;
}

export type AutocompleteProvider =
  { selector: '.source.js, .source.js.jsx, .source.jsx'
  , disableForSelector: string
  , inclusionPriority: 0 | 1 | 2 | 3 | 4 | 5
  , excludeLowerPriority: boolean
  , getSuggestions(options: {editor: TextEditor, bufferPosition: IPoint, scopeDescriptor: Object, prefix: string}): Array<Suggestion> | Promise<Array<Suggestion>>
  , onDidInsertSuggestion?: (options: {editor: TextEditor, triggerPosition: IPoint, suggestion: any}) => void
  , dispose?: Function
  }
