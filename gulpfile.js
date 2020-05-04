const gulp = require('gulp');
const browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var csslint = require('gulp-csslint');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

gulp.task('hello', function(done) {
    console.log('Привет, мир');
    done();
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('css', () => {
    gulp.src('css/*.css')
      .pipe(csslint())
      .pipe(csslint.formatter());
  });

gulp.task('minify', () => {
    return gulp.src('css/*.css')
      .pipe(csslint())
      .pipe(csslint.formatter())
      .pipe(concat('styles.min.css'))
      .pipe(minifyCSS({
        keepBreaks: true
        }))
      .pipe(gulp.dest('css'));
  });