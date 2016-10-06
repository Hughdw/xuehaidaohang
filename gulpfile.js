//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径

//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    browserSync = require('browser-sync').create(),
    tmodjs = require('gulp-tmod'),
    amdOptimize = require('amd-optimize'),//require的模块包装插件
    eventstream = require('event-stream'),//在一个task钟整合多个文件来源
    htmlmin = require('gulp-htmlmin'),//HTML压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concatFile = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify'),//提示信息
    rev = require('gulp-rev'),//添加MD5后缀
    revCollector = require('gulp-rev-collector'),//根据gulp-rev生成的路径映射进行替换
    replace = require('gulp-replace');//字符串替换


// 构建在生产环境运行的项目文件
gulp.task('build',['jsbuild','cssbuild-all','rev','move-libs','move-img']);
//定义默认任务
gulp.task('default',['browser-sync','tmodWatch']);


// 静态服务器
gulp.task('browser-sync',function() {
  var files = [
    './*.html',
    './static/css/**/*.css',
    './gulpfile.js',
    './static/tpl/**/*.js',
    './views/**/*.html'
    // './static/**/*.js'
  ];
  browserSync.init(files,{
        server: {// 创建一个基本的HTML/JS/CSS服务器
            baseDir: './'
        },
        online:false, //不会尝试确定你的网络状况
        open:false //停止自动打开浏览器
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

// 监听文件改动，执行对应的任务
gulp.task('tmodWatch',function() {
  gulp.watch('./template/**/*.html',['tmod'],function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});



// 批量构建页面相关的js
gulp.task('jsbuild-all',function() {
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

// 页面相关js的 包装require模块，合并，压缩，添加md5后缀并提取路径映射
gulp.task('jsbuild',function() {
  // body...
  return gulp.src('static/js/**/*.js')
    .pipe(amdOptimize('personal-account',{
      configFile:'static/js/config.js',
      findNestedDependencies:true,//找到嵌套依赖关系
      include:false,
      exclude:['jquery','bootstrap']
    }))
    .pipe(replace("baseUrl: '/static/js'","baseUrl: '/assets/js'"))
    .pipe(replace('static/','assets/'))
    .pipe(concatFile('personal-account.js'))//合并的文件名称
    .pipe(gulp.dest('./dist/assets/js'))
    // .pipe(rename({suffix:'.min'}))
    // .pipe(uglify())//js压缩
    .pipe(rev())
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(rev.manifest({
      path:'personal-account.json',
      merge: true //与当前名单合并
    }))//生成路径映射
    .pipe(gulp.dest('./dist/rev/js'));
});

// 页面相关CSS的
gulp.task('cssbuild-all',function() {
  // body...
  var pipes = [];
  pipes.push(
    gulp.src('static/css/common.css')
      // .pipe(rename({suffix:'.min'}))
      .pipe(minifycss())
      .pipe(rev())
      .pipe(gulp.dest('dist/assets/css'))
      .pipe(rev.manifest({
        path:'common.json'
      }))
      .pipe(gulp.dest('./dist/rev/css'))
  );

  var cssDir = ['course','forgotpassword','pay','personal'];
  for (var i = 0; i < cssDir.length; i++) {
    pipes.push(
      gulp.src('static/css/'+cssDir[i]+'/*base.css')
        // .pipe(concatFile(cssDir[i]+'-base.css'))//合并的文件名称
        // .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('dist/assets/css/'+cssDir[i]+'/'))
        .pipe(rev.manifest({
          path:cssDir[i]+'-base.json'
        }))
        .pipe(gulp.dest('./dist/rev/css'))
    );
    pipes.push(
      gulp.src('static/css/'+cssDir[i]+'/*sm-lg.css')
        // .pipe(concatFile(cssDir[i]+'-sm-lg.css'))//合并的文件名称
        // .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('dist/assets/css/'+cssDir[i]+''))
        .pipe(rev.manifest({
          path:cssDir[i]+'-sm-lg.json'
        }))
        .pipe(gulp.dest('./dist/rev/css'))
    );
  }

  eventstream.merge(pipes)
    .on('end',function() {
      notify({message:'css build ok'});
  });
});

// 根据 gulp-rev提供的路径映射文件替换HTML文件中的文件名
// gulp-replace替换路径
// 压缩HTML文件
gulp.task('rev',['jsbuild','cssbuild-all'],function() {
  // body...
  return gulp.src(['./dist/rev/**/*.json','*.html'])
    .pipe(revCollector())
    .pipe(replace('static/css/','assets/css/'))
    .pipe(replace('static/js/','assets/js/'))
    // .pipe(htmlmin(
    //   {
    //     collapseWhitespace:true,//压缩HTML
    //     removeComments:true,//清楚HTML注释
    //     collapseBooleanAttributes:true,//省略布尔属性的值
    //     removeEmptyAttributes:true//删除空属性值
    //   }
    // ))
    .pipe(gulp.dest('./dist'));
});

// 移动libs
gulp.task('move-libs',function() {
  // body...
  gulp.src('./static/js/libs/**/**')
    .pipe(gulp.dest('./dist/assets/js/libs'));
});
// 移动相关图片
gulp.task('move-img',function() {
  // body...
  gulp.src('./static/img/**/?(*.jpg|*.png|*.gif)')
    .pipe(gulp.dest('./dist/assets/img'));
});



