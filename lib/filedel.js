/**
 * Delete file.
 * @function filedel
 * @param {string} filename - Filename to delete.
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.force=false] - Unlink even if readonly.
 * @returns {Promise}
 */

'use strict'

const co = require('co')
const fs = require('fs')
const argx = require('argx')
const expandglob = require('expandglob')
const doUnlink = require('./filing/do_unlink')
const isDir = require('./filing/is_dir')

/** @lends filedel */
function filedel (target, options) {
  var args = argx(arguments)
  if (args.pop('function')) {
    throw new Error('[filedel] Callback is no more supported. Use promise interface instead.')
  }
  options = args.pop('object') || {}

  return co(function * () {
    let filenames = yield expandglob(target)
    for (let filename of filenames) {
      let exists = yield new Promise((resolve) =>
        fs.exists(filename, (exists) => resolve(exists))
      )
      if (!exists) {
        return
      }
      let isDir_ = yield isDir(filename)
      if (isDir_) {
        throw new Error('Can not unlink directory:' + filename)
      }
      yield doUnlink(filename, !!options.force)
    }
  })
}

module.exports = filedel
