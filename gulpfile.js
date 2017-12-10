var gulp = require('gulp'),
    shelljs = require('shelljs'),
    browserify = require('browserify'),
    fs = require('fs'),
    sequence = require('run-sequence')

gulp.task('default',function(){
    sequence('mainjs','watch')
})

gulp.task('mainjs',function(){
    browserify()
    .add('assets/js/index.js')
    .bundle()
    .pipe(fs.createWriteStream('www/js/main.js'))
})

gulp.task('watch',function(){
    gulp.watch(['assets/js/*'],function(){
        sequence('mainjs')
    })
})