Object.defineProperty(exports, '__esModule', {
  value: true
});
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

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.observeSettings = observeSettings;
exports.calculateOptions = calculateOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _common = require('../common');

var _common2 = _interopRequireDefault(_common);

// Nuclide package settings used to calculate the module map,
// the blacklist, and control the plugin behavior.
var createModuleMap = _common2['default'].createModuleMap;

// We need this in array formats.
var defaultAliases = Array.from(_common2['default'].defaultAliases);
var defaultBuiltIns = Array.from(_common2['default'].defaultBuiltIns);
var defaultBuiltInTypes = Array.from(_common2['default'].defaultBuiltInTypes);

/**
 * Observes the relevant Nuclide package settings.
 */

function observeSettings(callback) {
  return atom.config.observe('nuclide-format-js', function (settings) {
    return callback(_extends({}, settings, {
      aliases: fixAliases(settings.aliases)
    }));
  });
}

/**
 * Calculates the current options according to the Nuclide configuration object.
 * This may get expensive in the future as the module map becomes smarter.
 */

function calculateOptions(settings) {
  return {
    blacklist: calculateBlacklist(settings),
    moduleMap: calculateModuleMap(settings)
  };
}

/**
 * Calculates a module map from the settings.
 */
function calculateModuleMap(settings) {
  // Construct the aliases.
  var aliases = new Map(settings.aliases);
  for (var entry of defaultAliases) {
    var _entry = _slicedToArray(entry, 2);

    var key = _entry[0];
    var _value = _entry[1];

    if (!aliases.has(key)) {
      aliases.set(key, _value);
    }
  }

  // Construct the built ins.
  var builtIns = new Set(defaultBuiltIns);
  for (var builtIn of settings.builtIns) {
    builtIns.add(builtIn);
  }

  // Construct built in types.
  var builtInTypes = new Set(defaultBuiltInTypes);
  for (var builtInType of settings.builtInTypes) {
    builtInTypes.add(builtInType);
  }

  // And then calculate the module map.
  return createModuleMap({
    paths: [],
    pathsToRelativize: [],
    aliases: aliases,
    aliasesToRelativize: new Map(),
    builtIns: builtIns,
    builtInTypes: builtInTypes
  });
}

/**
 * Calculates the blacklist from the settings.
 */
function calculateBlacklist(settings) {
  var blacklist = new Set();
  if (!settings.nuclideFixHeader) {
    blacklist.add('nuclide.fixHeader');
  }
  if (!settings.requiresTransferComments) {
    blacklist.add('requires.transferComments');
  }
  if (!settings.requiresRemoveUnusedRequires) {
    blacklist.add('requires.removeUnusedRequires');
  }
  if (!settings.requiresAddMissingRequires) {
    blacklist.add('requires.addMissingRequires');
  }
  if (!settings.requiresRemoveUnusedTypes) {
    blacklist.add('requires.removeUnusedTypes');
  }
  if (!settings.requiresAddMissingTypes) {
    blacklist.add('requires.addMissingTypes');
  }
  if (!settings.requiresFormatRequires) {
    blacklist.add('requires.formatRequires');
  }
  return blacklist;
}

// Some small helper functions.

/**
 * Nuclide can't handle nested arrays well in settings, so we save it in a
 * flat array and fix up each pair or entries before using it in the transform
 */
function fixAliases(aliases_) {
  var aliases = aliases_;
  aliases = aliases || [];
  var pairs = [];
  for (var i = 0; i < aliases.length - 1; i += 2) {
    pairs.push([aliases[i], aliases[i + 1]]);
  }
  return pairs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdG9tL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFnQnlCLFdBQVc7Ozs7OztJQWtCN0IsZUFBZSx1QkFBZixlQUFlOzs7QUFFdEIsSUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBYSxjQUFjLENBQUMsQ0FBQztBQUMvRCxJQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFhLGVBQWUsQ0FBQyxDQUFDO0FBQ2pFLElBQU0sbUJBQW1CLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBYSxtQkFBbUIsQ0FBQyxDQUFDOzs7Ozs7QUFLbEUsU0FBUyxlQUFlLENBQUMsUUFBbUMsRUFBZTtBQUNoRixTQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLFVBQUEsUUFBUTtXQUN0RCxRQUFRLGNBQ0gsUUFBUTtBQUNYLGFBQU8sRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztPQUNyQztHQUFBLENBQ0gsQ0FBQztDQUNIOzs7Ozs7O0FBTU0sU0FBUyxnQkFBZ0IsQ0FBQyxRQUFrQixFQUFpQjtBQUNsRSxTQUFPO0FBQ0wsYUFBUyxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztBQUN2QyxhQUFTLEVBQUUsa0JBQWtCLENBQUMsUUFBUSxDQUFDO0dBQ3hDLENBQUM7Q0FDSDs7Ozs7QUFLRCxTQUFTLGtCQUFrQixDQUFDLFFBQWtCLEVBQWE7O0FBRXpELE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQyxPQUFLLElBQU0sS0FBSyxJQUFJLGNBQWMsRUFBRTtnQ0FDYixLQUFLOztRQUFuQixHQUFHO1FBQUUsTUFBSzs7QUFDakIsUUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDckIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBSyxDQUFDLENBQUM7S0FDekI7R0FDRjs7O0FBR0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDMUMsT0FBSyxJQUFNLE9BQU8sSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ3ZDLFlBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDdkI7OztBQUdELE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDbEQsT0FBSyxJQUFNLFdBQVcsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFO0FBQy9DLGdCQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQy9COzs7QUFHRCxTQUFPLGVBQWUsQ0FBQztBQUNyQixTQUFLLEVBQUUsRUFBRTtBQUNULHFCQUFpQixFQUFFLEVBQUU7QUFDckIsV0FBTyxFQUFQLE9BQU87QUFDUCx1QkFBbUIsRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUM5QixZQUFRLEVBQVIsUUFBUTtBQUNSLGdCQUFZLEVBQVosWUFBWTtHQUNiLENBQUMsQ0FBQztDQUNKOzs7OztBQUtELFNBQVMsa0JBQWtCLENBQUMsUUFBa0IsRUFBcUI7QUFDakUsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO0FBQzlCLGFBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztHQUNwQztBQUNELE1BQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEVBQUU7QUFDdEMsYUFBUyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0dBQzVDO0FBQ0QsTUFBSSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtBQUMxQyxhQUFTLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7R0FDaEQ7QUFDRCxNQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFO0FBQ3hDLGFBQVMsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztHQUM5QztBQUNELE1BQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLEVBQUU7QUFDdkMsYUFBUyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0dBQzdDO0FBQ0QsTUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtBQUNyQyxhQUFTLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7R0FDM0M7QUFDRCxNQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFO0FBQ3BDLGFBQVMsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztHQUMxQztBQUNELFNBQU8sU0FBUyxDQUFDO0NBQ2xCOzs7Ozs7OztBQVFELFNBQVMsVUFBVSxDQUFDLFFBQXdCLEVBQTJCO0FBQ3JFLE1BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQztBQUN2QixTQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUN4QixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDakIsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDOUMsU0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUMxQztBQUNELFNBQU8sS0FBSyxDQUFDO0NBQ2QiLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG4vKiBnbG9iYWxzIGF0b20gKi9cblxuaW1wb3J0IHR5cGUgTW9kdWxlTWFwIGZyb20gJy4uL2NvbW1vbi9zdGF0ZS9Nb2R1bGVNYXAnO1xuaW1wb3J0IHR5cGUge1NvdXJjZU9wdGlvbnN9IGZyb20gJy4uL2NvbW1vbi9vcHRpb25zL1NvdXJjZU9wdGlvbnMnO1xuaW1wb3J0IHR5cGUge1RyYW5zZm9ybUtleX0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3RyYW5zZm9ybXMnO1xuXG5pbXBvcnQgZm9ybWF0SlNCYXNlIGZyb20gJy4uL2NvbW1vbic7XG5cbi8vIE51Y2xpZGUgcGFja2FnZSBzZXR0aW5ncyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbW9kdWxlIG1hcCxcbi8vIHRoZSBibGFja2xpc3QsIGFuZCBjb250cm9sIHRoZSBwbHVnaW4gYmVoYXZpb3IuXG5leHBvcnQgdHlwZSBTZXR0aW5ncyA9IHtcbiAgYWxpYXNlczogQXJyYXk8W3N0cmluZywgc3RyaW5nXT4sXG4gIGJ1aWx0SW5zOiBBcnJheTxzdHJpbmc+LFxuICBidWlsdEluVHlwZXM6IEFycmF5PHN0cmluZz4sXG4gIG51Y2xpZGVGaXhIZWFkZXI6IGJvb2xlYW4sXG4gIHJlcXVpcmVzVHJhbnNmZXJDb21tZW50czogYm9vbGVhbixcbiAgcmVxdWlyZXNSZW1vdmVVbnVzZWRSZXF1aXJlczogYm9vbGVhbixcbiAgcmVxdWlyZXNBZGRNaXNzaW5nUmVxdWlyZXM6IGJvb2xlYW4sXG4gIHJlcXVpcmVzUmVtb3ZlVW51c2VkVHlwZXM6IGJvb2xlYW4sXG4gIHJlcXVpcmVzQWRkTWlzc2luZ1R5cGVzOiBib29sZWFuLFxuICByZXF1aXJlc0Zvcm1hdFJlcXVpcmVzOiBib29sZWFuLFxuICBydW5PblNhdmU6IGJvb2xlYW4sXG59O1xuXG5jb25zdCB7Y3JlYXRlTW9kdWxlTWFwfSA9IGZvcm1hdEpTQmFzZTtcbi8vIFdlIG5lZWQgdGhpcyBpbiBhcnJheSBmb3JtYXRzLlxuY29uc3QgZGVmYXVsdEFsaWFzZXMgPSBBcnJheS5mcm9tKGZvcm1hdEpTQmFzZS5kZWZhdWx0QWxpYXNlcyk7XG5jb25zdCBkZWZhdWx0QnVpbHRJbnMgPSBBcnJheS5mcm9tKGZvcm1hdEpTQmFzZS5kZWZhdWx0QnVpbHRJbnMpO1xuY29uc3QgZGVmYXVsdEJ1aWx0SW5UeXBlcyA9IEFycmF5LmZyb20oZm9ybWF0SlNCYXNlLmRlZmF1bHRCdWlsdEluVHlwZXMpO1xuXG4vKipcbiAqIE9ic2VydmVzIHRoZSByZWxldmFudCBOdWNsaWRlIHBhY2thZ2Ugc2V0dGluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlU2V0dGluZ3MoY2FsbGJhY2s6ICh2YWx1ZTogU2V0dGluZ3MpID0+IHZvaWQpOiBJRGlzcG9zYWJsZSB7XG4gIHJldHVybiBhdG9tLmNvbmZpZy5vYnNlcnZlKCdudWNsaWRlLWZvcm1hdC1qcycsIHNldHRpbmdzID0+XG4gICAgY2FsbGJhY2soe1xuICAgICAgLi4uc2V0dGluZ3MsXG4gICAgICBhbGlhc2VzOiBmaXhBbGlhc2VzKHNldHRpbmdzLmFsaWFzZXMpLFxuICAgIH0pLFxuICApO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGN1cnJlbnQgb3B0aW9ucyBhY2NvcmRpbmcgdG8gdGhlIE51Y2xpZGUgY29uZmlndXJhdGlvbiBvYmplY3QuXG4gKiBUaGlzIG1heSBnZXQgZXhwZW5zaXZlIGluIHRoZSBmdXR1cmUgYXMgdGhlIG1vZHVsZSBtYXAgYmVjb21lcyBzbWFydGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlT3B0aW9ucyhzZXR0aW5nczogU2V0dGluZ3MpOiBTb3VyY2VPcHRpb25zIHtcbiAgcmV0dXJuIHtcbiAgICBibGFja2xpc3Q6IGNhbGN1bGF0ZUJsYWNrbGlzdChzZXR0aW5ncyksXG4gICAgbW9kdWxlTWFwOiBjYWxjdWxhdGVNb2R1bGVNYXAoc2V0dGluZ3MpLFxuICB9O1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgYSBtb2R1bGUgbWFwIGZyb20gdGhlIHNldHRpbmdzLlxuICovXG5mdW5jdGlvbiBjYWxjdWxhdGVNb2R1bGVNYXAoc2V0dGluZ3M6IFNldHRpbmdzKTogTW9kdWxlTWFwIHtcbiAgLy8gQ29uc3RydWN0IHRoZSBhbGlhc2VzLlxuICBjb25zdCBhbGlhc2VzID0gbmV3IE1hcChzZXR0aW5ncy5hbGlhc2VzKTtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiBkZWZhdWx0QWxpYXNlcykge1xuICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJ5O1xuICAgIGlmICghYWxpYXNlcy5oYXMoa2V5KSkge1xuICAgICAgYWxpYXNlcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29uc3RydWN0IHRoZSBidWlsdCBpbnMuXG4gIGNvbnN0IGJ1aWx0SW5zID0gbmV3IFNldChkZWZhdWx0QnVpbHRJbnMpO1xuICBmb3IgKGNvbnN0IGJ1aWx0SW4gb2Ygc2V0dGluZ3MuYnVpbHRJbnMpIHtcbiAgICBidWlsdElucy5hZGQoYnVpbHRJbik7XG4gIH1cblxuICAvLyBDb25zdHJ1Y3QgYnVpbHQgaW4gdHlwZXMuXG4gIGNvbnN0IGJ1aWx0SW5UeXBlcyA9IG5ldyBTZXQoZGVmYXVsdEJ1aWx0SW5UeXBlcyk7XG4gIGZvciAoY29uc3QgYnVpbHRJblR5cGUgb2Ygc2V0dGluZ3MuYnVpbHRJblR5cGVzKSB7XG4gICAgYnVpbHRJblR5cGVzLmFkZChidWlsdEluVHlwZSk7XG4gIH1cblxuICAvLyBBbmQgdGhlbiBjYWxjdWxhdGUgdGhlIG1vZHVsZSBtYXAuXG4gIHJldHVybiBjcmVhdGVNb2R1bGVNYXAoe1xuICAgIHBhdGhzOiBbXSxcbiAgICBwYXRoc1RvUmVsYXRpdml6ZTogW10sXG4gICAgYWxpYXNlcyxcbiAgICBhbGlhc2VzVG9SZWxhdGl2aXplOiBuZXcgTWFwKCksXG4gICAgYnVpbHRJbnMsXG4gICAgYnVpbHRJblR5cGVzLFxuICB9KTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBibGFja2xpc3QgZnJvbSB0aGUgc2V0dGluZ3MuXG4gKi9cbmZ1bmN0aW9uIGNhbGN1bGF0ZUJsYWNrbGlzdChzZXR0aW5nczogU2V0dGluZ3MpOiBTZXQ8VHJhbnNmb3JtS2V5PiB7XG4gIGNvbnN0IGJsYWNrbGlzdCA9IG5ldyBTZXQoKTtcbiAgaWYgKCFzZXR0aW5ncy5udWNsaWRlRml4SGVhZGVyKSB7XG4gICAgYmxhY2tsaXN0LmFkZCgnbnVjbGlkZS5maXhIZWFkZXInKTtcbiAgfVxuICBpZiAoIXNldHRpbmdzLnJlcXVpcmVzVHJhbnNmZXJDb21tZW50cykge1xuICAgIGJsYWNrbGlzdC5hZGQoJ3JlcXVpcmVzLnRyYW5zZmVyQ29tbWVudHMnKTtcbiAgfVxuICBpZiAoIXNldHRpbmdzLnJlcXVpcmVzUmVtb3ZlVW51c2VkUmVxdWlyZXMpIHtcbiAgICBibGFja2xpc3QuYWRkKCdyZXF1aXJlcy5yZW1vdmVVbnVzZWRSZXF1aXJlcycpO1xuICB9XG4gIGlmICghc2V0dGluZ3MucmVxdWlyZXNBZGRNaXNzaW5nUmVxdWlyZXMpIHtcbiAgICBibGFja2xpc3QuYWRkKCdyZXF1aXJlcy5hZGRNaXNzaW5nUmVxdWlyZXMnKTtcbiAgfVxuICBpZiAoIXNldHRpbmdzLnJlcXVpcmVzUmVtb3ZlVW51c2VkVHlwZXMpIHtcbiAgICBibGFja2xpc3QuYWRkKCdyZXF1aXJlcy5yZW1vdmVVbnVzZWRUeXBlcycpO1xuICB9XG4gIGlmICghc2V0dGluZ3MucmVxdWlyZXNBZGRNaXNzaW5nVHlwZXMpIHtcbiAgICBibGFja2xpc3QuYWRkKCdyZXF1aXJlcy5hZGRNaXNzaW5nVHlwZXMnKTtcbiAgfVxuICBpZiAoIXNldHRpbmdzLnJlcXVpcmVzRm9ybWF0UmVxdWlyZXMpIHtcbiAgICBibGFja2xpc3QuYWRkKCdyZXF1aXJlcy5mb3JtYXRSZXF1aXJlcycpO1xuICB9XG4gIHJldHVybiBibGFja2xpc3Q7XG59XG5cbi8vIFNvbWUgc21hbGwgaGVscGVyIGZ1bmN0aW9ucy5cblxuLyoqXG4gKiBOdWNsaWRlIGNhbid0IGhhbmRsZSBuZXN0ZWQgYXJyYXlzIHdlbGwgaW4gc2V0dGluZ3MsIHNvIHdlIHNhdmUgaXQgaW4gYVxuICogZmxhdCBhcnJheSBhbmQgZml4IHVwIGVhY2ggcGFpciBvciBlbnRyaWVzIGJlZm9yZSB1c2luZyBpdCBpbiB0aGUgdHJhbnNmb3JtXG4gKi9cbmZ1bmN0aW9uIGZpeEFsaWFzZXMoYWxpYXNlc186ID9BcnJheTxzdHJpbmc+KTogQXJyYXk8W3N0cmluZywgc3RyaW5nXT4ge1xuICBsZXQgYWxpYXNlcyA9IGFsaWFzZXNfO1xuICBhbGlhc2VzID0gYWxpYXNlcyB8fCBbXTtcbiAgY29uc3QgcGFpcnMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGlhc2VzLmxlbmd0aCAtIDE7IGkgKz0gMikge1xuICAgIHBhaXJzLnB1c2goW2FsaWFzZXNbaV0sIGFsaWFzZXNbaSArIDFdXSk7XG4gIH1cbiAgcmV0dXJuIHBhaXJzO1xufVxuIl19