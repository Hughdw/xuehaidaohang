/**
 * @title 找回密码的控制器
 * @fileOverView 本文件是forgot-password.html的控制器，主要用来实现找回密码相关的业务逻辑和视图控制。
 * @author whdstyle@gmail.com
 */
angular.module('findPDApp')
// ************************************
// 常量定义
// ************************************
// constant() 方法总会在所有配置块之前被执行，可以将一个常量注册为服务，该服务可以注入到应用的其他部分使用
// 计时器的计时总数
.constant('TOTAL_COUNT_DOWN', 30)
// 验证码按钮 文字切换
.constant('BUTTON_TEXT', {
  default: '获取验证码',
  sending: '正在发送'
})
// ************************************
// 总控制器
// ************************************
.controller('appCtrl', function ($scope, apiService) {
  var vm = $scope.vm = {
    getCaptcha: apiService.getImgCaptcha(),
    verifyCallback: {// 记录验证码的请求是否返回，//用于视图中错误提示是否显示的判断
      img: false,
      mobile: false,
      email: false
    },
    account: '', // 记录找回密码的账号，通过ng-model同步
    accountType: ''// 找回密码的账号类型
  };
  // // 图片验证码
  // $scope.getCaptcha = apiService.getImgCaptcha();
  // 刷新验证码
  vm.reloadCaptcha = function () {
    vm.getCaptcha = apiService.getImgCaptcha();
  };
})

// ************************************
// 子控制器 - 密码找回方式选择
// ************************************
.controller('selectTypeCtrl', function ($scope) {
  var findType = $scope.findType = {
    select: 'mobile'
  };
})

// ************************************
// 子控制器 - 通过手机找回密码相关
// ************************************
.controller('mobileCtrl', function ($scope, $interval, TOTAL_COUNT_DOWN, BUTTON_TEXT, apiService) {
  var mobileData = $scope.mobileData = {
    currentStep: 0 // 当前步骤，同时作为TAB active类的判断依据
  };
  // 设置账号类型
  $scope.vm.accountType = 'mobile';

  // 控制 获取验证码按钮 的状态
  var smsBtn = $scope.smsBtn = {};
  // 设置初始状态
  smsBtn.default = function () {
    smsBtn.switchShow = true;// 获取验证码按钮 显示开关
    smsBtn.isDis = false;// 获取验证码按钮 是否禁用
    smsBtn.txt = BUTTON_TEXT.default;// 要显示的按钮文字
    smsBtn.countDown = TOTAL_COUNT_DOWN;// 倒计时总数
  };
  smsBtn.default();

  /** 获取短信验证码 */
  // 1.请求发送短信的接口
  // 2.表单校验输入的格式
  // 3.基本格式验证通过，自动提交进行验证
  // 4.a.验证通过 下一步按钮 显示为可用状态
  // 4.b.验证未通过 出现错误提示， 下一步按钮还是不可用状态
  var timer;
  mobileData.getMobileCode = function (mobile) {
    var nTotal = TOTAL_COUNT_DOWN;
    smsBtn.isDis = true;
    smsBtn.txt = BUTTON_TEXT.sending;
    apiService.getMobileCode(0, mobile).then(
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
      function (error) {
        smsBtn.default();
        alert(error.message);
      }
    );
  };
  $scope.$on('$destroy', function (event) {
    $interval.cancel(timer);
  });

  /** 重置密码 */
  mobileData.updatePassword = function () {
    apiService.updateMobilePassword($scope.vm.account, mobileData.password, mobileData.confirmpassword).then(
      function (success) {
        alert('密码修改成功');
      },
      function (error) {
        alert(error.message);
      }
    );
  };


  // 测试相关变量控制
  // console.log('%chello','font-size:25px;color:red');
  // mobileData.mobile = 13917232473;
  // mobileData.currentStep = 2;
})

// ************************************
// 子控制器 - 通过邮箱找回密码相关
// ************************************
.controller('mailCtrl', function ($scope, $interval, TOTAL_COUNT_DOWN, BUTTON_TEXT, apiService) {
  var mailData = $scope.mailData = {
    currentStep: 0 // 当前步骤，同时作为TAB active类的判断依据
  };
  // 设置账号类型
  $scope.vm.accountType = 'email';

  var mailBtn = $scope.mailBtn = {};
  // 设置初始状态
  mailBtn.default = function () {
    mailBtn.switchShow = true;// 获取验证码按钮 显示开关
    mailBtn.isDis = false;// 获取验证码按钮 是否禁用
    mailBtn.txt = BUTTON_TEXT.default;// 要显示的按钮文字
    mailBtn.countDown = TOTAL_COUNT_DOWN;// 倒计时总秒数
  };
  mailBtn.default();
  // ************************************
  // 获取邮件验证码
  // ************************************
  var timer;
  mailData.getMailCode = function (mail) {
    var nTotal = TOTAL_COUNT_DOWN;
    mailBtn.isDis = true;
    mailBtn.txt = BUTTON_TEXT.sending;
    apiService.getMailCode(0, mail).then(
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
      function (error) {
        mailBtn.default();
        alert(error.message);
      }
    );
  };
  $scope.$on('$destroy', function (event) {
    $interval.cancel(timer);
  });
  // ************************************
  // 重置密码
  // ************************************
  mailData.updatePassword = function () {
    apiService.updateMailPassword($scope.vm.account, mailData.password, mailData.confirmpassword).then(
      function (success) {
        alert('密码修改成功');
      },
      function (error) {
        alert(error.message);
      }
    );
  };

  // 测试相关变量控制
  // mailData.mail = 'whd007@163.com';
  // mailData.currentStep = 0;
});
