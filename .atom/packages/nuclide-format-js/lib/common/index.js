/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 */

module.exports = Object.defineProperties({

  createModuleMap: function createModuleMap(options) {
    var ModuleMapClass = require('./state/ModuleMap');
    return new ModuleMapClass(options);
  }

}, {
  transform: {
    get: function get() {
      return require('./transform');
    },
    configurable: true,
    enumerable: true
  },
  defaultBuiltIns: { // Some easy to use defaults to construct ModuleMapOptions with.

    get: function get() {
      return require('./constants/builtIns');
    },
    configurable: true,
    enumerable: true
  },
  defaultBuiltInTypes: {
    get: function get() {
      return require('./constants/builtInTypes');
    },
    configurable: true,
    enumerable: true
  },
  defaultAliases: {
    get: function get() {
      return require('./constants/commonAliases');
    },
    configurable: true,
    enumerable: true
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQWFBLE1BQU0sQ0FBQyxPQUFPLDJCQUFHOztBQUtmLGlCQUFlLEVBQUEseUJBQUMsT0FBeUIsRUFBYTtBQUNwRCxRQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNwRCxXQUFPLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQ3BDOztDQVlGO0FBbkJLLFdBQVM7U0FBQSxlQUFHO0FBQ2QsYUFBTyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDL0I7Ozs7QUFRRyxpQkFBZTs7U0FBQSxlQUFHO0FBQ3BCLGFBQU8sT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDeEM7Ozs7QUFDRyxxQkFBbUI7U0FBQSxlQUFHO0FBQ3hCLGFBQU8sT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDNUM7Ozs7QUFDRyxnQkFBYztTQUFBLGVBQUc7QUFDbkIsYUFBTyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztLQUM3Qzs7OztFQUNGLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgdHlwZSBNb2R1bGVNYXAgZnJvbSAnLi9zdGF0ZS9Nb2R1bGVNYXAnO1xuaW1wb3J0IHR5cGUge01vZHVsZU1hcE9wdGlvbnN9IGZyb20gJy4vb3B0aW9ucy9Nb2R1bGVNYXBPcHRpb25zJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldCB0cmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJy4vdHJhbnNmb3JtJyk7XG4gIH0sXG5cbiAgY3JlYXRlTW9kdWxlTWFwKG9wdGlvbnM6IE1vZHVsZU1hcE9wdGlvbnMpOiBNb2R1bGVNYXAge1xuICAgIGNvbnN0IE1vZHVsZU1hcENsYXNzID0gcmVxdWlyZSgnLi9zdGF0ZS9Nb2R1bGVNYXAnKTtcbiAgICByZXR1cm4gbmV3IE1vZHVsZU1hcENsYXNzKG9wdGlvbnMpO1xuICB9LFxuXG4gIC8vIFNvbWUgZWFzeSB0byB1c2UgZGVmYXVsdHMgdG8gY29uc3RydWN0IE1vZHVsZU1hcE9wdGlvbnMgd2l0aC5cbiAgZ2V0IGRlZmF1bHRCdWlsdElucygpIHtcbiAgICByZXR1cm4gcmVxdWlyZSgnLi9jb25zdGFudHMvYnVpbHRJbnMnKTtcbiAgfSxcbiAgZ2V0IGRlZmF1bHRCdWlsdEluVHlwZXMoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJy4vY29uc3RhbnRzL2J1aWx0SW5UeXBlcycpO1xuICB9LFxuICBnZXQgZGVmYXVsdEFsaWFzZXMoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJy4vY29uc3RhbnRzL2NvbW1vbkFsaWFzZXMnKTtcbiAgfSxcbn07XG4iXX0=