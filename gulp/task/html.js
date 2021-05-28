import gulp from 'gulp';
import replace from 'gulp-replace';
const htmlmin = require('gulp-htmlmin');
var handleError = require('../util/handleError');
var ejs = require('gulp-ejs');

//html开发打包,处理ejs模板
function html() {
  return gulp
    .src('./src/**/*.html')
    .pipe(replace('../imgs', '/imgs')) //替换图片路径
    .pipe(replace('../../imgs', '/imgs'))
    .pipe(replace('.scss', '.css'))
    .pipe(replace('scss/', 'css/'))
    .pipe(ejs().on('error', handleError)) //错误处理
    .pipe(gulp.dest('dev'));
}

function htmlWatch() {
  //监听变化重新打包并且刷新浏览器
  gulp.watch(['./src/**/*.html', './src/lang/*', './src/**/*.ejs'], function (event) {
    return html().pipe(global.browserSync.reload({ stream: true }));
  });
  return html();
}

gulp.task('html', html);
gulp.task('html:dev', htmlWatch);
gulp.task('html:dev2dist', function () {
  return gulp
    .src('dev/*.html')
    .pipe(htmlmin({ collapseWhitespace: true })) //压缩html
    .pipe(gulp.dest('dist'));
});
gulp.task('html:prod', gulp.series('html', 'html:dev2dist'));
