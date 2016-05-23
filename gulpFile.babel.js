'use stricts';

import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import buffer from 'vinyl-buffer';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import iconfont from 'gulp-iconfont';
import consolidate from 'gulp-consolidate';
import webserver from 'gulp-webserver';
import jade from 'gulp-jade';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import modernizr from 'modernizr';
import clean from 'gulp-clean';

////////////////////////////////////////////////////////////////////
// Configuration settings

let paths = {
	'src': './src',
	'output': './dest'
}

// sass paths
paths.style = {
	all: paths.src + '/sass/main.scss',
	output: paths.output + '/css/'
};

let jadeData = {
	title: 'Gulp ES6 Project'
}

////////////////////////////////////////////////////////////////////
// Tasks

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
			.pipe(gulp.dest(paths.output + '/js'))
			.pipe(buffer())
			.pipe(uglify())
			.on('error', function(err) { console.error(err); })
			.pipe(rename({ extname: '.min.js' }))
			.pipe(gulp.dest(paths.output + '/js'));
});

// create a TASK to compile Sass into CSS using gulp-sass
gulp.task('css', function(){
	return gulp.src([paths.style.all])
			.pipe(sourcemaps.init())
			.pipe(sass({style: 'expanded'})
					.on('error', function (err) {
						console.error(err);
						this.emit('end');
					})
	)
			.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest(paths.style.output));
});
gulp.task('minify-css', ['css'], function() {
	return gulp.src([paths.style.output + '*.css', '!'+paths.style.output + '*.min.css'])
			.pipe(cssnano())
			.pipe(rename({ extname: '.min.css' }))
			.pipe(gulp.dest(paths.style.output));
});

////////////////////////////////////////////////////////////////////
// Custom modernizr
let modernizrConfig = JSON.parse(fs.readFileSync('./modernizr.json'));

// Create recursive directory structure...
function mkdir(dirPath, mode,callback)
{
	fs.mkdir(dirPath, mode, function (error) {
		if (error && error.code == 'ENOENT') {
			mkdir(path.dirname(dirPath), mode, mkdir.bind(this,dirPath,mode,callback));
		} else if (callback) callback(error);
	});
}
gulp.task('modernizr', function (cb) {
	modernizr.build(modernizrConfig, (result) => {
		// check is destination path exists, create if not.
		mkdir(paths.output + '/js/vendor/', null, function(){
			fs.writeFile(paths.output + '/js/vendor/modernizr-build.js', result, cb);
		});
	});
});

// Because we give the icon font an unique name we must empty the font folder.
gulp.task('clean-iconfont', function () {
	return gulp.src(paths.output + '/css/fonts/', {read: false})
			.pipe(clean());
});

// create a TASK to WATCH for changes in your files
// this will 'watch" for any changes in your files and rerun gulp if necessary
let runTimestamp = Math.round(Date.now()/1000);
gulp.task('iconfont', ['clean-iconfont'], function(){
	return gulp.src([paths.src + '/assets/icons/*.svg'])
			.pipe(iconfont({
				normalize: true,
				fontName: 'webfont-icons' + runTimestamp,
				appendUnicode: false,
				appendCodepoints: true,
				formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
				timestamp: runTimestamp
			}))
			.on('glyphs', function(glyphs, options) {
				var options = {
					glyphs: glyphs.map(function(glyphs) {
						// this line is needed because gulp-iconfont has changed the api from 2.0
						return { name: glyphs.name, codepoint: glyphs.unicode[0].charCodeAt(0) }
					}),
					fontName: 'webfont-icons' + runTimestamp,
					fontPath: 'fonts/', // set path to font (from your CSS file if relative)
					className: 'icon' // set class name in your CSS
				};
				gulp.src(paths.src + '/iconfont/iconfont-template.scss')
						.pipe(consolidate('lodash', options))
						.pipe(rename({ basename:'webfont-icons' }))
						.pipe(gulp.dest(paths.src + '/generated/iconfont/')); // set path to export your CSS
				gulp.src(paths.src + '/iconfont/html-template.html')
						.pipe(consolidate('lodash', options))
						.pipe(rename({ basename: 'webfont'}))
						.pipe(gulp.dest(paths.output)); // set path to export your HTML
			})
			.pipe(gulp.dest(paths.output + '/css/fonts/'))
});

gulp.task('webserver', function() {
	gulp.src(paths.output)
			.pipe(webserver({
				host: '0.0.0.0',
				livereload: false,
				directoryListing: false,
				open: true,
				port: 8000
			}));
});

gulp.task('jade', function() {
	return gulp.src(paths.src + '/templates/*.jade')
			.pipe(plumber()) // Prevent pipe breaking caused by errors from gulp plugins
			.pipe(jade({
				data: jadeData,
				pretty:true
			})) // pip to jade plugin
			.pipe(gulp.dest(paths.output)); // tell gulp our output folder
});

////////////////////////////////////////////////////////////////////
// Copy files

gulp.task('copy:svg', function () {
	return gulp
			.src(paths.src + '/assets/svg/**/*')
			.pipe(gulp.dest(paths.output + '/svg'))
});

gulp.task('copy:img', function () {
	return gulp
			.src(paths.src + '/assets/img/*')
			.pipe(gulp.dest(paths.output + '/img'))
});
gulp.task('copy', ['copy:svg', 'copy:img'], function(){});

// create a TASK to WATCH for changes in your files
// this will "watch" for any changes in your files and rerun gulp if necessary
gulp.task('watch', function(){
	gulp.watch('src/sass/**/*.scss', ['css', 'minify-css']);
	gulp.watch('src/js/**/*.js', ['es6']);
	gulp.watch('src/templates/**/*.jade', ['jade']);
	gulp.watch('src/assets/icons/*.svg', ['iconfont', 'css', 'minify-css']);
	gulp.watch('src/assets/img/**/*', ['copy:img']);
	gulp.watch('src/assets/svg/**/*', ['copy:svg']);
});

// finally, create a TASK that will run all commands when typing "gulp"
// in Terminal

// This will run in this order:
// * copy and modernizr in parallel
// * iconfont
// * css
// * minify-css
// * es6 and jade in parallel
// * Finally call the callback function
gulp.task('build', function(callback) {
	runSequence(
			['copy', 'modernizr'],
			'iconfont',
			'css',
			'minify-css',
			['es6', 'jade'],
			callback);
});

gulp.task('default', function(callback) {
	runSequence(
			'build',
			['webserver', 'watch'],
			callback
	);
});