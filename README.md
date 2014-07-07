# grunt-require

> Easy switching between built and un-built versions of require.js based applications with grunt

Achieve easy switching between development and production-ready code without changing any script references within your HTML. Built and un-built application code is written into the same file so switching between them is super easy. The typical process for using this task is as follows:

- run grunt requirejs:dev
- default.js now contains references to requireJS and your main config file as well as an automatic require block for your "main" script - the entry point into your application.
- work on your app code
- run grunt requirejs:prod
- default.js now contains a compressed and compiled version of your app code.
- reload browser to see your optimised code running

By default the plugin will swap requireJS for almond as the AMD loader for the built code. Almond is a light-weight version of requireJS and is, therefore, preferable for production code. However, it does not have all the capabilities of requireJS and this should be taken into account. [Read more about almond](https://github.com/jrburke/almond).

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-require --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-require');
```

## The "requirejs" task

### Overview
In your project's Gruntfile, add a section named `requirejs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  requirejs: {
    options: {
        baseUrl: 'app/webroot/script',
        webroot: 'script',
        config: ['config.js'],
        name: 'main',
		require: 'libs/require',
		almond: 'libs/almond',
        out: 'app/webroot/script/default.js'
    },
    dev: {
		options: {
			build: false
		}
    },
    prod: {
		options: {
			build: true
		}
    }
  },
});
```

### Options
The list of possible options is the same as requireJS's optimizer options, [see the r.js example build file](https://github.com/jrburke/r.js/blob/master/build/example.build.js), with a few extras (described below).

#### options.baseUrl
Type: `String`
Default value: `' '`

Base url used for writing / loading scripts. You will typically need to overwrite this option with the path to your script files.

#### options.require
Type: `String`
Default value: `'require'`

Path to the requireJS library relative to the baseURL option.

#### options.almond
Type: `String`
Default value: `'almond'`

Path to the almond library relative to the baseURL option.

#### options.webroot
Type: `String`
Default value: `null`

Base reference for script files. If not passed in then the value of the 'baseUrl' option will be used to generate script references.

#### options.name
Type: `String`
Default value: `'bootstrap'`

Name of the script that acts as the entry point into your application, relative to the baseURL option. This file will be automatically required in both the built and un-built scripts.

#### options.config
Type: `String`
Default value: `['config.js']`

Array of scripts that contains the main config for your application, relative to the webroot option. The paths are concatenated with the baseUrl option to generate the mainConfigFile option that is passed into the requireJS optimizer, if it is not passed in as an option.

#### options.out
Type: `String`
Default value: `'default.js'`

Path to file that built and un-built require app code is written to. You will typically need to overwrite this option with the path that you want your output to be written to.

#### options.include
Type: `Array`
Default value: `['requireLib']`

Includes the reserved 'requireLib' module, which will point to either requireJS or almond.

#### options.insertRequire
Type: `Array`
Default value: `['bootstrap']`

Insert a `require(['bootstrap']);` at the end of the build code to kick off the application code.

#### options.build
Type: `Boolean`
Default value: `true`

Whether to optimize the application or not. If left as `true` all the application code (including requireJS will be compressed and compiled into the file specified in the 'out' option. If set to false. A reference to requireJS and the bootstrap file will be written into the file specified in the 'out' option.

#### options.includeAlmond
Type: `Boolean`
Default value: `true`

Whether to include almond as the AMD library in the built code. If set to `false` requireJS will be included instead.

#### options.optimize
Type: `String`
Default value: `'uglify'`

Optimization method used by requireJS. Detailed here to show default value.

#### options.done
Type: `Function`
Default value: `function(done, response){done();}`

Function that is invoked when requireJS has finished optimizing.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-07-07    v1.1.2  Fixed bug with "main" with config option not converted to an array if passed via command line.
* 2014-05-21    v1.1.1  Fixed bug with "main" option not configurable. Update to "config" option which can now be passed in as an array.
* 2014-03-11    v1.1.0  All options can now be passed in via the command line.
* 2014-02-13    v1.0.5  Root-referenced initial request for config file.
* 2014-02-13    v1.0.4  Added missing file extensions to default options.
* 2014-02-13    v1.0.3  Fixed broken path to main config file for optimised code.
* 2014-02-13    v1.0.2  Fixed face condition between config and bootstrap loading.
* 2014-02-10    v1.0.1  Fixed bug with almond and mainConfigFile needed in separate file.
* 2014-02-09	v1.0.0	Built script uses Almond as default AMD library.
* 2014-01-10	v0.1.1	Fixed bug where main config file wasn't included in optimised script.
* 2014-01-10	v0.1.0	Changed requireJS dependency to 2.1.x.
* 2013-12-09	v0.0.5	Updated docs.
* 2013-12-09	v0.0.4	Added 'webroot' option.
* 2013-12-08	v0.0.3	Updated docs.
* 2013-12-07	v0.0.2	Updated docs.
* 2013-12-07	v0.0.1	Initial release.