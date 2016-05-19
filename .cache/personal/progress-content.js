/*TMODJS:{"version":1,"md5":"a44af50b22084f716aba58320ef9989b"}*/
template('personal/progress-content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,list=$data.list,$escape=$utils.$escape,$out=''; for (i = 0; i < list.length; i++) { 
$out+=' <tr> <td class="progress-tit">';
$out+=$escape( list[i].title);
$out+='</td> <td class="progress-display"> <div class="gps-progress"> <div class="gps-progress-bar"></div> </div> </td> <td class="progress-viewing-time"> <div>';
$out+=$escape( list[i].viewingDate);
$out+='</div> <div>';
$out+=$escape( list[i].viewingTime);
$out+='</div> </td> <td class="progress-status"> <div class="des">剩余</div> ';
 if (list[i].remainingTime === null) {
$out+=' <div class="remaining-time">已过期</div> ';
 } else {
$out+=' <div class="remaining-time">2小时05分钟</div> <a class="link" href="';
$out+=$escape( list[i].url);
$out+='">继续观看</a> ';
 } 
$out+=' </td> </tr> ';
}
$out+=' ';
return new String($out);
});