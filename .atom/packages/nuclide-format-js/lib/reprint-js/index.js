var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 */

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _babelCore = require('babel-core');

var babel = _interopRequireWildcard(_babelCore);

var _optionsDefaultOptions = require('./options/DefaultOptions');

var _optionsDefaultOptions2 = _interopRequireDefault(_optionsDefaultOptions);

var _utilsFlatten = require('./utils/flatten');

var _utilsFlatten2 = _interopRequireDefault(_utilsFlatten);

var _utilsGetInvalidLeadingComments = require('./utils/getInvalidLeadingComments');

var _utilsGetInvalidLeadingComments2 = _interopRequireDefault(_utilsGetInvalidLeadingComments);

var _utilsGetInvalidTrailingComments = require('./utils/getInvalidTrailingComments');

var _utilsGetInvalidTrailingComments2 = _interopRequireDefault(_utilsGetInvalidTrailingComments);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _printersSimplePrintAnyTypeAnnotation = require('./printers/simple/printAnyTypeAnnotation');

var _printersSimplePrintAnyTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintAnyTypeAnnotation);

var _printersSimplePrintArrayExpression = require('./printers/simple/printArrayExpression');

var _printersSimplePrintArrayExpression2 = _interopRequireDefault(_printersSimplePrintArrayExpression);

var _printersSimplePrintArrayPattern = require('./printers/simple/printArrayPattern');

var _printersSimplePrintArrayPattern2 = _interopRequireDefault(_printersSimplePrintArrayPattern);

var _printersSimplePrintArrowFunctionExpression = require('./printers/simple/printArrowFunctionExpression');

var _printersSimplePrintArrowFunctionExpression2 = _interopRequireDefault(_printersSimplePrintArrowFunctionExpression);

var _printersSimplePrintAssignmentExpression = require('./printers/simple/printAssignmentExpression');

var _printersSimplePrintAssignmentExpression2 = _interopRequireDefault(_printersSimplePrintAssignmentExpression);

var _printersSimplePrintAssignmentPattern = require('./printers/simple/printAssignmentPattern');

var _printersSimplePrintAssignmentPattern2 = _interopRequireDefault(_printersSimplePrintAssignmentPattern);

var _printersSimplePrintAwaitExpression = require('./printers/simple/printAwaitExpression');

var _printersSimplePrintAwaitExpression2 = _interopRequireDefault(_printersSimplePrintAwaitExpression);

var _printersComplexPrintBinaryExpression = require('./printers/complex/printBinaryExpression');

var _printersComplexPrintBinaryExpression2 = _interopRequireDefault(_printersComplexPrintBinaryExpression);

var _printersSimplePrintBlockStatement = require('./printers/simple/printBlockStatement');

var _printersSimplePrintBlockStatement2 = _interopRequireDefault(_printersSimplePrintBlockStatement);

var _printersSimplePrintBooleanLiteralTypeAnnotation = require('./printers/simple/printBooleanLiteralTypeAnnotation');

var _printersSimplePrintBooleanLiteralTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintBooleanLiteralTypeAnnotation);

var _printersSimplePrintBooleanTypeAnnotation = require('./printers/simple/printBooleanTypeAnnotation');

var _printersSimplePrintBooleanTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintBooleanTypeAnnotation);

var _printersSimplePrintBreakStatement = require('./printers/simple/printBreakStatement');

var _printersSimplePrintBreakStatement2 = _interopRequireDefault(_printersSimplePrintBreakStatement);

var _printersSimplePrintCallExpression = require('./printers/simple/printCallExpression');

var _printersSimplePrintCallExpression2 = _interopRequireDefault(_printersSimplePrintCallExpression);

var _printersSimplePrintCatchClause = require('./printers/simple/printCatchClause');

var _printersSimplePrintCatchClause2 = _interopRequireDefault(_printersSimplePrintCatchClause);

var _printersSimplePrintClassBody = require('./printers/simple/printClassBody');

var _printersSimplePrintClassBody2 = _interopRequireDefault(_printersSimplePrintClassBody);

var _printersSimplePrintClassDeclaration = require('./printers/simple/printClassDeclaration');

var _printersSimplePrintClassDeclaration2 = _interopRequireDefault(_printersSimplePrintClassDeclaration);

var _printersSimplePrintClassProperty = require('./printers/simple/printClassProperty');

var _printersSimplePrintClassProperty2 = _interopRequireDefault(_printersSimplePrintClassProperty);

var _printersSimplePrintConditionalExpression = require('./printers/simple/printConditionalExpression');

var _printersSimplePrintConditionalExpression2 = _interopRequireDefault(_printersSimplePrintConditionalExpression);

var _printersSimplePrintContinueStatement = require('./printers/simple/printContinueStatement');

var _printersSimplePrintContinueStatement2 = _interopRequireDefault(_printersSimplePrintContinueStatement);

var _printersSimplePrintDebuggerStatement = require('./printers/simple/printDebuggerStatement');

var _printersSimplePrintDebuggerStatement2 = _interopRequireDefault(_printersSimplePrintDebuggerStatement);

var _printersSimplePrintDoWhileStatement = require('./printers/simple/printDoWhileStatement');

var _printersSimplePrintDoWhileStatement2 = _interopRequireDefault(_printersSimplePrintDoWhileStatement);

var _printersSimplePrintEmptyStatement = require('./printers/simple/printEmptyStatement');

var _printersSimplePrintEmptyStatement2 = _interopRequireDefault(_printersSimplePrintEmptyStatement);

var _printersSimplePrintExportDefaultDeclaration = require('./printers/simple/printExportDefaultDeclaration');

var _printersSimplePrintExportDefaultDeclaration2 = _interopRequireDefault(_printersSimplePrintExportDefaultDeclaration);

var _printersSimplePrintExportDefaultSpecifier = require('./printers/simple/printExportDefaultSpecifier');

var _printersSimplePrintExportDefaultSpecifier2 = _interopRequireDefault(_printersSimplePrintExportDefaultSpecifier);

var _printersSimplePrintExportNamedDeclaration = require('./printers/simple/printExportNamedDeclaration');

var _printersSimplePrintExportNamedDeclaration2 = _interopRequireDefault(_printersSimplePrintExportNamedDeclaration);

var _printersSimplePrintExportNamespaceSpecifier = require('./printers/simple/printExportNamespaceSpecifier');

var _printersSimplePrintExportNamespaceSpecifier2 = _interopRequireDefault(_printersSimplePrintExportNamespaceSpecifier);

var _printersSimplePrintExportSpecifier = require('./printers/simple/printExportSpecifier');

var _printersSimplePrintExportSpecifier2 = _interopRequireDefault(_printersSimplePrintExportSpecifier);

var _printersSimplePrintExpressionStatement = require('./printers/simple/printExpressionStatement');

var _printersSimplePrintExpressionStatement2 = _interopRequireDefault(_printersSimplePrintExpressionStatement);

var _printersSimplePrintFile = require('./printers/simple/printFile');

var _printersSimplePrintFile2 = _interopRequireDefault(_printersSimplePrintFile);

var _printersSimplePrintForInStatement = require('./printers/simple/printForInStatement');

var _printersSimplePrintForInStatement2 = _interopRequireDefault(_printersSimplePrintForInStatement);

var _printersSimplePrintForOfStatement = require('./printers/simple/printForOfStatement');

var _printersSimplePrintForOfStatement2 = _interopRequireDefault(_printersSimplePrintForOfStatement);

var _printersSimplePrintForStatement = require('./printers/simple/printForStatement');

var _printersSimplePrintForStatement2 = _interopRequireDefault(_printersSimplePrintForStatement);

var _printersSimplePrintFunctionDeclaration = require('./printers/simple/printFunctionDeclaration');

var _printersSimplePrintFunctionDeclaration2 = _interopRequireDefault(_printersSimplePrintFunctionDeclaration);

var _printersComplexPrintFunctionExpression = require('./printers/complex/printFunctionExpression');

var _printersComplexPrintFunctionExpression2 = _interopRequireDefault(_printersComplexPrintFunctionExpression);

var _printersSimplePrintFunctionTypeAnnotation = require('./printers/simple/printFunctionTypeAnnotation');

var _printersSimplePrintFunctionTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintFunctionTypeAnnotation);

var _printersSimplePrintFunctionTypeParam = require('./printers/simple/printFunctionTypeParam');

var _printersSimplePrintFunctionTypeParam2 = _interopRequireDefault(_printersSimplePrintFunctionTypeParam);

var _printersSimplePrintGenericTypeAnnotation = require('./printers/simple/printGenericTypeAnnotation');

var _printersSimplePrintGenericTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintGenericTypeAnnotation);

var _printersSimplePrintIdentifier = require('./printers/simple/printIdentifier');

var _printersSimplePrintIdentifier2 = _interopRequireDefault(_printersSimplePrintIdentifier);

var _printersSimplePrintIfStatement = require('./printers/simple/printIfStatement');

var _printersSimplePrintIfStatement2 = _interopRequireDefault(_printersSimplePrintIfStatement);

var _printersSimplePrintImportDeclaration = require('./printers/simple/printImportDeclaration');

var _printersSimplePrintImportDeclaration2 = _interopRequireDefault(_printersSimplePrintImportDeclaration);

var _printersSimplePrintImportDefaultSpecifier = require('./printers/simple/printImportDefaultSpecifier');

var _printersSimplePrintImportDefaultSpecifier2 = _interopRequireDefault(_printersSimplePrintImportDefaultSpecifier);

var _printersSimplePrintImportNamespaceSpecifier = require('./printers/simple/printImportNamespaceSpecifier');

var _printersSimplePrintImportNamespaceSpecifier2 = _interopRequireDefault(_printersSimplePrintImportNamespaceSpecifier);

var _printersSimplePrintImportSpecifier = require('./printers/simple/printImportSpecifier');

var _printersSimplePrintImportSpecifier2 = _interopRequireDefault(_printersSimplePrintImportSpecifier);

var _printersSimplePrintIntersectionTypeAnnotation = require('./printers/simple/printIntersectionTypeAnnotation');

var _printersSimplePrintIntersectionTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintIntersectionTypeAnnotation);

var _printersSimplePrintJSXAttribute = require('./printers/simple/printJSXAttribute');

var _printersSimplePrintJSXAttribute2 = _interopRequireDefault(_printersSimplePrintJSXAttribute);

var _printersSimplePrintJSXClosingElement = require('./printers/simple/printJSXClosingElement');

var _printersSimplePrintJSXClosingElement2 = _interopRequireDefault(_printersSimplePrintJSXClosingElement);

var _printersSimplePrintJSXElement = require('./printers/simple/printJSXElement');

var _printersSimplePrintJSXElement2 = _interopRequireDefault(_printersSimplePrintJSXElement);

var _printersSimplePrintJSXExpressionContainer = require('./printers/simple/printJSXExpressionContainer');

var _printersSimplePrintJSXExpressionContainer2 = _interopRequireDefault(_printersSimplePrintJSXExpressionContainer);

var _printersSimplePrintJSXIdentifier = require('./printers/simple/printJSXIdentifier');

var _printersSimplePrintJSXIdentifier2 = _interopRequireDefault(_printersSimplePrintJSXIdentifier);

var _printersSimplePrintJSXMemberExpression = require('./printers/simple/printJSXMemberExpression');

var _printersSimplePrintJSXMemberExpression2 = _interopRequireDefault(_printersSimplePrintJSXMemberExpression);

var _printersSimplePrintJSXOpeningElement = require('./printers/simple/printJSXOpeningElement');

var _printersSimplePrintJSXOpeningElement2 = _interopRequireDefault(_printersSimplePrintJSXOpeningElement);

var _printersSimplePrintJSXSpreadAttribute = require('./printers/simple/printJSXSpreadAttribute');

var _printersSimplePrintJSXSpreadAttribute2 = _interopRequireDefault(_printersSimplePrintJSXSpreadAttribute);

var _printersSimplePrintLabeledStatement = require('./printers/simple/printLabeledStatement');

var _printersSimplePrintLabeledStatement2 = _interopRequireDefault(_printersSimplePrintLabeledStatement);

var _printersComplexPrintLiteral = require('./printers/complex/printLiteral');

var _printersComplexPrintLiteral2 = _interopRequireDefault(_printersComplexPrintLiteral);

var _printersComplexPrintLogicalExpression = require('./printers/complex/printLogicalExpression');

var _printersComplexPrintLogicalExpression2 = _interopRequireDefault(_printersComplexPrintLogicalExpression);

var _printersComplexPrintMemberExpression = require('./printers/complex/printMemberExpression');

var _printersComplexPrintMemberExpression2 = _interopRequireDefault(_printersComplexPrintMemberExpression);

var _printersSimplePrintMethodDefinition = require('./printers/simple/printMethodDefinition');

var _printersSimplePrintMethodDefinition2 = _interopRequireDefault(_printersSimplePrintMethodDefinition);

var _printersSimplePrintMixedTypeAnnotation = require('./printers/simple/printMixedTypeAnnotation');

var _printersSimplePrintMixedTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintMixedTypeAnnotation);

var _printersSimplePrintNewExpression = require('./printers/simple/printNewExpression');

var _printersSimplePrintNewExpression2 = _interopRequireDefault(_printersSimplePrintNewExpression);

var _printersSimplePrintNullableTypeAnnotation = require('./printers/simple/printNullableTypeAnnotation');

var _printersSimplePrintNullableTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintNullableTypeAnnotation);

var _printersSimplePrintNumberLiteralTypeAnnotation = require('./printers/simple/printNumberLiteralTypeAnnotation');

var _printersSimplePrintNumberLiteralTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintNumberLiteralTypeAnnotation);

var _printersSimplePrintNumberTypeAnnotation = require('./printers/simple/printNumberTypeAnnotation');

var _printersSimplePrintNumberTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintNumberTypeAnnotation);

var _printersSimplePrintObjectExpression = require('./printers/simple/printObjectExpression');

var _printersSimplePrintObjectExpression2 = _interopRequireDefault(_printersSimplePrintObjectExpression);

var _printersSimplePrintObjectPattern = require('./printers/simple/printObjectPattern');

var _printersSimplePrintObjectPattern2 = _interopRequireDefault(_printersSimplePrintObjectPattern);

var _printersSimplePrintObjectTypeAnnotation = require('./printers/simple/printObjectTypeAnnotation');

var _printersSimplePrintObjectTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintObjectTypeAnnotation);

var _printersSimplePrintObjectTypeProperty = require('./printers/simple/printObjectTypeProperty');

var _printersSimplePrintObjectTypeProperty2 = _interopRequireDefault(_printersSimplePrintObjectTypeProperty);

var _printersSimplePrintProgram = require('./printers/simple/printProgram');

var _printersSimplePrintProgram2 = _interopRequireDefault(_printersSimplePrintProgram);

var _printersSimplePrintProperty = require('./printers/simple/printProperty');

var _printersSimplePrintProperty2 = _interopRequireDefault(_printersSimplePrintProperty);

var _printersSimplePrintQualifiedTypeIdentifier = require('./printers/simple/printQualifiedTypeIdentifier');

var _printersSimplePrintQualifiedTypeIdentifier2 = _interopRequireDefault(_printersSimplePrintQualifiedTypeIdentifier);

var _printersSimplePrintRestElement = require('./printers/simple/printRestElement');

var _printersSimplePrintRestElement2 = _interopRequireDefault(_printersSimplePrintRestElement);

var _printersSimplePrintReturnStatement = require('./printers/simple/printReturnStatement');

var _printersSimplePrintReturnStatement2 = _interopRequireDefault(_printersSimplePrintReturnStatement);

var _printersSimplePrintSpreadElement = require('./printers/simple/printSpreadElement');

var _printersSimplePrintSpreadElement2 = _interopRequireDefault(_printersSimplePrintSpreadElement);

var _printersSimplePrintSpreadProperty = require('./printers/simple/printSpreadProperty');

var _printersSimplePrintSpreadProperty2 = _interopRequireDefault(_printersSimplePrintSpreadProperty);

var _printersSimplePrintStringLiteralTypeAnnotation = require('./printers/simple/printStringLiteralTypeAnnotation');

var _printersSimplePrintStringLiteralTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintStringLiteralTypeAnnotation);

var _printersSimplePrintStringTypeAnnotation = require('./printers/simple/printStringTypeAnnotation');

var _printersSimplePrintStringTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintStringTypeAnnotation);

var _printersSimplePrintSuper = require('./printers/simple/printSuper');

var _printersSimplePrintSuper2 = _interopRequireDefault(_printersSimplePrintSuper);

var _printersSimplePrintSwitchCase = require('./printers/simple/printSwitchCase');

var _printersSimplePrintSwitchCase2 = _interopRequireDefault(_printersSimplePrintSwitchCase);

var _printersSimplePrintSwitchStatement = require('./printers/simple/printSwitchStatement');

var _printersSimplePrintSwitchStatement2 = _interopRequireDefault(_printersSimplePrintSwitchStatement);

var _printersSimplePrintTaggedTemplateExpression = require('./printers/simple/printTaggedTemplateExpression');

var _printersSimplePrintTaggedTemplateExpression2 = _interopRequireDefault(_printersSimplePrintTaggedTemplateExpression);

var _printersSimplePrintTemplateElement = require('./printers/simple/printTemplateElement');

var _printersSimplePrintTemplateElement2 = _interopRequireDefault(_printersSimplePrintTemplateElement);

var _printersSimplePrintTemplateLiteral = require('./printers/simple/printTemplateLiteral');

var _printersSimplePrintTemplateLiteral2 = _interopRequireDefault(_printersSimplePrintTemplateLiteral);

var _printersSimplePrintThisExpression = require('./printers/simple/printThisExpression');

var _printersSimplePrintThisExpression2 = _interopRequireDefault(_printersSimplePrintThisExpression);

var _printersSimplePrintThrowStatement = require('./printers/simple/printThrowStatement');

var _printersSimplePrintThrowStatement2 = _interopRequireDefault(_printersSimplePrintThrowStatement);

var _printersSimplePrintTryStatement = require('./printers/simple/printTryStatement');

var _printersSimplePrintTryStatement2 = _interopRequireDefault(_printersSimplePrintTryStatement);

var _printersSimplePrintTupleTypeAnnotation = require('./printers/simple/printTupleTypeAnnotation');

var _printersSimplePrintTupleTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintTupleTypeAnnotation);

var _printersSimplePrintTypeAlias = require('./printers/simple/printTypeAlias');

var _printersSimplePrintTypeAlias2 = _interopRequireDefault(_printersSimplePrintTypeAlias);

var _printersSimplePrintTypeAnnotation = require('./printers/simple/printTypeAnnotation');

var _printersSimplePrintTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintTypeAnnotation);

var _printersSimplePrintTypeofTypeAnnotation = require('./printers/simple/printTypeofTypeAnnotation');

var _printersSimplePrintTypeofTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintTypeofTypeAnnotation);

var _printersSimplePrintTypeParameterDeclaration = require('./printers/simple/printTypeParameterDeclaration');

var _printersSimplePrintTypeParameterDeclaration2 = _interopRequireDefault(_printersSimplePrintTypeParameterDeclaration);

var _printersSimplePrintTypeParameterInstantiation = require('./printers/simple/printTypeParameterInstantiation');

var _printersSimplePrintTypeParameterInstantiation2 = _interopRequireDefault(_printersSimplePrintTypeParameterInstantiation);

var _printersSimplePrintUnaryExpression = require('./printers/simple/printUnaryExpression');

var _printersSimplePrintUnaryExpression2 = _interopRequireDefault(_printersSimplePrintUnaryExpression);

var _printersSimplePrintUnionTypeAnnotation = require('./printers/simple/printUnionTypeAnnotation');

var _printersSimplePrintUnionTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintUnionTypeAnnotation);

var _printersSimplePrintUpdateExpression = require('./printers/simple/printUpdateExpression');

var _printersSimplePrintUpdateExpression2 = _interopRequireDefault(_printersSimplePrintUpdateExpression);

var _printersComplexPrintVariableDeclaration = require('./printers/complex/printVariableDeclaration');

var _printersComplexPrintVariableDeclaration2 = _interopRequireDefault(_printersComplexPrintVariableDeclaration);

var _printersSimplePrintVariableDeclarator = require('./printers/simple/printVariableDeclarator');

var _printersSimplePrintVariableDeclarator2 = _interopRequireDefault(_printersSimplePrintVariableDeclarator);

var _printersSimplePrintVoidTypeAnnotation = require('./printers/simple/printVoidTypeAnnotation');

var _printersSimplePrintVoidTypeAnnotation2 = _interopRequireDefault(_printersSimplePrintVoidTypeAnnotation);

var _printersSimplePrintWhileStatement = require('./printers/simple/printWhileStatement');

var _printersSimplePrintWhileStatement2 = _interopRequireDefault(_printersSimplePrintWhileStatement);

var _printersSimplePrintWithStatement = require('./printers/simple/printWithStatement');

var _printersSimplePrintWithStatement2 = _interopRequireDefault(_printersSimplePrintWithStatement);

var _printersSimplePrintYieldExpression = require('./printers/simple/printYieldExpression');

var _printersSimplePrintYieldExpression2 = _interopRequireDefault(_printersSimplePrintYieldExpression);

var _resolversResolveLines = require('./resolvers/resolveLines');

var _resolversResolveLines2 = _interopRequireDefault(_resolversResolveLines);

var _wrappersComplexWrapWithComments = require('./wrappers/complex/wrapWithComments');

var _wrappersComplexWrapWithComments2 = _interopRequireDefault(_wrappersComplexWrapWithComments);

/**
 * Entry point into reprint. Parses the source into an AST and then prints it
 * according to the given options.
 */
function reprint(source, nullableOptions) {
  var options = nullableOptions || _optionsDefaultOptions2['default'];
  var ast = babel.parse(source);
  var lines = (0, _utilsFlatten2['default'])(printWithWrappers(ast, {
    invalidLeadingComments: (0, _utilsGetInvalidLeadingComments2['default'])(ast),
    invalidTrailingComments: (0, _utilsGetInvalidTrailingComments2['default'])(ast),
    options: options,
    path: _immutable2['default'].List()
  }));
  return (0, _resolversResolveLines2['default'])(lines, options);
}

/**
 * Helper to build a print function for the given node and context.
 */
function getPrintFn(node, context) {
  var nextContext = _extends({}, context, {
    path: context.path.push(node)
  });
  return function (x) {
    return printWithWrappers(x, nextContext);
  };
}

/**
 * Generic print function that will return an array of strings for the given
 * ast node.
 */
function printWithWrappers(node, context) {
  if (!node) {
    return [];
  }

  var print = getPrintFn(node, context);
  var lines = printWithoutWrappers(node, context);
  lines = (0, _wrappersComplexWrapWithComments2['default'])(print, node, context, lines);
  return lines;
}

/**
 * Prints the node ignoring comments.
 */
function printWithoutWrappers(node, context) {
  if (!node) {
    return [];
  }

  var print = getPrintFn(node, context);

  /**
   * Simple printers.
   */
  switch (node.type) {
    case 'ArrayExpression':
      return (0, _printersSimplePrintArrayExpression2['default'])(print, node);

    case 'ArrayPattern':
      return (0, _printersSimplePrintArrayPattern2['default'])(print, node);

    case 'ArrowFunctionExpression':
      return (0, _printersSimplePrintArrowFunctionExpression2['default'])(print, node);

    case 'AssignmentExpression':
      return (0, _printersSimplePrintAssignmentExpression2['default'])(print, node);

    case 'AssignmentPattern':
      return (0, _printersSimplePrintAssignmentPattern2['default'])(print, node);

    case 'AwaitExpression':
      return (0, _printersSimplePrintAwaitExpression2['default'])(print, node);

    case 'BlockStatement':
      return (0, _printersSimplePrintBlockStatement2['default'])(print, node);

    case 'BreakStatement':
      return (0, _printersSimplePrintBreakStatement2['default'])(print, node);

    case 'CallExpression':
      return (0, _printersSimplePrintCallExpression2['default'])(print, node);

    case 'CatchClause':
      return (0, _printersSimplePrintCatchClause2['default'])(print, node);

    case 'ClassBody':
      return (0, _printersSimplePrintClassBody2['default'])(print, node);

    case 'ClassDeclaration':
      return (0, _printersSimplePrintClassDeclaration2['default'])(print, node);

    case 'ClassProperty':
      return (0, _printersSimplePrintClassProperty2['default'])(print, node);

    case 'ConditionalExpression':
      return (0, _printersSimplePrintConditionalExpression2['default'])(print, node);

    case 'ContinueStatement':
      return (0, _printersSimplePrintContinueStatement2['default'])(print, node);

    case 'DebuggerStatement':
      return (0, _printersSimplePrintDebuggerStatement2['default'])(print, node);

    case 'DoWhileStatement':
      return (0, _printersSimplePrintDoWhileStatement2['default'])(print, node);

    case 'EmptyStatement':
      return (0, _printersSimplePrintEmptyStatement2['default'])(print, node);

    case 'ExportDefaultDeclaration':
      return (0, _printersSimplePrintExportDefaultDeclaration2['default'])(print, node);

    case 'ExportDefaultSpecifier':
      return (0, _printersSimplePrintExportDefaultSpecifier2['default'])(print, node);

    case 'ExportNamedDeclaration':
      return (0, _printersSimplePrintExportNamedDeclaration2['default'])(print, node);

    case 'ExportNamespaceSpecifier':
      return (0, _printersSimplePrintExportNamespaceSpecifier2['default'])(print, node);

    case 'ExportSpecifier':
      return (0, _printersSimplePrintExportSpecifier2['default'])(print, node);

    case 'ExpressionStatement':
      return (0, _printersSimplePrintExpressionStatement2['default'])(print, node);

    case 'File':
      return (0, _printersSimplePrintFile2['default'])(print, node);

    case 'ForInStatement':
      return (0, _printersSimplePrintForInStatement2['default'])(print, node);

    case 'ForOfStatement':
      return (0, _printersSimplePrintForOfStatement2['default'])(print, node);

    case 'ForStatement':
      return (0, _printersSimplePrintForStatement2['default'])(print, node);

    case 'FunctionDeclaration':
      return (0, _printersSimplePrintFunctionDeclaration2['default'])(print, node);

    case 'Identifier':
      return (0, _printersSimplePrintIdentifier2['default'])(print, node);

    case 'IfStatement':
      return (0, _printersSimplePrintIfStatement2['default'])(print, node);

    case 'ImportDeclaration':
      return (0, _printersSimplePrintImportDeclaration2['default'])(print, node);

    case 'ImportDefaultSpecifier':
      return (0, _printersSimplePrintImportDefaultSpecifier2['default'])(print, node);

    case 'ImportNamespaceSpecifier':
      return (0, _printersSimplePrintImportNamespaceSpecifier2['default'])(print, node);

    case 'ImportSpecifier':
      return (0, _printersSimplePrintImportSpecifier2['default'])(print, node);

    case 'LabeledStatement':
      return (0, _printersSimplePrintLabeledStatement2['default'])(print, node);

    case 'MethodDefinition':
      return (0, _printersSimplePrintMethodDefinition2['default'])(print, node);

    case 'NewExpression':
      return (0, _printersSimplePrintNewExpression2['default'])(print, node);

    case 'ObjectExpression':
      return (0, _printersSimplePrintObjectExpression2['default'])(print, node);

    case 'ObjectPattern':
      return (0, _printersSimplePrintObjectPattern2['default'])(print, node);

    case 'Program':
      return (0, _printersSimplePrintProgram2['default'])(print, node);

    case 'Property':
      return (0, _printersSimplePrintProperty2['default'])(print, node);

    case 'RestElement':
      return (0, _printersSimplePrintRestElement2['default'])(print, node);

    case 'ReturnStatement':
      return (0, _printersSimplePrintReturnStatement2['default'])(print, node);

    case 'SpreadElement':
      return (0, _printersSimplePrintSpreadElement2['default'])(print, node);

    case 'SpreadProperty':
      return (0, _printersSimplePrintSpreadProperty2['default'])(print, node);

    case 'Super':
      return (0, _printersSimplePrintSuper2['default'])(print, node);

    case 'SwitchCase':
      return (0, _printersSimplePrintSwitchCase2['default'])(print, node);

    case 'SwitchStatement':
      return (0, _printersSimplePrintSwitchStatement2['default'])(print, node);

    case 'TaggedTemplateExpression':
      return (0, _printersSimplePrintTaggedTemplateExpression2['default'])(print, node);

    case 'TemplateElement':
      return (0, _printersSimplePrintTemplateElement2['default'])(print, node);

    case 'TemplateLiteral':
      return (0, _printersSimplePrintTemplateLiteral2['default'])(print, node);

    case 'ThisExpression':
      return (0, _printersSimplePrintThisExpression2['default'])(print, node);

    case 'ThrowStatement':
      return (0, _printersSimplePrintThrowStatement2['default'])(print, node);

    case 'TryStatement':
      return (0, _printersSimplePrintTryStatement2['default'])(print, node);

    case 'UnaryExpression':
      return (0, _printersSimplePrintUnaryExpression2['default'])(print, node);

    case 'UpdateExpression':
      return (0, _printersSimplePrintUpdateExpression2['default'])(print, node);

    case 'VariableDeclarator':
      return (0, _printersSimplePrintVariableDeclarator2['default'])(print, node);

    case 'WhileStatement':
      return (0, _printersSimplePrintWhileStatement2['default'])(print, node);

    case 'WithStatement':
      return (0, _printersSimplePrintWithStatement2['default'])(print, node);

    case 'YieldExpression':
      return (0, _printersSimplePrintYieldExpression2['default'])(print, node);
  }

  /**
   * Complex printers -- meaning they require context.
   */
  switch (node.type) {
    case 'BinaryExpression':
      return (0, _printersComplexPrintBinaryExpression2['default'])(print, node, context);

    case 'FunctionExpression':
      return (0, _printersComplexPrintFunctionExpression2['default'])(print, node, context);

    case 'Literal':
      return (0, _printersComplexPrintLiteral2['default'])(print, node, context);

    case 'LogicalExpression':
      return (0, _printersComplexPrintLogicalExpression2['default'])(print, node, context);

    case 'MemberExpression':
      return (0, _printersComplexPrintMemberExpression2['default'])(print, node, context);

    case 'VariableDeclaration':
      return (0, _printersComplexPrintVariableDeclaration2['default'])(print, node, context);
  }

  /**
   * JSX Nodes
   */
  switch (node.type) {
    case 'JSXAttribute':
      return (0, _printersSimplePrintJSXAttribute2['default'])(print, node);

    case 'JSXClosingElement':
      return (0, _printersSimplePrintJSXClosingElement2['default'])(print, node);

    case 'JSXElement':
      return (0, _printersSimplePrintJSXElement2['default'])(print, node);

    case 'JSXExpressionContainer':
      return (0, _printersSimplePrintJSXExpressionContainer2['default'])(print, node);

    case 'JSXIdentifier':
      return (0, _printersSimplePrintJSXIdentifier2['default'])(print, node);

    case 'JSXMemberExpression':
      return (0, _printersSimplePrintJSXMemberExpression2['default'])(print, node);

    case 'JSXOpeningElement':
      return (0, _printersSimplePrintJSXOpeningElement2['default'])(print, node);

    case 'JSXSpreadAttribute':
      return (0, _printersSimplePrintJSXSpreadAttribute2['default'])(print, node);
  }

  /**
   * Flow types.
   */
  switch (node.type) {
    case 'AnyTypeAnnotation':
      return (0, _printersSimplePrintAnyTypeAnnotation2['default'])(print, node);

    case 'BooleanLiteralTypeAnnotation':
      return (0, _printersSimplePrintBooleanLiteralTypeAnnotation2['default'])(print, node);

    case 'BooleanTypeAnnotation':
      return (0, _printersSimplePrintBooleanTypeAnnotation2['default'])(print, node);

    case 'FunctionTypeAnnotation':
      return (0, _printersSimplePrintFunctionTypeAnnotation2['default'])(print, node);

    case 'FunctionTypeParam':
      return (0, _printersSimplePrintFunctionTypeParam2['default'])(print, node);

    case 'GenericTypeAnnotation':
      return (0, _printersSimplePrintGenericTypeAnnotation2['default'])(print, node);

    case 'IntersectionTypeAnnotation':
      return (0, _printersSimplePrintIntersectionTypeAnnotation2['default'])(print, node);

    case 'MixedTypeAnnotation':
      return (0, _printersSimplePrintMixedTypeAnnotation2['default'])(print, node);

    case 'NullableTypeAnnotation':
      return (0, _printersSimplePrintNullableTypeAnnotation2['default'])(print, node);

    case 'NumberLiteralTypeAnnotation':
      return (0, _printersSimplePrintNumberLiteralTypeAnnotation2['default'])(print, node);

    case 'NumberTypeAnnotation':
      return (0, _printersSimplePrintNumberTypeAnnotation2['default'])(print, node);

    case 'ObjectTypeAnnotation':
      return (0, _printersSimplePrintObjectTypeAnnotation2['default'])(print, node);

    case 'ObjectTypeProperty':
      return (0, _printersSimplePrintObjectTypeProperty2['default'])(print, node);

    case 'QualifiedTypeIdentifier':
      return (0, _printersSimplePrintQualifiedTypeIdentifier2['default'])(print, node);

    case 'StringLiteralTypeAnnotation':
      return (0, _printersSimplePrintStringLiteralTypeAnnotation2['default'])(print, node);

    case 'StringTypeAnnotation':
      return (0, _printersSimplePrintStringTypeAnnotation2['default'])(print, node);

    case 'TupleTypeAnnotation':
      return (0, _printersSimplePrintTupleTypeAnnotation2['default'])(print, node);

    case 'TypeAlias':
      return (0, _printersSimplePrintTypeAlias2['default'])(print, node);

    case 'TypeAnnotation':
      return (0, _printersSimplePrintTypeAnnotation2['default'])(print, node);

    case 'TypeofTypeAnnotation':
      return (0, _printersSimplePrintTypeofTypeAnnotation2['default'])(print, node);

    case 'TypeParameterDeclaration':
      return (0, _printersSimplePrintTypeParameterDeclaration2['default'])(print, node);

    case 'TypeParameterInstantiation':
      return (0, _printersSimplePrintTypeParameterInstantiation2['default'])(print, node);

    case 'UnionTypeAnnotation':
      return (0, _printersSimplePrintUnionTypeAnnotation2['default'])(print, node);

    case 'VoidTypeAnnotation':
      return (0, _printersSimplePrintVoidTypeAnnotation2['default'])(print, node);
  }

  /**
   * I'm not sure what these are. I need to figure that out and implement them!
   */
  switch (node.type) {
    // Not sure how to create any of these.
    case 'ClassExpression':
    case 'ClassPropertyDefinition':
    case 'DeclareClass':
    case 'DeclareModule':
    case 'DeclareVariable':
    case 'InterfaceDeclaration':
    case 'InterfaceExtends':
    case 'JSXEmptyExpression':
    case 'JSXNamespacedName':
    case 'MemberTypeAnnotation':
    case 'ModuleSpecifier':
    case 'ObjectTypeCallProperty':
    case 'ObjectTypeIndexer':
    case 'TypeCaseExpression':
    // I believe this is now replaced with TupleTypeAnnotation: [string].
    /* fallthrough */
    case 'ArrayTypeAnnotation':
    // I think this is a literal within JSXElement's children for certain
    // parsers, but Babylon appears to just use Literal.
    /* fallthrough */
    case 'JSXText':
      return [];
  }

  /**
   * What these nodes do is not well defined. They may be stage 0 proposals for
   * example.
   */
  switch (node.type) {
    case 'ClassImplements':
    case 'ComprehensionBlock':
    case 'ComprehensionExpression':
    case 'GeneratorExpression':
    case 'SequenceExpression':
      return [];
  }

  (0, _assert2['default'])(false, 'Unknown node type: %s', node.type);
}

module.exports = reprint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXByaW50LWpzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBYXNCLFdBQVc7Ozs7eUJBQ1YsWUFBWTs7SUFBdkIsS0FBSzs7cUNBRVUsMEJBQTBCOzs7OzRCQUNqQyxpQkFBaUI7Ozs7OENBQ0MsbUNBQW1DOzs7OytDQUNsQyxvQ0FBb0M7Ozs7c0JBQ3JELFFBQVE7Ozs7b0RBQ0ssMENBQTBDOzs7O2tEQUM1Qyx3Q0FBd0M7Ozs7K0NBQzNDLHFDQUFxQzs7OzswREFDMUIsZ0RBQWdEOzs7O3VEQUNuRCw2Q0FBNkM7Ozs7b0RBQ2hELDBDQUEwQzs7OztrREFDNUMsd0NBQXdDOzs7O29EQUN2QywwQ0FBMEM7Ozs7aURBQzVDLHVDQUF1Qzs7OzsrREFDekIscURBQXFEOzs7O3dEQUM1RCw4Q0FBOEM7Ozs7aURBQ3JELHVDQUF1Qzs7OztpREFDdkMsdUNBQXVDOzs7OzhDQUMxQyxvQ0FBb0M7Ozs7NENBQ3RDLGtDQUFrQzs7OzttREFDM0IseUNBQXlDOzs7O2dEQUM1QyxzQ0FBc0M7Ozs7d0RBQzlCLDhDQUE4Qzs7OztvREFDbEQsMENBQTBDOzs7O29EQUMxQywwQ0FBMEM7Ozs7bURBQzNDLHlDQUF5Qzs7OztpREFDM0MsdUNBQXVDOzs7OzJEQUM3QixpREFBaUQ7Ozs7eURBQ25ELCtDQUErQzs7Ozt5REFDL0MsK0NBQStDOzs7OzJEQUM3QyxpREFBaUQ7Ozs7a0RBQzFELHdDQUF3Qzs7OztzREFDcEMsNENBQTRDOzs7O3VDQUMzRCw2QkFBNkI7Ozs7aURBQ25CLHVDQUF1Qzs7OztpREFDdkMsdUNBQXVDOzs7OytDQUN6QyxxQ0FBcUM7Ozs7c0RBQzlCLDRDQUE0Qzs7OztzREFDN0MsNENBQTRDOzs7O3lEQUN4QywrQ0FBK0M7Ozs7b0RBQ3BELDBDQUEwQzs7Ozt3REFDdEMsOENBQThDOzs7OzZDQUN6RCxtQ0FBbUM7Ozs7OENBQ2xDLG9DQUFvQzs7OztvREFDOUIsMENBQTBDOzs7O3lEQUNy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QXNCLENBQUM7QUFDNUIsU0FBSyxrQkFBa0IsQ0FBQztBQUN4QixTQUFLLG9CQUFvQixDQUFDO0FBQzFCLFNBQUssbUJBQW1CLENBQUM7QUFDekIsU0FBSyxzQkFBc0IsQ0FBQztBQUM1QixTQUFLLGlCQUFpQixDQUFDO0FBQ3ZCLFNBQUssd0JBQXdCLENBQUM7QUFDOUIsU0FBSyxtQkFBbUIsQ0FBQztBQUN6QixTQUFLLG9CQUFvQixDQUFDOzs7QUFHMUIsU0FBSyxxQkFBcUIsQ0FBQzs7OztBQUkzQixTQUFLLFNBQVM7QUFDWixhQUFPLEVBQUUsQ0FBQztBQUFBLEdBQ2I7Ozs7OztBQU1ELFVBQVEsSUFBSSxDQUFDLElBQUk7QUFDZixTQUFLLGlCQUFpQixDQUFDO0FBQ3ZCLFNBQUssb0JBQW9CLENBQUM7QUFDMUIsU0FBSyx5QkFBeUIsQ0FBQztBQUMvQixTQUFLLHFCQUFxQixDQUFDO0FBQzNCLFNBQUssb0JBQW9CO0FBQ3ZCLGFBQU8sRUFBRSxDQUFDO0FBQUEsR0FDYjs7QUFFRCwyQkFBVSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3REOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge0NvbnRleHQsIExpbmVzLCBPdXRwdXQsIFByaW50fSBmcm9tICcuL3R5cGVzL2NvbW1vbic7XG5pbXBvcnQgdHlwZSBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9PcHRpb25zJztcblxuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0ICogYXMgYmFiZWwgZnJvbSAnYmFiZWwtY29yZSc7XG5cbmltcG9ydCBEZWZhdWx0T3B0aW9ucyBmcm9tICcuL29wdGlvbnMvRGVmYXVsdE9wdGlvbnMnO1xuaW1wb3J0IGZsYXR0ZW4gZnJvbSAnLi91dGlscy9mbGF0dGVuJztcbmltcG9ydCBnZXRJbnZhbGlkTGVhZGluZ0NvbW1lbnRzIGZyb20gJy4vdXRpbHMvZ2V0SW52YWxpZExlYWRpbmdDb21tZW50cyc7XG5pbXBvcnQgZ2V0SW52YWxpZFRyYWlsaW5nQ29tbWVudHMgZnJvbSAnLi91dGlscy9nZXRJbnZhbGlkVHJhaWxpbmdDb21tZW50cyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgcHJpbnRBbnlUeXBlQW5ub3RhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEFueVR5cGVBbm5vdGF0aW9uJztcbmltcG9ydCBwcmludEFycmF5RXhwcmVzc2lvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEFycmF5RXhwcmVzc2lvbic7XG5pbXBvcnQgcHJpbnRBcnJheVBhdHRlcm4gZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRBcnJheVBhdHRlcm4nO1xuaW1wb3J0IHByaW50QXJyb3dGdW5jdGlvbkV4cHJlc3Npb24gZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRBcnJvd0Z1bmN0aW9uRXhwcmVzc2lvbic7XG5pbXBvcnQgcHJpbnRBc3NpZ25tZW50RXhwcmVzc2lvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEFzc2lnbm1lbnRFeHByZXNzaW9uJztcbmltcG9ydCBwcmludEFzc2lnbm1lbnRQYXR0ZXJuIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50QXNzaWdubWVudFBhdHRlcm4nO1xuaW1wb3J0IHByaW50QXdhaXRFeHByZXNzaW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50QXdhaXRFeHByZXNzaW9uJztcbmltcG9ydCBwcmludEJpbmFyeUV4cHJlc3Npb24gZnJvbSAnLi9wcmludGVycy9jb21wbGV4L3ByaW50QmluYXJ5RXhwcmVzc2lvbic7XG5pbXBvcnQgcHJpbnRCbG9ja1N0YXRlbWVudCBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEJsb2NrU3RhdGVtZW50JztcbmltcG9ydCBwcmludEJvb2xlYW5MaXRlcmFsVHlwZUFubm90YXRpb24gZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRCb29sZWFuTGl0ZXJhbFR5cGVBbm5vdGF0aW9uJztcbmltcG9ydCBwcmludEJvb2xlYW5UeXBlQW5ub3RhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEJvb2xlYW5UeXBlQW5ub3RhdGlvbic7XG5pbXBvcnQgcHJpbnRCcmVha1N0YXRlbWVudCBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEJyZWFrU3RhdGVtZW50JztcbmltcG9ydCBwcmludENhbGxFeHByZXNzaW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50Q2FsbEV4cHJlc3Npb24nO1xuaW1wb3J0IHByaW50Q2F0Y2hDbGF1c2UgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRDYXRjaENsYXVzZSc7XG5pbXBvcnQgcHJpbnRDbGFzc0JvZHkgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRDbGFzc0JvZHknO1xuaW1wb3J0IHByaW50Q2xhc3NEZWNsYXJhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludENsYXNzRGVjbGFyYXRpb24nO1xuaW1wb3J0IHByaW50Q2xhc3NQcm9wZXJ0eSBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludENsYXNzUHJvcGVydHknO1xuaW1wb3J0IHByaW50Q29uZGl0aW9uYWxFeHByZXNzaW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50Q29uZGl0aW9uYWxFeHByZXNzaW9uJztcbmltcG9ydCBwcmludENvbnRpbnVlU3RhdGVtZW50IGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50Q29udGludWVTdGF0ZW1lbnQnO1xuaW1wb3J0IHByaW50RGVidWdnZXJTdGF0ZW1lbnQgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnREZWJ1Z2dlclN0YXRlbWVudCc7XG5pbXBvcnQgcHJpbnREb1doaWxlU3RhdGVtZW50IGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50RG9XaGlsZVN0YXRlbWVudCc7XG5pbXBvcnQgcHJpbnRFbXB0eVN0YXRlbWVudCBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEVtcHR5U3RhdGVtZW50JztcbmltcG9ydCBwcmludEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbic7XG5pbXBvcnQgcHJpbnRFeHBvcnREZWZhdWx0U3BlY2lmaWVyIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50RXhwb3J0RGVmYXVsdFNwZWNpZmllcic7XG5pbXBvcnQgcHJpbnRFeHBvcnROYW1lZERlY2xhcmF0aW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50RXhwb3J0TmFtZWREZWNsYXJhdGlvbic7XG5pbXBvcnQgcHJpbnRFeHBvcnROYW1lc3BhY2VTcGVjaWZpZXIgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRFeHBvcnROYW1lc3BhY2VTcGVjaWZpZXInO1xuaW1wb3J0IHByaW50RXhwb3J0U3BlY2lmaWVyIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50RXhwb3J0U3BlY2lmaWVyJztcbmltcG9ydCBwcmludEV4cHJlc3Npb25TdGF0ZW1lbnQgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRFeHByZXNzaW9uU3RhdGVtZW50JztcbmltcG9ydCBwcmludEZpbGUgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRGaWxlJztcbmltcG9ydCBwcmludEZvckluU3RhdGVtZW50IGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50Rm9ySW5TdGF0ZW1lbnQnO1xuaW1wb3J0IHByaW50Rm9yT2ZTdGF0ZW1lbnQgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRGb3JPZlN0YXRlbWVudCc7XG5pbXBvcnQgcHJpbnRGb3JTdGF0ZW1lbnQgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRGb3JTdGF0ZW1lbnQnO1xuaW1wb3J0IHByaW50RnVuY3Rpb25EZWNsYXJhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEZ1bmN0aW9uRGVjbGFyYXRpb24nO1xuaW1wb3J0IHByaW50RnVuY3Rpb25FeHByZXNzaW9uIGZyb20gJy4vcHJpbnRlcnMvY29tcGxleC9wcmludEZ1bmN0aW9uRXhwcmVzc2lvbic7XG5pbXBvcnQgcHJpbnRGdW5jdGlvblR5cGVBbm5vdGF0aW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50RnVuY3Rpb25UeXBlQW5ub3RhdGlvbic7XG5pbXBvcnQgcHJpbnRGdW5jdGlvblR5cGVQYXJhbSBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEZ1bmN0aW9uVHlwZVBhcmFtJztcbmltcG9ydCBwcmludEdlbmVyaWNUeXBlQW5ub3RhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEdlbmVyaWNUeXBlQW5ub3RhdGlvbic7XG5pbXBvcnQgcHJpbnRJZGVudGlmaWVyIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50SWRlbnRpZmllcic7XG5pbXBvcnQgcHJpbnRJZlN0YXRlbWVudCBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludElmU3RhdGVtZW50JztcbmltcG9ydCBwcmludEltcG9ydERlY2xhcmF0aW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50SW1wb3J0RGVjbGFyYXRpb24nO1xuaW1wb3J0IHByaW50SW1wb3J0RGVmYXVsdFNwZWNpZmllciBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEltcG9ydERlZmF1bHRTcGVjaWZpZXInO1xuaW1wb3J0IHByaW50SW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50SW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyJztcbmltcG9ydCBwcmludEltcG9ydFNwZWNpZmllciBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEltcG9ydFNwZWNpZmllcic7XG5pbXBvcnQgcHJpbnRJbnRlcnNlY3Rpb25UeXBlQW5ub3RhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEludGVyc2VjdGlvblR5cGVBbm5vdGF0aW9uJztcbmltcG9ydCBwcmludEpTWEF0dHJpYnV0ZSBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEpTWEF0dHJpYnV0ZSc7XG5pbXBvcnQgcHJpbnRKU1hDbG9zaW5nRWxlbWVudCBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludEpTWENsb3NpbmdFbGVtZW50JztcbmltcG9ydCBwcmludEpTWEVsZW1lbnQgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRKU1hFbGVtZW50JztcbmltcG9ydCBwcmludEpTWEV4cHJlc3Npb25Db250YWluZXIgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRKU1hFeHByZXNzaW9uQ29udGFpbmVyJztcbmltcG9ydCBwcmludEpTWElkZW50aWZpZXIgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRKU1hJZGVudGlmaWVyJztcbmltcG9ydCBwcmludEpTWE1lbWJlckV4cHJlc3Npb24gZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRKU1hNZW1iZXJFeHByZXNzaW9uJztcbmltcG9ydCBwcmludEpTWE9wZW5pbmdFbGVtZW50IGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50SlNYT3BlbmluZ0VsZW1lbnQnO1xuaW1wb3J0IHByaW50SlNYU3ByZWFkQXR0cmlidXRlIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50SlNYU3ByZWFkQXR0cmlidXRlJztcbmltcG9ydCBwcmludExhYmVsZWRTdGF0ZW1lbnQgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRMYWJlbGVkU3RhdGVtZW50JztcbmltcG9ydCBwcmludExpdGVyYWwgZnJvbSAnLi9wcmludGVycy9jb21wbGV4L3ByaW50TGl0ZXJhbCc7XG5pbXBvcnQgcHJpbnRMb2dpY2FsRXhwcmVzc2lvbiBmcm9tICcuL3ByaW50ZXJzL2NvbXBsZXgvcHJpbnRMb2dpY2FsRXhwcmVzc2lvbic7XG5pbXBvcnQgcHJpbnRNZW1iZXJFeHByZXNzaW9uIGZyb20gJy4vcHJpbnRlcnMvY29tcGxleC9wcmludE1lbWJlckV4cHJlc3Npb24nO1xuaW1wb3J0IHByaW50TWV0aG9kRGVmaW5pdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludE1ldGhvZERlZmluaXRpb24nO1xuaW1wb3J0IHByaW50TWl4ZWRUeXBlQW5ub3RhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludE1peGVkVHlwZUFubm90YXRpb24nO1xuaW1wb3J0IHByaW50TmV3RXhwcmVzc2lvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludE5ld0V4cHJlc3Npb24nO1xuaW1wb3J0IHByaW50TnVsbGFibGVUeXBlQW5ub3RhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludE51bGxhYmxlVHlwZUFubm90YXRpb24nO1xuaW1wb3J0IHByaW50TnVtYmVyTGl0ZXJhbFR5cGVBbm5vdGF0aW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50TnVtYmVyTGl0ZXJhbFR5cGVBbm5vdGF0aW9uJztcbmltcG9ydCBwcmludE51bWJlclR5cGVBbm5vdGF0aW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50TnVtYmVyVHlwZUFubm90YXRpb24nO1xuaW1wb3J0IHByaW50T2JqZWN0RXhwcmVzc2lvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludE9iamVjdEV4cHJlc3Npb24nO1xuaW1wb3J0IHByaW50T2JqZWN0UGF0dGVybiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludE9iamVjdFBhdHRlcm4nO1xuaW1wb3J0IHByaW50T2JqZWN0VHlwZUFubm90YXRpb24gZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRPYmplY3RUeXBlQW5ub3RhdGlvbic7XG5pbXBvcnQgcHJpbnRPYmplY3RUeXBlUHJvcGVydHkgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRPYmplY3RUeXBlUHJvcGVydHknO1xuaW1wb3J0IHByaW50UHJvZ3JhbSBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFByb2dyYW0nO1xuaW1wb3J0IHByaW50UHJvcGVydHkgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRQcm9wZXJ0eSc7XG5pbXBvcnQgcHJpbnRRdWFsaWZpZWRUeXBlSWRlbnRpZmllciBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFF1YWxpZmllZFR5cGVJZGVudGlmaWVyJztcbmltcG9ydCBwcmludFJlc3RFbGVtZW50IGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50UmVzdEVsZW1lbnQnO1xuaW1wb3J0IHByaW50UmV0dXJuU3RhdGVtZW50IGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50UmV0dXJuU3RhdGVtZW50JztcbmltcG9ydCBwcmludFNwcmVhZEVsZW1lbnQgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRTcHJlYWRFbGVtZW50JztcbmltcG9ydCBwcmludFNwcmVhZFByb3BlcnR5IGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50U3ByZWFkUHJvcGVydHknO1xuaW1wb3J0IHByaW50U3RyaW5nTGl0ZXJhbFR5cGVBbm5vdGF0aW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50U3RyaW5nTGl0ZXJhbFR5cGVBbm5vdGF0aW9uJztcbmltcG9ydCBwcmludFN0cmluZ1R5cGVBbm5vdGF0aW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50U3RyaW5nVHlwZUFubm90YXRpb24nO1xuaW1wb3J0IHByaW50U3VwZXIgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRTdXBlcic7XG5pbXBvcnQgcHJpbnRTd2l0Y2hDYXNlIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50U3dpdGNoQ2FzZSc7XG5pbXBvcnQgcHJpbnRTd2l0Y2hTdGF0ZW1lbnQgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRTd2l0Y2hTdGF0ZW1lbnQnO1xuaW1wb3J0IHByaW50VGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50VGFnZ2VkVGVtcGxhdGVFeHByZXNzaW9uJztcbmltcG9ydCBwcmludFRlbXBsYXRlRWxlbWVudCBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFRlbXBsYXRlRWxlbWVudCc7XG5pbXBvcnQgcHJpbnRUZW1wbGF0ZUxpdGVyYWwgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRUZW1wbGF0ZUxpdGVyYWwnO1xuaW1wb3J0IHByaW50VGhpc0V4cHJlc3Npb24gZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRUaGlzRXhwcmVzc2lvbic7XG5pbXBvcnQgcHJpbnRUaHJvd1N0YXRlbWVudCBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFRocm93U3RhdGVtZW50JztcbmltcG9ydCBwcmludFRyeVN0YXRlbWVudCBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFRyeVN0YXRlbWVudCc7XG5pbXBvcnQgcHJpbnRUdXBsZVR5cGVBbm5vdGF0aW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50VHVwbGVUeXBlQW5ub3RhdGlvbic7XG5pbXBvcnQgcHJpbnRUeXBlQWxpYXMgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRUeXBlQWxpYXMnO1xuaW1wb3J0IHByaW50VHlwZUFubm90YXRpb24gZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRUeXBlQW5ub3RhdGlvbic7XG5pbXBvcnQgcHJpbnRUeXBlb2ZUeXBlQW5ub3RhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFR5cGVvZlR5cGVBbm5vdGF0aW9uJztcbmltcG9ydCBwcmludFR5cGVQYXJhbWV0ZXJEZWNsYXJhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFR5cGVQYXJhbWV0ZXJEZWNsYXJhdGlvbic7XG5pbXBvcnQgcHJpbnRUeXBlUGFyYW1ldGVySW5zdGFudGlhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFR5cGVQYXJhbWV0ZXJJbnN0YW50aWF0aW9uJztcbmltcG9ydCBwcmludFVuYXJ5RXhwcmVzc2lvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFVuYXJ5RXhwcmVzc2lvbic7XG5pbXBvcnQgcHJpbnRVbmlvblR5cGVBbm5vdGF0aW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50VW5pb25UeXBlQW5ub3RhdGlvbic7XG5pbXBvcnQgcHJpbnRVcGRhdGVFeHByZXNzaW9uIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50VXBkYXRlRXhwcmVzc2lvbic7XG5pbXBvcnQgcHJpbnRWYXJpYWJsZURlY2xhcmF0aW9uIGZyb20gJy4vcHJpbnRlcnMvY29tcGxleC9wcmludFZhcmlhYmxlRGVjbGFyYXRpb24nO1xuaW1wb3J0IHByaW50VmFyaWFibGVEZWNsYXJhdG9yIGZyb20gJy4vcHJpbnRlcnMvc2ltcGxlL3ByaW50VmFyaWFibGVEZWNsYXJhdG9yJztcbmltcG9ydCBwcmludFZvaWRUeXBlQW5ub3RhdGlvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFZvaWRUeXBlQW5ub3RhdGlvbic7XG5pbXBvcnQgcHJpbnRXaGlsZVN0YXRlbWVudCBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFdoaWxlU3RhdGVtZW50JztcbmltcG9ydCBwcmludFdpdGhTdGF0ZW1lbnQgZnJvbSAnLi9wcmludGVycy9zaW1wbGUvcHJpbnRXaXRoU3RhdGVtZW50JztcbmltcG9ydCBwcmludFlpZWxkRXhwcmVzc2lvbiBmcm9tICcuL3ByaW50ZXJzL3NpbXBsZS9wcmludFlpZWxkRXhwcmVzc2lvbic7XG5pbXBvcnQgcmVzb2x2ZUxpbmVzIGZyb20gJy4vcmVzb2x2ZXJzL3Jlc29sdmVMaW5lcyc7XG5pbXBvcnQgd3JhcFdpdGhDb21tZW50cyBmcm9tICcuL3dyYXBwZXJzL2NvbXBsZXgvd3JhcFdpdGhDb21tZW50cyc7XG5cbi8qKlxuICogRW50cnkgcG9pbnQgaW50byByZXByaW50LiBQYXJzZXMgdGhlIHNvdXJjZSBpbnRvIGFuIEFTVCBhbmQgdGhlbiBwcmludHMgaXRcbiAqIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gcmVwcmludChzb3VyY2U6IHN0cmluZywgbnVsbGFibGVPcHRpb25zPzogT3B0aW9ucyk6IE91dHB1dCB7XG4gIGNvbnN0IG9wdGlvbnMgPSBudWxsYWJsZU9wdGlvbnMgfHwgRGVmYXVsdE9wdGlvbnM7XG4gIGNvbnN0IGFzdCA9IGJhYmVsLnBhcnNlKHNvdXJjZSk7XG4gIGNvbnN0IGxpbmVzID0gZmxhdHRlbihwcmludFdpdGhXcmFwcGVycyhhc3QsIHtcbiAgICBpbnZhbGlkTGVhZGluZ0NvbW1lbnRzOiBnZXRJbnZhbGlkTGVhZGluZ0NvbW1lbnRzKGFzdCksXG4gICAgaW52YWxpZFRyYWlsaW5nQ29tbWVudHM6IGdldEludmFsaWRUcmFpbGluZ0NvbW1lbnRzKGFzdCksXG4gICAgb3B0aW9ucyxcbiAgICBwYXRoOiBJbW11dGFibGUuTGlzdCgpLFxuICB9KSk7XG4gIHJldHVybiByZXNvbHZlTGluZXMobGluZXMsIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIEhlbHBlciB0byBidWlsZCBhIHByaW50IGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gbm9kZSBhbmQgY29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZ2V0UHJpbnRGbihub2RlOiBhbnksIGNvbnRleHQ6IENvbnRleHQpOiBQcmludCB7XG4gIGNvbnN0IG5leHRDb250ZXh0ID0ge1xuICAgIC4uLmNvbnRleHQsXG4gICAgcGF0aDogY29udGV4dC5wYXRoLnB1c2gobm9kZSksXG4gIH07XG4gIHJldHVybiB4ID0+IHByaW50V2l0aFdyYXBwZXJzKHgsIG5leHRDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBHZW5lcmljIHByaW50IGZ1bmN0aW9uIHRoYXQgd2lsbCByZXR1cm4gYW4gYXJyYXkgb2Ygc3RyaW5ncyBmb3IgdGhlIGdpdmVuXG4gKiBhc3Qgbm9kZS5cbiAqL1xuZnVuY3Rpb24gcHJpbnRXaXRoV3JhcHBlcnMobm9kZTogP2FueSwgY29udGV4dDogQ29udGV4dCk6IExpbmVzIHtcbiAgaWYgKCFub2RlKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgcHJpbnQgPSBnZXRQcmludEZuKG5vZGUsIGNvbnRleHQpO1xuICBsZXQgbGluZXMgPSBwcmludFdpdGhvdXRXcmFwcGVycyhub2RlLCBjb250ZXh0KTtcbiAgbGluZXMgPSB3cmFwV2l0aENvbW1lbnRzKHByaW50LCBub2RlLCBjb250ZXh0LCBsaW5lcyk7XG4gIHJldHVybiBsaW5lcztcbn1cblxuLyoqXG4gKiBQcmludHMgdGhlIG5vZGUgaWdub3JpbmcgY29tbWVudHMuXG4gKi9cbmZ1bmN0aW9uIHByaW50V2l0aG91dFdyYXBwZXJzKG5vZGU6ID9hbnksIGNvbnRleHQ6IENvbnRleHQpOiBMaW5lcyB7XG4gIGlmICghbm9kZSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHByaW50ID0gZ2V0UHJpbnRGbihub2RlLCBjb250ZXh0KTtcblxuICAvKipcbiAgICogU2ltcGxlIHByaW50ZXJzLlxuICAgKi9cbiAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICBjYXNlICdBcnJheUV4cHJlc3Npb24nOlxuICAgICAgcmV0dXJuIHByaW50QXJyYXlFeHByZXNzaW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0FycmF5UGF0dGVybic6XG4gICAgICByZXR1cm4gcHJpbnRBcnJheVBhdHRlcm4ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnQXJyb3dGdW5jdGlvbkV4cHJlc3Npb24nOlxuICAgICAgcmV0dXJuIHByaW50QXJyb3dGdW5jdGlvbkV4cHJlc3Npb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnQXNzaWdubWVudEV4cHJlc3Npb24nOlxuICAgICAgcmV0dXJuIHByaW50QXNzaWdubWVudEV4cHJlc3Npb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnQXNzaWdubWVudFBhdHRlcm4nOlxuICAgICAgcmV0dXJuIHByaW50QXNzaWdubWVudFBhdHRlcm4ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnQXdhaXRFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludEF3YWl0RXhwcmVzc2lvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdCbG9ja1N0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRCbG9ja1N0YXRlbWVudChwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdCcmVha1N0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRCcmVha1N0YXRlbWVudChwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdDYWxsRXhwcmVzc2lvbic6XG4gICAgICByZXR1cm4gcHJpbnRDYWxsRXhwcmVzc2lvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdDYXRjaENsYXVzZSc6XG4gICAgICByZXR1cm4gcHJpbnRDYXRjaENsYXVzZShwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdDbGFzc0JvZHknOlxuICAgICAgcmV0dXJuIHByaW50Q2xhc3NCb2R5KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0NsYXNzRGVjbGFyYXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50Q2xhc3NEZWNsYXJhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdDbGFzc1Byb3BlcnR5JzpcbiAgICAgIHJldHVybiBwcmludENsYXNzUHJvcGVydHkocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnQ29uZGl0aW9uYWxFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludENvbmRpdGlvbmFsRXhwcmVzc2lvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdDb250aW51ZVN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRDb250aW51ZVN0YXRlbWVudChwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdEZWJ1Z2dlclN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnREZWJ1Z2dlclN0YXRlbWVudChwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdEb1doaWxlU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludERvV2hpbGVTdGF0ZW1lbnQocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnRW1wdHlTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50RW1wdHlTdGF0ZW1lbnQocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJzpcbiAgICAgIHJldHVybiBwcmludEV4cG9ydERlZmF1bHREZWNsYXJhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdFeHBvcnREZWZhdWx0U3BlY2lmaWVyJzpcbiAgICAgIHJldHVybiBwcmludEV4cG9ydERlZmF1bHRTcGVjaWZpZXIocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbic6XG4gICAgICByZXR1cm4gcHJpbnRFeHBvcnROYW1lZERlY2xhcmF0aW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0V4cG9ydE5hbWVzcGFjZVNwZWNpZmllcic6XG4gICAgICByZXR1cm4gcHJpbnRFeHBvcnROYW1lc3BhY2VTcGVjaWZpZXIocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnRXhwb3J0U3BlY2lmaWVyJzpcbiAgICAgIHJldHVybiBwcmludEV4cG9ydFNwZWNpZmllcihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdFeHByZXNzaW9uU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludEV4cHJlc3Npb25TdGF0ZW1lbnQocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnRmlsZSc6XG4gICAgICByZXR1cm4gcHJpbnRGaWxlKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0ZvckluU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludEZvckluU3RhdGVtZW50KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0Zvck9mU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludEZvck9mU3RhdGVtZW50KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0ZvclN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRGb3JTdGF0ZW1lbnQocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnRnVuY3Rpb25EZWNsYXJhdGlvbic6XG4gICAgICByZXR1cm4gcHJpbnRGdW5jdGlvbkRlY2xhcmF0aW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0lkZW50aWZpZXInOlxuICAgICAgcmV0dXJuIHByaW50SWRlbnRpZmllcihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdJZlN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRJZlN0YXRlbWVudChwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdJbXBvcnREZWNsYXJhdGlvbic6XG4gICAgICByZXR1cm4gcHJpbnRJbXBvcnREZWNsYXJhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdJbXBvcnREZWZhdWx0U3BlY2lmaWVyJzpcbiAgICAgIHJldHVybiBwcmludEltcG9ydERlZmF1bHRTcGVjaWZpZXIocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnSW1wb3J0TmFtZXNwYWNlU3BlY2lmaWVyJzpcbiAgICAgIHJldHVybiBwcmludEltcG9ydE5hbWVzcGFjZVNwZWNpZmllcihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdJbXBvcnRTcGVjaWZpZXInOlxuICAgICAgcmV0dXJuIHByaW50SW1wb3J0U3BlY2lmaWVyKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0xhYmVsZWRTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50TGFiZWxlZFN0YXRlbWVudChwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdNZXRob2REZWZpbml0aW9uJzpcbiAgICAgIHJldHVybiBwcmludE1ldGhvZERlZmluaXRpb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnTmV3RXhwcmVzc2lvbic6XG4gICAgICByZXR1cm4gcHJpbnROZXdFeHByZXNzaW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ09iamVjdEV4cHJlc3Npb24nOlxuICAgICAgcmV0dXJuIHByaW50T2JqZWN0RXhwcmVzc2lvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdPYmplY3RQYXR0ZXJuJzpcbiAgICAgIHJldHVybiBwcmludE9iamVjdFBhdHRlcm4ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnUHJvZ3JhbSc6XG4gICAgICByZXR1cm4gcHJpbnRQcm9ncmFtKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1Byb3BlcnR5JzpcbiAgICAgIHJldHVybiBwcmludFByb3BlcnR5KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1Jlc3RFbGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludFJlc3RFbGVtZW50KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1JldHVyblN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRSZXR1cm5TdGF0ZW1lbnQocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnU3ByZWFkRWxlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRTcHJlYWRFbGVtZW50KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1NwcmVhZFByb3BlcnR5JzpcbiAgICAgIHJldHVybiBwcmludFNwcmVhZFByb3BlcnR5KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1N1cGVyJzpcbiAgICAgIHJldHVybiBwcmludFN1cGVyKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1N3aXRjaENhc2UnOlxuICAgICAgcmV0dXJuIHByaW50U3dpdGNoQ2FzZShwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdTd2l0Y2hTdGF0ZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50U3dpdGNoU3RhdGVtZW50KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1RhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbic6XG4gICAgICByZXR1cm4gcHJpbnRUYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnVGVtcGxhdGVFbGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludFRlbXBsYXRlRWxlbWVudChwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdUZW1wbGF0ZUxpdGVyYWwnOlxuICAgICAgcmV0dXJuIHByaW50VGVtcGxhdGVMaXRlcmFsKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1RoaXNFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludFRoaXNFeHByZXNzaW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1Rocm93U3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludFRocm93U3RhdGVtZW50KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1RyeVN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRUcnlTdGF0ZW1lbnQocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnVW5hcnlFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludFVuYXJ5RXhwcmVzc2lvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdVcGRhdGVFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludFVwZGF0ZUV4cHJlc3Npb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnVmFyaWFibGVEZWNsYXJhdG9yJzpcbiAgICAgIHJldHVybiBwcmludFZhcmlhYmxlRGVjbGFyYXRvcihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdXaGlsZVN0YXRlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRXaGlsZVN0YXRlbWVudChwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdXaXRoU3RhdGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludFdpdGhTdGF0ZW1lbnQocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnWWllbGRFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludFlpZWxkRXhwcmVzc2lvbihwcmludCwgbm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGxleCBwcmludGVycyAtLSBtZWFuaW5nIHRoZXkgcmVxdWlyZSBjb250ZXh0LlxuICAgKi9cbiAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICBjYXNlICdCaW5hcnlFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludEJpbmFyeUV4cHJlc3Npb24ocHJpbnQsIG5vZGUsIGNvbnRleHQpO1xuXG4gICAgY2FzZSAnRnVuY3Rpb25FeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBwcmludEZ1bmN0aW9uRXhwcmVzc2lvbihwcmludCwgbm9kZSwgY29udGV4dCk7XG5cbiAgICBjYXNlICdMaXRlcmFsJzpcbiAgICAgIHJldHVybiBwcmludExpdGVyYWwocHJpbnQsIG5vZGUsIGNvbnRleHQpO1xuXG4gICAgY2FzZSAnTG9naWNhbEV4cHJlc3Npb24nOlxuICAgICAgcmV0dXJuIHByaW50TG9naWNhbEV4cHJlc3Npb24ocHJpbnQsIG5vZGUsIGNvbnRleHQpO1xuXG4gICAgY2FzZSAnTWVtYmVyRXhwcmVzc2lvbic6XG4gICAgICByZXR1cm4gcHJpbnRNZW1iZXJFeHByZXNzaW9uKHByaW50LCBub2RlLCBjb250ZXh0KTtcblxuICAgIGNhc2UgJ1ZhcmlhYmxlRGVjbGFyYXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50VmFyaWFibGVEZWNsYXJhdGlvbihwcmludCwgbm9kZSwgY29udGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogSlNYIE5vZGVzXG4gICAqL1xuICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgIGNhc2UgJ0pTWEF0dHJpYnV0ZSc6XG4gICAgICByZXR1cm4gcHJpbnRKU1hBdHRyaWJ1dGUocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnSlNYQ2xvc2luZ0VsZW1lbnQnOlxuICAgICAgcmV0dXJuIHByaW50SlNYQ2xvc2luZ0VsZW1lbnQocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnSlNYRWxlbWVudCc6XG4gICAgICByZXR1cm4gcHJpbnRKU1hFbGVtZW50KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0pTWEV4cHJlc3Npb25Db250YWluZXInOlxuICAgICAgcmV0dXJuIHByaW50SlNYRXhwcmVzc2lvbkNvbnRhaW5lcihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdKU1hJZGVudGlmaWVyJzpcbiAgICAgIHJldHVybiBwcmludEpTWElkZW50aWZpZXIocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnSlNYTWVtYmVyRXhwcmVzc2lvbic6XG4gICAgICByZXR1cm4gcHJpbnRKU1hNZW1iZXJFeHByZXNzaW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0pTWE9wZW5pbmdFbGVtZW50JzpcbiAgICAgIHJldHVybiBwcmludEpTWE9wZW5pbmdFbGVtZW50KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0pTWFNwcmVhZEF0dHJpYnV0ZSc6XG4gICAgICByZXR1cm4gcHJpbnRKU1hTcHJlYWRBdHRyaWJ1dGUocHJpbnQsIG5vZGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsb3cgdHlwZXMuXG4gICAqL1xuICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgIGNhc2UgJ0FueVR5cGVBbm5vdGF0aW9uJzpcbiAgICAgIHJldHVybiBwcmludEFueVR5cGVBbm5vdGF0aW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0Jvb2xlYW5MaXRlcmFsVHlwZUFubm90YXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50Qm9vbGVhbkxpdGVyYWxUeXBlQW5ub3RhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdCb29sZWFuVHlwZUFubm90YXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50Qm9vbGVhblR5cGVBbm5vdGF0aW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0Z1bmN0aW9uVHlwZUFubm90YXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50RnVuY3Rpb25UeXBlQW5ub3RhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdGdW5jdGlvblR5cGVQYXJhbSc6XG4gICAgICByZXR1cm4gcHJpbnRGdW5jdGlvblR5cGVQYXJhbShwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdHZW5lcmljVHlwZUFubm90YXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50R2VuZXJpY1R5cGVBbm5vdGF0aW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ0ludGVyc2VjdGlvblR5cGVBbm5vdGF0aW9uJzpcbiAgICAgIHJldHVybiBwcmludEludGVyc2VjdGlvblR5cGVBbm5vdGF0aW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ01peGVkVHlwZUFubm90YXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50TWl4ZWRUeXBlQW5ub3RhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdOdWxsYWJsZVR5cGVBbm5vdGF0aW9uJzpcbiAgICAgIHJldHVybiBwcmludE51bGxhYmxlVHlwZUFubm90YXRpb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnTnVtYmVyTGl0ZXJhbFR5cGVBbm5vdGF0aW9uJzpcbiAgICAgIHJldHVybiBwcmludE51bWJlckxpdGVyYWxUeXBlQW5ub3RhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdOdW1iZXJUeXBlQW5ub3RhdGlvbic6XG4gICAgICByZXR1cm4gcHJpbnROdW1iZXJUeXBlQW5ub3RhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdPYmplY3RUeXBlQW5ub3RhdGlvbic6XG4gICAgICByZXR1cm4gcHJpbnRPYmplY3RUeXBlQW5ub3RhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdPYmplY3RUeXBlUHJvcGVydHknOlxuICAgICAgcmV0dXJuIHByaW50T2JqZWN0VHlwZVByb3BlcnR5KHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1F1YWxpZmllZFR5cGVJZGVudGlmaWVyJzpcbiAgICAgIHJldHVybiBwcmludFF1YWxpZmllZFR5cGVJZGVudGlmaWVyKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1N0cmluZ0xpdGVyYWxUeXBlQW5ub3RhdGlvbic6XG4gICAgICByZXR1cm4gcHJpbnRTdHJpbmdMaXRlcmFsVHlwZUFubm90YXRpb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnU3RyaW5nVHlwZUFubm90YXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50U3RyaW5nVHlwZUFubm90YXRpb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnVHVwbGVUeXBlQW5ub3RhdGlvbic6XG4gICAgICByZXR1cm4gcHJpbnRUdXBsZVR5cGVBbm5vdGF0aW9uKHByaW50LCBub2RlKTtcblxuICAgIGNhc2UgJ1R5cGVBbGlhcyc6XG4gICAgICByZXR1cm4gcHJpbnRUeXBlQWxpYXMocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnVHlwZUFubm90YXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50VHlwZUFubm90YXRpb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnVHlwZW9mVHlwZUFubm90YXRpb24nOlxuICAgICAgcmV0dXJuIHByaW50VHlwZW9mVHlwZUFubm90YXRpb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnVHlwZVBhcmFtZXRlckRlY2xhcmF0aW9uJzpcbiAgICAgIHJldHVybiBwcmludFR5cGVQYXJhbWV0ZXJEZWNsYXJhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdUeXBlUGFyYW1ldGVySW5zdGFudGlhdGlvbic6XG4gICAgICByZXR1cm4gcHJpbnRUeXBlUGFyYW1ldGVySW5zdGFudGlhdGlvbihwcmludCwgbm9kZSk7XG5cbiAgICBjYXNlICdVbmlvblR5cGVBbm5vdGF0aW9uJzpcbiAgICAgIHJldHVybiBwcmludFVuaW9uVHlwZUFubm90YXRpb24ocHJpbnQsIG5vZGUpO1xuXG4gICAgY2FzZSAnVm9pZFR5cGVBbm5vdGF0aW9uJzpcbiAgICAgIHJldHVybiBwcmludFZvaWRUeXBlQW5ub3RhdGlvbihwcmludCwgbm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogSSdtIG5vdCBzdXJlIHdoYXQgdGhlc2UgYXJlLiBJIG5lZWQgdG8gZmlndXJlIHRoYXQgb3V0IGFuZCBpbXBsZW1lbnQgdGhlbSFcbiAgICovXG4gIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgLy8gTm90IHN1cmUgaG93IHRvIGNyZWF0ZSBhbnkgb2YgdGhlc2UuXG4gICAgY2FzZSAnQ2xhc3NFeHByZXNzaW9uJzpcbiAgICBjYXNlICdDbGFzc1Byb3BlcnR5RGVmaW5pdGlvbic6XG4gICAgY2FzZSAnRGVjbGFyZUNsYXNzJzpcbiAgICBjYXNlICdEZWNsYXJlTW9kdWxlJzpcbiAgICBjYXNlICdEZWNsYXJlVmFyaWFibGUnOlxuICAgIGNhc2UgJ0ludGVyZmFjZURlY2xhcmF0aW9uJzpcbiAgICBjYXNlICdJbnRlcmZhY2VFeHRlbmRzJzpcbiAgICBjYXNlICdKU1hFbXB0eUV4cHJlc3Npb24nOlxuICAgIGNhc2UgJ0pTWE5hbWVzcGFjZWROYW1lJzpcbiAgICBjYXNlICdNZW1iZXJUeXBlQW5ub3RhdGlvbic6XG4gICAgY2FzZSAnTW9kdWxlU3BlY2lmaWVyJzpcbiAgICBjYXNlICdPYmplY3RUeXBlQ2FsbFByb3BlcnR5JzpcbiAgICBjYXNlICdPYmplY3RUeXBlSW5kZXhlcic6XG4gICAgY2FzZSAnVHlwZUNhc2VFeHByZXNzaW9uJzpcbiAgICAvLyBJIGJlbGlldmUgdGhpcyBpcyBub3cgcmVwbGFjZWQgd2l0aCBUdXBsZVR5cGVBbm5vdGF0aW9uOiBbc3RyaW5nXS5cbiAgICAvKiBmYWxsdGhyb3VnaCAqL1xuICAgIGNhc2UgJ0FycmF5VHlwZUFubm90YXRpb24nOlxuICAgIC8vIEkgdGhpbmsgdGhpcyBpcyBhIGxpdGVyYWwgd2l0aGluIEpTWEVsZW1lbnQncyBjaGlsZHJlbiBmb3IgY2VydGFpblxuICAgIC8vIHBhcnNlcnMsIGJ1dCBCYWJ5bG9uIGFwcGVhcnMgdG8ganVzdCB1c2UgTGl0ZXJhbC5cbiAgICAvKiBmYWxsdGhyb3VnaCAqL1xuICAgIGNhc2UgJ0pTWFRleHQnOlxuICAgICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoYXQgdGhlc2Ugbm9kZXMgZG8gaXMgbm90IHdlbGwgZGVmaW5lZC4gVGhleSBtYXkgYmUgc3RhZ2UgMCBwcm9wb3NhbHMgZm9yXG4gICAqIGV4YW1wbGUuXG4gICAqL1xuICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgIGNhc2UgJ0NsYXNzSW1wbGVtZW50cyc6XG4gICAgY2FzZSAnQ29tcHJlaGVuc2lvbkJsb2NrJzpcbiAgICBjYXNlICdDb21wcmVoZW5zaW9uRXhwcmVzc2lvbic6XG4gICAgY2FzZSAnR2VuZXJhdG9yRXhwcmVzc2lvbic6XG4gICAgY2FzZSAnU2VxdWVuY2VFeHByZXNzaW9uJzpcbiAgICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGludmFyaWFudChmYWxzZSwgJ1Vua25vd24gbm9kZSB0eXBlOiAlcycsIG5vZGUudHlwZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVwcmludDtcbiJdfQ==