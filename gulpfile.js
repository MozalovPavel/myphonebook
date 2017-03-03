// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');


var src = {
	scss: './app/styles/style.scss',
	scss_dest: 'app/styles',
	scss_watch: 'app/components/**/*.scss',
	index_watch: 'app/index.html',
	html_watch: 'app/components/**/*.html',
	js_watch: 'app/js/**/*.js'
};

// tasks
gulp.task('lint', function() {
  	gulp.src(['./app/**/*.js', '!./bower_components/**'])
    	.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});
// gulp.task('clean', function() {
//     gulp.src('./dist')
//       .pipe(clean({force: true}));
// });
gulp.task('clean', function() {
	return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task('minify-css', function() {
  	var opts = {comments:true,spare:true};
  	gulp.src(['./app/**/*.css', '!./bower_components/**'])
    	.pipe(minifyCSS(opts))
    	.pipe(gulp.dest('./dist/'))
});
gulp.task('minify-js', function() {
  	gulp.src(['./app/**/*.js', '!./bower_components/**'])
		.pipe(uglify())
    	.pipe(gulp.dest('./dist/'))
});
gulp.task('copy-bower-components', function () {
  	gulp.src('./bower_components/**')
    	.pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function () {
  	gulp.src('./app/**/*.html')
    	.pipe(gulp.dest('dist/'));
});
// gulp.task('copy-json-file', function () {
//   gulp.src('./app/*.json')
//     .pipe(gulp.dest('dist/'));
// });
gulp.task('copy-fonts', function () {
  	gulp.src('./app/fonts/**')
    	.pipe(gulp.dest('dist/fonts'));
});
gulp.task('connect', function () {
  	connect.server({
    	root: 'app',
		livereload: true,
		port: 8888
  	});
});
gulp.task('connectDist', function () {
  	connect.server({
		root: 'dist/',
    	port: 9999
  	});
});

gulp.task('watch-sass', function () {
    gulp.src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.scss_dest))
		.pipe(connect.reload());
});
gulp.task('watch-html', function() {
	gulp.src(src.html_watch)
		.pipe(connect.reload());
});
gulp.task('watch-index', function() {
	gulp.src(src.index_watch)
		.pipe(connect.reload());
});
gulp.task('watch-js', function() {
	gulp.src(src.js_watch)
		.pipe(connect.reload());
});


gulp.task('watch', function() {
	gulp.watch([src.scss_watch], ['watch-sass']);
	gulp.watch([src.html_watch], ['watch-html']);
	gulp.watch([src.index_watch], ['watch-index']);
	gulp.watch([src.js_watch], ['watch-js']);
});



// default task
gulp.task('default', ['lint', 'watch', 'connect']);

gulp.task('build', function() {
  runSequence(
	'clean',
    ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components', 'copy-json-file', 'copy-fonts'],
	'connectDist'
  );
});
