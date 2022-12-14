const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const sync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const del = require('del');
const svgstore = require('gulp-svgstore');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const styles = () => {
  return gulp.src('source/sass/styles.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(postcss([
      csso()
      ]))
    .pipe(sourcemap.write('.'))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

const html = () => {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'));
}

exports.html = html;

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

const images = () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(imagemin([
      imagemin.mozjpeg({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
    ]))
    .pipe(gulp.dest('build/img'));
}

exports.images = images;

const createWebp = () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(webp({quality: 100}))
    .pipe(gulp.dest('build/img'))
}

exports.createWebp = createWebp;

const sprite = () => {
  return gulp.src("source/img/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

const copy = (done) => {
  return gulp.src(
    [
      'source/fonts/*.{woff2,woff}',
      'source/*.ico',
      'source/img/*.{jpg,png,svg}',
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'))
  done();
}

exports.copy = copy;

const vendors = (done) => {
  return gulp.src(
    [
      'source/js/vendors/*.js'
    ], {
      base: 'source/js/vendors'
    })
    .pipe(gulp.dest('build/js'))
  done();
}

exports.vendors = vendors;

const clean = () => {
  return del('build');
}

exports.clean = clean;

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const reload = (done) => {
  sync.reload();
  done();
}

exports.reload = reload;

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

exports.watcher = watcher;

const build = gulp.series(clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    vendors,
    copy,
    images,
    createWebp
  )
);

exports.build = build;

exports.default = gulp.series(clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    vendors,
    copy,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
