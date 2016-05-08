/*TMODJS:{"version":1,"md5":"73793a24d29587d60b907531c749792c"}*/
template('personal/progress-content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,i=$data.i,list=$data.list,$escape=$utils.$escape,console=$data.console,$out=''; for (i = 0; i < list.length; i++) { 
$out+=' <tr> <td class="course-tit">';
$out+=$escape( list[i].title);
$out+='</td> <td class="progress-display"> <div class="gps-progress"> <div class="gps-progress-bar"></div> </div> </td> <td class="viewing-time"> <div class="date">';
$out+=$escape( list[i].viewingDate);
$out+='</div> <div class="time">';
$out+=$escape( list[i].viewingTime);
$out+='</div> </td> <td class="status"> <div class="des">剩余</div> ';
 console.log(list[i].remainingTime); if (list[i].remainingTime === null) {
$out+=' <div class="remaining-time">已过期</div> ';
 } else {
$out+=' <div class="remaining-time">2小时05分钟</div> <a class="link" href="';
$out+=$escape( list[i].url);
$out+='">继续观看</a> ';
 } 
$out+=' </td> </tr> ';
}
return new String($out);
});