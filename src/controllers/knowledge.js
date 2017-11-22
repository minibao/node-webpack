/*!
 * knowledge controller
 * hxli8 | 09/27/2017
 */

import $ from 'jquery'
import router from '@/router'
import knowledge from '@/templates/knowledge.html'

export default {
  on: function () {
    $('.app-content .right-wrap').append($(knowledge))

    $('.choose-knowledge').on('click', function () {
      $('.insert-knowledge-file').trigger('click')
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
