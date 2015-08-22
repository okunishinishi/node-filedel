filedel
==========

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![Code Climate][bd_codeclimate_shield_url]][bd_codeclimate_url]
[![Code Coverage][bd_codeclimate_coverage_shield_url]][bd_codeclimate_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]

[bd_repo_url]: https://github.com/okunishinishi/node-filedel
[bd_travis_url]: http://travis-ci.org/okunishinishi/node-filedel
[bd_travis_shield_url]: http://img.shields.io/travis/okunishinishi/node-filedel.svg?style=flat
[bd_license_url]: https://github.com/okunishinishi/node-filedel/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/okunishinishi/node-filedel
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/okunishinishi/node-filedel.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/okunishinishi/node-filedel.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/okunishinishi/node-filedel
[bd_gemnasium_shield_url]: https://gemnasium.com/okunishinishi/node-filedel.svg
[bd_npm_url]: http://www.npmjs.org/package/filedel
[bd_npm_shield_url]: http://img.shields.io/npm/v/filedel.svg?style=flat

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Delete files.

<!-- Description End -->



<!-- Sections Start -->
<a name="sections"></a>

Installation
-----

```bash
npm install filedel --save
```

Usage
----

```javascript
var filedel = require('filedel');

// Generate a file.
filedel("/src/*.tmp", {
    force: true
}, function (err) {
    /*...*/
});
```
Options
-----

| Name | Default | Description |
| --- | --- | --- |
| `force` | false | Unlink even if readonly. |

<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/okunishinishi/node-filedel/blob/master/LICENSE).

<!-- LICENSE End -->


