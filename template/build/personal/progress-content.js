/*TMODJS:{"version":2,"md5":"c1da28540c138dfbab182a468dce3341"}*/
define(["../template",""],function(a){return a("personal/progress-content",function(a){"use strict";var b=this,c=(b.$helpers,a.i),d=a.list,e=b.$escape,f="";for(c=0;c<d.length;c++)f+=' <tr> <td class="progress-tit">',f+=e(d[c].title),f+='</td> <td class="progress-display"> <div class="gps-progress"> <div class="gps-progress-bar"></div> </div> </td> <td class="progress-viewing-time"> <div>',f+=e(d[c].viewingDate),f+="</div> <div>",f+=e(d[c].viewingTime),f+='</div> </td> <td class="progress-status"> <div class="des">\u5269\u4f59</div> ',null===d[c].remainingTime?f+=' <div class="remaining-time">\u5df2\u8fc7\u671f</div> ':(f+=' <div class="remaining-time">2\u5c0f\u65f605\u5206\u949f</div> <a class="link" href="',f+=e(d[c].url),f+='">\u7ee7\u7eed\u89c2\u770b</a> '),f+=" </td> </tr> ";return f+=" ",new String(f)})});