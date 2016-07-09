define(function(require) {
  var oValidate = {};
  function Validate () {
    // 表单输入框输入验证的结果标示
    // 0为不显示，R为正确，A为ajax正在请求其他值为错误代码
    this.flagHint = [0,0,0,0,0,0,0,0];
    // 输入框的名称，用于提示时引用
    this.inputName = [
      '手机号码',//0
      '电子邮箱',//1
      '图片验证码',//2
      '短信确认码',//3
      '邮件确认码',//4
      '昵称',//5
      '当前密码',//6
      '新密码',//7
      '确认密码'//8
    ];
    this.errMessage = [];
    this.errMessage[0] = {
      0: '手机号不能为空',
      1: '手机格式错误',
      2: '手机号已存在'
    };
    this.errMessage[1] = {
      0: '邮箱不能为空',
      1: '邮箱格式错误',
      2: '邮箱已存在'
    };
    this.errMessage[2] = {
      0: '不能为空',
      1: '格式错误',
      2: '验证码错误'
    };
    this.errMessage[3] = {
      0: '确认码不能为空',
      1: '确认码格式错误',
      2: '确认码错误'
    };
    this.errMessage[4] = {
      0: '确认码不能为空',
      1: '确认码格式错误',
      2: '确认码错误'
    };
    this.errMessage[5] = {
      0: '昵称不能为空',
      1: '昵称超出长度',
      2: '昵称已存在'
    };
    this.errMessage[6] = {
      0: '密码不能为空',
      1: '密码格式错误'
    };
    this.errMessage[7] = {
      0: '新密码不能为空',
      1: '密码格式错误',
      2: '不能与当前密码一样'
    };
    this.errMessage[8] = {
      0: '确认密码不能为空',
      1: '密码格式错误',
      2: '与新密码不一样'
    };

  }
  Validate.prototype.setHintValue = function(index,str) {
    this.flagHint[index] = str;
  };
  // // 表单输入框输入验证的结果标示
  // // 0为不显示，R为正确，A为ajax正在请求其他值为错误代码
  // oValidate.flagHint = [0,0,0,0,0];
  // // 输入框的名称，用于提示时引用
  // oValidate.inputName = ['手机号码','电子邮箱','图片验证码','手机确认码','邮件确认码'];
  // // 提示文字
  // oValidate.hintText = [];
  // oValidate.hintText[0] = {}

  return Validate;
});
