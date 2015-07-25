# gulp-chroot [![Build Status](https://travis-ci.org/cgcgbcbc/gulp-chroot.svg?branch=master)](https://travis-ci.org/cgcgbcbc/gulp-chroot)

## Install

```
$ npm install --save-dev gulp-chroot
```


## Usage

```js
var gulp = require('gulp');
var chroot = require('gulp-chroot');
chroot(gulp);

gulp.chroot('child', function() {
  gulp.task('a', function() {
    // process.cwd() == __dirname + '/child'
  });
});

gulp.task('b', function() {
  // process.cwd() == __dirname
})

```

## Limit

not work with promise.

MIT © [cgcgbcbc](https://github.com/cgcgbcbc/gulp-chroot)

