var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	htmlmin = require('gulp-htmlmin'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

//LIVE BROWSER RELOAD
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});
});

//COMPILE & MINIFY SASS
gulp.task('compile-minify-scss', function() {
	return gulp.src('./src/sass/*.scss')
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(autoprefixer({ cascade: false }))
	.pipe(gulp.dest('./public/css'))
	.pipe(browserSync.stream());
});

// MINIFY JAVASCRIPT
gulp.task('minify-js', function() {
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./public/js'))
	.pipe(browserSync.stream()); //JS AUTO RELOAD
});

// MINIFY HTML
gulp.task('minify-html', function() {
	return gulp.src('./src/*.html')
	.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(gulp.dest('./public'))
	.pipe(browserSync.stream());
});

//GULP WATCH
gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.scss', ['compile-minify-scss']);
	gulp.watch('./src/js/**/*.js', ['minify-js']);
	gulp.watch('./src/**/*.html', ['minify-html']);
});

//GULP TASK RUNNER
gulp.task('default', ['browserSync', 'minify-html', 'compile-minify-scss', 'minify-js', 'watch']);
