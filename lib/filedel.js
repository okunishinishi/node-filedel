/**
 * Delete file.
 * @function filedel
 * @param {string} filename - Filename to delete.
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.force=false] - Unlink even if readonly.
 * @returns {Promise}
 */

'use strict'

const rimraf = require('rimraf')
const {existsAsync} = require('asfs')
const argx = require('argx')
const aglob = require('aglob')
const doUnlink = require('./filing/do_unlink')
const isDir = require('./filing/is_dir')

/** @lends filedel */
async function filedel (patterns, options = {}) {
  const args = argx(arguments)
  if (args.pop('function')) {
    throw new Error('[filedel] Callback is no more supported. Use promise interface instead.')
  }
  const {cwd = process.cwd(), dir=false} = options
  options = args.pop('object') || {}

  const filenames = await aglob(patterns, {cwd})
  const result = []
  for (const filename of filenames) {
    const exists = await existsAsync(filename)
    if (!exists) {
      return
    }
    const isDir_ = await isDir(filename)
    if (isDir_) {
      if(dir){
        await filedel.dir(filename)
      } else {
        throw new Error(`[filedel] Can not unlink directory: ${filename} ( use {dir:true)} option to force it )`)
      }
    } else {
      await doUnlink(filename, Boolean(options.force))
    }
    result.push(filename)
  }
  return result
}

filedel.dir = async (dirname) => {
  const exists = await existsAsync(dirname)
  if (!exists) {
    return
  }
  const isDir_ = await isDir(dirname)
  if (!isDir_) {
    throw new Error(`[filedel] Not a directory: ${dirname}`)
  }
  await new Promise((resolve, reject) =>
    rimraf(dirname, (err) => err ? reject(err) : resolve())
  )
}
filedel.recursive = async (...args) => {
  console.warn(`[filedel] \`filedel.recursive()\` is now deprecated. use \`filedel.dir()\` instead`)
  return filedel.dir(...args)
}

module.exports = filedel
