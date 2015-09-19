/**
 * @function _isDir
 * @private
 */

"use strict";

var fs = require('fs');

/** @lends _isDir */
function _isDir(filename, callback) {
    fs.exists(filename, function (exists) {
        if (!exists) {
            callback(false);
            return;
        }
        fs.stat(filename, function (err, stats) {
            //Ignore error.
            var isDir = !err && (stats.isDirectory());
            callback(isDir);
        });
    });
}

module.exports = _isDir;
