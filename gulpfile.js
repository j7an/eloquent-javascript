const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gulpStylelint = require('gulp-stylelint');

gulp.task('css', function(callback) {
  runSequence('postcss', 'lint-css', callback);
});

gulp.task('postcss', function() {
  var processors = [
    autoprefixer
  ];
  return gulp.src("public/es6/**/*.css")
    .pipe(postcss(processors))
    .pipe(gulp.dest("public/dist"));
});

gulp.task('lint-css', function() {

  return gulp.src('public/es6/**/*.css')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('default', function() {
  // Run ESLint
  gulp.src(["es6/**/*.js", "public/es6/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
  // Node source
  gulp.src("es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
  // browser source
  gulp.src("public/es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/dist"));
});