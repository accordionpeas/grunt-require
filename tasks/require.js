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
				main: 'bootstrap',
				out: 'default.js',
				optimize: 'uglify',
				paths: {
					requireLib: 'node_modules/requirejs/require'
				},
				include: 'requireLib'
			});
			
		if(options.build){
			if(!options.mainConfigFile){
				var mainConfigFile = options.baseUrl === '' ? options.main : options.baseUrl + '/' + options.main;
				options.mainConfigFile = mainConfigFile + '.js';
			}
			//requirejs throws an exception if the "main" property is passed to it as an option.
			delete options.main;
			
			requirejs.optimize(options, options.done.bind(null, done));
		}
		else{
			var main = options.baseUrl + '/' + options.main,
				src = options.baseUrl + '/' + options.paths.requireLib + '.js',
				contents = 'document.write(\'<scr\'+\'ipt data-main="/' + main + '" src="/' + src + '"></scr\'+\'ipt>\');';
				
			grunt.file.write(options.out, contents, {
				encoding: 'utf8'
			});
			done();
		}
	});
};