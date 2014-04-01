module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                mangle : true,
                compress : true,
                report: 'min'
            },
            build : {
                files: {
                    'build/ilius.min.js': ['app.js']
                }
            }
        },
        copy : {
            views : {
                files : [
                    {
                        src  : [
                            'meetic-logo.png'
                        ],
                        dest : 'build/'
                    }
                ]
            }

        },
        cssmin: {
            minify: {
                files: {
                    'build/ilius.css' : ['*.css']
                }
            }
        },
        clean: {
            build: {
                src: ["build/"]
            }
        },
        rev: {
            files: {
                src: ['build/*.{js,css}']
            }
        },
        jshint: {
            files: ['*.js']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'copy','uglify', 'cssmin','jshint']);


};