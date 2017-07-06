function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 */

var _getNamesFromID = require('./getNamesFromID');

var _getNamesFromID2 = _interopRequireDefault(_getNamesFromID);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var REACT_NODE = _jscodeshift2['default'].identifier('React');

/**
 * These are the ways in which one might access an undeclared identifier. This
 * should only apply to actual code, not accessing undeclared types.
 */
var CONFIG = [
// foo;
{
  searchTerms: [_jscodeshift2['default'].ExpressionStatement],
  getNodes: function getNodes(path) {
    return [path.node.expression];
  }
},

// foo(bar);
{
  searchTerms: [_jscodeshift2['default'].CallExpression],
  getNodes: function getNodes(path) {
    return [path.node.callee].concat(path.node.arguments);
  }
},

// foo.declared;
{
  searchTerms: [_jscodeshift2['default'].MemberExpression],
  getNodes: function getNodes(path) {
    return [path.node.object];
  }
},

// foo = bar;
{
  searchTerms: [_jscodeshift2['default'].AssignmentExpression],
  getNodes: function getNodes(path) {
    return [path.node.left, path.node.right];
  }
},

// class declared extends foo {}
{
  searchTerms: [_jscodeshift2['default'].ClassDeclaration],
  getNodes: function getNodes(path) {
    return [path.node.superClass];
  }
},

// var declared = foo;
{
  searchTerms: [_jscodeshift2['default'].VariableDeclarator],
  getNodes: function getNodes(path) {
    return [path.node.init];
  }
},

// switch (declared) { case foo: break; }
{
  searchTerms: [_jscodeshift2['default'].SwitchCase],
  getNodes: function getNodes(path) {
    return [path.node.test];
  }
},

// {declared: foo}
{
  searchTerms: [_jscodeshift2['default'].ObjectExpression],
  // Generally props have a value, if it is a spread property it doesn't.
  getNodes: function getNodes(path) {
    return path.node.properties.map(function (prop) {
      return prop.value || prop;
    });
  }
},

// return foo;
{
  searchTerms: [_jscodeshift2['default'].ReturnStatement],
  getNodes: function getNodes(path) {
    return [path.node.argument];
  }
},

// if (foo) {}
{
  searchTerms: [_jscodeshift2['default'].IfStatement],
  getNodes: function getNodes(path) {
    return [path.node.test];
  }
},

// switch (foo) {}
{
  searchTerms: [_jscodeshift2['default'].SwitchStatement],
  getNodes: function getNodes(path) {
    return [path.node.discriminant];
  }
},

// !foo;
{
  searchTerms: [_jscodeshift2['default'].UnaryExpression],
  getNodes: function getNodes(path) {
    return [path.node.argument];
  }
},

// foo || bar;
{
  searchTerms: [_jscodeshift2['default'].BinaryExpression],
  getNodes: function getNodes(path) {
    return [path.node.left, path.node.right];
  }
},

// foo < bar;
{
  searchTerms: [_jscodeshift2['default'].LogicalExpression],
  getNodes: function getNodes(path) {
    return [path.node.left, path.node.right];
  }
},

// foo ? bar : baz;
{
  searchTerms: [_jscodeshift2['default'].ConditionalExpression],
  getNodes: function getNodes(path) {
    return [path.node.test, path.node.alternate, path.node.consequent];
  }
},

// new Foo()
{
  searchTerms: [_jscodeshift2['default'].NewExpression],
  getNodes: function getNodes(path) {
    return [path.node.callee].concat(path.node.arguments);
  }
},

// foo++;
{
  searchTerms: [_jscodeshift2['default'].UpdateExpression],
  getNodes: function getNodes(path) {
    return [path.node.argument];
  }
},

// <Element attribute={foo} />
{
  searchTerms: [_jscodeshift2['default'].JSXExpressionContainer],
  getNodes: function getNodes(path) {
    return [path.node.expression];
  }
},

// for (foo in bar) {}
{
  searchTerms: [_jscodeshift2['default'].ForInStatement],
  getNodes: function getNodes(path) {
    return [path.node.left, path.node.right];
  }
},

// for (foo of bar) {}
{
  searchTerms: [_jscodeshift2['default'].ForOfStatement],
  getNodes: function getNodes(path) {
    return [path.node.left, path.node.right];
  }
},

// for (foo; bar; baz) {}
{
  searchTerms: [_jscodeshift2['default'].ForStatement],
  getNodes: function getNodes(path) {
    return [path.node.init, path.node.test, path.node.update];
  }
},

// while (foo) {}
{
  searchTerms: [_jscodeshift2['default'].WhileStatement],
  getNodes: function getNodes(path) {
    return [path.node.test];
  }
},

// do {} while (foo)
{
  searchTerms: [_jscodeshift2['default'].DoWhileStatement],
  getNodes: function getNodes(path) {
    return [path.node.test];
  }
},

// [foo]
{
  searchTerms: [_jscodeshift2['default'].ArrayExpression],
  getNodes: function getNodes(path) {
    return path.node.elements;
  }
},

// Special case. Any JSX elements will get transpiled to use React.
{
  searchTerms: [_jscodeshift2['default'].JSXOpeningElement],
  getNodes: function getNodes(path) {
    return [REACT_NODE];
  }
},

// foo`something`
{
  searchTerms: [_jscodeshift2['default'].TaggedTemplateExpression],
  getNodes: function getNodes(path) {
    return [path.node.tag];
  }
},

// `${bar}`
{
  searchTerms: [_jscodeshift2['default'].TemplateLiteral],
  getNodes: function getNodes(path) {
    return path.node.expressions;
  }
},

// function foo(a = b) {}
{
  searchTerms: [_jscodeshift2['default'].AssignmentPattern],
  getNodes: function getNodes(path) {
    return [path.node.right];
  }
}];

/**
 * This will get a list of all identifiers that are not from a declaration.
 *
 * NOTE: this can get identifiers that are declared, if you want access to
 * identifiers that are access but undeclared see getUndeclaredIdentifiers
 */
function getNonDeclarationIdentifiers(root) {
  var ids = new Set();
  CONFIG.forEach(function (config) {
    root.find(config.searchTerms[0], config.searchTerms[1]).forEach(function (path) {
      var nodes = config.getNodes(path);
      nodes.forEach(function (node) {
        var names = (0, _getNamesFromID2['default'])(node);
        for (var _name of names) {
          ids.add(_name);
        }
      });
    });
  });
  return ids;
}

module.exports = getNonDeclarationIdentifiers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvZ2V0Tm9uRGVjbGFyYXRpb25JZGVudGlmaWVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OEJBWTJCLGtCQUFrQjs7OzsyQkFDNUIsYUFBYTs7OztBQU85QixJQUFNLFVBQVUsR0FBRyx5QkFBSyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7OztBQU01QyxJQUFNLE1BQTBCLEdBQUc7O0FBRWpDO0FBQ0UsYUFBVyxFQUFFLENBQUMseUJBQUssbUJBQW1CLENBQUM7QUFDdkMsVUFBUSxFQUFFLGtCQUFBLElBQUk7V0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0dBQUE7Q0FDekM7OztBQUdEO0FBQ0UsYUFBVyxFQUFFLENBQUMseUJBQUssY0FBYyxDQUFDO0FBQ2xDLFVBQVEsRUFBRSxrQkFBQSxJQUFJO1dBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztHQUFBO0NBQ2pFOzs7QUFHRDtBQUNFLGFBQVcsRUFBRSxDQUFDLHlCQUFLLGdCQUFnQixDQUFDO0FBQ3BDLFVBQVEsRUFBRSxrQkFBQSxJQUFJO1dBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztHQUFBO0NBQ3JDOzs7QUFHRDtBQUNFLGFBQVcsRUFBRSxDQUFDLHlCQUFLLG9CQUFvQixDQUFDO0FBQ3hDLFVBQVEsRUFBRSxrQkFBQSxJQUFJO1dBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztHQUFBO0NBQ3BEOzs7QUFHRDtBQUNFLGFBQVcsRUFBRSxDQUFDLHlCQUFLLGdCQUFnQixDQUFDO0FBQ3BDLFVBQVEsRUFBRSxrQkFBQSxJQUFJO1dBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVB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O1NBQ2Y7T0FDRixDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDTixDQUFDLENBQUM7QUFDSCxTQUFPLEdBQUcsQ0FBQztDQUNaOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUMiLCJmaWxlIjoiZ2V0Tm9uRGVjbGFyYXRpb25JZGVudGlmaWVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB0eXBlIHtDb2xsZWN0aW9uLCBOb2RlLCBOb2RlUGF0aH0gZnJvbSAnLi4vdHlwZXMvYXN0JztcblxuaW1wb3J0IGdldE5hbWVzRnJvbUlEIGZyb20gJy4vZ2V0TmFtZXNGcm9tSUQnO1xuaW1wb3J0IGpzY3MgZnJvbSAnanNjb2Rlc2hpZnQnO1xuXG50eXBlIENvbmZpZ0VudHJ5ID0ge1xuICBzZWFyY2hUZXJtczogW2FueSwgP09iamVjdF0sXG4gIGdldE5vZGVzOiAocGF0aDogTm9kZVBhdGgpID0+IEFycmF5PE5vZGU+LFxufTtcblxuY29uc3QgUkVBQ1RfTk9ERSA9IGpzY3MuaWRlbnRpZmllcignUmVhY3QnKTtcblxuLyoqXG4gKiBUaGVzZSBhcmUgdGhlIHdheXMgaW4gd2hpY2ggb25lIG1pZ2h0IGFjY2VzcyBhbiB1bmRlY2xhcmVkIGlkZW50aWZpZXIuIFRoaXNcbiAqIHNob3VsZCBvbmx5IGFwcGx5IHRvIGFjdHVhbCBjb2RlLCBub3QgYWNjZXNzaW5nIHVuZGVjbGFyZWQgdHlwZXMuXG4gKi9cbmNvbnN0IENPTkZJRzogQXJyYXk8Q29uZmlnRW50cnk+ID0gW1xuICAvLyBmb287XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuRXhwcmVzc2lvblN0YXRlbWVudF0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5leHByZXNzaW9uXSxcbiAgfSxcblxuICAvLyBmb28oYmFyKTtcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5DYWxsRXhwcmVzc2lvbl0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5jYWxsZWVdLmNvbmNhdChwYXRoLm5vZGUuYXJndW1lbnRzKSxcbiAgfSxcblxuICAvLyBmb28uZGVjbGFyZWQ7XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuTWVtYmVyRXhwcmVzc2lvbl0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5vYmplY3RdLFxuICB9LFxuXG4gIC8vIGZvbyA9IGJhcjtcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5Bc3NpZ25tZW50RXhwcmVzc2lvbl0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5sZWZ0LCBwYXRoLm5vZGUucmlnaHRdLFxuICB9LFxuXG4gIC8vIGNsYXNzIGRlY2xhcmVkIGV4dGVuZHMgZm9vIHt9XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuQ2xhc3NEZWNsYXJhdGlvbl0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5zdXBlckNsYXNzXSxcbiAgfSxcblxuICAvLyB2YXIgZGVjbGFyZWQgPSBmb287XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuVmFyaWFibGVEZWNsYXJhdG9yXSxcbiAgICBnZXROb2RlczogcGF0aCA9PiBbcGF0aC5ub2RlLmluaXRdLFxuICB9LFxuXG4gIC8vIHN3aXRjaCAoZGVjbGFyZWQpIHsgY2FzZSBmb286IGJyZWFrOyB9XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuU3dpdGNoQ2FzZV0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS50ZXN0XSxcbiAgfSxcblxuICAvLyB7ZGVjbGFyZWQ6IGZvb31cbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5PYmplY3RFeHByZXNzaW9uXSxcbiAgICAvLyBHZW5lcmFsbHkgcHJvcHMgaGF2ZSBhIHZhbHVlLCBpZiBpdCBpcyBhIHNwcmVhZCBwcm9wZXJ0eSBpdCBkb2Vzbid0LlxuICAgIGdldE5vZGVzOiBwYXRoID0+IHBhdGgubm9kZS5wcm9wZXJ0aWVzLm1hcChwcm9wID0+IHByb3AudmFsdWUgfHwgcHJvcCksXG4gIH0sXG5cbiAgLy8gcmV0dXJuIGZvbztcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5SZXR1cm5TdGF0ZW1lbnRdLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUuYXJndW1lbnRdLFxuICB9LFxuXG4gIC8vIGlmIChmb28pIHt9XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuSWZTdGF0ZW1lbnRdLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUudGVzdF0sXG4gIH0sXG5cbiAgLy8gc3dpdGNoIChmb28pIHt9XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuU3dpdGNoU3RhdGVtZW50XSxcbiAgICBnZXROb2RlczogcGF0aCA9PiBbcGF0aC5ub2RlLmRpc2NyaW1pbmFudF0sXG4gIH0sXG5cbiAgLy8gIWZvbztcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5VbmFyeUV4cHJlc3Npb25dLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUuYXJndW1lbnRdLFxuICB9LFxuXG4gIC8vIGZvbyB8fCBiYXI7XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuQmluYXJ5RXhwcmVzc2lvbl0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5sZWZ0LCBwYXRoLm5vZGUucmlnaHRdLFxuICB9LFxuXG4gIC8vIGZvbyA8IGJhcjtcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5Mb2dpY2FsRXhwcmVzc2lvbl0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5sZWZ0LCBwYXRoLm5vZGUucmlnaHRdLFxuICB9LFxuXG4gIC8vIGZvbyA/IGJhciA6IGJhejtcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5Db25kaXRpb25hbEV4cHJlc3Npb25dLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtcbiAgICAgIHBhdGgubm9kZS50ZXN0LFxuICAgICAgcGF0aC5ub2RlLmFsdGVybmF0ZSxcbiAgICAgIHBhdGgubm9kZS5jb25zZXF1ZW50LFxuICAgIF0sXG4gIH0sXG5cbiAgLy8gbmV3IEZvbygpXG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuTmV3RXhwcmVzc2lvbl0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5jYWxsZWVdLmNvbmNhdChwYXRoLm5vZGUuYXJndW1lbnRzKSxcbiAgfSxcblxuICAvLyBmb28rKztcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5VcGRhdGVFeHByZXNzaW9uXSxcbiAgICBnZXROb2RlczogcGF0aCA9PiBbcGF0aC5ub2RlLmFyZ3VtZW50XSxcbiAgfSxcblxuICAvLyA8RWxlbWVudCBhdHRyaWJ1dGU9e2Zvb30gLz5cbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5KU1hFeHByZXNzaW9uQ29udGFpbmVyXSxcbiAgICBnZXROb2RlczogcGF0aCA9PiBbcGF0aC5ub2RlLmV4cHJlc3Npb25dLFxuICB9LFxuXG4gIC8vIGZvciAoZm9vIGluIGJhcikge31cbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5Gb3JJblN0YXRlbWVudF0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5sZWZ0LCBwYXRoLm5vZGUucmlnaHRdLFxuICB9LFxuXG4gIC8vIGZvciAoZm9vIG9mIGJhcikge31cbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5Gb3JPZlN0YXRlbWVudF0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5sZWZ0LCBwYXRoLm5vZGUucmlnaHRdLFxuICB9LFxuXG4gIC8vIGZvciAoZm9vOyBiYXI7IGJheikge31cbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5Gb3JTdGF0ZW1lbnRdLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUuaW5pdCwgcGF0aC5ub2RlLnRlc3QsIHBhdGgubm9kZS51cGRhdGVdLFxuICB9LFxuXG4gIC8vIHdoaWxlIChmb28pIHt9XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuV2hpbGVTdGF0ZW1lbnRdLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUudGVzdF0sXG4gIH0sXG5cbiAgLy8gZG8ge30gd2hpbGUgKGZvbylcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5Eb1doaWxlU3RhdGVtZW50XSxcbiAgICBnZXROb2RlczogcGF0aCA9PiBbcGF0aC5ub2RlLnRlc3RdLFxuICB9LFxuXG4gIC8vIFtmb29dXG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuQXJyYXlFeHByZXNzaW9uXSxcbiAgICBnZXROb2RlczogcGF0aCA9PiBwYXRoLm5vZGUuZWxlbWVudHMsXG4gIH0sXG5cbiAgLy8gU3BlY2lhbCBjYXNlLiBBbnkgSlNYIGVsZW1lbnRzIHdpbGwgZ2V0IHRyYW5zcGlsZWQgdG8gdXNlIFJlYWN0LlxuICB7XG4gICAgc2VhcmNoVGVybXM6IFtqc2NzLkpTWE9wZW5pbmdFbGVtZW50XSxcbiAgICBnZXROb2RlczogcGF0aCA9PiBbUkVBQ1RfTk9ERV0sXG4gIH0sXG5cbiAgLy8gZm9vYHNvbWV0aGluZ2BcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5UYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb25dLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUudGFnXSxcbiAgfSxcblxuICAvLyBgJHtiYXJ9YFxuICB7XG4gICAgc2VhcmNoVGVybXM6IFtqc2NzLlRlbXBsYXRlTGl0ZXJhbF0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gcGF0aC5ub2RlLmV4cHJlc3Npb25zLFxuICB9LFxuXG4gIC8vIGZ1bmN0aW9uIGZvbyhhID0gYikge31cbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5Bc3NpZ25tZW50UGF0dGVybl0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gW3BhdGgubm9kZS5yaWdodF0sXG4gIH0sXG5dO1xuXG4vKipcbiAqIFRoaXMgd2lsbCBnZXQgYSBsaXN0IG9mIGFsbCBpZGVudGlmaWVycyB0aGF0IGFyZSBub3QgZnJvbSBhIGRlY2xhcmF0aW9uLlxuICpcbiAqIE5PVEU6IHRoaXMgY2FuIGdldCBpZGVudGlmaWVycyB0aGF0IGFyZSBkZWNsYXJlZCwgaWYgeW91IHdhbnQgYWNjZXNzIHRvXG4gKiBpZGVudGlmaWVycyB0aGF0IGFyZSBhY2Nlc3MgYnV0IHVuZGVjbGFyZWQgc2VlIGdldFVuZGVjbGFyZWRJZGVudGlmaWVyc1xuICovXG5mdW5jdGlvbiBnZXROb25EZWNsYXJhdGlvbklkZW50aWZpZXJzKHJvb3Q6IENvbGxlY3Rpb24pOiBTZXQ8c3RyaW5nPiB7XG4gIGNvbnN0IGlkcyA9IG5ldyBTZXQoKTtcbiAgQ09ORklHLmZvckVhY2goY29uZmlnID0+IHtcbiAgICByb290XG4gICAgICAuZmluZChjb25maWcuc2VhcmNoVGVybXNbMF0sIGNvbmZpZy5zZWFyY2hUZXJtc1sxXSlcbiAgICAgIC5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICBjb25zdCBub2RlcyA9IGNvbmZpZy5nZXROb2RlcyhwYXRoKTtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICBjb25zdCBuYW1lcyA9IGdldE5hbWVzRnJvbUlEKG5vZGUpO1xuICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykge1xuICAgICAgICAgICAgaWRzLmFkZChuYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH0pO1xuICByZXR1cm4gaWRzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5vbkRlY2xhcmF0aW9uSWRlbnRpZmllcnM7XG4iXX0=