/**
 * Delete files.
 * @module filedel
 * @version 1.0.1
 */

'use strict'

var filedel = require('./filedel'),
    pkg = require('../package.json')

var lib = filedel.bind(this)

lib.filedel = filedel;
lib.version = pkg;

module.exports = lib;
