var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');

var paths = {
  sass: 'app/sass/**/*.scss',
  js: 'app/js/**/*.js'
};

gulp.task('serve', function() {
  gulp.src('app')
    .pipe(webserver({
        liveload: true,
        open: true
      }));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

gulp.task('sass:watch', function() {
  gulp.watch(paths.sass, ['sass']);
});