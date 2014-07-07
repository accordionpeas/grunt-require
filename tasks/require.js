/*
 * grunt-require
 * https://github.com/accordionpeas/grunt-require
 *
 */

module.exports = function(grunt) {

	'use strict';
	
	var requirejs = require('requirejs'),
		_ = require('underscore');

	function buildOptimised(options, done){
		if(!options.paths){
			options.paths = {};
		}

		var mainConfigFile = [];

		for(var i=0; i<options.config.length; i++){
			mainConfigFile.push(options.baseUrl + '/' + options.config[i]);
		}

		if(!options.mainConfigFile){
			options.mainConfigFile = mainConfigFile;
		}
		
		var requireLib = options.includeAlmond ? options.almond : options.require;
		
		options.paths = _.extend({
			requireLib: requireLib
		}, options.paths);
		
		requirejs.optimize(options, options.done.bind(null, done));
	}

	function buildUnOptimised(options, done){
		var webroot = options.webroot !== null ? options.webroot : options.baseUrl,
			src = '/' + webroot + '/' + options.require + '.js';

		var mainConfigFile = '[';

		for(var i=0; i<options.config.length; i++){
			mainConfigFile += '"/' + webroot + '/' + options.config[i] + '",';
		}

		mainConfigFile = mainConfigFile.replace(/,$/, '');
		mainConfigFile += ']';
			
		var contents = 
			'(function(){' +
				'var loaded = false;' +
				'var el = document.createElement( "script" );' +
				'el.src = "' + src + '";' +
				'el.onload = el.onreadystatechange = function(){' +
					'if(!loaded && (!this.readyState || ' +
						'this.readyState === "loaded" || this.readyState === "complete")){' +
							'loaded = true;' +
							'require(' + mainConfigFile + ', function(){' +
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
	
	grunt.registerMultiTask('requirejs', 'Easy switching between built and un-built versions of require.js based applications with grunt', function() {
		var done = this.async(),
			options = this.options({
			
				baseUrl: '',
				require: 'require',
				almond: 'almond',
				webroot: null,
				name: 'bootstrap',
				config: ['config.js'],
				out: 'default.js',
				include: ['requireLib'],
				
				build: true,
				includeAlmond: true,
				optimize: 'uglify',
				
				done: function(done, response){
					done();
				}
			}),
			cmdOpts = {};

		if(!options.insertRequire){
			options.insertRequire = [];
		}

		options.insertRequire.push(options.name);

		//mixin command line options
		for(var i in options){
			var cmdOpt = grunt.option(i);
			if(typeof cmdOpt !== 'undefined'){
				options[i] = cmdOpt;
			}
		}

		if(!Array.isArray(options.config)){
			options.config = [options.config];
		}
			
		if(options.build){
			buildOptimised(options, done);
		}
		else{
			buildUnOptimised(options, done);
		}
	});
};