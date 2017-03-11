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
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var	postcss = require('gulp-postcss');


var path = {
	src: {
		scss: './app/styles/style.scss',
		js: './app/js/**/*.js',
		css: './app/styles/style.css',
		bower_components: './app/bower_components/**',
		html: './app/**/*.html',
		fonts: './app/fonts/**'
	},
	dest: {
		scss: 'app/styles',
		css: './dist/styles/',
		bower_components: 'dist/bower_components',
		fonts: 'dist/fonts',
		js: './dist/js'
	},
	watch: {
		scss: 'app/styles/components/*.scss',
		index: 'app/index.html',
		html: 'app/views/*.html',
		js: 'app/js/**/*.js'
	}
};

// tasks
gulp.task('lint', function() {
  	gulp.src(path.src.js)
    	.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
	return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task('minify-css', function() {
  	var opts = {comments:true,spare:true};
  	gulp.src(path.src.css)
		.pipe(minifyCSS(opts))
    	.pipe(gulp.dest(path.dest.css))
});
gulp.task('minify-js', function() {
  	gulp.src(path.src.js)
		.pipe(uglify())
    	.pipe(gulp.dest(path.dest.js))
});
gulp.task('copy-bower-components', function () {
  	gulp.src(path.src.bower_components)
    	.pipe(gulp.dest(path.dest.bower_components));
});
gulp.task('copy-html-files', function () {
  	gulp.src(path.src.html)
    	.pipe(gulp.dest('dist/'));
});
gulp.task('copy-fonts', function () {
  	gulp.src(path.src.fonts)
    	.pipe(gulp.dest(path.dest.fonts));
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
	var processors = [
    	autoprefixer({browsers: ['> 1%']})
	];
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
		.pipe(postcss(processors))
        .pipe(gulp.dest(path.dest.scss))
		.pipe(connect.reload());
});
gulp.task('watch-html', function() {
	gulp.src(path.watch.html)
		.pipe(connect.reload());
});
gulp.task('watch-index', function() {
	gulp.src(path.watch.index)
		.pipe(connect.reload());
});
gulp.task('watch-js', function() {
	gulp.src(path.watch.js)
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch([path.watch.scss], ['watch-sass']);
	gulp.watch([path.watch.html], ['watch-html']);
	gulp.watch([path.watch.index], ['watch-index']);
	gulp.watch([path.watch.js], ['watch-js']);
});

// default task
gulp.task('default', ['lint', 'watch', 'connect']);

gulp.task('build', function() {
	runSequence(
		'clean',
		['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-fonts', 'copy-bower-components'],
		'connectDist'
	);
});
