/**
 * Gulp Configuration
 */

// Dependencies
// --------------------------------------------------

const gulp = require("gulp"),
babel = require("gulp-babel"),
concat = require("gulp-concat"),
plumber = require("gulp-plumber"),
sourceMaps = require("gulp-sourcemaps"),
uglify = require("gulp-uglify"),
minifyCss = require("gulp-minify-css"),
preFixer = require("gulp-autoprefixer");

// Global Variables
// --------------------------------------------------

const scriptsPath = "assets/js/**/*.js",
stylesPath = "assets/css/**/*.css",
distPath = "assets/dist";

// Tasks
// --------------------------------------------------

// Styles task
gulp.task("styles", function() {
    return gulp.src(stylesPath)
        .pipe(plumber(function(err) {
            console.log("Styles task error...");
            console.log(err);
            this.emit("end");
        }))
        .pipe(sourceMaps.init())
        .pipe(preFixer())
        .pipe(concat("styles.css"))
        .pipe(minifyCss())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(distPath));
});

// Scripts task
gulp.task("scripts", function() {
    return gulp.src(scriptsPath)
        .pipe(plumber(function(err) {
            console.log("Scripts task error...");
            console.log(err);
            this.emit("end");
        }))
        .pipe(sourceMaps.init())
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(concat("scripts.js"))
        .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(distPath))
});

// Watch task
gulp.task("watch", function() {
    gulp.watch(stylesPath, ["styles"]);
    gulp.watch(scriptsPath, ["scripts"]);
});
