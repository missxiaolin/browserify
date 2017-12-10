var gulp = require('gulp'),
    shelljs = require('shelljs'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    fs = require('fs'),
    sequence = require('run-sequence');

gulp.task('default', function () {
    sequence('vendorjs','mainjs')
})

gulp.task('mainjs', function () {
    var b = browserify({
        entries: ['assets/js/index.js'],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    }).external('jquery');

    var bundle = function () {
        b.bundle()
         .pipe(source('main.js'))
         .pipe(buffer())
         .pipe(uglify())
         .pipe(gulp.dest('www/js/'));
    }

    bundle();

    b.on('update', bundle)
})

gulp.task('vendorjs',function(){
    var b = browserify().require('./bower_components/jquery/dist/jquery.js',{
        expose: 'jquery'
    })
    .bundle()
    .pipe(fs.createWriteStream('www/js/vendor.js'))
})

// gulp.task('watch', function () {     gulp         .watch(['assets/js/*'],
// function () {             sequence('mainjs')         }) })