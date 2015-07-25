'use strict';

var gulp = require('gulp');
var chroot = require('./index');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
chroot(gulp);

before(function(done) {
  fs.mkdir('child', done);
});
after(function(done) {
  fs.rmdir('child', done);
});

it('should chroot and restore', function() {
  gulp.chroot('child', function(){
    gulp.task('test', function() {
      console.log('inside test task');
      console.log(process.cwd());
      assert.equal(process.cwd(), path.join(__dirname, 'child'));
    });
  });
  gulp.task('restore', function() {
      console.log('inside test task');
      console.log(process.cwd());
      assert.equal(process.cwd(), path.join(__dirname));
  });
  gulp.start('test');
  gulp.start('restore');
});

