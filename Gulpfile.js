const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const istanbul = require('gulp-babel-istanbul');
const mocha = require('gulp-mocha');
const path = require('path');
const sequence = require('gulp-sequence');

// babel all the things
require('babel-core/register');

const srcJsFiles = ['src/**/*.js'];
const testJsFiles = ['test/**/*.test.js'];
const testHelperJsFiles = ['test/test-helper.js'];
const allJsFiles = ['*.js'].concat(srcJsFiles, testJsFiles, testHelperJsFiles);

function lint() {
  return gulp
    .src(allJsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function test() {
  return gulp
    .src(testJsFiles, { read: false })
    .pipe(mocha({
      require: testHelperJsFiles.map((file) => path.resolve(__dirname, file))
    }));
}

function coverageInstrument() {
  return gulp
    .src(srcJsFiles)
    .pipe(istanbul({
      // includeUntested: true,
      preserveComments: true
    }))
    .pipe(istanbul.hookRequire());
}

function coverageReport() {
  del.sync(['coverage']);

  return gulp
    .src(srcJsFiles, { read: false })
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: ['text', 'text-summary', 'html']
    }))
    .pipe(istanbul.enforceThresholds({
      thresholds: {
        global: 90,
        each: -10
      }
    }));
}

function testCoverage(done) {
  sequence('coverage:instrument', 'test', 'coverage:report', done);
}

function watch() {
  return gulp.watch(allJsFiles, ['lint', 'test:coverage']);
}

gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('coverage:instrument', coverageInstrument);
gulp.task('coverage:report', coverageReport);
gulp.task('test:coverage', testCoverage);
gulp.task('watch', watch);
