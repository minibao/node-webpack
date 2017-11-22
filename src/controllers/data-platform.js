/*!
 * data platform controller
 * bqliu | 09/20/2017
 */

import $ from 'jquery'
import router from '@/router'
import dpMenuTpl from '@/templates/dp-menu.html'

var toExactMenuItem = function (currentRoute) {
  $('.data-platform-list').find('[data-route="/' + currentRoute.join('/') + '"]').addClass('active')
}

export default {
  on: function () {
    var currentRoute = router.getRoute()
    if (
      currentRoute.length === 1 &&
      currentRoute[0] === 'data-platform'
    ) {
      router.setRoute(1, 'supervise')
    }
    if ($('.data-platform-list').length) {
      toExactMenuItem(currentRoute)
      return
    }
    $('.app-content .left-wrap').append($(dpMenuTpl))
    toExactMenuItem(currentRoute)
    // menu scripts
    $('.data-platform-list').find('.data-platform-list-item').click(function () {
      var $this = $(this)
      $this.addClass('active').siblings().removeClass('active')
      var route = $this.data('route')
      router.setRoute(route)
    })

    $('.left-wrap').width('240')
    // 用户提示框
    $('.icon-user-x').unbind()
    $('.icon-user-x').click(function () {
      $('.user-operation-tips-main').toggle()
    })
  },
  after: function () {
    var curFirstRoute = router.getRoute(0)
    if (curFirstRoute === 'data-platform') {
      return
    }
    $('.app-content .supervise-wrap').remove()
    $('.app-content .data-platform-list').remove()
  }
}
