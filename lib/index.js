/**
 * Delete files.
 * @module filedel
 * @version 3.0.0
 */

'use strict'

const filedel = require('./filedel')

let lib = filedel.bind(this)

Object.assign(lib, filedel, {
  filedel
})

module.exports = lib
