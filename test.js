'use strict';

var gulp = require('gulp');
var chroot = require('./index');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
chroot(gulp);

before(function(done) {
  fs.mkdir(path.join(__dirname,'child'), function(err) {
    if (err) done(err);
    fs.writeFile(path.join(__dirname, 'child', 'test.txt'), 'test', done);
  });
});
after(function(done) {
  fs.unlink(path.join(__dirname, 'child', 'test.txt'), function(err) {
    if (err) done(err);
    fs.rmdir(path.join(__dirname,'child'), done);
  });
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
      console.log('inside restore task');
      console.log(process.cwd());
      assert.equal(process.cwd(), path.join(__dirname));
  });
  gulp.start('test');
  gulp.start('restore');
});

it('should work with dep only', function() {
  gulp.chroot('child', function() {
    gulp.task('dep', function() {
      console.log('inside dep task');
      console.log(process.cwd());
      assert.equal(process.cwd(), path.join(__dirname, 'child'));
    });
    gulp.task('testDep', ['dep']);
  });
  gulp.start('testDep');
});

it('should work with promise', function() {
});
