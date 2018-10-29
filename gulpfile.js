var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var minifyJS = require('gulp-minify');

gulp.task('clean', function () {
  return gulp.src('dist/')
    .pipe(clean());
});

gulp.task('scripts', function () {
  return es.merge([
    gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/sweetalert2/dist/sweetalert2.all.min.js'
    ]),
    gulp.src([
      'js/helpers.js',
      'js/script.js'
    ]).pipe(concat('scripts.js')).pipe(uglify({
      mangle: false
    }))
  ]).pipe(concat('all.min.js')).pipe(gulp.dest('dist/js'));
});

gulp.task('cssmin', function () {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/@fortawesome/fontawesome-free/css/all.css',
    'node_modules/sweetalert2/dist/sweetalert2.min.css'
  ]).pipe(cleanCSS({rebase: false})).pipe(concat('styles.css'))

    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', function () {
  return gulp.src('index-prod.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'));
});


gulp.task('htaccess', function () {
  return gulp.src('api/.htaccess')
    .pipe(gulp.dest('dist/api'));
});

gulp.task('api', function () {
  return gulp.src('api/**')
    .pipe(gulp.dest('dist/api'));
});

gulp.task('fonts', function () {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/**')
    .pipe(gulp.dest('dist/webfonts'));
});



gulp.task('default', function (callback) {
  return runSequence('clean', ['scripts', 'cssmin', 'fonts', 'api', 'htaccess', 'copy'], callback);
});
