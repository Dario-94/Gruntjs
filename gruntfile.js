module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        imagemin: {
            jpg: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dest/'
                }]
            }
        },

        less: {
            development: {
                options: {
                    paths: ['less/']
                },
                files: {
                    'css/style.css' : 'less/source.less'
                }
            }
        },

        uncss: {
            dist: {
                files: {
                    'css/style.css' : ['index.html']
                }
            }
        },

        watch: {
            sass: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
            }
        },

        sass: {
            dist: {
                files: {
                    'css/style.css' : 'sass/style.scss'
                }
            }
        },

        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            dsourceist: {
                src: ['js/script.js', 'js/script2.js'],
                dest: 'js/script.min.js'
                //dest: 'js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        uglify: {
            options: {
                mangle: false
                //preserveComments: 'all'
            },
            my_target: {
                files: [{
                    'js/script.min.js': ['js/script.js', 'js/script2.js', 'js/script3.js']
                }]
            }
        },

        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['uncss', 'cssmin']);

    grunt.task.run('notify_hooks');
};
