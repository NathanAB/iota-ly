var gulp         = require('gulp');
var livereload   = require('gulp-livereload');
var sass         = require('gulp-sass');
var minify       = require('gulp-minify-css');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;
var rename       = require('gulp-rename');

/**
 * SAAS Task
 */
gulp.task('sass', function ()
{
    return gulp.src(config.src)
        .pipe(sourcemaps.init(config.sourcemaps))
        .pipe(sass(
            config.settings
        ))
        .pipe(rename('style.css'))
        .on('error', handleErrors)
        .pipe(minify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest))
        .pipe(livereload())
});
