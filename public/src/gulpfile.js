(function() {
    'use strict';

    /* debug mode */
    var debugMode = true,
        serverName = 'django_channels_example_public';

    /* gulp init */
    var gulp = require('gulp'),

        /* js */
        uglify = require('gulp-uglify'),

        /* scss */
        sass = require('gulp-sass'),
        sassOpts = {
            outputStyle: 'compressed',
            errLogToConsole: true
        },

        /* css */
        cleancss = require('gulp-clean-css'),
        cleancssOpts = {
            compatibility: 'ie7',
            debug: debugMode
        },

        /* images */
        pngquant = require('imagemin-pngquant'),
        pngquantOpts = {
            verbose: true
        },

        imagemin = require('gulp-imagemin'),
        imageminOpts = {
            progressive: true,
            interlaced: true,
            multipass: true,
            svgoPlugins: [{
                removeViewBox: false
            }, {
                removeUselessStrokeAndFill: false
            }, {
                removeEmptyAttrs: false
            }],
            use: [
                pngquant(pngquantOpts)
            ]
        },

        /* html */
        htmlmin = require('gulp-htmlmin'),
        htmlminOpts = {
            collapseWhitespace: true
        },

        /* extra */
        sourcemaps = require('gulp-sourcemaps'),
        sourcemapsInitOpts = {
            debug: debugMode
        },
        sourcemapsWritePath = '../_map/',
        sourcemapsWriteOpts = {
            addComment: true,
            debug: debugMode
        },

        concat = require('gulp-concat'),
        concatFileNames = {
            app: {
                js: 'dce.min.js'
            }
        },

        del = require('del'),

        size = require('gulp-size'),
        sizeOpts = {
            pretty: true,
            showFiles: false,
            showTotal: true
        },

        plumber = require('gulp-plumber'),

        runsequence = require('run-sequence').use(gulp),

        /* server */
        modRewrite = require('connect-modrewrite'),
        browsersync = require('browser-sync'),
        browsersyncOpts = {
            port: 3000,
            https: false,
            logLevel: 'debug',
            tunnel: false,
            host: 'localhost',
            open: 'local',
            notify: true,
            ui: {
                port: 3001,
                weinre: {
                    port: 3002
                }
            },
            server: {
                directory: false,
                baseDir: ['./build'],
                routes: {
                    '/external': 'bower_components',
                    '/config': 'config'
                },
                middleware: [
                    modRewrite([
                        '^([^.]+)$ /app/main/views/index/index.html [L]'
                    ])
                ]
            }
        },
        browsersyncReloadOpts = {
            stream: true
        };

    var path = {
        src: {
            app: {
                js: [
                    'app/*/app.js',
                    'app/*/constants.js',
                    'app/*/services.js',
                    'app/*/filters/*/*.js',
                    'app/*/directives/*/*.js',
                    '!app/*/directives/*/*.spec.js',
                    'app/*/views/**/*.js',
                    '!app/*/views/**/*.spec.js'
                ],
                html: [
                    'app/*/directives/*/*.html',
                    'app/*/views/**/*.html'
                ]
            },
            static: {
                js: 'static/js/**/*.js',
                scss: 'static/scss/**/*.scss',
                css: 'static/css/**/*.css',
                images: [
                    'static/images/**/*.*'
                ],
                fonts: 'static/fonts/**/*.*'
            }
        },
        build: {
            app: 'build/app/',
            static: 'build/static/'
        },
        watch: {
            app: {
                js: [
                    'app/**/*.js',
                    '!app/**/*.spec.js'
                ],
                html: 'app/*/*/*/*.html'
            },
            static: {
                js: 'static/js/**/*.js',
                scss: 'static/scss/**/*.scss',
                css: 'static/css/**/*.css',
                images: [
                    'static/images/**/*.*',
                ],
                fonts: 'static/fonts/**/*.*'
            }
        },
        clean: [
            './build'
        ]
    };

    gulp.task('build:app:js', function() {
        return gulp.src(path.src.app.js, { base: 'app' })
            .pipe(plumber())
            .pipe(sourcemaps.init(sourcemapsInitOpts))
            .pipe(uglify())
            .pipe(concat(concatFileNames.app.js))
            .pipe(sourcemaps.write(sourcemapsWritePath, sourcemapsWriteOpts))
            .pipe(gulp.dest(path.build.app))
            .pipe(size(sizeOpts))
            .pipe(browsersync.reload(browsersyncReloadOpts));
    });

    gulp.task('build:app:html', function() {
        return gulp.src(path.src.app.html, { base: 'app' })
            .pipe(plumber())
            .pipe(htmlmin(htmlminOpts))
            .pipe(gulp.dest(path.build.app))
            .pipe(size(sizeOpts))
            .pipe(browsersync.reload(browsersyncReloadOpts));
    });

    gulp.task('build:static:js', function() {
        return gulp.src(path.src.static.js, { base: 'static' })
            .pipe(plumber())
            .pipe(sourcemaps.init(sourcemapsInitOpts))
            .pipe(uglify())
            .pipe(sourcemaps.write(sourcemapsWritePath, sourcemapsWriteOpts))
            .pipe(gulp.dest(path.build.static))
            .pipe(size(sizeOpts))
            .pipe(browsersync.reload(browsersyncReloadOpts));
    });

    gulp.task('build:static:scss', function() {
        return gulp.src(path.src.static.scss, { base: 'static' })
            .pipe(plumber())
            .pipe(sourcemaps.init(sourcemapsInitOpts))
            .pipe(sass(sassOpts))
            .pipe(cleancss(cleancssOpts))
            .pipe(sourcemaps.write(sourcemapsWritePath, sourcemapsWriteOpts))
            .pipe(gulp.dest(path.build.static))
            .pipe(size(sizeOpts))
            .pipe(browsersync.reload(browsersyncReloadOpts));
    });

    gulp.task('build:static:css', function() {
        return gulp.src(path.src.static.css, { base: 'static' })
            .pipe(plumber())
            .pipe(sourcemaps.init(sourcemapsInitOpts))
            .pipe(cleancss(cleancssOpts))
            .pipe(sourcemaps.write(sourcemapsWritePath, sourcemapsWriteOpts))
            .pipe(gulp.dest(path.build.static))
            .pipe(size(sizeOpts))
            .pipe(browsersync.reload(browsersyncReloadOpts));
    });

    gulp.task('build:static:images', function() {
        return gulp.src(path.src.static.images, { base: 'static' })
            .pipe(plumber())
            .pipe(imagemin(imageminOpts))
            .pipe(gulp.dest(path.build.static))
            .pipe(size(sizeOpts))
            .pipe(browsersync.reload(browsersyncReloadOpts));
    });

    gulp.task('build:static:fonts', function() {
        return gulp.src(path.src.static.fonts, { base: 'static' })
            .pipe(plumber())
            .pipe(gulp.dest(path.build.static))
            .pipe(size(sizeOpts))
            .pipe(browsersync.reload(browsersyncReloadOpts));
    });

    gulp.task('build', [
        'build:app:js',
        'build:app:html',

        'build:static:js',
        'build:static:scss',
        'build:static:css',
        'build:static:images',
        'build:static:fonts'
    ]);

    gulp.task('watch', function(done) {
        gulp.watch(path.src.app.js, function(event, done) {
            gulp.start('build:app:js');
        });
        gulp.watch(path.src.app.html, function(event, done) {
            gulp.start('build:app:html');
        });

        gulp.watch(path.src.static.js, function(event, done) {
            gulp.start('build:static:js');
        });
        gulp.watch(path.src.static.scss, function(event, done) {
            gulp.start('build:static:scss');
        });
        gulp.watch(path.src.static.css, function(event, done) {
            gulp.start('build:static:css');
        });
        gulp.watch(path.src.static.images, function(event, done) {
            gulp.start('build:static:images');
        });
        gulp.watch(path.src.static.fonts, function(event, done) {
            gulp.start('build:static:fonts');
        });
    });

    gulp.task('clean', function(done) {
        del(path.clean).then(
            function(paths) {
                console.log('Files and folders that would be deleted:');
                console.log(paths.join('\n'));
                done();
            });
    });

    gulp.task('webserver', function(done) {
        browsersync.init(browsersyncOpts);
    });

    gulp.task('default', function(done) {
        runsequence(
            'clean',
            'build', ['webserver', 'watch'],
            done
        );
    });
})();
