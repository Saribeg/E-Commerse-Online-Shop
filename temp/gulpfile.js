'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');


gulp.task('sass', function(){
	return gulp.src('./scss/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('./css'));
});

gulp.task('img', function () {
	return gulp.src('./img-temp/**')
			.pipe(imagemin({
					interlaced: true,
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }]
			}))
			.pipe(gulp.dest('./img-min'))
});
