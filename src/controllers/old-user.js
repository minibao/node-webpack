import $ from 'jquery'
import tpl from '@/templates/old-user.html'
import Echarts from '@/vendors/echarts'

var myChartpie = null
var myChartline = null

export default {
  on: function () {
    $('.app-content .right-wrap').append($(tpl))

    // 老用户趋势图
    var optionline = {
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          show: false,
          data: ['1', '2', '3', '4', '5', '6', '7']
        }
      ],
      legend: {
        itemWidth: 20,
        itemHeight: 14,
        borderWidth: 0,
        padding: 5,
        x: 'center',
        y: 'bottom',
        data: ['知识点', '标准问', '句式']
      },
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
    myChartline = Echarts.init($('#line-datagram-content').get(0))
    myChartline.setOption(optionline)

    // 老用户饼图
    var piedata = [
      {
        value: 200,
        name: '标准问',
        itemStyle: {
          normal: {
            color: '#88d6f9'
          }
        }
      },
      {
        value: 100,
        name: '句式',
        itemStyle: {
          normal: {
            color: '#6b9bf0'
          }
        }
      },
      {
        value: 100,
        name: '知识点',
        itemStyle: {
          normal: {
            color: '#81f6d9'
          }
        }
      }
    ]
    var piedataChangecolor = [
      {
        value: 200,
        name: '标准问',
        itemStyle: {
          normal: {
            color: '#7AC0E0'
          }
        }
      },
      {
        value: 100,
        name: '句式',
        itemStyle: {
          normal: {
            color: '#608BD8'
          }
        }
      },
      {
        value: 100,
        name: '知识点',
        itemStyle: {
          normal: {
            color: '#74DDC3'
          }
        }
      }
    ]
    var optionpie = {
      // 底部示例
      legend: {
        x: 'center',
        y: 'bottom',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 20,
        data: ['知识点', '标准问', '句式']
      },
      series: [
        {
          name: '知识库',
          type: 'pie',
          radius: ['20%', '31%'],
          center: ['50%', '50%'],
          // 指引线无法消失
          label: {
            normal: {
              show: false
            }
          },
          data: piedataChangecolor
        },
        {
          name: '知识库',
          type: 'pie',
          radius: ['30%', '70%'],
          center: ['50%', '50%'],
          // 指引线无法消失
          label: {
            normal: {
              show: false
            }
          },
          data: piedata
        }
      ]
    }
    myChartpie = Echarts.init($('#pie-datagram-content').get(0))
    myChartpie.setOption(optionpie)
  },
  after: function () {
    myChartline && myChartline.clear()
    myChartline = null
    myChartpie && myChartpie.clear()
    myChartpie = null
    $('.app-content .right-wrap .old-user').html('')
  }
}
