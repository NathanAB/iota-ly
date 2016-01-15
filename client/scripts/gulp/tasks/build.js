var gulp = require('gulp');

/**
 * Build Task
 */
gulp.task('build', ['eslint', 'webpack', 'sass', 'mustache']);

gulp.task('build-debug', ['eslint', 'webpack-debug', 'sass', 'mustache']);