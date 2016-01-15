var gulp = require('gulp');
var livereload = require('gulp-livereload');

/**
 * Live Reload Task
 */
gulp.task('livereload', function() {
  livereload.listen();
});
