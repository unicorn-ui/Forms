var gulp            = require('gulp');
var exec            = require('child_process').exec;
var sass            = require('gulp-sass');
var watch           = require('gulp-watch');
var autoprefixer    = require('gulp-autoprefixer');
// var usemin          = require('gulp-usemin');
var minifyCSS       = require('gulp-minify-css');
var concat          = require('gulp-concat');
var Q               = require('q');
var del             = require('del');
var rename          = require("gulp-rename");


/**
*  CLEAN
*
*  Delete files and directories
*/

gulp.task('clean:build', function() {
  return Q.promise(function(resolve, error) {
    del(['build'], resolve);
  });
});


gulp.task('moveCSSLibs', ['clean:build'], function(){
  var stream = gulp.src([
      'public/vendor/css/**/*.css'
    ])
    .pipe(concat('vendor.min.css'))
    .pipe(minifyCSS({ noAdvanced: true }))
    .pipe(gulp.dest('build'));

  return stream;
});

/**
*  CSS PREPROCESSING
*
*  Sass, vender prefix, minify, move
*/
gulp.task('css', ['moveCSSLibs'], function() {
  var stream = gulp.src('public/scss/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(minifyCSS({ noAdvanced: true }))
      .pipe(gulp.dest('build'));

  return stream;
});

/**
*  WATCH
*
*  Watches files for compilation
*/

gulp.task('watch', function() {
  gulp.watch('public/scss/**/*.scss', ['css']);
});


/**
*  BUILD TASKS
*
*  Local and production build tasks
*/

gulp.task('default', ['watch'], function() {
});


