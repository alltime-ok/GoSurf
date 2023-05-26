const { src, dest, watch, parallel, series } = require("gulp");

const concat = require("gulp-concat");
const autoprefixert = require("gulp-autoprefixer");
const scss = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();
const avif = require("gulp-avif");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const svgSprite = require("gulp-svg-sprite");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const include = require("gulp-include");

function pages() {
  return src("app/pages/*.html")
    .pipe(
      include({
        includePaths: "app/components",
      })
    )
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src("app/fonts/src/*.*")
    .pipe(
      fonter({
        formats: ["woff", "ttf"],
      })
    )
    .pipe(src("app/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("app/fonts"));
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixert({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/slick-carousel/slick/slick.js",
    "app/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}


function images() {
  return src(["app/images/src/*.*", "!app/images/src/*.svg"])
    .pipe(newer("app/images"))
    .pipe(avif({ quality: 50 }))

    .pipe(src("app/images/src/*.*"))
    .pipe(newer("app/images"))
    .pipe(webp())

    .pipe(src("app/images/src/*.*"))
    .pipe(newer("app/images"))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("app/images"));
}

function sprite() {
  return src("app/images/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("app/images"));
}

function building() {
  return src(
    [
      "app/**/*.html",
      "app/images/*.*",
      "!app/images/*.svg",
      "!app/images/stack",
      "app/images/sprite.svg",
      "app/css/style.min.css",
      "app/fonts/*.*",
      "app/js/main.min.js",
    ],
    {
      base: "app",
    }
  ).pipe(dest("dist"));
}

function cleanDist() {
  return del("dist");
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "app",
    },
    notify: false,
  });
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/images/src"], images);
  watch(["app/components/*", "app/pages/*"], pages);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.building = building;
exports.fonts = fonts;
exports.pages = pages;
exports.sprite = sprite;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, building);
exports.default = parallel(styles, scripts, pages, watching);
