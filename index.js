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
  shim(gulp, 'task', function(task) {
    return function (name, deps, fn) {
      var childRoot = path.join.apply(path, rootStack);
      var parentRoot = path.join.apply(path, rootStack.slice(0, rootStack.length - 1))
      if (!Array.isArray(deps)) {
        fn = deps;
        deps = [];
      }
      return task.call(this, name, deps, fnWrapper);
      function fnWrapper() {
        console.log(childRoot);
        console.log(parentRoot);
        process.chdir(childRoot);
        if (typeof fn === 'function') {
          fn.apply(this, arguments);
        }
        process.chdir(parentRoot);
      }
    };
  });
};

function shim (obj, meth, rep) {
    obj[meth] = rep(obj[meth]);
}
