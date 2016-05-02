/**
 * Delete files.
 * @module filedel
 * @version 2.0.0
 */

'use strict'

const filedel = require('./filedel')
const pkg = require('../package.json')

let lib = filedel.bind(this)

lib.filedel = filedel
lib.version = pkg.version

module.exports = lib
