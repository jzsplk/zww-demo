var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer =require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('default', ['serve']);

gulp.task('sass', function() {
	console.log('sass', 'sucess');
	return gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./css'))
		.pipe(reload({stream: true}));
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', reload);
});