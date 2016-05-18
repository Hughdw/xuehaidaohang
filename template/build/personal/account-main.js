/*TMODJS:{"version":2,"md5":"d613a165cf848366dbe7e1711d0dc4eb"}*/
define(["../template","./sidebar"],function(a){return a("personal/account-main",function(a,b){"use strict";var c=this,d=(c.$helpers,function(d,e){e=e||a;var g=c.$include(d,e,b);return f+=g}),e=a.sidebar,f="";return f+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">\u8d26\u6237\u8d44\u6599</h3> </div> <div class="panel-group account-list wp-body" id="accordion"> <div class="panel account-panel account-avatar"> <div class="account-tit"> <h3>\u7f51\u7ad9\u5934\u50cf</h3> <div class="des"><img src="static/img/personal/personal-avatar-1.gif"/></div> <div class="operation"> <a id="collapse-link-avatar" class="collapse-link" data-target="#collapse-avatar">\u4fee\u6539</a> </div> </div> <div class="account-collapse collapse" id="collapse-avatar"> <div class="account-collapse-inner row"> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-1.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-2.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-3.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-4.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-5.gif"/></a> <a class="avatar-link col-xs-4 col-sm-2" href="javascript:;"><img class="avatar-img" src="static/img/personal/personal-avatar-6.gif"/></a> <div class="col-xs-12 col-sm-4 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u786e\u8ba4</button> </div> </div> </div> </div> <div class="panel account-panel account-nickname"> <div class="account-tit"> <h3>\u7528\u6237\u6635\u79f0</h3> <div class="des"><span class="des-txt">\u7528\u4e8e\u5728\u7f51\u7ad9\u4e2d\u4ea4\u6d41\u7684\u6635\u79f0</span></div> <div class="operation"> <a id="collapse-link-nickname" class="collapse-link" data-target="#collapse-nickname">\u4fee\u6539</a> </div> </div> <div class="account-collapse collapse" id="collapse-nickname"> <div class="account-collapse-inner"> <div class="form-horizontal"> <div class="form-group"> <label for="input-nickname" class="col-sm-4 control-label input-des">\u8bbe\u7f6e\u6635\u79f0\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-nickname" placeholder="\u7528\u6237\u6635\u79f0"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u786e\u8ba4</button> </div> </div> </div> </div> </div> </div> <div class="panel account-panel account-password"> <div class="account-tit"> <h3>\u767b\u5f55\u5bc6\u7801</h3> <div class="des"><span class="des-txt">\u767b\u5f55\u7f51\u7ad9\u65f6\u8f93\u5165\u7684\u5bc6\u7801</span></div> <div class="operation"> <a id="collapse-link-password" class="collapse-link" data-target="#collapse-password">\u4fee\u6539</a> </div> </div> <div class="account-collapse collapse" id="collapse-password"> <div class="account-collapse-inner"> <div class="form-horizontal"> <div class="form-group"> <label for="input-password" class="col-sm-4 control-label input-des">\u5f53\u524d\u5bc6\u7801\uff1a</label> <div class="col-sm-8"><input type="password" class="form-control" id="input-password" placeholder="\u8bf7\u8f93\u5165\u5f53\u524d\u5bc6\u7801"></div> </div> <div class="form-group"> <label for="input-new-password" class="col-sm-4 control-label input-des">\u65b0\u5bc6\u7801\uff1a</label> <div class="col-sm-8"><input type="password" class="form-control" id="input-new-password" placeholder="\u8bf7\u8f93\u5165\u65b0\u5bc6\u7801"></div> </div> <div class="form-group"> <label for="input-confirm-password" class="col-sm-4 control-label input-des">\u91cd\u8f93\u65b0\u5bc6\u7801\uff1a</label> <div class="col-sm-8"><input type="password" class="form-control" id="input-confirm-password" placeholder="\u8bf7\u91cd\u65b0\u8f93\u5165\u65b0\u5bc6\u7801"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u786e\u8ba4</button> </div> </div> </div> </div> </div> </div> <div class="panel account-panel account-mobile"> <div class="account-tit"> <h3>\u7ed1\u5b9a\u624b\u673a</h3> <div class="des"><span class="des-txt">\u53ef\u7528\u4e8e\u767b\u5f55\u7f51\u7ad9\u65f6\u7684\u5e10\u53f7\uff0c\u4e5f\u53ef\u4ee5\u901a\u8fc7\u624b\u673a\u627e\u56de\u767b\u5f55\u5bc6\u7801</span></div> <div class="operation"><a class="collapse-link" id="collapse-link-mobile" data-target="#collapse-mobile">\u4fee\u6539</a></div> </div> <div class="account-collapse collapse" id="collapse-mobile"> <div class="account-collapse-inner">  <div class="form-horizontal collapse-default hidden"> <div class="form-group"> <label for="input-mobile" class="col-sm-4 control-label input-des">\u624b\u673a\u53f7\u7801\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-mobile" placeholder="\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801"></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">\u83b7\u53d6\u9a8c\u8bc1\u7801\uff1a</div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u70b9\u51fb\u83b7\u53d6\u9a8c\u8bc1\u7801</button> </div> </div> <div class="form-group"> <label for="input-mobile-captcha-0" class="col-sm-4 control-label input-des">\u8f93\u5165\u9a8c\u8bc1\u7801\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-mobile-captcha-0" placeholder="\u8bf7\u8f93\u5165\u624b\u673a\u9a8c\u8bc1\u7801"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u786e\u8ba4</button> </div> </div> </div>  <div class="form-horizontal collapse-edit hidden"> <div class="edit-step-1"> <div class="form-group"> <label for="input-old-mobile" class="col-sm-4 control-label input-des">\u539f\u624b\u673a\u53f7\u7801\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-old-mobile" value="13944556611" disabled></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">\u83b7\u53d6\u9a8c\u8bc1\u7801\uff1a</div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u70b9\u51fb\u83b7\u53d6\u9a8c\u8bc1\u7801</button> </div> </div> <div class="form-group"> <label for="input-mobile-captcha-1" class="col-sm-4 control-label input-des">\u8f93\u5165\u9a8c\u8bc1\u7801\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-mobile-captcha-1" placeholder="\u8bf7\u8f93\u5165\u624b\u673a\u9a8c\u8bc1\u7801"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u4e0b\u4e00\u6b65</button> </div> </div> </div> <div class="edit-step-2"> <div class="form-group"> <label for="input-new-mobile" class="col-sm-4 control-label input-des">\u65b0\u624b\u673a\u53f7\u7801\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-new-mobile" placeholder="\u8bf7\u8f93\u5165\u65b0\u7ed1\u5b9a\u624b\u673a\u53f7\u7801"></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">\u83b7\u53d6\u9a8c\u8bc1\u7801\uff1a</div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u70b9\u51fb\u83b7\u53d6\u9a8c\u8bc1\u7801</button> </div> </div> <div class="form-group"> <label for="input-mobile-captcha-2" class="col-sm-4 control-label input-des">\u8f93\u5165\u9a8c\u8bc1\u7801\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-mobile-captcha-2" placeholder="\u8bf7\u8f93\u5165\u624b\u673a\u9a8c\u8bc1\u7801"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u786e\u8ba4</button> </div> </div> </div> </div> </div> </div> </div> <div class="panel account-panel account-email"> <div class="account-tit"> <h3>\u7ed1\u5b9a\u90ae\u7bb1</h3> <div class="des"><span class="des-txt">\u53ef\u7528\u4e8e\u767b\u5f55\u7f51\u7ad9\u65f6\u7684\u5e10\u53f7\uff0c\u4e5f\u53ef\u4ee5\u901a\u8fc7\u90ae\u7bb1\u627e\u56de\u767b\u5f55\u5bc6\u7801</span></div> <div class="operation"><a class="collapse-link" id="collapse-link-email" data-target="#collapse-email">\u4fee\u6539</a></div> </div> <div class="account-collapse collapse" id="collapse-email"> <div class="account-collapse-inner">  <div class="form-horizontal collapse-default hidden"> <div class="form-group"> <label for="input-email" class="col-sm-4 control-label input-des">\u90ae\u7bb1\u5730\u5740\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-email" placeholder="\u8bf7\u8f93\u5165\u90ae\u7bb1\u5730\u5740"></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">\u83b7\u53d6\u9a8c\u8bc1\u7801\uff1a</div> <div class="col-sm-8 account-btn-box"> <button type="button" id="testtooltip1" class="btn btn-primary btn-block">\u70b9\u51fb\u83b7\u53d6\u9a8c\u8bc1\u7801</button> </div> </div> <div class="form-group"> <label for="input-email-captcha-0" class="col-sm-4 control-label input-des">\u8f93\u5165\u9a8c\u8bc1\u7801\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-email-captcha-0" placeholder="\u8bf7\u8f93\u5165\u624b\u673a\u9a8c\u8bc1\u7801"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 account-btn-box"> <button type="button" id="testtooltip" class="btn btn-primary btn-block" >\u786es\u8ba4</button> </div> </div> </div>  <div class="form-horizontal collapse-edit hidden"> <div class="edit-step-1"> <div class="form-group"> <label for="input-old-email" class="col-sm-4 control-label input-des">\u539f\u90ae\u7bb1\u5730\u5740\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-old-email" value="email@163.com" disabled></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">\u83b7\u53d6\u9a8c\u8bc1\u7801\uff1a</div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u70b9\u51fb\u83b7\u53d6\u9a8c\u8bc1\u7801</button> </div> </div> <div class="form-group"> <label for="input-email-captcha-1" class="col-sm-4 control-label input-des">\u8f93\u5165\u9a8c\u8bc1\u7801\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-email-captcha-1" placeholder="\u8bf7\u8f93\u5165\u624b\u673a\u9a8c\u8bc1\u7801"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u4e0b\u4e00\u6b65</button> </div> </div> </div> <div class="edit-step-2"> <div class="form-group"> <label for="input-new-email" class="col-sm-4 control-label input-des">\u65b0\u90ae\u7bb1\u5730\u5740\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-new-email" placeholder="\u8bf7\u8f93\u5165\u65b0\u7ed1\u5b9a\u90ae\u7bb1\u5730\u5740"></div> </div> <div class="form-group"> <div class="col-sm-4 control-label input-des">\u83b7\u53d6\u9a8c\u8bc1\u7801\uff1a</div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u70b9\u51fb\u83b7\u53d6\u9a8c\u8bc1\u7801</button> </div> </div> <div class="form-group"> <label for="input-email-captcha-2" class="col-sm-4 control-label input-des">\u8f93\u5165\u9a8c\u8bc1\u7801\uff1a</label> <div class="col-sm-8"><input type="text" class="form-control" id="input-email-captcha-2" placeholder="\u8bf7\u8f93\u5165\u624b\u673a\u9a8c\u8bc1\u7801"></div> </div> <div class="form-group"> <div class="col-sm-4"> </div> <div class="col-sm-8 account-btn-box"> <button type="button" class="btn btn-primary btn-block">\u786e\u8ba4</button> </div> </div> </div> </div> </div> </div> </div> </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel" id="sidebar"> <div class="wp-body"> ',d("./sidebar",e),f+=" </div> </div> </div> </div> </div> ",new String(f)})});