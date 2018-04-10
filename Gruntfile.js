/* jshint node:true */
module.exports = function( grunt ){
	'use strict';

	grunt.initConfig({
		// setting folder templates
		dirs: {
			css: 'assets/css',
			less: 'assets/css',
			sass: 'assets/css',
			postcss: 'assets/css',
			js: 'assets/js'
		},

		// Compila all .sass files
		sass: {
			compile: {
				options: {
					// These paths are searched for @imports
					// paths: ['<%= dirs.sass %>/']
				},
				files: [{
					expand: true,
					cwd: '<%= dirs.sass %>/',
					src: [
						'*.scss',
					],
					dest: '<%= dirs.css %>/',
					ext: '.css'
				}]
			}
		},

		// Minify .js files.
		uglify: {
			options: {
				preserveComments: 'some'
			},
			jsfiles: {
				files: [{
					expand: true,
					cwd: '<%= dirs.js %>/',
					src: [
						'*.js',
						'!*.min.js',
						'!Gruntfile.js',
					],
					dest: '<%= dirs.js %>/',
					ext: '.min.js'
				}]
			}
		},

		// Minify all .css files and autoprefix them.
		postcss: {
			options: {
				map: true,
				processors: [
					require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
					require('cssnano')() // minify the result
				  ]
				},
			dist: {
				src: '<%= dirs.postcss %>/*.css',
				// ext: '.css'
			}
		},

		// Watch changes for assets
		watch: {
			sass: {
				src: [
					'<%= dirs.sass %>/*.scss',
				],
				tasks: ['sass', 'postcss'],
			},
			js: {
				files: [
					'<%= dirs.js %>/*js',
					'!<%= dirs.js %>/*.min.js'
				],
				tasks: ['uglify']
			},
			postcss: {
				files: [
					'<%= dirs.postcss %>/*.css'
				],
				tasks: ['postcss']
			}
		},

	});

	// Load NPM tasks to be used here
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks('grunt-postcss');
	
	// Register tasks
	grunt.registerTask( 'default', [
		'sass',
		'uglify',
		'postcss'
	]);

};