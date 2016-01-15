var gulp = require('gulp');
var mustache = require('gulp-mustache');
var config = require('./../config').mustache;

gulp.task('mustache', function () {
  return gulp.src(config.src)
    .pipe(mustache())
    .pipe(gulp.dest(config.dest));
});