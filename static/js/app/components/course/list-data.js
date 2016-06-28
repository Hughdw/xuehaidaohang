define(function(require) {
  mGlobal = require('../global');
  // body...
  var oListData = {};
  // 定义最终返回数据的基本结构
  var oNewData = {
    level:[],
    grade:{},
    subjects:{},
    version:{}
  };
  // 当前激活按钮的分类categoryid
  var oActiveId = {
    level:[1],
    grade:[3,21]//分别对应基础和提高
  };
  // 当前选择categoryid
  var aSelectId = [];
  // 保存当前选择的name值
  var aSelectName = ["基础", "小一", "数学", "人教版", "重点"];

  // 记录每个等级的分类categoryid，在重组数据函数中用
  var aLevelId = [];
  // 记录每个年级的分类categoryid，在重组数据函数中用
  var aGradeId = [];
  // 记录每个学科的分类categoryid，在重组数据函数中用
  var aSubjectsId = [];

  oListData.getSelectedId = function() {
    return aSelectId;
  };
  oListData.getSelectedName = function() {
    return aSelectName;
  };
  oListData.selected = function(index,value,value2) {
    aSelectName[index] = value;
    aSelectId[index] = value2;
  };
  // 重新组织数据
  // 1.改变数据结构
  // 2.增加一些帮助判断的字段
  oListData.regroupMenu = function(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].parentid === 0) {
        // 向 等级 中增加选项
        aLevelId.push(data[i].categoryid);
        // 设置 等级 的激活项
        if (data[i].categoryid === oActiveId.level[0]) {
          data[i].active = 'active';
          // 保存当前选择
          aSelectName.push(data[i].name);
          aSelectId.push(data[i].categoryid);
        } else {
          data[i].active = '';
        }
        oNewData.level.push(data[i]);
      }else{

        // aLevelId有多少个选项，就设置多少个 oNewData.grade 的子属性，格式为 grade_ 加上 aLevelId选项值
        for (var le = 0; le < aLevelId.length; le++) {
          // 遍历出数据中 父元素parentid指向 等级 中的分类categoryid 的所有数据
          // 就是遍历出所有年级选项
          if (data[i].parentid === aLevelId[le]) {
            // 向 年级 中增加选项
            aGradeId.push(data[i].categoryid);
            // 对应 等级中两个分类 为 创建两个年级列表
            if (!$.isArray(oNewData.grade['grade_'+aLevelId[le]])) {
              oNewData.grade['grade_'+aLevelId[le]] = [];
            }
            // 为 两个年级列表 设置默认激活按钮
            if (data[i].categoryid === oActiveId.grade[le]) {
              data[i].active = 'active';
              if (data[i].parentid === oActiveId.level[0]) {
                // 保存当前选择
                aSelectName.push(data[i].name);
                aSelectId.push(data[i].categoryid);
              }
            } else {
              data[i].active = '';
            }
            if (data[i].categoryid >= 3 && data[i].categoryid <= 8 || data[i].categoryid >= 15 && data[i].categoryid <= 20) {
              data[i].stage = 'primary';
            } else if (data[i].categoryid >= 9 && data[i].categoryid <= 11 || data[i].categoryid >= 21 && data[i].categoryid <= 23) {
              data[i].stage = 'junior';
            } else if (data[i].categoryid >= 12 && data[i].categoryid <= 14 || data[i].categoryid >= 24 && data[i].categoryid <= 26) {
              data[i].stage = 'senior';
            }
            oNewData.grade['grade_'+aLevelId[le]].push(data[i]);
          }
        }
        for (var gr = 0; gr < aGradeId.length; gr++) {
          // 遍历出数据中 父元素parentid指向 年级 中的分类categoryid 的所有数据
          // 就是遍历出所有学科选项
          if (data[i].parentid === aGradeId[gr]) {
            aSubjectsId.push(data[i].categoryid);
            if (!$.isArray(oNewData.subjects['subjects_'+aGradeId[gr]])) {
              oNewData.subjects['subjects_'+aGradeId[gr]] = [];
            }
            oNewData.subjects['subjects_'+aGradeId[gr]].push(data[i]);
          }
        }
        for (var ve = 0; ve < aSubjectsId.length; ve++) {
          // 遍历出数据中 父元素parentid指向 学科 中的分类categoryid 的所有数据
          // 就是遍历出所有版本选项
          if (data[i].parentid === aSubjectsId[ve]) {
            if (!$.isArray(oNewData.version['version_'+aSubjectsId[ve]])) {
              oNewData.version['version_'+aSubjectsId[ve]] = [];
            }
            oNewData.version['version_'+aSubjectsId[ve]].push(data[i]);
          }
        }
      }
    }
    return oNewData;
  };
  oListData.regroupList = function(data) {
    var aLeftEle = [0,3,6];
    // var aMiddleEle = [2,5,8];
    var aRightEle = [2,5,8];
    var oNewList = {};
    for (var i = 0; i < data.length; i++) {
      // data[i]
      // console.log($.inArray(i,aLeftEle);
      if ( $.inArray(i,aLeftEle) != -1 ) {
        data[i].float = 'results-panel-left';
      } else if ($.inArray(i,aRightEle) != -1) {
        data[i].float = 'results-panel-right';
      } else {
        data[i].float = '';
      }
    }
    oNewList.data = data;
    return oNewList;
  };
  return oListData;
});
