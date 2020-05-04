const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const csslint = require('gulp-csslint');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');

gulp.task('hello', function(done) {
    console.log('Привет, мир');
    done();
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('css', () => {
    gulp.src('src/css/*.css')
      .pipe(csslint())
      .pipe(csslint.formatter());
  });

gulp.task('minify', () => {
    return gulp.src('src/css/*.css')
      .pipe(csslint())
      .pipe(csslint.formatter())
      .pipe(concat('styles.min.css'))
      .pipe(minifyCSS({
        keepBreaks: true
        }))
      .pipe(gulp.dest('dist/css'));
  });