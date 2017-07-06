'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.statements = statements;
exports.statement = statement;
exports.expression = expression;
var babel = require('babel-core');

function splice(arr, element, replacement) {
  arr.splice.apply(arr, [arr.indexOf(element), 1].concat(_toConsumableArray(replacement)));
}

function getPlugin(varName, nodes) {
  var counter = 0;

  return function (_ref) {
    var Plugin = _ref.Plugin;
    var t = _ref.types;

    return new Plugin('template', {
      visitor: {
        Identifier: {
          exit: function exit(node, parent) {
            if (node.name !== varName) {
              return node;
            }

            var replacement = nodes[counter++];
            if (Array.isArray(replacement)) {
              // check whether we can explode arrays here
              if (t.isFunction(parent) && parent.params.indexOf(node) > -1) {
                // function foo(${bar}) {}
                splice(parent.params, node, replacement);
              } else if (t.isVariableDeclarator(parent)) {
                // var foo = ${bar}, baz = 42;
                splice(this.parentPath.parentPath.node.declarations, parent, replacement);
              } else if (t.isArrayExpression(parent)) {
                // var foo = [${bar}, baz];
                splice(parent.elements, node, replacement);
              } else if (t.isProperty(parent) && parent.shorthand) {
                // var foo = {${bar}, baz: 42};
                splice(this.parentPath.parentPath.node.properties, parent, replacement);
              } else if (t.isCallExpression(parent) && parent.arguments.indexOf(node) > -1) {
                // foo(${bar}, baz)
                splice(parent.arguments, node, replacement);
              } else if (t.isExpressionStatement(parent)) {
                this.parentPath.replaceWithMultiple(replacement);
              } else {
                this.replaceWithMultiple(replacement);
              }
            } else if (t.isExpressionStatement(parent)) {
              this.parentPath.replaceWith(replacement);
            } else {
              return replacement;
            }
          }
        }
      }
    });
  };
}

function replaceNodes(src, varName, nodes) {
  return babel.transform(src, {
    plugins: [getPlugin(varName, nodes)],
    whitelist: [],
    code: false
  }).ast;
}

function getRandomVarName() {
  return '$jscodeshift' + Math.floor(Math.random() * 1000) + '$';
}

function statements(template) {
  template = [].concat(_toConsumableArray(template));
  var varName = getRandomVarName();
  var src = template.join(varName);

  for (var _len = arguments.length, nodes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    nodes[_key - 1] = arguments[_key];
  }

  return replaceNodes(src, varName, nodes).program.body;
}

function statement(template) {
  for (var _len2 = arguments.length, nodes = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    nodes[_key2 - 1] = arguments[_key2];
  }

  return statements.apply(undefined, [template].concat(nodes))[0];
}

function expression(template) {
  // wrap code in `(...)` to force evaluation as expression
  template = [].concat(_toConsumableArray(template));
  if (template.length > 1) {
    template[0] = '(' + template[0];
    template[template.length - 1] += ')';
  } else if (template.length === 0) {
    template[0] = '(' + template[0] + ')';
  }

  for (var _len3 = arguments.length, nodes = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    nodes[_key3 - 1] = arguments[_key3];
  }

  return statement.apply(undefined, [template].concat(nodes)).expression;
}