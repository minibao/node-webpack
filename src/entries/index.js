import '../vendors/zTree/css/metroStyle/metroStyle.css'
import '../styles/index.styl'

import 'es5-shim'
import 'es6-promise/auto'
import promiseFinallyPolyfill from 'promise.prototype.finally'

promiseFinallyPolyfill.shim()

import router from '../router'
import $ from 'jquery'

router.init('#/knowledge-management')

var firstRoute = router.getRoute(0)
var index = 0
if (firstRoute !== 'knowledge-management') {
  index = 1
}

var $pages = $('.app-header .page-list-item')

$pages.eq(index).addClass('active').siblings().removeClass('active')
$pages.on('click', function () {
  var $this = $(this)
  $this.addClass('active').siblings().removeClass('active')
  var route = $this.data('route')
  router.setRoute(route)
})

export default function main () { }
