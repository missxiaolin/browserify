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
    coffee = require('gulp-coffee'),
    sequence = require('run-sequence'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css');


var isProduction = process.env.ENV === 'prod';

gulp.task('default', function () {
    sequence('css', 'css-watch', 'vendorjs','js')
})

gulp.task('js', function () {
    var b = browserify({
        entries: ['./assets/js/pages/index/index.js'],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    }).external('jquery');

    var bundle = function () {
        b.bundle()
         .pipe(source('index.js'))
         .pipe(buffer())
         .pipe(gif(isProduction, uglify()))
         .pipe(gulp.dest('./www/js/'));
    }

    bundle();

    b.on('update', bundle)
})

// css处理
gulp.task('css', function () {
    gulp.src(['./assets/css/index.css'])
        .pipe(concat('main.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./www/css/'))
})

// 监听css
gulp.task('css-watch',function(){
    gulp.watch('./assets/css/*.css',['css'])

})

// .coffee处理
// gulp.task('coffee',function(){
//     gulp.src('./assets/js/commond/*.coffee')
//         .pipe(coffee())
//         .pipe(gulp.dest('./www/js/commond'))
// })

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