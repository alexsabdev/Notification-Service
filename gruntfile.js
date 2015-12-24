module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: 'source/scripts/**/*.js',
				tasks: 'ngdocs'
			},
			styles: {
				files: 'source/styles/**/*.css',
				tasks: 	''
			},
			html: {
				files: 'source/*.html',
				tasks: 	''
			}
		},
		express: {
			all: {
				options: {
					port: 9000,
					hostname: 'localhost',
					bases: ['.'],
					livereload: true
				}
			}
		},
		ngdocs: {
			all: ['source/scripts/notification-service.js', 'source/scripts/demo.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-ngdocs');
	grunt.registerTask('default', ['express', 'watch']);
};