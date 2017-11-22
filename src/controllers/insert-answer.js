/*!
 * knowledge controller
 * hxli8 | 09/27/2017
 */

import $ from 'jquery'
import router from '@/router'
import insertAnswer from '@/templates/insert-answer.html'
import '../vendors/glDatePicker-2.0/glDatePicker.flatwhite.css'
import '../vendors/glDatePicker-2.0/glDatePicker.js'
import { showSingleTipDialog, getInsertAnswer } from '@/modal/common-dialog.js'
export default {
  on: function () {
    $('.app-content .right-wrap').append($(insertAnswer))
    // 添加答案弹窗
    $('#insert-answer').click(function () {
      var insertAnswerDialog = getInsertAnswer()
      insertAnswerDialog.showModal()
      $('.answer-dialog-remove-ok').click(function () {
        insertAnswerDialog.close()
      })
      $('.answer-dialog-remove-no').click(function () {
        insertAnswerDialog.close()
      })
    })
    // 日期选择器
    $('.answer-validity-start').on('click', function () {
      $(this).glDatePicker({
        showAlways: false,
        format: 'yyyy-mm-dd',
        calendarOffset: { x: -230, y: -64 },
        dowNames: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        prevArrow: '<',
        nextArrow: '>',
        cssName: 'flatwhite',
        borderSize: 0,
        onClick: function (target) {
          // 点击日期触发事件
        }
      })
    })
    $('.answer-validity-end').on('click', function () {
      $(this).glDatePicker({
        showAlways: false,
        format: 'yyyy-mm-dd',
        calendarOffset: { x: -230, y: -64 },
        dowNames: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        prevArrow: '<',
        nextArrow: '>',
        cssName: 'flatwhite',
        borderSize: 0,
        onClick: function (target) {
          // 点击日期触发事件
        }
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
        var knowledgeName = $('.currentIcon').parent().parent().children('td').eq(1).html()
        var knowledgeQueation = $('.currentIcon').parent().parent().children('td').eq(2).html()
        $('.modify-ok').remove()
        $('.modify-cancel').remove()
        $('.modify-content').show()
        $('.modify-content-textarea-structure').val(knowledgeName)
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
  },

  after: function () {
    var curFirstRoute = router.getRoute(0)
    if (curFirstRoute === 'knowledge') {
      return
    }
    $('.insert-knowledge-center-wrap').children().off('click')
    $('.insert-knowledge-center-wrap').remove()
    $('.app-content .right-wrap').html('')
    $('.knowledge-optimization').off('click')
  }
}
