var gulp = require('gulp'),
    shelljs = require('shelljs')

gulp.task('default',function(){
    shelljs.exec('browserify js/index.js -o js/main.js')
})