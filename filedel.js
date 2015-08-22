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
    expandglob = require('expandglob');

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


module.exports = filedel;








