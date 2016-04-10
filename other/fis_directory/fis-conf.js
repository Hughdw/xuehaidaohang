//开启HTML中的声明依赖
fis.match('*.html', {
    useMap: true
});
// 使用插件
fis.match('**.less', {
  parser: fis.plugin('less'),
  rExt:'.css'
})
// 加 md5
fis.match('*.{js,less,css,png}', {
   useHash: true
});

// 某些资源不产出
fis.match('.inline.css', {
  // 设置 release 为 FALSE，不再产出此文件
  release: false
})
// 某些资源从构建中去除
fis.set('project.ignore', [
  'tmp/**',
  'lib/**'
]);




// 资源定位
// fis.config.set('roadmap.path', [
//     {
//         //正则匹配【/static/**】文件，并将views后面的路径捕获为分组1
//         reg : /^\/static\/(.*)$/i,
//         //发布到 /assets/common/ 分组1 路径下
//         release : '/assets/common/$1'
//     }
// ]);


fis.match('/static/less/(**.less)',{
    release: '/assets/common/css/$1'
});
fis.match('/static/js/(**.js)',{
    release: '/assets/common/js/$1'
});
// fis.match('/static/img/(*.{png,jpg})',{
//     release: '/assets/common/img/$1'
// });


fis.match('/pages/**/(*.{js,less})',{
    release: '/assets/$1'
});


// 基于页面的资源打包
// fis.match('*.{css,less}', {
//   packTo: '/static/aio.css'
// });


