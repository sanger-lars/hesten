var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer');


gulp.task('styles', function () {
	return gulp.src('./hesten.css')
	.pipe(postcss([autoprefixer]))
	.pipe(gulp.dest('./temp'));
})

gulp.task('watch', function () {
	watch('./scripts/*.js', function () {
		console.log('gør noget ved js filerne.');

	});

	watch('./*.css', function () {
		console.log('gør noget ved js filerne.');
		gulp.start('styles');
	})
});