module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
            dist: {
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

    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['uncss', 'cssmin']);
};
