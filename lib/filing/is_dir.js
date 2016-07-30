/**
 * @function isDir
 * @returns {Promise}
 */

'use strict'

const fs = require('fs')
const co = require('co')

/** @lends isDir */
function isDir (filename) {
  return co(function * () {
    let exists = yield new Promise((resolve, reject) =>
      fs.exists(filename, (exists) => resolve(exists))
    )
    if (!exists) {
      return
    }
    try {
      let stats = yield new Promise((resolve, reject) =>
        fs.stat(filename, (err, stats) => err ? reject(err) : resolve(stats))
      )
      return stats.isDirectory()
    } catch (e) {
      // Ignore error.
    }
  })
}

module.exports = isDir
