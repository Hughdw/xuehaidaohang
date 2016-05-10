/*TMODJS:{"version":2,"md5":"551a6e7ac6db6dbfa16ea1b640aab51d"}*/
template('personal/purchase-content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,list=$data.list,$escape=$utils.$escape,j=$data.j,$out=''; for (i = 0; i < list.length; i++) { 
$out+=' <table class="table-two table-base"> <thead> <tr> <th width="16%" class="purchase-date">';
$out+=$escape( list[i].date);
$out+='</th> <th width="36%" class="purchase-order">订单号：<span class="order-num">';
$out+=$escape( list[i].order);
$out+='</span></th> <th width="15%" class="purchase-price">单价<small>（金钥）</small></th> <th width="15%" class="purchase-total-price">总价<small>（金钥）</small></th> <th width="18%" class="purchase-status">状态/操作</th> </tr> </thead> <tbody> ';
 for (j = 0; j < list[i].courseList.length; j++) { 
$out+=' <tr> <td class="purchase-explain"> <small class="explain-1"> - ';
$out+=$escape( list[i].courseList[j].level);
$out+=' - </small> <small class="explain-2"><span class="explain-grade label label-primary">';
$out+=$escape( list[i].courseList[j].grade);
$out+='</span><span class="explain-subjects label label-default">';
$out+=$escape( list[i].courseList[j].subject);
$out+='</span></small> </td> <td class="purchase-title">';
$out+=$escape( list[i].courseList[j].title);
$out+='</td> <td class="purchase-price">';
$out+=$escape( list[i].courseList[j].price);
$out+='</td> ';
 if (j === 0) {
$out+=' <td rowspan="';
$out+=$escape( list[i].courseList.length);
$out+='" class="purchase-total-price"> ';
$out+=$escape( list[i].totalPrice);
$out+='<i class="glyphicon glyphicon-info-sign" data-toggle="tooltip" data-placement="bottom" title="余额：20金钥"></i> </td> <td rowspan="';
$out+=$escape( list[i].courseList.length);
$out+='" class="purchase-status"> ';
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
$out+=' </td> ';
 } 
$out+=' </tr> ';
 } 
$out+=' </tbody> </table> ';
 } 
$out+=' ';
return new String($out);
});