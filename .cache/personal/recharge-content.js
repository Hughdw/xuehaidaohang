/*TMODJS:{"version":1,"md5":"35c0886176db03ce6e386a5136eb5bb4"}*/
template('personal/recharge-content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,list=$data.list,$escape=$utils.$escape,$out=''; for (i = 0; i < list.length; i++) { 
$out+=' <tr> <td class="recharge-creation-time"> <div>';
$out+=$escape( list[i].creationDate);
$out+='</div> <div>';
$out+=$escape( list[i].creationTime);
$out+='</div> </td> <td class="recharge-order"> ';
$out+=$escape( list[i].order);
$out+=' </td> <td class="recharge-price"> ￥';
$out+=$escape( list[i].price);
$out+=' </td> ';
 if (list[i].paymentType === 0) { 
$out+=' <td class="recharge-type"> ';
$out+=$escape( list[i].paymentName);
$out+=' <i class="glyphicon glyphicon-info-sign" data-toggle="tooltip" data-placement="bottom" title="';
$out+=$escape( list[i].typeInfo);
$out+='"></i> </td> ';
 } else { 
$out+=' <td class="recharge-type"> ';
$out+=$escape( list[i].paymentName);
$out+=' </td> ';
 } 
$out+=' <td class="recharge-status"> ';
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
$out+=' </td> </tr> ';
}
$out+=' ';
return new String($out);
});