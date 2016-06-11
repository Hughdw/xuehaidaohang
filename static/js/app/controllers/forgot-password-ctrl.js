angular.module('findPDApp')
  // constant() 方法总会在所有配置块之前被执行，可以将一个已经存在的变量值注册为服务，该服务可以注入到应用的其他部分使用
  // 为切换active类提供常量
  .constant('addActiveClass', 'active')

  // 总控制器
  .controller('appCtrl', function($scope) {
    $scope.findTypeStep = {
      currentType: 'findType',
      selectType: 'mobile'
    };
  })

  // 子控制器 - 密码找回方式选择
  .controller('selectTypeCtrl', function($scope, addActiveClass) {
    //切换 当前选择项样式
    $scope.getActiveClass = function(type) {
      return type === $scope.findTypeStep.selectType ? addActiveClass : '';
    };
  })

  // 子控制器 - 通过手机找回密码相关
  .controller('mobileCtrl', function($scope, $http, $interval, addActiveClass, CAPTCHAService) {
    $scope.mobileData = {
      mobile:'',//记录用户输入的手机号码
      currentStep:0,//当前步骤
      imgCaptchaCallback:false// 记录 验证图片验证码的请求是否返回
    };
    // 获取验证码按钮 显示开关
    $scope.showBtn = true;
    // 获取验证码按钮 是否禁用
    $scope.btnDis = false;
    // 获取验证码按钮 文字
    $scope.btnTxt = '获取验证码';
    // 图片验证码
    $scope.getCaptcha = CAPTCHAService.getImgCaptcha();

    //切换 步骤样式
    $scope.getActiveClass = function(type) {
      return type === $scope.mobileData.currentStep ? addActiveClass : '';
    };

    // 刷新验证码
    $scope.reloadCaptcha = function() {
      $scope.getCaptcha = CAPTCHAService.getImgCaptcha();
    };
    // 获取短信验证码
    // 1.请求发送短信的借口
    // 2.表单校验输入的格式
    // 3.输入完成，点击提交按钮进行验证
    // 4.1.验证通过 按钮文字变为 下一步
    // 4.2.验证未通过 按钮文字还是 提交

    $scope.getMobileCode = function(mobile) {
      var nTotal = 30;
      var vCountDownId;
      $scope.btnDis = true;
      $scope.btnTxt = '正在发送';
      CAPTCHAService.getMobileCode(mobile).then(
        function(success) {
          $scope.showBtn = false;
          $scope.countDown = nTotal;
          vCountDownId = $interval(function() {
            console.log(nTotal);
            if (nTotal === 0) {
              $scope.btnDis = false;
              $scope.showBtn = true;
              $scope.btnTxt = '获取验证码';
            }
            $scope.countDown = nTotal;
            nTotal--;
          },1000,31);
        },
        function(error) {

        }
      );
    };

    // 测试相关变量控制
    $scope.mobileData.mobile = 13917232473;
    $scope.mobileData.currentStep = 0;
    $scope.testFn = function() {
      console.log($scope.mobileData.imgCaptchaCallback);
    };

  })

  // 子控制器 - 通过邮箱找回密码相关
  .controller('emailCtrl', function($scope) {
    $scope.emailStep = 1;
  });
