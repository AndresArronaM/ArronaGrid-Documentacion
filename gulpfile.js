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
const pug = require('gulp-pug');
const tilder = require('node-sass-tilde-importer');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const sitemap = require('gulp-sitemap');

const server = browsersync.create();

const processors =[
  cssnano,
  autoprefixer({
    grid:true
  })
]

/// Modo Desarrollo
gulp.task('styles-dev',()=>{
    return gulp.src('./src/SCSS/Style.scss')
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(plumber())
      .pipe(sass({
          importer:tilder,
          outputStyle:'expanded'
        }))
      .pipe(postcss(processors))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./Public/css/'))
      .pipe(server.stream({match: './src/SCSS/**/*.scss'}))
});

gulp.task('pug-dev',()=>{
    return gulp.src('./src/Pug/Views/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty:true,
            basedir:'./src/Pug'
        }))
        .pipe(gulp.dest('./Public/Views/'))
        .pipe(server.stream({match: './src/Pug/Views/*.pug'}))
});

gulp.task('index-dev',()=>{
    return gulp.src('./src/Pug/Index.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty:true,
            basedir:'./src/pug'
        }))
        .pipe(gulp.dest('./Public/'))
        .pipe(server.stream({match: './src/Pug/Index.pug'}))
});

gulp.task('scripts-dev', ()=>{
    return gulp.src("./src/JavaScript/Main.mjs")
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat("Main.mjs"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./Public/JavaScript/'))
        .pipe(server.stream({match: './src/JavaScript/**/*.mjs'}))
});

gulp.task('dev', gulp.series('index-dev','pug-dev','styles-dev',/*'scripts-dev',*/ (cb)=>{
    server.init({
        watch:true,
        server:{
            baseDir:'./Public'
        }
    });

    gulp.watch('./**/**/*.html').on('change', server.reload);
    watch('./src/Pug/index.pug',gulp.series('index-dev')).on('change', server.reload);
    watch('./src/Pug/Views/*.pug',gulp.series('pug-dev')).on('change', server.reload);
    watch('./src/SCSS/**/*.scss',gulp.series('styles-dev')).on('change', server.reload);
    watch('./src/JavaScript/**/*.js',gulp.series('scripts-dev')).on('change', server.reload);

    cb()
}));

/// Modo Produccion
gulp.task('styles-build',()=>{
    return gulp.src('./src/SCSS/Style.scss')
      .pipe(plumber())
      .pipe(sass({
          importer:tilder,
          outputStyle:'expanded'
        }))
      .pipe(postcss(processors))
      .pipe(gulp.dest('./Public/css/'))
});

gulp.task('pug-build',()=>{
    return gulp.src('./src/Pug/Views/*.pug')
        .pipe(plumber())
        .pipe(pug({
            basedir:'./src/Pug'
        }))
        .pipe(gulp.dest('./Public/Views/'))
        .pipe(server.stream({match: './src/Pug/Views/*.pug'}))
});

gulp.task('index-build',()=>{
    return gulp.src('./src/Pug/index.pug')
        .pipe(plumber())
        .pipe(pug({
            basedir:'./src/Pug'
        }))
        .pipe(gulp.dest('./Public/'))
        .pipe(server.stream({match: './src/Pug/Index.pug'}))
});

gulp.task('scripts-build', ()=>{
    return gulp.src("./Public/JavaScript/Main.js")
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat("Main.js"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./Public/JavaScript/'))
        .pipe(server.stream({match: './Public/JavaScript/**/*.js'}))
});

gulp.task('sitemap',()=>{
    return gulp.src('./Public/**/*.html',{
        read:false
    })
        .pipe(sitemap({
            siteUrl:''
        }))
        .pipe(gulp.dest('./public'))
})

gulp.task('build',gulp.parallel('index-build','pug-build','styles-build','scripts-build','sitemap'));

/// Modo Minificado
gulp.task('styles-min',()=>{
    return gulp.src('./src/SCSS/Style.scss')
      .pipe(plumber())
      .pipe(sass({
          importer:tilder,
          outputStyle:'expanded'
        }))
      .pipe(postcss(processors))
      .pipe(rename('Style.min.css'))
      .pipe(gulp.dest('./Public/css/'))
});

gulp.task('scripts-min', ()=>{
    return gulp.src("./Public/JavaScript/Main.js")
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat("Main.js"))
        .pipe(minify({
            ext:{
                src:'.js',
                min:'-min.js'
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./Public/JavaScript/'))
        .pipe(server.stream({match: './Public/JavaScript/**/*.js'}))
});

gulp.task('min',gulp.parallel('styles-min','scripts-min'));

