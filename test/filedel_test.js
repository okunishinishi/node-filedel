/**
 * Test case for filedel.
 * Runs with nodeunit.
 */

var filedel = require('../lib/filedel.js'),
    path = require('path'),
    fs = require('fs'),
    mkdirp = require('mkdirp');

var tmpDir = path.resolve(__dirname, '../tmp');

exports.setUp = function (done) {
    mkdirp.sync(tmpDir);
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['Unlink a file.'] = function (test) {
    var filename = path.resolve(tmpDir, 'work_file_to_unlink.txt');
    fs.writeFileSync(filename, 'foo');
    filedel(filename, {
        force: true
    }, function (err) {
        test.ifError(err);
        filedel(filename, function (err) {
            test.ifError(err);
            test.done();
        });
    });
};

exports['Try to delete dir.'] = function (test) {
    var dirname = path.resolve(tmpDir, 'work_dir_to_unlink');
    mkdirp(dirname);
    filedel(dirname, function (err) {
        test.ok(!!err, 'Failed to unlink dir.');
        test.done();
    });
};