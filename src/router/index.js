import director from '../vendors/director'
import _ from 'lodash'

var routes = {
  '/data-platform': _.assign(
    require('@/controllers/data-platform'),
    {
      '/supervise': require('@/controllers/supervise'),
      '/download': require('@/controllers/download'),
      '/feedback': require('@/controllers/feedback')
    }
  ),
  '/knowledge-management': _.assign(
    require('@/controllers/knowledge-management'),
    {
      '/insert-knowledge': require('@/controllers/insert-knowledge'),
      '/knowledge': require('@/controllers/knowledge'),
      '/old': require('@/controllers/old-user'),
      '/new': require('@/controllers/new-user'),
      '/insert-structure': require('@/controllers/insert-structure'),
      '/insert-answer': require('@/controllers/insert-answer')
    }
  )
}

var router = new director.Router(routes)

router.configure({
  on: function () {
    console.log('on route')
  },
  recurse: 'backward'
})

window.router = router

export default router
