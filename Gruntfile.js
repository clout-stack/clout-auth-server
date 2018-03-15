/**
 * Gruntfile
 */

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

    grunt.initConfig({
    	// Mocha config
        mochaTest: {
            test: {
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
	grunt.registerTask('test', 'mochaTest');
};
