# gulp-chroot [![Build Status](https://travis-ci.org/cgcgbcbc/gulp-chroot.svg?branch=master)](https://travis-ci.org/cgcgbcbc/gulp-chroot)

> My riveting gulp plugin


## Install

```
$ npm install --save-dev gulp-chroot
```


## Usage

```js
var gulp = require('gulp');
var chroot = require('gulp-chroot');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(chroot())
		.pipe(gulp.dest('dist'));
});
```


## API

### chroot(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [cgcgbcbc](https://github.com/cgcgbcbc/gulp-chroot)
