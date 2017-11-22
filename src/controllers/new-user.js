import $ from 'jquery'
import tpl from '@/templates/new-user.html'

export default {
  on: function () {
    $('.app-content .right-wrap').append($(tpl))
  },
  after: function () {
    $('.app-content .right-wrap').html('')
  }
}
