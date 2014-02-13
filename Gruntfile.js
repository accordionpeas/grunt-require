/*
 * grunt-require
 * https://github.com/accordionpeas/grunt-require
 *
 */
 
module.exports = function(grunt) {

	'use strict';
	
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			}
		},
		
		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},
		
		// Configuration to be run (and then tested).
		requirejs: {
			options: {
				baseUrl: 'test/fixtures'
			},
			
			dev: {
				options: {
					out: 'tmp/dev_default.js',
					build: false
				}
			},
			
			prodAlmond: {
				options: {
					out: 'tmp/prod_almond_default.js'
				}
			},
		
			prodRequire: {
				options: {
					out: 'tmp/prod_require_default.js',
					includeAlmond: false
				}
			}
		},
		
		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		}
	});
	
	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');
	
	// These plugins provide necessary tasks.
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	
	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'requirejs', 'nodeunit']);
	
	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);
};
