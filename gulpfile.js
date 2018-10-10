var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    fileinclude = require('gulp-file-include')
    uglify = require("gulp-uglify"),
    sourcemaps = require('gulp-sourcemaps'),
    fsCache = require('gulp-fs-cache'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    ThemeName = "ui-wp";


// Gulp Task SASS, postcss/autoprefixer, Browsersync
gulp.task('sass', function() {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: [
          'Chrome >= 35',
          'Firefox >= 38',
          'Edge >= 12',
          'Explorer >= 10',
          'iOS >= 8',
          'Safari >= 8',
          'Android 2.3',
          'Android >= 4',
          'Opera >= 12']})]))
        .pipe(gulp.dest('./ui/build/css'))
        .pipe(gulp.dest('./wp/wp-content/themes/'+ThemeName+'/css'))
        .pipe(browserSync.stream());
});

// File Include
gulp.task('fileinclude', function() {
  return gulp.src(['./ui/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./ui/build/'))
    .pipe(browserSync.stream());
});

// Build- watch file fileinclude
gulp.task('fileinclude-watch', ['fileinclude']);

// Uglify - Cache
gulp.task('scripts', function () {
  var jsFsCache = fsCache('.tmp/jscache'); // save cache to .tmp/jscache
  return gulp.src(['./assets/js/plugins.js', './assets/js/main.js'])
      .pipe(concat('app.js'))
      .pipe(sourcemaps.init())
      .pipe(jsFsCache)
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(jsFsCache.restore)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./ui/build/js/'))
      .pipe(gulp.dest('./wp/wp-content/themes/'+ThemeName+'/js'))
      .pipe(browserSync.stream());
});

// Compile UI
gulp.task('ui', ['sass'], function() {
    browserSync.init({
        server: "./ui/build/"
    });
    // warch file-include for root and inc
    gulp.watch(['./ui/inc/**/*.html', './ui/*.html'], ['fileinclude-watch']);
    gulp.watch("./assets/scss/**/*.scss", ['sass']);
    gulp.watch("./assets/js/**/*.js", ['scripts']);
    gulp.watch("./ui/*.html").on('change', browserSync.reload);
});

// Compile WP
gulp.task('wp', ['sass'], function() {
    browserSync.init({
        proxy: 'http://localhost:8888/test/'+ThemeName+'/wp/'
    });
    gulp.watch(['./ui/inc/**/*.html', './ui/*.html'], ['fileinclude-watch']);
    gulp.watch("./assets/scss/**/*.scss", ['sass']);
    gulp.watch("./assets/css/**/*.css", ['sass']);
    gulp.watch("./assets/js/**/*.js", ['scripts']);
    gulp.watch('./wp/wp-content/themes/'+ThemeName+'/*.php').on('change', browserSync.reload);
});

// Creating a server at the root
gulp.task('default', ['serve', 'fileinclude']);
