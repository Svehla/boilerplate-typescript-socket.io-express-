const gulp = require('gulp')
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')
const JSON_FILES = ['src/*.json', 'src/**/*.json']

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json')

gulp.task('compileScripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'))
})

gulp.task('watch', ['compileScripts'], () => {
  gulp.watch('src/**/*.ts', ['compileScripts'])
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'))
});

gulp.task('startServer', function() {
  nodemon({
    script: 'dist/index.js',
    ext: 'js',
  })
})

gulp.task('default', ['watch', 'assets', 'startServer']);
