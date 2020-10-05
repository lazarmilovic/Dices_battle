const gulp= require('gulp');
const sass= require('gulp-sass');
const browserSync= require('browser-sync').create();

function styles(){
return gulp.src('./css/styles.scss').pipe(sass()).pipe(gulp.dest('./css')).pipe(browserSync.stream());
}

function watch(){
	browserSync.init({
		server:{
			baseDir:'./'
		}

	});
	gulp.watch('./css/styles.scss', styles);
	gulp.watch('./*.html').on('change',browserSync.reload);
	gulp.watch('./*.php').on('change',browserSync.reload);
	gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.styles=styles;
exports.watch=watch;