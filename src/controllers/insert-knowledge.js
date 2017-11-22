/*!
 * knowledge controller
 * hxli8 | 09/27/2017
 */

import $ from 'jquery'
import router from '@/router'
import insertKnowledge from '@/templates/insert-knowledge.html'
import { showSingleTipDialog, getInsertStructureAll } from '@/modal/common-dialog.js'

export default {
  on: function () {
    $('.app-content .right-wrap').append($(insertKnowledge))
    $('.knowledge-wrap').niceScroll({
      cursorcolor: '#ccc',
      cursoropacitymin: 0,
      cursoropacitymax: 1
    })
    $('.knowledge-wrap').getNiceScroll().resize()
    $('.in-knowledge').click(function () {
      var inledgedialogdel = showSingleTipDialog()
      inledgedialogdel.showModal()
    })
    // 添加标准问
    // 批量添加
    $('.add-standard-question').click(function () {
      var insertKnowledgeDialogAll = getInsertStructureAll()
      $('.add-structure-all-select').html('标准问：')
      insertKnowledgeDialogAll.showModal()
      $('.add-structure-radio').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on')
      })

      $('.add-structure-all-close').click(function () {
        insertKnowledgeDialogAll.close()
      })
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
        var knowledgeName = $('.currentIcon').parent().parent().children('td').eq(1).html()
        var knowledgeQueation = $('.currentIcon').parent().parent().children('td').eq(2).html()
        $('.modify-ok').remove()
        $('.modify-cancel').remove()
        $('.modify-content').show()
        $('.modify-content-input').val(knowledgeName)
        $('.modify-content-textarea').val(knowledgeQueation)
      })
      $('.modify-content-ok').click(function () {
        var modifyknowledgeName = $('.modify-content-input').val()
        var modifyKnowledgeQueation = $('.modify-content-textarea').val()
        $('.currentIcon').parent().parent().children('td').eq(1).html(modifyknowledgeName)
        $('.currentIcon').parent().parent().children('td').eq(2).html(modifyKnowledgeQueation)
        $('.modify-content').hide()
        $('.icon-revise').removeClass('currentIcon')
      })
      $('.modify-content-cancel').click(function () {
        $('.modify-content').hide()
        $('.icon-revise').removeClass('currentIcon')
      })
    })
    // 全选取消
    $('.knowledge-check-all').change(function () {
      $('.knowledge-check').find('input').prop('checked', $(this).prop('checked'))
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
