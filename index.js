'use strict';
require('harmony-reflect');
var path = require('path');
var rootStack;

module.exports = function (gulp) {
  if (gulp.chroot) {
    throw new Error('gulp.chroot already exists');
  }
  rootStack = [process.cwd()];
  gulp.chroot = function(root, cb) {
    rootStack.push(root);
    cb();
    rootStack.pop(root);
  };
  gulp.restore = function() {
    process.chdir(rootStack[0]);
  };
  gulp.task = new Proxy(gulp.task, {
    apply: function(target, thisArg, argumentLists) {
      var childRoot = path.join.apply(path, rootStack);
      if (argumentLists.length === 3 || (argumentLists.length === 2 && typeof argumentLists[1] === 'function')) {
        var fn = argumentLists[argumentLists.length - 1];
        argumentLists[argumentLists.length - 1] = wrapper(fn);
      }
      return target.apply(thisArg, argumentLists);
      function wrapper(fn) {
        return function() {
          process.chdir(childRoot);
          return fn.apply(null, arguments);
        };
      }
    }
  });
};
