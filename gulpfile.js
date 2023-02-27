const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
//img
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
//JS
const terser = require("gulp-terser-js");

function css(done) {
  //Identificar el archivo SASS
  //Compilarlo
  //Almacenarlo
  src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));
  done(); //Callback que avisa a gulp que se llego al final.
}

function images(done) {
  const options = {
    optimizationLevel: 50
  };
  src("src/img/**/*{png,jpg}")
    .pipe(cache(imagemin(options)))
    .pipe(dest("build/img"))
  done();
}

function versionWebp(done) {
  const options = {
    quality: 50
  };
  src("src/img/**/*{png,jpg}")
    .pipe(webp(options))
    .pipe(dest("build/img"))
  done();
}

function versionAvif(done) {
  const options = {
    quality: 50
  };
  src("src/img/**/*{png,jpg}")
    .pipe(avif(options))
    .pipe(dest("build/img"))
  done();
}

function javascript(done) {
  src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));
  done()
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}

exports.css = css;
exports.js = javascript;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(images, versionWebp, versionAvif, javascript, dev);