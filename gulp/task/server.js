var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');
const userConfig = require('../../user.config');

// browserSync挂载,提供刷新浏览器功能
global.browserSync = browserSync;
const proxyMiddleware = userConfig.proxyConfig.map((item) => {
  return proxy(item.path, item.config);
});
gulp.task('server', function () {
  browserSync.init({
    server: './dev',
    port: userConfig.port,
    middleware: proxyMiddleware,
  });
});
