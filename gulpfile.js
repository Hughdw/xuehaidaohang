//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径

//导入工具包 require("node_modules里对应模块")
var gulp = require("gulp"), //本地安装gulp所用到的地方
    browserSync = require("browser-sync").create();

// 静态服务器
gulp.task("browser-sync",function() {
  var files = [
    "./*.html",
    "./static/css/*.css",
    "./static/**/*.js"
  ];
  browserSync.init(files,{
        server: {
            baseDir: "./"
        }
  });
});

// 代理
// 当有现成的本地服务器时，可以设置proxy指向自己当前的域名或者IP
// gulp.task("browser-sync", function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });



//定义一个Less任务（自定义任务名称）
// 速度有点慢，不如koala
// gulp.task("less2css", function() {
//    gulp.src(["./less/page/*.less","!./less/page/**/{variables,template,template-sm-lg}.less","!./less/page/koala-config.json"]) //该任务针对的文件
//       .pipe(sourcemaps.init())
//       .pipe(less({
//             paths: [path.join("/less", "bootstrap")]
//         })) //该任务调用的模块
//       .pipe(sourcemaps.write("./static/css"))
//       .pipe(gulp.dest("./")); //以CSS生成目录为根目录
// });
//
// // less编译监听
// gulp.task("lessWatch",function() {
//   gulp.watch("./less/**/*.less",["less2css"]);// 当less下以及子文件夹下的所有less文件发生变化时，调用less2css任务。
// });



gulp.task("default",["browser-sync"]); //定义默认任务
