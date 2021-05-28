import gulp from 'gulp';
import gulpClean from 'gulp-clean';

gulp.task('clean:prod', () => {
  return gulp.src('./dist', { read: false, allowEmpty: true }).pipe(gulpClean());
});
gulp.task('clean:dev', () => {
  return gulp.src('./dev', { read: false, allowEmpty: true }).pipe(gulpClean());
});
gulp.task('clean', gulp.parallel('clean:prod', 'clean:dev'));
