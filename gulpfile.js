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
// 监听文件改动，执行对应的任务
gulp.task('tmodWatch',function() {
  gulp.watch('./template/**/*.html',['tmod'],function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

// 批量构建页面相关的js
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

// 页面相关js的 包装require模块，合并，压缩，添加md5后缀并提取路径映射
gulp.task('jsbuild',function() {
  // body...
  return gulp.src('static/js/**/*.js')
    .pipe(amdOptimize('personal-account',{
      paths:{

      },
      configFile:'static/js/config.js',
      findNestedDependencies:true,//找到嵌套依赖关系
      include:false,
      exclude:['jquery','bootstrap']
    }))
    .pipe(concatFile('personal-account.js'))//合并的文件名称
    .pipe(gulp.dest('./dist/js'))
    // .pipe(rename({suffix:'.min'}))
    .pipe(uglify())//js压缩
    .pipe(rev())
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(rev.manifest({
      // base:'dist/revs',
      merge: true //与当前名单合并
    }))//生成路径映射
    .pipe(gulp.dest('./dist/rev/js'))
    .pipe(notify({message:'personal-account.min.js ok'}));
});

// 页面相关CSS的
gulp.task('cssbuild',function() {
  // body...
  return gulp.src('static/css/common.css')
    // .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(rev())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rev.manifest({
      merge:true
    }))
    .pipe(gulp.dest('./dist/rev/css'))
    .pipe(notify({message:'common.min.css ok'}));
});

gulp.task('cssbuild-all',function() {
  // body...
  var pipes = [];

  var cssArray = ['common','course','personal','pay','index'];
  for (var i = 0; i < cssArray.length; i++) {
    pipes.push(
      gulp.src('static/css/'+cssArray[i]+'*.css')
        .pipe(concatFile(cssArray[i]+'.css'))//合并的文件名称
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/rev/css/'+cssArray[i]))
    );
  }
  //
  // pipes.push(
  //   gulp.src('static/css/common.css')
  //     .pipe(concatFile('common.css'))//合并的文件名称
  //     .pipe(minifycss())
  //     .pipe(rev())
  //     .pipe(gulp.dest('dist/assets/css'))
  //     .pipe(rev.manifest({
  //       merge:true
  //     }))
  //     .pipe(gulp.dest('./dist/rev/css'))
  // );
  // pipes.push(
  //   gulp.src('static/css/course*.css')
  //     .pipe(concatFile('course.css'))//合并的文件名称
  //     // .pipe(minifycss())
  //     .pipe(rev())
  //     .pipe(gulp.dest('dist/assets/css'))
  //     .pipe(rev.manifest({
  //       merge:true
  //     }))
  //     .pipe(gulp.dest('./dist/rev/css'))
  // );
  //
  // pipes.push(
  //   gulp.src('static/css/personal*.css')
  //     .pipe(concatFile('personal.css'))//合并的文件名称
  //     // .pipe(minifycss())
  //     .pipe(rev())
  //     .pipe(gulp.dest('dist/assets/css'))
  //     .pipe(rev.manifest({
  //       merge:true
  //     }))
  //     .pipe(gulp.dest('./dist/rev/css'))
  // );
  //
  // pipes.push(
  //   gulp.src('static/css/pay*.css')
  //     .pipe(concatFile('pay.css'))//合并的文件名称
  //     // .pipe(minifycss())
  //     .pipe(rev())
  //     .pipe(gulp.dest('dist/assets/css'))
  //     .pipe(rev.manifest({
  //       merge:true
  //     }))
  //     .pipe(gulp.dest('./dist/rev/css'))
  // );
  //
  // pipes.push(
  //   gulp.src(['static/css/index*.css'])
  //     .pipe(concatFile('index.css'))//合并的文件名称
  //     // .pipe(minifycss())
  //     .pipe(rev())
  //     .pipe(gulp.dest('dist/assets/css'))
  //     .pipe(rev.manifest({
  //       merge:true
  //     }))
  //     .pipe(gulp.dest('./dist/rev/css'))
  // );

  eventstream.merge(pipes)
    .on('end',function() {
      console.log('aaak');
      // body...
  });
});

// 根据 gulp-rev提供的路径映射文件替换HTML文件中的文件名
// gulp-replace替换路径
// 压缩HTML文件
gulp.task('rev',function() {
  // body...
  return gulp.src(['./dist/rev/**/*.json','personal-account.html'])
    .pipe(revCollector())
    .pipe(replace('static/','assets/'))
    .pipe(replace('lib/','../lib/'))
    // .pipe(replace('static/css/','../static/css/'))
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



gulp.task('build',['jsbuild','cssbuild-all']);
gulp.task('default',['browser-sync','tmodWatch']); //定义默认任务
