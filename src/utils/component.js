/*!
 * Component
 * bqliu | 09/20/2017
 */

import $ from 'jquery'
import { classCallCheck, setIfNull } from '@/utils'
import _ from 'lodash'

// event util
var toggleEventCore = function (instance, k, delegate, isOn) {
  var eventHandlers = delegate ? instance.devents[k] : instance.events[k]
  var spaceIndex = _.indexOf(k, ' ')
  var eventName = ''
  var selector = ''
  // only eventName
  if (spaceIndex === -1) {
    eventName = k
  }
  else {
    eventName = k.substr(0, spaceIndex)
    selector = k.substr(spaceIndex + 1)
  }
  eventHandlers.forEach(function (handler) {
    var $el = delegate
              ? instance.$el
              : selector
                ? instance.$el.find(selector)
                : instance.$el

    // reset selector
    // if not delegate, $el is the exact jQuery instance
    // in this situation, selector can be ''
    // if reset selector,
    // we can use the same way to bind
    selector = !delegate ? '' : selector

    // bind
    // if selector is '', won't delegate
    var mtd = isOn ? $el.on : $el.off
    mtd.call($el, eventName, selector, instance.methods[handler])
  })
}

var toggleEvents = function (instance, delegate, isOn) {
  var events = delegate ? instance.devents : instance.events

  _.map(
    _.keys(events),
    function (k) {
      toggleEventCore(instance, k, delegate, isOn)
    }
  )
}

var curriedBindEvents = _.curryRight(toggleEvents)(true)
var bindEvents = curriedBindEvents(false)
var delegateEvents = curriedBindEvents(true)
var curriedUnbindEvents = _.curryRight(toggleEvents)(false)
var unbindEvents = curriedUnbindEvents(false)
var undelegateEvents = curriedUnbindEvents(true)

// remove all invalid k-v pair
var validateEvents = function (events) {
  if (!events) {
    return { }
  }
  return _.transform(events, function (result, v, k) {
    if (k === '' || !_.isString(v)) {
      return
    }
    result[_.trim(k)] = [ _.trim(v) ]
  })
}

// constructor
var C = function (opts) {
  classCallCheck(this, C)

  if (!opts) {
    opts = { }
  }

  setIfNull(opts, 'tpl', '')
  setIfNull(opts, 'events', { })
  setIfNull(opts, 'devents', { })
  setIfNull(opts, 'methods', { })
  setIfNull(opts, 'hooks', { })

  this.tpl = opts.tpl
  this.events = validateEvents(opts.events)
  this.devents = validateEvents(opts.devents)

  var instance = this

  this.methods = { }
  _.forEach(
    _.keys(opts.methods),
    function (prop) {
      instance.methods[prop] = function (evt, data) {
        return opts.methods[prop].call(instance, evt, data)
      }
    }
  )

  this.hooks = opts.hooks

  this.opts = opts

  this.init()
}

/**
 * { el | events | devents }
 */

C.prototype = {
  constructor: C,
  init: function () {
    var opts = this.opts
    this.$el = $(_.template(this.tpl)(opts.data))

    this.bindEvents()
    this.delegateEvents()

    if (_.isFunction(this.hooks.created)) {
      this.hooks.created.call(this)
    }

    if (opts.$el) {
      this.mount($(this.opts.$el))
    }
  },
  mount: function ($mount) {
    if (!$mount) {
      return
    }
    if (_.isFunction(this.hooks.beforeMount)) {
      this.hooks.beforeMount.call(this)
    }
    $mount.html(this.$el)
    this.mounted = true
    if (_.isFunction(this.hooks.mounted)) {
      this.hooks.mounted.call(this)
    }
  },
  bindEvents: function () {
    bindEvents(this)
  },
  delegateEvents: function () {
    delegateEvents(this)
  },
  unbindEvents: function () {
    unbindEvents(this)
  },
  undelegateEvents: function () {
    undelegateEvents(this)
  },
  destroy: function () {
    if (_.isFunction(this.hooks.beforeDestroy)) {
      this.hooks.beforeDestroy.call(this)
    }
    this.unbindEvents()
    this.undelegateEvents()
    this.$el.remove()
    if (_.isFunction(this.hooks.destroyed)) {
      this.hooks.destroyed()
    }
  }
}

/* just for f */
C.createComponent = function (opts) {
  return function () {
    return C.createInstance(opts)
  }
}

C.createInstance = function (opts) {
  return new C(opts)
}

export const createComponent = C.createComponent
export const createInstance = C.createInstance

export default C
