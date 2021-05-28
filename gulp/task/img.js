import gulp from 'gulp';
import md5 from 'gulp-md5-plus';

const imageSource = ['./src/imgs/*.{png,gif,jpg,jpeg,svg}', './src/imgs/*/*.{png,gif,jpg,jpeg,svg}'];

function img() {
  return gulp.src(imageSource).pipe(gulp.dest('./dev/imgs'));
}

function imgWatch() {
  gulp.watch(imageSource, function (event) {
    return img(event.path).pipe(global.browserSync.reload({ stream: true }));
  });
  return img();
}

gulp.task('img', img);
gulp.task('img:dev', imgWatch);
gulp.task('img:dev2dist', function () {
  return gulp
    .src(imageSource)
    .pipe(md5(6, ['./dist/*.html', './dist/css/*.css', './dist/js/*.js'])) //添加hash，替换文件名
    .pipe(gulp.dest('./dist/imgs'));
});
gulp.task('img:prod', gulp.series('img', 'img:dev2dist'));
