angular.module('formCheck', [])
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
        scope.$watch(iAttrs.ngModel, function(newValue, oldValue) {
          // console.log(ctrl);
          // 输入的验证码没有通过控制器验证时为undefined
          if (!newValue) {
            // 验证码格式不正确或者验证请求未返回时，隐藏提醒标识
            scope.vm.verifyCallback[iAttrs.ensureCorrect] = false;
            return;
          }
          // iAttrs.ensureCorrect 获取实例元素上的ensure-correct属性值
          // 通过ensure-correct属性值在verifyCode中进一步筛选请求的参数
          CAPTCHAService.verifyCode(iAttrs.ensureCorrect, ctrl.$modelValue).then(
            function(seccess) {
              // XHR请求成功后，显示提醒标示
              scope.vm.verifyCallback[iAttrs.ensureCorrect] = true;
              ctrl.$setValidity('correct', true);
            },
            function(error) {
              // XHR请求成功后，显示提醒标示
              scope.vm.verifyCallback[iAttrs.ensureCorrect] = true;
              ctrl.$setValidity('correct', false);
            }
          );
        });
      }
    };
  })
  .directive("pdConfirm", function() {
    return {
      require: "ngModel",
      link: function(scope, iEle, iAttrs, ctrl) {
        if (ctrl) {
          // 获取 $formController 表单控制器下的 密码框控制器（[iAttrs.pdConfirm]的值指向将要进行相等判断的password控件）
          var otherInput = iEle.inheritedData("$formController")[iAttrs.pdConfirm];
          var confirmValidator = function(value) {
            // 判断value 与 密码框的值是否相等。
            // 其中value在$parsers分析程序中自动传入
            var validity = value === otherInput.$viewValue;
            // 向当前自定义指令所在控制器 设置验证的状态，并通知表单。
            ctrl.$setValidity("confirm", validity);
            return validity ? value : undefined;
          };
          // 向分析程序 $parsers中加入一个新的验证函数
          ctrl.$parsers.push(confirmValidator);
          //
          ctrl.$formatters.push(confirmValidator);
          // 向密码输入框控制器的分析程序中加入一个验证函数
          // 函数用来实时判断密码输入框中的值与密码确认输入框中的值是否相等，并设置验证的状态
          otherInput.$parsers.push(function(value) {
            ctrl.$setValidity("confirm", value === ctrl.$viewValue);
            return value;
          });
        }
      }
    };
  });
