var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', ['unit']);

gulp.task('unit', function () {
  return gulp.src('./tests/**/*.js', {read: false})
    .pipe(mocha({
      ui: 'tdd',
      reporter: 'list',
      timeout: 15000
    }));
});