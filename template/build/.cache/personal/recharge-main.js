/*TMODJS:{"version":3,"md5":"94c7487e22285ee1c76310a20c3a8f55"}*/
template('personal/recharge-main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,sidebar=$data.sidebar,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},recharge=$data.recharge,$out='';$out+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">';
$out+=$escape( sidebar.list[sidebar.activeMenu].txt);
$out+='</h3> </div> <div class="wp-body" id="recharge-list"> <div class="table-wrap"> <table class="table-one table-base"> <thead> <tr> <th width="20%">创建时间</th> <th width="32%">订单号</th> <th width="15%">金额</th> <th width="15%">充值方式</th> <th width="18%">状态/操作</th> </tr> </thead> <tbody id="recharge-content"> ';
 include('./recharge-content',recharge) 
$out+=' </tbody> </table> </div> <div class="load-box"> <button type="button" id="loadBtn" data-loading-text="正在加载" class="btn btn-lg btn-gpsload" autocomplete="off">加载更多</button> </div> </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel" id="sidebar"> <div class="wp-body"> ';
 include('./sidebar',sidebar) 
$out+=' </div> </div> </div> </div> </div> ';
return new String($out);
});