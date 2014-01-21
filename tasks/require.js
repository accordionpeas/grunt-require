/*
 * grunt-require
 * https://github.com/accordionpeas/grunt-require
 *
 */

module.exports = function(grunt) {

	'use strict';
	
	var requirejs = require('requirejs');
	
	grunt.registerMultiTask('requirejs', 'Easy switching between built and un-built versions of require.js based applications with grunt', function() {
		var done = this.async(),
			options = this.options({
				done: function(done, response){
					done();
				},
				build: true,
				baseUrl: '',
				webroot: null,
				name: 'bootstrap',
				out: 'default.js',
				optimize: 'uglify',
				paths: {
					requireLib: 'node_modules/requirejs/require'
				},
				include: 'requireLib'
			});
			
		if(options.build){
			if(!options.mainConfigFile){
				var mainConfigFile = options.baseUrl === '' ? options.name : options.baseUrl + '/' + options.name;
				options.mainConfigFile = mainConfigFile + '.js';
			}
			
			requirejs.optimize(options, options.done.bind(null, done));
		}
		else{
			var webroot = options.webroot !== null ? options.webroot : options.baseUrl; 

			var main = webroot + '/' + options.name,
				src = webroot + '/' + options.paths.requireLib + '.js',
				contents = 'document.write(\'<scr\'+\'ipt data-main="/' + main + '" src="/' + src + '"></scr\'+\'ipt>\');';
				
			grunt.file.write(options.out, contents, {
				encoding: 'utf8'
			});
			done();
		}
	});
};