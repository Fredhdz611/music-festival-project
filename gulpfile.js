const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
  //Identificar el archivo SASS
  //Compilarlo
  //Almacenarlo
  src("src/scss/app.scss")
    .pipe(sass())
    .pipe(dest("build/css"));
  done(); //Callback que avisa a gulp que se llego al final.
}

function dev(done) {
  watch("src/scss/app.scss", css)
  done();
}

exports.css = css;
exports.dev = dev;