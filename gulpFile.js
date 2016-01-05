var gulp = require('gulp'),
		fs = require('fs'),
		browserify = require('browserify'),
		babelify = require('babelify'),
		source = require('vinyl-source-stream'),
		uglify = require('gulp-uglify'),
		cssnano = require('gulp-cssnano'),
		rename = require('gulp-rename'),
		buffer = require('vinyl-buffer'),
		sass = require('gulp-sass'),
		modernizr = require('gulp-modernizr'),
		iconfont = require('gulp-iconfont'),
		consolidate = require('gulp-consolidate'),
		webserver = require('gulp-webserver'),
		jade = require('gulp-jade'),
		plumber = require('gulp-plumber');


////////////////////////////////////////////////////////////////////
// Configuration settings

var paths = {
	'src': './src',
	'output': './dest'
}

// sass paths
paths.style = {
	all: paths.src + '/sass/main.scss',
	output: paths.output + '/css/'
};
gulp.task('es6', function() {
	browserify(
			{
				entries: paths.src + '/js/main.js',
				debug: true
			}).transform(babelify.configure({
				sourceMapRelative: paths.src + '/js',
				presets: ['es2015']
			}))
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(uglify())
			.on('error', function(err) { console.error(err); })
			.pipe(rename({ extname: '.min.js' }))
			.pipe(gulp.dest(paths.output + '/js'));
});

// create a TASK to compile Sass into CSS using gulp-sass
gulp.task('css', function(){
	gulp.src([paths.style.all])
			.pipe(plumber()) // Prevent pipe breaking caused by errors from gulp plugins
			.pipe(sass({style: 'expanded'}))
			.pipe(gulp.dest(paths.style.output));
});
gulp.task('minify-css', function() {
	return gulp.src([paths.style.output + '*.css', '!'+paths.style.output + '*.min.css'])
			.pipe(cssnano())
			.pipe(rename({ extname: '.min.css' }))
			.pipe(gulp.dest(paths.style.output));
});

// create a TASK to build a modernizr script using gulp-modernizr
var modernizrSettings = JSON.parse(fs.readFileSync('./modernizr.json'));
gulp.task('modernizr', function(){
	gulp.src(paths.src + '/js/**/*.js')
			.pipe(modernizr('modernizr-build.js', modernizrSettings))
			.pipe(gulp.dest(paths.output + '/js/vendor'));
});

// create a TASK to WATCH for changes in your files
// this will 'watch" for any changes in your files and rerun gulp if necessary
var runTimestamp = Math.round(Date.now()/1000);
gulp.task('iconfont', function(){
	return gulp.src([paths.src + '/assets/icons/*.svg'])
			.pipe(iconfont({
				fontName: 'webfont-icons',
				appendUnicode: false,
				formats: ['ttf', 'eot', 'woff'],
				autohint: true,
				timestamp: runTimestamp
			}))
			.on('glyphs', function(glyphs, options) {
				var options = {
					glyphs: glyphs.map(function(glyphs) {
						// this line is needed because gulp-iconfont has changed the api from 2.0
						return { name: glyphs.name, codepoint: glyphs.unicode[0].charCodeAt(0) }
					}),
					fontName: 'webfont-icons',
					fontPath: 'fonts/', // set path to font (from your CSS file if relative)
					className: 'icon' // set class name in your CSS
				};
				gulp.src(paths.src + '/iconfont/iconfont-template.scss')
						.pipe(consolidate('lodash', options))
						.pipe(rename({ basename:'webfont-icons' }))
						.pipe(gulp.dest(paths.src + '/generated/iconfont/')); // set path to export your CSS
			})
			.pipe(gulp.dest(paths.output + '/css/fonts/'))
});

gulp.task('webserver', function() {
	gulp.src(paths.output)
			.pipe(webserver({
				livereload: false,
				directoryListing: false,
				open: true,
				port: 8900
			}));
});

gulp.task('jade', function() {
	return gulp.src(paths.src + '/templates/*.jade')
			.pipe(plumber()) // Prevent pipe breaking caused by errors from gulp plugins
			.pipe(jade({
				pretty:true
			})) // pip to jade plugin
			.pipe(gulp.dest(paths.output)); // tell gulp our output folder
});

// create a TASK to WATCH for changes in your files
// this will "watch" for any changes in your files and rerun gulp if necessary
gulp.task('watch', function(){
	gulp.watch([paths.src + '/sass/**/*.scss'], ['css', 'minify-css']);
	gulp.watch(paths.src + '/js/**/*.js', ['es6']);
	gulp.watch(paths.src + '/templates/**/*.jade', ['jade']);
});

// finally, create a TASK that will run all commands when typing "gulp"
// in Terminal
gulp.task('default', ['modernizr', 'iconfont', 'css', 'minify-css', 'es6', 'jade', 'watch', 'webserver'], function() {});
gulp.task('build', ['modernizr', 'iconfont', 'css', 'minify-css', 'es6', 'jade'], function() {});