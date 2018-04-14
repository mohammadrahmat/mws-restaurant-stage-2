let gulp = require('gulp');
let webp = require('gulp-webp');

gulp.task('create-webp', function() {
    return gulp.src('img/rest_images/*.jpg')
        .pipe(webp())
        .pipe(gulp.dest('img/rest_images'));
});