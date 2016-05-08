/*TMODJS:{"version":2,"md5":"5778ceda8bb3ad4e59a492c7a5b6756f"}*/
template('personal/recharge-content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,list=$data.list,$escape=$utils.$escape,$out=''; for (i = 0; i < list.length; i++) { 
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
$out+=' ';
return new String($out);
});