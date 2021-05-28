import gulp from 'gulp';

// 1--ICON
gulp.task('favicon:dev', () => {
  return gulp.src('./favicon.ico').pipe(gulp.dest('./dev'));
});
gulp.task('favicon:dist', () => {
  return gulp.src('./favicon.ico').pipe(gulp.dest('./dist'));
});

// 2--STATIC
function staticBuilder(path = './src/static/**/*') {
  return gulp.src(path).pipe(gulp.dest('dev/static'));
}
gulp.task('static:dev', () => {
  gulp.watch('./src/static/**/*', (event) => {
    const path = event.path;
    return staticBuilder(path).pipe(global.browserSync.reload({ stream: true }));
  });
  return staticBuilder();
});
gulp.task('static:prod', () => {
  return gulp.src('./src/static/**/*').pipe(gulp.dest('dist/static'));
});
