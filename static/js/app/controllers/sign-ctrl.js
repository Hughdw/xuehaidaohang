/**
 * 登录/注册应用的控制器
 */
angular.module('signApp')
.constant('ACTIVE_CLASS', 'active')
/* 顶级控制器 */
.controller('topCtrl', function ($scope) {
  var top = $scope.top = {};
  // 关闭登录窗口的方法
  top.closeSignModal = function () {
    !!parent.globalModule && parent.globalModule.closeModal();
  };
})
/* 注册界面的总控制器 */
.controller('registerCtrl', function ($scope, $interval, ACTIVE_CLASS, apiService) {
  var regData = $scope.regData = {
    currentTab: 0, // 切换注册方式
    getCaptcha: apiService.getImgCaptcha()// 获取验证码
  };
  var user = $scope.user = {
    account: '',
    password: '',
    confirmpassword: '',
    accountType: ''
  };
  // 切换标签的当前选择样式
  regData.getActiveClass = function (num) {
    return num === regData.currentTab ? ACTIVE_CLASS : '';
  };
  // 切换 标签页内容的方法
  regData.switchTab = function (num) {
    regData.currentTab = num;
  };
  // 刷新验证码
  regData.reloadCaptcha = function () {
    regData.getCaptcha = apiService.getImgCaptcha();
  };

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
// 手机注册控制器
.controller('mobileCtrl', function ($scope, $interval, apiService) {
  var mobileData = $scope.mobileData = {};
  $scope.user.accountType = 'mobile';
  // 验证码按钮 文字切换
  var aBtnTxt = ['获取验证码', '正在发送'];
  var smsBtn = $scope.smsBtn = {};
  // 设置初始状态
  smsBtn.default = function () {
    smsBtn.isShow = true;// 获取验证码按钮 显示开关
    smsBtn.isDis = false;// 获取验证码按钮 是否禁用
    smsBtn.txt = aBtnTxt[0];// 要显示的按钮文字
    smsBtn.countDown = 30;// 倒计时总秒数
  };
  smsBtn.default();

  mobileData.getMobileCode = function (mobile) {
    var nTotal = smsBtn.countDown;
    var vIntervalId;
    smsBtn.isDis = true;
    smsBtn.txt = aBtnTxt[1];
    apiService.getMobileCode(1, mobile).then(
      function (success) {
        smsBtn.isShow = false;
        vIntervalId = $interval(function () {
          if (nTotal < 0) return;
          nTotal--;
          smsBtn.countDown = nTotal;
          if (nTotal === 0) smsBtn.default();
        }, 1000, smsBtn.countDown);
      },
      function () {
        smsBtn.default();
      }
    );
  };
})
// 邮箱注册控制器
.controller('emailCtrl', function ($scope, $interval, apiService) {
  var emailData = $scope.emailData = {};
  $scope.user.accountType = 'email';
  // 验证码按钮 文字切换
  var aBtnTxt = ['获取验证码', '正在发送'];
  var mailBtn = $scope.mailBtn = {};
  // 设置初始状态
  mailBtn.default = function () {
    mailBtn.isShow = true;// 获取验证码按钮 显示开关
    mailBtn.isDis = false;// 获取验证码按钮 是否禁用
    mailBtn.txt = aBtnTxt[0];// 要显示的按钮文字
    mailBtn.countDown = 30;// 倒计时总秒数
  };
  mailBtn.default();

  emailData.getMailCode = function (email) {
    var nTotal = mailBtn.countDown;
    var vIntervalId;
    mailBtn.isDis = true;
    mailBtn.txt = aBtnTxt[1];
    apiService.getMailCode(1, email).then(
      function (success) {
        mailBtn.isShow = false;
        vIntervalId = $interval(function () {
          if (nTotal < 0) return;
          nTotal--;
          mailBtn.countDown = nTotal;
          if (nTotal === 0) mailBtn.default();
        }, 1000, mailBtn.countDown);
      },
      function () {
        mailBtn.default();
      }
    );
  };
})
// 登录控制器
.controller('loginCtrl', function ($scope, apiService, submitForm) {
  var loginUser = $scope.users = {
    type: '', // 账号登录方式
    account: '',
    password: ''
  };
  $scope.login = function (formIsValid, user) {
    // 表单通过规则验证后，才能进行提交
    if (formIsValid) {
      apiService.login(user.type, user.account, user.password).then(
        function (success) {
          console.log(success.data[0].token);
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
