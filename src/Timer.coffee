
clampValue = require "clampValue"
fromArgs = require "fromArgs"
Type = require "Type"

type = Type "Timer"

type.argumentTypes =
  delay: Number
  callback: Function

type.defineProperties

  isActive: get: ->
    @_id?

  elapsedTime: get: ->
    endTime = @_endTime
    endTime ?= Date.now()
    endTime - @_startTime

  progress: get: ->
    progress = @elapsedTime / @delay
    clampValue progress, 0, 1

type.defineFrozenValues

  delay: fromArgs 0

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

type.defineMethods

  prevent: ->
    return if @_id is null
    clearTimeout @_id
    @_endTime = Date.now()
    @_callback = null
    @_id = null
    return

module.exports = type.build()
