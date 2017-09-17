/**
 * Test case for filedel.
 * Runs with mocha.
 */
'use strict'

const filedel = require('../lib/filedel.js')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const assert = require('assert')

let tmpDir = path.resolve(__dirname, '../tmp')

describe('filedel', () => {
  before(() => {
    mkdirp.sync(tmpDir)
  })

  after(() => {

  })

  it('Unlink a file.', async () => {
    let filename = path.resolve(tmpDir, 'work_file_to_unlink.txt')
    fs.writeFileSync(filename, 'foo')
    assert.ok(fs.existsSync(filename))
    await filedel(filename, {
      force: true
    })
    assert.ok(!fs.existsSync(filename))
    await filedel(filename)
    assert.ok(!fs.existsSync(filename))
  })

  it('Unlink dir', async () => {
    let dirname = `${tmpDir}/hoge/un-linking-dir`
    mkdirp.sync(dirname)
    await filedel.recursive(dirname)
  })

  it('Try to delete dir.', async () => {
    let dirname = path.resolve(tmpDir, 'work_dir_to_unlink')
    mkdirp.sync(dirname)
    try {
      await filedel(dirname)
    } catch (err) {
      assert.ok(!!err)
    }
  })
})

/* global describe, before, after, it */
