module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        wiredep: {
            target: {
                src: 'index.html'
            }
        },

        /*log: {
            foo: [1,2,3],
            bar: 'Hello World!!',
            baz: false,
        },*/

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
            },
            files: ['bower_components/*'],
            tasks: ['wiredep']
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

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('changes', ['watch']);
    grunt.registerTask('default', ['uncss', 'sass', 'uglify']);

    grunt.task.run('notify_hooks');

    /*grunt.registerMultiTask('log', 'Log stuff.', function() {
        grunt.log.writeln(this.target + ': ' + this.data);
    });

    grunt.registerTask('foo', 'Simple task!', function (arg1, arg2) {
        if (arguments.length===0) {
            grunt.log.writeln(this.name + ', no args');
        } else {
            grunt.log.writeln(this.name + '+ '+ arg1 + ' ' + arg2);
        }
    });

    grunt.registerTask('default', 'My default task', function() {
        grunt.log.writeln('Currently running the default task.');
    })

    grunt.registerTask('foo_me', 'My foo_me task!', function() {
        grunt.task.run('bar', 'baz');

        grunt.task.run(['bar', 'baz']);
    });

    grunt.registerTask('asyncfoo', 'My async task', function() {
        var done = this.async();
        grunt.log.writeln('Processing task...');

        setTimeout(function() {
            grunt.log.writeln('All done!');
            done();
        }, 10000);

        grunt.log.error('This is an error message');
    })*/
};
