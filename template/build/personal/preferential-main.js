/*TMODJS:{"version":2,"md5":"8bfae0a2f6263c00ee433ff11a3515ed"}*/
define(["../template","./preferential-content","./sidebar"],function(a){return a("personal/preferential-main",function(a,b){"use strict";var c=this,d=(c.$helpers,c.$escape),e=a.sidebar,f=function(d,e){e=e||a;var f=c.$include(d,e,b);return h+=f},g=a.preferential,h="";return h+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">',h+=d(e.list[e.activeMenu].txt),h+='</h3> </div> <div class="wp-body preferential"> <div class="exchange"> <h3 class="area-tit">\u5151\u6362\u62b5\u7528\u5238</h3> <div class="form-inline"> <div class="form-group"> <label class="sr-only" for="input-CDkey">\u62b5\u7528\u5238</label> <input type="text" class="form-control" id="input-CDkey" placeholder="\u8f93\u5165\u5151\u6362\u7801"> </div> <button type="submit" class="btn btn-primary">\u5151\u6362</button> </div> </div> <div class="my-vouchers"> <h3 class="area-tit">\u6211\u7684\u5151\u6362\u5238</h3> <div class="row vouchers-inner"> <div class="col-xs-6"> <div class="preferential-scrip preferential-scrip-left"> <div class="ps-tit">\u62b5\u7528\u5238</div> <div class="ps-cont"> <h4 class="price">10<small>\u91d1\u94a5</small></h4> <dl> <dt>\u4f7f\u7528\u89c4\u5219\uff1a</dt> <dd>\u6ee150\u91d1\u94a5\u53ef\u4f7f\u7528</dd> </dl> <dl> <dt>\u6709\u6548\u65e5\u671f\uff1a</dt> <dd>2016.01.06 \u81f3 2016.01.20</dd> </dl> </div> <div class="expired"></div> </div> </div> <div class="col-xs-6"> <div class="preferential-scrip"> <div class="ps-tit">\u62b5\u7528\u5238</div> <div class="ps-cont"> <h4 class="price">10<small>\u91d1\u94a5</small></h4> <dl> <dt>\u4f7f\u7528\u89c4\u5219\uff1a</dt> <dd>\u6ee150\u91d1\u94a5\u53ef\u4f7f\u7528</dd> </dl> <dl> <dt>\u6709\u6548\u65e5\u671f\uff1a</dt> <dd>2016.01.06 \u81f3 2016.01.20</dd> </dl> </div> <div class="expired"></div> </div> </div> <div class="col-xs-6"> <div class="preferential-scrip preferential-scrip-left"> <div class="ps-tit">\u62b5\u7528\u5238</div> <div class="ps-cont"> <h4 class="price">10<small>\u91d1\u94a5</small></h4> <dl> <dt>\u4f7f\u7528\u89c4\u5219\uff1a</dt> <dd>\u6ee150\u91d1\u94a5\u53ef\u4f7f\u7528</dd> </dl> <dl> <dt>\u6709\u6548\u65e5\u671f\uff1a</dt> <dd>2016.01.06 \u81f3 2016.01.20</dd> </dl> </div> <div class="expired"></div> </div> </div> </div> </div> <!-- ',f("./preferential-content",g),h+=' --> </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel" id="sidebar"> <div class="wp-body"> ',f("./sidebar",e),h+=" </div> </div> </div> </div> </div> ",new String(h)})});