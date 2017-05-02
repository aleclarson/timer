
clampValue = require "clampValue"
Type = require "Type"

type = Type "Timer"

type.defineArgs [Number, Function]

type.defineGetters

  isActive: -> @_id?

  elapsedTime: ->
    endTime = @_endTime
    endTime ?= Date.now()
    endTime - @_startTime

  progress: ->
    progress = @elapsedTime / @delay
    clampValue progress, 0, 1

type.defineFrozenValues (delay) -> {delay}

type.defineMethods

  prevent: ->
    if @_id isnt null
      clearTimeout @_id
      @_endTime = Date.now()
      @_callback = null
      @_id = null
      return

#
# Internal
#

type.defineValues

  _id: null

  _startTime: null

  _endTime: null

  _callback: (delay, callback) -> =>
    return if @_id is null
    @_endTime = Date.now()
    @_callback = null
    @_id = null
    callback()

type.initInstance ->
  @_startTime = Date.now()
  @_id = setTimeout @_callback, @delay

module.exports = type.build()
