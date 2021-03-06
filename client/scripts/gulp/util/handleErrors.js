var notify = require('gulp-notify');

module.exports = function(err) {

    var args = Array.prototype.slice.call(arguments);

    if(typeof err !== 'undefined'){
        var error = err;
    }

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};