/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = this.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('personal/account-main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},sidebar=$data.sidebar,$out='';$out+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">账户资料</h3> </div> <div class="panel-group account-list wp-body" id="accordion"> <div class="panel al-panel al-avatar"> <div class="al-tit"> <h3>网站头像</h3> <div class="des"><img src="static/img/personal/personal-avatar-1.gif"/></div> <div class="operation"> <a id="collapse-link-avatar" class="collapse-link" data-target="#collapse-avatar">修改</a> </div> </div> <div class="al-collapse collapse" id="collapse-avatar"> <div class="al-collapse-inner row"> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-1.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-2.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-3.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-4.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-5.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-6.gif"/></a> <div class="col-xs-12 col-sm-4 al-btn-box"> <button type="button" class="btn btn-primary btn-block">确认</button> </div> </div> </div> </div> <div class="panel al-panel al-nickname"> <div class="al-tit"> <h3>用户昵称</h3> <div class="des"><span class="des-txt">用于在网站中交流的昵称</span></div> <div class="operation"> <a id="collapse-link-nickname" class="collapse-link" data-target="#collapse-nickname">修改</a> </div> </div> <div class="al-collapse collapse" id="collapse-nickname"> <div class="al-collapse-inner"> <div class="form-horizontal"> <div class="form-group"> <label for="input-nickname" class="col-sm-4 control-label input-des">设置昵称：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-nickname" placeholder="用户昵称"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">确认</button> </div> </div> </div> </div> </div> </div> <div class="panel al-panel al-password"> <div class="al-tit"> <h3>登录密码</h3> <div class="des"><span class="des-txt">登录网站时输入的密码</span></div> <div class="operation"> <a id="collapse-link-password" class="collapse-link" data-target="#collapse-password">修改</a> </div> </div> <div class="al-collapse collapse" id="collapse-password"> <div class="al-collapse-inner"> <div class="form-horizontal"> <div class="form-group"> <label for="input-password" class="col-sm-4 control-label input-des">当前密码：</label> <div class="col-sm-8"><input type="password" class="form-control" id="input-password" placeholder="请输入当前密码"></div> </div> <div class="form-group"> <label for="input-new-password" class="col-sm-4 control-label input-des">新密码：</label> <div class="col-sm-8"><input type="password" class="form-control" id="input-new-password" placeholder="请输入新密码"></div> </div> <div class="form-group"> <label for="input-confirm-password" class="col-sm-4 control-label input-des">重输新密码：</label> <div class="col-sm-8"><input type="password" class="form-control" id="input-confirm-password" placeholder="请重新输入新密码"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">确认</button> </div> </div> </div> </div> </div> </div> <div class="panel al-panel al-mobile"> <div class="al-tit"> <h3>绑定手机</h3> <div class="des"><span class="des-txt">可用于登录网站时的帐号，也可以通过手机找回登录密码</span></div> <div class="operation"><a class="collapse-link" id="collapse-link-mobile" data-target="#collapse-mobile">修改</a></div> </div> <div class="al-collapse collapse" id="collapse-mobile"> <div class="al-collapse-inner">  <div class="form-horizontal collapse-default hidden"> <div class="form-group"> <label for="input-mobile" class="col-sm-4 control-label input-des">手机号码：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-mobile" placeholder="请输入手机号码"></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">获取验证码：</div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">点击获取验证码</button> </div> </div> <div class="form-group"> <label for="input-mobile-captcha-0" class="col-sm-4 control-label input-des">输入验证码：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-mobile-captcha-0" placeholder="请输入手机验证码"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">确认</button> </div> </div> </div>  <div class="form-horizontal collapse-edit hidden"> <div class="edit-step-1"> <div class="form-group"> <label for="input-old-mobile" class="col-sm-4 control-label input-des">原手机号码：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-old-mobile" value="13944556611" disabled></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">获取验证码：</div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">点击获取验证码</button> </div> </div> <div class="form-group"> <label for="input-mobile-captcha-1" class="col-sm-4 control-label input-des">输入验证码：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-mobile-captcha-1" placeholder="请输入手机验证码"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">下一步</button> </div> </div> </div> <div class="edit-step-2"> <div class="form-group"> <label for="input-new-mobile" class="col-sm-4 control-label input-des">新手机号码：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-new-mobile" placeholder="请输入新绑定手机号码"></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">获取验证码：</div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">点击获取验证码</button> </div> </div> <div class="form-group"> <label for="input-mobile-captcha-2" class="col-sm-4 control-label input-des">输入验证码：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-mobile-captcha-2" placeholder="请输入手机验证码"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">确认</button> </div> </div> </div> </div> </div> </div> </div> <div class="panel al-panel al-email"> <div class="al-tit"> <h3>绑定邮箱</h3> <div class="des"><span class="des-txt">可用于登录网站时的帐号，也可以通过邮箱找回登录密码</span></div> <div class="operation"><a class="collapse-link" id="collapse-link-email" data-target="#collapse-email">修改</a></div> </div> <div class="al-collapse collapse" id="collapse-email"> <div class="al-collapse-inner">  <div class="form-horizontal collapse-default hidden"> <div class="form-group"> <label for="input-email" class="col-sm-4 control-label input-des">邮箱地址：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-email" placeholder="请输入邮箱地址"></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">获取验证码：</div> <div class="col-sm-8 al-btn-box"> <button type="button" id="testtooltip1" class="btn btn-primary btn-block">点击获取验证码</button> </div> </div> <div class="form-group"> <label for="input-email-captcha-0" class="col-sm-4 control-label input-des">输入验证码：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-email-captcha-0" placeholder="请输入手机验证码"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 al-btn-box"> <button type="button" id="testtooltip" class="btn btn-primary btn-block" >确s认</button> </div> </div> </div>  <div class="form-horizontal collapse-edit hidden"> <div class="edit-step-1"> <div class="form-group"> <label for="input-old-email" class="col-sm-4 control-label input-des">原邮箱地址：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-old-email" value="email@163.com" disabled></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">获取验证码：</div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">点击获取验证码</button> </div> </div> <div class="form-group"> <label for="input-email-captcha-1" class="col-sm-4 control-label input-des">输入验证码：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-email-captcha-1" placeholder="请输入手机验证码"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">下一步</button> </div> </div> </div> <div class="edit-step-2"> <div class="form-group"> <label for="input-new-email" class="col-sm-4 control-label input-des">新邮箱地址：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-new-email" placeholder="请输入新绑定邮箱地址"></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">获取验证码：</div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">点击获取验证码</button> </div> </div> <div class="form-group"> <label for="input-email-captcha-2" class="col-sm-4 control-label input-des">输入验证码：</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-email-captcha-2" placeholder="请输入手机验证码"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 al-btn-box"> <button type="button" class="btn btn-primary btn-block">确认</button> </div> </div> </div> </div> </div> </div> </div> </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel" id="sidebar"> <div class="wp-body"> ';
 include('./sidebar',sidebar) 
$out+=' </div> </div> </div> </div> </div> ';
return new String($out);
});/*v:1*/
template('personal/progress-content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,list=$data.list,$escape=$utils.$escape,$out=''; for (i = 0; i < list.length; i++) { 
$out+=' <tr> <td class="course-tit">';
$out+=$escape( list[i].title);
$out+='</td> <td class="progress-display"> <div class="gps-progress"> <div class="gps-progress-bar"></div> </div> </td> <td class="viewing-time"> <div class="date">';
$out+=$escape( list[i].viewingDate);
$out+='</div> <div class="time">';
$out+=$escape( list[i].viewingTime);
$out+='</div> </td> <td class="status"> <div class="des">剩余</div> ';
 if (list[i].remainingTime === null) {
$out+=' <div class="remaining-time">已过期</div> ';
 } else {
$out+=' <div class="remaining-time">2小时05分钟</div> <a class="link" href="';
$out+=$escape( list[i].url);
$out+='">继续观看</a> ';
 } 
$out+=' </td> </tr> ';
}
return new String($out);
});/*v:1*/
template('personal/progress-main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,sidebar=$data.sidebar,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},progress=$data.progress,$out='';$out+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">';
$out+=$escape( sidebar.list[sidebar.activeMenu].txt);
$out+='</h3> </div> <div class="wp-body" id="progress-list"> <div class="table-wrap"> <table class="table-one"> <thead> <tr> <th width="28%">课程</th> <th width="42%">进度</th> <th width="15%">观看时间</th> <th width="15%">状态</th> </tr> </thead> <tbody id="progress-content"> ';
 include('./progress-content',progress) 
$out+=' </tbody> </table> </div> <div class="load-box"> <button type="button" id="loadBtn" data-loading-text="正在加载" class="btn btn-lg btn-gpsload" autocomplete="off">加载更多</button> </div> </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel" id="sidebar"> <div class="wp-body"> ';
 include('./sidebar',sidebar) 
$out+=' </div> </div> </div> </div> </div> ';
return new String($out);
});/*v:1*/
template('personal/recharge-content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,list=$data.list,$escape=$utils.$escape,$out=''; for (i = 0; i < list.length; i++) { 
$out+=' <tr> <td class="creation-time"> <div class="date">';
$out+=$escape( list[i].creationDate);
$out+='</div> <div class="time">';
$out+=$escape( list[i].creationTime);
$out+='</div> </td> <td class="order"> ';
$out+=$escape( list[i].order);
$out+=' </td> <td class="price"> ￥';
$out+=$escape( list[i].price);
$out+=' </td> ';
 if (list[i].paymentType === 0) { 
$out+=' <td class="type"> ';
$out+=$escape( list[i].paymentName);
$out+=' <i class="glyphicon glyphicon-info-sign" data-toggle="tooltip" data-placement="bottom" title="';
$out+=$escape( list[i].typeInfo);
$out+='"></i> </td> ';
 } else { 
$out+=' <td class="type"> ';
$out+=$escape( list[i].paymentName);
$out+=' </td> ';
 } 
$out+=' <td class="status"> ';
 if (list[i].status === 1){
$out+=' <a href="javascript:;" class="btn btn-success" disabled="disabled">成功</a> ';
 } else if (list[i].status === 2){ 
$out+=' <a href="javascript:;" class="btn btn-default" disabled="disabled">失败</a> ';
 } else if (list[i].status === 3) { 
$out+=' <a href="javascript:;" class="btn btn-default" disabled="disabled">已关闭</a> ';
 } else { 
$out+=' <a href="';
$out+=$escape( list[i].url);
$out+='" class="btn btn-primary">去付款</a> ';
 } 
$out+=' </td> </tr> ';
}
$out+=' ';
return new String($out);
});/*v:1*/
template('personal/recharge-main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,sidebar=$data.sidebar,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},recharge=$data.recharge,$out='';$out+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">';
$out+=$escape( sidebar.list[sidebar.activeMenu].txt);
$out+='</h3> </div> <div class="wp-body" id="recharge-list"> <div class="table-wrap"> <table class="table-one"> <thead> <tr> <th width="20%">创建时间</th> <th width="32%">订单号</th> <th width="15%">金额</th> <th width="15%">充值方式</th> <th width="18%">状态/操作</th> </tr> </thead> <tbody id="recharge-content"> ';
 include('./recharge-content',recharge) 
$out+=' </tbody> </table> </div> <div class="load-box"> <button type="button" id="loadBtn" data-loading-text="正在加载" class="btn btn-lg btn-gpsload" autocomplete="off">加载更多</button> </div> </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel" id="sidebar"> <div class="wp-body"> ';
 include('./sidebar',sidebar) 
$out+=' </div> </div> </div> </div> </div> ';
return new String($out);
});/*v:1*/
template('personal/sidebar',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,avatarUrl=$data.avatarUrl,userName=$data.userName,balance=$data.balance,i=$data.i,list=$data.list,activeMenu=$data.activeMenu,$out='';$out+=' <div class="media"> <div class="media-left"><img src="';
$out+=$escape( avatarUrl);
$out+='" alt="';
$out+=$escape( userName);
$out+='" class="media-object" width="100%" height="100%"></div> <div class="media-body"> <h4 class="media-heading">';
$out+=$escape( userName);
$out+='</h4> <dl class="media-cont"> <dt>余额：</dt> <dd><em>';
$out+=$escape( balance);
$out+='</em><span class="ico"></span></dd> <dd><a href="#" class="recharge">充值</a></dd> </dl> </div> </div> <ul class="menu-list"> ';
for(i = 0;i < list.length;i++) {
$out+=' ';
if (i === activeMenu) {
$out+=' <li><a href="';
$out+=$escape( list[i].url);
$out+='" class="menu-list-link active">';
$out+=$escape( list[i].txt);
$out+='</a></li> ';
} else {
$out+=' <li><a href="';
$out+=$escape( list[i].url);
$out+='" class="menu-list-link">';
$out+=$escape( list[i].txt);
$out+='</a></li> ';
}
$out+=' ';
}
$out+=' </ul>  ';
return new String($out);
});

}()