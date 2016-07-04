define(function(require) {
  var oValidate = {};
  function Validate () {
    // 表单输入框输入验证的结果标示
    // 0为不显示，R为正确，A为ajax正在请求其他值为错误代码
    this.flagHint = [0,0,0,0,0];
    // 输入框的名称，用于提示时引用
    this.inputName = ['手机号码','电子邮箱','图片验证码','手机确认码','邮件确认码'];
  }
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
