/*!
 * knowledge controller
 * hxli8 | 09/27/2017
 */

import $ from 'jquery'
import router from '@/router'
import insertStructure from '@/templates/insert-structure.html'
import { getInsertStructureAll, getInsertStructureWeb, getWebMining, showSingleTipDialog } from '@/modal/common-dialog.js'

export default {
  on: function () {
    $('.app-content .right-wrap').append($(insertStructure))
    $('.structure-wrap').niceScroll({
      cursorcolor: '#ccc',
      cursoropacitymin: 0,
      cursoropacitymax: 1
    })
    $('.structure-wrap').getNiceScroll().resize()
    $('.add-structure-button').click(function () {
      $('.add-structure-dialog-main').toggle()
    })
    // 删除
    $('.del-knowledge').click(function () {
      var knowledgedialogdel = showSingleTipDialog(
        '<span class="warn-dialog-icon"></span>删除后无法恢复，确定删除吗?'
      )
      knowledgedialogdel.showModal()
    })
    // 启用
    $('.use-knowledge').click(function () {
      var knowledgedialoguse = showSingleTipDialog('<span class="warn-dialog-icon"></span>确定启用所选知识点？')
      knowledgedialoguse.showModal()
    })
    // 禁用
    $('.disable-knowledge').click(function () {
      var knowledgedialogdisable = showSingleTipDialog('<span class="warn-dialog-icon"></span>确定禁用所选知识点？')
      knowledgedialogdisable.showModal()
    })
    // 全选取消
    $('.knowledge-check-all').change(function () {
      $('.knowledge-check').find('input').prop('checked', $(this).prop('checked'))
    })
    // 点击修改按钮
    $('.icon-revise').click(function (e) {
      if ($('.modify-ok')) {
        $('.modify-ok').remove()
        $('.modify-cancel').remove()
        $('.icon-revise').show()
      }
      $('.icon-revise').removeClass('currentIcon')
      var target = e.target
      $(target).addClass('currentIcon')
      $('.currentIcon').parent().append(`
          <input type="button" value="取消" class="modify-cancel">
        `)
      $('.currentIcon').parent().prepend(`
          <input type="button" value="确定" class="modify-ok">
        `)
      $('.currentIcon').hide()

      $('.modify-cancel').click(function () {
        $('.icon-revise').removeClass('currentIcon')
        $('.modify-ok').remove()
        $('.modify-cancel').remove()
        $(target).show()
      })
      $('.modify-ok').click(function () {
        $('.currentIcon').show()
        var knowledgeName = $(target).parent().parent().children('td').eq(1).html()
        $('.modify-ok').remove()
        $('.modify-cancel').remove()
        $('.modify-content').show()
        $('.modify-content-textarea-structure').val(knowledgeName)
      })
      $('.modify-content-ok').click(function () {
        var modifyKnowledgeQueation = $('.modify-content-textarea').val()
        $('.currentIcon').parent().parent().children('td').eq(1).html(modifyKnowledgeQueation)
        $('.modify-content').hide()
        $('.icon-revise').removeClass('currentIcon')
      })
      $('.modify-content-cancel').click(function () {
        $('.modify-content').hide()
        $('.icon-revise').removeClass('currentIcon')
      })
    })
    // 批量添加
    $('.all-add').click(function () {
      var knowledgeDialogAll = getInsertStructureAll()
      knowledgeDialogAll.showModal()
      $('.add-structure-radio').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on')
      })
      $('.add-structure-all-close').click(function () {
        knowledgeDialogAll.close()
      })
    })
    // 网络挖掘
    $('.web-add').click(function () {
      var knowledgeDialogWeb = getInsertStructureWeb()
      knowledgeDialogWeb.showModal()
      $('.standard-question-own').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on')
      })
      $('.standard-question-has').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on')
      })

      $('.standard-question-close').click(function () {
        knowledgeDialogWeb.close()
      })
      // 网络挖掘中
      $('.web-mining-ok').click(function () {
        var webMiningDialog = getWebMining()
        knowledgeDialogWeb.close()
        webMiningDialog.showModal()
        $('.web-mining-header-remove').click(function () {
          webMiningDialog.close()
        })

        // 删除
        $('.del-structure').click(function () {
          var knowledgedialogdel = showSingleTipDialog(
            '<span class="warn-dialog-icon"></span>删除后无法恢复，确定删除吗?'
          )
          knowledgedialogdel.showModal()
        })
        // 入库
        $('.add-structure').click(function () {
          var knowledgedialoguse = showSingleTipDialog('<span class="warn-dialog-icon"></span>确定入库吗？')
          knowledgedialoguse.showModal()
        })
        // 待定
        $('.wait-structure').click(function () {
          var knowledgedialogdisable = showSingleTipDialog('<span class="warn-dialog-icon"></span>确定设为待定吗？')
          knowledgedialogdisable.showModal()
        })
        // 全选
        $('.knowledge-check-all').change(function () {
          $('.knowledge-check').find('input').prop('checked', $(this).prop('checked'))
        })
      })
    })
  },
  after: function () {
    var curFirstRoute = router.getRoute(0)
    if (curFirstRoute === 'knowledge') {
      return
    }
    $('.app-content .right-wrap').html('')
    $('.knowledge-optimization').off('click')
  }
}
