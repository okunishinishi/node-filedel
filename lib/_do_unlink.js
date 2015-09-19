/**
 * @function _doUnlink
 * @private
 */
"use strict";

var fs = require('fs'),
    async = require('async');

/** @lends _doUnlink */
function _doUnlink(filename, force, callback) {
    async.series([
        function chmodIfNeeded(callback) {
            if (force) {
                fs.chmod(filename, '666', function (err) {
                    callback(err);
                });
            } else {
                callback(null);
            }
        },
        function doUnlink(callback) {
            fs.unlink(filename, callback);
        }
    ], function (err) {
        callback(err);
    });
}

module.exports = _doUnlink;
