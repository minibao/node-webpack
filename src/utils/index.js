/* eslint-disable */

/*!
 * some utils
 * bqliu | 09/20/2017
 */

import _ from 'lodash'

export const classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Can\'t call a class as a function')
  }
}

export const setIfNull = function (o, k, defaults) {
  if (_.isUndefined(o[k]) || _.isNull(o[k])) {
    o[k] = defaults
  }
}

// data<Array> => treeData<Object>
// 暂时就酱 没时间搞了
export const transformTreeData = function (data) {
  var treeData = data.slice()

  var tree = {
    id: '0',
    name: '知识库',
    isDisplay: true,
    pid: null,
    parent: true,
    turl: ''
  }

  var iters = tree
  var core = function tcore (iters) {
    if (!Array.isArray(iters)) {
      iters = [ iters ]
    }
    iters.forEach(function (iter, i, iters) {
      for (var i = 0; i < treeData.length; i += 1) {
        var x = treeData[i]
        if (x.pId === iter.id) {
          if (!iter.children) {
            iter.children = [ ]
          }
          iter.children.push(x)
          treeData.splice(i, 1)

          i -= 1
        }
      }
      if (iter.children) {
        tcore(iter.children)
      }
    })
  }
  core(iters)

  return tree
}

export const getDemoTreeData = function () {
  var treeData = [
    {"id":"10001-1","isDisplay":1,"name":"词库","pId":"0","parent":false,"turl":"/dictController/index.do?type=10001&code=1"},
    {"id":"10002-1","isDisplay":1,"name":"模板库","pId":"0","parent":false,"turl":"/template/index.do?type=10002&code=1"},
    {"id":"10003-1","isDisplay":1,"name":"知识库","pId":"0","parent":false,"turl":"/knowledge/index.do?type=10003&code=1"},
    {"id":"10001-45","isDisplay":0,"name":"运营商","pId":"10001-2","parent":false,"turl":"/dictController/index.do?parentId=45"},
    {"id":"10001-36","isDisplay":0,"name":"人寿","pId":"10001-32","parent":false,"turl":"/dictController/index.do?parentId=36"},
    {"id":"10001-35","isDisplay":0,"name":"平安","pId":"10001-34","parent":false,"turl":"/dictController/index.do?parentId=35"},
    {"id":"10001-34","isDisplay":0,"name":"理财","pId":"10001-2","parent":false,"turl":"/dictController/index.do?parentId=34"},
    {"id":"10001-33","isDisplay":0,"name":"平安","pId":"10001-32","parent":false,"turl":"/dictController/index.do?parentId=33"},
    {"id":"10001-32","isDisplay":0,"name":"保险","pId":"10001-2","parent":false,"turl":"/dictController/index.do?parentId=32"},
    {"id":"10001-31","isDisplay":0,"name":"其他","pId":"10001-27","parent":false,"turl":"/dictController/index.do?parentId=31"},
    {"id":"10001-30","isDisplay":0,"name":"平安","pId":"10001-27","parent":false,"turl":"/dictController/index.do?parentId=30"},
    {"id":"10001-29","isDisplay":0,"name":"银行通用","pId":"10001-2","parent":false,"turl":"/dictController/index.do?parentId=29"},
    {"id":"10001-28","isDisplay":0,"name":"浦发","pId":"10001-27","parent":false,"turl":"/dictController/index.do?parentId=28"},
    {"id":"10001-27","isDisplay":0,"name":"银行","pId":"10001-2","parent":false,"turl":"/dictController/index.do?parentId=27"},
    {"id":"10001-26","isDisplay":0,"name":"通用","pId":"10001-3","parent":false,"turl":"/dictController/index.do?parentId=26"},
    {"id":"10001-2","isDisplay":0,"name":"专属词库","pId":"10001-1","parent":false,"turl":"/dictController/index.do?parentId=2"},
    {"id":"10001-3","isDisplay":0,"name":"通用词库","pId":"10001-1","parent":false,"turl":"/dictController/index.do?parentId=3"},
    {"id":"10003-205","isDisplay":0,"name":"基础服务","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=205"},
    {"id":"10003-218","isDisplay":0,"name":"主叫业务","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=218"},
    {"id":"10003-215","isDisplay":0,"name":"密码类","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=215"},
    {"id":"10003-214","isDisplay":0,"name":"固话","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=214"},
    {"id":"10003-213","isDisplay":0,"name":"主套餐类","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=213"},
    {"id":"10003-211","isDisplay":0,"name":"宽带","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=211"},
    {"id":"10003-210","isDisplay":0,"name":"话费类","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=210"},
    {"id":"10003-209","isDisplay":0,"name":"信息查询","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=209"},
    {"id":"10003-208","isDisplay":0,"name":"itv","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=208"},
    {"id":"10003-207","isDisplay":0,"name":"国际长途漫游","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=207"},
    {"id":"10003-204","isDisplay":0,"name":"积分","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=204"},
    {"id":"10003-200","isDisplay":0,"name":"增值业务","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=200"},
    {"id":"10003-199","isDisplay":0,"name":"故障类","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=199"},
    {"id":"10003-198","isDisplay":0,"name":"手机","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=198"},
    {"id":"10003-196","isDisplay":0,"name":"手机上网类","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=196"},
    {"id":"10003-195","isDisplay":0,"name":"服务信息类","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=195"},
    {"id":"10003-194","isDisplay":0,"name":"充值缴费类","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=194"},
    {"id":"10003-193","isDisplay":0,"name":"演示","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=193"},
    {"id":"10003-192","isDisplay":0,"name":"行业应用","pId":"10003-3","parent":false,"turl":"/knowledge/index.do?parentId=192"},
    {"id":"10003-2","isDisplay":0,"name":"聊天知识库","pId":"10003-1","parent":false,"turl":"/knowledge/index.do?parentId=2"},
    {"id":"10003-3","isDisplay":0,"name":"专业知识库","pId":"10003-1","parent":false,"turl":"/knowledge/index.do?parentId=3"},
    {"id":"10002-4","isDisplay":0,"name":"1","pId":"10002-2","parent":false,"turl":"/template/index.do?parentId=4"},
    {"id":"10002-2","isDisplay":0,"name":"专属业务","pId":"10002-1","parent":false,"turl":"/template/index.do?parentId=2"},
    {"id":"10002-3","isDisplay":0,"name":"通用业务","pId":"10002-1","parent":false,"turl":"/template/index.do?parentId=3"}
  ]

  return treeData
}

const hasNiceScroll = function ($dom) {
  if (!_.isFunction($dom.getNiceScroll)) {
    return false
  }
  
  var scroll = $dom.getNiceScroll()
  if (scroll && scroll.length > 0) {
    return true
  }
  return false
}

// refresh `nicescroll`
export const refreshNicescroll = function ($dom) {
  if (!hasNiceScroll($dom)) {
    return
  }
  $dom.getNiceScroll().resize()
}
