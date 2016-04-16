
require "lotus-require"

{ assertType } = require "type-utils"

clampValue = require "clampValue"
Factory = require "factory"

module.exports = Factory "Timer",

  initArguments: (delay, callback) ->
    assertType delay, Number
    assertType callback, Function
    arguments

  customValues:

    isActive: get: ->
      @_id?

    elapsedTime: get: ->
      finished = @_finished
      finished ?= Date.now()
      finished - @_began

    progress: get: ->
      progress = @elapsedTime / @delay
      clampValue progress, 0, 1

  initFrozenValues: (delay) ->
    { delay }

  initValues: (delay, callback) ->
    _began: null
    _id: null
    _callback: =>
      return unless @_id?
      @_id = null
      @_finished = Date.now()
      callback()

  init: ->
    @_began = Date.now()
    @_id = setTimeout @_callback, @delay

  prevent: ->
    return unless @_id?
    clearTimeout @_id
    @_id = null
    @_finished = Date.now()
    return
