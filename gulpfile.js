var gulp = require('gulp');
var del = require('del');
var errorHandler = require('gulp-plumber');
var sourceMaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var ngFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var gulpUtil = require('gulp-util');
var debug = require('gulp-debug');
var htmlMin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var bytediff = require('gulp-bytediff');
var runSequence = require('run-sequence');

gulp.task('del',function() {
  return del('./dist');
})
gulp.task('dist',function() {
  return gulp.src('./src/**/*.js')
    .pipe(errorHandler())
    .pipe(sourceMaps.init())
    .pipe(ngAnnotate())
    .pipe(ngFilesort())
    .pipe(debug())
    .pipe(concat('ocf-main.js'))
    //.pipe(bytediff.start())
    //.pipe(uglify({mangle:false , compress: true}))
    //.pipe(bytediff.stop())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .on('error',gulpUtil.log);

});


gulp.task('templates',function() {
  return gulp.src('./src/**/*.html')
    .pipe(errorHandler())
    .pipe(sourceMaps.init())
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(debug())
    .pipe(templateCache('ocf-templates.js',{module:"ocf.templates", standalone:true}))
    .pipe(bytediff.start())
    .pipe(uglify({mangle:false , compress: true}))
    .pipe(bytediff.stop())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./dist'))
    .on('error',gulpUtil.log);

});


gulp.task('default', runSequence('del',['templates','dist']));
