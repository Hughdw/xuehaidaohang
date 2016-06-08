//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径

//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    browserSync = require('browser-sync').create(),
    tmodjs = require('gulp-tmod'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concatFile = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify'),//提示信息
    amdOptimize = require('amd-optimize'),
    eventstream = require('event-stream'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    replace = require('gulp-replace');

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

// tmod转换模板文件的任务
gulp.task('tmod',function() {
  //将src获取到的流 导入到tmodjs
  var stream = gulp.src('./template/**/*.html')
          .pipe(tmodjs({
            output:'./static/js/tpl',
            // runtime:'tpl.js',
            templateBase:'template',
            syntax:'native',
            debuge:true,
            cache:true,
            type:'amd',
            minify:false
          }));
          //设置模板文件的文件名
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
gulp.task('jsbuild-a',function() {
  // body...
  var pipes = [];
  pipes.push(
    gulp.src('./static/js/**/*.js')
      .pipe(amdOptimize('personal-account',{
        configFile:'static/js/config.js',
        findNestedDependencies:true,//找到嵌套依赖关系
        include:false,
        exclude:['jquery','bootstrap']
      }))
      .pipe(concatFile('personal-account.js'))//合并的文件名称
      .pipe(gulp.dest('./dist/js/'))
  );


  eventstream.merge(tasks)
    .on('dne',callback);
});


gulp.task('jsbuild',function() {
  // body...
  return gulp.src('./static/js/**/*.js')
    .pipe(amdOptimize('personal-account',{
      configFile:'static/js/config.js',
      findNestedDependencies:true,//找到嵌套依赖关系
      include:false,
      exclude:['jquery','bootstrap']
    }))
    .pipe(concatFile('personal-account.js'))//合并的文件名称
    .pipe(gulp.dest('./dist/js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./dist/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./dist/rev'))
    .pipe(notify({message:'personal-account.min.js ok'}));
});

gulp.task('rev',function() {
  // body...
  return gulp.src(['./dist/rev/**/*.json','personal-account.html'])
    .pipe(revCollector())
    .pipe(replace('static/js/','js/'))
    .pipe(replace('lib/','../lib/'))
    .pipe(replace('static/css/','../static/css/'))
    // .pipe(htmlmin(
    //   {
    //     collapseWhitespace:true,//压缩HTML
    //     removeComments:true,//清楚HTML注释
    //     collapseBooleanAttributes:true,//省略布尔属性的值
    //     removeEmptyAttributes:true//删除空属性值
    //   }
    // ))
    .pipe(gulp.dest('./dist'))
    .pipe(notify({message:'html revCollector and min ok'}));
});


// 监听文件改动，执行对应的任务
gulp.task('tmodWatch',function() {
  gulp.watch('./template/**/*.html',['tmod'],function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default',['browser-sync','tmodWatch']); //定义默认任务
