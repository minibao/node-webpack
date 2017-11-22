/*!
 * supervise controller
 * bqliu | 09/25/2017
 */

import $ from 'jquery'
import tpl from '@/templates/supervise.html'
import Echarts from '@/vendors/echarts'
import '../vendors/glDatePicker-2.0/glDatePicker.flatwhite.css'
import '../vendors/glDatePicker-2.0/glDatePicker.js'

var myChart = null

export default {
  on: function () {
    $('.app-content .right-wrap').append($(tpl))
    var option = {
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          show: false,
          data: ['1', '2', '3', '4', '5', '6', '7']
        }
      ],
      yAxis: [
        {
          type: 'value',
          show: false
        }
      ],
      series: [
        {
          name: '知识点',
          type: 'line',
          smooth: true,
          symbol: 'rectangle',
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              },
              color: '#c8eeef',
              icon: 'bar'
            }
          },
          data: [1320, 1132, 601, 234, 120, 90, 20]
        },
        {
          name: '标准问',
          type: 'line',
          smooth: true,
          symbol: 'rectangle',
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              },
              color: '#c7d6fb'
            }
          },
          data: [30, 182, 434, 791, 390, 30, 10]
        },
        {
          name: '句式',
          type: 'line',
          smooth: true,
          symbol: 'rectangle',
          itemStyle: {
            normal: {
              areaStyle: {
                type: 'default'
              },
              color: '#d1e8fd'
            }
          },
          data: [10, 12, 21, 54, 260, 830, 710]
        }
      ]
    }
    myChart = Echarts.init($('#supervise-line').get(0))
    myChart.setOption(option)

    // 日历
    $('.supervise-bottom-select-time').on('click', function () {
      $(this).glDatePicker({
        showAlways: false,
        format: 'yyyy-mm-dd',
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
  },
  after: function () {
    myChart && myChart.clear()
    myChart = null
    $('.app-content .right-wrap .new-user').children().off('click')
    $('.app-content .right-wrap').html('')
  }
}
