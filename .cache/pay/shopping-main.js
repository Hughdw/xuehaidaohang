/*TMODJS:{"version":1,"md5":"a35fbae96a279a6f00795bdfa99f1243"}*/
template('pay/shopping-main','<div class="container"> <div class="row"> <div class="col-md-8 main"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">购物车</h3> </div> <div class="wp-body shopping-list"> <div class="table-wrap"> <table class="table-one table-base"> <thead> <tr> <th width="8%"></th> <th width="49%">课程</th> <th width="10%">时长</th> <th width="13%">单价<small>（金钥）</small></th> <th width="10%">操作</th> </tr> </thead> <tbody> <tr> <td class="shopping-checkbox"> <div class="checkbox"> <label> <input type="checkbox" id="" value=""> </label> </div> </td> <td class="shopping-course"> <div class="area-explain"> <small class="explain-1"> - 提高 - </small> <small class="explain-2"><span class="explain-grade label label-primary">高一</span><span class="explain-subjects label label-default">数学</span></small> </div> <div class="shopping-tit">第一课 集合的含义与表示</div> </td> <td class="shopping-duration">15:28</td> <td class="shopping-price">5</td> <td class="shopping-operation"> <a href="#" class="link">删除</a> </td> </tr> <tr> <td class="shopping-checkbox"> <div class="checkbox"> <label> <input type="checkbox" id="" value=""> </label> </div> </td> <td class="shopping-course"> <div class="area-explain"> <small class="explain-1"> - 提高 - </small> <small class="explain-2"><span class="explain-grade label label-primary">高一</span><span class="explain-subjects label label-default">数学</span></small> </div> <div class="shopping-tit">第一课 集合的含义与表示</div> </td> <td class="shopping-duration">15:28</td> <td class="shopping-price">5</td> <td class="shopping-operation"> <a href="#" class="link">删除</a> </td> </tr> </tbody> </table> <div class="shopping-confirm form-inline"> <div class="checkbox check-all"> <label> <input type="checkbox" id="" value=""> 全选 </label> </div> <div class="confirmbox">  <span class="total-price">总价：<em>35</em>金钥</span> <button type="button" class="btn btn-primary">确认</button> </div> </div> </div> </div> </div> </div> <div class="col-md-4"> <div class="wrap-panel sidebar"> <div class="wrap-panel"> <div class="wp-tit"> <h3 class="wp-tit-inner">结算</h3> </div> <div class="wp-body payment"> <div class="payment-coupon"> <h3 class="area-tit">优惠券</h3> <div class="vouchers raido"> <label class="vouchers-scrip active"> <input class="raido" type="radio" name="scrip-option" value="1" checked="checked"> <span class="tit">抵用券</span> <span class="cont"><em>10</em>金钥</span> </label> <label class="vouchers-scrip"> <input class="raido" type="radio" name="scrip-option" value="2"> <span class="tit">抵用券</span> <span class="cont"><em>10</em>金钥</span> </label> </div> </div> <div class="payment-type"> <h3 class="area-tit">支付方式</h3> <div class="balance form-inline"> <div class="checkbox"> <label> <input type="checkbox" id="" value=""> </label> </div> 账户余额：<em>10</em>金钥 </div> <div class="third-party form-inline"> <div class="checkbox"> <label> <input type="checkbox" id="" value=""> </label> </div> <button type="button" class="btn btn-default btn-sm active">支付宝</button> <button type="button" class="btn btn-default btn-sm">微信</button> <div class="btn-group"> <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">中国农业银行<span class="caret"></span></button> <ul class="dropdown-menu dropdown-menu-right"> <li><a href="#">中国工商银行</a></li> <li><a href="#">中国农业银行</a></li> <li><a href="#">中国银行</a></li> <li><a href="#">中国建设银行</a></li> </ul> </div> </div> </div> <div class="payment-detail"> <h3 class="area-tit">订单概览</h3> <dl class="detail-cont"> <dt>总&nbsp;&nbsp;&nbsp;&nbsp;价：</dt> <dd>35金钥</dd> <dt>余&nbsp;&nbsp;&nbsp;&nbsp;额：</dt> <dd>-10金钥</dd> <dt>抵用券：</dt> <dd>-10金钥</dd> </dl> <div class="detail-confirm"> <dl class="info"> <dt>应付额：</dt> <dd><em>15</em>金钥<span>（人民币为：<b>3</b>元）</span></dd> </dl> <div class="btnbox"> <button type="button" class="btn btn-primary btn-block">支付</button> </div> </div> </div> </div> </div> </div> </div> </div> ');