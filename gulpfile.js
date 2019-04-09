var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),

    cssmin = require('gulp-cssmin'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),

    fileinclude = require('gulp-file-include')
    uglify = require("gulp-uglify"),
    sourcemaps = require('gulp-sourcemaps'),
    fsCache = require('gulp-fs-cache'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    pathProject = "test/",
    port = "8888",
    del = require('del'),
    ThemeName = "ui-wp";


// Gulp Task SASS, postcss/autoprefixer, Browsersync
gulp.task('sass', function() {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
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
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./ui/build/css'))
        .pipe(gulp.dest('./wp/wp-content/themes/'+ThemeName+'/css'))
        .pipe(browserSync.stream());
});

// File Include
gulp.task('fileinclude', function() {
  return gulp.src(['./ui/*.html'])
    .pipe(plumber({ errorHandler: function(err) {
        notify.onError({
            title: "Gulp error in " + err.plugin,
            message:  err.toString()
        })(err);
    }}))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./ui/build/'))
    .pipe(browserSync.stream());
});

// Build- watch file fileinclude
gulp.task('fileinclude-watch', gulp.series('fileinclude'));

// Uglify - Cache
gulp.task('scripts', function () {
  var jsFsCache = fsCache('.tmp/jscache'); // save cache to .tmp/jscache
  return gulp.src(['./assets/js/plugins.js', './assets/js/main.js'])
      .pipe(plumber({ errorHandler: function(err) {
          notify.onError({
              title: "Gulp error in " + err.plugin,
              message:  err.toString()
          })(err);
      }}))
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



// Copy Img, Fonts, JS in Build folder
gulp.task('copy-folders', function () {

    // img folder
    del('./ui/build/img/**/*');
    gulp.src('./assets/img/**/*')
    .pipe(gulp.dest('./ui/build/img/'));

    del('./wp/wp-content/themes/'+ThemeName+'/img/**/*');
    gulp.src('./assets/img/**/*')
    .pipe(gulp.dest('./wp/wp-content/themes/'+ThemeName+'/img/'));

    // fonts folder
    del('./ui/build/fonts/**/*');
    gulp.src('./assets/fonts/**/*')
    .pipe(gulp.dest('./ui/build/fonts/'));

    del('./wp/wp-content/themes/'+ThemeName+'/fonts/**/*');
    gulp.src('./assets/fonts/**/*')
    .pipe(gulp.dest('./wp/wp-content/themes/'+ThemeName+'/fonts/'));

    // JS folder
    del('./ui/build/js/**/*');
    gulp.src(['./assets/js/**/*','!./assets/js/main.js','!./assets/js/plugins.js'])
    .pipe(gulp.dest('./ui/build/js/'));

    del('./wp/wp-content/themes/'+ThemeName+'/js/**/*');
    gulp.src(['./assets/js/**/*','!./assets/js/main.js','!./assets/js/plugins.js'])
    .pipe(gulp.dest('./wp/wp-content/themes/'+ThemeName+'/js/'));

});

// Compile UI
gulp.task('ui', gulp.series('sass', function() {
    browserSync.init({
        server: "./ui/build/"
    });
    // warch file-include for root and inc
    gulp.watch(['./ui/inc/**/*.html', './ui/*.html'], gulp.series('fileinclude-watch'));
    gulp.watch("./assets/scss/**/*.scss", gulp.series('sass','copy-folders'));
    gulp.watch("./assets/js/**/*.js", gulp.series('scripts','copy-folders'));
    gulp.watch("./ui/*.html").on('change', browserSync.reload);
}));

// Compile WP
gulp.task('wp', gulp.series('sass', function() {
    browserSync.init({
        proxy: 'http://localhost:'+ port +'/' + pathProject + ThemeName + '/wp/'
    });
    gulp.watch(['./ui/inc/**/*.html', './ui/*.html'], gulp.series('fileinclude-watch'));
    gulp.watch("./assets/scss/**/*.scss", gulp.series('sass','copy-folders'));
    gulp.watch("./assets/css/**/*.css", gulp.series('sass','copy-folders'));
    gulp.watch("./assets/js/**/*.js", gulp.series('scripts','copy-folders'));
    gulp.watch('./wp/wp-content/themes/'+ThemeName+'/*.php').on('change', browserSync.reload);
}));

// Creating a server at the root
gulp.task('default', gulp.series('ui'));
