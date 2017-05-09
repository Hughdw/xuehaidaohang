/**
 * @title 临时数据（已经遗弃）
 * @fileOverView 用来测试用
 * @author whdstyle@gmail.com
 */
define(function (require) {
  return {
    sidebar: {
      userName: '小丸子',
      avatarUrl: 'static/img/personal/personal-avatar-1.gif',
      balance: 500,
      activeMenu: 0,
      list: [{
        txt: '账户资料',
        url: '/personal-account.html'
      }, {
        txt: '学习进度',
        url: '/personal-progress.html'
      }, {
        txt: '充值记录',
        url: '/personal-recharge-records.html'
      }, {
        txt: '购买记录',
        url: '/personal-purchase-records.html'
      }, {
        txt: '优惠信息',
        url: '/personal-preferential.html'
      }]
    },
    progress: {
      list: [{
        title: '第一课 集合的含义与表示',
        viewingDate: '2016-01-06',
        viewingTime: '14:20',
        remainingTime: '2小时05分钟',
        url: '#'
      }, {
        title: '第二课 集合的含义与表示2',
        viewingDate: '2016-01-07',
        viewingTime: '10:21',
        remainingTime: null,
        url: null
      }]
    },
    recharge: {
      list: [{
        order: 'E1456465485643651',
        creationDate: '2016-01-06',
        creationTime: '14:20',
        price: '100.00',
        paymentType: 0,
        paymentName: '网银',
        typeInfo: '中国银行',
        status: 0,
        url: '#'
      }, {
        order: 'E1456465485643651',
        creationDate: '2016-01-06',
        creationTime: '13:20',
        price: '100.00',
        paymentType: 1,
        paymentName: '支付宝',
        typeInfo: null,
        status: 1,
        url: '#'
      }, {
        order: 'E1456465485643651',
        creationDate: '2016-01-06',
        creationTime: '13:20',
        price: '100.00',
        paymentType: 2,
        paymentName: '微信',
        typeInfo: null,
        status: 2,
        url: '#'
      }, {
        order: 'E1456465485643651',
        creationDate: '2016-01-06',
        creationTime: '13:20',
        price: '100.00',
        paymentType: 1,
        paymentName: '支付宝',
        typeInfo: null,
        status: 3,
        url: '#'
      }]
    },
    purchase: {
      list: [{
        date: '2016-01-05',
        order: 'E145654545151125',
        courseList: [{
          grade: '高一',
          level: '提高',
          subject: '数学',
          title: '第一课 数列的概念与简单表示法',
          price: '5'
        }, {
          grade: '高二',
          level: '提高',
          subject: '数学',
          title: '第一课 构造辅助数列法求数列',
          price: '6'
        }, {
          grade: '高二',
          level: '提高',
          subject: '数学',
          title: '第三课 等差数列-1',
          price: '4'
        }, {
          grade: '高一',
          level: '提高',
          subject: '数学',
          title: '第三课 等差数列-2',
          price: '4'
        }],
        totalPrice: 20,
        status: 0,
        url: '#'
      }]
    }
  };
});