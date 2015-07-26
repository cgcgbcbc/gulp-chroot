'use strict';

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
  shim(gulp, 'task', function(task) {
    return function (name, deps, fn) {
      var childRoot = path.join.apply(path, rootStack);
      if (!Array.isArray(deps)) {
        fn = deps;
        deps = [];
      }
      return task.call(this, name, deps, fnWrapper);
      function fnWrapper() {
        process.chdir(childRoot);
        if (typeof fn === 'function') {
          return fn.apply(this, arguments);
        }
      }
    };
  });
};

function shim (obj, meth, rep) {
    obj[meth] = rep(obj[meth]);
}
