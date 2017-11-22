/*!
 * knowledge management controller
 * bqliu | 09/20/2017
 */

import $ from 'jquery'
import { refreshNicescroll } from '@/utils'
// import { getDemoTreeData, transformTreeData, refreshNicescroll } from '@/utils'
import '@/vendors/zTree/js/jquery.ztree.all'
import '@/vendors/jquery.nicescroll.js'
import { getKnowledgeImport, getZtreeMenu, getOptimization, getKnowledgeSearchDialog, showSingleTipDialog } from '@/modal/common-dialog.js'
import optimization from '@/templates/optimization.html'
import { queryLeftMenu, saveOrUpdateMenu, deleteMenu } from '@/utils/api'

var refreshKnowledgeTree = function () {
  refreshNicescroll($('#knowledge_ztree'))
}
var ztreeMenuDialog
var settings = {
  view: {
    showLine: false,
    showIcon: false,
    selectedMulti: false,
    dblClickExpand: true,
    addHoverDom: function (treeId, treeNode) {
      var liObj = $('#' + treeNode.tId)
      if ($('#diy_opr_area' + treeNode.id).length > 0) {
        return
      }
      $('.diy-opr-area').removeClass('diy-opr-area-current')
      $('.diy-opr-area').addClass('diy-opr-area-past')
      var oprStr = '<span class="diy-opr-area-clickarea"><span class="diy-opr-area diy-opr-area-current" id="diy_opr_area' + treeNode.id + '"></span></span>'
      liObj.children('a').append(oprStr)
      var $opr = $('#diy_opr_area' + treeNode.id)
      if ($opr.length) {
        $opr.parent().click(function () {
          $('.diy-opr-area-past').parent().remove()
          console.log('diy opr with name', treeNode.name)
          // 点击小三角出现下拉操作菜单
          if (!ztreeMenuDialog || ztreeMenuDialog.destroyed === true) {
            var follow = $('.diy-opr-area-current')[0]
            if (follow) {
              ztreeMenuDialog = getZtreeMenu(follow)
              ztreeMenuDialog.follow = follow
              if (follow.id === 'diy_opr_area10001-1' || follow.id === 'diy_opr_area10002-1' || follow.id === 'diy_opr_area10003-1') {
                ztreeMenuDialog.content(`
                  <div class="ztree-menu-main">
                    <ul>
                      <li class="ztree-menu-list add-sort">新建</li>
                    </ul>
                  </div>
                `)
                ztreeMenuDialog.height('18')
              }
              else {
                ztreeMenuDialog.content(`
                  <div class="ztree-menu-main">
                    <ul>
                      <li class="ztree-menu-list add-sort">新建</li>
                      <li class="ztree-menu-list rename-title">重命名</li>
                      <li class="ztree-menu-list delete-sort">删除</li>
                    </ul>
                  </div>
                `)
                ztreeMenuDialog.height('80')
              }
              ztreeMenuDialog.destroyed = false
              $('.ztree-menu-main').parent().css('margin-bottom', '-8px')
              ztreeMenuDialog.show()
            }
            // 增删改重命名节点
            var zTree = $.fn.zTree.getZTreeObj('knowledge_ztree')
            $('.delete-sort').click(function () {
              var nodes = zTree.getSelectedNodes()
              var deleteSort = showSingleTipDialog(
                '<span class="warn-dialog-icon"></span>删除后无法恢复，确定删除吗？', '', function () {
                  zTree.removeNode(nodes[0])
                  // 删除节点请求
                  deleteMenu(treeNode.id)
                }
              )
              deleteSort.showModal()
              ztreeMenuDialog.close()
              ztreeMenuDialog.destroyed = true
            })
            $('.add-sort').click(function () {
              var addnode = zTree.getSelectedNodes()[0]
              var addnewNode = {name: ''}
              addnewNode = zTree.addNodes(addnode, addnewNode)
              ztreeMenuDialog.close()
              ztreeMenuDialog.destroyed = true
              zTree.editName(addnewNode[0])
              $('#' + addnewNode[0].tId + '_span').children('input').attr('placeholder', '新建')
              // 新增节点请求
              saveOrUpdateMenu({
                typeId: treeNode.id,
                name: $('#' + addnewNode[0].tId + '_span').val(),
                isAdd: true
              })
            })
            $('.rename-title').click(function () {
              var renamenode = zTree.getSelectedNodes()[0]
              zTree.editName(renamenode)
              // 修改节点请求
              saveOrUpdateMenu({
                typeId: treeNode.id,
                name: renamenode.name,
                isAdd: false
              })
            })
          }
          else if (ztreeMenuDialog) {
            ztreeMenuDialog.close()
            ztreeMenuDialog.destroyed = true
          }
        })
      }
    },
    removeHoverDom: function (treeId, treeNode) {
      $('#diy_opr_area' + treeNode.id).parent().off('click').remove()
    }
  },
  // 每次折叠或者展开都要通知 `nicescroll`
  callback: {
    onCollapse: function () {
      refreshKnowledgeTree()
    },
    onExpand: function () {
      refreshKnowledgeTree()
    }
  },
  edit: {
    enable: true,
    showRemoveBtn: false,
    showRenameBtn: false
  }
  /*
  data: {
    simpleData: {
      enable: true,
      idKey: 'id',
      pIdKey: 'pid',
      rootPid: '0'
    }
  }
  */
}

// 0 => expand | 1 => fold
var menuState = 0
var optimizationDialog
export default {
  on: function () {
    var zTree = $.fn.zTree.getZTreeObj('knowledge_ztree')
    if (zTree) {
      return
    }
    $('.app-content .left-wrap').append('<div class="ztree-menu-wrap"><ul id="knowledge_ztree" class="ztree-menu ztree"></ul></div>')
    // 初始化左侧菜单
    queryLeftMenu(194, 'knowManager', settings)

    $('.ztree-menu-wrap').append('<span class="fold-icon"></span>')
    // 折叠导航栏
    // 判断当前导航栏状态
    if (menuState === 1) {
      $('#knowledge_ztree').css.hide()
      $('.fold-icon').css('transform', 'rotate(180deg)')
      $('.fold-icon').addClass('fold-icon-open')
    }
    $('.fold-icon').click(function () {
      if ($(this).hasClass('fold-icon-open')) {
        $('.left-wrap').width(240)
        menuState = 0
        $('#knowledge_ztree').show()
        $('.fold-icon-open').css('transform', 'rotate(0deg)')
        $('.fold-icon-open').removeClass('fold-icon-open')
        $('.fold-icon-open').addClass('fold-icon')
      }
      else {
        $('.app-content .left-wrap').width(40)
        $('.fold-icon').css('transform', 'rotate(180deg)')
        $('#knowledge_ztree').hide()
        $('.fold-icon').addClass('fold-icon-open')
        menuState = 1
      }
    })
    // 设置固定样式滚动条
    $('#knowledge_ztree').niceScroll({
      cursorcolor: '#77A7FF',
      cursorborder: '1px solid #77A7FF',
      cursoropacitymin: 0,
      cursoropacitymax: 1
    })
    // 导入知识点成功后的弹窗
    $('.knowledge-import').click(function () {
      var ImportKnowledgeDialog = getKnowledgeImport()
      ImportKnowledgeDialog.showModal()

      $('.knowledge-import-no').click(function () {
        ImportKnowledgeDialog.close()
      })
    })
    // 优化中心
    $('.right-wrap').on('click', '.knowledge-optimization', function () {
      optimizationDialog = getOptimization()
      optimizationDialog.content($(optimization))
      optimizationDialog.showModal()

      $('.optimization-title-right-cal').click(function () {
        optimizationDialog.close()
      })
    })
    // 高级搜索弹窗开始
    $('.right-wrap').on('click', '.advanced-search', function () {
      var knowledgedialogdel = getKnowledgeSearchDialog()
      knowledgedialogdel.showModal()
      $('.effect-radio-answer').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on')
      })
      $('.answer-button').click(function () {
        $('.knowledge-button').css('border-bottom', 'none')
        $('.answer-button').css('border-bottom', '4px solid #78A7FF')
        $('.knowledge-form').css('display', 'none')
        $('.answer-form-dialog').css('display', 'block')
      })
      $('.knowledge-button').click(function () {
        $('.answer-button').css('border-bottom', 'none')
        $('.knowledge-button').css('border-bottom', '4px solid #78A7FF')
        $('.answer-form-dialog').css('display', 'none')
        $('.knowledge-form').css('display', 'block')
      })
      $('.close-button').click(function () {
        knowledgedialogdel.close()
      })
    })
    // 高级搜索弹窗结束
    // 全选
    $('.knowledge-check-all').change(function () {
      $('.knowledge-check').find('input').prop('checked', $(this).prop('checked'))
    })
    // 用户提示框
    $('.icon-user-x').unbind()
    $('.icon-user-x').click(function () {
      console.log('hrer')
      $('.user-operation-tips-main').toggle()
    })
  },
  after: function () {
    var route = this.getRoute()
    if (route[0] !== 'knowledge-management') {
      $('.right-wrap').off('click')
      var zTree = $.fn.zTree.getZTreeObj('knowledge_ztree')
      if (zTree) {
        zTree.destroy()
      }
      $('.app-content .ztree-menu-wrap').remove()
      menuState = 0
      $('.fold-icon').off('click')
    }
    if (ztreeMenuDialog) {
      ztreeMenuDialog.close()
    }
  }
}
