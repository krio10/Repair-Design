const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

// Static server
function bs() {
    serveSass();
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
    watch("src/*.html").on('change', browserSync.reload);
    watch("src/cass/*.cass").on('change', browserSync.stream);
    watch("src/js/*.js").on('change', browserSync.reload);
};

function serveSass() {
    return src('src/sass/*.sass')
      .pipe(sass())
      .pipe(dest('src/css'))
      .pipe(browserSync.stream());
  };
 
function minify() {
    return src('src/css/*.css')
      .pipe(concat('styles.min.css'))
      .pipe(minifyCSS({
        keepBreaks: true
        }))
      .pipe(dest('dist/css'));
  };
 
exports.serve = bs;