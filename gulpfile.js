var gulp = require('gulp'),
    shelljs = require('shelljs'),
    browserify = require('browserify'),
    watchify = require('watchify')
fs = require('fs'),
sequence = require('run-sequence')

gulp.task('default', function () {
    sequence('mainjs')
})

gulp.task('mainjs', function () {
    var b = browserify({entries: ['assets/js/index.js'], cache: {}, packageCache: {}, plugin: [watchify]});

    var bundle = function () {
        b.bundle()
         .pipe(fs.createWriteStream('www/js/main.js'));
    }

    bundle();

    b.on('update', bundle)
})

// gulp.task('watch', function () {     gulp         .watch(['assets/js/*'],
// function () {             sequence('mainjs')         }) })