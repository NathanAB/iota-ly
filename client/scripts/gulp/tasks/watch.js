var gulp     = require('gulp');
var config   = require('../config');

/**
 * Watch Task
 */
gulp.task('watch', ['build', 'livereload'], function()
{

  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.sass.partialsrc,  ['sass']);
  gulp.watch('client/templates/**/*', ['mustache']);
  gulp.watch('client/lib/**/*.js', ['webpack']);

});

gulp.task('watch-debug', ['build-debug', 'livereload'], function()
{

  gulp.watch(config.sass.src,   ['sass']);
  gulp.watch(config.sass.partialsrc,  ['sass']);
  gulp.watch('client/templates/**/*', ['mustache']);
  gulp.watch('client/lib/**/*.js', ['webpack-debug']);

});
