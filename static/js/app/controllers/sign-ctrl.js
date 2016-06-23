angular.module('signApp')
.constant('ACTIVE_CLASS','active')
.controller('registerCtrl',function($scope,$interval,ACTIVE_CLASS,apiService) {
  // body...
  var regData = $scope.regData = {
    currentTab : 0,//切换注册方式
    getCaptcha: apiService.getImgCaptcha()//获取验证码
  };
  var user = $scope.user = {
    username:'',
    password:'',
    confirmpassword:''
  };
  // 切换标签的当前选择样式
  regData.getActiveClass = function(num) {
    // body...
    return num === regData.currentTab ? ACTIVE_CLASS : '';
  };
  // 切换 标签页内容的方法
  regData.switchTab = function(num) {
    // body...
    regData.currentTab = num;
  };
  // 刷新验证码
  regData.reloadCaptcha = function() {
    regData.getCaptcha = apiService.getImgCaptcha();
  };

  regData.register = function(type) {
    apiService.register(type,user.username,user.password,user.confirmpassword).then(
      function(success) {
        alert(success.message);
      },
      function(error) {
        alert(error.message);
      }
    );
  };

  // 测试
  regData.consoleInfo = function() {
    console.log(1);
  };

})
.controller('mobileCtrl',function($scope,$interval,apiService) {
  var mobileData = $scope.mobileData = {};

  // 验证码按钮 文字切换
  var aBtnTxt = ['获取验证码','正在发送'];
  var smsBtn = $scope.smsBtn = {};
  //设置初始状态
  smsBtn.default = function() {
    smsBtn.isShow = true;// 获取验证码按钮 显示开关
    smsBtn.isDis = false;// 获取验证码按钮 是否禁用
    smsBtn.txt = aBtnTxt[0];//要显示的按钮文字
    smsBtn.countDown = 30;//倒计时总秒数
  };
  smsBtn.default();

  mobileData.getMobileCode = function(mobile) {
    var nTotal = smsBtn.countDown;
    var vIntervalId;
    smsBtn.isDis = true;
    smsBtn.txt = aBtnTxt[1];
    apiService.getMobileCode(1,mobile).then(
      function(success) {
        smsBtn.isShow = false;
        vIntervalId = $interval(function() {
          if (nTotal < 0) return;
          nTotal--;
          smsBtn.countDown = nTotal;
          if (nTotal === 0) smsBtn.default();
        },1000,smsBtn.countDown);
      },
      function(error) {
        smsBtn.default();
      }
    );
  };
})
.controller('emailCtrl',function($scope,$interval,apiService) {
  var emailData = $scope.emailData = {};

  // 验证码按钮 文字切换
  var aBtnTxt = ['获取验证码','正在发送'];
  var mailBtn = $scope.mailBtn = {};
  //设置初始状态
  mailBtn.default = function() {
    mailBtn.isShow = true;// 获取验证码按钮 显示开关
    mailBtn.isDis = false;// 获取验证码按钮 是否禁用
    mailBtn.txt = aBtnTxt[0];//要显示的按钮文字
    mailBtn.countDown = 30;//倒计时总秒数
  };
  mailBtn.default();

  emailData.getMailCode = function(email) {
    var nTotal = mailBtn.countDown;
    var vIntervalId;
    mailBtn.isDis = true;
    mailBtn.txt = aBtnTxt[1];
    apiService.getMailCode(1,email).then(
      function(success) {
        mailBtn.isShow = false;
        vIntervalId = $interval(function() {
          if (nTotal < 0) return;
          nTotal--;
          mailBtn.countDown = nTotal;
          if (nTotal === 0) mailBtn.default();
        },1000,mailBtn.countDown);
      },
      function(error) {
        mailBtn.default();
      }
    );
  };
})
.controller('loginCtrl',function($scope,apiService,submitForm) {
  var loginData = $scope.loginData = {
    usernameType : '',// 账号登录方式
    user:{}
  };
  loginData.login = function(loginForm) {
    if (loginForm.$valid) {
      apiService.login(loginData.usernameType,loginData.user.username,loginData.user.password).then(
        function(success) {
          console.log(success);
        },
        function(error) {
          alert(error.message);
        }
      );
    }
    var testaaa = submitForm.checkUsernameInput('submit');
    submitForm.checkPasswordInput('submit');
  };
});
