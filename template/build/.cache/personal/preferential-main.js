/*TMODJS:{"version":1,"md5":"cfbdab153cb8f37a32e5985b4c503010"}*/
template('personal/preferential-main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,sidebar=$data.sidebar,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},preferential=$data.preferential,$out='';$out+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">';
$out+=$escape( sidebar.list[sidebar.activeMenu].txt);
$out+='</h3> </div> <div class="wp-body" id="preferential-content"> <div class="exchange"> <h3 class="tit">兑换抵用券</h3> <div class="form-inline"> <div class="form-group"> <label class="sr-only" for="input-CDkey">抵用券</label> <input type="text" class="form-control" id="input-CDkey" placeholder="输入兑换码"> </div> <button type="submit" class="btn btn-default">兑换</button> </div> </div> <!-- ';
 include('./preferential-content',preferential) 
$out+=' --> </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel" id="sidebar"> <div class="wp-body"> ';
 include('./sidebar',sidebar) 
$out+=' </div> </div> </div> </div> </div> ';
return new String($out);
});