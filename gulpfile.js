const arronagrid = "node_modules/@andresarronamontoya/arronagrid";
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync');
const cssnano = require('cssnano');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const server = browsersync.create();

const processors =[
  cssnano,
  autoprefixer({
    grid:true
  })
]

gulp.task('styles', ()=>{
  gulp.src('./Style.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(plumber())
    .pipe(sass({includePaths: [arronagrid]}))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(server.stream({match: '**/*.css'}))
});

gulp.task('ES6', ()=>{
    return gulp.src("Main.js")
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat("Main.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./js'))
});

gulp.task('default', ['styles'], ()=>{
    server.init({
        watch:true,
        server:{
            baseDir:'./'
        },
    },);

    gulp.watch('./*.html').on('change', server.reload);
    watch('./*.scss', () => gulp.start('styles'));
    watch('./*.js', ()=>gulp.start('ES6'));
});


