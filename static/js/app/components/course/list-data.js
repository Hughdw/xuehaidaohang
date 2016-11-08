/**
 * 重新组织目录数据
 */
define(function (require) {
  var $ = require('jquery');
  var oListData = {};
  // 定义最终返回数据的基本结构
  var oNewData = {
    level: [],
    grade: {},
    subjects: {},
    version: {}
  };

  // 保存当前选择的name值
  // 请求视频列表时，传递的参数。
  var aSelectedName = [
    [], // ['基础', '小一', '数学', '人教版', '重点']
    [] // ['基础', '小一', '数学', '人教版', '重点']
  ];

  // 记录当前激活等级的categoryid
  // 方便其他模块提取
  var nLevelActiveId;


/**
 * 重新组织目录数据
 * 1.改变数据结构
 * 2.增加一些帮助判断的字段
 */

  // 当前激活按钮的categoryid（初始值）
  // 这个变量可以在今后修改成可配置。
  var oActiveId = {
    level: [1], // 对应激活基础选项
    grade: [3, 21] // 分别对应基础的小一和提高的初一
  };

  // 记录每个等级的分类categoryid，在年级grade重构数据方法中使用
  var aLevelId = [];
  // 记录每个年级的分类categoryid，在学科subjects重构数据方法中使用
  var aGradeId = [];
  // 记录每个学科的分类categoryid，在版本version重组数据方法中使用
  var aSubjectsId = [];
  oListData.regroupMenu = function (data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].parentid === 0) {
        /* 重构level等数据 */

        // 汇总所有 等级 的categoryid
        aLevelId.push(data[i].categoryid);
        // 为 等级 设置默认激活属性 active
        if (data[i].categoryid === oActiveId.level[0]) {
          data[i].active = 'active';

          nLevelActiveId = data[i].categoryid;
          // 保存当前选择的name
          aSelectedName[nLevelActiveId - 1][0] = data[i].name;
        } else {
          data[i].active = '';
        }
        // 重构数据的level字段
        oNewData.level.push(data[i]);
      } else {
        /* 重构grade年级数据 */

        // aLevelId中每个元素分别设置为 oNewData.grade 的子属性，格式为 grade_ 加上 aLevelId元素的值
        // 目前aLevelId只有两个选项：基础和提高
        for (var le = 0; le < aLevelId.length; le++) {
          // 筛选出所有年级选项，分别是基础和提高的
          if (data[i].parentid === aLevelId[le]) {
            // 汇总所有 年级 的categoryid（包括基础和提高中的所有年级）
            aGradeId.push(data[i].categoryid);
            // 创建 两个年级数组 分别对应 等级中的基础和提高
            if (!$.isArray(oNewData.grade['grade_' + aLevelId[le]])) {
              oNewData.grade['grade_' + aLevelId[le]] = [];
            }
            // 为 两个年级数组 设置默认激活属性 active
            if (data[i].categoryid === oActiveId.grade[le]) {
              data[i].active = 'active';
              if (data[i].parentid === oActiveId.level[0]) {
                // 保存当前选择的name
                aSelectedName[nLevelActiveId - 1][1] = data[i].name;
                // aSelectId.push(data[i].categoryid);
              }
            } else {
              data[i].active = '';
            }

            // 为 两个年级数组 设置属于哪个阶段属性 stage
            if (data[i].categoryid >= 3 && data[i].categoryid <= 8 || data[i].categoryid >= 15 && data[i].categoryid <= 20) {
              data[i].stage = 'primary';
            } else if (data[i].categoryid >= 9 && data[i].categoryid <= 11 || data[i].categoryid >= 21 && data[i].categoryid <= 23) {
              data[i].stage = 'junior';
            } else if (data[i].categoryid >= 12 && data[i].categoryid <= 14 || data[i].categoryid >= 24 && data[i].categoryid <= 26) {
              data[i].stage = 'senior';
            }

            // 重构数据的grade字段
            oNewData.grade['grade_' + aLevelId[le]].push(data[i]);
          }
        }

        /* 重构subject学科数据 */

        // aGradeId中每个元素分别设置为 oNewData.subjects 的子属性，格式为 subjects_加上 aGradeId元素的值
        // aGradeId中包含所有年级（包括基础中的和提高中的）
        for (var gr = 0; gr < aGradeId.length; gr++) {
          // 筛选出所有学科选项
          if (data[i].parentid === aGradeId[gr]) {
            // 汇总所有 学科 的catgegoryid
            aSubjectsId.push(data[i].categoryid);
            // 创建 若干个学科数组 分别对应 所有年级
            if (!$.isArray(oNewData.subjects['subjects_' + aGradeId[gr]])) {
              oNewData.subjects['subjects_' + aGradeId[gr]] = [];
            }

            // 重构数据的subjects字段
            oNewData.subjects['subjects_' + aGradeId[gr]].push(data[i]);
          }
        }

        /* 重构version版本数据 */

        // aSubjectsId中每个元素分别设置为 oNewData.version 的子属性，格式为version_加上 aSubjectsId元素的值
        for (var ve = 0; ve < aSubjectsId.length; ve++) {
          // 筛选出所有版本选项
          if (data[i].parentid === aSubjectsId[ve]) {
            // 创建 若干个版本数组 分别对应 所有学科
            if (!$.isArray(oNewData.version['version_' + aSubjectsId[ve]])) {
              oNewData.version['version_' + aSubjectsId[ve]] = [];
            }
            // 重构数据的version字段
            oNewData.version['version_' + aSubjectsId[ve]].push(data[i]);
          }
        }
      }
    }
    return oNewData;
  };
  // 重新组织视频列表数据
  oListData.regroupList = function (data) {
    // 靠左边需要特殊处理的元素下标
    var aLeftEle = [0, 3, 6];
    // 靠右边需要特殊处理的元素下标
    var aRightEle = [2, 5, 8];
    // 视频状态：0，未购买。1，已购买。2，已点播。
    var aStatus = [0, 1, 2, 3];
    for (var i = 0; i < data.length; i++) {
      // 临时随机数，演示用。
      // 原本是通过API返回数据中的isSee和isBuy字段来判断。
      data[i].status = aStatus[Math.floor(Math.random() * aStatus.length)];
      if ($.inArray(i, aLeftEle) !== -1) {
        data[i].float = 'results-panel-left';
      } else if ($.inArray(i, aRightEle) !== -1) {
        data[i].float = 'results-panel-right';
      } else {
        data[i].float = '';
      }
    }
    var oNewList = {
      data: data
    };
    return oNewList;
  };


  // 获取当前激活等级的categoryid
  oListData.getLevelActiveId = function () {
    return nLevelActiveId;
  };
  // 获取当前 等级/年级/学科/版本/知识点 激活选项的name字段数组集合
  oListData.getSelectedName = function (levelId) {
    return aSelectedName[levelId - 1];
  };
  // 保存当前激活等级的categoryid
  oListData.saveLevelActiveId = function (num) {
    nLevelActiveId = num;
  };
  oListData.saveSelectedName = function (index, levelId, name) {
    aSelectedName[levelId - 1][index] = name;
  };

  return oListData;
});
