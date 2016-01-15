var requireDir = require('require-dir');
var handleErrors = require('./client/scripts/gulp/util/handleErrors');

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    handleErrors(err);
    process.exit(1);
});

// Require all tasks in gulp/tasks, including subfolders
requireDir('client/scripts/gulp/tasks', { recurse: true });