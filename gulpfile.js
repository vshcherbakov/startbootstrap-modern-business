var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');

// Default task
gulp.task('default', ['build']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./css/*.css', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload);
});

// clean build
gulp.task('clean-build', function () {
  return gulp.src('./build', {read: false})
      .pipe(clean());
});

// build task
gulp.task('build', ['clean-build'], function() {
  gulp.src(['./vendor/**'])
    .pipe(gulp.dest('./build/vendor'));

  gulp.src(['css/**/*', 'js/**/*', 'mail/**/*', '*.html', 'img/**/*'], {base:"."})
    .pipe(gulp.dest('./build'));
});
