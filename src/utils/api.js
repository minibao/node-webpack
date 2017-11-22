/* eslint-disable */

/*!
 * api.js
 *
 */

import $ from 'jquery'
import router from '../router'
import { transformTreeData, getDemoTreeData } from '@/utils'

// utils
var safeJSONParse = function (o, defaultRet) {
  var ret = defaultRet;

  try {
    ret = JSON.parse(o);
  } catch(e) { /* Ignore */ }

  return ret;
}

var stringify = JSON.stringify.bind(JSON);

var baseUrl = '';

$.ajaxSetup({
  contentType: 'application/json; charset=utf-8',
  // request with credentials
  xhrFields: {
    withCredentials: true
  }
})

// 设置 ip:port 等 path prefix
var setBaseUrl = function (base) {
  if (!base) {
    return ;
  }
  
  baseUrl = base[base.length - 1] === '/'
            ? base
            : base + '/';
}

// 获取接口全路径
var getFullPath = function (rel) {
  return baseUrl + rel;
}

// simple wrapper
var ajax$ = function (param) {
  return new Promise(function (resolve, reject) {
    var type = param.type || 'POST'
    $.ajax({
      url: getFullPath(param.url),
      type: type,
      data: type !== 'GET' ? stringify(param.data) : param.data,
      // dataType: 'json',
      success: function (result) {
        resolve(result)
      },
      error: function (error) {
        reject(error)
      }
      // complete: function (jqXHR, statusText) {
      //   // status
      //   var status = jqXHR.status;
      //   // 是否成功
      //   var isSuccess = (status >= 200 && status < 300) || status === 304;

      //   // 成功还是要判断是否 `parseError`
      //   if (isSuccess) {
      //     resolve(statusText !== 'success'
      //       ? jqXHR.responseText
      //       : jqXHR.responseJSON);

      //     return ;
      //   }

      //   // 其它 status 判断          
      //   switch (status) {
      //     // 401 未授权
      //     case 401: location.href = '/login.html'; break;
      //     // 400 业务异常，返回异常信息
      //     // 406 参数错误，返回异常信息
      //     case 400:
      //     case 406: reject(jqXHR.responseJSON); break;
      //     case 500: reject({
      //       userMessage: '服务异常',
      //       internalMessage: '服务异常'
      //     }); break;
      //     default: reject({
      //       userMessage: '未知 Status Code',
      //       internalMessage: '未知 Status Code'
      //     }); break;
      //   }
      // }
    });
  })
}
// 查询左侧菜单
var getMenuList = function (data) {
  console.log(data)
  return ajax$({
    url: 'ism/menu/queryLeftMenu.do',
    data: data
  });
}

var queryLeftMenu = function (id, Menutype, settings) {
  getMenuList({
    id: id,
    type: Menutype
  }).then(function (data) {
    console.log(data)
    var treeData = transformTreeData(data)
    // var treeData = transformTreeData(getDemoTreeData())
    console.log(treeData)
    $.fn.zTree.init($('.app-content .ztree-menu'), settings, treeData)
  })
    .catch(function (err) {
      console.log('err', err)
    })
}
// 登录
var loginknowManager = function (userName, password) {
  ajax$({
    url: '/ism/main/login.do',
    data: {
      userName: userName,
      password: password
    },
    dataType: 'json'
  }).then(function (data) {
    console.log('success', data)
    // alert('成功')
    // if (账号不存在 或者 密码错误) {
      // $('.login-tip-main').css('visibility', 'visible')
      // $('.login-tip').html('账号或密码错误')
      // }
    // else {
    //   $('.login-tip-main').css('visibility', 'hidden')
    window.location.href = 'http://localhost:8080/#/knowledge-management/new'
    // }
  })
    .catch(function (err) {
      console.log('err', err)
      // alert('失败')
      window.location.href = 'http://localhost:8080/login.html'
    })
}

var saveOrUpdateMenu = function (treeNodeData) {
  return ajax$({
    url: '/ism/menu/saveOrUpdateMenu',
    data: treeNodeData,
    dataType: 'json'
  }).then(function (data) {
    console.log('success', data)
  })
    .catch(function (err) {
      console.log('err', err)
    })
}
// 删除节点
var deleteMenu = function (typeId) {
  return ajax$({
    url: '/ism/menu/deleteMenu',
    data: typeId,
    dataType: 'json'
  }).then(function (data) {
    console.log('success', data)
  })
    .catch(function (err) {
      console.log('err', err)
    })
}
// 获取某个词类下的词表
var queryDicts = function (dictData) {
  return ajax$({
    url: '/ism/dictController/queryDicts',
    data: dictData,
    dataType: 'json'
  }).then(function (data) {
    console.log('success', data)
  })
    .catch(function (err) {
      console.log('err', err)
    })
}
// 新增词表
var saveDictClassify = function (dictClassify) {
  return ajax$({
    url: '/ism/dictController/saveDictClassify',
    data: dictClassify,
    dataType: 'json'
  }).then(function (data) {
    console.log('success', data)
  })
    .catch(function (err) {
      console.log('err', err)
    })
}

// loading遮罩
var loadingMask = function () {
  $('#app').append(`
      <div class="loading-mask">
        <div class="loading-mask-content">
          <span class="loading-mask-icon"></span>
          <span class="loading-mask-text">正在加载数据......</span>
        </div>
      </div>
    `)
}
// 去除loading遮罩
var removeLoadingMask = function () {
  $('#app .loading-mask').remove()
}

export {
  setBaseUrl,
  getMenuList,
  queryLeftMenu,
  loginknowManager,
  saveOrUpdateMenu,
  deleteMenu,
  queryDicts,
  saveDictClassify,
  loadingMask,
  removeLoadingMask
}
