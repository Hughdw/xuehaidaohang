define(function (require) {
  var title = ['账户资料','学习进度','充值记录','购买记录','优惠信息'];
  var data = {
    sidebar : {
      userName:'小丸子',
      avatarUrl:'static/img/personal/personal-avatar-1.gif',
      balance:500,
      activeMenu:0,
      list:[
        {
          txt:'账户资料',
          url:'#'
        },
        {
          txt:'学习进度',
          url:'#'
        },
        {
          txt:'充值记录',
          url:'#'
        },
        {
          txt:'购买记录',
          url:'#'
        },
        {
          txt:'优惠信息',
          url:'#'
        }
      ]
    },
    progress:{
      list:[
        {
          title:'第一课 集合的含义与表示',
          viewingDate:'2016-01-06',
          viewingTime:'14:20',
          remainingTime:'2小时05分钟',
          url:'#'
        },
        {
          title:'第二课 集合的含义与表示2',
          viewingDate:'2016-01-07',
          viewingTime:'10:21',
          remainingTime:null,
          url:null
        }
      ]
    },
    recharge:{
      list:[
        {
          order:'E1456465485643651',
          creationDate:'2016-01-06',
          creationTime:'14:20',
          price:'100.00',
          paymentType:0,
          paymentName:'网银',
          typeInfo:'中国银行',
          status:0,
          url:'#'
        },
        {
          order:'E1456465485643651',
          creationDate:'2016-01-06',
          creationTime:'13:20',
          price:'100.00',
          paymentType:1,
          paymentName:'支付宝',
          typeInfo:null,
          status:1,
          url:'#'
        },
        {
          order:'E1456465485643651',
          creationDate:'2016-01-06',
          creationTime:'13:20',
          price:'100.00',
          paymentType:2,
          paymentName:'微信',
          typeInfo:null,
          status:2,
          url:'#'
        },
        {
          order:'E1456465485643651',
          creationDate:'2016-01-06',
          creationTime:'13:20',
          price:'100.00',
          paymentType:1,
          paymentName:'支付宝',
          typeInfo:null,
          status:3,
          url:'#'
        }
      ]
    }
  };
  return data;
});
