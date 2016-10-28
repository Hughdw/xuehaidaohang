/**
 * 目录筛选功能
 */
define(function (require) {
  var $ = require('jquery');
  var mApi = require('components/api');
  var mListData = require('components/course/list-data');
  var tplKnowledge = require('tpl/course/menu-knowledge');
  var tplListCont = require('tpl/course/list-cont');

  var oFilterCont = {};
  // 当前目录选择项目的categoryid
  var nLevelActiveId;
  // 清除选择
  function fnClearSelect (btn) {
    btn.find('a').removeClass('active');
  }
  // 隐藏元素 && 显示  提示
  function fnClearActive (btn) {
    btn.children().removeClass('active');
    btn.children('.operation-hint').addClass('active');
  }
  // 删除 元素 && 显示 提示
  function fnDeleteEle (ele) {
    ele.empty();
    ele.next('.operation-hint').addClass('active');
  }
  // 获取知识点
  oFilterCont.getKnowledge = function (id, n) {
    mApi.getknowledge(id)
    .done(function (success) {
      document.getElementById('knowledge-' + n + '-list').innerHTML = tplKnowledge(success);
      // 隐藏 知识点 的提示
      $('#knowledge-' + n + '-content').find('.operation-hint').removeClass('active');
    })
    .fail(function () {
      alert('服务器请求错误');
    });
  };
  // 获取视频列表
  oFilterCont.getProductlist = function (name, page) {
    mApi.getproductlist(name[0], name[1], name[2], name[3], name[4], page)
    .done(function (success) {
      // 重新组织数据
      var oListData = mListData.regroupList(success.data.data);
      // 将渲染好的HTML填充到页面中
      document.getElementById('list-cont').innerHTML = tplListCont(oListData);
    })
    .fail(function () {
      alert('请求错误');
    });
  };
  // 目录按钮绑定事件
  oFilterCont.bindEvt = function (num, levelId) {
    nLevelActiveId = levelId;
    // 切换TAB时，重置高度
    $('#menu-tabs').on('click', '.menu-tab', function (event) {
      event.preventDefault();

      var jqSelf = $(this);
      jqSelf.tab('show');
      // 保存当前目录筛选条件的选择categoryid 和 name
      mListData.saveLevelActiveId(jqSelf.data('categoryid'));
      nLevelActiveId = mListData.getLevelActiveId();
      mListData.saveSelectedName(0, nLevelActiveId, jqSelf.data('name'));
    });
    // 给新创建的知识点元素委派绑定的事件
    $('#knowledge-1-list,#knowledge-2-list').delegate('a', 'click', function (event) {
      event.preventDefault();

      var jqSelf = $(this);
      // 切换.active
      jqSelf.siblings().removeClass('active');
      jqSelf.addClass('active');
      // 保存当前目录筛选条件的选择categoryid 和 name
      mListData.saveSelectedName(4, nLevelActiveId, jqSelf.data('name'));
      // 获取到当前目录筛选条件的选择name
      var aSelectedName = mListData.getSelectedName(nLevelActiveId);
      // 设置获取的页面
      var page = 1;
      oFilterCont.getProductlist(aSelectedName, page);
      // 清除 知识点 的选择
      var nInvert = nLevelActiveId === 1 ? 2 : 1;
      fnClearSelect($('#knowledge-' + nInvert + '-list'));
    });
    // 绑定目录-年级按钮
    $('#grade-1-content,#grade-2-content').on('click', '.grade-bt', function (event) {
      event.preventDefault();

      var jqSelf = $(this);
      // 切换.active
      jqSelf.siblings().removeClass('active');
      jqSelf.tab('show').addClass('active');
      // 清除 学科 的选择
      fnClearSelect($('#subjects-' + nLevelActiveId + '-content'));
      // 隐藏版本元素 && 显示 版本 提示
      fnClearActive($('#version-' + nLevelActiveId + '-content'));
      // 删除 知识点 元素 && 显示 知识点 提示
      fnDeleteEle($('#knowledge-' + nLevelActiveId + '-list'));
      // 保存当前目录筛选条件的选择categoryid 和 name
      mListData.saveSelectedName(1, nLevelActiveId, jqSelf.data('name'));
    });
    // 绑定目录-学科按钮
    $('#subjects-1-content,#subjects-2-content').on('click', '.subjects-bt', function (event) {
      event.preventDefault();

      var jqSelf = $(this);
      // 切换.active
      jqSelf.siblings().removeClass('active');
      jqSelf.tab('show').addClass('active');
      // 清除 版本 的选择
      fnClearSelect($('#version-' + nLevelActiveId + '-content'));
      // 删除 知识点 元素 && 显示 知识点 提示
      fnDeleteEle($('#knowledge-' + nLevelActiveId + '-list'));
      // 保存当前目录筛选条件的选择categoryid 和 name
      mListData.saveSelectedName(2, nLevelActiveId, jqSelf.data('name'));
    });
    // 绑定目录-版本按钮
    $('#version-1-content,#version-2-content').on('click', '.version-bt', function (event) {
      event.preventDefault();

      var jqSelf = $(this);
      // 切换.active
      jqSelf.siblings().removeClass('active');
      jqSelf.addClass('active');
      // 保存当前目录筛选条件的选择categoryid 和 name
      mListData.saveSelectedName(3, nLevelActiveId, jqSelf.data('name'));
      // 获取知识点
      oFilterCont.getKnowledge(jqSelf.data('categoryid'), nLevelActiveId);
    });
  };
  return oFilterCont;
});
