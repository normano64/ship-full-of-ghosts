var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var inject = require('gulp-inject');

var paths = {
  sass: 'app/sass/**/*.scss',
  css: 'app/css/**/*.css',
  js: 'app/js/**/*.js',
  index: 'app/index.html'
};

gulp.task('serve', function() {
  gulp.src('app')
    .pipe(webserver({
        liveload: true,
        open: true,
        port: 8081
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

gulp.task('index', function() {
  var target = gulp.src(paths.index);
  var sources = gulp.src([paths.js, paths.css], {read: false});

  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('app'));
});

gulp.task('index:watch', function() {
  gulp.watch([paths.sass, paths.js], ['index']);
});

gulp.task('default', ['sass', 'sass:watch', 'index', 'index:watch', 'serve'], function() {
  console.log('it\'s running!');
});