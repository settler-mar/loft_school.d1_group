'use strict';

module.exports = function() {
  $.gulp.task('sass.lint', function(){
    return $.gulp.src('./source/style/**/*.scss')
      .pipe($.gp.scssLint({
        customReport: sass_lint_reporter,
        config: './gulp/lint/sass.lint.yml'
      }))
      .on("error", $.gp.notify.onError({
        title:'scss-lint'
      }));
  });
};

var sass_lint_reporter = function(file, stream) {
  if (!file.scsslint.success) {
    file.scsslint.issues.forEach(function(result) {
      var msg =
        "scss-lint "+
        ('error' === result.severity ? ('[E]: ') : '[W]: ') +
        file.relative+"\n"+
        'Line:' + (result.line) + ' ' + "\n" +
        (result.linter ? (result.linter + ': ') : '') +
        result.reason;
      stream.emit('error', new $.gp.util.PluginError('scss-lint', msg, { showProperties: false}));
    });
  }
};