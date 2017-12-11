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
    cleanCss = require('gulp-clean-css'),
    dirname = __dirname,
    config = require('./config/index.json')
    minimist = require('minimist');

var files = JSON.parse(fs.readFileSync(dirname + '/tools/build.json')).modules,
    path = '',
    isProduction = process.env.ENV === 'prod',
    // 定义源代码的目录和编译压缩后的目录
    src='./assets',
    dist = './www';


//默认development环境
var knowOptions = {
    string: 'env',
    default: {
        env: process.env.NODE_ENV || 'production'
    }
},
options = minimist(process.argv.slice(2), knowOptions),
environment = options.env
console.log(options.env)

console.log(config[environment])



gulp.task('default', function () {
    sequence('css', 'css-watch', 'vendorjs','js')
})

// js监听
gulp.task('js', function () {
    files.forEach(function (ele, index) {
        var b = browserify({
            entries: [src + '/js/pages/' + ele.src + '.js'],
            cache: {},
            packageCache: {},
            plugin: [watchify]
        }).external('jquery');
    
        var bundle = function () {
            b.bundle()
             .pipe(source(ele.name))
             .pipe(buffer())
             .pipe(gif(isProduction, uglify()))
             .pipe(gulp.dest('./www/js/' + ele.dest + '/'));
        }
    
        bundle();
    
        b.on('update', bundle)
    })
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