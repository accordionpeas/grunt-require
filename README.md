# grunt-require

> Easy switching between built and un-built versions of require.js based applications with grunt

Achieve easy switching between development and production-ready code without changing and script references within your HTML. Built and un-built application code is written into the same file (not at the same time) so switching between them is super easy. The typical process for using this task is as follows:

- run gruntjs:dev
- default.js now contains a document.write references to requireJS and your main config file
- work on your app code
- run gruntjs:prod
- default.js now contains a compressed and compiled version of your app code.
- reload browser to see your optimised code running

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
        baseUrl: 'script',
        paths: {
            requireLib: 'libs/vendors/require'
        },
        out: 'script/default.js',
        main: 'bootstrap'
    },
    dev: {
        build: false
    },
    prod: {
        build: true
    }
  },
});
```

### Options
The list of possible options is the same as requireJS's optimizer options, [see the r.js example build file](https://github.com/jrburke/r.js/blob/master/build/example.build.js), with a few extras (described below).

#### options.baseUrl
Type: `String`
Default value: `' '`

Base url used for writing / loading scripts. You will typically need to overwrite this option with the path to your script files

#### options.out
Type: `String`
Default value: `'default.js'`

Path to file that build and un-built require app code is written to. You will typically need to overwrite this option with the path that you want your output to be written to.

#### options.paths.requireLib
Type: `String`
Default value: `'node_modules/requirejs/require'`

Path to requireJS library. You will typically need to overwrite this option with the path to your local copy of requireJS.

#### options.include
Type: `String`
Default value: `'requireLib'`

Include options for requireJS. Detailed here to show default value.

#### options.optimize
Type: `String`
Default value: `'uglify'`

Optimization method used by requireJS. Detailed here to show default value.

#### options.main
Type: `String`
Default value: `'bootstrap'`

Path to main application JS file. This option should be set to the same value as you would typically set for the mainConfigFile except without the baseUrl or file extension parts.

#### options.build
Type: `Boolean`
Default value: `true`

Whether to optimize the application or not. If set to true all the application code (including requireJS will be compressed and compiled into the file specified in the 'out' option. If set to false. A reference to requireJS and the bootstrap file will be written into the file specified in the 'out' option.

#### options.done
Type: `Function`
Default value: `function(done, response){done();}`

Function that is invoked when requireJS has finished optimizing.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013-12-07   v0.0.1   Initial release.
