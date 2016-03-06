var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var concat = require('gulp-concat');

var paths = {
  sass: 'app/sass/**/*.scss',
  css: 'app/static/**/*.css',
  js: 'app/static/**/*.js',
  index: 'app/index.html'
};

gulp.task('serve', function() {
  gulp.src('app')
    .pipe(webserver({
        liveload: true,
        open: false,
        port: 8081
      }));
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('app/static'));
});

gulp.task('sass:watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('index', function() {
  var target = gulp.src(paths.index);
  var js = gulp.src(['app/js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./app/static/'));
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
