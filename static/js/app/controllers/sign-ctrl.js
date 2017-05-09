/**
 * @title 登录/注册的控制器
 * @fileOverView 本文件是sign.html的控制器，主要用来实现登录/注册相关的业务逻辑和视图控制。
 * @author whdstyle@gmail.com
 */
angular.module('signApp')
// ************************************
// 顶级控制器
// ************************************
.controller('topCtrl', function ($scope) {
  var top = $scope.top = {};
  // 关闭登录窗口的方法
  top.closeSignModal = function () {
    !!parent.globalModule && parent.globalModule.closeModal();
  };
})
// ************************************
// 二级控制器 - 注册界面
// ************************************
.controller('registerCtrl', function ($scope, $interval, apiService) {
  /** 表单数据 */
  var user = $scope.user = {
    account: '',
    password: '',
    confirmpassword: '',
    accountType: ''
  };

  /** 行为和视图控制 */
  var regData = $scope.regData = {
    currentTab: 'mobile', // 切换注册方式
    switchActive: 'mobile',
    getCaptcha: apiService.getImgCaptcha()// 获取验证码
  };

  // 切换 标签页内容和选择样式
  regData.switchTab = function (type) {
    regData.currentTab = regData.switchActive = type;
  };
  // 刷新验证码
  regData.reloadCaptcha = function () {
    regData.getCaptcha = apiService.getImgCaptcha();
  };
  // 提交注册
  regData.register = function (type) {
    apiService.register(type, user.account, user.password, user.confirmpassword).then(
      function (success) {
        alert(success.message);
      },
      function (error) {
        alert(error.message);
      }
    );
  };
})
// ************************************
// 子控制器 - 手机注册
// ************************************
.controller('mobileCtrl', function ($scope, $interval, BUTTON_TEXT, TOTAL_COUNT_DOWN, apiService) {
  var mobileData = $scope.mobileData = {};
  $scope.user.accountType = 'mobile';
  var smsBtn = $scope.smsBtn = {};
  // 设置初始状态
  smsBtn.default = function () {
    smsBtn.switchShow = true;// 获取验证码按钮 显示开关
    smsBtn.isDis = false;// 获取验证码按钮 是否禁用
    smsBtn.txt = BUTTON_TEXT.default;// 要显示的按钮文字
    smsBtn.countDown = TOTAL_COUNT_DOWN;// 倒计时总秒数
  };
  smsBtn.default();

  var timer;
  // 获取手机有验证码
  mobileData.getMobileCode = function (mobile) {
    var nTotal = TOTAL_COUNT_DOWN;
    smsBtn.isDis = true;
    smsBtn.txt = BUTTON_TEXT.sending;
    apiService.getMobileCode(1, mobile).then(
      function (success) {
        smsBtn.switchShow = false;
        // 倒计时
        timer = $interval(function () {
          nTotal--;
          smsBtn.countDown = nTotal;
        }, 1000, TOTAL_COUNT_DOWN);
        timer.then(done);
        function done () {
          smsBtn.default();
        }
      },
      function () {
        smsBtn.default();
      }
    );
  };
  // 清除timer
  $scope.$on('$destroy', function (event) {
    $interval.cancel(timer);
  });
})
// ************************************
// 子控制器 - 邮箱注册
// ************************************
.controller('emailCtrl', function ($scope, $interval, TOTAL_COUNT_DOWN, BUTTON_TEXT, apiService) {
  var emailData = $scope.emailData = {};
  $scope.user.accountType = 'email';

  var mailBtn = $scope.mailBtn = {};
  // 设置初始状态
  mailBtn.default = function () {
    mailBtn.switchShow = true;// 获取验证码按钮 显示开关
    mailBtn.isDis = false;// 获取验证码按钮 是否禁用
    mailBtn.txt = BUTTON_TEXT.default;// 要显示的按钮文字
    mailBtn.countDown = TOTAL_COUNT_DOWN;// 倒计时总秒数
  };
  mailBtn.default();

  var timer;
  emailData.getMailCode = function (email) {
    var nTotal = TOTAL_COUNT_DOWN;
    mailBtn.isDis = true;
    mailBtn.txt = BUTTON_TEXT.sending;
    apiService.getMailCode(1, email).then(
      function (success) {
        mailBtn.switchShow = false;
        // 倒计时
        timer = $interval(function () {
          nTotal--;
          mailBtn.countDown = nTotal;
        }, 1000, TOTAL_COUNT_DOWN);
        timer.then(done);
        function done () {
          mailBtn.default();
        }
      },
      function () {
        mailBtn.default();
      }
    );
  };
  $scope.$on('$destroy', function (event) {
    $interval.cancel(timer);
  });
})
// ************************************
// 二级控制器 - 登录界面
// ************************************
.controller('loginCtrl', function ($scope, apiService, submitForm) {
  var loginUser = $scope.users = {
    type: '', // 账号登录方式
    account: '',
    password: ''
  };
  var ngEle = angular.element(document.getElementById('signin-account'));
  console.log(ngEle);
  var ngScope = ngEle.scope();
  console.log(ngScope);
  $scope.login = function (formIsValid, user) {
    // 表单通过规则验证后，才能进行提交
    if (formIsValid) {
      apiService.login(user.type, user.account, user.password).then(
        function (success) {
          // 把token传递到调用登录窗口的页面
          parent.globalModule.tempToken(success.data[0].token);
          // 登录成功后，关闭窗口
          parent.globalModule.closeModal();
        },
        function (error) {
          // 登录失败
          // 显示密码错误提示
          var passwordError = error.code === 401;
          submitForm.checkPasswordInput('submit', passwordError);
        }
      );
    } else {
      // 验证表单输入数据，显示提示
      submitForm.checkAccountInput('submit');
      submitForm.checkPasswordInput('submit');
    }
  };
});
