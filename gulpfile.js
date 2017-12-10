var gulp = require('gulp'),
    shelljs = require('shelljs'),
    browserify = require('browserify'),
    fs = require('fs')

gulp.task('default',function(){
    browserify()
    .add('js/index.js')
    .bundle()
    .pipe(fs.createWriteStream('js/main.js'))
})