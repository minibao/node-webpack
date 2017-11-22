import $ from 'jquery'
import tpl from '@/templates/optimization.html'

export default {
  on: function () {
    $('.app-content .right-wrap').append($(tpl))
  },
  after: function () {
    $('.app-content .right-wrap .optimization').remove()
  }
}
