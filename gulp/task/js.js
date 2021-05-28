import gulp from 'gulp';
import uglify from 'gulp-uglify';
import md5 from 'gulp-md5-plus';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';

var replace = require('gulp-replace');
var devServer = false;

//js入口文件
function js() {
  return gulp
    .src('./src/js/**/*.js') //查找入口文件
    .pipe(gulpif(devServer, sourcemaps.init())) //开发环境添加sourcemap配置
    .pipe(replace('../imgs', '../imgs')) //处理图片路径
    .pipe(replace('../../imgs', '../imgs'))
    .pipe(gulpif(devServer, sourcemaps.write()))
    .pipe(gulp.dest('./dev/js')); //开发环境存放文件
}

function jsWatch() {
  devServer = true;
  //开发环境监听文件变化重新打包并刷新浏览器
  gulp.watch(['./src/js/**/*.js'], function (event) {
    return js().pipe(global.browserSync.reload({ stream: true }));
  });
  return js();
}

gulp.task('js', js);
gulp.task('js:dev', jsWatch);
gulp.task('js:dev2dist', function () {
  return gulp.src('dev/js/*.js').pipe(uglify()).pipe(md5(6, './dist/*.html')).pipe(gulp.dest('dist/js'));
});
gulp.task('js:prod', gulp.series('js', 'js:dev2dist'));
