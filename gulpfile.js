var gulp = require('gulp'),
    shelljs = require('shelljs'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gif = require('gulp-if'),
    fs = require('fs'),
    copy = require('gulp-contrib-copy'),
    coffee = require('gulp-coffee')
    sequence = require('run-sequence');


var isProduction = process.env.ENV === 'prod';

gulp.task('default', function () {
    sequence('vendorjs','mainjs')
})

gulp.task('mainjs', function () {
    var b = browserify({
        entries: ['./assets/js/index.js'],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    }).external('jquery');

    var bundle = function () {
        b.bundle()
         .pipe(source('main.js'))
         .pipe(buffer())
         .pipe(gif(isProduction, uglify()))
         .pipe(gulp.dest('./www/js/'));
    }

    bundle();

    b.on('update', bundle)
})

gulp.task('coffee',function(){
    gulp.src('./assets/js/*.coffee')
        .pipe(coffee())
        .pipe(gulp.dest('./www/js/build'))
})

gulp.task('vendorjs',function(){
    var b = browserify().require('./bower_components/jquery/dist/jquery.js',{
        expose: 'jquery'
    })
    .bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(gif(isProduction, uglify()))
    .pipe(gulp.dest('./www/js/'))
})

// gulp.task('watch', function () {     
//     gulp.watch(['assets/js/*'],function () {
//         sequence('mainjs')         
//     }) 
// })