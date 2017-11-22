/*!
 * download controller
 * bqliu | 09/25/2017
 */

import $ from 'jquery'
import router from '@/router'
import dpMenuDownload from '@/templates/download.html'

export default {
  on: function () {
    $('.app-content .right-wrap').append($(dpMenuDownload))
    // 设置固定样式滚动条
    $('.download-wrap').niceScroll({
      cursorcolor: '#ccc',
      cursoropacitymin: 0,
      cursoropacitymax: 1
    })
    $('.download-wrap').getNiceScroll().resize()
    $('.list-check-all').change(function () {
      $('.list-check').find('input').prop('checked', $(this).prop('checked'))
    })
  },
  after: function () {
    var curFirstRoute = router.getRoute(0)
    if (curFirstRoute === 'download') {
      return
    }
    $('.download-center-wrap').remove()
    $('.download-center-wrap').children().off('click')
    $('.app-content .right-wrap').html('')
  }
}
