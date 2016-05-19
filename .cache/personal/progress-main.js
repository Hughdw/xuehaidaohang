/*TMODJS:{"version":1,"md5":"b256f661a97a4e044b0662dfe8a53c86"}*/
template('personal/progress-main',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,sidebar=$data.sidebar,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},progress=$data.progress,$out='';$out+='<div class="container"> <div class="row"> <div class="col-md-9 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">';
$out+=$escape( sidebar.list[sidebar.activeMenu].txt);
$out+='</h3> </div> <div class="wp-body progress-list"> <div class="table-wrap"> <table class="table-one table-base"> <thead> <tr> <th width="28%">课程</th> <th width="42%">进度</th> <th width="15%">观看时间</th> <th width="15%">状态</th> </tr> </thead> <tbody id="progress-content"> ';
 include('./progress-content',progress) 
$out+=' </tbody> </table> </div> <div class="load-box"> <button type="button" id="loadBtn" data-loading-text="正在加载" class="btn btn-lg btn-gpsload" autocomplete="off">加载更多</button> </div> </div> </div> </div> <div class="col-md-3"> <div class="wrap-panel" id="sidebar"> <div class="wp-body"> ';
 include('./sidebar',sidebar) 
$out+=' </div> </div> </div> </div> </div> ';
return new String($out);
});