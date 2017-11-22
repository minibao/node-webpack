import '../styles/login.styl'
import $ from 'jquery'
import { loginknowManager } from '@/utils/api'

$('#login-form').on('submit', function () {
  var userName = $('.login-userName').val()
  var password = $('.login-pwd').val()
  if (!userName) {
    $('.login-tip-main').css('visibility', 'visible')
    $('.login-tip').html('请输入账号')
    return false
  }
  else if (!password) {
    $('.login-tip-main').css('visibility', 'visible')
    $('.login-tip').html('请输入密码')
    return false
  }
  else {
    $('.login-tip-main').css('visibility', 'hidden')
    loginknowManager(userName, password)
    // window.location.href = 'http://localhost:8080/#/knowledge-management/new'
    return true
  }
})

export default function login () {}
