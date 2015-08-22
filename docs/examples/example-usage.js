var filedel = require('filedel');

// Generate a file.
filedel("/src/*.tmp", {
    force: true
}, function (err) {
    /*...*/
});