var gulp = require('gulp'),
	$ = require( 'gulp-load-plugins' )({lazy: true});

var path = {
	app_index: 'index.js',
	server_files: 'server/',
	views: ['views/**/*', 'public/html/**/*'],
	scss: 'src/scss/**/*.scss',
	coffee: 'src/coffee/**/*.coffee',
	css: 'public/css',
	js: 'public/js'
}

gulp.task('nodemon', function (cb) {
	var started = false;
	return $.nodemon({
		script: path.app_index,
		watch: [path.app_index, path.server_files],
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		}
	});
});

gulp.task('scss', function(){
	return gulp
		.src(path.scss)
		.pipe($.sourcemaps.init())
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe($.concat('styles.css'))
		.pipe($.cleanCss())
		.pipe($.sourcemaps.write('./maps'))
		.pipe(gulp.dest(path.css))
		.pipe($.refresh());
});

gulp.task('coffee', function(){
	return gulp.src(path.coffee)
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.coffee({bare: true}))
        .pipe($.ngAnnotate())
		// .pipe($.uglify())
		.pipe($.sourcemaps.write('./maps'))
		.pipe(gulp.dest(path.js))
		.pipe($.refresh());
});

gulp.task('watch', function(){
	$.refresh.listen()
	gulp.watch(path.scss, ['scss']);
	gulp.watch(path.coffee, ['coffee']);
	gulp.watch(path.views, function(){gulp.src(path.views).pipe($.refresh())});
});

gulp.task('default', function(){
	gulp.start(
		'nodemon',
		'scss',
		'coffee',
		'watch'
	)
});
