/*!
 * feedback controller
 * bqliu | 09/25/2017
 */

import $ from 'jquery'
import router from '@/router'
import dpMenulist from '@/templates/feedback.html'
import { showCommonDialog } from '@/modal/common-dialog.js'

export default {
  on: function () {
    $('.app-content .right-wrap').append($(dpMenulist))
    // 设置固定样式滚动条
    $('.list-wrap').niceScroll({
      cursorcolor: '#ccc',
      cursoropacitymin: 0,
      cursoropacitymax: 1
    })
    // 全选取消
    $('#list-check').change(function () {
      $('#list-cont').find('input').prop('checked', $(this).prop('checked'))
    })
    $('#list-cont input').change(function () {
      if ($('#list-cont input: checkbox').length === $('#list-cont input: checked').length) {
        $('#list-check').prop('checked', true)
      }
      else {
        $('#list-check').prop('checked', false)
      }
    })
    $('.delete').click(function () {
      $(this).parent('td').parent('tr').remove()
    })
    // 问题反馈的弹窗部分
    $('#dialog-feedbackadd-button').click(function () {
      var knowledgedialogdel = showCommonDialog(
        {
          title: '',
          content: `
            <div class="feedback-dialog-main">
              <div class="feedback-dialog-header">
                <span class="feedback-dialog-title">问题反馈</span>
                <span class="feedback-dialog-close">X</span>
              </div>
              <form action="#">
                <label for="" class="selectType-title">选择类型</label>
                <select class="selectType">
                  <option>词类</option>
                  <option>标准问</option>
                  <option>句式</option>
                  <option>答案</option>
                  <option>优化中心</option>
                  <option>其它</option>
                </select>
                <br>
                <label for="" class="problemDetail-title">问题描述</label>
                <textarea name="problemDetail" class="problemDetail"></textarea>
              </form>
            </div>
          `,
          width: '530px',
          height: '170px',
          okValue: '取消',
          cancelValue: '添加'
        }
      )
      knowledgedialogdel.showModal()
      $('.feedback-dialog-close').click(function () {
        knowledgedialogdel.close()
      })
    })
    // 问题反馈弹窗部分结束
    $('.edit').click(function (e) {
      $('.edit').removeClass('currentEdit')
      var target = e.target
      $(target).addClass('currentEdit')
      var knowledgeQueation = $('.currentEdit').parent().parent().children('td').eq(2).html()
      var knowledgedialogdel = showCommonDialog(
        {
          title: '',
          content: `
            <div class="feedback-dialog-main">
              <div class="feedback-dialog-header">
                <span class="feedback-dialog-title">问题反馈</span>
                <span class="feedback-dialog-close">X</span>
              </div>
              <form action="#">
                <label for="" class="selectType-title">选择类型</label>
                <select class="selectType">
                  <option>词类</option>
                  <option>标准问</option>
                  <option>句式</option>
                  <option>答案</option>
                  <option>优化中心</option>
                  <option>其它</option>
                </select>
                <br>
                <label for="" class="problemDetail-title">问题描述</label>
                <textarea name="problemDetail" class="problemDetail"></textarea>
              </form>
            </div>
          `,
          width: '530px',
          height: '170px',
          okValue: '取消',
          cancelValue: '添加'
        }
      )
      knowledgedialogdel.showModal()
      $('.problemDetail').val(knowledgeQueation)
      $('.feedback-dialog-close').click(function () {
        knowledgedialogdel.close()
      })
    })
  },
  after: function () {
    var curFirstRoute = router.getRoute(0)
    if (curFirstRoute === 'feedback') {
      return
    }
    $('#list-check').off('change')
    $('#list-cont input').off('change')
    $('.delete').off('click')
    $('.app-content .right-wrap').html('')
    $('.feedback-center-wrap').children().off('click')
    $('.feedback-center-wrap').remove()
    $('.edit').off('click')
  }
}
