var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var minify = require('gulp-minify');
var clean = require('gulp-clean');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

})

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
gulp.task('build', ['clean-build', 'vendor'], function() {
  gulp.src(['./vendor/**'])
    .pipe(minify())
    .pipe(gulp.dest('./build/vendor'));

  gulp.src(['./css', './js', './mail', './*.html'])
    .pipe(minify())
    .pipe(gulp.dest('./build'))
})
