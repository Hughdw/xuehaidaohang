define(function (require) {
  'use strict';
  // angular.module('customControl', []).directive('contenteditable', function() {
  //   return {
  //     restrict: 'A', // 作为元素属性
  //     require: '?ngModel', // 获取ngModelController
  //     link: function(scope, element, attrs, ngModel) {
  //       if (!ngModel) return; // 如果没有ng-model则什么都不做
  //       // 指定UI的更新方式
  //       ngModel.$render = function() {
  //         element.html(ngModel.$viewValue || '');
  //       };
  //
  //       // 监听change事件来开启绑定
  //       element.on('blur keyup change', function() {
  //         scope.$apply(read);
  //       });
  //       read(); // 初始化
  //
  //       // 将数据写入model
  //       function read() {
  //         var html = element.html();
  //         // 当我们清空div时浏览器会留下一个<br>标签
  //         // 如果制定了strip-br属性，那么<br>标签会被清空
  //         if (attrs.stripBr && html == '<br>') {
  //           html = '';
  //         }
  //         ngModel.$setViewValue(html);
  //       }
  //     }
  //   };
  // });
});
