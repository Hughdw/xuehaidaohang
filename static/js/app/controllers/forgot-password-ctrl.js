angular.module('findPDApp')
  // constant() 方法总会在所有配置块之前被执行，可以将一个已经存在的变量值注册为服务，该服务可以注入到应用的其他部分使用
  // 为切换active类提供常量
  .constant('ACTIVE_CLASS', 'active')

  // 总控制器
  .controller('appCtrl', function($scope, apiService) {
    var vm = $scope.vm = {
      getCaptcha: apiService.getImgCaptcha(),
      verifyCallback:{
        img:false,// 记录 验证图片验证码的请求是否返回
        mobile:false,
        mail:false
      }
    };
    // // 图片验证码
    // $scope.getCaptcha = apiService.getImgCaptcha();
    // 刷新验证码
    vm.reloadCaptcha = function() {
      vm.getCaptcha = apiService.getImgCaptcha();
    };
  })

  // 子控制器 - 密码找回方式选择
  .controller('selectTypeCtrl', function($scope, ACTIVE_CLASS) {
    $scope.findType = {
      select: 'mobile'
    };
    //切换 当前选择项样式
    $scope.getActiveClass = function(type) {
      return type === $scope.findType.select ? ACTIVE_CLASS : '';
    };
  })

  // 子控制器 - 通过手机找回密码相关
  .controller('mobileCtrl', function($scope, $interval, ACTIVE_CLASS, apiService) {
    var mobileData = $scope.mobileData = {
      mobile:'',//记录用户输入的手机号码
      currentStep:0,//当前步骤
    };

    //切换 步骤样式
    mobileData.getActiveClass = function(type) {
      return type === mobileData.currentStep ? ACTIVE_CLASS : '';
    };

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

    // ************************************
    // 获取短信验证码
    // ************************************
    // 1.请求发送短信的借口
    // 2.表单校验输入的格式
    // 3.基本格式验证通过，自动提交进行验证
    // 4.1.验证通过 下一步按钮 显示为可用状态
    // 4.2.验证未通过 出现错误提示， 下一步按钮还是不可用状态
    mobileData.getMobileCode = function(mobile) {
      var nTotal = smsBtn.countDown;
      var vIntervalId;
      smsBtn.isDis = true;
      smsBtn.txt = aBtnTxt[1];
      apiService.getMobileCode(0,mobile).then(
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

    // ************************************
    // 重置密码
    // ************************************
    mobileData.updatePassword = function() {
      apiService.updateMobilePassword(mobileData.mobile,mobileData.password,mobileData.confirmpassword).then(
        function(success) {
          alert('成功');
          // body...
        },
        function(error) {
          alert(error.message);
          // body...
        }
      )
    };


    // 测试相关变量控制
    // console.log('%chello','font-size:25px;color:red');
    mobileData.mobile = 13917232473;
    // mobileData.currentStep = 2;

  })

  // 子控制器 - 通过邮箱找回密码相关
  .controller('mailCtrl', function($scope, $interval, ACTIVE_CLASS, apiService) {
    var mailData = $scope.mailData = {
      mail:'',//记录用户输入的手机号码
      currentStep:0,//当前步骤
    };

    //切换 步骤样式
    mailData.getActiveClass = function(type) {
      return type === mailData.currentStep ? ACTIVE_CLASS : '';
    };

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
    console.log(mailBtn.isShow);
    // ************************************
    // 获取邮件验证码
    // ************************************
    mailData.getMailCode = function(mail) {
      var nTotal = mailBtn.countDown;
      var vIntervalId;
      mailBtn.isDis = true;
      mailBtn.txt = aBtnTxt[1];
      apiService.getMailCode(mail).then(
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
          alert(error.message);
        }
      );
    };

    // ************************************
    // 重置密码
    // ************************************
    mailData.updatePassword = function() {
      apiService.updateMailPassword(mailData.mail,mailData.password,mailData.confirmpassword).then(
        function(success) {
          alert('成功');
        },
        function(error) {
          alert(error.message);
        }
      );
    };

    // 测试相关变量控制
    mailData.mail = 'whd007@163.com';
    mailData.currentStep = 0;

  });
