'use strict';

var grunt = require('grunt');

exports.requirejs = {
	setUp: function(done) {
		// setup here if necessary
		done();
	},
	dev: function(test) {
		test.expect(1);
		
		var actual = grunt.file.read('tmp/dev_default.js'),
			expected = grunt.file.read('test/expected/dev_out');
			
		test.equal(actual, expected, 'should write the reference to the un-built requirejs application to tmp/dev_default.js');
		test.done();
	},
	prod_almond: function(test) {
		test.expect(1);
		
		var actual = grunt.file.read('tmp/prod_almond_default.js'),
			expected = grunt.file.read('test/expected/prod_almond_out');
			
		test.equal(actual, expected, 'should write the built requirejs application to tmp/prod_almond_default.js');
		test.done();
	},
	prod_require: function(test) {
		test.expect(1);
		
		var actual = grunt.file.read('tmp/prod_require_default.js'),
			expected = grunt.file.read('test/expected/prod_require_out');
			
		test.equal(actual, expected, 'should write the built requirejs application to tmp/prod_require_default.js');
		test.done();
	}
};
