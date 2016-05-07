/*TMODJS:{"version":11,"md5":"70997b5451124cf8994825168d06a2ef"}*/
template('personal/sidebar',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,avatarUrl=$data.avatarUrl,userName=$data.userName,balance=$data.balance,i=$data.i,list=$data.list,activeMenu=$data.activeMenu,$out='';$out+=' <div class="media"> <div class="media-left"><img src="';
$out+=$escape( avatarUrl);
$out+='" alt="';
$out+=$escape( userName);
$out+='" class="media-object" width="100%" height="100%"></div> <div class="media-body"> <h4 class="media-heading">';
$out+=$escape( userName);
$out+='</h4> <dl class="media-cont"> <dt>余额：</dt> <dd><em>';
$out+=$escape( balance);
$out+='</em><span class="ico"></span></dd> <dd><a href="#" class="recharge">充值</a></dd> </dl> </div> </div> <ul class="menu-list"> ';
for(i = 0;i < list.length;i++) {
$out+=' ';
if (i === activeMenu) {
$out+=' <li><a href="';
$out+=$escape( list[i].url);
$out+='" class="menu-list-link active">';
$out+=$escape( list[i].txt);
$out+='</a></li> ';
} else {
$out+=' <li><a href="';
$out+=$escape( list[i].url);
$out+='" class="menu-list-link">';
$out+=$escape( list[i].txt);
$out+='</a></li> ';
}
$out+=' ';
}
$out+=' </ul>  ';
return new String($out);
});