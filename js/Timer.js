// Generated by CoffeeScript 1.12.4
var Type, clampValue, type;

clampValue = require("clampValue");

Type = require("Type");

type = Type("Timer");

type.defineArgs([Number, Function]);

type.createFrozenValue("delay", function(delay) {
  return delay;
});

type.defineGetters({
  isActive: function() {
    return this._id != null;
  },
  elapsedTime: function() {
    var endTime;
    endTime = this._endTime;
    if (endTime == null) {
      endTime = Date.now();
    }
    return endTime - this._startTime;
  },
  progress: function() {
    var progress;
    progress = this.elapsedTime / this.delay;
    return clampValue(progress, 0, 1);
  }
});

type.defineMethods({
  prevent: function() {
    if (this._id !== null) {
      clearTimeout(this._id);
      this._endTime = Date.now();
      this._callback = null;
      this._id = null;
    }
  }
});

type.defineValues({
  _id: null,
  _startTime: null,
  _endTime: null,
  _callback: function(delay, callback) {
    return (function(_this) {
      return function() {
        if (_this._id === null) {
          return;
        }
        _this._endTime = Date.now();
        _this._callback = null;
        _this._id = null;
        return callback();
      };
    })(this);
  }
});

type.initInstance(function() {
  this._startTime = Date.now();
  return this._id = setTimeout(this._callback, this.delay);
});

module.exports = type.build();