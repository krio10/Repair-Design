const gulp = require('gulp');
const browserSync = require('browser-sync').create();
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

gulp.task('minify', () => {
    return gulp.src('src/css/*.css')
      .pipe(concat('styles.min.css'))
      .pipe(minifyCSS({
        keepBreaks: true
        }))
      .pipe(gulp.dest('dist/css'));
  });