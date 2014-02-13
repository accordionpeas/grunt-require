/*
 * grunt-require
 * https://github.com/accordionpeas/grunt-require
 *
 */

module.exports = function(grunt) {

	'use strict';
	
	var requirejs = require('requirejs'),
		_ = require('underscore');
	
	grunt.registerMultiTask('requirejs', 'Easy switching between built and un-built versions of require.js based applications with grunt', function() {
		var done = this.async(),
			name = 'bootstrap',
			options = this.options({
			
				baseUrl: '',
				require: 'require',
				almond: 'almond',
				webroot: null,
				name: name,
				config: 'config.js',
				out: 'default.js',
				include: ['requireLib'],
				insertRequire: [name],
				
				build: true,
				includeAlmond: true,
				optimize: 'uglify',
				
				done: function(done, response){
					done();
				}
			});
			
		if(options.build){
			if(!options.paths){
				options.paths = {};
			}

			if(!options.mainConfigFile){
				options.mainConfigFile = options.baseUrl + '/' + options.config;
			}
			
			var requireLib = options.includeAlmond ? options.almond : options.require;
			
			options.paths = _.extend({
				requireLib: requireLib
			}, options.paths);
			
			requirejs.optimize(options, options.done.bind(null, done));
		}
		else{
			var webroot = options.webroot !== null ? options.webroot : options.baseUrl,
				src = '/' + webroot + '/' + options.require + '.js',
				contents = 
					'(function(){' +
						'var loaded = false;' +
						'var el = document.createElement( "script" );' +
						'el.src = "' + src + '";' +
						'el.onload = el.onreadystatechange = function(){' +
							'if(!loaded && (!this.readyState || ' +
								'this.readyState === "loaded" || this.readyState === "complete")){' +
									'loaded = true;' +
									'require(["' + webroot + '/' + options.config + '"], function(){' +
										'require(["' + options.name + '"], function(){});' +
									'});' +
									'el.onload = el.onreadystatechange = null;' +
									'document.body.removeChild(el);' +
								'}' +
						'};' +
						'document.body.appendChild(el);' +
					'})()';

			grunt.file.write(options.out, contents, {
				encoding: 'utf8'
			});
			done();
		}
	});
};