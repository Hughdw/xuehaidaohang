//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径

//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    browserSync = require('browser-sync').create(),
    tmodjs = require('gulp-tmod');

// 静态服务器
gulp.task('browser-sync',function() {
  var files = [
    './*.html',
    './static/css/*.css',
    './gulpfile.js',
    './static/tpl/**/*.js',
    './views/**/*.html'
    // './static/**/*.js'
  ];
  browserSync.init(files,{
        server: {
            baseDir: './'
        }
  });
});

gulp.task('tmod',function() {
  //将src获取到的流 导入到tmodjs
  var stream = gulp.src('./template/**/*.html')
          .pipe(tmodjs({
            output:'./static/tpl',
            // runtime:'tpl.js',
            templateBase:'template',
            syntax:'native',
            debuge:true,
            cache:true,
            type:'amd',
            minify:false
          }))//设置模板文件的文件名
          // .pipe(gulp.dest('./static'));//输出路径
  return stream;
});

// 代理
// 当有现成的本地服务器时，可以设置proxy指向自己当前的域名或者IP
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: '你的域名或IP'
//     });
// });



//定义一个Less任务（自定义任务名称）
// 速度有点慢，不如koala
// gulp.task('less2css', function() {
//    gulp.src(['./less/page/*.less','!./less/page/**/{variables,template,template-sm-lg}.less','!./less/page/koala-config.json']) //该任务针对的文件
//       .pipe(sourcemaps.init())
//       .pipe(less({
//             paths: [path.join('/less', 'bootstrap')]
//         })) //该任务调用的模块
//       .pipe(sourcemaps.write('./static/css'))
//       .pipe(gulp.dest('./')); //以CSS生成目录为根目录
// });
//
// 监听文件改动，执行对应的任务
gulp.task('tmodWatch',function() {
  gulp.watch('./template/**/*.html',['tmod'],function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default',['browser-sync','tmodWatch']); //定义默认任务
