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

/**
 * These are the ways in which an identifier might be declared, note that these
 * identifiers are safe to use in code. They should not include types that have
 * been declared.
 */
var CONFIG = [
// function foo(...rest) {}
{
  searchTerms: [_jscodeshift2['default'].FunctionDeclaration],
  getNodes: function getNodes(path) {
    return [path.node.id, path.node.rest].concat(path.node.params);
  }
},

// foo(...rest) {}, in a class body for example
{
  searchTerms: [_jscodeshift2['default'].FunctionExpression],
  getNodes: function getNodes(path) {
    return [path.node.rest].concat(path.node.params);
  }
},

// var foo;
{
  searchTerms: [_jscodeshift2['default'].VariableDeclaration],
  getNodes: function getNodes(path) {
    return path.node.declarations.map(function (declaration) {
      return declaration.id;
    });
  }
},

// class foo {}
{
  searchTerms: [_jscodeshift2['default'].ClassDeclaration],
  getNodes: function getNodes(path) {
    return [path.node.id];
  }
},

// (foo, ...rest) => {}
{
  searchTerms: [_jscodeshift2['default'].ArrowFunctionExpression],
  getNodes: function getNodes(path) {
    return [path.node.rest].concat(path.node.params);
  }
},

// try {} catch (foo) {}
{
  searchTerms: [_jscodeshift2['default'].CatchClause],
  getNodes: function getNodes(path) {
    return [path.node.param];
  }
},

// function foo(a = b) {}
{
  searchTerms: [_jscodeshift2['default'].AssignmentPattern],
  getNodes: function getNodes(path) {
    return [path.node.left];
  }
}];

/**
 * This will get a list of all identifiers that are declared within root's AST
 */
function getDeclaredIdentifiers(root, options, filters) {
  // Start with the globals since they are always "declared" and safe to use.
  var moduleMap = options.moduleMap;

  var ids = new Set(moduleMap.getBuiltIns());
  CONFIG.forEach(function (config) {
    root.find(config.searchTerms[0], config.searchTerms[1]).filter(function (path) {
      return filters ? filters.every(function (filter) {
        return filter(path);
      }) : true;
    }).forEach(function (path) {
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

module.exports = getDeclaredIdentifiers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vdXRpbHMvZ2V0RGVjbGFyZWRJZGVudGlmaWVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OEJBYTJCLGtCQUFrQjs7OzsyQkFDNUIsYUFBYTs7Ozs7Ozs7O0FBWTlCLElBQU0sTUFBMEIsR0FBRzs7QUFFakM7QUFDRSxhQUFXLEVBQUUsQ0FBQyx5QkFBSyxtQkFBbUIsQ0FBQztBQUN2QyxVQUFRLEVBQUUsa0JBQUEsSUFBSTtXQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7R0FBQTtDQUMxRTs7O0FBR0Q7QUFDRSxhQUFXLEVBQUUsQ0FBQyx5QkFBSyxrQkFBa0IsQ0FBQztBQUN0QyxVQUFRLEVBQUUsa0JBQUEsSUFBSTtXQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7R0FBQTtDQUM1RDs7O0FBR0Q7QUFDRSxhQUFXLEVBQUUsQ0FBQyx5QkFBSyxtQkFBbUIsQ0FBQztBQUN2QyxVQUFRLEVBQUUsa0JBQUEsSUFBSTtXQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFdBQVc7YUFBSSxXQUFXLENBQUMsRUFBRTtLQUFBLENBQUM7R0FBQTtDQUM1RTs7O0FBR0Q7QUFDRSxhQUFXLEVBQUUsQ0FBQyx5QkFBSyxnQkFBZ0IsQ0FBQztBQUNwQyxVQUFRLEVBQUUsa0JBQUEsSUFBSTtXQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7R0FBQTtDQUNqQzs7O0FBR0Q7QUFDRSxhQUFXLEVBQUUsQ0FBQyx5QkFBSyx1QkFBdUIsQ0FBQztBQUMzQyxVQUFRLEVBQUUsa0JBQUEsSUFBSTtXQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7R0FBQTtDQUM1RDs7O0FBR0Q7QUFDRSxhQUFXLEVBQUUsQ0FBQyx5QkFBSyxXQUFXLENBQUM7QUFDL0IsVUFBUSxFQUFFLGtCQUFBLElBQUk7V0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQUE7Q0FDcEM7OztBQUdEO0FBQ0UsYUFBVyxFQUFFLENBQUMseUJBQUssaUJBQWlCLENBQUM7QUFDckMsVUFBUSxFQUFFLGtCQUFBLElBQUk7V0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0dBQUE7Q0FDbkMsQ0FDRixDQUFDOzs7OztBQUtGLFNBQVMsc0JBQXNCLENBQzdCLElBQWdCLEVBQ2hCLE9BQXNCLEVBQ3RCLE9BQTZDLEVBQ2hDOztNQUVOLFNBQVMsR0FBSSxPQUFPLENBQXBCLFNBQVM7O0FBQ2hCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLFFBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDdkIsUUFBSSxDQUNELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEQsTUFBTSxDQUFDLFVBQUEsSUFBSTthQUFLLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQUEsTUFBTTtlQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7T0FBQSxDQUFDLEdBQUcsSUFBSTtLQUFDLENBQUMsQ0FDeEUsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ2YsVUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxXQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSSxFQUFJO0FBQ3BCLFlBQU0sS0FBSyxHQUFHLGlDQUFlLElBQUksQ0FBQyxDQUFDO0FBQ25DLGFBQUssSUFBTSxLQUFJLElBQUksS0FBSyxFQUFFO0FBQ3hCLGFBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLENBQUM7U0FDZjtPQUNGLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNOLENBQUMsQ0FBQztBQUNILFNBQU8sR0FBRyxDQUFDO0NBQ1o7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyIsImZpbGUiOiJnZXREZWNsYXJlZElkZW50aWZpZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge0NvbGxlY3Rpb24sIE5vZGUsIE5vZGVQYXRofSBmcm9tICcuLi90eXBlcy9hc3QnO1xuaW1wb3J0IHR5cGUge1NvdXJjZU9wdGlvbnN9IGZyb20gJy4uL29wdGlvbnMvU291cmNlT3B0aW9ucyc7XG5cbmltcG9ydCBnZXROYW1lc0Zyb21JRCBmcm9tICcuL2dldE5hbWVzRnJvbUlEJztcbmltcG9ydCBqc2NzIGZyb20gJ2pzY29kZXNoaWZ0JztcblxudHlwZSBDb25maWdFbnRyeSA9IHtcbiAgc2VhcmNoVGVybXM6IFthbnksID9PYmplY3RdLFxuICBnZXROb2RlczogKHBhdGg6IE5vZGVQYXRoKSA9PiBBcnJheTxOb2RlPixcbn07XG5cbi8qKlxuICogVGhlc2UgYXJlIHRoZSB3YXlzIGluIHdoaWNoIGFuIGlkZW50aWZpZXIgbWlnaHQgYmUgZGVjbGFyZWQsIG5vdGUgdGhhdCB0aGVzZVxuICogaWRlbnRpZmllcnMgYXJlIHNhZmUgdG8gdXNlIGluIGNvZGUuIFRoZXkgc2hvdWxkIG5vdCBpbmNsdWRlIHR5cGVzIHRoYXQgaGF2ZVxuICogYmVlbiBkZWNsYXJlZC5cbiAqL1xuY29uc3QgQ09ORklHOiBBcnJheTxDb25maWdFbnRyeT4gPSBbXG4gIC8vIGZ1bmN0aW9uIGZvbyguLi5yZXN0KSB7fVxuICB7XG4gICAgc2VhcmNoVGVybXM6IFtqc2NzLkZ1bmN0aW9uRGVjbGFyYXRpb25dLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUuaWQsIHBhdGgubm9kZS5yZXN0XS5jb25jYXQocGF0aC5ub2RlLnBhcmFtcyksXG4gIH0sXG5cbiAgLy8gZm9vKC4uLnJlc3QpIHt9LCBpbiBhIGNsYXNzIGJvZHkgZm9yIGV4YW1wbGVcbiAge1xuICAgIHNlYXJjaFRlcm1zOiBbanNjcy5GdW5jdGlvbkV4cHJlc3Npb25dLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUucmVzdF0uY29uY2F0KHBhdGgubm9kZS5wYXJhbXMpLFxuICB9LFxuXG4gIC8vIHZhciBmb287XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuVmFyaWFibGVEZWNsYXJhdGlvbl0sXG4gICAgZ2V0Tm9kZXM6IHBhdGggPT4gcGF0aC5ub2RlLmRlY2xhcmF0aW9ucy5tYXAoZGVjbGFyYXRpb24gPT4gZGVjbGFyYXRpb24uaWQpLFxuICB9LFxuXG4gIC8vIGNsYXNzIGZvbyB7fVxuICB7XG4gICAgc2VhcmNoVGVybXM6IFtqc2NzLkNsYXNzRGVjbGFyYXRpb25dLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUuaWRdLFxuICB9LFxuXG4gIC8vIChmb28sIC4uLnJlc3QpID0+IHt9XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuQXJyb3dGdW5jdGlvbkV4cHJlc3Npb25dLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUucmVzdF0uY29uY2F0KHBhdGgubm9kZS5wYXJhbXMpLFxuICB9LFxuXG4gIC8vIHRyeSB7fSBjYXRjaCAoZm9vKSB7fVxuICB7XG4gICAgc2VhcmNoVGVybXM6IFtqc2NzLkNhdGNoQ2xhdXNlXSxcbiAgICBnZXROb2RlczogcGF0aCA9PiBbcGF0aC5ub2RlLnBhcmFtXSxcbiAgfSxcblxuICAvLyBmdW5jdGlvbiBmb28oYSA9IGIpIHt9XG4gIHtcbiAgICBzZWFyY2hUZXJtczogW2pzY3MuQXNzaWdubWVudFBhdHRlcm5dLFxuICAgIGdldE5vZGVzOiBwYXRoID0+IFtwYXRoLm5vZGUubGVmdF0sXG4gIH0sXG5dO1xuXG4vKipcbiAqIFRoaXMgd2lsbCBnZXQgYSBsaXN0IG9mIGFsbCBpZGVudGlmaWVycyB0aGF0IGFyZSBkZWNsYXJlZCB3aXRoaW4gcm9vdCdzIEFTVFxuICovXG5mdW5jdGlvbiBnZXREZWNsYXJlZElkZW50aWZpZXJzKFxuICByb290OiBDb2xsZWN0aW9uLFxuICBvcHRpb25zOiBTb3VyY2VPcHRpb25zLFxuICBmaWx0ZXJzPzogP0FycmF5PChwYXRoOiBOb2RlUGF0aCkgPT4gYm9vbGVhbj4sXG4pOiBTZXQ8c3RyaW5nPiB7XG4gIC8vIFN0YXJ0IHdpdGggdGhlIGdsb2JhbHMgc2luY2UgdGhleSBhcmUgYWx3YXlzIFwiZGVjbGFyZWRcIiBhbmQgc2FmZSB0byB1c2UuXG4gIGNvbnN0IHttb2R1bGVNYXB9ID0gb3B0aW9ucztcbiAgY29uc3QgaWRzID0gbmV3IFNldChtb2R1bGVNYXAuZ2V0QnVpbHRJbnMoKSk7XG4gIENPTkZJRy5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgcm9vdFxuICAgICAgLmZpbmQoY29uZmlnLnNlYXJjaFRlcm1zWzBdLCBjb25maWcuc2VhcmNoVGVybXNbMV0pXG4gICAgICAuZmlsdGVyKHBhdGggPT4gKGZpbHRlcnMgPyBmaWx0ZXJzLmV2ZXJ5KGZpbHRlciA9PiBmaWx0ZXIocGF0aCkpIDogdHJ1ZSkpXG4gICAgICAuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBjb25maWcuZ2V0Tm9kZXMocGF0aCk7XG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgY29uc3QgbmFtZXMgPSBnZXROYW1lc0Zyb21JRChub2RlKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGlkcy5hZGQobmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGlkcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXREZWNsYXJlZElkZW50aWZpZXJzO1xuIl19