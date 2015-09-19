/**
 * Delete file.
 * @function filedel
 * @param {string} filename - Filename to delete.
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.force=false] - Unlink even if readonly.
 * @param {function} [callback] - Callback when done.
 */

"use strict";

var async = require('async'),
    fs = require('fs'),
    argx = require('argx'),
    expandglob = require('expandglob'),
    _doUnlink = require('./_do_unlink'),
    _isDir = require('./_is_dir');

/** @lends filedel */
function filedel(filename, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};

    async.waterfall([
        function (callback) {
            expandglob(filename, callback);
        },
        function (filename, callback) {
            async.eachSeries(filename, function (filename, callback) {
                fs.exists(filename, function (exists) {
                    if (!exists) {
                        callback(null);
                        return;
                    }
                    _isDir(filename, function (isDir) {
                        if (isDir) {
                            callback(new Error('Can not unlink directory:' + filename));
                            return;
                        }
                        _doUnlink(filename, !!options.force, callback);
                    });
                });
            }, callback);
        }
    ], callback);

}

module.exports = filedel;

