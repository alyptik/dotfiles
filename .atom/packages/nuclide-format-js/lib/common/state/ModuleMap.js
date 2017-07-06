var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(['import type {_} from \'_\''], ['import type {_} from \'_\'']),
    _templateObject2 = _taggedTemplateLiteral(['import type _ from \'_\''], ['import type _ from \'_\'']);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 */

var _utilsModuleMapUtils = require('../utils/ModuleMapUtils');

var _utilsModuleMapUtils2 = _interopRequireDefault(_utilsModuleMapUtils);

var _optionsOptions = require('../options/Options');

var _optionsOptions2 = _interopRequireDefault(_optionsOptions);

var _jscodeshift = require('jscodeshift');

var _jscodeshift2 = _interopRequireDefault(_jscodeshift);

var _utilsOneLineObjectPattern = require('../utils/oneLineObjectPattern');

var _utilsOneLineObjectPattern2 = _interopRequireDefault(_utilsOneLineObjectPattern);

var statement = _jscodeshift2['default'].template.statement;

var ModuleMap = (function () {
  function ModuleMap(options) {
    _classCallCheck(this, ModuleMap);

    _optionsOptions2['default'].validateModuleMapOptions(options);

    // Note: If someone maintains a reference to the structure within options
    // they could mutate the ModuleMap's behavior. We could make shallow copies
    // here but are opting not to for performance.
    this._builtIns = options.builtIns;
    this._builtInTypes = options.builtInTypes;
    this._aliases = options.aliases;
    this._aliasesToRelativize = options.aliasesToRelativize;

    // TODO: Use let for proper scoping.
    var id = undefined;
    var ids = undefined;
    var filePath = undefined;
    var set = undefined;

    this._defaults = new Map();
    for (filePath of options.paths) {
      ids = _utilsModuleMapUtils2['default'].getIdentifiersFromPath(filePath);
      var literal = _utilsModuleMapUtils2['default'].getLiteralFromPath(filePath);
      for (id of ids) {
        set = this._defaults.get(id);
        if (!set) {
          set = new Set();
          this._defaults.set(id, set);
        }
        set.add(literal);
      }
    }

    this._defaultsToRelativize = new Map();
    for (filePath of options.pathsToRelativize) {
      ids = _utilsModuleMapUtils2['default'].getIdentifiersFromPath(filePath);
      for (id of ids) {
        set = this._defaultsToRelativize.get(id);
        if (!set) {
          set = new Set();
          this._defaultsToRelativize.set(id, set);
        }
        set.add(filePath);
      }
    }
  }

  /**
   * Gets a single require, this isn't great for when you want to destructure
   * multiple things in a single statement.
   *
   * TODO: add a getRequires() that consolidates automatically, or add a
   * specific consolidate step as part of the transform.
   */

  _createClass(ModuleMap, [{
    key: 'getRequire',
    value: function getRequire(id, options) {
      _optionsOptions2['default'].validateRequireOptions(options);

      // Don't import built ins.
      if (!options.typeImport) {
        if (this._builtIns.has(id)) {
          return null;
        }
      } else {
        if (this._builtInTypes.has(id)) {
          return null;
        }
      }

      // TODO: Use let for proper scoping.
      var literal = undefined;
      var tmp = undefined;

      if (this._aliases.has(id)) {
        literal = this._aliases.get(id);
      } else if (options.sourcePath && this._aliasesToRelativize.has(id)) {
        literal = _utilsModuleMapUtils2['default'].relativizeForRequire(options.sourcePath,
        // $FlowFixMe(kad)
        this._aliasesToRelativize.get(id));
      } else if (this._defaults.has(id) &&
      // $FlowFixMe(kad)
      this._defaults.get(id).size === 1) {
        // TODO: What's the best way to get the single thing out of a one element
        // Set?
        // $FlowFixMe(kad)
        for (tmp of this._defaults.get(id)) {
          literal = tmp;
          break;
        }
      } else if (options.sourcePath && this._defaultsToRelativize.has(id) &&
      // $FlowFixMe(kad)
      this._defaultsToRelativize.get(id).size === 1) {
        var nonNullSourcePath = options.sourcePath;
        // TODO: What's the best way to get the single thing out of a one element
        // Set?
        // $FlowFixMe(kad)
        for (var filePath of this._defaultsToRelativize.get(id)) {
          literal = _utilsModuleMapUtils2['default'].relativizeForRequire(nonNullSourcePath, filePath);
          break;
        }
      } else if (options.jsxIdentifier) {
        // TODO: Make this configurable so that the suffix for JSX can be changed.
        literal = id + '.react';
      } else {
        // TODO: Make this configurable so that it's possible to only add known
        // requires and ignore unknown modules.
        literal = id;
      }

      // Create common nodes for printing.
      var idNode = _jscodeshift2['default'].identifier(id);
      var literalNode = _jscodeshift2['default'].literal(literal);

      // TODO: Support exports and destructuring.
      var destructure = false;

      if (destructure && options.typeImport) {
        // import type {foo} from 'foo';
        tmp = statement(_templateObject);
        tmp.specifiers[0].imported = idNode;
        tmp.specifiers[0].local = idNode;
        tmp.source = literalNode;
        return tmp;
      } else if (!destructure && options.typeImport) {
        // import type foo from 'foo';
        tmp = statement(_templateObject2);
        tmp.specifiers[0].id = idNode;
        tmp.specifiers[0].local = idNode;
        tmp.source = literalNode;
        return tmp;
      } else if (destructure && !options.typeImport) {
        // var {foo} = require('foo');
        var property = _jscodeshift2['default'].property('init', idNode, idNode);
        property.shorthand = true;
        return _jscodeshift2['default'].variableDeclaration('const', [_jscodeshift2['default'].variableDeclarator((0, _utilsOneLineObjectPattern2['default'])(_jscodeshift2['default'].objectPattern([property])), _jscodeshift2['default'].callExpression(_jscodeshift2['default'].identifier('require'), [literalNode]))]);
      } else if (!destructure && !options.typeImport) {
        // var foo = require('foo');
        return _jscodeshift2['default'].variableDeclaration('const', [_jscodeshift2['default'].variableDeclarator(idNode, _jscodeshift2['default'].callExpression(_jscodeshift2['default'].identifier('require'), [literalNode]))]);
      }

      // Can't handle this type of require yet.
      return null;
    }
  }, {
    key: 'getBuiltIns',
    value: function getBuiltIns() {
      return this._builtIns;
    }
  }, {
    key: 'getBuiltInTypes',
    value: function getBuiltInTypes() {
      return this._builtInTypes;
    }
  }]);

  return ModuleMap;
})();

module.exports = ModuleMap;

// Note: These fields are ordered by precendence.

/**
 * Identifiers that should be ignored when not a type.
 */

/**
 * Identifiers that should be ignored when they are a type.
 */

/**
 * Identifiers that have an exact alias to use.
 */

/**
 * Identifiers that have an exact path to use.
 */

/**
 * Identifiers that might correspond to the default export of a particular
 * literal.
 */

/**
 * Identifiers that might correspond to the default export of a particular
 * absolute path.
 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vc3RhdGUvTW9kdWxlTWFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FjMkIseUJBQXlCOzs7OzhCQUNoQyxvQkFBb0I7Ozs7MkJBQ3ZCLGFBQWE7Ozs7eUNBQ0csK0JBQStCOzs7O0lBRXpELFNBQVMsR0FBSSx5QkFBSyxRQUFRLENBQTFCLFNBQVM7O0lBRVYsU0FBUztBQThCRixXQTlCUCxTQUFTLENBOEJELE9BQXlCLEVBQUU7MEJBOUJuQyxTQUFTOztBQStCWCxnQ0FBUSx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7QUFLMUMsUUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ2xDLFFBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztBQUMxQyxRQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDaEMsUUFBSSxDQUFDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQzs7O0FBR3hELFFBQUksRUFBRSxZQUFBLENBQUM7QUFDUCxRQUFJLEdBQUcsWUFBQSxDQUFDO0FBQ1IsUUFBSSxRQUFRLFlBQUEsQ0FBQztBQUNiLFFBQUksR0FBRyxZQUFBLENBQUM7O0FBRVIsUUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzNCLFNBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDOUIsU0FBRyxHQUFHLGlDQUFlLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELFVBQU0sT0FBTyxHQUFHLGlDQUFlLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVELFdBQUssRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUNkLFdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3QixZQUFJLENB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USxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkQsZ0JBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQzFCLGVBQU8seUJBQUssbUJBQW1CLENBQzdCLE9BQU8sRUFDUCxDQUFDLHlCQUFLLGtCQUFrQixDQUN0Qiw0Q0FBcUIseUJBQUssYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUNwRCx5QkFBSyxjQUFjLENBQ2pCLHlCQUFLLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFDMUIsQ0FBQyxXQUFXLENBQUMsQ0FDZCxDQUNGLENBQUMsQ0FDSCxDQUFDO09BQ0gsTUFBTSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTs7QUFFOUMsZUFBTyx5QkFBSyxtQkFBbUIsQ0FDN0IsT0FBTyxFQUNQLENBQUMseUJBQUssa0JBQWtCLENBQ3RCLE1BQU0sRUFDTix5QkFBSyxjQUFjLENBQ2pCLHlCQUFLLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFDMUIsQ0FBQyxXQUFXLENBQUMsQ0FDZCxDQUNGLENBQUMsQ0FDSCxDQUFDO09BQ0g7OztBQUdELGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUVVLHVCQUFvQjtBQUM3QixhQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7OztXQUVjLDJCQUFvQjtBQUNqQyxhQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDM0I7OztTQTdNRyxTQUFTOzs7QUFnTmYsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMiLCJmaWxlIjoiTW9kdWxlTWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IHR5cGUge0Fic29sdXRlUGF0aCwgSWRlbnRpZmllciwgTGl0ZXJhbH0gZnJvbSAnLi4vdHlwZXMvY29tbW9uJztcbmltcG9ydCB0eXBlIHtNb2R1bGVNYXBPcHRpb25zfSBmcm9tICcuLi9vcHRpb25zL01vZHVsZU1hcE9wdGlvbnMnO1xuaW1wb3J0IHR5cGUge1JlcXVpcmVPcHRpb25zfSBmcm9tICcuLi9vcHRpb25zL1JlcXVpcmVPcHRpb25zJztcblxuaW1wb3J0IE1vZHVsZU1hcFV0aWxzIGZyb20gJy4uL3V0aWxzL01vZHVsZU1hcFV0aWxzJztcbmltcG9ydCBPcHRpb25zIGZyb20gJy4uL29wdGlvbnMvT3B0aW9ucyc7XG5pbXBvcnQganNjcyBmcm9tICdqc2NvZGVzaGlmdCc7XG5pbXBvcnQgb25lTGluZU9iamVjdFBhdHRlcm4gZnJvbSAnLi4vdXRpbHMvb25lTGluZU9iamVjdFBhdHRlcm4nO1xuXG5jb25zdCB7c3RhdGVtZW50fSA9IGpzY3MudGVtcGxhdGU7XG5cbmNsYXNzIE1vZHVsZU1hcCB7XG4gIC8vIE5vdGU6IFRoZXNlIGZpZWxkcyBhcmUgb3JkZXJlZCBieSBwcmVjZW5kZW5jZS5cblxuICAvKipcbiAgICogSWRlbnRpZmllcnMgdGhhdCBzaG91bGQgYmUgaWdub3JlZCB3aGVuIG5vdCBhIHR5cGUuXG4gICAqL1xuICBfYnVpbHRJbnM6IFNldDxJZGVudGlmaWVyPjtcbiAgLyoqXG4gICAqIElkZW50aWZpZXJzIHRoYXQgc2hvdWxkIGJlIGlnbm9yZWQgd2hlbiB0aGV5IGFyZSBhIHR5cGUuXG4gICAqL1xuICBfYnVpbHRJblR5cGVzOiBTZXQ8SWRlbnRpZmllcj47XG4gIC8qKlxuICAgKiBJZGVudGlmaWVycyB0aGF0IGhhdmUgYW4gZXhhY3QgYWxpYXMgdG8gdXNlLlxuICAgKi9cbiAgX2FsaWFzZXM6IE1hcDxJZGVudGlmaWVyLCBMaXRlcmFsPjtcbiAgLyoqXG4gICAqIElkZW50aWZpZXJzIHRoYXQgaGF2ZSBhbiBleGFjdCBwYXRoIHRvIHVzZS5cbiAgICovXG4gIF9hbGlhc2VzVG9SZWxhdGl2aXplOiBNYXA8SWRlbnRpZmllciwgQWJzb2x1dGVQYXRoPjtcbiAgLyoqXG4gICAqIElkZW50aWZpZXJzIHRoYXQgbWlnaHQgY29ycmVzcG9uZCB0byB0aGUgZGVmYXVsdCBleHBvcnQgb2YgYSBwYXJ0aWN1bGFyXG4gICAqIGxpdGVyYWwuXG4gICAqL1xuICBfZGVmYXVsdHM6IE1hcDxJZGVudGlmaWVyLCBTZXQ8TGl0ZXJhbD4+O1xuICAvKipcbiAgICogSWRlbnRpZmllcnMgdGhhdCBtaWdodCBjb3JyZXNwb25kIHRvIHRoZSBkZWZhdWx0IGV4cG9ydCBvZiBhIHBhcnRpY3VsYXJcbiAgICogYWJzb2x1dGUgcGF0aC5cbiAgICovXG4gIF9kZWZhdWx0c1RvUmVsYXRpdml6ZTogTWFwPElkZW50aWZpZXIsIFNldDxBYnNvbHV0ZVBhdGg+PjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBNb2R1bGVNYXBPcHRpb25zKSB7XG4gICAgT3B0aW9ucy52YWxpZGF0ZU1vZHVsZU1hcE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAvLyBOb3RlOiBJZiBzb21lb25lIG1haW50YWlucyBhIHJlZmVyZW5jZSB0byB0aGUgc3RydWN0dXJlIHdpdGhpbiBvcHRpb25zXG4gICAgLy8gdGhleSBjb3VsZCBtdXRhdGUgdGhlIE1vZHVsZU1hcCdzIGJlaGF2aW9yLiBXZSBjb3VsZCBtYWtlIHNoYWxsb3cgY29waWVzXG4gICAgLy8gaGVyZSBidXQgYXJlIG9wdGluZyBub3QgdG8gZm9yIHBlcmZvcm1hbmNlLlxuICAgIHRoaXMuX2J1aWx0SW5zID0gb3B0aW9ucy5idWlsdElucztcbiAgICB0aGlzLl9idWlsdEluVHlwZXMgPSBvcHRpb25zLmJ1aWx0SW5UeXBlcztcbiAgICB0aGlzLl9hbGlhc2VzID0gb3B0aW9ucy5hbGlhc2VzO1xuICAgIHRoaXMuX2FsaWFzZXNUb1JlbGF0aXZpemUgPSBvcHRpb25zLmFsaWFzZXNUb1JlbGF0aXZpemU7XG5cbiAgICAvLyBUT0RPOiBVc2UgbGV0IGZvciBwcm9wZXIgc2NvcGluZy5cbiAgICBsZXQgaWQ7XG4gICAgbGV0IGlkcztcbiAgICBsZXQgZmlsZVBhdGg7XG4gICAgbGV0IHNldDtcblxuICAgIHRoaXMuX2RlZmF1bHRzID0gbmV3IE1hcCgpO1xuICAgIGZvciAoZmlsZVBhdGggb2Ygb3B0aW9ucy5wYXRocykge1xuICAgICAgaWRzID0gTW9kdWxlTWFwVXRpbHMuZ2V0SWRlbnRpZmllcnNGcm9tUGF0aChmaWxlUGF0aCk7XG4gICAgICBjb25zdCBsaXRlcmFsID0gTW9kdWxlTWFwVXRpbHMuZ2V0TGl0ZXJhbEZyb21QYXRoKGZpbGVQYXRoKTtcbiAgICAgIGZvciAoaWQgb2YgaWRzKSB7XG4gICAgICAgIHNldCA9IHRoaXMuX2RlZmF1bHRzLmdldChpZCk7XG4gICAgICAgIGlmICghc2V0KSB7XG4gICAgICAgICAgc2V0ID0gbmV3IFNldCgpO1xuICAgICAgICAgIHRoaXMuX2RlZmF1bHRzLnNldChpZCwgc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBzZXQuYWRkKGxpdGVyYWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2RlZmF1bHRzVG9SZWxhdGl2aXplID0gbmV3IE1hcCgpO1xuICAgIGZvciAoZmlsZVBhdGggb2Ygb3B0aW9ucy5wYXRoc1RvUmVsYXRpdml6ZSkge1xuICAgICAgaWRzID0gTW9kdWxlTWFwVXRpbHMuZ2V0SWRlbnRpZmllcnNGcm9tUGF0aChmaWxlUGF0aCk7XG4gICAgICBmb3IgKGlkIG9mIGlkcykge1xuICAgICAgICBzZXQgPSB0aGlzLl9kZWZhdWx0c1RvUmVsYXRpdml6ZS5nZXQoaWQpO1xuICAgICAgICBpZiAoIXNldCkge1xuICAgICAgICAgIHNldCA9IG5ldyBTZXQoKTtcbiAgICAgICAgICB0aGlzLl9kZWZhdWx0c1RvUmVsYXRpdml6ZS5zZXQoaWQsIHNldCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0LmFkZChmaWxlUGF0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBzaW5nbGUgcmVxdWlyZSwgdGhpcyBpc24ndCBncmVhdCBmb3Igd2hlbiB5b3Ugd2FudCB0byBkZXN0cnVjdHVyZVxuICAgKiBtdWx0aXBsZSB0aGluZ3MgaW4gYSBzaW5nbGUgc3RhdGVtZW50LlxuICAgKlxuICAgKiBUT0RPOiBhZGQgYSBnZXRSZXF1aXJlcygpIHRoYXQgY29uc29saWRhdGVzIGF1dG9tYXRpY2FsbHksIG9yIGFkZCBhXG4gICAqIHNwZWNpZmljIGNvbnNvbGlkYXRlIHN0ZXAgYXMgcGFydCBvZiB0aGUgdHJhbnNmb3JtLlxuICAgKi9cbiAgZ2V0UmVxdWlyZShpZDogSWRlbnRpZmllciwgb3B0aW9uczogUmVxdWlyZU9wdGlvbnMpOiA/Tm9kZSB7XG4gICAgT3B0aW9ucy52YWxpZGF0ZVJlcXVpcmVPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgLy8gRG9uJ3QgaW1wb3J0IGJ1aWx0IGlucy5cbiAgICBpZiAoIW9wdGlvbnMudHlwZUltcG9ydCkge1xuICAgICAgaWYgKHRoaXMuX2J1aWx0SW5zLmhhcyhpZCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9idWlsdEluVHlwZXMuaGFzKGlkKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPOiBVc2UgbGV0IGZvciBwcm9wZXIgc2NvcGluZy5cbiAgICBsZXQgbGl0ZXJhbDtcbiAgICBsZXQgdG1wO1xuXG4gICAgaWYgKHRoaXMuX2FsaWFzZXMuaGFzKGlkKSkge1xuICAgICAgbGl0ZXJhbCA9IHRoaXMuX2FsaWFzZXMuZ2V0KGlkKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuc291cmNlUGF0aCAmJiB0aGlzLl9hbGlhc2VzVG9SZWxhdGl2aXplLmhhcyhpZCkpIHtcbiAgICAgIGxpdGVyYWwgPSBNb2R1bGVNYXBVdGlscy5yZWxhdGl2aXplRm9yUmVxdWlyZShcbiAgICAgICAgb3B0aW9ucy5zb3VyY2VQYXRoLFxuICAgICAgICAvLyAkRmxvd0ZpeE1lKGthZClcbiAgICAgICAgdGhpcy5fYWxpYXNlc1RvUmVsYXRpdml6ZS5nZXQoaWQpLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5fZGVmYXVsdHMuaGFzKGlkKSAmJlxuICAgICAgLy8gJEZsb3dGaXhNZShrYWQpXG4gICAgICB0aGlzLl9kZWZhdWx0cy5nZXQoaWQpLnNpemUgPT09IDFcbiAgICApIHtcbiAgICAgIC8vIFRPRE86IFdoYXQncyB0aGUgYmVzdCB3YXkgdG8gZ2V0IHRoZSBzaW5nbGUgdGhpbmcgb3V0IG9mIGEgb25lIGVsZW1lbnRcbiAgICAgIC8vIFNldD9cbiAgICAgIC8vICRGbG93Rml4TWUoa2FkKVxuICAgICAgZm9yICh0bXAgb2YgdGhpcy5fZGVmYXVsdHMuZ2V0KGlkKSkge1xuICAgICAgICBsaXRlcmFsID0gdG1wO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgb3B0aW9ucy5zb3VyY2VQYXRoICYmXG4gICAgICB0aGlzLl9kZWZhdWx0c1RvUmVsYXRpdml6ZS5oYXMoaWQpICYmXG4gICAgICAvLyAkRmxvd0ZpeE1lKGthZClcbiAgICAgIHRoaXMuX2RlZmF1bHRzVG9SZWxhdGl2aXplLmdldChpZCkuc2l6ZSA9PT0gMVxuICAgICkge1xuICAgICAgY29uc3Qgbm9uTnVsbFNvdXJjZVBhdGggPSBvcHRpb25zLnNvdXJjZVBhdGg7XG4gICAgICAvLyBUT0RPOiBXaGF0J3MgdGhlIGJlc3Qgd2F5IHRvIGdldCB0aGUgc2luZ2xlIHRoaW5nIG91dCBvZiBhIG9uZSBlbGVtZW50XG4gICAgICAvLyBTZXQ/XG4gICAgICAvLyAkRmxvd0ZpeE1lKGthZClcbiAgICAgIGZvciAoY29uc3QgZmlsZVBhdGggb2YgdGhpcy5fZGVmYXVsdHNUb1JlbGF0aXZpemUuZ2V0KGlkKSkge1xuICAgICAgICBsaXRlcmFsID0gTW9kdWxlTWFwVXRpbHMucmVsYXRpdml6ZUZvclJlcXVpcmUoXG4gICAgICAgICAgbm9uTnVsbFNvdXJjZVBhdGgsXG4gICAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5qc3hJZGVudGlmaWVyKSB7XG4gICAgICAvLyBUT0RPOiBNYWtlIHRoaXMgY29uZmlndXJhYmxlIHNvIHRoYXQgdGhlIHN1ZmZpeCBmb3IgSlNYIGNhbiBiZSBjaGFuZ2VkLlxuICAgICAgbGl0ZXJhbCA9IGlkICsgJy5yZWFjdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRPRE86IE1ha2UgdGhpcyBjb25maWd1cmFibGUgc28gdGhhdCBpdCdzIHBvc3NpYmxlIHRvIG9ubHkgYWRkIGtub3duXG4gICAgICAvLyByZXF1aXJlcyBhbmQgaWdub3JlIHVua25vd24gbW9kdWxlcy5cbiAgICAgIGxpdGVyYWwgPSBpZDtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgY29tbW9uIG5vZGVzIGZvciBwcmludGluZy5cbiAgICBjb25zdCBpZE5vZGUgPSBqc2NzLmlkZW50aWZpZXIoaWQpO1xuICAgIGNvbnN0IGxpdGVyYWxOb2RlID0ganNjcy5saXRlcmFsKGxpdGVyYWwpO1xuXG4gICAgLy8gVE9ETzogU3VwcG9ydCBleHBvcnRzIGFuZCBkZXN0cnVjdHVyaW5nLlxuICAgIGNvbnN0IGRlc3RydWN0dXJlID0gZmFsc2U7XG5cbiAgICBpZiAoZGVzdHJ1Y3R1cmUgJiYgb3B0aW9ucy50eXBlSW1wb3J0KSB7XG4gICAgICAvLyBpbXBvcnQgdHlwZSB7Zm9vfSBmcm9tICdmb28nO1xuICAgICAgdG1wID0gc3RhdGVtZW50YGltcG9ydCB0eXBlIHtffSBmcm9tICdfJ2A7XG4gICAgICB0bXAuc3BlY2lmaWVyc1swXS5pbXBvcnRlZCA9IGlkTm9kZTtcbiAgICAgIHRtcC5zcGVjaWZpZXJzWzBdLmxvY2FsID0gaWROb2RlO1xuICAgICAgdG1wLnNvdXJjZSA9IGxpdGVyYWxOb2RlO1xuICAgICAgcmV0dXJuIHRtcDtcbiAgICB9IGVsc2UgaWYgKCFkZXN0cnVjdHVyZSAmJiBvcHRpb25zLnR5cGVJbXBvcnQpIHtcbiAgICAgIC8vIGltcG9ydCB0eXBlIGZvbyBmcm9tICdmb28nO1xuICAgICAgdG1wID0gc3RhdGVtZW50YGltcG9ydCB0eXBlIF8gZnJvbSAnXydgO1xuICAgICAgdG1wLnNwZWNpZmllcnNbMF0uaWQgPSBpZE5vZGU7XG4gICAgICB0bXAuc3BlY2lmaWVyc1swXS5sb2NhbCA9IGlkTm9kZTtcbiAgICAgIHRtcC5zb3VyY2UgPSBsaXRlcmFsTm9kZTtcbiAgICAgIHJldHVybiB0bXA7XG4gICAgfSBlbHNlIGlmIChkZXN0cnVjdHVyZSAmJiAhb3B0aW9ucy50eXBlSW1wb3J0KSB7XG4gICAgICAvLyB2YXIge2Zvb30gPSByZXF1aXJlKCdmb28nKTtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0ganNjcy5wcm9wZXJ0eSgnaW5pdCcsIGlkTm9kZSwgaWROb2RlKTtcbiAgICAgIHByb3BlcnR5LnNob3J0aGFuZCA9IHRydWU7XG4gICAgICByZXR1cm4ganNjcy52YXJpYWJsZURlY2xhcmF0aW9uKFxuICAgICAgICAnY29uc3QnLFxuICAgICAgICBbanNjcy52YXJpYWJsZURlY2xhcmF0b3IoXG4gICAgICAgICAgb25lTGluZU9iamVjdFBhdHRlcm4oanNjcy5vYmplY3RQYXR0ZXJuKFtwcm9wZXJ0eV0pKSxcbiAgICAgICAgICBqc2NzLmNhbGxFeHByZXNzaW9uKFxuICAgICAgICAgICAganNjcy5pZGVudGlmaWVyKCdyZXF1aXJlJyksXG4gICAgICAgICAgICBbbGl0ZXJhbE5vZGVdLFxuICAgICAgICAgICksXG4gICAgICAgICldLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCFkZXN0cnVjdHVyZSAmJiAhb3B0aW9ucy50eXBlSW1wb3J0KSB7XG4gICAgICAvLyB2YXIgZm9vID0gcmVxdWlyZSgnZm9vJyk7XG4gICAgICByZXR1cm4ganNjcy52YXJpYWJsZURlY2xhcmF0aW9uKFxuICAgICAgICAnY29uc3QnLFxuICAgICAgICBbanNjcy52YXJpYWJsZURlY2xhcmF0b3IoXG4gICAgICAgICAgaWROb2RlLFxuICAgICAgICAgIGpzY3MuY2FsbEV4cHJlc3Npb24oXG4gICAgICAgICAgICBqc2NzLmlkZW50aWZpZXIoJ3JlcXVpcmUnKSxcbiAgICAgICAgICAgIFtsaXRlcmFsTm9kZV0sXG4gICAgICAgICAgKSxcbiAgICAgICAgKV0sXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIENhbid0IGhhbmRsZSB0aGlzIHR5cGUgb2YgcmVxdWlyZSB5ZXQuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXRCdWlsdElucygpOiBTZXQ8SWRlbnRpZmllcj4ge1xuICAgIHJldHVybiB0aGlzLl9idWlsdElucztcbiAgfVxuXG4gIGdldEJ1aWx0SW5UeXBlcygpOiBTZXQ8SWRlbnRpZmllcj4ge1xuICAgIHJldHVybiB0aGlzLl9idWlsdEluVHlwZXM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2R1bGVNYXA7XG4iXX0=