var Type, clampValue, getArgProp, type;

clampValue = require("clampValue");

getArgProp = require("getArgProp");

Type = require("Type");

type = Type("Timer");

type.argumentTypes = {
  delay: Number,
  callback: Function
};

type.defineProperties({
  isActive: {
    get: function() {
      return this._id != null;
    }
  },
  elapsedTime: {
    get: function() {
      var endTime;
      endTime = this._endTime;
      if (endTime == null) {
        endTime = Date.now();
      }
      return endTime - this._startTime;
    }
  },
  progress: {
    get: function() {
      var progress;
      progress = this.elapsedTime / this.delay;
      return clampValue(progress, 0, 1);
    }
  }
});

type.defineFrozenValues({
  delay: getArgProp(0)
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

type.defineMethods({
  prevent: function() {
    if (this._id === null) {
      return;
    }
    clearTimeout(this._id);
    this._endTime = Date.now();
    this._callback = null;
    this._id = null;
  }
});

module.exports = type.build();

//# sourceMappingURL=../../map/src/Timer.map
