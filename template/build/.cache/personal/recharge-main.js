/*TMODJS:{"version":1,"md5":"e12fd52b7197e69c132fc2cbdfe2ab6f"}*/
template('personal/recharge-main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},tpldata=$data.tpldata,$out='';$out+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">学习进度</h3> </div> <div class="wp-body" id="recharge-list"> ';
 include('./recharge-content',tpldata.recharge) 
$out+=' </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel"> <div class="wp-body" id="sidebar"> ';
 include('./sidebar',tpldata.sidebar) 
$out+=' </div> </div> </div> </div> </div> ';
return new String($out);
});