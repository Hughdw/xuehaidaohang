angular.module('formCheck',[])
// 通过请求API接口，验证输入的验证码是否正确
.directive('ensureCorrect', function(CAPTCHAService) {
  return {
    //依赖ngModel数据模型
    require: 'ngModel',
    // 监控属性mgModel是否发生变化
    // 问题：现在为什么只有当表单的验证规则通过后才会触发ngModel发生变化。
    // 回答：link函数中的controller会将$viewValue（视图值）通过验证函数（验证器生成的）的筛选，筛选通过后才会赋值给$modeValue（模型值），即ng-model，ng-model发生变化时$watch才能监控到并触发回调
    link: function(scope, iEle, iAttrs, ctrl) {
      // 设置ensureCorrect默认是错误的，是为了防止下一步按钮的禁用状态在短时间内出现切换
      // 因为输入完验证码，浏览器请求到服务器返回之间会短时间出现 mobileForm.$invalid 为false，因为这时候除了$error.correct之外，其他$error都是false。
      ctrl.$error.correct = true;
      scope.$watch(iAttrs.ngModel, function(newValue,oldValue) {
        console.log(ctrl);
        // 输入的验证码没有通过控制器验证时为undefined
        if (!newValue) {
          // 验证码格式不正确或者验证请求未返回时，隐藏提醒标识
          scope.mobileData.verifyCallback[iAttrs.ensureCorrect] = false;
          return;
        }
        // iAttrs.ensureCorrect 获取实例元素上的ensure-correct属性值
        CAPTCHAService.verifyCode(iAttrs.ensureCorrect,ctrl.$viewValue).then(
          function(seccess) {
            // XHR请求成功后，显示提醒标示
            scope.mobileData.verifyCallback[iAttrs.ensureCorrect] = true;
            ctrl.$setValidity('correct', true);
          },
          function(error) {
            // XHR请求成功后，显示提醒标示
            scope.mobileData.verifyCallback[iAttrs.ensureCorrect] = true;
            ctrl.$setValidity('correct', false);
          }
        );
      });
    }
  };
});
