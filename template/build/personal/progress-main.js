/*TMODJS:{"version":2,"md5":"3e1eee5af802f5867b27d5b37f16bbba"}*/
define(["../template","./progress-content","./sidebar"],function(a){return a("personal/progress-main",function(a,b){"use strict";var c=this,d=(c.$helpers,c.$escape),e=a.sidebar,f=function(d,e){e=e||a;var f=c.$include(d,e,b);return h+=f},g=a.progress,h="";return h+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">',h+=d(e.list[e.activeMenu].txt),h+='</h3> </div> <div class="wp-body progress-list"> <div class="table-wrap"> <table class="table-one table-base"> <thead> <tr> <th width="28%">\u8bfe\u7a0b</th> <th width="42%">\u8fdb\u5ea6</th> <th width="15%">\u89c2\u770b\u65f6\u95f4</th> <th width="15%">\u72b6\u6001</th> </tr> </thead> <tbody id="progress-content"> ',f("./progress-content",g),h+=' </tbody> </table> </div> <div class="load-box"> <button type="button" id="loadBtn" data-loading-text="\u6b63\u5728\u52a0\u8f7d" class="btn btn-lg btn-gpsload" autocomplete="off">\u52a0\u8f7d\u66f4\u591a</button> </div> </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel" id="sidebar"> <div class="wp-body"> ',f("./sidebar",e),h+=" </div> </div> </div> </div> </div> ",new String(h)})});