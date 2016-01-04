module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				livereload: true,
				interval: 5007
			},
			scripts: {
				files: 'source/scripts/**/*.js',
				tasks: 'ngdocs'
			},
			styles: {
				files: 'source/styles/**/*.css',
				tasks: ''
			},
			html: {
				files: 'source/*.html',
				tasks: ''
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
			all: ['source/scripts/notification-service.js']
		},
		jshint: {
			options: {
				"curly": true,
				"eqnull": true,
				"eqeqeq": true,
				"undef": true,
				"latedef": true,
				"newcap": true,
				"noarg": true,
				"sub": true,
				"browser": true,
				"globals": {
					"jQuery": true,
					$: true,
					console: true
				}
			},
			'<%= pkg.name %>': {
				src: ['source/scripts/*.js']
			}
		},
		// concat: {
		// 	dist: {
		// 		src: ['source/scripts/notification-service.js', 'source/scripts/demo.js'],
		// 		dest: 'demo/scripts/main.js'
		// 	}
		// },
		uglify: {
			options: {
				stripBanners: true,
				banner: '/* <%= pkg.name %> -v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'dist/notification-service.js',
				dest: 'dist/notification-service.min.js'
			}
		},
		cssmin: {
			with_banner: {
				options: {
					banner: '/* My minified CSS */'
				},
				files: { 'dist/notification-service-styles.min.css' : ['dist/notification-service-styles.css']
			}
		}
	},
	useminPrepare: {
		html: 'source/index.html',
		options: {
			dest: 'demo/'
		}
	},
	usemin: {
		html: ['demo/index.html']
	},
	copy: {
		task0: {
			src: 'source/index.html',
			dest: 'demo/index.html'
		},
		task1: {
			src: 'source/scripts/notification-service.js',
			dest: 'dist/notification-service.js'
		},
		task2: {
			src: 'source/styles/notification-service-styles.css',
			dest: 'dist/notification-service-styles.css'
		},
		task3: {
			src: 'source/json-data/db.json',
			dest: 'demo/json-data/db.json'
		}
	}

});

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-express');
grunt.loadNpmTasks('grunt-ngdocs');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-usemin');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('default', ['express', 'watch']);
grunt.registerTask('demo', ['copy:task0','copy:task3','useminPrepare','concat','uglify','cssmin', 'usemin']);
grunt.registerTask('dist', ['copy:task1', 'copy:task2', 'cssmin', 'uglify']);
};
