import dialog from '@/utils/dialog-plus'
import _ from 'lodash'

var defaultOption = {
  title: '提示',
  width: '290px',
  height: '30px',
  content: '',
  okValue: '取消',
  cancelValue: '确定',
  ok: function () {
    //
  },
  cancel: true
}

var showCommonDialog = function (option) {
  var opts = _.assign({ }, defaultOption, option)
  return dialog(opts)
}

var showSingleTipDialog = function (content, ok, cancel) {
  return showCommonDialog({
    content: content,
    ok: _.isFunction(ok) ? ok : _.noop,
    cancel: _.isFunction(cancel) ? cancel : _.noop
  })
}

var getKnowledgeSearchDialog = function () {
  return showCommonDialog({
    title: '',
    content: `
      <div class="knowledge-dialog-header">
        <span class="knowledge-button">知识</span>
        <span class="answer-button">答案</span>
        <span class="close-button">X</span>
      </div>
      <form action="#">
        <div class="knowledge-form">
          <label for="" class="knowledge-dialog-input-title">答案：
            <input type="text" class="knowledge-dialog-input">
          </label>
          <br>
          <div class="effect-selecters">
            <span class="effect-radio effect-radio-answer"><input name="effect" type="radio" value="" class="effect-select-radio"/></span><label class="effect-select">等待生效</label>
            <span class="effect-radio effect-radio-answer"><input name="effect" type="radio" value="" class="effect-select-radio"/></span><label class="effect-select">生效中</label>
            <span class="effect-radio effect-radio-answer"><input name="effect" type="radio" value="" class="effect-select-radio"/></span><label class="effect-select">失效</label>
          </div>
        </div>
        <div class="answer-form-dialog">
          <label for="" class="knowledge-dialog-input-title answer-form-title">知识：</label>
            <input type="text" class="knowledge-dialog-input">
          <br>
          <label for="" class="knowledge-dialog-input-title answer-form-title">标准问：</label>
            <input type="text" class="knowledge-dialog-input">
          <br>
          <label for="" class="knowledge-dialog-input-title answer-form-title">句式：</label>
            <input type="text" class="knowledge-dialog-input">
        </div>
      </form>
    `,
    padding: 0,
    width: '346px',
    height: '153px',
    ok: '',
    cancel: '',
    button: [
      {
        value: '开始搜索',
        callback: function () {},
        autofocus: false
      }
    ]
  })
}
// 单句/批量添加句式
var getInsertStructureAll = function () {
  return showCommonDialog({
    title: '',
    content: `
      <div class="add-structure-all">
        <span class="add-structure-all-close">X</span>
        <form action="#">
          <label for="" class="add-structure-all-select">句式：</label>
          <span class="effect-radio add-structure-radio"><input name="add-select" type="radio" value="" class="effect-select-radio effect-select-radio-structure-one"/></span><label class="effect-select add-select">单句添加</label>
          <span class="effect-radio add-structure-radio"><input name="add-select" type="radio" value="" class="effect-select-radio effect-select-radio-structure-all"/></span><label class="effect-select add-select-all">批量添加</label>
          <input type="button" value="文件批量添加" class="add-select-fileadd"/>
          <br>
          <textarea name="addall-content" class="add-structure-all-content"></textarea>
        </form>
      </div>
    `,
    padding: 0,
    width: '776px',
    height: '157px',
    ok: '',
    cancel: '',
    button: [
      {
        value: '添加',
        callback: function () {},
        autofocus: false
      },
      {
        value: '取消',
        callback: function () {},
        autofocus: false
      }
    ]
  })
}
// 网络挖掘
var getInsertStructureWeb = function () {
  return showCommonDialog({
    title: '',
    content: `
      <div class="standard-question">
        <span class="add-structure-all-close standard-question-close">X</span>
        <form action="#">
          <label for="" class="standard-question-title-content"><span class="standard-question-title">标准问：</span>标准问为个人养老保险金查询？</label>
          <br>
          <span class="effect-radio standard-question-select standard-question-own"><input name="add-select-own" type="radio" value="" class="effect-select-radio effect-select-radio-standard-yes"/></span><label class="effect-select standard-question-reset">是</label>
          <span class="effect-radio standard-question-own"><input name="add-select-own" type="radio" value="" class="effect-select-radio effect-select-radio-standard-no"/></span><label class="effect-select standard-question-reset">否</label>
          <br>
          <label for="" class="standard-question-title-content standard-question-bottom">标准问是否已有语料？</label>
          <br>
          <div>
            <span class="effect-radio standard-question-select standard-question-has"><input name="add-select-has" type="radio" value="" class="effect-select-radio effect-select-radio-add-standard-yes"/></span><label class="effect-select standard-question-reset">是</label>
            <span class="effect-radio standard-question-has"><input name="add-select-has" type="radio" value="" class="effect-select-radio effect-select-radio-add-standard-no"/></span><label class="effect-select standard-question-reset">否</label>
          </div>
          <a href="#" class="add-data">+添加语料</a>
          <br>
          <input type="button" class="standard-question-button web-mining-ok" value="确认挖掘"/>
        </form>
      </div>   
    `,
    padding: 0,
    width: '398px',
    height: '255px',
    ok: '',
    cancel: ''
  })
}

// 导入知识点
var getKnowledgeImport = function () {
  return showCommonDialog({
    title: '',
    content: `
      <div class="knowledge-import-main">
        <div class="knowledge-import-header">
          <div class="knowledge-import-header-succeed">导入完成</div>
          <div class="knowledge-import-header-fail">已导入条数***，导入失败条数***</div>
        </div>
        <div class="knowledge-import-content">
          你可以下载错误条目并重新编辑导入
        </div>
        <div class="knowledge-import-bottom">
          <input type="button" value="下载" class="standard-question-button knowledge-import-download"/>
          <input type="button" value="退出" class="standard-question-button knowledge-import-no"/>
        </div>
      </div>
    `,
    padding: 0,
    width: '448px',
    height: '186px',
    ok: '',
    cancel: ''
  })
}

var getWebMining = function () {
  return showCommonDialog({
    title: '',
    content: `
      <div class="web-mining">
        <div class="web-mining-main-header">
          <span class="web-mining-header-title">网络挖掘</span>
          <span class="web-mining-header-remove">_</span>
        </div>
        <div class="structure-label">
          <div class="structure-label-left web-mining-header">
            <span class="structure-label-left-text">个人养老保险查询</span>
            <span class="web-mining-ed"></span>
            <span class="web-mining-ing"></span>
            <span class="web-mining-tips">还未进行网络挖掘！</span>
          </div>
          <div class="structure-label-right">
            <ul class="structure-label-list">
              <li class="web-mining-select">
                <label for="">状态:</label>
                <select class="web-mining-select-content">
                  <option value="volvo">全部</option>
                  <option value="saab">其它，需改</option>
                </select>
              </li>
              <li class="structure-label-list-item del-structure">删除</li>
              <li class="structure-label-list-item add-structure">入库</li>
              <li class="structure-label-list-item wait-structure">待定</li>
            </ul>
            <div class="add-structure-dialog-main">
              <div class="triangle-mix">
                <div class="triangle-mix-outer-triangle"></div>
                <div class="triangle-mix-inner-triangle"></div>
              </div>
              <div class="add-structure-dialog">
                <div class="add-structure-select all-add">单句/批量添加</div>
                <div class="add-structure-select web-add">网络挖掘添加</div>
              </div>
            </div>
          </div>
        </div>
        <div class="structure-wrap">
          <table class="common-table">
            <thead>
              <tr>
                <th class="structure-checkall">
                  <input type="checkbox" class="knowledge-check-all">
                </th>
                <th class="structure-name">句式</th>
                <th class="structure-revise">状态</th>
              </tr>
            </thead>
            <tbody id="structure-cont">
              <tr>
                <td class="knowledge-check">
                  <input type="checkbox" class="knowledge-check1">
                </td>
                <td>个人养老保险金查询</td>
                <td>待定</td>
              </tr>
              <tr>
                <td class="knowledge-check">
                  <input type="checkbox" class="knowledge-check1">
                </td>
                <td>个人养老保险金查询</td>
                <td>待定</td>
              </tr>
              <tr>
                <td class="knowledge-check">
                  <input type="checkbox" class="knowledge-check1">
                </td>
                <td>个人养老保险金查询</td>
                <td>待定</td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="knowledge-check"></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div class="paging">
            <div class="detail-text">共**条信息，每页15条 </div>
            <div class="detail-icon">
              <span class="icon icon-arrow-le"></span>
              <span class="icon icon-arrow-l"></span>
              <span class="icon icon-line"></span>
              <div class="detail-page">
                <div class="page-text">第</div>
                <div class="detail-page1">3</div>
                <div class="page-text">页</div>
              </div>
              <div class="allpage-text">共100页</div>
              <span class="icon icon-line"></span>
              <span class="icon icon-arrow-r"></span>
              <span class="icon icon-arrow-re"></span>
            </div>
          </div>
        </div>
      </div>
    `,
    padding: 0,
    width: '1100px',
    height: '622px',
    ok: '',
    cancel: ''
  })
}

var getZtreeMenu = function (follow) {
  return showCommonDialog({
    title: '',
    content: `
      <div class="ztree-menu-main">
        <ul>
          <li class="ztree-menu-list add-sort">新建</li>
          <li class="ztree-menu-list rename-title">重命名</li>
          <li class="ztree-menu-list delete-sort">删除</li>
        </ul>
      </div>
    `,
    padding: 0,
    width: '52px',
    height: '49px',
    ok: '',
    cancel: '',
    follow: follow,
    id: 'ztree-menu-list',
    quickClose: true
  })
}

var getOptimization = function () {
  return showCommonDialog({
    title: '',
    content: ``,
    padding: 0,
    width: '822px',
    height: '603px',
    ok: '',
    cancel: ''
  })
}

var getInsertAnswer = function () {
  return showCommonDialog({
    title: '',
    content: `
      <div class="insert-answer-dialog">
        <div class="insert-answer-dialog-header">添加答案</div>
        <div class="insert-answer-dialog-center">
          <span class="icon icon-answer-text"></span>
          <span class="icon icon-answer-pic"></span>
          <span class="icon icon-answer-video"></span>
          <span class="icon icon-answer-tts"></span>
          <span class="icon icon-answer-other"></span>
        </div>
        <div class="insert-answer-dialog-content">
          <textarea class="insert-answer-dialog-content-main"></textarea>
          <div class="insert-answer-dialog-content-footer">
            <input type="button" value="确定" class="answer-dialog-remove answer-dialog-remove-ok">
            <input type="button" value="取消" class="answer-dialog-remove answer-dialog-remove-no">
          </div>
        </div>
      </div>  
    `,
    padding: 0,
    width: '1079px',
    height: '538px',
    ok: '',
    cancel: ''
  })
}
export {
  showCommonDialog,
  showSingleTipDialog,
  getKnowledgeSearchDialog,
  getInsertStructureAll,
  getInsertStructureWeb,
  getKnowledgeImport,
  getWebMining,
  getZtreeMenu,
  getOptimization,
  getInsertAnswer
}
