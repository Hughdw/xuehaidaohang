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
template('personal/recharge-content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,list=$data.list,$escape=$utils.$escape,$out='';$out+='<div class="table-wrap"> <table class="table-one"> <thead> <tr> <th width="20%">创建时间</th> <th width="32%">订单号</th> <th width="15%">金额</th> <th width="15%">充值方式</th> <th width="18%">状态/操作</th> </tr> </thead> <tbody> ';
 for (i = 0; i < list.length; i++) { 
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
$out+=' <i class="glyphicon glyphicon-info-sign"></i> </td> ';
 } else { 
$out+=' <td class="type"> ';
$out+=$escape( list[i].paymentName);
$out+=' </td> ';
 } 
$out+=' <td class="status"> ';
 if (list[i].status === 1){
$out+=' <a href="';
$out+=$escape( list[i].url);
$out+='" class="btn btn-success" disabled="disabled">成功</a> ';
 } else if (list[i].status === 2){ 
$out+=' <a href="';
$out+=$escape( list[i].url);
$out+='" class="btn btn-default" disabled="disabled">失败</a> ';
 } else if (list[i].status === 3) { 
$out+=' <a href="';
$out+=$escape( list[i].url);
$out+='" class="btn btn-default" disabled="disabled">已关闭</a> ';
 } else { 
$out+=' <a href="';
$out+=$escape( list[i].url);
$out+='" class="btn btn-primary">去付款</a> ';
 } 
$out+=' </td> </tr> ';
}
$out+=' </tbody> </table> </div> <div class="load-box"> <button type="button" id="loadBtn" data-loading-text="正在加载" class="btn btn-lg btn-gpsload" autocomplete="off">加载更多</button> </div> ';
return new String($out);
});/*v:1*/
template('personal/recharge-main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,sidebar=$data.sidebar,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},recharge=$data.recharge,$out='';$out+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">';
$out+=$escape( sidebar.list[sidebar.activeMenu].txt);
$out+='</h3> </div> <div class="wp-body" id="recharge-list"> ';
 include('./recharge-content',recharge) 
$out+=' </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel"> <div class="wp-body" id="sidebar"> ';
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
});/*v:1*/
template('public/footer','<footer id="footer"> <div class="container"> <div class="row"> <div class="col-sm-8"> <p class="copywrite"> <span>Copyright © 2016, baoqingshangmao Co., Ltd.</span> <span>All Rights Reserved.</span> <span>陕西省铜川市宝青商贸有限责任公司</span> </p> <p class="power">Power by Robin 知更鸟</p> </div> <div class="col-sm-4"> <div class="footer-link"> <a href="">关于我们</a> <span class="v-line">|</span> <a href="">联系我们</a> </div> </div> </div> </div> </footer> ');

}()