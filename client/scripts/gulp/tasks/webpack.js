var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var handleErrors = require('../util/handleErrors');
var config = require('../config').webpack;

/**
 * Webpack Task
 */
gulp.task('webpack', [], function() {

    return gulp.src(config.src)
        .pipe(webpack(config.options))
        .on('error', handleErrors)
        .pipe(uglify())
        .pipe(gulp.dest(config.dest));

});

gulp.task('webpack-debug', [], function() {

    return gulp.src(config.src)
        .pipe(webpack(config.options))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dest));

});