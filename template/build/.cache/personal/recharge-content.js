/*TMODJS:{"version":1,"md5":"9130fa262390f4e7a01ffb9b5fd8de1b"}*/
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
});